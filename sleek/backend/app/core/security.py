"""
Security utilities for SLEEK platform.
Covers: encryption, rate limiting, anti-detection, request signing.
"""
import hashlib
import hmac
import secrets
import time
from datetime import datetime, timezone

from cryptography.fernet import Fernet

from app.config import settings


# ──────────────────────────────────────────
# ENCRYPTION (for stored credentials/tokens)
# ──────────────────────────────────────────

class CredentialEncryptor:
    """Encrypt/decrypt sensitive data at rest (API keys, account passwords, tokens)."""

    def __init__(self, key: str | None = None):
        self._key = key or settings.SECRET_KEY
        # Derive a Fernet-compatible key from SECRET_KEY
        derived = hashlib.sha256(self._key.encode()).digest()
        import base64
        self._fernet = Fernet(base64.urlsafe_b64encode(derived))

    def encrypt(self, plaintext: str) -> str:
        return self._fernet.encrypt(plaintext.encode()).decode()

    def decrypt(self, ciphertext: str) -> str:
        return self._fernet.decrypt(ciphertext.encode()).decode()


_encryptor = None

def get_encryptor() -> CredentialEncryptor:
    global _encryptor
    if _encryptor is None:
        _encryptor = CredentialEncryptor()
    return _encryptor


# ──────────────────────────────────────────
# API REQUEST SIGNING (webhook verification)
# ──────────────────────────────────────────

def sign_payload(payload: bytes, secret: str) -> str:
    """HMAC-SHA256 signature for webhook/API payloads."""
    return hmac.new(secret.encode(), payload, hashlib.sha256).hexdigest()


def verify_signature(payload: bytes, signature: str, secret: str) -> bool:
    """Verify HMAC-SHA256 signature."""
    expected = sign_payload(payload, secret)
    return hmac.compare_digest(expected, signature)


# ──────────────────────────────────────────
# CRAWL ANTI-DETECTION
# ──────────────────────────────────────────

import random

def jitter(base_seconds: float, variance_pct: float = 0.3) -> float:
    """Add random jitter to a delay to avoid pattern detection.

    Example: jitter(60, 0.3) returns between 42 and 78 seconds.
    """
    min_val = base_seconds * (1 - variance_pct)
    max_val = base_seconds * (1 + variance_pct)
    return random.uniform(min_val, max_val)


def randomize_crawl_interval(base_minutes: int) -> int:
    """Return a randomized crawl interval to avoid predictable patterns."""
    return int(jitter(base_minutes * 60, 0.2) / 60)


OAKLEY_SEARCH_QUERIES = [
    "Oakley",
    "oakley sunglasses",
    "oakley glasses",
    "oakley brille",  # German
    "oakley sonnenbrille",  # German
    "oakley holbrook",
    "oakley radar",
    "oakley jawbreaker",
    "oakley frogskins",
    "oakley sutro",
    "oakley prizm",
    "oakley flak",
]

def get_random_search_query() -> str:
    """Rotate search queries to avoid pattern detection."""
    return random.choice(OAKLEY_SEARCH_QUERIES)


# ──────────────────────────────────────────
# CIRCUIT BREAKER (per-source failure isolation)
# ──────────────────────────────────────────

class CircuitBreaker:
    """
    Prevents hammering a source when it's failing.

    States:
      CLOSED  — normal operation
      OPEN    — source is failing, skip requests
      HALF_OPEN — try one request to see if recovered

    Transitions:
      CLOSED → OPEN: after `failure_threshold` consecutive failures
      OPEN → HALF_OPEN: after `recovery_timeout` seconds
      HALF_OPEN → CLOSED: on success
      HALF_OPEN → OPEN: on failure
    """

    def __init__(
        self,
        name: str,
        failure_threshold: int = 5,
        recovery_timeout: int = 300,  # 5 minutes
    ):
        self.name = name
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.failures = 0
        self.state = "CLOSED"
        self.last_failure_time: float | None = None

    def record_success(self):
        self.failures = 0
        self.state = "CLOSED"

    def record_failure(self):
        self.failures += 1
        self.last_failure_time = time.time()
        if self.failures >= self.failure_threshold:
            self.state = "OPEN"

    def can_execute(self) -> bool:
        if self.state == "CLOSED":
            return True
        if self.state == "OPEN":
            if self.last_failure_time and (time.time() - self.last_failure_time) > self.recovery_timeout:
                self.state = "HALF_OPEN"
                return True
            return False
        if self.state == "HALF_OPEN":
            return True
        return False

    def to_dict(self) -> dict:
        return {
            "name": self.name,
            "state": self.state,
            "failures": self.failures,
            "last_failure": self.last_failure_time,
        }


# Global circuit breakers per source
_circuit_breakers: dict[str, CircuitBreaker] = {}

def get_circuit_breaker(source_name: str) -> CircuitBreaker:
    if source_name not in _circuit_breakers:
        _circuit_breakers[source_name] = CircuitBreaker(name=source_name)
    return _circuit_breakers[source_name]


# ──────────────────────────────────────────
# RATE LIMITER (in-memory, per source)
# ──────────────────────────────────────────

class RateLimiter:
    """Token bucket rate limiter per source."""

    def __init__(self, rpm: int):
        self.rpm = rpm
        self.tokens = rpm
        self.last_refill = time.time()

    def acquire(self) -> bool:
        self._refill()
        if self.tokens > 0:
            self.tokens -= 1
            return True
        return False

    def wait_time(self) -> float:
        """Seconds to wait before next available token."""
        self._refill()
        if self.tokens > 0:
            return 0.0
        return 60.0 / self.rpm

    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        new_tokens = elapsed * (self.rpm / 60.0)
        self.tokens = min(self.rpm, self.tokens + new_tokens)
        self.last_refill = now


_rate_limiters: dict[str, RateLimiter] = {}

def get_rate_limiter(source_name: str, rpm: int = 30) -> RateLimiter:
    if source_name not in _rate_limiters:
        _rate_limiters[source_name] = RateLimiter(rpm=rpm)
    return _rate_limiters[source_name]
