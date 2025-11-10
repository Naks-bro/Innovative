# TISAP - Cyber Security Awareness Platform

A full-stack application for visualizing employee cyber-security awareness and risk scores collected from browser, Windows, and email integrations.

## Features

### Role-Based Dashboards

#### Admin Dashboard
- View organization-wide metrics (average score, total events, high-risk users)
- Filter by department or campaign
- Assign remedial training to high-risk users
- View department security scores and risk distribution charts
- Monitor recent security events

#### Manager Dashboard
- View team-specific data only
- Download CSV or PDF summary reports
- Track team member performance
- Compare department metrics

#### Employee Dashboard
- View personal risk score and timeline
- See score history chart
- Receive security tips and best practices
- Understand how actions affect security score
- View personal event timeline

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Shadcn UI design system
- **Charts**: Recharts
- **Icons**: Lucide React
- **Backend API**: FastAPI (running at http://localhost:8000)

## Project Structure

```
TISAP/
├── app/
│   ├── admin/          # Admin dashboard page
│   ├── manager/        # Manager dashboard page
│   ├── employee/       # Employee dashboard page
│   ├── dashboard/      # Smart router based on role
│   ├── login/          # Role selection page
│   ├── layout.tsx      # Root layout with AuthProvider
│   ├── page.tsx        # Home page (redirects)
│   └── globals.css     # Global styles
├── components/
│   ├── ScoreCard.tsx       # Security score display
│   ├── RiskChart.tsx       # Bar and pie charts
│   ├── EventTimeline.tsx   # Chronological event list
│   ├── RemedialModal.tsx   # Training assignment modal
│   ├── Sidebar.tsx         # Navigation sidebar
│   └── Header.tsx          # Page header
├── context/
│   └── AuthContext.tsx     # Authentication state management
├── lib/
│   ├── api.ts          # API client functions
│   └── utils.ts        # Utility functions
├── .env.local          # Environment variables
├── package.json        # Dependencies
└── README.md          # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- FastAPI backend running at http://localhost:8000

### Installation

1. Navigate to the project directory:
```bash
cd TISAP
```

2. Install dependencies:
```bash
npm install
```

3. Ensure `.env.local` is configured:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Usage

### Login
1. Navigate to `/login`
2. Select your role (Admin, Manager, or Employee)
3. Click "Continue" to access your dashboard

### Navigation
- Use the sidebar to navigate between different views
- The dashboard automatically routes based on your role
- Click "Logout" to return to the login screen

## API Integration

The application connects to a FastAPI backend with the following endpoints:

- `GET /api/data` - Fetch dashboard data
- `GET /api/users` - Fetch all users (admin only)
- `GET /api/users/:id` - Fetch specific user data
- `POST /api/events` - Create new security event
- `POST /api/assign-remedial` - Assign remedial training

### Mock Data Fallback
If the API is unavailable, the application uses mock data to demonstrate functionality.

## Features in Detail

### Live Updates
- Data automatically refreshes every 5 seconds
- Real-time monitoring of security events
- Dynamic score updates

### Data Visualization
- Bar charts for department comparisons
- Pie charts for risk distribution
- Line charts for score history
- Color-coded risk indicators

### Security Tips
- Context-aware security recommendations
- Impact explanations for user actions
- Best practice guidelines

### Export Functionality
- CSV export for team data (Manager)
- PDF report generation (Manager)
- Comprehensive data summaries

## Design System

### Colors
- **Primary**: Steel Blue (#0284c7)
- **Secondary**: Teal (#0d9488)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Danger**: Red (#ef4444)

### Typography
- Font: Inter (Google Fonts)
- Responsive sizing
- Clear hierarchy

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. Create components in `/components`
2. Add API functions in `/lib/api.ts`
3. Create pages in `/app`
4. Update types as needed

## License

Proprietary - All rights reserved

## Support

For issues or questions, contact the development team.
