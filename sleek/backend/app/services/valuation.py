import uuid
from decimal import Decimal
from typing import Optional
from dataclasses import dataclass

import structlog
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.valuation import PriceObservation, ValuationResult
from app.models.product import ProductModel
from app.models.listing import NormalizedListing

logger = structlog.get_logger()


@dataclass
class ValuationOutput:
    market_value: Decimal
    resale_value: Decimal
    confidence: float
    method: str
    data_points: int


class ValuationService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def valuate(self, listing: NormalizedListing, model_id: Optional[uuid.UUID]) -> ValuationOutput:
        """Estimate market value and resale value for a listing."""
        if model_id:
            return await self._valuate_with_model(listing, model_id)
        return self._valuate_without_model(listing)

    async def _valuate_with_model(self, listing: NormalizedListing, model_id: uuid.UUID) -> ValuationOutput:
        """Valuate using historical price data for the matched model."""
        # Get model
        result = await self.db.execute(select(ProductModel).where(ProductModel.id == model_id))
        model = result.scalar_one_or_none()
        if not model:
            return self._valuate_without_model(listing)

        # Get price observations
        obs_query = (
            select(PriceObservation.price)
            .where(PriceObservation.model_id == model_id)
            .order_by(PriceObservation.observed_at.desc())
            .limit(50)
        )
        obs_result = await self.db.execute(obs_query)
        prices = [float(p) for p in obs_result.scalars().all()]

        if prices:
            median_price = sorted(prices)[len(prices) // 2]
            market_value = Decimal(str(median_price))
            confidence = min(len(prices) / 10, 1.0)  # More data = more confidence
            method = "HISTORICAL_MEDIAN"
            data_points = len(prices)
        elif model.retail_price:
            # Fallback to retail price with depreciation
            market_value = model.retail_price * Decimal("0.60")
            confidence = 0.3
            method = "RETAIL_ESTIMATE"
            data_points = 0
        else:
            # No data at all
            market_value = listing.listed_price * Decimal("1.30")
            confidence = 0.15
            method = "PRICE_MARKUP_GUESS"
            data_points = 0

        # Condition adjustment for market value
        condition_factor = {
            "NEW": 1.10,
            "LIKE_NEW": 1.00,
            "GOOD": 0.85,
            "FAIR": 0.70,
            "POOR": 0.50,
        }.get(listing.condition, 0.85)

        adjusted_market = (market_value * Decimal(str(condition_factor))).quantize(Decimal("0.01"))
        resale_value = (adjusted_market * Decimal(str(model.resale_factor))).quantize(Decimal("0.01"))

        # Store result
        val = ValuationResult(
            normalized_listing_id=listing.id,
            model_id=model_id,
            estimated_market_value=adjusted_market,
            estimated_resale_value=resale_value,
            valuation_method=method,
            data_points_used=data_points,
            confidence=confidence,
            breakdown={
                "raw_median": float(market_value),
                "condition_factor": condition_factor,
                "resale_factor": model.resale_factor,
            },
        )
        self.db.add(val)
        await self.db.flush()

        logger.info(
            "listing.valued",
            listing_id=str(listing.id),
            market_value=float(adjusted_market),
            resale_value=float(resale_value),
            method=method,
        )

        return ValuationOutput(
            market_value=adjusted_market,
            resale_value=resale_value,
            confidence=confidence,
            method=method,
            data_points=data_points,
        )

    def _valuate_without_model(self, listing: NormalizedListing) -> ValuationOutput:
        """Rough estimate when no model is matched."""
        market_value = (listing.listed_price * Decimal("1.20")).quantize(Decimal("0.01"))
        resale_value = (market_value * Decimal("0.80")).quantize(Decimal("0.01"))

        return ValuationOutput(
            market_value=market_value,
            resale_value=resale_value,
            confidence=0.1,
            method="NO_MODEL_GUESS",
            data_points=0,
        )
