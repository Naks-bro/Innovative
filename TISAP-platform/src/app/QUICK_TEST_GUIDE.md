# 🧪 QUICK TESTING GUIDE

## ✅ **TEST 1: Role Routing Bug Fix**

### **Steps:**
1. **Open the app** (should see landing page)
2. **Click "Get Started"** button
3. **Click "Quick Login (Employee)"** button
4. ✅ Employee dashboard loads
5. **Click "Labs"** in the navigation
6. **Click on any lab** (Windows/Browser/Email)
7. ✅ Lab simulation starts
8. **In the lab**, click around but DON'T complete it
9. **Click "Logout"** button (top-right)
10. ✅ Returns to landing page
11. **Click "Get Started"** again
12. **Click "Quick Login (Admin)"** button
13. ✅ **EXPECTED:** Admin dashboard loads (NOT the lab!)
14. ✅ **VERIFY:** No employee elements visible
15. ✅ **VERIFY:** Admin analytics and controls showing

### **What to Check:**
- ✅ Admin dashboard shows admin panels
- ✅ NO lab simulation visible
- ✅ NO employee components
- ✅ Analytics charts visible
- ✅ System controls accessible
- ✅ "Admin" label visible in header

---

## ✅ **TEST 2: HR Dashboard Interactive Buttons**

### **Steps:**
1. **From landing page**, click "Get Started"
2. **Click "Quick Login (HR)"** button
3. ✅ HR dashboard loads
4. **Scroll down** to "Upcoming Training Sessions" section
5. ✅ See 3 training sessions with buttons

### **Test ENROLL Button:**
1. **Find a session** with status "open"
2. **Note the enrolled count** (e.g., "45/50")
3. **Click "Enroll"** button
4. ✅ Count increases (45 → 46)
5. ✅ Progress bar updates
6. ✅ Toast notification appears
7. **Click "Enroll" multiple times** until full
8. ✅ Button disappears when capacity reached
9. ✅ Badge changes to "full" (red)

### **Test DUPLICATE Button:**
1. **Click "Duplicate"** on any session
2. ✅ New session appears at bottom of list
3. ✅ Title has "(Copy)" suffix
4. ✅ Enrolled count is 0/[capacity]
5. ✅ Status badge is "open" (green)
6. ✅ Toast shows: "Training session duplicated: [name] (Copy)"

### **Test EDIT Button:**
1. **Click "Edit"** on any session
2. ✅ Dialog opens
3. ✅ Title field pre-filled with session title
4. ✅ Date field pre-filled with session date
5. ✅ Capacity field pre-filled with capacity number
6. ✅ Can modify fields
7. ✅ "Schedule Session" button available
8. ✅ Toast shows: "Editing training session"

### **Test DELETE Button:**
1. **Click "Delete"** on any session
2. ✅ Session disappears immediately
3. ✅ Toast shows: "Training session deleted: [name]"
4. ✅ Other sessions remain intact
5. ✅ List re-renders smoothly

---

## ✅ **TEST 3: Video Modal on Landing Page**

### **Steps:**
1. **Go to landing page** (logout if needed)
2. **Scroll down** past the hero section
3. **Pass the stats section** (98%, 500K+, etc.)
4. ✅ See "See TISAP Labs in Action" section
5. ✅ See video thumbnail with play button

### **Test Video Opening:**
1. **Click the video thumbnail** (big play button)
2. ✅ Modal opens instantly
3. ✅ Background turns black with blur
4. ✅ Video loads in center (medium size, not fullscreen)
5. ✅ Scrolling is disabled (try to scroll)
6. ✅ X button visible in top-right
7. ✅ Video controls appear

### **Test ESC Key:**
1. **With modal open**, press **ESC** key
2. ✅ Modal closes immediately
3. ✅ Landing page visible again
4. ✅ Scrolling re-enabled

### **Test X Button:**
1. **Click video thumbnail** again to open
2. **Hover over X button** in top-right
3. ✅ Tooltip shows "Press ESC"
4. **Click X button**
5. ✅ Modal closes
6. ✅ Smooth transition

### **Test Click Outside:**
1. **Open video modal** again
2. **Click on the dark area** outside the video
3. ✅ Modal closes
4. ✅ Landing page appears

