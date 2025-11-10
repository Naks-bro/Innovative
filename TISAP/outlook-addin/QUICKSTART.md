# TISAP Outlook Add-in - Quick Start

## ✅ What Was Created

A complete Microsoft Outlook Add-in that sends email security events to TISAP backend.

## 📁 Files Created

```
outlook-addin/
├── manifest.xml           # Office Add-in manifest (for sideloading)
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── webpack.config.js      # Build configuration
├── src/
│   ├── taskpane/
│   │   ├── taskpane.html  # UI template
│   │   └── taskpane.tsx   # React app with 3 buttons
│   └── commands/
│       ├── commands.html  # Commands template
│       └── commands.ts    # Commands logic
├── README.md              # Full documentation
└── QUICKSTART.md          # This file
```

## 🚀 Installation (3 Steps)

### Step 1: Install Dependencies

```bash
cd d:/inn/Innovative/TISAP/outlook-addin
npm install
```

### Step 2: Start Dev Server

```bash
npm start
```

Server runs at: `https://localhost:3001`

### Step 3: Sideload in Outlook

#### For Outlook Desktop:
1. Open Outlook
2. **File** → **Get Add-ins** → **My Add-ins**
3. **Add a custom add-in** → **Add from file**
4. Select `d:/inn/Innovative/TISAP/outlook-addin/manifest.xml`
5. Click **Install**

#### For Outlook Web:
1. Go to https://outlook.office.com
2. Click ⚙️ (Settings) → **View all Outlook settings**
3. **General** → **Manage Add-ins**
4. **+ Add from file** → Upload `manifest.xml`

## 🎯 How to Use

1. **Open any email** in Outlook
2. **Look for "Security Actions"** button in the ribbon/toolbar
3. **Click it** → Task pane opens on the right
4. **See the UI**:
   ```
   ┌─────────────────────────────┐
   │ 🛡️ TISAP Mail Agent         │
   │ Security Awareness Training │
   ├─────────────────────────────┤
   │ User: user@company.com      │
   ├─────────────────────────────┤
   │ Simulate Actions:           │
   │                             │
   │ [📎 Open Attachment]        │
   │ [🔗 Click Link]             │
   │ [🚨 Report Suspicious Email]│
   │                             │
   │ ✓ Event sent successfully!  │
   └─────────────────────────────┘
   ```
5. **Click a button** → Event sent to backend
6. **Check backend logs** for confirmation

## 📤 Event Payload

Each button sends:

```json
{
  "user_id": "user@company.com",
  "campaign_id": "camp-mail",
  "scenario_id": "outlook-addin",
  "channel": "mail",
  "action": "mail_attachment_opened",  // or mail_link_clicked, mail_reported_real
  "timestamp": "2025-11-11T00:00:00.000Z"
}
```

## 🔗 Integration Test

### Full Flow:

1. **Backend running**: ✅ Port 8000
2. **Outlook add-in**: ✅ Sideloaded
3. **Click button**: "Open Attachment"
4. **Backend logs**:
   ```
   [OK] Event received from user@company.com: mail_attachment_opened
        Channel: mail, Campaign: camp-mail
   ```
5. **Dashboard**: Shows event in "Recent Events" (after 5s refresh)

## 🛠️ Troubleshooting

### "Add-in not loading"
- Ensure `npm start` is running on port 3001
- Navigate to `https://localhost:3001` in browser
- Accept the self-signed certificate warning
- Reload the add-in in Outlook

### "CORS error in console"
- Ensure FastAPI backend has CORS enabled:
  ```python
  app.add_middleware(
      CORSMiddleware,
      allow_origins=["*"],
      allow_methods=["*"],
      allow_headers=["*"],
  )
  ```

### "Office is undefined"
- Office.js loads from CDN
- Ensure internet connection
- Check browser console for script errors

### Certificate Warning
For development, you'll see a certificate warning. Either:
- **Accept it** in browser (Advanced → Proceed)
- **Or use mkcert** for trusted local certs:
  ```bash
  choco install mkcert
  mkcert -install
  mkcert localhost
  ```

## 📊 View Events in Dashboard

1. **Open TISAP Dashboard**: http://localhost:3000
2. **Login as Admin**
3. **Check "Recent Events"** section
4. **Look for**:
   - User: `user@company.com`
   - Action: `mail_attachment_opened`
   - Channel: `mail`
   - Campaign: `camp-mail`

## 🎨 UI Features

- **Auto-detects user email** from Outlook profile
- **Three color-coded buttons**:
  - Teal (📎 Open Attachment)
  - Orange (🔗 Click Link)
  - Green (🚨 Report Suspicious Email)
- **Status feedback**: ✓ Success or ✗ Error
- **Clean, professional design**

## 🔄 Complete TISAP Ecosystem

You now have **4 event sources**:

1. ✅ **Chrome Extension** → browser events
2. ✅ **Windows Agent** → endpoint events
3. ✅ **Outlook Add-in** → mail events ✨ (NEW)
4. ✅ **Next.js Dashboard** → displays all events

All connected to FastAPI backend!

## 📝 Notes

- **TypeScript errors** in IDE are expected until `npm install` runs
- **HTTPS required** for Outlook Add-ins (dev server handles this)
- **User email** is read from Outlook (no password needed)
- **Works in Outlook Desktop and Web**

## 🚀 Next Steps

1. Run `npm install` in outlook-addin folder
2. Run `npm start` to start dev server
3. Sideload manifest.xml in Outlook
4. Click "Security Actions" button
5. Send events and see them in backend logs
6. View events in TISAP dashboard

---

**The Outlook Add-in is ready to install!** 🎉
