from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

app = FastAPI(title="TISAP Backend API")

# Enable CORS for Chrome extension and frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins including chrome-extension://
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Event(BaseModel):
    user_id: str
    campaign_id: str
    scenario_id: str
    channel: str
    action: str
    timestamp: str

# Store events in memory (for demo purposes)
events_db = []

@app.get("/")
async def root():
    return {
        "message": "TISAP Backend API",
        "endpoints": {
            "POST /api/events": "Create a new security event",
            "GET /api/data": "Get dashboard data",
            "GET /api/users": "Get all users",
            "GET /api/users/{id}": "Get user by ID"
        }
    }

@app.post("/api/events")
async def create_event(event: Event):
    """Receive security events from browser extension or other sources"""
    event_dict = event.dict()
    event_dict["received_at"] = datetime.now().isoformat()
    events_db.append(event_dict)
    
    print(f"[OK] Event received from {event.user_id}: {event.action}")
    print(f"     Channel: {event.channel}, Campaign: {event.campaign_id}")
    
    return {
        "status": "ok",
        "message": "Event recorded successfully",
        "event_id": len(events_db),
        "data": event_dict
    }

@app.get("/api/events")
async def get_events():
    """Get all recorded events"""
    return {
        "total": len(events_db),
        "events": events_db
    }

@app.get("/api/data")
async def get_dashboard_data():
    """Mock dashboard data for TISAP frontend"""
    return {
        "avgScore": 75,
        "totalEvents": len(events_db),
        "highRiskUsers": 12,
        "departmentScores": [
            {"department": "Engineering", "score": 82},
            {"department": "Sales", "score": 68},
            {"department": "HR", "score": 79},
            {"department": "Finance", "score": 85}
        ],
        "riskDistribution": [
            {"level": "Low", "count": 45},
            {"level": "Medium", "count": 32},
            {"level": "High", "count": 12}
        ],
        "recentEvents": events_db[-10:] if events_db else []
    }

@app.get("/api/users")
async def get_users():
    """Mock users data"""
    return [
        {
            "id": "1",
            "name": "Alice Johnson",
            "email": "alice@company.com",
            "role": "employee",
            "department": "Engineering",
            "riskScore": 92
        },
        {
            "id": "2",
            "name": "Bob Smith",
            "email": "bob@company.com",
            "role": "employee",
            "department": "Sales",
            "riskScore": 45
        },
        {
            "id": "3",
            "name": "Carol White",
            "email": "carol@company.com",
            "role": "employee",
            "department": "HR",
            "riskScore": 78
        }
    ]

@app.get("/api/users/{user_id}")
async def get_user(user_id: str):
    """Mock individual user data"""
    return {
        "user": {
            "id": user_id,
            "name": "John Doe",
            "email": "john.doe@company.com",
            "role": "employee",
            "department": "Engineering",
            "riskScore": 78
        },
        "events": [e for e in events_db if e.get("user_id") == user_id],
        "scoreHistory": [
            {"date": "2024-01-01", "score": 85},
            {"date": "2024-01-08", "score": 82},
            {"date": "2024-01-15", "score": 78}
        ]
    }

@app.post("/api/assign-remedial")
async def assign_remedial(data: dict):
    """Assign remedial training to a user"""
    print(f"[TRAINING] Remedial training assigned: {data}")
    return {"status": "ok", "message": "Training assigned successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
