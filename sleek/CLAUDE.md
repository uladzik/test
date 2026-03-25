# SLEEK - Oakley Deal Intelligence Platform

## Project Overview
SLEEK monitors second-hand marketplaces (Vinted, Kleinanzeigen, Depop, Vestiaire Collective) for underpriced Oakley glasses and surfaces ranked buying opportunities with configurable offer strategies. Hybrid automation: system drafts offers, human reviews and sends.

## Tech Stack
- **Backend:** Python 3.12 + FastAPI + SQLAlchemy 2.0 (async) + Alembic
- **Frontend:** React 19 + Vite 7.3 + TypeScript + TailwindCSS 4.2 + Recharts + Framer Motion + react-icons
- **Database:** PostgreSQL 16 (20 tables, UUID PKs, timestamp mixins)
- **Cache/Queue:** Redis 7 + Celery 5 (beat scheduler every 5 min)
- **Scraping:** Apify actors (Rafael has credits)
- **AI:** Anthropic Claude API (key not yet configured)
- **Deployment:** Docker Compose, Caddy, DigitalOcean Frankfurt

## Development Commands
```bash
make dev          # Start all services (docker compose up)
make dev-build    # Rebuild and start
make dev-down     # Stop all services
make migrate      # Run migrations
make migrate-create  # Create new migration
make seed         # Seed Oakley product catalog + sources + admin user
make test         # Run tests
make lint         # Run linter
make db-shell     # PostgreSQL shell
```

## Local Dev Ports
- **Backend API:** http://localhost:8000
- **Frontend:** http://localhost:5176 (5173/5174/5175 occupied by other projects)
- **PostgreSQL:** localhost:5434 (5432/5433 occupied by solopilot)
- **Redis:** localhost:6380 (6379 occupied by solopilot)

## Architecture
- Backend: `backend/app/` — flat structure following solopilot patterns
- Frontend: `frontend/src/` — React SPA with Vite
- Connectors: `backend/app/connectors/` — one per marketplace, BaseConnector + @ConnectorRegistry.register
- Core logic: `backend/app/core/formulas.py` — scoring, offers, margins (marketplace-agnostic)
- Core security: `backend/app/core/security.py` — circuit breaker, rate limiter, anti-detection
- Services: `backend/app/services/` — ingestion, matching, valuation, scoring
- Tasks: `backend/app/tasks/` — Celery workers (crawl queue, pipeline queue)
- Models: `backend/app/models/` — 14 model files, 20 tables
- API: `backend/app/api/` — 8 route modules (auth, opportunities, sources, reviews, offers, products, analytics, health)

## Pipeline Flow
```
Beat (5min) → trigger_scheduled_crawls → crawl_source (Apify) → ingest raw
→ normalize → deduplicate → match model → valuate → score → create opportunity → dashboard
```

## Key Patterns & Gotchas

### Celery + Async
- Celery tasks MUST create fresh SQLAlchemy engine per task (`_make_session()` pattern)
- Never use the shared `async_session` from `app/database.py` in Celery tasks
- Each task creates its own event loop with `asyncio.set_event_loop(loop)`
- Reason: forked Celery workers get a different event loop than the one asyncpg was bound to

### Celery Task Discovery
- Tasks are explicitly imported in `celery_app.py` (NOT autodiscover)
- Worker must listen on all queues: `-Q default,crawl,pipeline`
- Task routes: crawl_tasks → crawl queue, pipeline_tasks → pipeline queue

### SQLAlchemy
- `MessageDraft.metadata` renamed to `extra_data` with `mapped_column("metadata", JSON)` to avoid reserved name conflict

### Connectors / Apify
- **Vinted:** `kazkn/vinted-smart-scraper` — WORKING (free tier)
- **Kleinanzeigen:** `memo23/kleinanzeigen-search-cheerio` — needs paid rental
- **Depop:** `lexis-solutions/depop-scraper` — needs paid rental
- **Vestiaire:** `parseforge/vestiairecollective-scraper` — needs paid rental
- Only Vinted is active; other 3 sources disabled in DB (`is_active=false`)

### Business Logic
- Deal scoring formulas in `backend/app/core/formulas.py`
- Offer calculation: listed_price × clamp(offer% + condition_adj + risk_adj, min%, max%)
- Double platform fees: buyer-side AND seller-side fees in margin calculation
- Recommendations: BUY (score≥60), REVIEW (score≥35 or low confidence), IGNORE (below)
- Product catalog: 26 Oakley models, 85 aliases across 3 categories (seeded via `scripts/seed_products.py`)

## Current Status (March 2026)
- Full pipeline working end-to-end: 50 Vinted listings → 47 scored opportunities
- All 8 frontend pages functional with real API data
- Auth working (admin@sleek.local / changeme)
- Beat scheduler running, auto-crawls every 5 min
- **UI/UX upgrade complete:** Yousician-inspired visual overhaul with animated gauges, deal cards, charts, toasts

## Frontend Component Library (`frontend/src/components/ui/`)
- **ScoreGauge** — Animated SVG 270° arc gauge (red→amber→green), framer-motion fill
- **StatusIndicator** — Pulsing colored dot (hot/warm/cold/down) for health & deal status
- **RecommendationBadge** — Icon + colored badge for BUY/REVIEW/IGNORE
- **AnimatedCounter** — requestAnimationFrame count-up from 0 with ease-out
- **PriceComparisonBar** — Horizontal bar with listed/market/resale/offer markers + profit zone
- **DealCard** — Visual opportunity card with mini gauge, badge, price bar, hover lift
- **Toast + ToastProvider** — Context-based toast notifications (`useToast()` hook)

## Frontend UI State
- Dashboard: stat cards with AnimatedCounters, Recharts PieChart, ScoreGauge, colored quick actions
- Opportunities: card/table view toggle, DealCard grid, pagination, min_deal_score slider filter
- OpportunityDetail: 3 ScoreGauges, PriceComparisonBar, animated approve/reject with flash + toast
- Reviews: card exit animations (slide right/left), "All caught up!" empty state
- Sources: StatusIndicator with pulse, human-readable timestamps ("3 min ago"), crawl spinner
- Analytics: Recharts PieChart + BarChart score distribution, ScoreGauge + AnimatedCounters
- Offers: PriceComparisonBar in simulator, color-coded margin results (green/amber/red)
- Layout: react-icons nav items, 4px active border accent, red review count badge

## Frontend TODO (next session)
- Sources: crawl history view (backend endpoint exists)
- Offers: create/edit offer strategies UI (backend endpoint exists)
- Products: brand/model management page (backend endpoints exist)
- Opportunities: sortable table columns

## Database
- URL: postgresql+asyncpg://sleek:sleek_dev@db:5432/sleek (Docker internal)
- Local access: postgresql+asyncpg://sleek:sleek_dev@localhost:5434/sleek
- Migrations: Alembic in `backend/alembic/`

## Environment
- `.env` file at project root (NOT committed)
- Key vars: DATABASE_URL, REDIS_URL, CELERY_BROKER_URL, APIFY_API_TOKEN, ANTHROPIC_API_KEY, SECRET_KEY
- CORS_ORIGINS includes localhost:5173 and localhost:5174

## Important Patterns
- Follow solopilot patterns (flat app/ structure, same Docker setup, Caddy)
- Connectors use registry pattern with @ConnectorRegistry.register decorator
- All marketplace logic is isolated in connectors — core is brand/marketplace-agnostic
- Brand/model data is configuration, not hardcoded
- Async everywhere for I/O (asyncpg, httpx)
- Anti-detection: randomized search queries, jittered crawl intervals, circuit breakers per source
