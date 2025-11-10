# 🚀 Quick Start - Outlook Desktop (Windows)

## 5-Minute Setup

### Step 1: Restart Server with HTTPS ⚡
```bash
# In your terminal, press Ctrl+C to stop current server
# Then run:
npm start
```

**Look for**: `https://localhost:3001/` (note the **https**)

---

### Step 2: Accept Certificate 🔐

**Open in browser**: https://localhost:3001/taskpane.html

**Click**: Advanced → Proceed to localhost

**See**: TISAP Mail Agent UI ✅

---

### Step 3: Sideload in Outlook 📧

**In Outlook Desktop**:

1. **File** → **Get Add-ins**
2. **My Add-ins** → **+ Add a custom add-in**
3. **Add from file...**
4. Select: `d:\inn\Innovative\TISAP\outlook-addin\manifest.xml`
5. Click **Install**

---

### Step 4: Use It! 🎯

1. **Open any email** in Outlook
2. **Look for "Security Actions"** button in ribbon
3. **Click it** → Task pane opens
4. **Click a button** → Event sent!

---

## 📊 Visual Guide

```
┌─────────────────────────────────────────────────────┐
│ Outlook Desktop                                     │
├─────────────────────────────────────────────────────┤
│ File  Home  Send/Receive  Folder  View             │
│                                                     │
│ [Security Actions] ← Click this button             │
├──────────────────────────────┬──────────────────────┤
│ Inbox                        │ Email Content        │
│                              │                      │
│ • Email 1                    │ From: sender@...     │
│ • Email 2                    │ Subject: Test        │
│ • Email 3                    │                      │
│                              │ Email body...        │
│                              │                      │
└──────────────────────────────┴──────────────────────┘
                               │
                               │ Task pane opens here
                               ▼
                    ┌──────────────────────┐
                    │ 🛡️ TISAP Mail Agent  │
                    │ Security Training    │
                    ├──────────────────────┤
                    │ User: you@email.com  │
                    ├──────────────────────┤
                    │ [📎 Open Attachment] │
                    │ [🔗 Click Link]      │
                    │ [🚨 Report Email]    │
                    │                      │
                    │ ✓ Event sent!        │
                    └──────────────────────┘
```

---

## ✅ Success Checklist

- [ ] Server shows `https://localhost:3001/`
- [ ] Browser shows TISAP UI (certificate accepted)
- [ ] Outlook shows "Security Actions" button
- [ ] Task pane opens with your email
- [ ] Button click shows "✓ Event sent successfully!"
- [ ] Backend logs show event received

---

## 🐛 Quick Fixes

### "Security Actions" button not visible?
→ **Open an email first**, then look for the button

### Task pane blank?
→ **Accept certificate** in browser first: https://localhost:3001/taskpane.html

### "Network error"?
→ **Check backend** is running on port 8000

### Add-in disappeared?
→ **File** → **Manage Add-ins** → Enable "TISAP Mail Agent"

---

## 🎯 Test Flow

```
1. npm start (with HTTPS)
   ↓
2. Accept cert in browser
   ↓
3. Sideload manifest.xml in Outlook
   ↓
4. Open email → Click "Security Actions"
   ↓
5. Click button → See success!
   ↓
6. Check backend logs → Event received ✅
   ↓
7. Check dashboard → Event displayed ✅
```

---

## 📝 Key Files

- **Manifest**: `d:\inn\Innovative\TISAP\outlook-addin\manifest.xml`
- **Dev Server**: https://localhost:3001/taskpane.html
- **Backend**: http://localhost:8000
- **Dashboard**: http://localhost:3000

---

## 🎉 That's It!

**You're ready to test the Outlook Add-in in Outlook Desktop!**

For detailed troubleshooting, see: `OUTLOOK_DESKTOP_SETUP.md`
