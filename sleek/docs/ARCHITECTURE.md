# OAKLEY DEAL INTELLIGENCE PLATFORM
## Architecture Blueprint v1.0
### Codename: SLEEK

---

## 1. EXECUTIVE SUMMARY

SLEEK is a deal intelligence platform that monitors second-hand marketplaces to find underpriced Oakley glasses listings and surfaces the best resale opportunities through a unified control panel. The system crawls listings from Vinted, Kleinanzeigen, Depop, and Vestiaire Collective; normalizes and enriches the data; scores each listing by margin potential, risk, and confidence; and presents ranked opportunities with configurable offer strategies.

**Architecture approach:** Modular monolith in a Python monorepo, deployed as Docker containers, designed for horizontal scaling and future decomposition into independent services. Each marketplace is an isolated connector. Core business logic is brand/marketplace-agnostic, driven by configuration.

**MVP target:** Oakley glasses, Germany, 4 connectors, deal scoring, offer engine, admin dashboard, manual review queue.

---

## 2. PRODUCT SCOPE

### 2.1 Current Scope (Phase 1)
- **Brand:** Oakley
- **Category:** Glasses (sunglasses, prescription, goggles)
- **Geography:** Germany
- **Sources:** Vinted DE, Kleinanzeigen, Depop, Vestiaire Collective
- **Users:** Internal operators (1-5 people)
- **Mode:** Semi-automated — system finds and scores deals, humans review and act

### 2.2 Future Scope (Phase 2-3)
- More brands (Ray-Ban, Persol, Maui Jim, etc.)
- More categories (watches, sneakers, bags)
- European expansion (FR, IT, ES, NL, UK)
- Full automation with AI agents
- SaaS multi-tenant architecture

### 2.3 Hybrid Model
1. **Internal tool** — operators use the dashboard to find and execute deals
2. **Intelligence platform** — data and scoring become a product for third-party resellers
3. **Automated agent** — AI agents handle end-to-end deal execution

---

## 3. CORE USE CASES

| ID | Use Case | Actor | Priority |
|----|----------|-------|----------|
| UC-01 | Crawl marketplace listings for Oakley glasses | System (scheduler) | P0 |
| UC-02 | Normalize and deduplicate listings | System (pipeline) | P0 |
| UC-03 | Identify Oakley model from listing data | System (matcher) | P0 |
| UC-04 | Estimate fair market value and resale value | System (valuator) | P0 |
| UC-05 | Score and rank deal opportunities | System (scorer) | P0 |
| UC-06 | Generate offer recommendations | System (offer engine) | P0 |
| UC-07 | View and filter deal feed in dashboard | Operator | P0 |
| UC-08 | Send listing to manual review | System / Operator | P0 |
| UC-09 | Approve/reject/override offer | Operator | P0 |
| UC-10 | Configure offer strategy per model/source | Operator | P1 |
| UC-11 | Monitor source connector health | Operator | P1 |
| UC-12 | View analytics and trends | Operator | P2 |
| UC-13 | Receive alerts for high-value deals | Operator | P2 |
| UC-14 | Detect counterfeit risk | System (AI) | P2 |
| UC-15 | Analyze listing images for condition | System (AI) | P3 |

---

## 4. HIGH-LEVEL ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ADMIN PANEL (Next.js)                        │
│  Dashboard │ Deal Feed │ Review Queue │ Offers │ Analytics │ Config │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ REST API
┌──────────────────────────────▼──────────────────────────────────────┐
│                        API GATEWAY (FastAPI)                        │
│  /api/v1/opportunities │ /api/v1/offers │ /api/v1/sources │ ...    │
└──────┬──────────────┬────────────────┬──────────────┬──────────────┘
       │              │                │              │
┌──────▼──────┐ ┌─────▼──────┐ ┌──────▼──────┐ ┌─────▼──────┐
│    Deal     │ │   Offer    │ │  Valuation  │ │  Product   │
│   Engine    │ │   Engine   │ │   Service   │ │Intelligence│
└──────┬──────┘ └────────────┘ └──────┬──────┘ └─────┬──────┘
       │                              │              │
┌──────▼──────────────────────────────▼──────────────▼───────────────┐
│                     EVENT BUS (Redis Streams)                      │
│  listing.ingested │ listing.normalized │ listing.scored │ ...       │
└──────┬──────────────────────────────┬──────────────────────────────┘
       │                              │
┌──────▼──────┐              ┌────────▼────────┐
│ Normalization│              │  Source Connectors│
│   Pipeline  │              │  ┌─────────────┐ │
└──────┬──────┘              │  │   Vinted     │ │
       │                     │  ├─────────────┤ │
┌──────▼──────┐              │  │Kleinanzeigen │ │
│    Raw      │              │  ├─────────────┤ │
│  Ingestion  │              │  │   Depop      │ │
└──────┬──────┘              │  ├─────────────┤ │
       │                     │  │ Vestiaire    │ │
┌──────▼──────┐              │  └─────────────┘ │
│ PostgreSQL  │              └──────────────────┘
│  + Redis    │
│  + S3/MinIO │
│  + OpenSearch│
└─────────────┘
```

### Data Flow (Happy Path)
```
Scheduler triggers crawl
  → Connector.search() fetches listing URLs
  → Connector.fetch_listing() gets raw data
  → Raw Ingestion stores raw payload + snapshots
  → EVENT: listing.raw_ingested
  → Normalization pipeline normalizes fields
  → Deduplication checks for existing listing
  → EVENT: listing.normalized
  → Product Intelligence matches brand/model
  → EVENT: listing.matched
  → Valuation estimates market value + resale value
  → EVENT: listing.valued
  → Deal Engine calculates scores
  → Offer Engine generates recommendation
  → EVENT: opportunity.created
  → Dashboard displays ranked opportunity
  → Operator reviews → approves/rejects/overrides
