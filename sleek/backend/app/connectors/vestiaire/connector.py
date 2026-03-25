import structlog
from datetime import datetime, timezone

from app.connectors.base import BaseConnector, ConnectorStatus, RawListingData, SearchParams
from app.connectors.registry import ConnectorRegistry
from app.config import settings

logger = structlog.get_logger()


@ConnectorRegistry.register("vestiaire_de")
class VestiaireConnector(BaseConnector):
    """Vestiaire Collective connector using Apify actor: parseforge/vestiairecollective-scraper"""

    name = "vestiaire_de"
    marketplace = "vestiaire"
    ACTOR_ID = "parseforge/vestiairecollective-scraper"

    def __init__(self, **kwargs):
        self.apify_token = settings.APIFY_API_TOKEN

    async def authenticate(self) -> bool:
        return bool(self.apify_token)

    async def search(self, params: SearchParams) -> list[RawListingData]:
        from apify_client import ApifyClient

        if not self.apify_token:
            logger.error("vestiaire.search.no_token")
            return []

        client = ApifyClient(self.apify_token)

        # Vestiaire search URL for Oakley sunglasses
        search_url = f"https://www.vestiairecollective.com/search/?q={params.query}"

        actor_input = {
            "startUrls": [{"url": search_url}],
            "maxItems": params.per_page,
        }

        logger.info("vestiaire.search.start", query=params.query, url=search_url)

        try:
            run = client.actor(self.ACTOR_ID).call(run_input=actor_input)
            items = list(client.dataset(run["defaultDatasetId"]).iterate_items())

            listings = []
            for item in items:
                listing_id = str(item.get("id", item.get("productId", "")))
                if not listing_id:
                    continue

                listing = RawListingData(
                    source_listing_id=listing_id,
                    url=item.get("url", item.get("link", "")),
                    title=item.get("name", item.get("title", "")),
                    raw_price=str(item.get("price", item.get("priceNumeric", ""))),
                    currency=item.get("currency", "EUR"),
                    raw_data=item,
                    image_urls=self._extract_images(item),
                    fetched_at=datetime.now(timezone.utc),
                )
                listings.append(listing)

            logger.info("vestiaire.search.done", count=len(listings))
            return listings

        except Exception as e:
            logger.error("vestiaire.search.error", error=str(e))
            return []

    async def fetch_listing(self, listing_id: str) -> RawListingData:
        raise NotImplementedError("Use search()")

    async def health_check(self) -> ConnectorStatus:
        if not self.apify_token:
            return ConnectorStatus.DOWN
        return ConnectorStatus.HEALTHY

    def normalize(self, raw: RawListingData) -> dict:
        data = raw.raw_data
        price = data.get("price", data.get("priceNumeric", 0))
        if isinstance(price, str):
            try:
                price = float(price.replace(",", ".").replace("€", "").replace("$", "").strip())
            except (ValueError, TypeError):
                price = 0

        return {
            "source_listing_id": raw.source_listing_id,
            "url": raw.url if raw.url.startswith("http") else f"https://www.vestiairecollective.com{raw.url}",
            "title": raw.title,
            "listed_price": price,
            "currency": data.get("currency", "EUR"),
            "condition": self._map_condition(data.get("condition", "")),
            "brand_raw": data.get("brand", data.get("brandName", "")),
            "model_raw": data.get("model", ""),
            "description": data.get("description", ""),
            "color": data.get("color", data.get("colour", "")),
            "size": data.get("size", ""),
            "image_urls": self._extract_images(data),
            "seller_id": str(data.get("sellerId", "")),
            "seller_rating": data.get("sellerRating"),
            "country": data.get("country", data.get("sellerCountry", "")),
            "city": data.get("location", ""),
        }

    @staticmethod
    def _extract_images(data: dict) -> list[str]:
        images = data.get("images", data.get("photos", data.get("pictures", [])))
        if isinstance(images, list):
            urls = []
            for img in images:
                if isinstance(img, str):
                    urls.append(img)
                elif isinstance(img, dict):
                    urls.append(img.get("url", img.get("src", "")))
            return [u for u in urls if u]
        # Single image field
        if data.get("image"):
            return [data["image"]]
        return []

    @staticmethod
    def _map_condition(condition: str | None) -> str:
        if not condition:
            return "GOOD"
        c = str(condition).lower()
        if "never worn" in c or "new" in c:
            return "NEW"
        if "very good" in c or "excellent" in c:
            return "LIKE_NEW"
        if "good" in c:
            return "GOOD"
        if "fair" in c or "acceptable" in c:
            return "FAIR"
        return "GOOD"
