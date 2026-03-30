from fastapi import FastAPI
from routes import recommendation

app = FastAPI()

app.include_router(recommendation.router, prefix="/api/crops")