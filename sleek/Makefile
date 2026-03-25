.PHONY: dev dev-down backend frontend worker beat db-shell migrate migrate-create seed test lint

# Development
dev:
	make -j4 backend frontend worker beat

backend:
	cd backend && source venv/bin/activate && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

frontend:
	cd frontend && npm run dev

worker:
	cd backend && source venv/bin/activate && celery -A app.tasks.celery_app worker -Q default,crawl,pipeline --loglevel=info

beat:
	cd backend && source venv/bin/activate && celery -A app.tasks.celery_app beat --loglevel=info

# Database
db-shell:
	psql postgresql://sleek:sleek_dev@localhost:5434/sleek

migrate:
	cd backend && source venv/bin/activate && alembic upgrade head

migrate-create:
	@read -p "Migration message: " msg; \
	cd backend && source venv/bin/activate && alembic revision --autogenerate -m "$$msg"

seed:
	cd backend && source venv/bin/activate && python -m scripts.seed_products

# Backend
test:
	cd backend && source venv/bin/activate && pytest -v

lint:
	cd backend && source venv/bin/activate && ruff check app/ && ruff format --check app/
