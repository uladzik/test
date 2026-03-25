import uuid
from decimal import Decimal

import structlog
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.formulas import (
    calculate_confidence,
    calculate_deal_score,
    calculate_expected_profit,
    calculate_offer,
    calculate_risk,
    classify_recommendation,
    CONDITION_ADJUSTMENTS,
    PLATFORM_FEES,
)
from app.models.listing import NormalizedListing
from app.models.opportunity import Opportunity
from app.models.risk import RiskAssessment
from app.models.source import Source
from app.services.valuation import ValuationOutput

logger = structlog.get_logger()


class ScoringService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def score_and_create_opportunity(
        self,
        listing: NormalizedListing,
        valuation: ValuationOutput,
        source: Source,
        model_name: str | None = None,
        match_confidence: float = 0.0,
    ) -> Opportunity:
        """Score a listing and create an opportunity record."""

        # 1. Risk assessment
        risk = self._assess_risk(listing, match_confidence)
        risk_record = RiskAssessment(
            normalized_listing_id=listing.id,
            counterfeit_risk=risk["counterfeit"],
            condition_risk=risk["condition"],
            seller_risk=risk["seller"],
            data_quality_risk=risk["data_quality"],
            overall_risk_score=risk["overall"],
            risk_factors=risk["factors"],
            recommendation="SAFE" if risk["overall"] < 0.4 else "CAUTION" if risk["overall"] < 0.7 else "HIGH_RISK",
        )
        self.db.add(risk_record)
        await self.db.flush()

        # 2. Confidence score
        image_quality = min(listing.image_count / 5, 1.0) if listing.image_count else 0.2
        confidence = calculate_confidence(
            model_match_confidence=match_confidence,
            valuation_confidence=valuation.confidence,
            data_quality_score=listing.data_quality_score or 0.5,
            image_quality_score=image_quality,
        )

        # 3. Offer calculation
        condition_adj = CONDITION_ADJUSTMENTS.get(listing.condition or "GOOD", 0.0)
        risk_adj = -0.10 if risk["overall"] > 0.6 else -0.05 if risk["overall"] > 0.4 else 0.0
        offer_pct = 0.65  # Default — will use strategy resolution later
        effective_pct = max(0.50, min(0.80, offer_pct + condition_adj + risk_adj))

        offer_amount = calculate_offer(
            listed_price=listing.listed_price,
            offer_pct=offer_pct,
            condition_adjustment=condition_adj,
            risk_adjustment=risk_adj,
        )

        # 4. Expected profit (double platform fees)
        fees = PLATFORM_FEES.get(source.marketplace, {"buy_fee": 0.0, "sell_fee": 0.10})
        expected_profit = calculate_expected_profit(
            offer_amount=offer_amount,
            estimated_resale_value=valuation.resale_value,
            buy_platform_fee_pct=fees["buy_fee"],
            sell_platform_fee_pct=fees["sell_fee"],
        )

        margin_pct = float(expected_profit / offer_amount) if offer_amount > 0 else 0.0

        # 5. Deal score
        deal_score = calculate_deal_score(
            expected_margin_pct=margin_pct,
            confidence_score=confidence,
            risk_score=risk["overall"],
        )

        # 6. Recommendation
        recommendation = classify_recommendation(
            deal_score=deal_score,
            confidence_score=confidence,
            risk_score=risk["overall"],
            expected_margin=expected_profit,
        )

        # 7. Create opportunity
        opportunity = Opportunity(
            normalized_listing_id=listing.id,
            source_id=listing.source_id,
            model_id=listing.matched_model_id,
            risk_assessment_id=risk_record.id,
            platform=source.marketplace,
            listing_title=listing.title,
            source_listing_id=listing.source_listing_id,
            url=listing.url,
            model_name=model_name,
            listed_price=listing.listed_price,
            estimated_market_value=valuation.market_value,
            estimated_resale_value=valuation.resale_value,
            offer_percentage=effective_pct,
            offer_amount=offer_amount,
            expected_margin=expected_profit,
            expected_margin_pct=margin_pct,
            confidence_score=confidence,
            risk_score=risk["overall"],
            deal_score=deal_score,
            recommendation=recommendation,
            status="NEW",
        )
        self.db.add(opportunity)
        await self.db.flush()

        logger.info(
            "opportunity.created",
            id=str(opportunity.id),
            deal_score=deal_score,
            recommendation=recommendation,
            margin=float(expected_profit),
        )

        return opportunity

    def _assess_risk(self, listing: NormalizedListing, match_confidence: float) -> dict:
        """Rule-based risk assessment."""
        factors = []

        # Counterfeit risk
        counterfeit = 0.1
        price = float(listing.listed_price)
        if price < 15:
            counterfeit = 0.6
            factors.append("Very low price — possible fake")
        elif price < 30:
            counterfeit = 0.3
            factors.append("Low price — check authenticity")

        # Condition risk
        condition = 0.1
        if listing.condition == "POOR":
            condition = 0.4
            factors.append("Poor condition")
        elif listing.condition == "FAIR":
            condition = 0.2
            factors.append("Fair condition — verify damage")

        # Seller risk
        seller = 0.2
        if listing.seller_rating and listing.seller_rating < 3.0:
            seller = 0.5
            factors.append("Low seller rating")

        # Data quality risk
        data_quality = 1.0 - (listing.data_quality_score or 0.5)
        if data_quality > 0.5:
            factors.append("Insufficient listing information")

        # Model match risk
        if match_confidence < 0.5:
            factors.append("Low model match confidence")
            counterfeit += 0.1

        overall = calculate_risk(
            counterfeit_risk=counterfeit,
            condition_risk=condition,
            seller_risk=seller,
            data_quality_risk=data_quality,
            price_anomaly=price < 15,
        )

        return {
            "counterfeit": counterfeit,
            "condition": condition,
            "seller": seller,
            "data_quality": data_quality,
            "overall": overall,
            "factors": factors,
        }
