import io, json
import numpy as np
import pandas as pd
from fastapi import APIRouter, UploadFile, HTTPException, Form
router = APIRouter()
@router.post('/analytics')
async def analytics(file: UploadFile, missing: str = Form('keep'), deduplicate: bool = Form(False), normalize: bool = Form(False)):
    raw = await file.read(5*1024*1024+1)
    if len(raw)>5*1024*1024: raise HTTPException(413,'5 MB limit')
    try:
        name=(file.filename or '').lower()
        if name.endswith('.csv'): df=pd.read_csv(io.BytesIO(raw), nrows=10001)
        elif name.endswith('.json'): df=pd.read_json(io.BytesIO(raw))
        else: raise ValueError('Use CSV or JSON')
        if df.empty or len(df)>10000 or len(df.columns)>50: raise ValueError('Use 1–10000 rows and 1–50 columns')
        df.columns=df.columns.astype(str)
        if not df.columns.is_unique: raise ValueError('Column names must be unique')
        df=df.replace([np.inf,-np.inf],np.nan)
        before=len(df); gaps={k:int(v) for k,v in df.isna().sum().items()}; duplicates=int(df.duplicated().sum())
        if deduplicate: df=df.drop_duplicates()
        if missing=='drop': df=df.dropna()
        elif missing=='median':
            for c in df.select_dtypes(include='number'): df[c]=df[c].fillna(df[c].median())
        elif missing!='keep': raise ValueError('Invalid missing policy')
        if df.empty: raise ValueError('No rows remain after cleaning')
        num=df.select_dtypes(include='number').copy()
        if normalize:
            for c in num:
                lo,hi=num[c].min(),num[c].max()
                df[c]=(num[c]-lo)/(hi-lo) if hi>lo else num[c].where(num[c].isna(),0)
        num=df.select_dtypes(include='number')
        stats={}; hist={}
        for c in num:
            v=num[c].dropna(); stats[c]=v.describe().to_dict() if len(v) else {}
            if len(v):
                counts,edges=np.histogram(v,bins=10); hist[c]=[{'label':f'{edges[i]:.3g}–{edges[i+1]:.3g}','count':int(n)} for i,n in enumerate(counts)]
        def safe(x): return json.loads(pd.DataFrame(x).to_json(orient='records'))
        # JSON serialization converts non-finite statistics to null.
        return {'rows_before':before,'rows':len(df),'columns':list(df.columns),'missing_before':gaps,'duplicates_before':duplicates,'numeric':list(num.columns),'statistics':json.loads(pd.DataFrame(stats).to_json()),'correlation':json.loads(num.corr().to_json()),'histograms':hist,'preview':safe(df.head(100)),'csv':df.to_csv(index=False)}
    except Exception as e: raise HTTPException(400,str(e))
