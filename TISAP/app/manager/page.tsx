'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { ScoreCard } from '@/components/ScoreCard';
import { RiskChart } from '@/components/RiskChart';
import { EventTimeline } from '@/components/EventTimeline';
import { api, DashboardData, User } from '@/lib/api';
import { Download, FileText } from 'lucide-react';

export default function ManagerPage() {
  const router = useRouter();
  const { role, isAuthenticated } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [teamMembers, setTeamMembers] = useState<User[]>([]);

  useEffect(() => {
    if (!isAuthenticated || role !== 'manager') {
      router.push('/login');
      return;
    }

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [isAuthenticated, role, router]);

  const fetchData = async () => {
    try {
      const [dashboardData, allUsers] = await Promise.all([
        api.getDashboardData(),
        api.getAllUsers(),
      ]);
      setData(dashboardData);
      // Filter to show only team members (mock: filter by department)
      setTeamMembers(allUsers.filter(u => u.department === 'Engineering'));
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handleDownloadCSV = () => {
    // Mock CSV download
    const csv = 'Name,Department,Risk Score\n' + 
      teamMembers.map(u => `${u.name},${u.department},${u.riskScore}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'team-security-report.csv';
    a.click();
  };

  const handleDownloadPDF = () => {
    alert('PDF download functionality would be implemented here');
  };

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const teamAvgScore = Math.round(
    teamMembers.reduce((sum, u) => sum + u.riskScore, 0) / teamMembers.length || 0
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1">
        <Header 
          title="Manager Dashboard" 
          subtitle="Team-specific security metrics"
        />
        
        <div className="p-8">
          {/* Download Controls */}
          <div className="mb-6 flex justify-end gap-3">
            <button 
              onClick={handleDownloadCSV}
              className="flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
            >
              <Download className="h-4 w-4" />
              Download CSV
            </button>
            <button 
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90"
            >
              <FileText className="h-4 w-4" />
              Download PDF
            </button>
          </div>

          {/* Team Metrics */}
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <ScoreCard
              title="Team Average Score"
              score={teamAvgScore}
              subtitle="Engineering Department"
            />
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-sm font-medium text-muted-foreground">Team Members</h3>
              <div className="mt-4 text-4xl font-bold text-foreground">{teamMembers.length}</div>
              <p className="mt-2 text-xs text-muted-foreground">Active employees</p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-sm font-medium text-muted-foreground">At Risk</h3>
              <div className="mt-4 text-4xl font-bold text-yellow-600">
                {teamMembers.filter(u => u.riskScore < 70).length}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Need attention</p>
            </div>
          </div>

          {/* Charts */}
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <RiskChart
              type="bar"
              data={data.departmentScores}
              title="Department Comparison"
            />
            <RiskChart
              type="pie"
              data={data.riskDistribution}
              title="Team Risk Distribution"
            />
          </div>

          {/* Team Members Table */}
          <div className="mb-8 rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Team Members</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Email</th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Risk Score</th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((user) => (
                    <tr key={user.id} className="border-b last:border-0">
                      <td className="py-3 text-sm font-medium">{user.name}</td>
                      <td className="py-3 text-sm text-muted-foreground">{user.email}</td>
                      <td className="py-3">
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                          user.riskScore >= 80 
                            ? 'bg-green-100 text-green-800'
                            : user.riskScore >= 60
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.riskScore}
                        </span>
                      </td>
                      <td className="py-3 text-sm">
                        {user.riskScore >= 70 ? (
                          <span className="text-green-600">Good</span>
                        ) : (
                          <span className="text-yellow-600">Needs Improvement</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Events */}
          <EventTimeline events={data.recentEvents} />
        </div>
      </div>
    </div>
  );
}
