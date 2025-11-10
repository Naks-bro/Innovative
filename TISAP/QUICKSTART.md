# Quick Start Guide

## Installation & Setup

### 1. Install Dependencies
```bash
cd d:/inn/Innovative/TISAP
npm install
```

### 2. Verify Environment Variables
The `.env.local` file should contain:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Start the Development Server
```bash
npm run dev
```

The application will be available at **http://localhost:3000**

## First Time Usage

### Step 1: Login
1. Navigate to http://localhost:3000
2. You'll be redirected to the login page
3. Select a role:
   - **Admin**: Full organization access
   - **Manager**: Team-specific data
   - **Employee**: Personal dashboard

### Step 2: Explore Your Dashboard

#### As Admin:
- View organization-wide metrics
- Filter by department
- Assign remedial training to high-risk users
- Export reports

#### As Manager:
- View team performance
- Download CSV/PDF reports
- Monitor team members

#### As Employee:
- Check your security score
- View your event timeline
- Read security tips
- Track score history

## Key Features

### Live Data Updates
- Dashboard refreshes every 5 seconds
- Real-time security event monitoring

### Mock Data Fallback
If your FastAPI backend is not running, the app will use mock data automatically.

### Navigation
- Use the sidebar to switch between views
- Click "Logout" to change roles

## Connecting to Your FastAPI Backend

Ensure your FastAPI server is running at `http://localhost:8000` with these endpoints:

- `GET /api/data` - Dashboard metrics
- `GET /api/users` - All users list
- `GET /api/users/{id}` - Individual user data
- `POST /api/events` - Create security event
- `POST /api/assign-remedial` - Assign training

### CORS Configuration
Your FastAPI backend should allow CORS from `http://localhost:3000`:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Troubleshooting

### Port Already in Use
If port 3000 is busy, Next.js will prompt you to use another port (e.g., 3001).

### API Connection Issues
- Check that FastAPI is running on port 8000
- Verify CORS is configured correctly
- The app will fall back to mock data if API is unavailable

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm start
```

## Next Steps

1. Customize the mock data in `/lib/api.ts`
2. Connect to your actual FastAPI endpoints
3. Adjust styling in `/app/globals.css`
4. Add more security tips in `/app/employee/page.tsx`

## Support

For issues, check the main README.md or contact the development team.