```

---

## 5. RECOMMENDED TECH STACK

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Backend** | Python 3.12+ | Strong ecosystem for scraping, ML, data processing |
| **API Framework** | FastAPI | Async, typed, fast, OpenAPI docs built-in |
| **Frontend** | Next.js 14 (App Router) | SSR, great DX, rich ecosystem |
| **UI Components** | shadcn/ui + Tailwind CSS | Production-quality, customizable |
| **Database** | PostgreSQL 16 | JSONB for flexible data, strong reliability |
| **Migrations** | Alembic | Standard for SQLAlchemy |
| **ORM** | SQLAlchemy 2.0 (async) | Mature, typed, async support |
| **Cache** | Redis 7 | Caching, rate limiting, sessions |
| **Message Queue** | Redis Streams (→ RabbitMQ later) | Simple to start, upgrade path clear |
| **Task Workers** | Celery 5 + Redis broker | Battle-tested, rich feature set |
| **Browser Automation** | Playwright | Multi-browser, stealth mode, async |
| **Search/Indexing** | OpenSearch | Full-text search, aggregations, analytics |
| **Object Storage** | MinIO (dev) / S3 (prod) | Raw HTML, screenshots, assets |
| **Containerization** | Docker + Docker Compose | Dev parity, easy deployment |
| **Orchestration** | Docker Compose (MVP) → K8s (scale) | Practical progression |
| **Monitoring** | Structlog + Prometheus + Grafana | Structured logs, metrics, dashboards |
| **Tracing** | OpenTelemetry | Distributed tracing standard |
| **Error Tracking** | Sentry | Real-time error alerting |
| **CI/CD** | GitHub Actions | Integrated with repo |
| **Linting/Formatting** | Ruff + mypy | Fast, strict Python tooling |
| **Testing** | pytest + pytest-asyncio | Standard Python testing |
| **API Client (frontend)** | TanStack Query | Caching, optimistic updates |

---

## 6. MONOREPO / FOLDER STRUCTURE

```
sleek/
├── README.md
├── docker-compose.yml
├── docker-compose.dev.yml
├── Makefile
├── .env.example
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── lint.yml
│       └── deploy.yml
│
├── docs/
│   ├── ARCHITECTURE.md          # this file
│   ├── API.md
│   ├── CONNECTOR_GUIDE.md
│   └── RUNBOOK.md
│
├── backend/
│   ├── Dockerfile
│   ├── pyproject.toml
│   ├── alembic.ini
│   ├── alembic/
│   │   └── versions/
│   │
│   └── src/
│       └── sleek/
│           ├── __init__.py
│           ├── main.py                    # FastAPI app entry
│           ├── config.py                  # Settings (pydantic-settings)
│           ├── dependencies.py            # DI container
│           │
│           ├── api/                       # API layer
│           │   ├── __init__.py
│           │   ├── router.py              # Root router
│           │   ├── middleware.py
│           │   ├── auth.py
│           │   ├── v1/
│           │   │   ├── __init__.py
│           │   │   ├── opportunities.py
│           │   │   ├── offers.py
│           │   │   ├── sources.py
│           │   │   ├── reviews.py
│           │   │   ├── products.py
│           │   │   ├── analytics.py
│           │   │   ├── config.py
│           │   │   └── health.py
│           │   └── schemas/               # Pydantic request/response models
│           │       ├── __init__.py
│           │       ├── opportunity.py
│           │       ├── offer.py
│           │       ├── source.py
│           │       ├── review.py
│           │       ├── product.py
│           │       └── common.py
│           │
│           ├── core/                      # Core business logic (marketplace-agnostic)
│           │   ├── __init__.py
│           │   ├── deal_engine.py          # Scoring + ranking
│           │   ├── offer_engine.py         # Offer calculation
│           │   ├── valuation_engine.py     # Market value estimation
│           │   ├── risk_engine.py          # Risk assessment
│           │   ├── product_matcher.py      # Brand/model matching
│           │   ├── normalizer.py           # Field normalization
│           │   ├── deduplicator.py         # Cross-crawl dedup
│           │   └── formulas.py             # All scoring formulas
│           │
│           ├── connectors/                # Marketplace connectors
│           │   ├── __init__.py
│           │   ├── base.py                # Abstract connector interface
│           │   ├── registry.py            # Connector registry
│           │   ├── vinted/
│           │   │   ├── __init__.py
│           │   │   ├── connector.py
│           │   │   ├── parser.py
│           │   │   ├── auth.py
│           │   │   └── config.py
│           │   ├── kleinanzeigen/
│           │   │   ├── __init__.py
│           │   │   ├── connector.py
│           │   │   ├── parser.py
│           │   │   └── config.py
│           │   ├── depop/
│           │   │   ├── __init__.py
│           │   │   ├── connector.py
│           │   │   ├── parser.py
│           │   │   └── config.py
│           │   └── vestiaire/
│           │       ├── __init__.py
│           │       ├── connector.py
│           │       ├── parser.py
│           │       └── config.py
│           │
│           ├── models/                    # SQLAlchemy models
│           │   ├── __init__.py
│           │   ├── base.py
│           │   ├── source.py
│           │   ├── crawl.py
│           │   ├── listing.py
│           │   ├── product.py
│           │   ├── valuation.py
│           │   ├── opportunity.py
│           │   ├── offer.py
│           │   ├── review.py
│           │   ├── alert.py
│           │   ├── user.py
│           │   └── audit.py
│           │
│           ├── services/                  # Application services (orchestration)
│           │   ├── __init__.py
│           │   ├── ingestion_service.py
│           │   ├── normalization_service.py
│           │   ├── matching_service.py
│           │   ├── valuation_service.py
│           │   ├── opportunity_service.py
│           │   ├── offer_service.py
│           │   ├── review_service.py
│           │   ├── alert_service.py
│           │   ├── source_health_service.py
│           │   └── analytics_service.py
│           │
│           ├── workers/                   # Celery tasks
│           │   ├── __init__.py
│           │   ├── celery_app.py
│           │   ├── crawl_tasks.py
│           │   ├── ingestion_tasks.py
│           │   ├── normalization_tasks.py
│           │   ├── matching_tasks.py
│           │   ├── valuation_tasks.py
│           │   ├── scoring_tasks.py
│           │   ├── alert_tasks.py
│           │   └── maintenance_tasks.py
│           │
│           ├── events/                    # Event definitions + handlers
│           │   ├── __init__.py
│           │   ├── bus.py                 # Event bus abstraction
│           │   ├── definitions.py         # Event name constants
│           │   └── handlers.py            # Event → task routing
│           │
│           ├── storage/                   # Object storage abstraction
│           │   ├── __init__.py
│           │   ├── base.py
│           │   ├── s3.py
│           │   └── local.py
│           │
│           ├── search/                    # OpenSearch integration
│           │   ├── __init__.py
│           │   ├── indexer.py
│           │   ├── queries.py
│           │   └── mappings.py
│           │
│           ├── db/                        # Database utilities
│           │   ├── __init__.py
│           │   ├── session.py
│           │   ├── repository.py          # Base repository pattern
│           │   └── repositories/
│           │       ├── __init__.py
│           │       ├── listing_repo.py
│           │       ├── opportunity_repo.py
│           │       ├── product_repo.py
│           │       └── offer_repo.py
│           │
│           ├── agents/                    # Future AI agent modules
│           │   ├── __init__.py
│           │   ├── base.py
│           │   └── README.md
│           │
│           └── utils/
│               ├── __init__.py
│               ├── currency.py
│               ├── text.py
│               ├── geo.py
│               └── observability.py
│
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── tailwind.config.ts
│   │
│   └── src/
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx                   # Dashboard
│       │   ├── opportunities/
│       │   │   ├── page.tsx               # Deal feed
│       │   │   └── [id]/
│       │   │       └── page.tsx           # Detail
│       │   ├── reviews/
│       │   │   └── page.tsx               # Review queue
│       │   ├── sources/
│       │   │   └── page.tsx               # Source health
│       │   ├── offers/
│       │   │   └── page.tsx               # Offer strategies
│       │   ├── products/
│       │   │   └── page.tsx               # Product catalog
│       │   ├── analytics/
│       │   │   └── page.tsx               # Analytics
│       │   └── settings/
│       │       └── page.tsx               # Config
│       │
│       ├── components/
│       │   ├── ui/                        # shadcn components
│       │   ├── layout/
│       │   │   ├── sidebar.tsx
│       │   │   ├── header.tsx
│       │   │   └── page-shell.tsx
│       │   ├── opportunities/
│       │   │   ├── deal-table.tsx
│       │   │   ├── deal-card.tsx
│       │   │   ├── score-badge.tsx
│       │   │   └── filter-bar.tsx
│       │   ├── reviews/
│       │   │   ├── review-card.tsx
│       │   │   └── review-actions.tsx
│       │   └── charts/
│       │       ├── margin-chart.tsx
│       │       └── source-health-chart.tsx
│       │
│       ├── lib/
│       │   ├── api.ts                     # API client
│       │   ├── types.ts                   # Shared types
│       │   └── utils.ts
│       │
│       └── hooks/
│           ├── use-opportunities.ts
│           ├── use-offers.ts
│           └── use-sources.ts
│
├── scripts/
│   ├── seed_products.py                   # Seed Oakley product catalog
│   ├── seed_offer_strategies.py
│   ├── run_crawl.py                       # Manual crawl trigger
│   └── backfill_valuations.py
│
├── tests/
│   ├── conftest.py
│   ├── factories/                         # Test data factories
│   │   ├── listing_factory.py
│   │   └── opportunity_factory.py
│   ├── unit/
│   │   ├── core/
│   │   │   ├── test_deal_engine.py
│   │   │   ├── test_offer_engine.py
│   │   │   ├── test_valuation_engine.py
│   │   │   └── test_product_matcher.py
│   │   └── connectors/
│   │       ├── test_vinted_parser.py
│   │       └── test_kleinanzeigen_parser.py
│   ├── integration/
│   │   ├── test_ingestion_pipeline.py
│   │   ├── test_scoring_pipeline.py
│   │   └── test_api_opportunities.py
│   └── e2e/
│       └── test_full_pipeline.py
│
└── data/
    ├── oakley_models.json                 # Oakley product taxonomy
    ├── oakley_aliases.json                # Model name aliases / keywords
    ├── offer_strategies.json              # Default offer configs
    └── country_configs.json               # Country-specific settings
```

---

## 7. CORE SERVICES

### 7.1 Ingestion Service
**Purpose:** Receive raw listing data from connectors, store it, emit events.

```python
class IngestionService:
    async def ingest_raw_listing(self, source_id: str, raw_data: dict, html: str | None) -> RawListing:
        # 1. Store raw payload in DB (JSONB)
        # 2. Store HTML/JSON snapshot in object storage
        # 3. Emit event: listing.raw_ingested
        # 4. Return raw listing record

    async def bulk_ingest(self, source_id: str, listings: list[dict]) -> list[RawListing]:
        # Batch version for efficiency
```

### 7.2 Normalization Service
**Purpose:** Transform raw data into a unified schema.

```python
class NormalizationService:
    async def normalize(self, raw_listing: RawListing) -> NormalizedListing:
        # 1. Extract and normalize: title, price, currency, condition, location, images
        # 2. Convert currency to EUR
        # 3. Normalize country/city
        # 4. Normalize condition to enum (NEW, LIKE_NEW, GOOD, FAIR, POOR)
        # 5. Run deduplication check
        # 6. Store normalized listing
        # 7. Emit event: listing.normalized
```

### 7.3 Matching Service
**Purpose:** Identify brand/model from listing data.

```python
class MatchingService:
    async def match_product(self, listing: NormalizedListing) -> MatchResult:
        # 1. Extract keywords from title + description
        # 2. Match against product_models + product_aliases
        # 3. Calculate match confidence (0.0 - 1.0)
        # 4. Return MatchResult(model_id, confidence, matched_terms)
        # 5. Emit event: listing.matched
```

### 7.4 Valuation Service
**Purpose:** Estimate fair market value and resale value.

```python
class ValuationService:
    async def valuate(self, listing: NormalizedListing, model: ProductModel) -> ValuationResult:
        # 1. Look up historical price observations for this model
        # 2. Calculate market_value = median of recent sold prices (adjusted for condition)
        # 3. Calculate resale_value = market_value * resale_factor (platform-specific)
        # 4. Store valuation result
        # 5. Emit event: listing.valued
```

### 7.5 Opportunity Service
**Purpose:** Orchestrate deal scoring, offer generation, opportunity creation.

```python
class OpportunityService:
    async def evaluate(self, listing: NormalizedListing, valuation: ValuationResult) -> Opportunity:
        # 1. Calculate deal scores via DealEngine
        # 2. Generate offer via OfferEngine
        # 3. Apply business rules (reject/review/approve)
        # 4. Create opportunity record
        # 5. Emit event: opportunity.created | opportunity.sent_to_review
```

### 7.6 Offer Service
**Purpose:** Manage offer strategies, calculate recommended offers.

```python
class OfferService:
    async def calculate_offer(self, opportunity: Opportunity) -> OfferRecommendation:
        # Delegates to OfferEngine with loaded strategy config

    async def override_offer(self, opportunity_id: str, amount: Decimal, user_id: str) -> Offer:
        # Manual override with audit trail
```

### 7.7 Review Service
**Purpose:** Manage human-in-the-loop review queue.

```python
class ReviewService:
    async def submit_for_review(self, opportunity: Opportunity, reason: str) -> ManualReview:
        # 1. Create review record
        # 2. Link to opportunity
        # 3. Set status = PENDING

    async def resolve_review(self, review_id: str, decision: str, notes: str, user_id: str) -> ManualReview:
        # 1. Update review status (APPROVED / REJECTED / ESCALATED)
        # 2. Update opportunity status
        # 3. Log audit trail
```

### 7.8 Source Health Service
**Purpose:** Track connector health, detect failures.

```python
class SourceHealthService:
    async def record_crawl_result(self, source_id: str, job_id: str, stats: CrawlStats):
        # Track success rate, listing count, errors, latency

    async def get_health_status(self, source_id: str) -> SourceHealth:
        # Return current health, recent errors, trends
