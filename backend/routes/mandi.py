from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import MandiRate
from datetime import datetime

router = APIRouter(prefix="/mandi", tags=["Mandi"])


@router.get("/")
def get_mandi(taluka: str, crop: str, db: Session = Depends(get_db)):
    rates = db.query(MandiRate).filter(
        MandiRate.taluka == taluka,
        MandiRate.crop == crop
    ).all()

    return rates


@router.post("/update")
def update_mandi(data: dict, db: Session = Depends(get_db)):

    rate = db.query(MandiRate).filter(
        MandiRate.taluka == data["taluka"],
        MandiRate.crop == data["crop"]
    ).first()

    now = datetime.now().strftime("%d %b %Y, %I:%M %p")

    if rate:
        rate.min_price = data["min_price"]
        rate.max_price = data["max_price"]
        rate.modal_price = data["modal_price"]
        rate.updated_at = now
    else:
        rate = MandiRate(
            taluka=data["taluka"],
            crop=data["crop"],
            min_price=data["min_price"],
            max_price=data["max_price"],
            modal_price=data["modal_price"],
            updated_at=now
        )
        db.add(rate)

    db.commit()
    db.refresh(rate)

    return {"message": "Updated Successfully"}