from fastapi import APIRouter

router = APIRouter(prefix="/cropguide", tags=["Crop Guide"])

@router.get("/")
def get_cropguide():
    return {"message": "Crop guide data here"}