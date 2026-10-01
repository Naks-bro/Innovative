# 🧪 TISAP Labs - Interactive Testing Guide

## How to Test the Fully Interactive Platform

Follow this guide to explore and verify all the new interactive features.

---

## 🚀 Getting Started

1. **Start the application**
2. **You'll see the Landing Page** - Notice the new, professional design

---

## 📋 Landing Page Tests

### Visual Checks:
- [ ] Page has subtle grid background (not floating orbs)
- [ ] Hero section shows animated dashboard preview with:
  - [ ] Pulsing stat cards
  - [ ] Animated progress bars
  - [ ] Floating success badge
- [ ] Stats section shows 98%, 500K+, 85%, 24/7
- [ ] Feature cards have hover effects (lift up slightly)
- [ ] "How It Works" section has 3 steps
- [ ] Footer is clean and professional

### Interactive Tests:
1. **Click "Get Started"** → Should go to Login page
2. **Hover over feature cards** → Should lift up slightly
3. **Scroll down** → Animations should trigger on sections coming into view

---

## 🔐 Login Page Tests

### Role Selection:
1. **Click on each role card** (Admin, HR, Employee)
   - [ ] Card should highlight with colored border
   - [ ] Checkmark appears
   - [ ] Border glows in role color (purple/blue/cyan)

### Quick Demo Login:
1. **Click "Admin" quick login button**
   - [ ] Loading toast appears
   - [ ] Redirects to Admin Dashboard after 1 second
2. **Logout and test "HR" button**
   - [ ] Same behavior, goes to HR Dashboard
3. **Logout and test "Employee" button**
   - [ ] Goes to Employee Dashboard

### Form Validation:
1. **Click "Sign In" without selecting role**
   - [ ] Error toast: "Please select a role first"
   - [ ] Yellow warning box appears
2. **Select a role, leave email empty, click Sign In**
   - [ ] Error toast: "Please enter your email"
3. **Select role, enter email, click Sign In**
   - [ ] Loading spinner appears
   - [ ] Success toast
   - [ ] Redirects to appropriate dashboard

### SSO Tests:
1. **Click SSO button without role**
   - [ ] Error: "Please select a role first"
2. **Select role, click Google SSO**
   - [ ] Success toast with provider name
   - [ ] Logs in after 1.5 seconds

---

## 🔴 Admin Dashboard - Full Interactive Test

### Initial Load:
- [ ] Purple theme throughout
- [ ] 4 metric cards at top
- [ ] 3 simulations shown
- [ ] Recent alerts on right side
- [ ] Charts display data
- [ ] System status section visible

### Metric Cards (Click Each):
1. **Click "Active Threats" card**
   - [ ] Filters alerts to show only active ones
2. **Click "Users Monitored" card**
   - [ ] Opens user management modal
3. **Other cards** are clickable (visual feedback)

### Campaign Management:
1. **Click "New Campaign" button**
   - [ ] Modal opens with form
   - [ ] Fields: Name, Type, Targets, Description
2. **Try to submit empty form**
   - [ ] Error toast: "Please fill in all required fields"
3. **Fill in the form:**
   - Name: "Test Phishing Campaign"
   - Type: Select "Email Phishing"
   - Targets: "100"
   - Description: "Testing new campaign"
4. **Click "Launch Campaign"**
   - [ ] Success toast: "Campaign created: Test Phishing Campaign"
   - [ ] Modal closes
   - [ ] New campaign appears at top of list
   - [ ] Status shows "running" with green badge

5. **Click on a campaign card**
   - [ ] Campaign detail modal opens
   - [ ] Shows name, type, status
   - [ ] Shows metrics (targets, clicks, reports)
   - [ ] Progress bar visible

6. **Click Pause button on running campaign**
   - [ ] Status changes to "paused" with yellow badge
   - [ ] Success toast confirms
   - [ ] Icon changes from Pause to Play

7. **Click Play button on paused campaign**
   - [ ] Status changes back to "running"
   - [ ] Success toast confirms

8. **Click Delete button (trash icon)**
   - [ ] Campaign removed from list
   - [ ] Success toast: "Campaign deleted: [name]"

### Alert Management:
1. **Type in search box** (e.g., "phishing")
   - [ ] Results filter in real-time as you type
   - [ ] Only matching alerts shown

2. **Click filter dropdown**
   - [ ] Options: All, Active, Resolved
   - [ ] Select "Active"
   - [ ] Only active alerts shown

