"""Seed Oakley product catalog into the database."""
import asyncio
import json
import os

from sqlalchemy import select

from app.database import async_session
from app.models.product import Brand, ProductCategory, ProductModel, ProductAlias


OAKLEY_DATA = {
    "brand": "Oakley",
    "categories": [
        {"name": "Sunglasses", "slug": "sunglasses"},
        {"name": "Prescription Glasses", "slug": "prescription"},
        {"name": "Goggles", "slug": "goggles"},
    ],
    "models": [
        # Sunglasses
        {"name": "Holbrook", "slug": "holbrook", "category": "sunglasses", "retail_price": 140, "popularity": "HIGH",
         "aliases": ["holbrook", "OO9102", "9102"]},
        {"name": "Holbrook XL", "slug": "holbrook-xl", "category": "sunglasses", "retail_price": 155, "popularity": "HIGH",
         "aliases": ["holbrook xl", "OO9417", "9417"]},
        {"name": "Holbrook Metal", "slug": "holbrook-metal", "category": "sunglasses", "retail_price": 175, "popularity": "MEDIUM",
         "aliases": ["holbrook metal", "OO4123", "4123"]},
        {"name": "Frogskins", "slug": "frogskins", "category": "sunglasses", "retail_price": 130, "popularity": "HIGH",
         "aliases": ["frogskins", "frogskin", "OO9013", "9013"]},
        {"name": "Frogskins Lite", "slug": "frogskins-lite", "category": "sunglasses", "retail_price": 120, "popularity": "MEDIUM",
         "aliases": ["frogskins lite", "OO9374", "9374"]},
        {"name": "Radar EV Path", "slug": "radar-ev-path", "category": "sunglasses", "retail_price": 210, "popularity": "HIGH",
         "aliases": ["radar ev path", "radar ev", "radar", "OO9208", "9208"]},
        {"name": "Radar EV Advancer", "slug": "radar-ev-advancer", "category": "sunglasses", "retail_price": 230, "popularity": "MEDIUM",
         "aliases": ["radar ev advancer", "OO9442", "9442"]},
        {"name": "Jawbreaker", "slug": "jawbreaker", "category": "sunglasses", "retail_price": 220, "popularity": "HIGH",
         "aliases": ["jawbreaker", "jaw breaker", "OO9290", "9290"]},
        {"name": "Sutro", "slug": "sutro", "category": "sunglasses", "retail_price": 185, "popularity": "HIGH",
         "aliases": ["sutro", "OO9406", "9406"]},
        {"name": "Sutro Lite", "slug": "sutro-lite", "category": "sunglasses", "retail_price": 165, "popularity": "MEDIUM",
         "aliases": ["sutro lite", "OO9463", "9463"]},
        {"name": "Flight Jacket", "slug": "flight-jacket", "category": "sunglasses", "retail_price": 235, "popularity": "MEDIUM",
         "aliases": ["flight jacket", "OO9401", "9401"]},
        {"name": "Flak 2.0 XL", "slug": "flak-2-xl", "category": "sunglasses", "retail_price": 190, "popularity": "HIGH",
         "aliases": ["flak 2.0 xl", "flak 2.0", "flak", "OO9188", "9188"]},
        {"name": "Gascan", "slug": "gascan", "category": "sunglasses", "retail_price": 145, "popularity": "HIGH",
         "aliases": ["gascan", "gas can", "OO9014", "9014"]},
        {"name": "Turbine", "slug": "turbine", "category": "sunglasses", "retail_price": 170, "popularity": "MEDIUM",
         "aliases": ["turbine", "OO9263", "9263"]},
        {"name": "Fuel Cell", "slug": "fuel-cell", "category": "sunglasses", "retail_price": 145, "popularity": "MEDIUM",
         "aliases": ["fuel cell", "fuelcell", "OO9096", "9096"]},
        {"name": "Half Jacket 2.0", "slug": "half-jacket-2", "category": "sunglasses", "retail_price": 155, "popularity": "MEDIUM",
         "aliases": ["half jacket", "half jacket 2.0", "OO9144", "9144"]},
        {"name": "Latch", "slug": "latch", "category": "sunglasses", "retail_price": 155, "popularity": "MEDIUM",
         "aliases": ["latch", "OO9265", "9265"]},
        {"name": "Pit Viper", "slug": "pit-viper", "category": "sunglasses", "retail_price": 160, "popularity": "LOW",
         "aliases": ["pit viper"]},
        {"name": "Sphaera", "slug": "sphaera", "category": "sunglasses", "retail_price": 240, "popularity": "LOW",
         "aliases": ["sphaera", "OO9403"]},
        {"name": "EVZero Blades", "slug": "evzero-blades", "category": "sunglasses", "retail_price": 165, "popularity": "MEDIUM",
         "aliases": ["evzero", "ev zero", "evzero blades", "OO9454"]},
        {"name": "Encoder", "slug": "encoder", "category": "sunglasses", "retail_price": 235, "popularity": "MEDIUM",
         "aliases": ["encoder", "OO9471"]},
        {"name": "Wire Tap 2.0", "slug": "wire-tap-2", "category": "sunglasses", "retail_price": 195, "popularity": "LOW",
         "aliases": ["wire tap", "wiretap", "OO4145"]},
        # Goggles
        {"name": "Flight Deck", "slug": "flight-deck", "category": "goggles", "retail_price": 220, "popularity": "HIGH",
         "aliases": ["flight deck", "OO7050", "7050"]},
        {"name": "Airbrake", "slug": "airbrake", "category": "goggles", "retail_price": 280, "popularity": "HIGH",
         "aliases": ["airbrake", "air brake", "OO7037", "7037"]},
        {"name": "Line Miner", "slug": "line-miner", "category": "goggles", "retail_price": 180, "popularity": "HIGH",
         "aliases": ["line miner", "lineminer", "OO7070", "7070"]},
        {"name": "Fall Line", "slug": "fall-line", "category": "goggles", "retail_price": 160, "popularity": "MEDIUM",
         "aliases": ["fall line", "OO7085"]},
    ],
}


