from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import json
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine, SessionLocal
from models import TestsAndStandards
from schemas import TestingData

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],     
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/submit-tests")
def submit_tests(data: TestingData, db: Session = Depends(get_db)):
    record = TestsAndStandards(
        product_id=data.product_id,
        test_type=data.test_type,
        test_requirements=json.dumps(data.test_requirements),
        test_standards=json.dumps(data.test_standards),
    )

    db.add(record)
    db.commit()
    db.refresh(record)

    return {"status": "saved", "id": record.id}