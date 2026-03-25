"""
Security middleware for the SLEEK API.
Protects against: brute force, enumeration, unauthorized access, abuse.
"""
import time
import uuid
from collections import defaultdict

import structlog
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware

logger = structlog.get_logger()


class SecurityMiddleware(BaseHTTPMiddleware):
    """
    Adds:
    - Request correlation ID for tracing
    - Security headers
    - Request logging with timing
    - Basic IP-based rate limiting for auth endpoints
    """

    def __init__(self, app):
        super().__init__(app)
        # In-memory rate limit tracker for login attempts
        # In production, use Redis for distributed rate limiting
        self._login_attempts: dict[str, list[float]] = defaultdict(list)

    async def dispatch(self, request: Request, call_next) -> Response:
        # 1. Generate correlation ID
        request_id = str(uuid.uuid4())[:8]
        start_time = time.time()

        # 2. Check login rate limit
        if request.url.path == "/api/auth/login" and request.method == "POST":
            client_ip = self._get_client_ip(request)
            if self._is_login_rate_limited(client_ip):
                logger.warning("auth.rate_limited", ip=client_ip, request_id=request_id)
                return Response(
                    content='{"detail":"Too many login attempts. Try again later."}',
                    status_code=429,
                    media_type="application/json",
                )

        # 3. Process request
        response = await call_next(request)

        # 4. Add security headers
        response.headers["X-Request-ID"] = request_id
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate"

        # Don't expose server info
        if "server" in response.headers:
            del response.headers["server"]

        # 5. Log request
        duration = time.time() - start_time
        logger.info(
            "http.request",
            method=request.method,
            path=request.url.path,
            status=response.status_code,
            duration_ms=round(duration * 1000),
            request_id=request_id,
        )

        return response

    def _get_client_ip(self, request: Request) -> str:
        """Get real client IP, considering reverse proxy headers."""
        forwarded = request.headers.get("x-forwarded-for")
        if forwarded:
            return forwarded.split(",")[0].strip()
        return request.client.host if request.client else "unknown"

    def _is_login_rate_limited(self, ip: str, max_attempts: int = 10, window_seconds: int = 300) -> bool:
        """
        Allow max 10 login attempts per IP per 5 minutes.
        Protects against brute force attacks on auth.
        """
        now = time.time()
        # Clean old entries
        self._login_attempts[ip] = [
            t for t in self._login_attempts[ip] if now - t < window_seconds
        ]
        # Check
        if len(self._login_attempts[ip]) >= max_attempts:
            return True
        self._login_attempts[ip].append(now)
        return False
