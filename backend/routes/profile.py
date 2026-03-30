from fastapi import APIRouter

router = APIRouter(prefix="/profile", tags=["Profile"])

@router.get("/")
def get_profile():
    return {"name": "Farmer"}