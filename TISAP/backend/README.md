# TISAP Backend API

FastAPI backend for the TISAP Security Awareness Platform.

## Features
- POST /api/events - Receive security events from browser extension
- GET /api/data - Dashboard metrics
- GET /api/users - All users
- GET /api/users/{id} - Individual user data
- POST /api/assign-remedial - Assign training
- CORS enabled for Chrome extensions and frontend

## Installation

```bash
pip install -r requirements.txt
```

## Run

```bash
uvicorn backend.main:app --reload --port 8000 --host 0.0.0.0
```

Or from the backend directory:

```bash
cd backend
uvicorn main:app --reload --port 8000 --host 0.0.0.0
```

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Test

```bash
curl -X POST http://localhost:8000/api/events \
  -H "Content-Type: application/json" \
  -d '{"user_id":"test","campaign_id":"camp-demo","scenario_id":"ext-browser","channel":"browser","action":"link_clicked","timestamp":"2025-01-01T12:00:00.000Z"}'
```

## Notes
- Events are stored in memory (will reset on restart)
- For production, connect to a real database
- CORS is permissive (*) for development
