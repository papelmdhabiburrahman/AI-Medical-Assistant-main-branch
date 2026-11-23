from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, confusion_matrix, f1_score
from typing import Literal
router=APIRouter()
class Request(BaseModel):
    algorithm: Literal['logistic','forest','svm']='logistic'
@router.post('/ml/demo')
def demo(body: Request):
    x,y=make_classification(n_samples=300,n_features=6,n_informative=4,random_state=42)
    train,test,yt,yv=train_test_split(x,y,test_size=.25,stratify=y,random_state=42)
    models={'logistic':make_pipeline(StandardScaler(),LogisticRegression()),'forest':RandomForestClassifier(n_estimators=50,random_state=42,n_jobs=1),'svm':make_pipeline(StandardScaler(),SVC())}
    model=models[body.algorithm]; model.fit(train,yt); pred=model.predict(test)
    return {'synthetic':True,'accuracy':float(accuracy_score(yv,pred)),'f1':float(f1_score(yv,pred)),'confusion_matrix':confusion_matrix(yv,pred).tolist(),'examples':[{'actual':int(v),'predicted':int(p)} for v,p in zip(yv[:10],pred[:10])]}
