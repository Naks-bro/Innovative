'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Role = 'admin' | 'manager' | 'employee';

interface AuthContextType {
  role: Role | null;
  userId: string | null;
  login: (role: Role, userId: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage on mount (client-side only)
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('userRole') as Role | null;
      const storedUserId = localStorage.getItem('userId');
      if (storedRole && storedUserId) {
        setRole(storedRole);
        setUserId(storedUserId);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    }
  }, []);

  const login = (newRole: Role, newUserId: string) => {
    setRole(newRole);
    setUserId(newUserId);
    setIsAuthenticated(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('userRole', newRole);
      localStorage.setItem('userId', newUserId);
    }
  };

  const logout = () => {
    setRole(null);
    setUserId(null);
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
    }
  };

  return (
    <AuthContext.Provider value={{ role, userId, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
