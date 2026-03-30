from fastapi import APIRouter
import json

router = APIRouter()

# Load JSON
with open("C:\\Users\\asus\\project\\agritech\\data\\cropdata.json", "r", encoding="utf-8") as file:
    data = json.load(file)


@router.post("/recommend")
def recommend_crop(user_input: dict):
    result = []

    season = user_input.get("season")
    soil = user_input.get("soil")
    water = user_input.get("water")
    land = user_input.get("land")
    taluka_input = user_input.get("taluka")

    for taluka in data["talukas"]:
        if taluka["taluka_name_en"].lower() == taluka_input.lower():

            for village in taluka["villages"]:
                for s in village.get("seasons", []):

                    if s["season_name_en"].lower() == season.lower():

                        for crop in s.get("recommended_crops", []):

                            conditions = crop["conditions"]

                            if (
                                soil.strip() in conditions["soil_type"]
                                and water.strip() in conditions["water_source"]
                                and land >= conditions["min_area_acres"]
                            ):
                                result.append({
                                    "crop": crop["crop_name_en"],
                                    "marathi": crop["crop_name_mr"],
                                    "season": s["season_name_en"],
                                    "soil": conditions["soil_type"],
                                    "water": conditions["water_source"],
                                    "min_land": conditions["min_area_acres"],
                                    "taluka": taluka["taluka_name_mr"],
                                    "village": village["village_name_mr"]
                                })

    return result