```

---

## 8. MARKETPLACE CONNECTOR DESIGN

### 8.1 Abstract Connector Interface

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass
from enum import Enum

class ConnectorStatus(str, Enum):
    HEALTHY = "healthy"
    DEGRADED = "degraded"
    DOWN = "down"

@dataclass
class RawListingData:
    source_listing_id: str
    url: str
    title: str
    raw_price: str
    currency: str
    raw_data: dict          # Full API/HTML response
    html_snapshot: str | None
    image_urls: list[str]
    fetched_at: datetime

@dataclass
class SearchParams:
    query: str              # e.g. "Oakley"
    category: str | None
    min_price: float | None
    max_price: float | None
    country: str            # e.g. "DE"
    page: int = 1
    per_page: int = 50

class BaseConnector(ABC):
    """Abstract interface for all marketplace connectors."""

    def __init__(self, config: ConnectorConfig):
        self.config = config
        self.name: str  # e.g. "vinted_de"

    @abstractmethod
    async def authenticate(self) -> bool:
        """Authenticate with the marketplace. Return True if no auth needed."""
        ...

    @abstractmethod
    async def search(self, params: SearchParams) -> list[str]:
        """Search listings, return list of listing URLs or IDs."""
        ...

    @abstractmethod
    async def fetch_listing(self, listing_id: str) -> RawListingData:
        """Fetch full listing data for a single listing."""
        ...

    @abstractmethod
    async def parse_listing(self, raw: RawListingData) -> dict:
        """Parse raw data into semi-structured dict."""
        ...

    @abstractmethod
    async def health_check(self) -> ConnectorStatus:
        """Check if the source is reachable and functional."""
        ...

    async def normalize(self, parsed: dict) -> dict:
        """Source-specific normalization before core normalizer."""
        return parsed  # Default passthrough; override if needed
```

### 8.2 Connector Registry

```python
class ConnectorRegistry:
    _connectors: dict[str, type[BaseConnector]] = {}

    @classmethod
    def register(cls, name: str):
        def decorator(connector_cls: type[BaseConnector]):
            cls._connectors[name] = connector_cls
            return connector_cls
        return decorator

    @classmethod
    def get(cls, name: str, config: ConnectorConfig) -> BaseConnector:
        return cls._connectors[name](config)

    @classmethod
    def list_all(cls) -> list[str]:
        return list(cls._connectors.keys())

# Usage:
@ConnectorRegistry.register("vinted_de")
class VintedConnector(BaseConnector):
    ...
```

### 8.3 Connector Implementation Pattern (Vinted Example)

```python
@ConnectorRegistry.register("vinted_de")
class VintedConnector(BaseConnector):
    name = "vinted_de"

    async def authenticate(self) -> bool:
        # Vinted uses session cookies
        # Use Playwright to obtain session, store in Redis
        session = await self._get_or_refresh_session()
        return session is not None

    async def search(self, params: SearchParams) -> list[str]:
        # Hit Vinted's API: /api/v2/catalog/items
        # Handle pagination
        # Return listing IDs
        ...

    async def fetch_listing(self, listing_id: str) -> RawListingData:
        # GET /api/v2/items/{listing_id}
        # Store full JSON response
        ...

    async def parse_listing(self, raw: RawListingData) -> dict:
        # Extract: title, brand, price, size, condition, photos, seller info
        return VintedParser.parse(raw.raw_data)

    async def health_check(self) -> ConnectorStatus:
        # Try a lightweight search, check response code
        ...
```

### 8.4 Adding a New Connector (Checklist)

1. Create `backend/src/sleek/connectors/{name}/` directory
2. Implement `connector.py` extending `BaseConnector`
3. Implement `parser.py` for source-specific parsing
4. Add `config.py` for source-specific settings
5. Register with `@ConnectorRegistry.register("{name}")`
6. Add source record to `sources` table via migration or seed
7. Add connector config to env vars / config
8. Write unit tests for parser
9. Write integration test for search + fetch

---

## 9. DATABASE SCHEMA

### 9.1 Entity Relationship Overview

```
sources ──< crawl_jobs ──< raw_listings ──< normalized_listings
                                                    │
                                            listing_images
                                                    │
brands ──< product_categories ──< product_models ──< product_aliases
                                        │
                                        ├── price_observations
                                        ├── valuation_results
                                        │
                               normalized_listings
                                        │
                                        ├── risk_assessments
                                        ├── opportunities ──< offer_strategies
                                        │        │
                                        │        ├── manual_reviews
                                        │        └── alerts
                                        │
                               user_accounts ──< audit_logs
```

### 9.2 Table Definitions

#### `sources`
**Purpose:** Registry of marketplace data sources.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID (PK) | |
| name | VARCHAR(100) | e.g. "vinted_de" |
| display_name | VARCHAR(200) | e.g. "Vinted Germany" |
| marketplace | VARCHAR(50) | e.g. "vinted" |
| country | VARCHAR(2) | ISO country code |
| base_url | VARCHAR(500) | |
| connector_class | VARCHAR(200) | Python class path |
| is_active | BOOLEAN | Enable/disable |
| auth_config | JSONB | Encrypted auth params |
| rate_limit_rpm | INTEGER | Requests per minute |
| crawl_interval_minutes | INTEGER | How often to crawl |
| last_crawl_at | TIMESTAMPTZ | |
| health_status | VARCHAR(20) | healthy/degraded/down |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

#### `crawl_jobs`
**Purpose:** Track each crawl execution for audit and debugging.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID (PK) | |
| source_id | UUID (FK → sources) | |
| status | VARCHAR(20) | pending/running/completed/failed |
| search_params | JSONB | Query, filters used |
| listings_found | INTEGER | Total listings returned |
| listings_new | INTEGER | New listings ingested |
| listings_updated | INTEGER | Existing listings updated |
| errors | JSONB | Error details if any |
| started_at | TIMESTAMPTZ | |
| completed_at | TIMESTAMPTZ | |
| duration_seconds | FLOAT | |
| created_at | TIMESTAMPTZ | |

**Relationships:** belongs to `sources`

#### `raw_listings`
**Purpose:** Immutable store of raw listing data as received from the source.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID (PK) | |
| source_id | UUID (FK → sources) | |
| crawl_job_id | UUID (FK → crawl_jobs) | |
| source_listing_id | VARCHAR(200) | ID on the marketplace |
| url | VARCHAR(2000) | Original listing URL |
| raw_payload | JSONB | Full API/scraped response |
| snapshot_path | VARCHAR(500) | S3 path to HTML/JSON snapshot |
| fetched_at | TIMESTAMPTZ | |
| created_at | TIMESTAMPTZ | |

**Relationships:** belongs to `sources`, `crawl_jobs`
**Index:** UNIQUE(source_id, source_listing_id, fetched_at)

#### `normalized_listings`
**Purpose:** Cleaned, unified listing data ready for analysis.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID (PK) | |
| raw_listing_id | UUID (FK → raw_listings) | |
| source_id | UUID (FK → sources) | |
| source_listing_id | VARCHAR(200) | |
| url | VARCHAR(2000) | |
| title | VARCHAR(500) | Normalized title |
| description | TEXT | |
| listed_price | DECIMAL(10,2) | |
| currency | VARCHAR(3) | Always EUR after normalization |
| original_price | DECIMAL(10,2) | Before currency conversion |
| original_currency | VARCHAR(3) | |
| condition | VARCHAR(20) | NEW/LIKE_NEW/GOOD/FAIR/POOR |
| brand_raw | VARCHAR(200) | As stated by seller |
| model_raw | VARCHAR(200) | As stated by seller |
| category_raw | VARCHAR(200) | |
| color | VARCHAR(100) | |
| size | VARCHAR(50) | |
| country | VARCHAR(2) | |
| city | VARCHAR(200) | |
| seller_id | VARCHAR(200) | |
| seller_rating | FLOAT | |
| image_count | INTEGER | |
| listing_created_at | TIMESTAMPTZ | When listed on marketplace |
| is_active | BOOLEAN | Still available? |
| is_duplicate | BOOLEAN | Cross-crawl duplicate |
| duplicate_of_id | UUID (FK → self) | |
| matched_model_id | UUID (FK → product_models) | |
| match_confidence | FLOAT | 0.0 - 1.0 |
| data_quality_score | FLOAT | Completeness metric |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

**Relationships:** belongs to `raw_listings`, `sources`, optionally `product_models`
**Indexes:** source_id + source_listing_id (unique active), matched_model_id, listed_price, created_at

#### `listing_images`
**Purpose:** Store image metadata and analysis results.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID (PK) | |
| normalized_listing_id | UUID (FK) | |
| source_url | VARCHAR(2000) | Original image URL |
| stored_path | VARCHAR(500) | S3 path to downloaded image |
| position | INTEGER | Image order (1 = primary) |
| width | INTEGER | |
| height | INTEGER | |
| quality_score | FLOAT | Image quality assessment |
| analysis_result | JSONB | Future: AI image analysis |
| created_at | TIMESTAMPTZ | |

#### `brands`
**Purpose:** Brand registry (marketplace-agnostic).

| Field | Type | Description |
|-------|------|-------------|
| id | UUID (PK) | |
| name | VARCHAR(200) | e.g. "Oakley" |
| slug | VARCHAR(200) | e.g. "oakley" |
| is_active | BOOLEAN | Currently tracked |
| config | JSONB | Brand-specific settings |
| created_at | TIMESTAMPTZ | |

#### `product_categories`
**Purpose:** Product category hierarchy.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID (PK) | |
| brand_id | UUID (FK → brands) | |
| name | VARCHAR(200) | e.g. "Sunglasses" |
| slug | VARCHAR(200) | |
| parent_id | UUID (FK → self) | For subcategories |
| is_active | BOOLEAN | |
| created_at | TIMESTAMPTZ | |

