import structlog
from datetime import datetime, timezone

from app.connectors.base import BaseConnector, ConnectorStatus, RawListingData, SearchParams
from app.connectors.registry import ConnectorRegistry
from app.config import settings

logger = structlog.get_logger()


@ConnectorRegistry.register("vinted_de")
class VintedConnector(BaseConnector):
    """Vinted Germany connector using Apify actor: kazkn/vinted-smart-scraper"""

    name = "vinted_de"
    marketplace = "vinted"
    ACTOR_ID = "kazkn/vinted-smart-scraper"

    def __init__(self, **kwargs):
        self.apify_token = settings.APIFY_API_TOKEN

    async def authenticate(self) -> bool:
        return bool(self.apify_token)

    async def search(self, params: SearchParams) -> list[RawListingData]:
        from apify_client import ApifyClient

        if not self.apify_token:
            logger.error("vinted.search.no_token")
            return []

        client = ApifyClient(self.apify_token)

        actor_input = {
            "search": params.query,
            "country": params.country.lower() if params.country else "de",
            "maxItems": 50,
        }

        logger.info("vinted.search.start", query=params.query, country=actor_input["country"])

        try:
            run = client.actor(self.ACTOR_ID).call(
                run_input=actor_input,
                timeout_secs=120,
            )
            items = list(client.dataset(run["defaultDatasetId"]).iterate_items())

            listings = []
            for item in items:
                listing = RawListingData(
                    source_listing_id=str(item.get("id", "")),
                    url=item.get("url", ""),
                    title=item.get("title", ""),
                    raw_price=str(item.get("price", "")),
                    currency=item.get("currency", "EUR"),
                    raw_data=item,
                    image_urls=item.get("photos", []),
                    fetched_at=datetime.now(timezone.utc),
                )
                listings.append(listing)

            logger.info("vinted.search.done", count=len(listings))
            return listings

        except Exception as e:
            logger.error("vinted.search.error", error=str(e))
            return []

    async def fetch_listing(self, listing_id: str) -> RawListingData:
        raise NotImplementedError("Use search() — Apify actor returns full listing data")

    async def health_check(self) -> ConnectorStatus:
        if not self.apify_token:
            return ConnectorStatus.DOWN
        return ConnectorStatus.HEALTHY

    def normalize(self, raw: RawListingData) -> dict:
        data = raw.raw_data
        price = data.get("price", 0)
        if isinstance(price, str):
            price = float(price.replace(",", ".").replace("€", "").strip()) if price else 0

        seller = data.get("seller", {})

        return {
            "source_listing_id": raw.source_listing_id,
            "url": raw.url,
            "title": raw.title,
            "listed_price": price,
            "currency": data.get("currency", "EUR"),
            "condition": self._map_condition(data.get("condition", "")),
            "brand_raw": data.get("brand", ""),
            "model_raw": "",
            "description": "",
            "color": data.get("colour", ""),
            "size": data.get("size", ""),
            "image_urls": data.get("photos", []),
            "seller_id": str(seller.get("id", "")),
            "seller_rating": None,
            "country": data.get("country", "de").upper(),
            "city": "",
        }

    @staticmethod
    def _map_condition(status: str | None) -> str:
        if not status:
            return "GOOD"
        s = str(status).lower()
        mapping = {
            "new_with_tags": "NEW", "new with tags": "NEW", "neu mit etikett": "NEW",
            "neuf avec étiquette": "NEW",
            "new_without_tags": "LIKE_NEW", "new without tags": "LIKE_NEW", "neu ohne etikett": "LIKE_NEW",
            "neuf sans étiquette": "LIKE_NEW",
            "very_good": "LIKE_NEW", "very good": "LIKE_NEW", "sehr gut": "LIKE_NEW",
            "très bon état": "LIKE_NEW",
            "good": "GOOD", "gut": "GOOD", "bon état": "GOOD",
            "satisfactory": "FAIR", "zufriedenstellend": "FAIR", "état satisfaisant": "FAIR",
        }
        return mapping.get(s, "GOOD")
