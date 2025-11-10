'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { ScoreCard } from '@/components/ScoreCard';
import { RiskChart } from '@/components/RiskChart';
import { EventTimeline } from '@/components/EventTimeline';
import { RemedialModal } from '@/components/RemedialModal';
import { api, DashboardData, User } from '@/lib/api';
import { AlertTriangle, Download } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const { role, isAuthenticated } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (!isAuthenticated || role !== 'admin') {
      router.push('/login');
      return;
    }

    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [isAuthenticated, role, router]);

  const fetchData = async () => {
    try {
      const [dashboardData, allUsers] = await Promise.all([
        api.getDashboardData(),
        api.getAllUsers(),
      ]);
      setData(dashboardData);
      setUsers(allUsers);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handleAssignTraining = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const filteredUsers = filter === 'all' 
    ? users 
    : users.filter(u => u.department === filter);

  const highRiskUsers = filteredUsers.filter(u => u.riskScore < 60);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1">
        <Header 
          title="Admin Dashboard" 
          subtitle="Organization-wide security metrics and management"
        />
        
        <div className="p-8">
          {/* Filter Controls */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Filter by Department:</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
            <button className="flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90">
              <Download className="h-4 w-4" />
              Export Report
            </button>
          </div>

          {/* Key Metrics */}
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <ScoreCard
              title="Average Security Score"
              score={data.avgScore}
              subtitle="Across all employees"
            />
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-sm font-medium text-muted-foreground">Total Events</h3>
              <div className="mt-4 text-4xl font-bold text-foreground">{data.totalEvents}</div>
              <p className="mt-2 text-xs text-muted-foreground">Last 30 days</p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-sm font-medium text-muted-foreground">High Risk Users</h3>
              <div className="mt-4 flex items-center gap-2">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div className="text-4xl font-bold text-red-600">{data.highRiskUsers}</div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Require immediate attention</p>
            </div>
          </div>

          {/* Charts */}
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <RiskChart
              type="bar"
              data={data.departmentScores}
              title="Department Security Scores"
            />
            <RiskChart
              type="pie"
              data={data.riskDistribution}
              title="Risk Level Distribution"
            />
          </div>

          {/* High Risk Users Table */}
          <div className="mb-8 rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">High Risk Users</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Department</th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Risk Score</th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {highRiskUsers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-4 text-center text-sm text-muted-foreground">
                        No high-risk users found
                      </td>
                    </tr>
                  ) : (
                    highRiskUsers.map((user) => (
                      <tr key={user.id} className="border-b last:border-0">
                        <td className="py-3 text-sm font-medium">{user.name}</td>
                        <td className="py-3 text-sm text-muted-foreground">{user.department}</td>
                        <td className="py-3">
                          <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                            {user.riskScore}
                          </span>
                        </td>
                        <td className="py-3">
                          <button
                            onClick={() => handleAssignTraining(user)}
                            className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                          >
                            Assign Training
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Events */}
          <EventTimeline events={data.recentEvents} />
        </div>
      </div>

      {selectedUser && (
        <RemedialModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
          userId={selectedUser.id}
          userName={selectedUser.name}
        />
      )}
    </div>
  );
}