async def seed():
    async with async_session() as db:
        # Check if brand already exists
        existing = await db.execute(select(Brand).where(Brand.slug == "oakley"))
        if existing.scalar_one_or_none():
            print("Oakley brand already seeded. Skipping.")
            return

        # Create brand
        brand = Brand(name="Oakley", slug="oakley", is_active=True)
        db.add(brand)
        await db.flush()
        print(f"Created brand: Oakley ({brand.id})")

        # Create categories
        cat_map = {}
        for cat_data in OAKLEY_DATA["categories"]:
            cat = ProductCategory(
                brand_id=brand.id,
                name=cat_data["name"],
                slug=cat_data["slug"],
            )
            db.add(cat)
            await db.flush()
            cat_map[cat_data["slug"]] = cat.id
            print(f"  Category: {cat_data['name']}")

        # Create models and aliases
        for model_data in OAKLEY_DATA["models"]:
            model = ProductModel(
                brand_id=brand.id,
                category_id=cat_map.get(model_data["category"]),
                name=model_data["name"],
                slug=model_data["slug"],
                retail_price=model_data["retail_price"],
                retail_currency="EUR",
                popularity_tier=model_data["popularity"],
                resale_factor=0.85,
            )
            db.add(model)
            await db.flush()

            for alias_text in model_data.get("aliases", []):
                alias = ProductAlias(
                    model_id=model.id,
                    alias=alias_text,
                    alias_type="NAME" if " " in alias_text or alias_text.isalpha() else "SKU",
                )
                db.add(alias)

            print(f"  Model: {model_data['name']} ({len(model_data.get('aliases', []))} aliases)")

        await db.commit()
        print(f"\nSeeded {len(OAKLEY_DATA['models'])} Oakley models successfully.")


if __name__ == "__main__":
    asyncio.run(seed())
