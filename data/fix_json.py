import json

# Load your JSON file
with open("C:\\Users\\asus\\project\\backend\\data\\cropdata.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Default seasons
default_seasons = [
    {
        "season_name_mr": "खरीप",
        "season_name_en": "Kharif",
        "recommended_crops": []
    },
    {
        "season_name_mr": "रब्बी",
        "season_name_en": "Rabbi",
        "recommended_crops": []
    }
]

# Function to update crops
def update_crop(crop):
    if "duration_days" not in crop:
        crop["duration_days"] = 100
    if "expected_yield_per_acre" not in crop:
        crop["expected_yield_per_acre"] = "5-8 quintal"
    if "market_price_per_quintal" not in crop:
        crop["market_price_per_quintal"] = 3000
    return crop

# Traverse data
for taluka in data.get("talukas", []):
    for village in taluka.get("villages", []):
        
        # Fix empty seasons
        if not village.get("seasons"):
            village["seasons"] = default_seasons
        
        for season in village.get("seasons", []):
            crops = season.get("recommended_crops", [])
            
            # Update crops
            updated_crops = []
            for crop in crops:
                updated_crops.append(update_crop(crop))
            
            season["recommended_crops"] = updated_crops

# Save new file
with open("cropdata_fixed.json", "w", encoding="utf-8") as file:
    json.dump(data, file, ensure_ascii=False, indent=2)

print("✅ JSON fixed successfully! File saved as cropdata_fixed.json")