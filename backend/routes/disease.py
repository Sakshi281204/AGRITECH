from fastapi import APIRouter

router = APIRouter(prefix="/disease", tags=["Disease"])

@router.post("/predict")
def predict_disease():
    return {"disease": "Leaf Spot"}