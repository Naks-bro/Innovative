# Testing TISAP Outlook Add-in - Complete Guide

## 🚀 Quick Start (3 Steps)

### Step 1: Start the Dev Server

```bash
cd d:/inn/Innovative/TISAP/outlook-addin
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view the app in the browser.

  Local:            https://localhost:3001
  On Your Network:  https://192.168.x.x:3001
```

**Important**: Leave this terminal running!

### Step 2: Accept the HTTPS Certificate

1. Open your browser
2. Navigate to: **https://localhost:3001**
3. You'll see a security warning (self-signed certificate)
4. Click **"Advanced"** → **"Proceed to localhost (unsafe)"**
5. You should see a blank page or webpack dev server page
6. **This step is crucial** - Outlook won't load the add-in without accepting the cert first

### Step 3: Sideload in Outlook

Choose your Outlook version below:

---

## 📧 Option A: Outlook Desktop (Windows)

### Installation Steps:

1. **Open Outlook Desktop**

2. **Go to Add-ins Menu**:
   - Click **File** → **Get Add-ins**
   - Or click **Home** tab → **Get Add-ins** button

3. **Add Custom Add-in**:
   - In the Add-ins dialog, click **My Add-ins** (left sidebar)
   - Scroll down and click **+ Add a custom add-in**
   - Select **Add from file...**

4. **Browse to Manifest**:
   - Navigate to: `d:\inn\Innovative\TISAP\outlook-addin\manifest.xml`
   - Select the file
   - Click **Open**

5. **Install Warning**:
   - You'll see a warning: "You're about to install a custom add-in..."
   - Click **Install**

6. **Confirmation**:
   - You should see: "TISAP Mail Agent has been added"
   - Click **OK**

### Using the Add-in:

1. **Open any email** (click on an email in your inbox)

2. **Find the button**:
   - Look in the ribbon at the top
   - You should see **"Security Actions"** button
   - It might be under **"More"** or **"..."** if the ribbon is collapsed

3. **Click "Security Actions"**:
   - A task pane opens on the right side
   - You'll see the TISAP Mail Agent UI

4. **Test the buttons**:
   - Click **"📎 Open Attachment"**
   - See status: "✓ Event sent successfully!"
   - Check backend logs for confirmation

---

## 🌐 Option B: Outlook Web (outlook.office.com)

### Installation Steps:

1. **Open Outlook Web**:
   - Go to: https://outlook.office.com
   - Sign in with your Microsoft account

2. **Open Settings**:
   - Click the **⚙️ (gear icon)** in the top-right
   - Click **"View all Outlook settings"** at the bottom

3. **Navigate to Add-ins**:
   - In the left sidebar: **General** → **Manage Add-ins**
   - Or search for "add-ins" in the settings search box

4. **Add Custom Add-in**:
   - Click **"+ Add from file"** or **"+ My add-ins"** → **"Add from file"**
   - Click **"Browse"** or **"Choose File"**

5. **Upload Manifest**:
   - Select: `d:\inn\Innovative\TISAP\outlook-addin\manifest.xml`
   - Click **"Open"** or **"Upload"**

6. **Accept Warning**:
   - Warning: "You're about to install a custom add-in..."
   - Check the box: "I understand..."
   - Click **"Install"**

7. **Close Settings**:
   - Click **"Save"** or close the settings panel

### Using the Add-in:

1. **Open any email** (click on an email)

2. **Find the add-in**:
   - Look for **"..."** (More actions) button near the top
   - Or look for **"Security Actions"** in the toolbar
   - Click it

3. **Task pane opens**:
   - TISAP Mail Agent UI appears on the right
   - Shows your email address
   - Shows three action buttons

4. **Test the buttons**:
   - Click any button
   - See success message
   - Check backend logs

---

## 🧪 Complete Testing Flow

### Test 1: Open Attachment Simulation

1. **Start dev server**: `npm start` (if not running)
2. **Open Outlook** (Desktop or Web)
3. **Open any email**
4. **Click "Security Actions"**
5. **In the task pane**, click **"📎 Open Attachment"**
6. **Expected Results**:
   - Task pane shows: "✓ Event sent successfully!"
   - Backend terminal shows:
     ```
     [OK] Event received from user@company.com: mail_attachment_opened
          Channel: mail, Campaign: camp-mail
     ```
   - Dashboard (after 5s) shows event in "Recent Events"

### Test 2: Click Link Simulation

1. **In the task pane**, click **"🔗 Click Link"**
2. **Expected Results**:
   - Task pane shows: "✓ Event sent successfully!"
   - Backend logs: `mail_link_clicked`
   - Dashboard shows event

### Test 3: Report Suspicious Email

1. **In the task pane**, click **"🚨 Report Suspicious Email"**
2. **Expected Results**:
   - Task pane shows: "✓ Event sent successfully!"
   - Backend logs: `mail_reported_real`
   - Dashboard shows event

---

## 🔍 Verification Steps

### 1. Check Backend Logs

Open the terminal where FastAPI is running:

```
[OK] Event received from user@company.com: mail_attachment_opened
     Channel: mail, Campaign: camp-mail
```

### 2. Check API Directly

Open browser and go to:
```
http://localhost:8000/api/events
```

You should see JSON with your events:
```json
{
  "total": 3,
  "events": [
    {
      "user_id": "user@company.com",
      "campaign_id": "camp-mail",
      "scenario_id": "outlook-addin",
      "channel": "mail",
      "action": "mail_attachment_opened",
      "timestamp": "2025-11-11T00:00:00.000Z",
      "received_at": "2025-11-11T00:00:01.123456"
    }
  ]
}
```

### 3. Check Dashboard