### **Test Video Playback:**
1. **Open modal**
2. **Wait for video to load**
3. ✅ HeyGen video player appears
4. ✅ Video is responsive (resizes with window)
5. ✅ No lag or stuttering
6. ✅ Video controls work (play/pause)

---

## ✅ **TEST 4: Multiple Role Switches**

### **Steps:**
1. **Login as Employee**
2. **Start Windows Lab**
3. **Logout**
4. **Login as Admin**
5. ✅ Admin dashboard (NOT lab)
6. **Logout**
7. **Login as HR**
8. ✅ HR dashboard (NOT admin or lab)
9. **Create a training session**
10. **Logout**
11. **Login as Employee**
12. ✅ Employee dashboard (NOT HR or training)

### **What to Verify:**
- ✅ Each role shows correct dashboard
- ✅ No state from previous sessions
- ✅ No UI elements from other roles
- ✅ Clean state every time
- ✅ Toast notifications work each time

---

## ✅ **TEST 5: Lab Completion Flow**

### **Steps:**
1. **Login as Employee**
2. **Go to Labs**
3. **Complete any lab** (e.g., Browser Simulation)
4. ✅ Results screen shows
5. ✅ Confetti animation plays
6. ✅ Points awarded
7. **Click "Continue"** on results
8. ✅ Back to dashboard
9. **Logout**
10. **Login as Admin**
11. ✅ Admin dashboard shows (NOT results screen)
12. ✅ No confetti animation
13. ✅ Clean admin view

---

## 🎯 **Expected Results Summary**

### **✅ Role Routing:**
- Login resets all state
- Logout resets all state
- No state leakage between roles
- Each role sees correct dashboard

### **✅ HR Dashboard:**
- Enroll button adds users
- Delete button removes sessions
- Duplicate button creates copies
- Edit button pre-fills dialog
- All buttons show toast notifications

### **✅ Video Modal:**
- Opens on click
- Medium size (max-w-4xl)
- Background blurs
- Scroll locks
- ESC closes
- X button closes
- Click outside closes
- No performance issues

### **✅ Performance:**
- No console errors
- No lag or stutter
- Smooth animations
- Fast state updates
- Responsive UI

---

## 🐛 **What to Report if Something Fails**

If you find an issue, please report:
1. **Which test** failed (Test 1, 2, 3, 4, or 5)
2. **Exact step** where it failed
3. **What you expected** to happen
4. **What actually happened**
5. **Any console errors** (open DevTools → Console)
6. **Screenshots** if possible

---

## ✨ **Quick Check - 30 Seconds**

Fastest way to verify everything works:

1. **Login as Employee** → Click a lab → **Logout**
2. **Login as Admin** → ✅ Should see Admin dashboard (NOT lab)
3. **Logout** → **Login as HR** → ✅ Should see HR dashboard
4. **Scroll to training sessions** → Click **Delete** → ✅ Session disappears
5. **Go to landing page** → Scroll down → Click **video thumbnail**
6. ✅ Video modal opens → Press **ESC** → ✅ Modal closes

**If all 6 checks pass, everything is working perfectly!** 🎉

---

## 📊 **Feature Status**

| Feature | Status | Test |
|---------|--------|------|
| Role Routing Fix | ✅ Complete | Test 1 |
| State Reset on Login | ✅ Complete | Test 1, 4 |
| State Reset on Logout | ✅ Complete | Test 1, 4 |
| HR Enroll Button | ✅ Complete | Test 2 |
| HR Delete Button | ✅ Complete | Test 2 |
| HR Duplicate Button | ✅ Complete | Test 2 |
| HR Edit Button | ✅ Complete | Test 2 |
| Video Modal | ✅ Complete | Test 3 |
| Video ESC Close | ✅ Complete | Test 3 |
| Video X Close | ✅ Complete | Test 3 |
| Video Click Outside | ✅ Complete | Test 3 |
| Lab State Isolation | ✅ Complete | Test 5 |
| Multi-Role Switch | ✅ Complete | Test 4 |

**Total: 13/13 Features Complete** ✅

---

## 🚀 **Ready to Test!**

All features implemented and ready for testing. Start with the **Quick Check** above, then run full tests if needed.
