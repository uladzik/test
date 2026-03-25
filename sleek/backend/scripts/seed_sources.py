"""Seed marketplace sources."""
import asyncio

from sqlalchemy import select

from app.database import async_session
from app.models.source import Source


SOURCES = [
    {
        "name": "vinted_de",
        "display_name": "Vinted Germany",
        "marketplace": "vinted",
        "country": "DE",
        "base_url": "https://www.vinted.de",
        "connector_class": "app.connectors.vinted.connector.VintedConnector",
        "crawl_interval_minutes": 30,
        "rate_limit_rpm": 20,
    },
    {
        "name": "kleinanzeigen_de",
        "display_name": "Kleinanzeigen",
        "marketplace": "kleinanzeigen",
        "country": "DE",
        "base_url": "https://www.kleinanzeigen.de",
        "connector_class": "app.connectors.kleinanzeigen.connector.KleinanzeigenConnector",
        "crawl_interval_minutes": 60,
        "rate_limit_rpm": 15,
    },
    {
        "name": "depop_de",
        "display_name": "Depop",
        "marketplace": "depop",
        "country": "DE",
        "base_url": "https://www.depop.com",
        "connector_class": "app.connectors.depop.connector.DepopConnector",
        "crawl_interval_minutes": 60,
        "rate_limit_rpm": 15,
    },
    {
        "name": "vestiaire_de",
        "display_name": "Vestiaire Collective",
        "marketplace": "vestiaire",
        "country": "DE",
        "base_url": "https://www.vestiairecollective.com",
        "connector_class": "app.connectors.vestiaire.connector.VestiaireConnector",
        "crawl_interval_minutes": 60,
        "rate_limit_rpm": 10,
    },
]


async def seed():
    async with async_session() as db:
        for source_data in SOURCES:
            existing = await db.execute(
                select(Source).where(Source.name == source_data["name"])
            )
            if existing.scalar_one_or_none():
                print(f"Source {source_data['name']} already exists. Skipping.")
                continue

            source = Source(**source_data)
            db.add(source)
            print(f"Created source: {source_data['display_name']}")

        await db.commit()
        print(f"\nSeeded {len(SOURCES)} sources.")


if __name__ == "__main__":
    asyncio.run(seed())
