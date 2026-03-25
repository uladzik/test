import structlog
from datetime import datetime, timezone

from app.connectors.base import BaseConnector, ConnectorStatus, RawListingData, SearchParams
from app.connectors.registry import ConnectorRegistry
from app.config import settings

logger = structlog.get_logger()


@ConnectorRegistry.register("kleinanzeigen_de")
class KleinanzeigenConnector(BaseConnector):
    """Kleinanzeigen.de connector using Apify actor: memo23/kleinanzeigen-search-cheerio"""

    name = "kleinanzeigen_de"
    marketplace = "kleinanzeigen"
    ACTOR_ID = "memo23/kleinanzeigen-search-cheerio"

    def __init__(self, **kwargs):
        self.apify_token = settings.APIFY_API_TOKEN

    async def authenticate(self) -> bool:
        return bool(self.apify_token)

    async def search(self, params: SearchParams) -> list[RawListingData]:
        from apify_client import ApifyClient

        if not self.apify_token:
            logger.error("kleinanzeigen.search.no_token")
            return []

        client = ApifyClient(self.apify_token)

        search_url = f"https://www.kleinanzeigen.de/s-{params.query.lower().replace(' ', '-')}/k0"

        actor_input = {
            "startUrls": [{"url": search_url}],
            "maxItems": params.per_page,
        }

        logger.info("kleinanzeigen.search.start", query=params.query, url=search_url)

        try:
            run = client.actor(self.ACTOR_ID).call(run_input=actor_input)
            items = list(client.dataset(run["defaultDatasetId"]).iterate_items())

            listings = []
            for item in items:
                listing_id = str(item.get("id", item.get("adId", "")))
                if not listing_id:
                    continue

                listing = RawListingData(
                    source_listing_id=listing_id,
                    url=item.get("url", item.get("link", "")),
                    title=item.get("title", item.get("name", "")),
                    raw_price=str(item.get("price", "")),
                    currency="EUR",
                    raw_data=item,
                    image_urls=self._extract_images(item),
                    fetched_at=datetime.now(timezone.utc),
                )
                listings.append(listing)

            logger.info("kleinanzeigen.search.done", count=len(listings))
            return listings

        except Exception as e:
            logger.error("kleinanzeigen.search.error", error=str(e))
            return []

    async def fetch_listing(self, listing_id: str) -> RawListingData:
        raise NotImplementedError("Use search()")

    async def health_check(self) -> ConnectorStatus:
        if not self.apify_token:
            return ConnectorStatus.DOWN
        return ConnectorStatus.HEALTHY

    def normalize(self, raw: RawListingData) -> dict:
        data = raw.raw_data
        price = data.get("price", "0")
        if isinstance(price, str):
            # Kleinanzeigen prices: "50 €", "VB 30 €", "50 € VB"
            price_clean = price.replace("€", "").replace("VB", "").replace(",", ".").strip()
            try:
                price = float(price_clean)
            except (ValueError, TypeError):
                price = 0

        return {
            "source_listing_id": raw.source_listing_id,
            "url": raw.url if raw.url.startswith("http") else f"https://www.kleinanzeigen.de{raw.url}",
            "title": raw.title,
            "listed_price": price,
            "currency": "EUR",
            "condition": self._map_condition(data.get("condition", "")),
            "brand_raw": data.get("brand", ""),
            "model_raw": "",
            "description": data.get("description", data.get("text", "")),
            "color": "",
            "size": "",
            "image_urls": self._extract_images(data),
            "seller_id": str(data.get("sellerId", data.get("userId", ""))),
            "seller_rating": None,
            "country": "DE",
            "city": data.get("location", data.get("city", "")),
        }

    @staticmethod
    def _extract_images(data: dict) -> list[str]:
        images = data.get("images", data.get("photos", data.get("imageUrls", [])))
        if isinstance(images, list):
            urls = []
            for img in images:
                if isinstance(img, str):
                    urls.append(img)
                elif isinstance(img, dict):
                    urls.append(img.get("url", img.get("src", "")))
            return [u for u in urls if u]
        return []

    @staticmethod
    def _map_condition(condition: str | None) -> str:
        if not condition:
            return "GOOD"
        c = str(condition).lower()
        if "neu" in c or "new" in c:
            return "NEW"
        if "gut" in c or "good" in c:
            return "GOOD"
        if "akzeptabel" in c or "acceptable" in c:
            return "FAIR"
        if "defekt" in c or "broken" in c:
            return "POOR"
        return "GOOD"
