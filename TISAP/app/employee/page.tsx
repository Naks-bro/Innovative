'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { ScoreCard } from '@/components/ScoreCard';
import { EventTimeline } from '@/components/EventTimeline';
import { api, UserData } from '@/lib/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Lightbulb, TrendingDown, TrendingUp } from 'lucide-react';

export default function EmployeePage() {
  const router = useRouter();
  const { role, userId, isAuthenticated } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (!isAuthenticated || role !== 'employee') {
      router.push('/login');
      return;
    }

    if (userId) {
      fetchData();
      const interval = setInterval(fetchData, 5000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, role, userId, router]);

  const fetchData = async () => {
    if (!userId) return;
    try {
      const data = await api.getUserData(userId);
      setUserData(data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  if (!userData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const tips = [
    { icon: Lightbulb, text: "Always verify sender email addresses before clicking links", color: "text-blue-600" },
    { icon: Lightbulb, text: "Use strong, unique passwords for each account", color: "text-teal-600" },
    { icon: Lightbulb, text: "Enable two-factor authentication whenever possible", color: "text-purple-600" },
    { icon: Lightbulb, text: "Don't download attachments from unknown sources", color: "text-orange-600" },
  ];

  const scoreChange = userData.scoreHistory.length >= 2
    ? userData.user.riskScore - userData.scoreHistory[userData.scoreHistory.length - 2].score
    : 0;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1">
        <Header 
          title="My Security Profile" 
          subtitle="Track your cyber security awareness"
        />
        
        <div className="p-8">
          {/* User Info & Score */}
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <ScoreCard
              title="Your Security Score"
              score={userData.user.riskScore}
              subtitle={`${userData.user.department} Department`}
            />
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-sm font-medium text-muted-foreground">Score Trend</h3>
              <div className="mt-4 flex items-center gap-2">
                {scoreChange >= 0 ? (
                  <>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                    <div className="text-4xl font-bold text-green-600">+{scoreChange}</div>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-8 w-8 text-red-600" />
                    <div className="text-4xl font-bold text-red-600">{scoreChange}</div>
                  </>
                )}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Since last week</p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-sm font-medium text-muted-foreground">Recent Events</h3>
              <div className="mt-4 text-4xl font-bold text-foreground">{userData.events.length}</div>
              <p className="mt-2 text-xs text-muted-foreground">Last 30 days</p>
            </div>
          </div>

          {/* Score History Chart */}
          <div className="mb-8 rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Score History</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userData.scoreHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#0284c7" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Security Tips */}
          <div className="mb-8 rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Security Tips</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {tips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <div key={index} className="flex items-start gap-3 rounded-md bg-muted/50 p-4">
                    <Icon className={`h-5 w-5 flex-shrink-0 ${tip.color}`} />
                    <p className="text-sm text-foreground">{tip.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Impact Messages */}
          <div className="mb-8 rounded-lg border border-yellow-200 bg-yellow-50 p-6">
            <h3 className="mb-2 font-semibold text-yellow-900">How Your Actions Affect Your Score</h3>
            <ul className="space-y-2 text-sm text-yellow-800">
              <li>• Clicking unknown links lowers your score by 5-10 points</li>
              <li>• Downloading suspicious attachments can reduce your score by 15 points</li>
              <li>• Reporting phishing attempts increases your score by 5 points</li>
              <li>• Completing security training adds 10 points to your score</li>
            </ul>
          </div>

          {/* Event Timeline */}
          <EventTimeline events={userData.events} />
        </div>
      </div>
    </div>
  );
}
