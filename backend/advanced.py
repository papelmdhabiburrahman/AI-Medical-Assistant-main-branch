import io,json,sqlite3,zipfile
import numpy as np
import pandas as pd
from fastapi import APIRouter, UploadFile, HTTPException, Form
from scipy import stats
from sklearn.preprocessing import StandardScaler
import statsmodels.api as sm
router=APIRouter()
async def load(file):
    raw=await file.read(5*1024*1024+1)
    if len(raw)>5*1024*1024: raise ValueError('5 MB limit')
    name=(file.filename or '').lower()
    if name.endswith('.xlsx'):
        with zipfile.ZipFile(io.BytesIO(raw)) as z:
            if sum(x.file_size for x in z.infolist())>30*1024*1024: raise ValueError('Expanded workbook too large')
        d=pd.read_excel(io.BytesIO(raw),nrows=10001,engine='openpyxl')
    elif name.endswith('.csv'): d=pd.read_csv(io.BytesIO(raw),nrows=10001)
    elif name.endswith('.json'): d=pd.read_json(io.BytesIO(raw))
    else: raise ValueError('CSV, JSON or XLSX required')
    d.columns=d.columns.astype(str)
    if d.empty or len(d)>10000 or len(d.columns)>50 or not d.columns.is_unique: raise ValueError('1–10000 rows, 1–50 unique columns required')
    return d.replace([np.inf,-np.inf],np.nan)
@router.post('/advanced')
async def advanced(file:UploadFile, second:UploadFile=None, key:str=Form(''), missing:str=Form('keep'), outliers:bool=Form(False), encode:bool=Form(False), scale:bool=Form(False), dedup:bool=Form(False), feature_a:str=Form(''), feature_b:str=Form('')):
    try:
        d=await load(file); before=len(d); gaps=d.isna().sum().to_dict(); duplicates=int(d.duplicated().sum())
        if second:
            b=await load(second)
            if not key or key not in d or key not in b: raise ValueError('Valid merge key required')
            d=d.merge(b,on=key,how='inner',validate='many_to_one')
        if dedup:d=d.drop_duplicates()
        if missing=='drop':d=d.dropna()
        elif missing=='median':
            for c in d.select_dtypes('number'):d[c]=d[c].fillna(d[c].median())
        elif missing!='keep':raise ValueError('Invalid missing option')
        if feature_a and feature_b:d['derived_sum']=pd.to_numeric(d[feature_a])+pd.to_numeric(d[feature_b])
        counts={}
        for c in d.select_dtypes('number'):
            q1,q3=d[c].quantile([.25,.75]); i=q3-q1; mask=(d[c]<q1-1.5*i)|(d[c]>q3+1.5*i);counts[c]=int(mask.sum())
            if outliers:d=d.loc[~mask]
        if encode:
            cats=list(d.select_dtypes(exclude='number').columns)
            if sum(d[c].nunique()+1 for c in cats)>100:raise ValueError('Too many categories')
            d=pd.get_dummies(d,columns=cats,dummy_na=True,dtype=int)
        if d.empty or len(d)>10000 or len(d.columns)>150:raise ValueError('Processed dataset outside limits')
        n=d.select_dtypes('number')
        if scale and len(n.columns):d[n.columns]=StandardScaler().fit_transform(n)
        n=d.select_dtypes('number'); report={}
        for c in n:
            v=n[c].dropna(); report[c]={'skew':float(stats.skew(v)) if len(v)>2 and v.nunique()>1 else None,'median':float(v.median()) if len(v) else None}
        regression=None
        if len(n.columns)>=2:
            pair=n.iloc[:,:2].dropna()
            if len(pair)>2 and pair.iloc[:,0].nunique()>1:
                fit=sm.OLS(pair.iloc[:,1],sm.add_constant(pair.iloc[:,0])).fit(); regression={'x':str(pair.columns[0]),'y':str(pair.columns[1]),'slope':float(fit.params.iloc[1]),'r2':float(fit.rsquared)}
        return json.loads(pd.Series({'rows_before':before,'rows':len(d),'missing':gaps,'duplicates':duplicates,'outliers':counts,'stats':report,'regression':regression,'preview':json.loads(d.head(100).to_json(orient='records')),'csv':d.to_csv(index=False)}).to_json())
    except Exception as e:raise HTTPException(400,str(e))
