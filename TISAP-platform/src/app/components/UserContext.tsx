import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Employee' | 'Admin' | 'HR';
  avatar: string;
  totalPoints: number;
  level: number;
  completedLabs: string[];
  inProgressLabs: { [key: string]: number };
  achievements: Achievement[];
  lastActive: Date;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: Date;
  points: number;
}

interface LabAttempt {
  labId: string;
  score: number;
  completedAt: Date;
  duration: string;
  metrics: {
    clickThroughRate?: number;
    reportingAccuracy?: number;
    quizScore?: number;
  };
}

interface UserContextType {
  user: User;
  updateUser: (updates: Partial<User>) => void;
  completeL: (labId: string, attempt: LabAttempt) => void;
  updateProgress: (labId: string, progress: number) => void;
  addAchievement: (achievement: Achievement) => void;
  getLeaderboard: () => User[];
}

const defaultUser: User = {
  id: '1',
  name: 'Alex Rivera',
  email: 'alex.rivera@company.com',
  role: 'Employee',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  totalPoints: 2850,
  level: 8,
  completedLabs: ['phishing-email-1', 'browser-extension-1'],
  inProgressLabs: {
    'ransomware-popup-1': 65,
    'iot-security-1': 30
  },
  achievements: [
    {
      id: 'first-lab',
      name: 'First Steps',
      description: 'Completed your first lab',
      icon: '🎯',
      earnedDate: new Date('2024-01-15'),
      points: 50
    },
    {
      id: 'phishing-detective',
      name: 'Phishing Detective',
      description: 'Correctly identified 10 phishing emails',
      icon: '🕵️',
      earnedDate: new Date('2024-01-20'),
      points: 100
    }
  ],
  lastActive: new Date()
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser);
  const [allUsers, setAllUsers] = useState<User[]>([
    defaultUser,
    {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah.chen@company.com',
      role: 'Employee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      totalPoints: 3200,
      level: 9,
      completedLabs: ['phishing-email-1', 'browser-extension-1', 'ransomware-popup-1'],
      inProgressLabs: {},
      achievements: [],
      lastActive: new Date()
    },
    {
      id: '3',
      name: 'Michael Park',
      email: 'michael.park@company.com',
      role: 'Employee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      totalPoints: 2100,
      level: 7,
      completedLabs: ['phishing-email-1'],
      inProgressLabs: { 'browser-extension-1': 45 },
      achievements: [],
      lastActive: new Date()
    }
  ]);

  // Load from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('tisap-user');
    const savedUsers = localStorage.getItem('tisap-all-users');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedUsers) {
      setAllUsers(JSON.parse(savedUsers));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('tisap-user', JSON.stringify(user));
    localStorage.setItem('tisap-all-users', JSON.stringify(allUsers));
  }, [user, allUsers]);

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates, lastActive: new Date() }));
  };

  const completeLab = (labId: string, attempt: LabAttempt) => {
    setUser(prev => {
      const newCompletedLabs = [...prev.completedLabs];
      if (!newCompletedLabs.includes(labId)) {
        newCompletedLabs.push(labId);
      }

      const newInProgressLabs = { ...prev.inProgressLabs };
      delete newInProgressLabs[labId];

      const pointsEarned = attempt.score > 80 ? 200 : attempt.score > 60 ? 150 : 100;
      const newTotalPoints = prev.totalPoints + pointsEarned;
      const newLevel = Math.floor(newTotalPoints / 500) + 1;

      return {
        ...prev,
        completedLabs: newCompletedLabs,
        inProgressLabs: newInProgressLabs,
        totalPoints: newTotalPoints,
        level: newLevel,
        lastActive: new Date()
      };
    });
  };

  const updateProgress = (labId: string, progress: number) => {
    setUser(prev => ({
      ...prev,
      inProgressLabs: {
        ...prev.inProgressLabs,
        [labId]: progress
      },
      lastActive: new Date()
    }));
  };

  const addAchievement = (achievement: Achievement) => {
    setUser(prev => ({
      ...prev,
      achievements: [...prev.achievements, achievement],
      totalPoints: prev.totalPoints + achievement.points,
      lastActive: new Date()
    }));
  };

  const getLeaderboard = () => {
    return [...allUsers].sort((a, b) => b.totalPoints - a.totalPoints);
  };

  return (
    <UserContext.Provider value={{
      user,
      updateUser,
      completeLab,
      updateProgress,
      addAchievement,
      getLeaderboard
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
