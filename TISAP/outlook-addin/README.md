# TISAP Mail Agent - Outlook Add-in

A Microsoft Outlook Add-in that integrates with TISAP backend to simulate email security awareness training.

## Features

- **Ribbon Button**: "Security Actions" in Outlook toolbar
- **Task Pane UI** with three simulation buttons:
  - 📎 **Open Attachment** → `mail_attachment_opened`
  - 🔗 **Click Link** → `mail_link_clicked`
  - 🚨 **Report Suspicious Email** → `mail_reported_real`
- **Auto-detects user email** from Outlook profile
- **Sends events** to FastAPI backend at `http://localhost:8000/api/events`

## Event Payload

```json
{
  "user_id": "user@company.com",
  "campaign_id": "camp-mail",
  "scenario_id": "outlook-addin",
  "channel": "mail",
  "action": "<selected_action>",
  "timestamp": "2025-11-11T00:00:00.000Z"
}
```

## Project Structure

```
outlook-addin/
├── manifest.xml              # Office Add-in manifest
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── webpack.config.js         # Webpack bundler config
├── src/
│   ├── taskpane/
│   │   ├── taskpane.html     # Task pane HTML
│   │   └── taskpane.tsx      # React app
│   └── commands/
│       ├── commands.html     # Commands HTML
│       └── commands.ts       # Commands logic
└── README.md                 # This file
```

## Prerequisites

- **Node.js 18+** installed
- **Microsoft Outlook** (Desktop or Web)
- **FastAPI backend** running at `http://localhost:8000`

## Installation

### 1. Install Dependencies

```bash
cd d:/inn/Innovative/TISAP/outlook-addin
npm install
```

### 2. Start Development Server

```bash
npm start
```

The add-in will be served at `https://localhost:3001`

**Note**: You need HTTPS for Outlook Add-ins. The dev server will use a self-signed certificate.

## Sideloading the Add-in

### For Outlook Desktop (Windows)

1. **Save the manifest**:
   - Copy `manifest.xml` to a network share or local folder

2. **Add to Outlook**:
   - Open Outlook Desktop
   - Go to **File** → **Get Add-ins** → **My Add-ins**
   - Click **Add a custom add-in** → **Add from file**
   - Browse to `manifest.xml` and select it
   - Click **Install**

3. **Use the add-in**:
   - Open any email
   - Look for **"Security Actions"** button in the ribbon
   - Click it to open the task pane

### For Outlook Web

1. **Open Outlook Web**: https://outlook.office.com

2. **Go to Settings**:
   - Click the gear icon (⚙️) → **View all Outlook settings**
   - Navigate to **General** → **Manage Add-ins**

3. **Add custom add-in**:
   - Click **+ Add from file**
   - Upload `manifest.xml`
   - Accept the warning about custom add-ins

4. **Use the add-in**:
   - Open any email
   - Click **"Security Actions"** in the toolbar
   - Task pane opens on the right

## Development

### Start Dev Server

```bash
npm start
```

### Build for Production

```bash
npm run build
```

Output will be in `dist/` folder.

### Testing

1. **Ensure backend is running**:
   ```bash
   cd d:/inn/Innovative/TISAP/backend
   uvicorn main:app --reload --port 8000 --host 0.0.0.0
   ```

2. **Open Outlook** and load the add-in

3. **Click a button** in the task pane

4. **Check backend logs**:
   ```
   [OK] Event received from user@company.com: mail_attachment_opened
        Channel: mail, Campaign: camp-mail
   ```

## Troubleshooting

### "Add-in not loading"
- Ensure dev server is running on port 3001
- Check that manifest.xml URLs point to `https://localhost:3001`
- Accept the self-signed certificate warning in browser

### "CORS error"
- Ensure FastAPI has CORS enabled for localhost
- Check backend logs for connection attempts

### "Office is undefined"
- Office.js loads from CDN, ensure internet connection
- Check browser console for script loading errors

### Certificate Issues
For production, you need a valid SSL certificate. For development:
- Accept the self-signed cert warning
- Or use a tool like `mkcert` to create trusted local certs

## HTTPS Setup (Development)

### Option 1: Accept Self-Signed Certificate
1. Navigate to `https://localhost:3001` in browser
2. Click "Advanced" → "Proceed to localhost (unsafe)"
3. Reload the add-in in Outlook

### Option 2: Use mkcert (Recommended)
```bash
# Install mkcert
choco install mkcert  # Windows

# Create local CA
mkcert -install

# Generate certificates
mkdir certs
cd certs
mkcert localhost 127.0.0.1 ::1

# Update webpack.config.js to use these certs
```

## Manifest Configuration

The `manifest.xml` defines:
- **Add-in ID**: Unique GUID
- **Display Name**: "TISAP Mail Agent"
- **Ribbon Button**: "Security Actions"
- **Permissions**: ReadWriteMailbox (to access user email)
- **Hosts**: Mailbox (Outlook)
- **URLs**: All point to `https://localhost:3001`

For production, update URLs to your hosted domain.

## Integration with TISAP

### Complete Flow

```
Outlook Add-in → Click Button
     ↓
POST /api/events → FastAPI Backend
     ↓
Store Event
     ↓
Next.js Dashboard ← GET /api/data ← Backend
     ↓
Display in Admin/Manager/Employee views
```

### Event Sources

1. **Chrome Extension** → browser events
2. **Windows Agent** → endpoint events
3. **Outlook Add-in** → mail events ✨ (NEW)

All visible in the TISAP dashboard!

## Tech Stack

- **TypeScript** - Type-safe code
- **React** - UI framework
- **Office.js** - Microsoft Office API
- **Webpack** - Module bundler
- **Webpack Dev Server** - HTTPS development server

## API Reference

### Office.js APIs Used

```typescript
// Get user email
Office.context.mailbox.userProfile.emailAddress

// Initialize add-in
Office.onReady(() => { ... })
```

### Backend API

```
POST http://localhost:8000/api/events
Content-Type: application/json

{
  "user_id": "user@company.com",
  "campaign_id": "camp-mail",
  "scenario_id": "outlook-addin",
  "channel": "mail",
  "action": "mail_attachment_opened",
  "timestamp": "2025-11-11T00:00:00.000Z"
}
```

## Production Deployment

1. **Build the add-in**:
   ```bash
   npm run build
   ```

2. **Host on HTTPS server**:
   - Upload `dist/` folder to web server
   - Ensure HTTPS is enabled

3. **Update manifest.xml**:
   - Replace all `https://localhost:3001` with your domain
   - Update `<Id>` to a new GUID

4. **Distribute**:
   - Upload to Microsoft AppSource (public)
   - Or deploy via Microsoft 365 Admin Center (organization)

## Security Notes

- Add-in runs in sandboxed iframe
- HTTPS required for all resources
- CORS must be configured on backend
- User email is read from Outlook profile (no password needed)

## Support

For issues:
- Check browser console (F12) for errors
- Check Outlook Add-in logs
- Verify backend is accessible from browser
- Test API endpoint with curl/Postman first

## License

Proprietary - Part of TISAP Security Awareness Platform
