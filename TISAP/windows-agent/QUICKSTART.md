# TISAP Windows Agent - Quick Start

## ✅ What Was Created

A lightweight Windows desktop application built with Python + Tkinter that simulates employee security actions.

## 📁 Files Created

```
windows-agent/
├── tisap_agent.py      # Main application
├── requirements.txt    # Dependencies (requests)
├── run.bat            # Quick launcher
├── README.md          # Full documentation
└── QUICKSTART.md      # This file
```

## 🚀 How to Run

### Option 1: Direct Python
```bash
cd d:/inn/Innovative/TISAP/windows-agent
python tisap_agent.py
```

### Option 2: Batch File
Double-click `run.bat`

## 🎯 Features

### UI Layout
```
┌─────────────────────────────────────┐
│  🛡️                                 │
│  TISAP Security Awareness           │
├─────────────────────────────────────┤
│  User ID:                           │
│  [employee@corp.com            ]    │
│                                     │
│  Simulate employee actions:         │
│                                     │
│  [  📎 Open File              ]     │
│  [  ⚡ Execute Script         ]     │
│  [  🚨 Report Threat          ]     │
│                                     │
│  Ready                              │
│                                     │
│  API: http://localhost:8000/api/... │
└─────────────────────────────────────┘
```

### Three Action Buttons

1. **📎 Open File** (Teal)
   - Action: `attachment_opened`
   - Simulates opening an email attachment

2. **⚡ Execute Script** (Orange)
   - Action: `file_executed`
   - Simulates executing a downloaded file

3. **🚨 Report Threat** (Green)
   - Action: `reported_real`
   - Simulates reporting a security threat

## 📤 Event Payload

Each button sends this to `POST http://localhost:8000/api/events`:

```json
{
  "user_id": "employee@corp.com",
  "campaign_id": "camp-desktop",
  "scenario_id": "win-agent",
  "channel": "endpoint",
  "action": "<button_action>",
  "timestamp": "2025-11-10T23:45:00.123456"
}
```

## ✨ How to Use

1. **Ensure Backend is Running**:
   ```bash
   cd d:/inn/Innovative/TISAP/backend
   uvicorn main:app --reload --port 8000 --host 0.0.0.0
   ```

2. **Launch the Agent**:
   ```bash
   python tisap_agent.py
   ```

3. **Enter User ID** (or use default: `employee@corp.com`)

4. **Click a Button**:
   - Click "Open File"
   - See success message
   - Check backend logs

5. **Backend Logs Show**:
   ```
   [OK] Event received from employee@corp.com: attachment_opened
        Channel: endpoint, Campaign: camp-desktop
   ```

## 🎨 Design

- **Colors**: Teal (#0d9488), Blue (#0284c7), Orange (#f59e0b), Green (#10b981)
- **Font**: Segoe UI (Windows native)
- **Size**: 450x400 pixels (fixed)
- **Style**: Modern, clean, professional

## 🔧 Configuration

Edit `tisap_agent.py` to customize:

```python
API_URL = "http://localhost:8000/api/events"
DEFAULT_USER_ID = "employee@corp.com"
CAMPAIGN_ID = "camp-desktop"
SCENARIO_ID = "win-agent"
CHANNEL = "endpoint"
```

## 🐛 Troubleshooting

### Connection Error
- **Problem**: "Could not connect to backend"
- **Solution**: Start FastAPI backend on port 8000
- **Test**: Open http://localhost:8000/docs

### Module Not Found
- **Problem**: `ModuleNotFoundError: No module named 'requests'`
- **Solution**: `pip install requests`

### Tkinter Not Found
- **Problem**: `ModuleNotFoundError: No module named 'tkinter'`
- **Solution**: Tkinter comes with Python. Reinstall Python with "tcl/tk" option checked.

## 📦 Create Executable (Optional)

To create a standalone `.exe`:

```bash
pip install pyinstaller
pyinstaller --onefile --windowed --name "TISAP-Agent" tisap_agent.py
```

Find the executable in `dist/TISAP-Agent.exe`

## 🔗 Integration

### With Chrome Extension
- Chrome extension simulates **browser** events
- Windows agent simulates **endpoint** events
- Both send to same backend

### With Next.js Frontend
- Frontend displays events in dashboards
- Admin can see all events from all channels
- Real-time updates via polling

### With FastAPI Backend
- Backend receives events from all sources
- Stores in memory (or database)
- Provides API for frontend

## 📊 Complete Flow

```
Windows Agent → POST /api/events → FastAPI Backend
                                         ↓
                                   Store Event
                                         ↓
Next.js Frontend ← GET /api/data ← FastAPI Backend
```

## ✅ Status

- **Created**: ✅ All files
- **Installed**: ✅ Dependencies (requests)
- **Running**: ✅ Application launched
- **Backend**: ✅ Connected to http://localhost:8000

## 🎉 Next Steps

1. Click a button in the Windows Agent
2. See success message
3. Check backend terminal for logs
4. View events at http://localhost:8000/api/events
5. See events in Next.js dashboard (if running)

---

**The Windows Agent is ready to use!** 🚀
