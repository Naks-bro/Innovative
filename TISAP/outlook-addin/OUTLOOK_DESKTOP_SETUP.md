# 📧 Outlook Desktop (Windows) Setup Guide

## Complete Step-by-Step Instructions

### ✅ Prerequisites
- ✅ Outlook Desktop installed on Windows
- ✅ Node.js installed
- ✅ Dependencies installed (`npm install` completed)
- ✅ Backend running on port 8000

---

## 🚀 Step 1: Restart Dev Server with HTTPS

### Stop Current Server
In your terminal where `npm start` is running:
- Press **Ctrl + C**
- Confirm: **Y** (if asked)

### Start with HTTPS
```bash
cd d:/inn/Innovative/TISAP/outlook-addin
npm start
```

**Expected Output:**
```
<i> [webpack-dev-server] Project is running at:
<i> [webpack-dev-server] Loopback: https://localhost:3001/
```

**Note**: Now it says **https://** instead of http://

---

## 🔐 Step 2: Accept Self-Signed Certificate

### In Your Browser:

1. **Open**: https://localhost:3001/taskpane.html

2. **You'll see a security warning**:
   - Chrome: "Your connection is not private"
   - Edge: "Your connection isn't private"

3. **Click "Advanced"**

4. **Click "Proceed to localhost (unsafe)"** or "Continue to localhost"

5. **You should see the TISAP Mail Agent UI**:
   ```
   🛡️ TISAP Mail Agent
   Security Awareness Training
   
   User: Loading...
   
   [📎 Open Attachment]
   [🔗 Click Link]
   [🚨 Report Suspicious Email]
   ```

6. **Leave this browser tab open** (helps with certificate caching)

---

## 📧 Step 3: Sideload in Outlook Desktop

### Method A: Via File Menu (Recommended)

1. **Open Outlook Desktop**

2. **Click "File"** in the top-left corner

3. **Click "Get Add-ins"**
   - If you don't see this, try: **File** → **Info** → **Manage Add-ins**

4. **In the Add-ins dialog**:
   - Click **"My Add-ins"** in the left sidebar
   - Scroll down to the bottom

5. **Click "+ Add a custom add-in"**
   - Select **"Add from file..."**

6. **Browse to manifest**:
   - Navigate to: `d:\inn\Innovative\TISAP\outlook-addin\manifest.xml`
   - Click **"Open"**

7. **Security Warning**:
   - You'll see: "You're about to install a custom add-in that isn't from the Office Store..."
   - ✅ Check: "I understand..."
   - Click **"Install"**

8. **Success Message**:
   - "TISAP Mail Agent has been added"
   - Click **"OK"**

### Method B: Via Ribbon (Alternative)

1. **Open Outlook Desktop**

2. **Click "Home" tab** in the ribbon

3. **Look for "Get Add-ins"** button
   - Might be under "Store" section
   - Or click the **"..."** (More) button

4. **Follow steps 4-8 from Method A above**

---

## 🎯 Step 4: Use the Add-in

### Open an Email:

1. **Click on any email** in your inbox to open/preview it

2. **Look for the "Security Actions" button**:
   - Should appear in the **ribbon** at the top
   - Look in the **"Home"** or **"Message"** tab
   - Might be under **"..."** (More actions) if ribbon is collapsed

3. **Click "Security Actions"**

4. **Task pane opens on the right** showing:
   ```
   ┌─────────────────────────────┐
   │ 🛡️ TISAP Mail Agent         │
   │ Security Awareness Training │
   ├─────────────────────────────┤
   │ User: your-email@domain.com │
   ├─────────────────────────────┤
   │ Simulate Actions:           │
   │                             │
   │ [📎 Open Attachment]        │
   │ [🔗 Click Link]             │
   │ [🚨 Report Suspicious Email]│
   │                             │
   │ Ready                       │
   └─────────────────────────────┘
   ```

---

## 🧪 Step 5: Test the Buttons

### Test 1: Open Attachment

1. **Click "📎 Open Attachment"** button

2. **Expected Results**:
   - Task pane shows: **"Sending..."** (briefly)
   - Then: **"✓ Event sent successfully!"** (green)
   - After 3 seconds: Back to **"Ready"**

3. **Verify in Backend**:
   - Check your backend terminal
   - Should see:
     ```
     [OK] Event received from your-email@domain.com: mail_attachment_opened
          Channel: mail, Campaign: camp-mail
     ```

### Test 2: Click Link

1. **Click "🔗 Click Link"** button

2. **Expected**: Same success flow as above

3. **Backend logs**: `mail_link_clicked`

### Test 3: Report Suspicious Email

1. **Click "🚨 Report Suspicious Email"** button

2. **Expected**: Same success flow

3. **Backend logs**: `mail_reported_real`

---

## ✅ Verification Checklist

