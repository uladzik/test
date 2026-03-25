from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
from typing import Optional


class ConnectorStatus(str, Enum):
    HEALTHY = "healthy"
    DEGRADED = "degraded"
    DOWN = "down"


@dataclass
class SearchParams:
    query: str
    category: Optional[str] = None
    brand: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    country: str = "DE"
    page: int = 1
    per_page: int = 50


@dataclass
class RawListingData:
    source_listing_id: str
    url: str
    title: str
    raw_price: str
    currency: str
    raw_data: dict
    image_urls: list[str] = field(default_factory=list)
    html_snapshot: Optional[str] = None
    fetched_at: datetime = field(default_factory=datetime.utcnow)


class BaseConnector(ABC):
    """Abstract interface for all marketplace connectors."""

    name: str
    marketplace: str

    @abstractmethod
    async def authenticate(self) -> bool:
        """Authenticate with the marketplace. Return True if no auth needed."""
        ...

    @abstractmethod
    async def search(self, params: SearchParams) -> list[RawListingData]:
        """Search listings, return raw listing data."""
        ...

    @abstractmethod
    async def fetch_listing(self, listing_id: str) -> RawListingData:
        """Fetch full listing data for a single listing."""
        ...

    @abstractmethod
    async def health_check(self) -> ConnectorStatus:
        """Check if the source is reachable and functional."""
        ...

    def normalize(self, raw: RawListingData) -> dict:
        """Source-specific pre-normalization. Override if needed."""
        return {
            "source_listing_id": raw.source_listing_id,
            "url": raw.url,
            "title": raw.title,
            "raw_price": raw.raw_price,
            "currency": raw.currency,
            "image_urls": raw.image_urls,
        }
