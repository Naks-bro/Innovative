const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  department?: string;
  riskScore: number;
  team?: string;
}

export interface Event {
  id: string;
  userId: string;
  timestamp: string;
  type: 'browser' | 'windows' | 'email';
  action: string;
  riskLevel: 'low' | 'medium' | 'high';
  description: string;
}

export interface DashboardData {
  avgScore: number;
  totalEvents: number;
  highRiskUsers: number;
  departmentScores: { department: string; score: number }[];
  riskDistribution: { level: string; count: number }[];
  recentEvents: Event[];
}

export interface UserData {
  user: User;
  events: Event[];
  scoreHistory: { date: string; score: number }[];
}

export const api = {
  // Get dashboard data
  async getDashboardData(): Promise<DashboardData> {
    try {
      const response = await fetch(`${API_URL}/api/data`);
      if (!response.ok) throw new Error('Failed to fetch dashboard data');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      // Return mock data if API fails
      return {
        avgScore: 75,
        totalEvents: 1234,
        highRiskUsers: 12,
        departmentScores: [
          { department: 'Engineering', score: 82 },
          { department: 'Sales', score: 68 },
          { department: 'HR', score: 79 },
          { department: 'Finance', score: 85 },
        ],
        riskDistribution: [
          { level: 'Low', count: 45 },
          { level: 'Medium', count: 32 },
          { level: 'High', count: 12 },
        ],
        recentEvents: [],
      };
    }
  },

  // Get user-specific data
  async getUserData(userId: string): Promise<UserData> {
    try {
      const response = await fetch(`${API_URL}/api/users/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch user data');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      // Return mock data if API fails
      return {
        user: {
          id: userId,
          name: 'John Doe',
          email: 'john.doe@company.com',
          role: 'employee',
          department: 'Engineering',
          riskScore: 78,
        },
        events: [
          {
            id: '1',
            userId,
            timestamp: new Date().toISOString(),
            type: 'email',
            action: 'Clicked suspicious link',
            riskLevel: 'high',
            description: 'Clicked on a phishing email link',
          },
        ],
        scoreHistory: [
          { date: '2024-01-01', score: 85 },
          { date: '2024-01-08', score: 82 },
          { date: '2024-01-15', score: 78 },
        ],
      };
    }
  },

  // Post new event
  async postEvent(event: Omit<Event, 'id'>): Promise<Event> {
    try {
      const response = await fetch(`${API_URL}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
      if (!response.ok) throw new Error('Failed to post event');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Assign remedial training
  async assignRemedial(userId: string, trainingType: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/api/assign-remedial`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, trainingType }),
      });
      if (!response.ok) throw new Error('Failed to assign remedial training');
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Get all users (for admin)
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await fetch(`${API_URL}/api/users`);
      if (!response.ok) throw new Error('Failed to fetch users');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      // Return mock data if API fails
      return [
        {
          id: '1',
          name: 'Alice Johnson',
          email: 'alice@company.com',
          role: 'employee',
          department: 'Engineering',
          riskScore: 92,
        },
        {
          id: '2',
          name: 'Bob Smith',
          email: 'bob@company.com',
          role: 'employee',
          department: 'Sales',
          riskScore: 45,
        },
        {
          id: '3',
          name: 'Carol White',
          email: 'carol@company.com',
          role: 'employee',
          department: 'HR',
          riskScore: 78,
        },
      ];
    }
  },
};