3. **Click on an alert card**
   - [ ] Detail modal opens
   - [ ] Shows title, target, severity, time
   - [ ] Resolve button visible

4. **Click "Resolve" in modal**
   - [ ] Success toast
   - [ ] Alert status updates to "resolved"
   - [ ] Badge color changes to green

5. **Click "Resolve" button on alert card directly**
   - [ ] Alert status updates without opening modal

### System Status:
1. **Click on each system item**
   - [ ] Status toggles between operational/degraded/down
   - [ ] Icon changes (CheckCircle/AlertCircle/XCircle)
   - [ ] Color changes (green/yellow/red)

### Quick Actions:
1. **Click "Run Security Scan"**
   - [ ] Loading toast appears
   - [ ] Success toast after 2 seconds: "Security scan completed!"

2. **Click "Generate Report"**
   - [ ] Loading toast
   - [ ] Success toast: "Report exported successfully!"

3. **Click "Configure Alerts"**
   - [ ] Modal opens
   - [ ] Shows threshold and email inputs

4. **Click "Manage Users"**
   - [ ] User management modal opens
   - [ ] Shows total user count

### Top Bar:
1. **Click timeframe buttons** (24h, 7d, 30d, 90d)
   - [ ] Selected button highlights in purple
   - [ ] Visual feedback

2. **Click "Refresh" button**
   - [ ] Loading toast
   - [ ] Success toast: "Data updated!"

3. **Click "Export Report" (top right)**
   - [ ] Loading toast
   - [ ] Success toast

---

## 🔵 HR Dashboard - Full Interactive Test

### Initial Load:
- [ ] Blue theme throughout
- [ ] 4 metric cards at top
- [ ] Department performance chart
- [ ] Top performers list
- [ ] At-risk employees section
- [ ] Training sessions list

### Metric Cards (Click Each):
1. **Click "At Risk" card**
   - [ ] Opens reminder dialog
   - [ ] Shows count of at-risk employees

### Department Filter:
1. **Click "Sales" in filter panel**
   - [ ] All sections update to show only Sales data
   - [ ] Chart updates
   - [ ] Employee lists filtered
   - [ ] Employee count shown on button

2. **Click "Engineering"**
   - [ ] Data updates to Engineering only

3. **Click "All"**
   - [ ] Shows all departments again

### Employee Management:
1. **Type in search box** (e.g., "Sarah")
   - [ ] Top performers filter as you type
   - [ ] Real-time search results

2. **Click on any top performer card**
   - [ ] Employee profile modal opens
   - [ ] Shows name, avatar, department, score, modules
   - [ ] Shows trend indicator (up/down arrow)
   - [ ] "Assign Training" and "Contact" buttons visible

3. **Click "Assign Training" in modal**
   - [ ] Success toast: "Training assigned to [name]"
   - [ ] Modal closes

4. **Click "Contact" in modal**
   - [ ] Success toast: "Email sent to [name]"

5. **Click BookOpen icon** on employee card (without opening modal)
   - [ ] Direct assignment toast

### At-Risk Employees:
1. **Click on at-risk employee card**
   - [ ] Employee profile modal opens
   - [ ] Shows all details including issues count

2. **Click "Send Reminder" button**
   - [ ] Reminder dialog opens
   - [ ] Shows count of recipients
   - [ ] Email template editable

3. **Edit email template and click "Send Reminders"**
   - [ ] Loading toast
   - [ ] Success toast: "Reminders sent to [X] employees"
   - [ ] Modal closes

### Training Session Management:
1. **Click "Schedule New" button**
   - [ ] Training session modal opens
   - [ ] Fields: Title, Date, Capacity, Description

2. **Fill in form:**
   - Title: "Ransomware Prevention"
   - Date: Select a future date
   - Capacity: "50"
   - Description: "Advanced training"

3. **Click "Schedule Session"**
   - [ ] Success toast: "Training session created: Ransomware Prevention"
   - [ ] New session appears in list
   - [ ] Status shows "open" with green badge

4. **Click "Enroll" on an open session**
   - [ ] Enrollment count increases by 1
   - [ ] Progress bar updates
   - [ ] Success toast: "User enrolled successfully"

5. **Keep enrolling until capacity reached**
   - [ ] Status changes to "full" with red badge
   - [ ] "Enroll" button disappears