#### `product_models`
**Purpose:** Specific product models we track and value.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID (PK) | |
| brand_id | UUID (FK → brands) | |
| category_id | UUID (FK → product_categories) | |
| name | VARCHAR(300) | e.g. "Oakley Holbrook" |
| slug | VARCHAR(300) | |
| sku | VARCHAR(100) | If known |
| retail_price | DECIMAL(10,2) | Original retail price |
| retail_currency | VARCHAR(3) | |
| year_released | INTEGER | |
| is_discontinued | BOOLEAN | |
| popularity_tier | VARCHAR(20) | HIGH/MEDIUM/LOW |
| resale_factor | FLOAT | e.g. 0.85 = 85% of market value |
| config | JSONB | Model-specific config |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

#### `product_aliases`
**Purpose:** Alternative names, misspellings, keywords for model matching.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID (PK) | |
| model_id | UUID (FK → product_models) | |
| alias | VARCHAR(300) | e.g. "holbrook xl", "OO9102" |
| alias_type | VARCHAR(50) | NAME/SKU/KEYWORD/MISSPELLING |
| created_at | TIMESTAMPTZ | |

**Index:** alias (trigram index for fuzzy matching)

#### `price_observations`
**Purpose:** Historical price data points for valuation.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID (PK) | |
| model_id | UUID (FK → product_models) | |
| source_id | UUID (FK → sources) | |
| price | DECIMAL(10,2) | |
| currency | VARCHAR(3) | |
| condition | VARCHAR(20) | |
| is_sold | BOOLEAN | Was this actually sold? |
| observed_at | TIMESTAMPTZ | |
| listing_url | VARCHAR(2000) | |
| created_at | TIMESTAMPTZ | |

**Index:** model_id + observed_at, model_id + condition

#### `valuation_results`
**Purpose:** Calculated valuations for each listing.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID (PK) | |
| normalized_listing_id | UUID (FK) | |
| model_id | UUID (FK → product_models) | |
| estimated_market_value | DECIMAL(10,2) | Fair market price |
| estimated_resale_value | DECIMAL(10,2) | What we can sell for |
| valuation_method | VARCHAR(50) | HISTORICAL_MEDIAN / RULE / ML |
| data_points_used | INTEGER | How many price observations |
| confidence | FLOAT | 0.0 - 1.0 |
| breakdown | JSONB | Detailed calc breakdown |
| created_at | TIMESTAMPTZ | |

#### `risk_assessments`
**Purpose:** Risk analysis for each listing.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID (PK) | |
| normalized_listing_id | UUID (FK) | |
| counterfeit_risk | FLOAT | 0.0 - 1.0 |
| condition_risk | FLOAT | Condition worse than stated |
| seller_risk | FLOAT | Based on seller profile |
| data_quality_risk | FLOAT | Insufficient listing info |
| overall_risk_score | FLOAT | Weighted composite |
| risk_factors | JSONB | List of contributing factors |
| recommendation | VARCHAR(20) | SAFE / CAUTION / HIGH_RISK |
| created_at | TIMESTAMPTZ | |

#### `offer_strategies`
**Purpose:** Configurable offer rules.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID (PK) | |
| name | VARCHAR(200) | e.g. "default_oakley_de" |
| source_id | UUID (FK → sources, nullable) | Source-specific |
| model_id | UUID (FK → product_models, nullable) | Model-specific |
| brand_id | UUID (FK → brands, nullable) | Brand-specific |
| condition | VARCHAR(20, nullable) | Condition-specific |
| default_offer_pct | FLOAT | e.g. 0.65 = 65% |
| min_offer_pct | FLOAT | e.g. 0.50 = 50% |
| max_offer_pct | FLOAT | e.g. 0.80 = 80% |
| risk_adjustment | JSONB | Risk-based adjustments |
| priority | INTEGER | Higher = takes precedence |
| is_active | BOOLEAN | |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

**Resolution:** When multiple strategies match, use highest priority. Fallback to default.

#### `opportunities`
**Purpose:** The core deal table — scored, ranked buying opportunities.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID (PK) | |
| normalized_listing_id | UUID (FK) | |
| source_id | UUID (FK → sources) | |
| model_id | UUID (FK → product_models, nullable) | |
| valuation_id | UUID (FK → valuation_results) | |
| risk_assessment_id | UUID (FK → risk_assessments) | |
| platform | VARCHAR(50) | Source marketplace name |
| listing_title | VARCHAR(500) | |
| source_listing_id | VARCHAR(200) | |
| url | VARCHAR(2000) | |
| model_name | VARCHAR(300) | Matched model name |
| listed_price | DECIMAL(10,2) | |
| estimated_market_value | DECIMAL(10,2) | |
| estimated_resale_value | DECIMAL(10,2) | |
| offer_strategy_id | UUID (FK → offer_strategies) | |
| offer_percentage | FLOAT | Applied offer % |
| offer_amount | DECIMAL(10,2) | Recommended offer |
| expected_margin | DECIMAL(10,2) | resale_value - offer_amount |
| expected_margin_pct | FLOAT | margin / offer_amount |
| confidence_score | FLOAT | 0.0 - 1.0 |
| risk_score | FLOAT | 0.0 - 1.0 |
| deal_score | FLOAT | 0.0 - 100.0 (composite) |
| recommendation | VARCHAR(20) | BUY / REVIEW / IGNORE |
| status | VARCHAR(20) | NEW/REVIEWED/OFFERED/BOUGHT/REJECTED/EXPIRED |
| reviewed_by | UUID (FK → user_accounts, nullable) | |
| reviewed_at | TIMESTAMPTZ | |
| notes | TEXT | Operator notes |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

**Indexes:** deal_score DESC, status, recommendation, source_id, created_at

#### `manual_reviews`
**Purpose:** Human-in-the-loop review records.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID (PK) | |
| opportunity_id | UUID (FK → opportunities) | |
| reason | VARCHAR(200) | Why sent to review |
| assigned_to | UUID (FK → user_accounts, nullable) | |
| status | VARCHAR(20) | PENDING/APPROVED/REJECTED/ESCALATED |
| decision_notes | TEXT | |
| decided_by | UUID (FK → user_accounts, nullable) | |
| decided_at | TIMESTAMPTZ | |
| created_at | TIMESTAMPTZ | |

#### `alerts`
**Purpose:** System and deal alerts.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID (PK) | |
| type | VARCHAR(50) | DEAL_FOUND/SOURCE_DOWN/PRICE_DROP/etc |
| severity | VARCHAR(20) | INFO/WARNING/CRITICAL |
| title | VARCHAR(300) | |
| message | TEXT | |
| opportunity_id | UUID (FK, nullable) | |
| source_id | UUID (FK, nullable) | |
| is_read | BOOLEAN | |
| is_sent | BOOLEAN | External notification sent |
| channel | VARCHAR(20) | DASHBOARD/SLACK/EMAIL/TELEGRAM |
| created_at | TIMESTAMPTZ | |

#### `user_accounts`
**Purpose:** Platform operators.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID (PK) | |
| email | VARCHAR(300) | |
| name | VARCHAR(200) | |
| password_hash | VARCHAR(500) | |
| role | VARCHAR(20) | ADMIN/OPERATOR/VIEWER |
| is_active | BOOLEAN | |
| last_login_at | TIMESTAMPTZ | |
| created_at | TIMESTAMPTZ | |

#### `audit_logs`
**Purpose:** Track all significant actions for compliance and debugging.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID (PK) | |
| user_id | UUID (FK → user_accounts, nullable) | |
| action | VARCHAR(100) | e.g. "offer.override", "review.approve" |
| entity_type | VARCHAR(50) | e.g. "opportunity", "offer_strategy" |
| entity_id | UUID | |
| old_value | JSONB | Previous state |
| new_value | JSONB | New state |
| ip_address | VARCHAR(45) | |
| created_at | TIMESTAMPTZ | |

**Index:** entity_type + entity_id, user_id, created_at

---

## 10. EVENT-DRIVEN WORKFLOW

### 10.1 Event Definitions

```python
# backend/src/sleek/events/definitions.py

class Events:
    # Crawl lifecycle
    CRAWL_STARTED = "crawl.started"
    CRAWL_COMPLETED = "crawl.completed"
    CRAWL_FAILED = "crawl.failed"

    # Listing pipeline
    LISTING_RAW_INGESTED = "listing.raw_ingested"
    LISTING_NORMALIZED = "listing.normalized"
    LISTING_DUPLICATE_FOUND = "listing.duplicate_found"
    LISTING_MATCHED = "listing.matched"
    LISTING_MATCH_FAILED = "listing.match_failed"
    LISTING_VALUED = "listing.valued"
    LISTING_VALUATION_FAILED = "listing.valuation_failed"

    # Opportunity lifecycle
    OPPORTUNITY_CREATED = "opportunity.created"
    OPPORTUNITY_SCORED = "opportunity.scored"
    OPPORTUNITY_SENT_TO_REVIEW = "opportunity.sent_to_review"
    OPPORTUNITY_APPROVED = "opportunity.approved"
    OPPORTUNITY_REJECTED = "opportunity.rejected"
    OPPORTUNITY_EXPIRED = "opportunity.expired"

    # Offer lifecycle
    OFFER_GENERATED = "offer.generated"
    OFFER_OVERRIDDEN = "offer.overridden"

    # Alerts
    ALERT_CREATED = "alert.created"

    # Source health
    SOURCE_HEALTH_CHANGED = "source.health_changed"
    SOURCE_DEGRADED = "source.degraded"
    SOURCE_DOWN = "source.down"
    SOURCE_RECOVERED = "source.recovered"
```

### 10.2 Event Flow Diagram

