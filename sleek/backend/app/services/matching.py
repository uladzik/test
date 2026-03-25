import structlog
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from dataclasses import dataclass
from typing import Optional
import uuid

from app.models.product import ProductModel, ProductAlias, Brand
from app.models.listing import NormalizedListing

logger = structlog.get_logger()

MATCH_THRESHOLD = 0.4


@dataclass
class MatchResult:
    model_id: Optional[uuid.UUID]
    model_name: Optional[str]
    confidence: float
    matched_terms: list[str]


class MatchingService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self._models_cache: list[dict] | None = None

    async def match(self, listing: NormalizedListing) -> MatchResult:
        """Match a listing to a product model using keyword matching."""
        text = f"{listing.title} {listing.description or ''} {listing.brand_raw or ''} {listing.model_raw or ''}".lower()

        models = await self._load_models()
        best_match = None
        best_score = 0.0
        best_terms = []

        for model_info in models:
            score, terms = self._score_match(text, model_info)
            if score > best_score:
                best_score = score
                best_match = model_info
                best_terms = terms

        if best_match and best_score >= MATCH_THRESHOLD:
            # Update listing
            listing.matched_model_id = best_match["id"]
            listing.match_confidence = best_score
            await self.db.flush()

            logger.info(
                "listing.matched",
                listing_id=str(listing.id),
                model=best_match["name"],
                confidence=best_score,
            )
            return MatchResult(
                model_id=best_match["id"],
                model_name=best_match["name"],
                confidence=best_score,
                matched_terms=best_terms,
            )

        logger.info("listing.no_match", listing_id=str(listing.id), best_score=best_score)
        return MatchResult(model_id=None, model_name=None, confidence=best_score, matched_terms=[])

    def _score_match(self, text: str, model_info: dict) -> tuple[float, list[str]]:
        """Calculate match score between listing text and a model."""
        matched_terms = []
        score = 0.0

        # Check brand name
        brand = model_info["brand"].lower()
        if brand in text:
            score += 0.3
            matched_terms.append(brand)

        # Check model name
        model_name = model_info["name"].lower()
        # Check full model name first
        if model_name in text:
            score += 0.5
            matched_terms.append(model_name)
        else:
            # Check individual words of model name
            words = model_name.split()
            matched_words = [w for w in words if len(w) > 2 and w in text]
            if matched_words:
                score += 0.3 * (len(matched_words) / len(words))
                matched_terms.extend(matched_words)

        # Check aliases
        for alias in model_info["aliases"]:
            alias_lower = alias.lower()
            if alias_lower in text:
                score += 0.2
                matched_terms.append(alias_lower)
                break  # Only count one alias match

        return min(score, 1.0), matched_terms

    async def _load_models(self) -> list[dict]:
        """Load all active models with their aliases. Cached per service instance."""
        if self._models_cache is not None:
            return self._models_cache

        result = await self.db.execute(
            select(ProductModel, Brand.name.label("brand_name"))
            .join(Brand, ProductModel.brand_id == Brand.id)
            .where(Brand.is_active == True)
        )
        rows = result.all()

        models = []
        for model, brand_name in rows:
            alias_result = await self.db.execute(
                select(ProductAlias.alias).where(ProductAlias.model_id == model.id)
            )
            aliases = alias_result.scalars().all()

            models.append({
                "id": model.id,
                "name": model.name,
                "brand": brand_name,
                "slug": model.slug,
                "aliases": list(aliases),
            })

        self._models_cache = models
        return models