### Communication:
1. **Click "Send Announcement" (top right)**
   - [ ] Announcement composer opens
   - [ ] Subject, Department dropdown, Message fields visible

2. **Fill in announcement and click "Send to All"**
   - [ ] Loading toast
   - [ ] Success toast: "Announcement sent to all employees"

### Reports:
1. **Click "Export Data" (top right)**
   - [ ] Loading toast
   - [ ] Report modal opens after 1.5 seconds
   - [ ] Shows summary of data included
   - [ ] "Download PDF" and "Download Excel" buttons

2. **Click "Download PDF"**
   - [ ] Button clickable (would trigger download in real app)

### Timeframe Selection:
1. **Click timeframe buttons** (Week, Month, Quarter)
   - [ ] Selected button highlights in blue
   - [ ] Data context changes

---

## 👤 Employee Dashboard

**This was preserved and already has full interactivity:**
- [ ] Can navigate between Dashboard, Labs, Leaderboard, Badges, Progress
- [ ] Can launch labs
- [ ] See points, streak, badges
- [ ] Interactive elements work as before

---

## 🚪 Logout Test

### From Any Dashboard:
1. **Click the red "Logout" button** (top right, next to notifications)
   - [ ] Button is clearly labeled "Logout" with logout icon
   - [ ] Red color (#ef4444) makes it obvious
   - [ ] Toast: "Logged out successfully"
   - [ ] Redirects to landing page
   - [ ] All state cleared

---

## 🎯 Cross-Role Navigation Flow

### Complete Flow Test:
1. **Landing Page** → Click Get Started
2. **Login Page** → Quick login as Admin
3. **Admin Dashboard** → Do some actions (create campaign, resolve alert)
4. **Click Logout**
5. **Landing Page** → Click Get Started again
6. **Login Page** → Quick login as HR
7. **HR Dashboard** → Do some actions (filter department, view employee)
8. **Click Logout**
9. **Landing Page** → Click Get Started again
10. **Login Page** → Quick login as Employee
11. **Employee Dashboard** → Navigate around
12. **Click Logout**
13. **Back to Landing Page**

---

## 🔍 Visual Polish Tests

### Animations:
- [ ] Cards scale on hover (1.02x)
- [ ] Buttons scale on click (0.98x)
- [ ] Modals fade in/out smoothly
- [ ] Toasts slide in from top-right
- [ ] Progress bars animate on load
- [ ] Charts animate when visible

### Responsive Design:
1. **Resize browser window**
   - [ ] At 1024px: 3-column grid → 2-column
   - [ ] At 768px: 2-column → 1-column
   - [ ] Navigation adapts
   - [ ] Charts remain readable

### Theme Consistency:
- [ ] Admin dashboard is purple (#a855f7)
- [ ] HR dashboard is blue (#3b82f6)
- [ ] Employee dashboard is cyan (#06b6d4)
- [ ] Role badge in nav bar matches theme
- [ ] All buttons match role color

---

## ✅ Acceptance Criteria

All features should:
- ✅ Provide immediate visual feedback
- ✅ Show loading states when processing
- ✅ Display success/error toasts
- ✅ Update state in real-time
- ✅ Validate form inputs
- ✅ Work smoothly without lag
- ✅ Be keyboard accessible
- ✅ Have smooth animations
- ✅ Look professional (not like AI demo)
- ✅ Feel like a real product

---

## 🐛 Known Behaviors (Expected)

These are intentional design choices:
- Employee dashboard preserved exactly (no changes)
- Charts show mock data (would connect to API in production)
- SSO buttons simulate login (would integrate real OAuth)
- Downloads show toast only (would generate real files)
- Email sends show toast only (would send real emails)
- All data resets on page refresh (would persist in database)

---

## 📊 Success Metrics

If all tests pass, you should be able to:
- ✅ Create and manage campaigns/training sessions
- ✅ Filter and search data in real-time
- ✅ View detailed information in modals
- ✅ Perform actions with immediate feedback
- ✅ Switch between roles seamlessly
- ✅ Navigate the entire platform intuitively
- ✅ Feel like using a real, production application

---

## 🎉 Conclusion

This is **not a static demo** anymore. Every button does something, every form submits, every search filters, every click responds. The platform feels **alive and interactive** like a real SaaS product! 🚀

**Test away and enjoy the fully functional TISAP Labs platform!** ✨
