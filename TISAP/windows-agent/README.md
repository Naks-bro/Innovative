# TISAP Windows Agent

A lightweight Windows desktop application that simulates employee security actions and reports them to the TISAP FastAPI backend.

## Features

- **Modern Tkinter UI** with company branding
- **Three Action Buttons**:
  - 📎 **Open File** → Simulates opening an attachment (action: `attachment_opened`)
  - ⚡ **Execute Script** → Simulates executing a file (action: `file_executed`)
  - 🚨 **Report Threat** → Simulates reporting a real threat (action: `reported_real`)
- **Real-time Status Updates** with success/error messages
- **Configurable User ID** input field
- **Error Handling** for network issues

## Event Payload

Each action sends this JSON to `http://localhost:8000/api/events`:

```json
{
  "user_id": "employee@corp.com",
  "campaign_id": "camp-desktop",
  "scenario_id": "win-agent",
  "channel": "endpoint",
  "action": "<selected_action>",
  "timestamp": "2025-11-10T23:45:00.123456"
}
```

## Installation

### Prerequisites
- Python 3.7+ installed
- FastAPI backend running on `http://localhost:8000`

### Steps

1. **Navigate to the agent directory**:
   ```bash
   cd d:/inn/Innovative/TISAP/windows-agent
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**:
   ```bash
   python tisap_agent.py
   ```

## Usage

1. **Start the FastAPI backend** (if not already running):
   ```bash
   cd d:/inn/Innovative/TISAP/backend
   uvicorn main:app --reload --port 8000 --host 0.0.0.0
   ```

2. **Launch the Windows Agent**:
   ```bash
   python tisap_agent.py
   ```

3. **Enter User ID** (default: `employee@corp.com`)

4. **Click an action button**:
   - Click "Open File" to simulate opening an attachment
   - Click "Execute Script" to simulate executing a file
   - Click "Report Threat" to simulate reporting a threat

5. **View confirmation**:
   - Success message appears
   - Status updates at the bottom
   - Check backend logs to see the event received

## Backend Logs

When you click a button, the FastAPI backend will log:

```
[OK] Event received from employee@corp.com: attachment_opened
     Channel: endpoint, Campaign: camp-desktop
```

## Configuration

Edit `tisap_agent.py` to change:

```python
API_URL = "http://localhost:8000/api/events"  # Backend URL
DEFAULT_USER_ID = "employee@corp.com"          # Default user
CAMPAIGN_ID = "camp-desktop"                   # Campaign ID
SCENARIO_ID = "win-agent"                      # Scenario ID
CHANNEL = "endpoint"                           # Channel type
```

## Troubleshooting

### "Connection Error"
- Ensure FastAPI backend is running on port 8000
- Test: Open http://localhost:8000/docs in browser

### "Request timeout"
- Backend may be slow or unresponsive
- Check backend terminal for errors

### Import Error
- Install requests: `pip install requests`

## Creating an Executable (Optional)

To create a standalone `.exe` file:

1. **Install PyInstaller**:
   ```bash
   pip install pyinstaller
   ```

2. **Build the executable**:
   ```bash
   pyinstaller --onefile --windowed --name "TISAP-Agent" tisap_agent.py
   ```

3. **Find the executable**:
   - Location: `dist/TISAP-Agent.exe`
   - Double-click to run (no Python required)

## Screenshots

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
│  ✓ Event sent successfully!         │
│                                     │
│  API: http://localhost:8000/api/... │
└─────────────────────────────────────┘
```

## Tech Stack

- **Python 3** - Programming language
- **Tkinter** - GUI framework (built-in)
- **Requests** - HTTP library for API calls

## Notes

- Tkinter is included with Python (no extra installation)
- The app is lightweight (~50 KB)
- All events are sent via POST to FastAPI
- User ID is saved between button clicks

## License

Proprietary - Part of TISAP Security Awareness Platform
