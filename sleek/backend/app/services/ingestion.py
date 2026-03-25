import uuid
from datetime import datetime, timezone

import structlog
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.listing import RawListing, NormalizedListing
from app.models.source import Source
from app.connectors.base import RawListingData

logger = structlog.get_logger()


class IngestionService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def ingest_raw(
        self,
        source_id: uuid.UUID,
        crawl_job_id: uuid.UUID,
        listing_data: RawListingData,
    ) -> RawListing:
        """Store raw listing data."""
        raw = RawListing(
            source_id=source_id,
            crawl_job_id=crawl_job_id,
            source_listing_id=listing_data.source_listing_id,
            url=listing_data.url,
            raw_payload=listing_data.raw_data,
            fetched_at=listing_data.fetched_at or datetime.now(timezone.utc),
        )
        self.db.add(raw)
        await self.db.flush()
        logger.info("listing.ingested", raw_id=str(raw.id), source_listing_id=listing_data.source_listing_id)
        return raw

    async def normalize_and_store(
        self,
        raw: RawListing,
        normalized_data: dict,
        source: Source,
    ) -> NormalizedListing:
        """Create normalized listing from parsed data."""
        # Check for existing listing (dedup by source + source_listing_id)
        existing = await self.db.execute(
            select(NormalizedListing).where(
                NormalizedListing.source_id == raw.source_id,
                NormalizedListing.source_listing_id == raw.source_listing_id,
                NormalizedListing.is_active == True,
            )
        )
        existing_listing = existing.scalar_one_or_none()

        if existing_listing:
            # Update existing listing
            for key, value in normalized_data.items():
                if hasattr(existing_listing, key) and value is not None:
                    setattr(existing_listing, key, value)
            existing_listing.raw_listing_id = raw.id
            await self.db.flush()
            logger.info("listing.updated", listing_id=str(existing_listing.id))
            return existing_listing

        # Create new
        listing = NormalizedListing(
            raw_listing_id=raw.id,
            source_id=raw.source_id,
            source_listing_id=raw.source_listing_id,
            url=raw.url,
            title=normalized_data.get("title", ""),
            description=normalized_data.get("description"),
            listed_price=normalized_data.get("listed_price", 0),
            currency=normalized_data.get("currency", "EUR"),
            condition=normalized_data.get("condition"),
            brand_raw=normalized_data.get("brand_raw"),
            model_raw=normalized_data.get("model_raw"),
            category_raw=normalized_data.get("category_raw"),
            color=normalized_data.get("color"),
            size=normalized_data.get("size"),
            country=normalized_data.get("country"),
            city=normalized_data.get("city"),
            seller_id=normalized_data.get("seller_id"),
            seller_rating=normalized_data.get("seller_rating"),
            image_count=len(normalized_data.get("image_urls", [])),
            data_quality_score=self._calculate_data_quality(normalized_data),
        )
        self.db.add(listing)
        await self.db.flush()
        logger.info("listing.normalized", listing_id=str(listing.id))
        return listing

    @staticmethod
    def _calculate_data_quality(data: dict) -> float:
        """Score 0-1 based on how complete the listing data is."""
        fields = ["title", "listed_price", "condition", "brand_raw", "description", "image_urls"]
        filled = 0
        for f in fields:
            val = data.get(f)
            if val and (not isinstance(val, list) or len(val) > 0):
                filled += 1

        # Bonus for images
        images = data.get("image_urls", [])
        image_bonus = min(len(images) / 5, 1.0) * 0.2

        return round(filled / len(fields) * 0.8 + image_bonus, 3)
