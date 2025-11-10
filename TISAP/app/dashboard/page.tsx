'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const router = useRouter();
  const { role, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Route to role-specific dashboard
    if (role === 'admin') {
      router.push('/admin');
    } else if (role === 'manager') {
      router.push('/manager');
    } else if (role === 'employee') {
      router.push('/employee');
    }
  }, [role, isAuthenticated, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">Redirecting to your dashboard...</p>
    </div>
  );
}