```
CRAWL_STARTED
    │
    ▼
[Connector.search() + fetch_listing()]
    │
    ▼
LISTING_RAW_INGESTED ──► ingestion_tasks.store_raw
    │
    ▼
normalization_tasks.normalize_listing
    │
    ├── (duplicate?) ──► LISTING_DUPLICATE_FOUND ──► skip
    │
    ▼
LISTING_NORMALIZED ──► matching_tasks.match_product
    │
    ├── (no match?) ──► LISTING_MATCH_FAILED ──► low-confidence opportunity
    │
    ▼
LISTING_MATCHED ──► valuation_tasks.valuate_listing
    │
    ├── (no data?) ──► LISTING_VALUATION_FAILED ──► flag for review
    │
    ▼
LISTING_VALUED ──► scoring_tasks.score_and_rank
    │
    ▼
OPPORTUNITY_CREATED
    │
    ├── (deal_score > BUY_THRESHOLD and risk < MAX_RISK)
    │       ──► recommendation = BUY
    │
    ├── (needs review: low confidence, medium risk, edge cases)
    │       ──► OPPORTUNITY_SENT_TO_REVIEW
    │
    └── (deal_score < MIN_THRESHOLD or risk > REJECT_RISK)
            ──► recommendation = IGNORE
```

### 10.3 Event Bus Implementation (MVP)

```python
# Uses Redis Streams for MVP, easily swappable to RabbitMQ/Kafka

class EventBus:
    def __init__(self, redis: Redis):
        self.redis = redis

    async def publish(self, event: str, payload: dict):
        await self.redis.xadd(
            f"sleek:events:{event}",
            {"payload": json.dumps(payload), "timestamp": datetime.utcnow().isoformat()}
        )

    async def subscribe(self, event: str, handler: Callable):
        # Consumer group based subscription
        ...
```

In MVP, events primarily trigger Celery tasks:

```python
# backend/src/sleek/events/handlers.py

EVENT_HANDLERS = {
    Events.LISTING_RAW_INGESTED: "sleek.workers.normalization_tasks.normalize_listing",
    Events.LISTING_NORMALIZED: "sleek.workers.matching_tasks.match_product",
    Events.LISTING_MATCHED: "sleek.workers.valuation_tasks.valuate_listing",
    Events.LISTING_VALUED: "sleek.workers.scoring_tasks.score_and_rank",
    Events.OPPORTUNITY_CREATED: "sleek.workers.alert_tasks.check_alert_rules",
    Events.SOURCE_HEALTH_CHANGED: "sleek.workers.alert_tasks.source_health_alert",
}
```

---

## 11. DEAL SCORING ENGINE

### 11.1 Formulas

All formulas live in `backend/src/sleek/core/formulas.py`:

```python
from decimal import Decimal

# ──────────────────────────────────────────
# RECOMMENDED OFFER
# ──────────────────────────────────────────
def calculate_offer(
    listed_price: Decimal,
    offer_pct: float,            # from strategy (e.g. 0.65)
    condition_adjustment: float, # e.g. -0.05 for FAIR condition
    risk_adjustment: float,      # e.g. -0.03 for medium risk
    min_offer_pct: float,        # floor (e.g. 0.50)
    max_offer_pct: float,        # ceiling (e.g. 0.80)
) -> Decimal:
    """
    recommended_offer = listed_price × clamp(offer_pct + condition_adj + risk_adj, min, max)
    """
    effective_pct = max(min_offer_pct, min(max_offer_pct, offer_pct + condition_adjustment + risk_adjustment))
    return (listed_price * Decimal(str(effective_pct))).quantize(Decimal("0.01"))


# ──────────────────────────────────────────
# EXPECTED PROFIT
# ──────────────────────────────────────────
def calculate_expected_profit(
    offer_amount: Decimal,
    estimated_resale_value: Decimal,
    platform_fee_pct: float = 0.10,  # Resale platform fee (e.g. 10%)
    shipping_cost: Decimal = Decimal("5.00"),
) -> Decimal:
    """
    expected_profit = resale_value × (1 - platform_fee) - offer_amount - shipping
    """
    net_resale = estimated_resale_value * Decimal(str(1 - platform_fee_pct))
    return (net_resale - offer_amount - shipping_cost).quantize(Decimal("0.01"))


# ──────────────────────────────────────────
# CONFIDENCE SCORE (0.0 - 1.0)
# ──────────────────────────────────────────
def calculate_confidence(
    model_match_confidence: float,    # How sure we are about the model (0-1)
    valuation_confidence: float,      # How reliable the valuation is (0-1)
    data_quality_score: float,        # Listing completeness (0-1)
    image_quality_score: float,       # Image quality/count (0-1)
) -> float:
    """
    Weighted average of sub-confidence scores.
    confidence = 0.35 × model_match + 0.30 × valuation + 0.20 × data_quality + 0.15 × image_quality
    """
    return round(
        0.35 * model_match_confidence
        + 0.30 * valuation_confidence
        + 0.20 * data_quality_score
        + 0.15 * image_quality_score,
        3,
    )


# ──────────────────────────────────────────
# RISK SCORE (0.0 - 1.0, higher = riskier)
# ──────────────────────────────────────────
def calculate_risk(
    counterfeit_risk: float,       # 0-1
    condition_risk: float,         # 0-1
    seller_risk: float,            # 0-1
    data_quality_risk: float,      # 0-1
    price_anomaly: bool = False,   # Price seems suspiciously low
) -> float:
    """
    risk = 0.35 × counterfeit + 0.25 × condition + 0.20 × seller + 0.15 × data_quality + 0.05 × anomaly
    """
    anomaly_score = 1.0 if price_anomaly else 0.0
    return round(
        0.35 * counterfeit_risk
        + 0.25 * condition_risk
        + 0.20 * seller_risk
        + 0.15 * data_quality_risk
        + 0.05 * anomaly_score,
        3,
    )


# ──────────────────────────────────────────
# DEAL SCORE (0.0 - 100.0)
# ──────────────────────────────────────────
def calculate_deal_score(
    expected_margin_pct: float,   # Expected profit as % of offer (e.g. 0.40 = 40%)
    confidence_score: float,      # 0-1
    risk_score: float,            # 0-1
) -> float:
    """
    deal_score = margin_component × confidence_component × risk_component × 100

    Where:
    - margin_component = min(expected_margin_pct / 0.50, 1.0)
      (caps at 50% margin — anything above is equally good)
    - confidence_component = confidence_score
    - risk_component = (1 - risk_score)

    deal_score = min(margin_pct / 0.5, 1.0) × confidence × (1 - risk) × 100
    """
    margin_component = min(expected_margin_pct / 0.50, 1.0)
    risk_component = 1.0 - risk_score
    raw = margin_component * confidence_score * risk_component * 100
    return round(max(0.0, min(100.0, raw)), 1)


# ──────────────────────────────────────────
# RECOMMENDATION
# ──────────────────────────────────────────
def classify_recommendation(
    deal_score: float,
    confidence_score: float,
    risk_score: float,
    expected_margin: Decimal,
    min_margin: Decimal = Decimal("10.00"),
    buy_threshold: float = 60.0,
    review_threshold: float = 35.0,
    max_risk: float = 0.70,
    min_confidence: float = 0.40,
) -> str:
    """
    BUY:    deal_score >= 60 AND confidence >= 0.40 AND risk < 0.70 AND margin >= 10
    REVIEW: deal_score >= 35 OR confidence < 0.40 OR risk between 0.50-0.70
    IGNORE: everything else
    """
    if expected_margin < min_margin:
        return "IGNORE"
    if risk_score >= max_risk:
        return "REVIEW"  # High risk → human must decide
    if confidence_score < min_confidence:
        return "REVIEW"  # Low confidence → human must verify
    if deal_score >= buy_threshold:
        return "BUY"
    if deal_score >= review_threshold:
        return "REVIEW"
    return "IGNORE"
```

### 11.2 Score Interpretation

| Deal Score | Meaning |
|-----------|---------|
| 80-100 | Exceptional deal — high margin, high confidence, low risk |
| 60-79 | Good deal — solid opportunity worth buying |
| 35-59 | Marginal — needs human review |
| 0-34 | Poor deal — ignore |

---

## 12. NEGOTIATION / OFFER ENGINE

### 12.1 Offer Strategy Resolution

The offer engine resolves the best matching strategy using a priority chain:

```
1. Model-specific + source-specific + condition-specific  (highest priority)
2. Model-specific + condition-specific
3. Model-specific + source-specific
4. Model-specific
5. Brand-specific + source-specific
6. Brand-specific
7. Source-specific
8. Global default                                          (lowest priority)
```

```python
class OfferEngine:
    async def resolve_strategy(
        self,
        source_id: str,
        model_id: str | None,
        brand_id: str | None,
        condition: str,
    ) -> OfferStrategy:
        """Find the most specific matching active strategy."""
        strategies = await self.repo.find_matching_strategies(
            source_id=source_id,
            model_id=model_id,
            brand_id=brand_id,
            condition=condition,
        )
        # Sort by priority DESC, return first
        return strategies[0] if strategies else self.default_strategy

    async def calculate(
        self,
        listing: NormalizedListing,
        valuation: ValuationResult,
        risk: RiskAssessment,
    ) -> OfferRecommendation:
        strategy = await self.resolve_strategy(
            source_id=listing.source_id,
            model_id=listing.matched_model_id,
            brand_id=listing.brand_id,
            condition=listing.condition,
        )

        condition_adj = self.CONDITION_ADJUSTMENTS.get(listing.condition, 0.0)
        risk_adj = self._risk_adjustment(risk.overall_risk_score)

        offer_amount = calculate_offer(
            listed_price=listing.listed_price,
            offer_pct=strategy.default_offer_pct,
            condition_adjustment=condition_adj,
            risk_adjustment=risk_adj,
            min_offer_pct=strategy.min_offer_pct,
            max_offer_pct=strategy.max_offer_pct,
        )

        return OfferRecommendation(
            strategy_id=strategy.id,
            offer_percentage=effective_pct,
            offer_amount=offer_amount,
            expected_profit=calculate_expected_profit(offer_amount, valuation.estimated_resale_value),
        )

    CONDITION_ADJUSTMENTS = {
        "NEW": 0.05,       # Pay more for new
        "LIKE_NEW": 0.02,
        "GOOD": 0.0,       # Baseline
        "FAIR": -0.05,     # Pay less
        "POOR": -0.10,     # Pay significantly less
    }

    def _risk_adjustment(self, risk_score: float) -> float:
        if risk_score > 0.6:
            return -0.10
        elif risk_score > 0.4:
            return -0.05
        elif risk_score > 0.2:
            return -0.02
        return 0.0
```

