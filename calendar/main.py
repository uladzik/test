import json
import os
from datetime import datetime, timedelta, timezone

import requests
from dotenv import load_dotenv

load_dotenv()
from flask import Flask, jsonify, redirect, request, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET")
REDIRECT_URI = os.environ.get(
    "REDIRECT_URI", "https://calendar-miniapp.onrender.com/auth/google/callback"
)
BOT_TOKEN = os.environ.get("BOT_TOKEN") or os.environ.get("TELEGRAM_BOT_TOKEN")

TOKENS_FILE = "tokens.json"

_tokens: dict[str, dict] = {}


def load_tokens() -> None:
    global _tokens
    try:
        with open(TOKENS_FILE, "r") as f:
            _tokens = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        _tokens = {}


def _save_tokens() -> None:
    with open(TOKENS_FILE, "w") as f:
        json.dump(_tokens, f)


def _refresh_access_token(user_id: str) -> bool:
    """Refresh an expired Google access token using the stored refresh token.
    Returns True if the token was refreshed successfully."""
    tokens = _tokens.get(user_id)
    if not tokens or "refresh_token" not in tokens:
        return False

    resp = requests.post(
        "https://oauth2.googleapis.com/token",
        data={
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
            "refresh_token": tokens["refresh_token"],
            "grant_type": "refresh_token",
        },
        timeout=10,
    )
    new_tokens = resp.json()

    if "access_token" not in new_tokens:
        return False

    # Google doesn't always return a new refresh_token — keep the old one
    tokens["access_token"] = new_tokens["access_token"]
    if "refresh_token" in new_tokens:
        tokens["refresh_token"] = new_tokens["refresh_token"]
    tokens["expires_in"] = new_tokens.get("expires_in")
    _tokens[user_id] = tokens
    _save_tokens()
    return True


def _google_api_request(method: str, url: str, user_id: str, **kwargs):
    """Make a Google API request with automatic token refresh on 401."""
    tokens = _tokens.get(user_id)
    if not tokens:
        return None

    headers = {"Authorization": f"Bearer {tokens['access_token']}"}
    resp = requests.request(method, url, headers=headers, timeout=10, **kwargs)

    if resp.status_code == 401:
        if _refresh_access_token(user_id):
            tokens = _tokens[user_id]
            headers = {"Authorization": f"Bearer {tokens['access_token']}"}
            resp = requests.request(method, url, headers=headers, timeout=10, **kwargs)

    return resp


load_tokens()


@app.route("/")
def index():
    return send_file("index.html")


@app.route("/auth/google")
def auth_google():
    user_id = request.args.get("user_id", "")
    params = "&".join([
        f"client_id={GOOGLE_CLIENT_ID}",
        f"redirect_uri={REDIRECT_URI}",
        "response_type=code",
        "scope=https://www.googleapis.com/auth/calendar",
        "access_type=offline",
        "prompt=consent",
        f"state={user_id}",
    ])
    return redirect(f"https://accounts.google.com/o/oauth2/v2/auth?{params}")


@app.route("/auth/google/callback")
def auth_google_callback():
    code = request.args.get("code")
    user_id = request.args.get("state")

    if not code:
        return "Missing code", 400

    resp = requests.post(
        "https://oauth2.googleapis.com/token",
        data={
            "code": code,
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
            "redirect_uri": REDIRECT_URI,
            "grant_type": "authorization_code",
        },
        timeout=10,
    )
    tokens = resp.json()

    if "access_token" not in tokens:
        return f"Auth failed: {tokens.get('error_description', tokens)}", 401

    _tokens[user_id] = tokens
    _save_tokens()
    return "<script>window.close();</script><p>Connected! You can close this tab.</p>"


@app.route("/get_events")
def get_events():
    user_id = request.args.get("user_id")
    tokens = _tokens.get(user_id)

    if not tokens:
        return jsonify({"error": "Not authenticated"}), 401

    resp = _google_api_request(
        "GET",
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        user_id,
        params={
            "maxResults": 50,
            "orderBy": "startTime",
            "singleEvents": True,
            "timeMin": datetime.now(timezone.utc).isoformat(),
        },
    )

    if resp is None or resp.status_code == 401:
        _tokens.pop(user_id, None)
        _save_tokens()
        return jsonify({"error": "Token expired"}), 401

    return jsonify({"events": resp.json().get("items", [])})


@app.route("/debug_tokens")
def debug_tokens():
    return jsonify({"user_ids": list(_tokens.keys()), "count": len(_tokens)})


def _send_bot_notification(chat_id: str, title: str, start_dt: datetime, tz: str) -> None:
    """Send a Telegram bot message after a calendar event is created."""
    if not BOT_TOKEN:
        return
    try:
        text = (
            f"✅ Meeting created: *{title}*\n"
            f"📅 {start_dt.strftime('%d %b %Y at %H:%M')} ({tz})"
        )
        requests.post(
            f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
            json={"chat_id": chat_id, "text": text, "parse_mode": "Markdown"},
            timeout=5,
        )
    except Exception:
        pass


@app.route("/create_event", methods=["POST"])
def create_event():
    data = request.json or {}
    user_id = data.get("user_id")
    tokens = _tokens.get(user_id)

    if not tokens:
        return jsonify({"error": "Not authenticated"}), 401

    start_str = data.get("datetime")
    duration = int(data.get("duration", 30))
    tz = data.get("timezone", "UTC")

    try:
        start_dt = datetime.fromisoformat(start_str)
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid datetime format"}), 400

    end_dt = start_dt + timedelta(minutes=duration)

    event_body = {
        "summary": data.get("title", "Untitled"),
        "start": {"dateTime": start_dt.isoformat(), "timeZone": tz},
        "end": {"dateTime": end_dt.isoformat(), "timeZone": tz},
    }

    if data.get("attendee"):
        event_body["attendees"] = [{"email": data["attendee"]}]

    resp = _google_api_request(
        "POST",
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        user_id,
        json=event_body,
    )

    if resp is None or resp.status_code == 401:
        _tokens.pop(user_id, None)
        _save_tokens()
        return jsonify({"error": "Token expired"}), 401

    if not resp.ok:
        return jsonify({"error": resp.json()}), resp.status_code

    _send_bot_notification(user_id, data.get("title", "Untitled"), start_dt, tz)

    return jsonify({"success": True, "event": resp.json()})


MINI_APP_URL = os.environ.get("MINI_APP_URL", "https://calendar-miniapp.onrender.com")


@app.route("/webhook", methods=["POST"])
def webhook():
    update = request.json or {}
    message = update.get("message") or update.get("edited_message")
    if not message:
        return "ok"

    chat_id = str(message["chat"]["id"])
    text = message.get("text", "")

    if text.startswith("/start"):
        _send_raw(chat_id, (
            "👋 Hi! I'm CalendarBot.\n\n"
            "Tap the button below to open the mini app and schedule meetings."
        ), reply_markup={
            "inline_keyboard": [[{
                "text": "📅 Open CalendarBot",
                "web_app": {"url": MINI_APP_URL}
            }]]
        })

    return "ok"


def _send_raw(chat_id: str, text: str, reply_markup=None) -> None:
    if not BOT_TOKEN:
        return
    payload = {"chat_id": chat_id, "text": text, "parse_mode": "Markdown"}
    if reply_markup:
        payload["reply_markup"] = reply_markup
    try:
        requests.post(
            f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
            json=payload,
            timeout=5,
        )
    except Exception:
        pass


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