- [ ] Dev server running with HTTPS (https://localhost:3001)
- [ ] Certificate accepted in browser
- [ ] Manifest.xml sideloaded in Outlook
- [ ] "Security Actions" button visible in Outlook ribbon
- [ ] Task pane opens when button clicked
- [ ] User email displayed correctly (not "Loading...")
- [ ] Buttons send events successfully
- [ ] Backend logs show events received
- [ ] Dashboard shows events (http://localhost:3000)

---

## 🐛 Troubleshooting

### Problem 1: "Security Actions" button not visible

**Solution A: Check Add-in Installation**
1. In Outlook: **File** → **Manage Add-ins**
2. Look for "TISAP Mail Agent"
3. If not there, reinstall manifest.xml

**Solution B: Open an Email First**
- The add-in only appears when viewing an email
- Click on an email in your inbox
- Then look for the button

**Solution C: Restart Outlook**
```bash
# Close Outlook completely
# Restart it
# Open an email
# Look for "Security Actions" button
```

### Problem 2: Task pane is blank or not loading

**Solution A: Accept Certificate Again**
1. Open browser: https://localhost:3001/taskpane.html
2. Accept certificate warning
3. Reload add-in in Outlook

**Solution B: Clear Office Cache**
```bash
# Close Outlook
# Delete this folder:
%LOCALAPPDATA%\Microsoft\Office\16.0\Wef\

# Restart Outlook
# Reinstall add-in
```

**Solution C: Check Dev Server**
```bash
# Ensure it's running with HTTPS
npm start

# Should show: https://localhost:3001/
```

### Problem 3: "User: Loading..." doesn't change

**This is normal in browser preview**
- In Outlook, it will show your actual email
- Office.js provides the email address
- Only works when loaded in Outlook

### Problem 4: "✗ Failed: Network error"

**Solution A: Check Backend**
```bash
# Ensure FastAPI is running
cd d:/inn/Innovative/TISAP/backend
uvicorn main:app --reload --port 8000 --host 0.0.0.0

# Test it:
curl http://localhost:8000/api/events
```

**Solution B: Check CORS**
- Backend must allow requests from localhost:3001
- Should have `allow_origins=["*"]` in CORS middleware

**Solution C: Check Browser Console**
1. In Outlook, press **F12** (if available)
2. Or check browser console if testing in browser
3. Look for network errors

### Problem 5: Certificate errors persist

**Solution: Use Edge/Chrome to Accept Certificate**
1. Open Edge or Chrome
2. Go to: https://localhost:3001/taskpane.html
3. Accept the certificate
4. Outlook uses the same certificate store
5. Restart Outlook

### Problem 6: Add-in disappeared after Outlook restart

**This is normal for sideloaded add-ins**
- Sideloaded add-ins may need to be re-enabled
- Go to: **File** → **Manage Add-ins**
- Enable "TISAP Mail Agent" if disabled

---

## 📊 Expected Behavior

### When Working Correctly:

1. **Button appears** in Outlook ribbon when viewing email
2. **Task pane opens** on the right side
3. **User email** is auto-detected and displayed
4. **Buttons are clickable** and show status feedback
5. **Events are sent** to backend successfully
6. **Backend logs** confirm receipt
7. **Dashboard** shows events in "Recent Events"

### Visual Confirmation:

```
Outlook Window
├── Email List (left)
├── Email Content (center)
└── TISAP Task Pane (right) ← Should appear here
    ├── Header with 🛡️
    ├── User email
    ├── Three buttons
    └── Status message
```

---

## 🎯 Complete Test Flow

### Full Integration Test:

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

2. **Sideload in Outlook** (steps above)

3. **Open email** in Outlook

4. **Click "Security Actions"**

5. **Click "📎 Open Attachment"**

6. **Verify**:
   - ✅ Task pane: "✓ Event sent successfully!"
   - ✅ Backend logs: Event received
   - ✅ Dashboard: Event appears in "Recent Events"

---

## 📝 Quick Reference

### Commands:
```bash
# Start dev server
cd d:/inn/Innovative/TISAP/outlook-addin
npm start

# Accept certificate
# Open: https://localhost:3001/taskpane.html

# Manifest location
d:\inn\Innovative\TISAP\outlook-addin\manifest.xml
```

### URLs:
- **Add-in**: https://localhost:3001/taskpane.html
- **Backend**: http://localhost:8000
- **Dashboard**: http://localhost:3000
- **API Docs**: http://localhost:8000/docs

### Outlook Paths:
- **Add Add-in**: File → Get Add-ins → My Add-ins → Add from file
- **Manage Add-ins**: File → Manage Add-ins
- **Use Add-in**: Open email → Click "Security Actions" button

---

## 🎉 Success!

When you see:
- ✅ "Security Actions" button in Outlook
- ✅ Task pane with your email address
- ✅ "✓ Event sent successfully!" after clicking button
- ✅ Backend logs showing event received

**You're done! The Outlook Add-in is working!** 🚀

---

## 💡 Tips

1. **Keep dev server running** while testing
2. **Accept certificate** before sideloading
3. **Restart Outlook** if add-in doesn't appear
4. **Check backend logs** to verify events
5. **Use Dashboard** to see all events from all sources

---

## 🔗 Next Steps

After successful testing:
1. Test all three buttons
2. Verify events in Dashboard
3. Try with Chrome Extension and Windows Agent
4. See all events from different channels in one place

**You now have a complete security awareness platform!** 🛡️