### 12.2 Offer Ladder Support

For future automated negotiation:

```python
# Offer ladder: start low, increase if rejected
offer_ladder = {
    "attempt_1": 0.60,  # Start at 60%
    "attempt_2": 0.65,  # If rejected, try 65%
    "attempt_3": 0.70,  # Final attempt at 70%
    "max_attempts": 3,
    "wait_between_hours": 24,
}
```

### 12.3 Example Scenarios

| Scenario | Listed | Strategy | Condition Adj | Risk Adj | Offer | Resale Est | Profit |
|----------|--------|----------|--------------|----------|-------|-----------|--------|
| Oakley Holbrook, GOOD, low risk | 100 EUR | 65% | 0% | 0% | 65 EUR | 120 EUR | ~43 EUR |
| Oakley Radar, LIKE_NEW, low risk | 150 EUR | 65% | +2% | 0% | 100.50 EUR | 200 EUR | ~79 EUR |
| Oakley Jawbreaker, FAIR, med risk | 80 EUR | 65% | -5% | -5% | 44 EUR | 100 EUR | ~41 EUR |
| Unknown model, GOOD, high risk | 60 EUR | 65% | 0% | -10% | 33 EUR | ? | → REVIEW |

---

## 13. AI / AGENT ARCHITECTURE

### 13.1 Agent Design Philosophy

Agents are **stateless, task-specific processors** that can be rule-based, ML-based, or hybrid. Each agent has a defined interface:

```python
class BaseAgent(ABC):
    name: str
    version: str
    agent_type: str  # "rule" | "ml" | "hybrid"

    @abstractmethod
    async def process(self, input: AgentInput) -> AgentOutput:
        ...

    @abstractmethod
    def confidence(self) -> float:
        """Self-reported confidence in output quality."""
        ...
```

### 13.2 Agent Registry

| Agent | Purpose | Inputs | Outputs | Trigger | Type (MVP) | Type (Future) |
|-------|---------|--------|---------|---------|------------|---------------|
| **Source Monitor** | Detect source health issues, rate limit problems, layout changes | Crawl job results, error logs | Health status, alert | After each crawl | Rule | Hybrid |
| **Listing Extraction** | Extract structured data from HTML/API responses | Raw HTML/JSON | Structured listing fields | On raw ingest | Rule (parser) | ML (LLM extraction) |
| **Product Matcher** | Identify brand + model from listing text | Title, description, category | model_id, confidence | After normalization | Rule (keyword + alias) | Hybrid (embeddings + rules) |
| **Condition Analyzer** | Assess true condition from text + images | Description, images | Condition grade, confidence | After matching | Rule (keyword) | ML (vision model) |
| **Valuation Agent** | Estimate fair market value | Model, condition, historical prices | market_value, resale_value, confidence | After matching | Rule (median calc) | ML (price prediction) |
| **Counterfeit Risk** | Detect potential fakes | Images, price, seller, description | Risk score, factors | After matching | Rule (price anomaly) | ML (image classification) |
| **Opportunity Ranker** | Score and rank deals | Listing + valuation + risk | deal_score, recommendation | After valuation | Rule (formulas) | ML (learned ranking) |
| **Strategy Agent** | Optimize offer strategies over time | Historical outcomes, market trends | Adjusted offer percentages | Periodic (daily) | N/A | ML (reinforcement learning) |

### 13.3 MVP Agent Implementations

In Phase 1, all agents are rule-based, implemented as service functions:

```python
# Product Matcher (MVP) — keyword-based
class ProductMatcherAgent:
    agent_type = "rule"

    async def process(self, listing: NormalizedListing) -> MatchResult:
        title_lower = listing.title.lower()
        description_lower = (listing.description or "").lower()
        text = f"{title_lower} {description_lower}"

        best_match = None
        best_score = 0.0

        for model in await self.get_models():
            aliases = await self.get_aliases(model.id)
            score = self._calculate_match_score(text, model.name, aliases)
            if score > best_score:
                best_score = score
                best_match = model

        if best_match and best_score >= self.MATCH_THRESHOLD:
            return MatchResult(model_id=best_match.id, confidence=best_score)
        return MatchResult(model_id=None, confidence=0.0)
```

### 13.4 Future AI Integration Points

```
Phase 2:
  - LLM-based listing extraction (GPT-4o / Claude for messy listings)
  - Vision model for image condition assessment
  - Embedding-based product matching (sentence-transformers)

Phase 3:
  - Counterfeit detection model (fine-tuned image classifier)
  - Price prediction model (time series / regression)
  - Reinforcement learning for offer optimization
  - Autonomous buying agent (end-to-end)
```

---

## 14. ADMIN PANEL / CONTROL PANEL

### 14.1 Screen Definitions

#### Dashboard Overview (`/`)
- **KPIs:** Total opportunities today, avg deal score, top deal, active sources, review queue size
- **Charts:** Opportunities by source (bar), deal score distribution (histogram), margin trend (line)
- **Recent alerts** (last 10)
- **Quick actions:** Trigger crawl, go to review queue

#### Opportunity Feed (`/opportunities`)
- **Table view** with sortable columns:
  - Platform, Title, Model, Listed Price, Market Value, Offer Amount, Margin, Deal Score, Confidence, Risk, Recommendation, Status, Created At
- **Filters:** Source, recommendation (BUY/REVIEW/IGNORE), status, min deal score, min margin, date range, model
- **Bulk actions:** Approve, reject, send to review
- **Quick offer override** inline

#### Opportunity Detail (`/opportunities/:id`)
- Full listing info + images
- Score breakdown (visual: confidence, risk, margin components)
- Valuation details (how market value was calculated)
- Risk assessment details (factors)
- Offer strategy details (which strategy applied, why)
- Timeline (events: ingested → normalized → matched → valued → scored)
- Actions: Approve, Reject, Override Offer, Send to Review, Add Note
- Link to original listing (opens in new tab)

#### Manual Review Queue (`/reviews`)
- Filtered to status=PENDING reviews
- Review reason displayed prominently
- Side-by-side: listing info | review decision form
- Actions: Approve, Reject, Escalate, Add Notes

#### Source Health (`/sources`)
- Per-source cards: status indicator, last crawl, listings found, error rate
- Crawl history table per source
- Error log viewer
- Manual crawl trigger button
- Connector config viewer

#### Pricing Intelligence (`/pricing`)
- Price history charts per model
- Market value trends
- Price distribution by source
- Comparison: listed price vs market value scatter plot

#### Offer Strategy (`/offers`)
- Strategy list with priority ordering
- Create/edit strategy form: source, model, brand, condition, percentages
- Simulation tool: "If listed at X EUR, offer would be Y EUR"
- Performance metrics: acceptance rate by strategy (future)

#### Watchlist / Config (`/settings`)
- Brand/model management
- Alias management
- Alert configuration
- User management
- System settings

#### Analytics (`/analytics`)
- Opportunities over time
- Margin distribution
- Source comparison
- Model popularity
- Deal conversion funnel (found → reviewed → offered → bought)
- Best performing models/sources

#### Audit / History (`/audit`)
- Searchable audit log
- Filterable by action type, user, entity
- Detail view with old/new values

---

## 15. API DESIGN

### 15.1 Base URL
```
/api/v1/
```

### 15.2 Authentication
- JWT tokens (access + refresh)
- `Authorization: Bearer <token>`

### 15.3 Endpoints

#### Opportunities
```
GET    /api/v1/opportunities                    # List with filters, pagination, sorting
GET    /api/v1/opportunities/:id                # Detail
PATCH  /api/v1/opportunities/:id                # Update status, add notes
POST   /api/v1/opportunities/:id/approve        # Approve opportunity
POST   /api/v1/opportunities/:id/reject         # Reject opportunity
POST   /api/v1/opportunities/:id/review         # Send to review
GET    /api/v1/opportunities/stats               # Aggregated stats
```

#### Offers
```
GET    /api/v1/offers/strategies                 # List strategies
POST   /api/v1/offers/strategies                 # Create strategy
PUT    /api/v1/offers/strategies/:id             # Update strategy
DELETE /api/v1/offers/strategies/:id             # Delete strategy
POST   /api/v1/offers/simulate                   # Simulate offer for given params
POST   /api/v1/opportunities/:id/override-offer  # Manual offer override
```

#### Reviews
```
GET    /api/v1/reviews                           # List reviews (filterable by status)
GET    /api/v1/reviews/:id                       # Review detail
POST   /api/v1/reviews/:id/decide                # Submit decision
```

#### Sources
```
GET    /api/v1/sources                           # List all sources with health
GET    /api/v1/sources/:id                       # Source detail + recent crawls
GET    /api/v1/sources/:id/crawls                # Crawl history
POST   /api/v1/sources/:id/crawl                 # Trigger manual crawl
GET    /api/v1/sources/:id/health                # Health metrics
```

#### Products
```
GET    /api/v1/brands                            # List brands
GET    /api/v1/brands/:id/models                 # List models for brand
GET    /api/v1/models/:id                        # Model detail with aliases
POST   /api/v1/models                            # Create model
PUT    /api/v1/models/:id                        # Update model
POST   /api/v1/models/:id/aliases                # Add alias
GET    /api/v1/models/:id/price-history          # Price observations
```

#### Analytics
```
GET    /api/v1/analytics/dashboard               # Dashboard KPIs
GET    /api/v1/analytics/opportunities            # Opportunity trends
GET    /api/v1/analytics/margins                  # Margin analysis
GET    /api/v1/analytics/sources                  # Source comparison
GET    /api/v1/analytics/models                   # Model performance
```

