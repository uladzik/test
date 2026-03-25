import structlog
from datetime import datetime, timezone

from app.connectors.base import BaseConnector, ConnectorStatus, RawListingData, SearchParams
from app.connectors.registry import ConnectorRegistry
from app.config import settings

logger = structlog.get_logger()


@ConnectorRegistry.register("depop_de")
class DepopConnector(BaseConnector):
    """Depop connector using Apify actor: lexis-solutions/depop-scraper"""

    name = "depop_de"
    marketplace = "depop"
    ACTOR_ID = "lexis-solutions/depop-scraper"

    def __init__(self, **kwargs):
        self.apify_token = settings.APIFY_API_TOKEN

    async def authenticate(self) -> bool:
        return bool(self.apify_token)

    async def search(self, params: SearchParams) -> list[RawListingData]:
        from apify_client import ApifyClient

        if not self.apify_token:
            logger.error("depop.search.no_token")
            return []

        client = ApifyClient(self.apify_token)

        actor_input = {
            "searchQuery": params.query,
            "maxItems": params.per_page,
        }

        logger.info("depop.search.start", query=params.query)

        try:
            run = client.actor(self.ACTOR_ID).call(run_input=actor_input)
            items = list(client.dataset(run["defaultDatasetId"]).iterate_items())

            listings = []
            for item in items:
                listing_id = str(item.get("id", item.get("slug", "")))
                if not listing_id:
                    continue

                listing = RawListingData(
                    source_listing_id=listing_id,
                    url=item.get("url", ""),
                    title=item.get("description", item.get("title", "")),
                    raw_price=str(item.get("price", "")),
                    currency=item.get("currency", "EUR"),
                    raw_data=item,
                    image_urls=self._extract_images(item),
                    fetched_at=datetime.now(timezone.utc),
                )
                listings.append(listing)

            logger.info("depop.search.done", count=len(listings))
            return listings

        except Exception as e:
            logger.error("depop.search.error", error=str(e))
            return []

    async def fetch_listing(self, listing_id: str) -> RawListingData:
        raise NotImplementedError("Use search()")

    async def health_check(self) -> ConnectorStatus:
        if not self.apify_token:
            return ConnectorStatus.DOWN
        return ConnectorStatus.HEALTHY

    def normalize(self, raw: RawListingData) -> dict:
        data = raw.raw_data
        price = data.get("price", data.get("priceAmount", 0))
        if isinstance(price, str):
            try:
                price = float(price.replace(",", ".").replace("€", "").replace("$", "").strip())
            except (ValueError, TypeError):
                price = 0

        # Depop uses country codes for location
        country = data.get("country", data.get("countryCode", ""))
        if country.upper() in ("DE", "GERMANY"):
            country = "DE"

        return {
            "source_listing_id": raw.source_listing_id,
            "url": raw.url if raw.url.startswith("http") else f"https://www.depop.com{raw.url}",
            "title": raw.title,
            "listed_price": price,
            "currency": data.get("currency", "EUR"),
            "condition": self._map_condition(data.get("condition", "")),
            "brand_raw": data.get("brand", data.get("brandName", "")),
            "model_raw": "",
            "description": data.get("description", ""),
            "color": data.get("colour", data.get("color", "")),
            "size": data.get("size", data.get("productSize", "")),
            "image_urls": self._extract_images(data),
            "seller_id": str(data.get("sellerId", data.get("seller", {}).get("id", ""))),
            "seller_rating": data.get("sellerRating"),
            "country": country,
            "city": "",
        }

    @staticmethod
    def _extract_images(data: dict) -> list[str]:
        images = data.get("images", data.get("pictures", data.get("photos", [])))
        if isinstance(images, list):
            urls = []
            for img in images:
                if isinstance(img, str):
                    urls.append(img)
                elif isinstance(img, dict):
                    urls.append(img.get("url", img.get("path", "")))
            return [u for u in urls if u]
        return []

    @staticmethod
    def _map_condition(condition: str | None) -> str:
        if not condition:
            return "GOOD"
        c = str(condition).lower()
        if "new" in c or "brand new" in c or "bnwt" in c:
            return "NEW"
        if "like new" in c or "bnwot" in c:
            return "LIKE_NEW"
        if "good" in c or "used" in c:
            return "GOOD"
        if "fair" in c or "worn" in c:
            return "FAIR"
        return "GOOD"