1. Open: http://localhost:3000
2. Login as **Admin**
3. Scroll to **"Recent Events"** section
4. Look for events with:
   - Channel: `mail`
   - Campaign: `camp-mail`
   - User: Your email address

---

## 🐛 Troubleshooting

### Problem: "Add-in not loading" or blank task pane

**Solution 1: Accept HTTPS Certificate**
```bash
# 1. Ensure dev server is running
npm start

# 2. Open browser and go to:
https://localhost:3001

# 3. Accept the certificate warning
# Click "Advanced" → "Proceed to localhost"

# 4. Reload the add-in in Outlook
```

**Solution 2: Clear Office Cache**
```bash
# Windows: Delete this folder
%LOCALAPPDATA%\Microsoft\Office\16.0\Wef\

# Then restart Outlook
```

**Solution 3: Check Dev Server**
```bash
# Make sure it's running on port 3001
npm start

# Check if accessible:
curl https://localhost:3001
```

### Problem: "Security Actions" button not appearing

**Solution 1: Check Manifest Installation**
- Outlook Desktop: File → Manage Add-ins → Check if "TISAP Mail Agent" is listed
- Outlook Web: Settings → Manage Add-ins → Check if listed

**Solution 2: Reinstall**
- Remove the add-in
- Restart Outlook
- Reinstall manifest.xml

**Solution 3: Check Email Context**
- The add-in only works when viewing an email
- Open an email first, then look for the button

### Problem: "✗ Failed: Network error"

**Solution 1: Check Backend**
```bash
# Ensure FastAPI is running
cd d:/inn/Innovative/TISAP/backend
uvicorn main:app --reload --port 8000 --host 0.0.0.0

# Test it:
curl http://localhost:8000/api/events
```

**Solution 2: Check CORS**
Backend should have:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Solution 3: Check Browser Console**
- In Outlook Web: Press F12 → Console tab
- Look for errors
- Check Network tab for failed requests

### Problem: "Office is undefined" error

**Solution**: Office.js not loading
- Check internet connection (Office.js loads from CDN)
- Check browser console for script loading errors
- Ensure manifest.xml has correct Office.js reference

### Problem: Certificate errors in Outlook

**Solution: Use mkcert for trusted certificates**
```bash
# Install mkcert (Windows)
choco install mkcert

# Create local CA
mkcert -install

# Generate certificates
cd d:/inn/Innovative/TISAP/outlook-addin
mkdir certs
cd certs
mkcert localhost 127.0.0.1 ::1

# Update webpack.config.js to use these certs
# Then restart: npm start
```

---

## 📊 Expected Behavior

### Task Pane UI:
```
┌─────────────────────────────┐
│ 🛡️ TISAP Mail Agent         │
│ Security Awareness Training │
├─────────────────────────────┤
│ User: user@company.com      │
├─────────────────────────────┤
│ Simulate Actions:           │
│                             │
│ [📎 Open Attachment]  ← Teal│
│ [🔗 Click Link]      ← Orange│
│ [🚨 Report Suspicious] ← Green│
│                             │
│ ✓ Event sent successfully!  │
│                             │
│ API: http://localhost:8000  │
└─────────────────────────────┘
```

### Status Messages:
- **Sending...** → While request is in progress
- **✓ Event sent successfully!** → Success (green)
- **✗ Failed: <error>** → Error (red)

---

## 🎯 Integration Test

### Full End-to-End Test:

1. **Start all services**:
   ```bash
   # Terminal 1: Backend
   cd d:/inn/Innovative/TISAP/backend
   uvicorn main:app --reload --port 8000

   # Terminal 2: Dashboard
   cd d:/inn/Innovative/TISAP
   npm run dev

   # Terminal 3: Outlook Add-in
   cd d:/inn/Innovative/TISAP/outlook-addin
   npm start
   ```

2. **Send events from all sources**:
   - Chrome Extension: Click "Simulate Click"
   - Windows Agent: Click "Open File"
   - Outlook Add-in: Click "Open Attachment"

3. **Verify in Dashboard**:
   - Open: http://localhost:3000
   - Login as Admin
   - Check "Recent Events"
   - Should see 3 events from different channels:
     - `browser` (Chrome)
     - `endpoint` (Windows)
     - `mail` (Outlook)

---

## 📝 Quick Reference

### Dev Server Commands:
```bash
# Start dev server
npm start

# Build for production
npm run build

# View in browser (to accept cert)
https://localhost:3001
```

### Manifest Location:
```
d:\inn\Innovative\TISAP\outlook-addin\manifest.xml
```

### API Endpoint:
```
POST http://localhost:8000/api/events
```

### Payload Format:
```json
{
  "user_id": "user@company.com",
  "campaign_id": "camp-mail",
  "scenario_id": "outlook-addin",
  "channel": "mail",
  "action": "mail_attachment_opened",
  "timestamp": "2025-11-11T00:00:00.000Z"
}
```

---

## 🎉 Success Checklist

- [ ] Dev server running on port 3001
- [ ] HTTPS certificate accepted in browser
- [ ] Manifest.xml sideloaded in Outlook
- [ ] "Security Actions" button visible in Outlook
- [ ] Task pane opens when button clicked
- [ ] User email displayed correctly
- [ ] Buttons send events successfully
- [ ] Backend logs show events received
- [ ] Dashboard displays events in "Recent Events"

---

## 🔗 Useful Links

- **Dev Server**: https://localhost:3001
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Dashboard**: http://localhost:3000
- **All Events**: http://localhost:8000/api/events

---

**You're ready to test the Outlook Add-in!** 🚀

Start with: `npm start` in the outlook-addin folder, then follow the sideloading steps above.