#### Config
```
GET    /api/v1/config/alert-rules                # Alert configuration
PUT    /api/v1/config/alert-rules                # Update alert rules
```

#### Auth
```
POST   /api/v1/auth/login                        # Login → JWT
POST   /api/v1/auth/refresh                      # Refresh token
POST   /api/v1/auth/logout                       # Invalidate token
GET    /api/v1/auth/me                           # Current user
```

#### System
```
GET    /api/v1/health                            # System health check
GET    /api/v1/health/detailed                   # Detailed health (DB, Redis, etc.)
```

### 15.4 Query Parameters (Opportunities List Example)
```
GET /api/v1/opportunities?
    source_id=<uuid>
    &recommendation=BUY,REVIEW
    &status=NEW,REVIEWED
    &min_deal_score=50
    &min_margin=10
    &model_id=<uuid>
    &created_after=2026-03-01
    &created_before=2026-03-12
    &sort_by=deal_score
    &sort_order=desc
    &page=1
    &per_page=50
```

### 15.5 Response Format
```json
{
  "data": [...],
  "meta": {
    "total": 342,
    "page": 1,
    "per_page": 50,
    "total_pages": 7
  }
}
```

---

## 16. BACKGROUND JOBS / QUEUES

### 16.1 Celery Configuration

```python
# backend/src/sleek/workers/celery_app.py

from celery import Celery
from celery.schedules import crontab

app = Celery("sleek")

app.conf.update(
    broker_url="redis://redis:6379/0",
    result_backend="redis://redis:6379/1",
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="Europe/Berlin",
    task_track_started=True,
    task_acks_late=True,
    worker_prefetch_multiplier=1,       # Fair scheduling
    task_reject_on_worker_lost=True,
    task_default_queue="default",
    task_routes={
        "sleek.workers.crawl_tasks.*": {"queue": "crawl"},
        "sleek.workers.normalization_tasks.*": {"queue": "pipeline"},
        "sleek.workers.matching_tasks.*": {"queue": "pipeline"},
        "sleek.workers.valuation_tasks.*": {"queue": "pipeline"},
        "sleek.workers.scoring_tasks.*": {"queue": "pipeline"},
        "sleek.workers.alert_tasks.*": {"queue": "alerts"},
        "sleek.workers.maintenance_tasks.*": {"queue": "maintenance"},
    },
)

# Scheduled tasks
app.conf.beat_schedule = {
    # Crawl each source on its configured interval
    "trigger-crawls": {
        "task": "sleek.workers.crawl_tasks.trigger_scheduled_crawls",
        "schedule": crontab(minute="*/5"),  # Check every 5 min
    },
    # Expire old opportunities
    "expire-stale-opportunities": {
        "task": "sleek.workers.maintenance_tasks.expire_stale_opportunities",
        "schedule": crontab(hour="*/1"),
    },
    # Update source health metrics
    "update-source-health": {
        "task": "sleek.workers.maintenance_tasks.update_source_health",
        "schedule": crontab(minute="*/10"),
    },
    # Reindex search
    "sync-search-index": {
        "task": "sleek.workers.maintenance_tasks.sync_search_index",
        "schedule": crontab(minute="*/15"),
    },
}
```

### 16.2 Queue Architecture

```
Queue: crawl          (1-2 workers, rate-limited)
  ├── trigger_scheduled_crawls
  ├── crawl_source
  └── fetch_listing

Queue: pipeline        (2-4 workers)
  ├── normalize_listing
  ├── match_product
  ├── valuate_listing
  └── score_and_rank

Queue: alerts          (1 worker)
  ├── check_alert_rules
  ├── send_dashboard_alert
  └── send_external_notification

Queue: maintenance     (1 worker)
  ├── expire_stale_opportunities
  ├── update_source_health
  ├── sync_search_index
  └── cleanup_old_snapshots

Queue: default         (1 worker, catch-all)
```

### 16.3 Key Task Definitions

```python
# crawl_tasks.py
@app.task(bind=True, max_retries=3, default_retry_delay=60)
def crawl_source(self, source_id: str):
    """Crawl a single source, ingest all new listings."""

@app.task
def trigger_scheduled_crawls():
    """Check which sources are due for crawl, dispatch crawl_source tasks."""

# normalization_tasks.py
@app.task(bind=True, max_retries=2)
def normalize_listing(self, raw_listing_id: str):
    """Normalize a raw listing, check for duplicates."""

# matching_tasks.py
@app.task(bind=True, max_retries=2)
def match_product(self, normalized_listing_id: str):
    """Match listing to a product model."""

# valuation_tasks.py
@app.task(bind=True, max_retries=2)
def valuate_listing(self, normalized_listing_id: str):
    """Estimate market value and resale value."""

# scoring_tasks.py
@app.task
def score_and_rank(self, normalized_listing_id: str):
    """Calculate all scores, create opportunity, generate offer."""
```

---

## 17. SCALING STRATEGY

### 17.1 What Stays Synchronous
- API request/response (FastAPI handles async I/O)
- Dashboard reads (cached in Redis, served fast)
- Offer simulation (lightweight calculation)
- Auth/login flows

### 17.2 What Must Be Asynchronous
- All crawling (network I/O, rate-limited)
- Listing normalization pipeline
- Product matching
- Valuation calculations
- Score computation
- Alert processing
- Search index sync

### 17.3 Scaling Dimensions

| Dimension | Strategy |
|-----------|----------|
| **More listings** | Add pipeline workers, partition crawl queue by source |
| **More sources** | Each connector is independent; add crawl workers; use dedicated queue per source if needed |
| **More brands/categories** | Data-driven (config + DB), no code changes needed |
| **More countries** | Add source records, country config, currency conversion |
| **More operators** | Horizontal API scaling, read replicas for DB |
| **More history** | Partition price_observations by month, archive old raw_listings to cold storage |
| **More search** | OpenSearch cluster scales independently |

### 17.4 Database Scaling Path

```
MVP:        Single PostgreSQL instance
Phase 2:    Read replica for dashboard queries
Phase 3:    Partition raw_listings by created_at (monthly)
            Partition price_observations by observed_at
            Consider separate DB for analytics (OLAP)
Future:     Citus for horizontal sharding if needed
```

### 17.5 Queue Scaling

```
MVP:        Redis as broker, single Celery worker per queue
Phase 2:    Multiple workers per queue, autoscaling based on queue depth
Phase 3:    Consider RabbitMQ for priority queues and better reliability
Future:     Kafka for event streaming if event volume justifies it
```

### 17.6 Isolation Strategy

- **Connector failures are isolated:** Each connector runs in its own task; failures don't affect other sources
- **Pipeline stages are decoupled:** Each stage is a separate task triggered by events; one stage failing doesn't block others
- **Circuit breaker pattern:** If a source fails N times, mark as degraded/down, reduce crawl frequency
- **Rate limiting per source:** Each connector has independent rate limits stored in config
- **Timeout enforcement:** All network calls have configurable timeouts
- **Dead letter queue:** Failed tasks after max retries go to DLQ for investigation

---

## 18. SECURITY / COMPLIANCE / RISK

### 18.1 Data Protection
- **No PII storage** from marketplace users beyond seller IDs
- Raw HTML snapshots may contain PII — store in encrypted object storage
- GDPR compliance: ability to delete data on request
- Data retention policy: archive raw data after 90 days, delete after 1 year

### 18.2 Marketplace Terms of Service
- **Risk:** Scraping may violate ToS of some platforms
- **Mitigation:**
  - Use official APIs where available (Vinted has a partial API)
  - Rate-limit aggressively (respect robots.txt)
  - Rotate user agents and IPs if needed
  - Use residential proxies for browser automation
  - Monitor for CAPTCHA/blocks, handle gracefully
  - Legal review recommended before production launch

### 18.3 Application Security
- JWT with short expiry (15 min access, 7 day refresh)
- Password hashing with bcrypt
- Input validation on all API endpoints (Pydantic)
- SQL injection protection (SQLAlchemy ORM)
- Rate limiting on API (slowapi)
- CORS configuration (allow only admin panel origin)
- HTTPS enforced in production
- Secrets in environment variables, never in code

### 18.4 Operational Security
- Sentry for error tracking (no PII in error context)
- Structured logging with correlation IDs
- Audit log for all operator actions
- Role-based access (ADMIN, OPERATOR, VIEWER)
- Docker images scanned for vulnerabilities
- Dependencies audited with `pip-audit`

### 18.5 Counterfeit/Legal Risk
- Platform is a decision-support tool, not an automated buyer
- Human-in-the-loop for all purchases (MVP)
- Counterfeit risk scoring to protect operator
- No resale of goods known to be counterfeit

---

## 19. MVP PHASE (Phase 1)

### 19.1 MVP Scope

**In scope:**
- 4 connectors (Vinted DE, Kleinanzeigen, Depop, Vestiaire)
- Oakley glasses only
- Germany only
- Crawl → normalize → match → valuate → score pipeline
- Deal scoring with rule-based formulas
- Offer engine with configurable strategies
- Admin dashboard (deal feed, detail, review queue, source health)
- Manual review workflow
- Basic alerting (dashboard only)
- JWT auth for admin panel

**Out of scope for MVP:**
- AI/ML models
- Image analysis
- Automated buying
- External notifications (Slack/Telegram)
- Multi-tenant
- Public API
- Mobile app

### 19.2 MVP Data Seed

```
Brands: Oakley
Categories: Sunglasses, Prescription Glasses, Goggles, Ski Goggles
Models (initial 20-30):
  - Holbrook, Holbrook XL, Holbrook Metal
  - Frogskins, Frogskins Lite
  - Radar EV Path, Radar EV Advancer
  - Jawbreaker
  - Sutro, Sutro Lite
  - Flight Jacket
  - Flak 2.0 XL
  - Gascan
  - Turbine
  - Fuel Cell
  - Half Jacket
  - Latch
  - Prizm (various)
  - Flight Deck (goggles)
  - Airbrake (goggles)
  - Line Miner (goggles)
  ... + aliases for each
```

