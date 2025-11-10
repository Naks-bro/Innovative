'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Shield } from 'lucide-react';

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'manager' | 'employee'>('employee');
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = () => {
    // Generate a simple user ID based on role
    const userId = `${selectedRole}-${Date.now()}`;
    login(selectedRole, userId);
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <Shield className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">TISAP</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Cyber Security Awareness Platform
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="mb-3 block text-sm font-medium text-foreground">
              Select Your Role
            </label>
            <div className="space-y-3">
              <button
                onClick={() => setSelectedRole('admin')}
                className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                  selectedRole === 'admin'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                <div className="font-semibold">Administrator</div>
                <div className="text-sm text-muted-foreground">
                  View organization-wide metrics and manage training
                </div>
              </button>

              <button
                onClick={() => setSelectedRole('manager')}
                className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                  selectedRole === 'manager'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                <div className="font-semibold">Manager</div>
                <div className="text-sm text-muted-foreground">
                  View team-specific data and download reports
                </div>
              </button>

              <button
                onClick={() => setSelectedRole('employee')}
                className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                  selectedRole === 'employee'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                <div className="font-semibold">Employee</div>
                <div className="text-sm text-muted-foreground">
                  View your personal security score and tips
                </div>
              </button>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Continue as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
          </button>
        </div>
      </div>
    </div>
  );
}
