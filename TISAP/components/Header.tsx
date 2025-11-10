'use client';

import { useAuth } from '@/context/AuthContext';
import { Shield } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { role } = useAuth();

  return (
    <div className="border-b bg-card px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          <div className="text-right">
            <p className="text-sm font-medium capitalize">{role} Dashboard</p>
            <p className="text-xs text-muted-foreground">Company Security Score</p>
          </div>
        </div>
      </div>
    </div>
  );
}