### 19.3 MVP Success Criteria
- Successfully crawls all 4 sources on schedule
- Correctly identifies Oakley models with >80% accuracy
- Produces actionable deal feed with scoring
- Operator can review and act on deals within the dashboard
- System processes 1000+ listings per day without issues

---

## 20. PHASE 2 / PHASE 3 EXPANSION

### Phase 2 (3-6 months after MVP)
- **Better valuation:** ML price prediction using historical data
- **Image analysis:** Download and analyze listing images for condition
- **Counterfeit detection:** Image-based fake detection (rule-based → ML)
- **More automation:** Auto-flag, auto-reject based on rules
- **Expanded watchlists:** Custom alerts per model/source
- **External notifications:** Slack, Telegram for high-value deals
- **Analytics v2:** Trend analysis, source comparison, ROI tracking
- **Performance tracking:** Track which deals were actually bought, at what price, for what profit

### Phase 3 (6-12 months)
- **European expansion:** FR, IT, ES, NL, UK — add regional Vinted/Depop instances
- **More brands:** Ray-Ban, Persol, Maui Jim, etc.
- **More categories:** Watches, sneakers (system is already category-agnostic)
- **SaaS architecture:** Multi-tenant, user-specific watchlists
- **Autonomous agents:** LLM-based listing extraction, automated negotiation
- **Public API:** For third-party integrators
- **Mobile app:** Push notifications for deals

---

## 21. TEAM ROLES

### MVP Team (2-3 people)
| Role | Responsibilities |
|------|-----------------|
| **Backend/Platform Engineer** | Core architecture, API, pipeline, connectors, DB |
| **Fullstack Engineer** | Admin dashboard, frontend, API integration |
| **Product/Ops (you)** | Product direction, manual testing, domain rules, data seeding |

### Phase 2 Team (add 1-2)
| Role | Responsibilities |
|------|-----------------|
| **ML Engineer** | Valuation models, image analysis, counterfeit detection |
| **DevOps/SRE** | K8s, monitoring, CI/CD hardening, scaling |

---

## 22. DEVELOPMENT ROADMAP

### Sprint 0: Foundation (Week 1)
- [ ] Monorepo setup, Docker Compose, dev environment
- [ ] PostgreSQL + Alembic + base models
- [ ] FastAPI skeleton with health endpoint
- [ ] Redis + Celery setup
- [ ] Structlog + basic observability
- [ ] CI pipeline (lint + test)

### Sprint 1: Connectors + Ingestion (Week 2-3)
- [ ] BaseConnector interface
- [ ] ConnectorRegistry
- [ ] Vinted connector (first connector)
- [ ] Raw ingestion service + storage
- [ ] Crawl job tracking
- [ ] Manual crawl trigger endpoint
- [ ] Second connector (Kleinanzeigen)

### Sprint 2: Pipeline Core (Week 3-4)
- [ ] Normalization service
- [ ] Deduplication logic
- [ ] Product matcher (keyword-based)
- [ ] Oakley product seed data
- [ ] Valuation engine (rule-based)
- [ ] Event flow wiring

### Sprint 3: Scoring + Offers (Week 4-5)
- [ ] Deal scoring formulas
- [ ] Risk assessment (basic rules)
- [ ] Offer engine + strategy resolution
- [ ] Opportunity creation pipeline
- [ ] Review queue logic
- [ ] Third connector (Depop)

### Sprint 4: Dashboard (Week 5-7)
- [ ] Next.js project setup
- [ ] Layout + navigation
- [ ] Dashboard overview
- [ ] Opportunity feed (table + filters)
- [ ] Opportunity detail page
- [ ] Review queue page
- [ ] Source health page
- [ ] Auth (login)

### Sprint 5: Polish + Launch (Week 7-8)
- [ ] Fourth connector (Vestiaire)
- [ ] Offer strategy management page
- [ ] Scheduled crawling (Celery Beat)
- [ ] Dashboard alerts
- [ ] End-to-end testing
- [ ] Production Docker setup
- [ ] Deploy to staging
- [ ] Bug fixes + hardening

---

## 23. CODING STANDARDS

### Python
- **Formatter:** Ruff (format)
- **Linter:** Ruff (lint) + mypy (strict mode)
- **Python version:** 3.12+
- **Type hints:** Required on all function signatures
- **Docstrings:** Required on public classes and complex functions
- **Naming:**
  - Files: `snake_case.py`
  - Classes: `PascalCase`
  - Functions/methods: `snake_case`
  - Constants: `UPPER_SNAKE_CASE`
  - Private: `_leading_underscore`
- **Async:** Prefer async for I/O-bound operations
- **Error handling:** Custom exception hierarchy, no bare `except:`
- **Testing:** pytest, aim for >80% coverage on core logic

### TypeScript/React
- **Formatter:** Prettier
- **Linter:** ESLint
- **Strict mode:** Enabled
- **Naming:**
  - Components: `PascalCase.tsx`
  - Utilities: `camelCase.ts`
  - Types/interfaces: `PascalCase`
- **State management:** TanStack Query for server state, React state for UI
- **Styling:** Tailwind CSS + shadcn/ui components

### Git
- **Branch naming:** `feat/`, `fix/`, `chore/`, `docs/`
- **Commit messages:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`)
- **PR reviews:** Required before merge
- **Main branch:** Protected, deploy on merge

### Config / Environment
```bash
# .env.example
DATABASE_URL=postgresql+asyncpg://sleek:sleek@localhost:5432/sleek
REDIS_URL=redis://localhost:6379/0
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/1
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET=sleek-snapshots
OPENSEARCH_URL=http://localhost:9200
JWT_SECRET_KEY=change-me-in-production
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=15
LOG_LEVEL=INFO
ENVIRONMENT=development
SENTRY_DSN=
```

---

## 24. NEXT IMPLEMENTATION STEPS

### First 20 Implementation Tasks (In Order)

```
 1. Initialize monorepo: pyproject.toml, Dockerfile, docker-compose.yml, Makefile
 2. Set up PostgreSQL + Alembic: base model, session factory, first migration
 3. Create FastAPI app skeleton: main.py, config.py, health endpoint
 4. Set up Redis + Celery: celery_app.py, basic test task
 5. Implement structlog + request middleware (correlation IDs)
 6. Create DB models: sources, crawl_jobs, raw_listings (first migration)
 7. Define BaseConnector interface + ConnectorRegistry
 8. Implement VintedConnector: auth, search, fetch, parse
 9. Implement IngestionService: store raw listing + snapshot
10. Implement crawl_tasks: crawl_source, trigger_scheduled_crawls
11. Create DB models: normalized_listings, brands, product_models, product_aliases
12. Implement NormalizationService + deduplication
13. Seed Oakley product data: brands, categories, models, aliases
14. Implement ProductMatcher (keyword-based)
15. Implement ValuationEngine (rule-based, historical median)
16. Create DB models: valuation_results, risk_assessments, opportunities, offer_strategies
17. Implement DealEngine (scoring formulas) + OfferEngine
18. Wire full pipeline: ingest → normalize → match → valuate → score → opportunity
19. Implement opportunity API endpoints: list, detail, approve, reject
20. Set up Next.js frontend: layout, API client, opportunity feed table
```

### Suggested Development Order

```
WEEK 1:  Tasks 1-5   (Foundation)
WEEK 2:  Tasks 6-10  (First connector + ingestion)
WEEK 3:  Tasks 11-15 (Pipeline core)
WEEK 4:  Tasks 16-18 (Scoring + offers)
WEEK 5:  Tasks 19-20 (API + frontend start)
WEEK 6:  Dashboard pages (feed, detail, review)
WEEK 7:  Remaining connectors + source health
WEEK 8:  Polish, testing, deploy to staging
```

---

## APPENDIX A: MVP Folder Tree (What to Create First)

```
sleek/
├── docker-compose.yml
├── docker-compose.dev.yml
├── Makefile
├── .env.example
├── .gitignore
├── README.md
│
├── backend/
│   ├── Dockerfile
│   ├── pyproject.toml
│   ├── alembic.ini
│   ├── alembic/
│   │   ├── env.py
│   │   └── versions/
│   └── src/
│       └── sleek/
│           ├── __init__.py
│           ├── main.py
│           ├── config.py
│           ├── dependencies.py
│           ├── api/
│           │   ├── __init__.py
│           │   ├── router.py
│           │   ├── middleware.py
│           │   └── v1/
│           │       ├── __init__.py
│           │       ├── health.py
│           │       └── opportunities.py
│           ├── core/
│           │   ├── __init__.py
│           │   ├── formulas.py
│           │   ├── deal_engine.py
│           │   └── offer_engine.py
│           ├── connectors/
│           │   ├── __init__.py
│           │   ├── base.py
│           │   ├── registry.py
│           │   └── vinted/
│           │       ├── __init__.py
│           │       └── connector.py
│           ├── models/
│           │   ├── __init__.py
│           │   ├── base.py
│           │   └── source.py
│           ├── services/
│           │   ├── __init__.py
│           │   └── ingestion_service.py
│           ├── workers/
│           │   ├── __init__.py
│           │   ├── celery_app.py
│           │   └── crawl_tasks.py
│           ├── db/
│           │   ├── __init__.py
│           │   └── session.py
│           └── utils/
│               ├── __init__.py
│               └── observability.py
│
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       └── app/
│           ├── layout.tsx
│           └── page.tsx
│
├── tests/
│   ├── conftest.py
│   └── unit/
│       └── core/
│           └── test_formulas.py
│
├── data/
│   ├── oakley_models.json
│   └── oakley_aliases.json
│
├── scripts/
│   └── seed_products.py
│
└── docs/
    └── ARCHITECTURE.md
```

---

*Blueprint version 1.0 — SLEEK / Oakley Deal Intelligence Platform*
*Date: 2026-03-12*
