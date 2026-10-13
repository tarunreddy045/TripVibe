# TripVibe — AI-Powered Smart Travel Planner

A runnable starter implementation based on the TripVibe project presentation. It includes a responsive React UI, FastAPI REST API, budget-aware fallback itinerary generation, optional Gemini integration, SQLAlchemy persistence, optional live weather, OpenStreetMap/Leaflet visualization, tests, and Docker files.

## Features implemented
- Email-based sign-in and registration UI, with separate traveler, agent and admin entry points. Demo staff accounts are listed below.
- Mandatory 12-digit Aadhaar field in registration, with only a masked value retained in the browser demo. **Use fictional test values only; do not enter real Aadhaar data.**
- Terms and conditions gate before a traveler opens the dashboard.
- Destination-aware budget estimator for Goa, Jaipur, Hyderabad and Ooty. Estimates separately include room stay, food, local transport, activities/entry fees and travel to the destination, plus per-person and per-person/day totals.
- Destination photo cards and Leaflet maps with popular attractions and image-backed map popups.
- Trip saving, start-date-based cancellation eligibility (at least 48 hours before departure) and a displayed 75% estimated refund.
- Support chat queue with agent replies, a user-verification work queue, and an admin overview of users/trips/support tickets.
- **Memory Quest passport:** destination-specific micro-challenges at landmarks let travelers collect personal digital stamps as they explore.
- The original AI itinerary planner and live weather experience remain available under **AI itinerary**.
- Inputs: destination, total budget, travelers, trip duration, travel vibes, and pace.
- Day-by-day plan split into time slots, with estimated costs and coordinates for supported sample destinations.
- Budget split matching the presentation: lodging 38%, food 26%, activities 18%, local transport 10%, emergency buffer 8%.
- Gemini 2.5 Flash generation with Pydantic validation when `GEMINI_API_KEY` is configured; automatic heuristic fallback if the key is absent or the AI provider fails.
- Saved trips stored in SQLite by default; `DATABASE_URL` can be changed for PostgreSQL.
- Leaflet map with OpenStreetMap tiles and pins where known coordinates exist.
- Live current weather via Open-Meteo (no API key required); optionally uses OpenWeatherMap when its API key is configured. Shows temperature, feels-like temperature, conditions, humidity and wind.
- Health endpoint and basic pytest tests.

## Requirements
- Node.js 20+ (Node 22 recommended)
- Python 3.12 recommended

## Run locally (Windows PowerShell)

### 1. Backend
```powershell
cd TripVibe_Project\backend
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn app.main:app --reload
```
Backend docs: http://127.0.0.1:8000/docs
Health check: http://127.0.0.1:8000/api/health

### 2. Frontend (open a second terminal)
```powershell
cd TripVibe_Project\frontend
npm install
npm run dev
```
Open the URL Vite prints, normally http://localhost:5173.

## Demo staff sign-in
Use the sign-in page and choose the matching account type:
- **Admin:** `admin@tripvibe.demo` / `Admin@123`
- **Support agent:** `agent@tripvibe.demo` / `Agent@123`
- **Traveler:** create an account with a unique email and a fictional 12-digit Aadhaar test value.

The traveler dashboard shows the terms first. Agents can review masked profile records and reply to support requests; the admin overview summarizes records.

## Optional API keys
Edit `backend/.env`:
- `GEMINI_API_KEY=...` enables Gemini 2.5 Flash itinerary generation. Get a key from [Google AI Studio](https://aistudio.google.com/app/apikey). Without a key, the built-in fallback planner still works.
- `OPENWEATHER_API_KEY=...` is optional. Without it, live current weather is fetched from Open-Meteo, which does not require an API key. Internet access is required.
- `DATABASE_URL=sqlite:///./tripvibe.db` is the default. For PostgreSQL use a PostgreSQL SQLAlchemy URL and install a matching driver such as `psycopg[binary]`.

Do not commit `.env` or API keys to GitHub.

## Run tests
From `backend` with its virtual environment activated:
```powershell
pytest -q
```

## Docker
Create `backend/.env` from `.env.example`, then from the project root:
```bash
docker compose up --build
```
Open frontend at http://localhost:8080 and API docs at http://localhost:8000/docs.

## Project API
- `GET /api/health`
- `GET /api/destinations`
- `POST /api/trips/generate`
- `POST /api/trips/save`
- `GET /api/trips/saved`
- `GET /api/trips/saved/{id}`
- `DELETE /api/trips/saved/{id}`
- `GET /api/weather?city=Goa`

## Important prototype/security limitations
- The newly added sign-in, roles, profile verification queue, booking list and support chat are **browser-local demonstration features**. They are not secure server-side authentication or shared multi-device storage. Role restrictions in this UI can be bypassed by a technical user; do not use this build to process real personal data or payments.
- The Aadhaar field is mandatory for the demo registration flow, but this project does not verify Aadhaar with UIDAI or another authorized provider. It stores only a masked number in the profile record; do not enter real Aadhaar details. Production identity checks need a compliant provider, encryption, retention controls, audit logs and explicit privacy/consent review.
- Passwords for registered demo users are SHA-256 hashed in browser storage, but browser storage is not an acceptable production credential store. Production must use backend password hashing (e.g. Argon2/bcrypt), secure sessions, server-side role checks and HTTPS.
- Booking/cancellation/refund values are illustrative only. There is no payment gateway, actual payment verification, hotel reservation, or real refund transaction. The 75% refund is only displayed as a demo estimate.
- Support chat and verification status are stored in the current browser only. Production needs database-backed APIs, authenticated agent assignment and audit trails. Admin views show masked identity values, not full Aadhaar numbers.
- Attraction photos use remote image URLs and may change; verify usage/licensing and attraction information before public deployment.

## Notes and limitations
- This is a project implementation starter, not a booking service. It does not book hotels, flights, tickets, or guarantee availability.
- Cost estimates are illustrative and should be checked before travel. The sample percentages follow the project PPT.
- Coordinates are supplied for selected sample destinations only. Unknown destinations use general itinerary suggestions without fabricated coordinates.
- Live weather and Gemini require API keys. Fallback planning and local SQLite persistence work without those external keys.
- Production deployment should configure the correct public frontend origin in CORS, secrets, persistent database storage, API rate limits, and monitoring.

## Team mapping from the PPT
- P. Bhavani Shankar: backend architecture and planning logic.
- K. Tarun Reddy: Gemini prompts, JSON validation, fallback behavior.
- Y. Sadhwik: React UI and responsive trip-planning experience.
- B. Mahesh Reddy: SQLAlchemy models and saved-trip storage.
- K. Mani Teja: maps/weather integration, tests, Docker and deployment.
