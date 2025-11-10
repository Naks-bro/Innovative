# TISAP Security Simulator (Chrome Extension)

A Chrome Manifest V3 extension that simulates browser security events and sends them to a FastAPI backend.

API endpoint used:
```
http://localhost:8000/api/events
```

## Features
- Popup UI with three actions:
  - Simulate Click → action: `link_clicked`
  - Report Simulation → action: `reported_simulation`
  - Simulate Ignore → action: `ignored`
- Status feedback after each action: ✅ Sent or ❌ Failed
- Teal + white theme with clean UI
- Auto-reloads popup after 3 seconds
- Remembers last User ID using chrome.storage

## Event Payload
```json
{
  "user_id": "<value from input field>",
  "campaign_id": "camp-demo",
  "scenario_id": "ext-browser",
  "channel": "browser",
  "action": "<button_action>",
  "timestamp": "ISO-8601"
}
```

## Files
- `manifest.json` — MV3 manifest
- `popup.html` — Popup UI
- `popup.css` — Styling (teal + white)
- `popup.js` — Logic to POST events and show status

## Install (Load Unpacked)
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked"
4. Select the folder:
   ```
   d:/inn/Innovative/TISAP/extension
   ```
5. The extension "TISAP Security Simulator" should appear in your toolbar (pin it if needed)

## Usage
1. Ensure your FastAPI backend is running on `http://localhost:8000`
2. Click the extension icon to open the popup
3. Enter a User ID (e.g., `employee-123`)
4. Click one of the buttons:
   - Simulate Click
   - Report Simulation
   - Simulate Ignore
5. Watch the status line for ✅ Sent or ❌ Failed
6. The popup will auto-reload in 3 seconds after a successful send

## Permissions
- `storage` — to remember the User ID
- `host_permissions`: `http://localhost:8000/*` — to call FastAPI backend

## Notes
- This extension does not inject content scripts or require background service workers
- CORS should be enabled on the FastAPI server for `http://localhost` extension requests if needed
- For production, change the API URL accordingly in `popup.js`
