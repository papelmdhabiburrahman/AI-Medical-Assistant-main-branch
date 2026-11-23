from pathlib import Path
from uuid import uuid4
from statistics import mean, median, pstdev
from math import isfinite
from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from PIL import Image
import io
app = FastAPI(title='Papel AI Research Prototype')
app.add_middleware(CORSMiddleware, allow_origins=['http://localhost:3000','http://127.0.0.1:3000'], allow_methods=['GET','POST'], allow_headers=['Content-Type'])
STORE=Path(__file__).parent/'local_uploads'
class Values(BaseModel):
    values: list[float] = Field(min_length=1,max_length=10000)
@app.get('/health')
def health(): return {'status':'ok','clinical_use':False}
@app.post('/analyze')
def analyze(body: Values):
    v=body.values
    if not all(isfinite(x) and abs(x)<=1e100 for x in v): raise HTTPException(400,'Invalid values')
    return {'count':len(v),'mean':mean(v),'median':median(v),'min':min(v),'max':max(v),'population_stddev':pstdev(v)}
@app.post('/upload')
async def upload(file: UploadFile):
    b=await file.read(20*1024*1024+1)
    if len(b)>20*1024*1024: raise HTTPException(413,'20 MB limit')
    if file.content_type in ('image/png','image/jpeg'):
        try:
            with Image.open(io.BytesIO(b)) as im:
                if im.width*im.height>20000000 or im.format not in ('PNG','JPEG'): raise ValueError()
                ext='.png' if im.format=='PNG' else '.jpg'
                im.verify()
        except Exception: raise HTTPException(400,'Invalid image')
    elif file.content_type=='video/mp4' and b[4:8]==b'ftyp': ext='.mp4'
    else: raise HTTPException(415,'Unsupported reference file')
    STORE.mkdir(exist_ok=True)
    id=uuid4().hex+ext
    (STORE/id).write_bytes(b)
    return {'id':id,'bytes':len(b)}

from analytics import router
app.include_router(router)

from advanced import router as advanced_router
app.include_router(advanced_router)

from ml_lab import router as ml_router
app.include_router(ml_router)
