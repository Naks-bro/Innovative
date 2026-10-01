import { useState } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "./components/Toaster";
import { toast } from "sonner@2.0.3";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Avatar } from "./components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { Progress } from "./components/ui/progress";
import {
  Home,
  Trophy,
  Award,
  Zap,
  Target,
  BookOpen,
  Settings,
  Bell,
  Search,
  TrendingUp,
  Star,
  Medal,
  Crown,
  Flame,
  Shield,
  Swords,
  Users,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Minus,
  CheckCircle2,
  Lock,
  Sparkles,
  Brain,
  Flag,
  Monitor,
  Globe,
  Mail,
  X,
  LogOut
} from "lucide-react";

// Import Interactive Lab Components
import WindowsSimulation from "./components/WindowsSimulation";
import BrowserSimulation from "./components/BrowserSimulation";
import EmailSimulation from "./components/EmailSimulation";
import EnhancedQuiz from "./components/EnhancedQuiz";
import EnhancedResults from "./components/EnhancedResults";
import MicroTrainingModal from "./components/MicroTrainingModal";
import Confetti from "./components/Confetti";
import ProfessionalLandingPage from "./components/ProfessionalLandingPage";
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/AdminDashboard";
import HRDashboard from "./components/HRDashboard";

type AppView = "landing" | "login" | "app";
type UserRole = "admin" | "hr" | "employee" | null;
type Page = "dashboard" | "leaderboard" | "labs" | "badges" | "progress";
type LeaderboardPeriod = "weekly" | "monthly" | "yearly" | "alltime";
type ActiveLab = "windows" | "browser" | "email" | "quiz" | null;

interface User {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  points: number;
  level: number;
  streak: number;
  badges: number;
  trend: "up" | "down" | "same";
  trendAmount?: number;
}

interface BadgeData {
  id: string;
  name: string;
  description: string;
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  icon: React.ReactNode;
  earned: boolean;
  progress?: number;
  requirement: number;
  points: number;
}

interface Activity {
  name: string;
  points: number;
  description: string;
}

const activities: Activity[] = [
  { name: "Complete Lab", points: 100, description: "Successfully complete any training lab" },
  { name: "Perfect Quiz Score", points: 50, description: "Score 100% on any quiz" },
  { name: "Daily Login", points: 10, description: "Log in every day (streak bonus)" },
  { name: "Report Threat", points: 25, description: "Report a simulated threat correctly" },
  { name: "Help Others", points: 30, description: "Answer questions in forums" },
  { name: "Course Complete", points: 200, description: "Complete an entire course module" },
  { name: "First Try Success", points: 75, description: "Pass lab on first attempt" },
  { name: "Streak Milestone", points: 150, description: "Maintain 7-day streak" }
];

const badges: BadgeData[] = [
  {
    id: "beginner",
    name: "First Steps",
    description: "Complete your first lab",
    tier: "bronze",
    icon: <Flag className="w-6 h-6" />,
    earned: true,
    progress: 100,
    requirement: 1,
    points: 50
  },
  {
    id: "phishing-hunter",
    name: "Phishing Hunter",
    description: "Identify 10 phishing attempts",
    tier: "silver",
    icon: <Target className="w-6 h-6" />,
    earned: true,
    progress: 100,
    requirement: 10,
    points: 100
  },
  {
    id: "security-expert",
    name: "Security Expert",
    description: "Complete 25 labs with 90%+ score",
    tier: "gold",
    icon: <Shield className="w-6 h-6" />,
    earned: false,
    progress: 18,
    requirement: 25,
    points: 250
  },
  {
    id: "perfect-streak",
    name: "Perfect Streak",
    description: "Maintain 30-day login streak",
    tier: "platinum",
    icon: <Flame className="w-6 h-6" />,
    earned: false,
    progress: 12,
    requirement: 30,
    points: 500
  },
  {
    id: "master-defender",
    name: "Master Defender",
    description: "Reach top 10 on leaderboard",
    tier: "diamond",
    icon: <Crown className="w-6 h-6" />,
    earned: false,
    progress: 42,
    requirement: 100,
    points: 1000
  },
  {
    id: "quiz-master",
    name: "Quiz Master",
    description: "Score 100% on 15 quizzes",
    tier: "gold",
    icon: <Brain className="w-6 h-6" />,
    earned: false,
    progress: 8,
    requirement: 15,
    points: 300
  },
  {
    id: "team-player",
    name: "Team Player",
    description: "Help 20 teammates",
    tier: "silver",
    icon: <Users className="w-6 h-6" />,
    earned: true,
    progress: 100,
    requirement: 20,
    points: 150
  },
  {
    id: "speed-demon",
    name: "Speed Demon",
    description: "Complete 10 labs under time limit",
    tier: "platinum",
    icon: <Zap className="w-6 h-6" />,
    earned: false,
    progress: 6,
    requirement: 10,
    points: 400
  }
];

const leaderboardData: Record<LeaderboardPeriod, User[]> = {
  weekly: [
    { id: "1", name: "Alex Morgan", avatar: "AM", rank: 1, points: 2450, level: 18, streak: 7, badges: 12, trend: "same" },
    { id: "2", name: "Sarah Chen", avatar: "SC", rank: 2, points: 2380, level: 17, streak: 12, badges: 11, trend: "up", trendAmount: 2 },
    { id: "3", name: "Marcus Johnson", avatar: "MJ", rank: 3, points: 2290, level: 16, streak: 5, badges: 10, trend: "down", trendAmount: 1 },
    { id: "4", name: "Emily Rodriguez", avatar: "ER", rank: 4, points: 2180, level: 15, streak: 9, badges: 9, trend: "up", trendAmount: 3 },
    { id: "5", name: "David Kim", avatar: "DK", rank: 5, points: 2050, level: 15, streak: 15, badges: 11, trend: "same" },
    { id: "6", name: "Jessica Taylor", avatar: "JT", rank: 6, points: 1980, level: 14, streak: 6, badges: 8, trend: "up", trendAmount: 1 },
    { id: "7", name: "Ryan Patel", avatar: "RP", rank: 7, points: 1890, level: 14, streak: 3, badges: 9, trend: "down", trendAmount: 2 },
    { id: "8", name: "Lisa Anderson", avatar: "LA", rank: 8, points: 1820, level: 13, streak: 11, badges: 7, trend: "same" },
    { id: "9", name: "Kevin Lee", avatar: "KL", rank: 9, points: 1750, level: 13, streak: 8, badges: 8, trend: "up", trendAmount: 4 },
    { id: "10", name: "YOU", avatar: "SJ", rank: 10, points: 1680, level: 12, streak: 5, badges: 6, trend: "down", trendAmount: 1 }
  ],
  monthly: [
    { id: "1", name: "Sarah Chen", avatar: "SC", rank: 1, points: 8950, level: 22, streak: 28, badges: 15, trend: "up", trendAmount: 1 },
    { id: "2", name: "Alex Morgan", avatar: "AM", rank: 2, points: 8720, level: 21, streak: 25, badges: 14, trend: "down", trendAmount: 1 },
    { id: "3", name: "Emily Rodriguez", avatar: "ER", rank: 3, points: 8340, level: 20, streak: 22, badges: 13, trend: "up", trendAmount: 2 },
    { id: "4", name: "David Kim", avatar: "DK", rank: 4, points: 7980, level: 19, streak: 30, badges: 12, trend: "same" },
    { id: "5", name: "Marcus Johnson", avatar: "MJ", rank: 5, points: 7650, level: 19, streak: 18, badges: 11, trend: "down", trendAmount: 2 },
    { id: "6", name: "Lisa Anderson", avatar: "LA", rank: 6, points: 7320, level: 18, streak: 24, badges: 11, trend: "up", trendAmount: 3 },
    { id: "7", name: "Kevin Lee", avatar: "KL", rank: 7, points: 6890, level: 17, streak: 20, badges: 10, trend: "up", trendAmount: 1 },
    { id: "8", name: "Jessica Taylor", avatar: "JT", rank: 8, points: 6540, level: 16, streak: 15, badges: 9, trend: "same" },
    { id: "9", name: "Ryan Patel", avatar: "RP", rank: 9, points: 6120, level: 16, streak: 12, badges: 8, trend: "down", trendAmount: 1 },
    { id: "10", name: "YOU", avatar: "SJ", rank: 10, points: 5850, level: 15, streak: 10, badges: 8, trend: "up", trendAmount: 2 }
  ],
  yearly: [
    { id: "1", name: "David Kim", avatar: "DK", rank: 1, points: 45600, level: 35, streak: 245, badges: 28, trend: "same" },
    { id: "2", name: "Sarah Chen", avatar: "SC", rank: 2, points: 43200, level: 34, streak: 198, badges: 26, trend: "same" },
    { id: "3", name: "Alex Morgan", avatar: "AM", rank: 3, points: 41800, level: 33, streak: 180, badges: 25, trend: "same" },
    { id: "4", name: "Emily Rodriguez", avatar: "ER", rank: 4, points: 38900, level: 31, streak: 165, badges: 23, trend: "up", trendAmount: 1 },
    { id: "5", name: "Lisa Anderson", avatar: "LA", rank: 5, points: 36500, level: 30, streak: 205, badges: 22, trend: "down", trendAmount: 1 },
    { id: "6", name: "Marcus Johnson", avatar: "MJ", rank: 6, points: 34200, level: 29, streak: 142, badges: 21, trend: "same" },
    { id: "7", name: "Kevin Lee", avatar: "KL", rank: 7, points: 32800, level: 28, streak: 156, badges: 20, trend: "up", trendAmount: 2 },
    { id: "8", name: "Jessica Taylor", avatar: "JT", rank: 8, points: 30400, level: 27, streak: 128, badges: 18, trend: "same" },
    { id: "9", name: "Ryan Patel", avatar: "RP", rank: 9, points: 28600, level: 26, streak: 134, badges: 17, trend: "down", trendAmount: 1 },
    { id: "15", name: "YOU", avatar: "SJ", rank: 15, points: 24200, level: 24, streak: 98, badges: 15, trend: "up", trendAmount: 3 }
  ],
  alltime: [
    { id: "1", name: "David Kim", avatar: "DK", rank: 1, points: 52800, level: 42, streak: 365, badges: 32, trend: "same" },
    { id: "2", name: "Sarah Chen", avatar: "SC", rank: 2, points: 49600, level: 40, streak: 298, badges: 30, trend: "same" },
    { id: "3", name: "Alex Morgan", avatar: "AM", rank: 3, points: 47200, level: 38, streak: 245, badges: 28, trend: "same" },
    { id: "4", name: "Emily Rodriguez", avatar: "ER", rank: 4, points: 43800, level: 36, streak: 210, badges: 26, trend: "same" },
    { id: "5", name: "Lisa Anderson", avatar: "LA", rank: 5, points: 41200, level: 35, streak: 280, badges: 25, trend: "same" },
    { id: "6", name: "Marcus Johnson", avatar: "MJ", rank: 6, points: 38900, level: 33, streak: 186, badges: 23, trend: "same" },
    { id: "7", name: "Kevin Lee", avatar: "KL", rank: 7, points: 36500, level: 32, streak: 204, badges: 22, trend: "same" },
    { id: "8", name: "Jessica Taylor", avatar: "JT", rank: 8, points: 34200, level: 30, streak: 172, badges: 20, trend: "same" },
    { id: "9", name: "Ryan Patel", avatar: "RP", rank: 9, points: 32100, level: 29, streak: 158, badges: 19, trend: "same" },
    { id: "22", name: "YOU", avatar: "SJ", rank: 22, points: 26400, level: 26, streak: 112, badges: 16, trend: "up", trendAmount: 5 }
  ]
};

function AppContent() {
  const [appView, setAppView] = useState<AppView>("landing");
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [leaderboardPeriod, setLeaderboardPeriod] = useState<LeaderboardPeriod>("weekly");
  const [showPointsBreakdown, setShowPointsBreakdown] = useState(false);
  const [activeLab, setActiveLab] = useState<ActiveLab>(null);
  const [showResults, setShowResults] = useState(false);
  const [labResults, setLabResults] = useState<any>(null);
  const [showMicroTraining, setShowMicroTraining] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentUser = leaderboardData[leaderboardPeriod].find(u => u.name === "YOU") || leaderboardData.weekly[9];

  const handleLogin = (role: "admin" | "hr" | "employee") => {
    // Reset all state when logging in to prevent role conflicts
    setUserRole(role);
    setAppView("app");
    setCurrentPage("dashboard");
    setActiveLab(null);
    setShowResults(false);
    setLabResults(null);
    setShowMicroTraining(false);
    setShowConfetti(false);
    setShowPointsBreakdown(false);
    setLeaderboardPeriod("weekly");
    
    toast.success(`Welcome back! Logged in as ${role.toUpperCase()}`);
  };

  const handleLogout = () => {
    // Reset all state when logging out to ensure clean slate
    setUserRole(null);
    setAppView("landing");
    setCurrentPage("dashboard");
    setActiveLab(null);
    setShowResults(false);
    setLabResults(null);
    setShowMicroTraining(false);
    setShowConfetti(false);
    setShowPointsBreakdown(false);
    setLeaderboardPeriod("weekly");
    
    toast.info("Logged out successfully");
  };

  // Show landing page
  if (appView === "landing") {
    return (
      <>
        <Toaster />
        <ProfessionalLandingPage onGetStarted={() => setAppView("login")} />
      </>
    );
  }

  // Show login page
  if (appView === "login") {
    return (
      <>
        <Toaster />
        <LoginPage 
          onLogin={handleLogin}
          onBack={() => setAppView("landing")}
        />
      </>
    );
  }

  const handleLabComplete = (results: any) => {
    setActiveLab(null);
    setLabResults({
      score: results.score || 100,
      points: results.points || 100,
      labName: results.labName || "Training Lab",
      labsCompleted: 3,
      badgesEarned: 2,
      ...results
    });
    setShowResults(true);
    setShowConfetti(true);
    
    toast.success(`Lab Complete! +${results.points || 100} points earned!`, {
      description: `You scored ${results.score || 100}%`,
      duration: 5000
    });

    setTimeout(() => setShowConfetti(false), 5000);
  };

  const startLab = (labType: ActiveLab) => {
    setActiveLab(labType);
    setCurrentPage("labs");
    toast.info(`Starting ${labType === "windows" ? "Malware Detection" : labType === "browser" ? "Browser Security" : labType === "email" ? "Phishing Detection" : "Security Quiz"} Lab`, {
      description: "Good luck! 🚀"
    });
  };

  // If a lab is active, show the lab component
  if (activeLab === "windows") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <Toaster />
        {showConfetti && <Confetti />}
        <WindowsSimulation onComplete={handleLabComplete} onExit={() => setActiveLab(null)} />
      </div>
    );
  }

  if (activeLab === "browser") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <Toaster />
        {showConfetti && <Confetti />}
        <BrowserSimulation onComplete={handleLabComplete} onExit={() => setActiveLab(null)} />
      </div>
    );
  }

  if (activeLab === "email") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <Toaster />
        {showConfetti && <Confetti />}
        <EmailSimulation onComplete={handleLabComplete} onExit={() => setActiveLab(null)} />
      </div>
    );
  }

  if (activeLab === "quiz") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <Toaster />
        {showConfetti && <Confetti />}
        <EnhancedQuiz onComplete={handleLabComplete} onExit={() => setActiveLab(null)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Toaster />
      {showConfetti && <Confetti />}
      
      {/* Modern Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-blue-500/20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <motion.div 
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage("dashboard")}
            >
              <div className="relative">
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/50"
                  animate={{ 
                    boxShadow: ["0 0 20px rgba(59, 130, 246, 0.5)", "0 0 30px rgba(147, 51, 234, 0.7)", "0 0 20px rgba(59, 130, 246, 0.5)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Shield className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div 
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
              <div>
                <div className="font-bold text-white text-lg">TISAP</div>
                <motion.div 
                  className="text-xs text-blue-300"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                >
                  {userRole === "admin" ? "Security Operations Center" :
                   userRole === "hr" ? "People & Training" :
                   `Level ${currentUser.level} • ${currentUser.points.toLocaleString()} pts`}
                </motion.div>
              </div>
            </motion.div>

            {/* Navigation Items - Only show for Employee role */}
            {userRole === "employee" && (
              <div className="hidden md:flex items-center gap-2 bg-slate-800/50 rounded-xl p-1.5 border border-slate-700">
                {[
                  { id: "dashboard", label: "Dashboard", icon: Home },
                  { id: "labs", label: "Labs", icon: BookOpen },
                  { id: "leaderboard", label: "Leaderboard", icon: Trophy },
                  { id: "badges", label: "Badges", icon: Award },
                  { id: "progress", label: "Progress", icon: TrendingUp }
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id as Page)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      currentPage === item.id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50"
                        : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium text-sm">{item.label}</span>
                    {item.id === "badges" && currentUser.badges > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <Badge className="bg-yellow-500 text-slate-900 text-xs px-1.5 py-0">
                          {currentUser.badges}
                        </Badge>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            )}

            {/* User Actions */}
            <div className="flex items-center gap-3">
              {/* Role Badge */}
              {userRole && (
                <Badge className={`${
                  userRole === "admin" ? "bg-purple-600" :
                  userRole === "hr" ? "bg-blue-600" :
                  "bg-cyan-600"
                } text-white`}>
                  {userRole.toUpperCase()}
                </Badge>
              )}

              {/* Only show points for employee role */}
              {userRole === "employee" && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPointsBreakdown(true)}
                    className="text-slate-300 hover:text-white hover:bg-slate-800 relative"
                  >
                    <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                    <motion.span 
                      className="font-semibold"
                      key={currentUser.points}
                      initial={{ scale: 1.5, color: "#facc15" }}
                      animate={{ scale: 1, color: "#ffffff" }}
                      transition={{ duration: 0.3 }}
                    >
                      {currentUser.points.toLocaleString()}
                    </motion.span>
                  </Button>
                </motion.div>
              )}

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-300 hover:text-white hover:bg-slate-800 relative"
                  onClick={() => toast.info("No new notifications")}
                >
                  <Bell className="w-4 h-4" />
                  <motion.span 
                    className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 hover:bg-red-950/30 border border-transparent hover:border-red-500/30"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </motion.div>

              {/* Only show avatar for employee role */}
              {userRole === "employee" && (
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center font-bold text-slate-900 cursor-pointer shadow-lg">
                    {currentUser.avatar}
                  </div>
                  {currentUser.streak > 0 && (
                    <motion.div 
                      className="absolute -bottom-1 -right-1 flex items-center gap-1 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold"
                      animate={{ 
                        boxShadow: ["0 0 10px rgba(249, 115, 22, 0.5)", "0 0 20px rgba(249, 115, 22, 0.8)", "0 0 10px rgba(249, 115, 22, 0.5)"]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Flame className="w-3 h-3" />
                      {currentUser.streak}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${userRole}-${currentPage}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Role-based Dashboard Routing */}
            {currentPage === "dashboard" && userRole === "admin" && (
              <AdminDashboard />
            )}
            {currentPage === "dashboard" && userRole === "hr" && (
              <HRDashboard />
            )}
            {currentPage === "dashboard" && userRole === "employee" && (
              <DashboardPage
                currentUser={currentUser}
                onStartLab={startLab}
                onShowMicroTraining={() => setShowMicroTraining(true)}
              />
            )}

            {/* Employee-only pages */}
            {userRole === "employee" && (
              <>
                {currentPage === "leaderboard" && (
                  <LeaderboardPage
                    period={leaderboardPeriod}
                    setPeriod={setLeaderboardPeriod}
                    currentUser={currentUser}
                  />
                )}
                {currentPage === "badges" && <BadgesPage />}
                {currentPage === "labs" && <LabsPage onStartLab={startLab} />}
                {currentPage === "progress" && <ProgressPage currentUser={currentUser} />}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Points Breakdown Modal */}
      <AnimatePresence>
        {showPointsBreakdown && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPointsBreakdown(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50 px-4"
            >
              <Card className="bg-slate-900 border-blue-500/30 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                    Points Breakdown
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowPointsBreakdown(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="space-y-3">
                  {activities.map((activity, index) => (
                    <motion.div
                      key={activity.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-blue-500/50 transition-colors cursor-pointer"
                    >
                      <div className="flex-1">
                        <div className="font-semibold text-white">{activity.name}</div>
                        <div className="text-sm text-slate-400">{activity.description}</div>
                      </div>
                      <motion.div 
                        className="text-right"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="text-2xl font-bold text-yellow-400">+{activity.points}</div>
                        <div className="text-xs text-slate-500">points</div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  className="mt-6 p-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg border border-blue-500/30"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-sm text-blue-300 mb-2">💡 Pro Tip</div>
                  <div className="text-slate-300">
                    Maintain your daily streak to unlock bonus multipliers! Complete labs on first try for extra points.
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Results Modal */}
      <AnimatePresence>
        {showResults && labResults && (
          <EnhancedResults
            results={labResults}
            onClose={() => {
              setShowResults(false);
              setLabResults(null);
            }}
            onRetry={() => {
              setShowResults(false);
              // Restart the lab
            }}
          />
        )}
      </AnimatePresence>

      {/* Micro Training Modal */}
      <AnimatePresence>
        {showMicroTraining && (
          <MicroTrainingModal
            isOpen={showMicroTraining}
            onClose={() => setShowMicroTraining(false)}
            topic="Quick Security Tips"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Dashboard Page
function DashboardPage({ 
  currentUser, 
  onStartLab,
  onShowMicroTraining 
}: { 
  currentUser: User;
  onStartLab: (lab: ActiveLab) => void;
  onShowMicroTraining: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Welcome Section */}
      <motion.div 
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 cursor-pointer"
        whileHover={{ scale: 1.02 }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        style={{ backgroundSize: "200% 200%" }}
      >
        <div className="relative z-10">
          <motion.h1 
            className="text-3xl font-bold text-white mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Welcome back, Saqib! 👋
          </motion.h1>
          <motion.p 
            className="text-blue-100 text-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            You're on fire! Keep up the momentum.
          </motion.p>
        </div>
        <motion.div 
          className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 left-1/3 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl"
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <Card className="bg-slate-900 border-blue-500/30 p-6 cursor-pointer hover:shadow-2xl hover:shadow-blue-500/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Rank</Badge>
            </div>
            <motion.div 
              className="text-3xl font-bold text-white mb-1"
              key={currentUser.rank}
              initial={{ scale: 1.5, color: "#facc15" }}
              animate={{ scale: 1, color: "#ffffff" }}
            >
              #{currentUser.rank}
            </motion.div>
            <div className="text-sm text-slate-400">This Week</div>
            <div className="mt-2 flex items-center gap-1 text-green-400 text-sm">
              <ArrowUp className="w-4 h-4" />
              <span>Moving up</span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <Card className="bg-slate-900 border-purple-500/30 p-6 cursor-pointer hover:shadow-2xl hover:shadow-purple-500/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Points</Badge>
            </div>
            <motion.div 
              className="text-3xl font-bold text-white mb-1"
              key={currentUser.points}
              initial={{ scale: 1.5, color: "#c084fc" }}
              animate={{ scale: 1, color: "#ffffff" }}
            >
              {currentUser.points.toLocaleString()}
            </motion.div>
            <div className="text-sm text-slate-400">Total Score</div>
            <Progress value={65} className="mt-3 h-2" />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <Card className="bg-slate-900 border-orange-500/30 p-6 cursor-pointer hover:shadow-2xl hover:shadow-orange-500/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <Flame className="w-8 h-8 text-orange-400" />
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Streak</Badge>
            </div>
            <motion.div 
              className="text-3xl font-bold text-white mb-1"
              key={currentUser.streak}
              initial={{ scale: 1.5, color: "#fb923c" }}
              animate={{ scale: 1, color: "#ffffff" }}
            >
              {currentUser.streak} days
            </motion.div>
            <div className="text-sm text-slate-400">Keep it going!</div>
            <div className="mt-2 text-xs text-orange-400">🔥 Next milestone: 7 days</div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <Card className="bg-slate-900 border-green-500/30 p-6 cursor-pointer hover:shadow-2xl hover:shadow-green-500/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 text-green-400" />
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Badges</Badge>
            </div>
            <motion.div 
              className="text-3xl font-bold text-white mb-1"
              key={currentUser.badges}
              initial={{ scale: 1.5, color: "#4ade80" }}
              animate={{ scale: 1, color: "#ffffff" }}
            >
              {currentUser.badges}
            </motion.div>
            <div className="text-sm text-slate-400">Earned Badges</div>
            <div className="mt-2 text-xs text-green-400">✨ 2 more available</div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-slate-900 border-blue-500/30 p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Quick Start Labs
            </h3>
            <div className="space-y-3">
              {[
                { id: "email", name: "Phishing Detection", icon: Mail, color: "from-red-500 to-orange-500", progress: 0 },
                { id: "browser", name: "Browser Security", icon: Globe, color: "from-blue-500 to-cyan-500", progress: 0 },
                { id: "windows", name: "Malware Detection", icon: Monitor, color: "from-purple-500 to-pink-500", progress: 0 },
                { id: "quiz", name: "Security Quiz", icon: Brain, color: "from-green-500 to-teal-500", progress: 0 }
              ].map((lab, index) => (
                <motion.div
                  key={lab.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => onStartLab(lab.id as ActiveLab)}
                    className={`w-full bg-gradient-to-r ${lab.color} hover:opacity-90 justify-between group`}
                  >
                    <span className="flex items-center gap-2">
                      <lab.icon className="w-4 h-4" />
                      {lab.name}
                    </span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  </Button>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-slate-900 border-purple-500/30 p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" />
              Weekly Challenges
            </h3>
            <div className="space-y-3">
              {[
                { completed: true, text: "Complete 5 labs", points: 200, color: "green" },
                { completed: false, text: "Earn 3 badges", points: 300, color: "yellow" },
                { completed: false, text: "Maintain 7-day streak", points: 150, color: "orange" }
              ].map((challenge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: -5 }}
                  className={`flex items-center justify-between p-3 bg-slate-800 rounded-lg cursor-pointer ${
                    challenge.completed ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {challenge.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <motion.div 
                        className="w-5 h-5 rounded-full border-2 border-slate-600"
                        whileHover={{ scale: 1.2, borderColor: "#60a5fa" }}
                      />
                    )}
                    <span className={challenge.completed ? "text-slate-400 line-through" : "text-white"}>
                      {challenge.text}
                    </span>
                  </div>
                  <motion.span 
                    className={`text-${challenge.color}-400 font-semibold`}
                    whileHover={{ scale: 1.1 }}
                  >
                    +{challenge.points} pts
                  </motion.span>
                </motion.div>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4"
            >
              <Button
                onClick={onShowMicroTraining}
                variant="outline"
                className="w-full border-purple-500/30 hover:bg-purple-500/10"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Quick Training Tips
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Leaderboard Page
function LeaderboardPage({
  period,
  setPeriod,
  currentUser
}: {
  period: LeaderboardPeriod;
  setPeriod: (p: LeaderboardPeriod) => void;
  currentUser: User;
}) {
  const users = leaderboardData[period];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <motion.h1 
            className="text-3xl font-bold text-white mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            🏆 Leaderboard
          </motion.h1>
          <motion.p 
            className="text-slate-400"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            Compete with the best cybersecurity defenders
          </motion.p>
        </div>
      </div>

      {/* Period Tabs */}
      <Tabs value={period} onValueChange={(v) => setPeriod(v as LeaderboardPeriod)}>
        <TabsList className="bg-slate-900 border border-slate-700 p-1">
          <TabsTrigger value="weekly" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Zap className="w-4 h-4 mr-2" />
            Weekly
          </TabsTrigger>
          <TabsTrigger value="monthly" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Star className="w-4 h-4 mr-2" />
            Monthly
          </TabsTrigger>
          <TabsTrigger value="yearly" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Trophy className="w-4 h-4 mr-2" />
            Yearly
          </TabsTrigger>
          <TabsTrigger value="alltime" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Crown className="w-4 h-4 mr-2" />
            All Time
          </TabsTrigger>
        </TabsList>

        <TabsContent value={period} className="mt-6">
          {/* Top 3 Podium */}
          {users.slice(0, 3).length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-8">
              {/* 2nd Place */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="order-1"
              >
                <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-600 p-6 text-center cursor-pointer hover:shadow-2xl hover:shadow-slate-500/20 transition-all">
                  <div className="relative inline-block mb-4">
                    <motion.div 
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-2xl font-bold text-white shadow-xl"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {users[1].avatar}
                    </motion.div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-500 rounded-full flex items-center justify-center text-white font-bold border-2 border-slate-900">
                      2
                    </div>
                  </div>
                  <div className="font-bold text-white mb-1">{users[1].name}</div>
                  <div className="text-2xl font-bold text-slate-300 mb-2">{users[1].points.toLocaleString()}</div>
                  <Badge className="bg-slate-500/20 text-slate-300">Level {users[1].level}</Badge>
                </Card>
              </motion.div>

              {/* 1st Place */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="order-2"
              >
                <Card className="bg-gradient-to-br from-yellow-600 via-yellow-500 to-orange-500 border-yellow-400 p-6 text-center relative overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-yellow-500/50 transition-all">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent" />
                  <div className="relative z-10">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Crown className="w-8 h-8 text-yellow-200 mx-auto mb-2" />
                    </motion.div>
                    <div className="relative inline-block mb-4">
                      <motion.div 
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 flex items-center justify-center text-3xl font-bold text-slate-900 shadow-2xl ring-4 ring-yellow-200"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                      >
                        {users[0].avatar}
                      </motion.div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-slate-900 font-bold border-2 border-yellow-200 shadow-lg">
                        1
                      </div>
                    </div>
                    <div className="font-bold text-slate-900 text-lg mb-1">{users[0].name}</div>
                    <div className="text-3xl font-bold text-slate-900 mb-2">{users[0].points.toLocaleString()}</div>
                    <Badge className="bg-slate-900 text-yellow-400">Level {users[0].level}</Badge>
                  </div>
                </Card>
              </motion.div>

              {/* 3rd Place */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="order-3"
              >
                <Card className="bg-gradient-to-br from-orange-900 to-slate-900 border-orange-700 p-6 text-center cursor-pointer hover:shadow-2xl hover:shadow-orange-500/20 transition-all">
                  <div className="relative inline-block mb-4">
                    <motion.div 
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-600 to-orange-800 flex items-center justify-center text-2xl font-bold text-white shadow-xl"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                    >
                      {users[2].avatar}
                    </motion.div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-slate-900">
                      3
                    </div>
                  </div>
                  <div className="font-bold text-white mb-1">{users[2].name}</div>
                  <div className="text-2xl font-bold text-orange-300 mb-2">{users[2].points.toLocaleString()}</div>
                  <Badge className="bg-orange-500/20 text-orange-300">Level {users[2].level}</Badge>
                </Card>
              </motion.div>
            </div>
          )}

          {/* Full Leaderboard */}
          <Card className="bg-slate-900 border-slate-700 overflow-hidden">
            <div className="divide-y divide-slate-800">
              {users.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ scale: 1.01, x: 5 }}
                  className={`p-4 transition-all cursor-pointer ${
                    user.name === "YOU" ? "bg-blue-900/30 border-l-4 border-blue-500" : "hover:bg-slate-800/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="w-12 text-center">
                      <motion.div
                        className={`text-2xl font-bold ${
                          user.rank === 1
                            ? "text-yellow-400"
                            : user.rank === 2
                            ? "text-slate-400"
                            : user.rank === 3
                            ? "text-orange-600"
                            : "text-slate-500"
                        }`}
                        whileHover={{ scale: 1.2 }}
                      >
                        {user.rank}
                      </motion.div>
                    </div>

                    {/* Trend */}
                    <div className="w-8">
                      {user.trend === "up" && (
                        <motion.div 
                          className="flex flex-col items-center"
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <ArrowUp className="w-5 h-5 text-green-400" />
                          {user.trendAmount && (
                            <span className="text-xs text-green-400 font-semibold">+{user.trendAmount}</span>
                          )}
                        </motion.div>
                      )}
                      {user.trend === "down" && (
                        <motion.div 
                          className="flex flex-col items-center"
                          animate={{ y: [0, 3, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <ArrowDown className="w-5 h-5 text-red-400" />
                          {user.trendAmount && (
                            <span className="text-xs text-red-400 font-semibold">-{user.trendAmount}</span>
                          )}
                        </motion.div>
                      )}
                      {user.trend === "same" && <Minus className="w-5 h-5 text-slate-500" />}
                    </div>

                    {/* Avatar */}
                    <div className="relative">
                      <motion.div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-sm ${
                          user.name === "YOU"
                            ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white ring-2 ring-blue-400"
                            : "bg-gradient-to-br from-slate-600 to-slate-700 text-white"
                        }`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {user.avatar}
                      </motion.div>
                      {user.streak >= 7 && (
                        <motion.div 
                          className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <Flame className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{user.name}</span>
                        {user.name === "YOU" && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <Badge className="bg-blue-500 text-white text-xs">YOU</Badge>
                          </motion.div>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-400">
                        <span>Level {user.level}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          {user.badges} badges
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3 h-3 text-orange-400" />
                          {user.streak} days
                        </span>
                      </div>
                    </div>

                    {/* Points */}
                    <motion.div 
                      className="text-right"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-2xl font-bold text-white">{user.points.toLocaleString()}</div>
                      <div className="text-sm text-slate-500">points</div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

// Badges Page
function BadgesPage() {
  const earnedBadges = badges.filter(b => b.earned);
  const lockedBadges = badges.filter(b => !b.earned);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "bronze": return "from-orange-600 to-orange-800";
      case "silver": return "from-slate-400 to-slate-600";
      case "gold": return "from-yellow-400 to-yellow-600";
      case "platinum": return "from-cyan-400 to-blue-600";
      case "diamond": return "from-purple-400 to-pink-600";
      default: return "from-slate-600 to-slate-800";
    }
  };

  const getTierBorder = (tier: string) => {
    switch (tier) {
      case "bronze": return "border-orange-500/50";
      case "silver": return "border-slate-400/50";
      case "gold": return "border-yellow-400/50";
      case "platinum": return "border-cyan-400/50";
      case "diamond": return "border-purple-400/50";
      default: return "border-slate-600/50";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div>
        <motion.h1 
          className="text-3xl font-bold text-white mb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          🏅 Badge Collection
        </motion.h1>
        <motion.p 
          className="text-slate-400"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          Showcase your achievements • {earnedBadges.length}/{badges.length} earned
        </motion.p>
      </div>

      {/* Earned Badges */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Earned Badges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {earnedBadges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className={`bg-slate-900 border-2 ${getTierBorder(badge.tier)} p-6 text-center transition-all cursor-pointer group hover:shadow-2xl`}>
                <motion.div 
                  className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${getTierColor(badge.tier)} flex items-center justify-center shadow-2xl`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-white">{badge.icon}</div>
                </motion.div>
                <div className="font-bold text-white mb-1">{badge.name}</div>
                <div className="text-sm text-slate-400 mb-3">{badge.description}</div>
                <Badge className={`uppercase text-xs`}>
                  {badge.tier}
                </Badge>
                <motion.div 
                  className="mt-3 text-yellow-400 font-semibold"
                  whileHover={{ scale: 1.1 }}
                >
                  +{badge.points} pts
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Locked Badges */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">In Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {lockedBadges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="bg-slate-900 border-slate-700 p-6 text-center relative overflow-hidden cursor-pointer group hover:border-blue-500/30 transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm" />
                <div className="relative z-10">
                  <motion.div 
                    className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center border-2 border-slate-700"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Lock className="w-8 h-8 text-slate-600" />
                  </motion.div>
                  <div className="font-bold text-slate-300 mb-1">{badge.name}</div>
                  <div className="text-sm text-slate-500 mb-3">{badge.description}</div>
                  
                  {/* Progress */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>Progress</span>
                      <span>{badge.progress}/{badge.requirement}</span>
                    </div>
                    <Progress 
                      value={(badge.progress! / badge.requirement) * 100} 
                      className="h-2"
                    />
                  </div>

                  <Badge className="bg-slate-700 text-slate-400 uppercase text-xs">
                    {badge.tier}
                  </Badge>
                  <div className="mt-3 text-slate-500 font-semibold">+{badge.points} pts</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Labs Page
function LabsPage({ onStartLab }: { onStartLab: (lab: ActiveLab) => void }) {
  const labs = [
    { 
      id: "email" as ActiveLab, 
      title: "Phishing Email Detection", 
      difficulty: "Beginner", 
      time: "15 min", 
      points: 100, 
      completed: false,
      icon: Mail,
      color: "from-red-500 to-orange-500",
      description: "Learn to identify and report phishing attempts"
    },
    { 
      id: "browser" as ActiveLab, 
      title: "Browser Security & Threats", 
      difficulty: "Beginner", 
      time: "20 min", 
      points: 100, 
      completed: false,
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      description: "Navigate secure and dangerous websites"
    },
    { 
      id: "windows" as ActiveLab, 
      title: "Malware Detection & Response", 
      difficulty: "Intermediate", 
      time: "30 min", 
      points: 150, 
      completed: false,
      icon: Monitor,
      color: "from-purple-500 to-pink-500",
      description: "Detect and neutralize malware threats"
    },
    { 
      id: "quiz" as ActiveLab, 
      title: "Security Knowledge Quiz", 
      difficulty: "Intermediate", 
      time: "15 min", 
      points: 200, 
      completed: false,
      icon: Brain,
      color: "from-green-500 to-teal-500",
      description: "Test your cybersecurity knowledge"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div>
        <motion.h1 
          className="text-3xl font-bold text-white mb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          📚 Interactive Training Labs
        </motion.h1>
        <motion.p 
          className="text-slate-400"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          Hands-on cybersecurity training exercises
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {labs.map((lab, index) => (
          <motion.div
            key={lab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className={`bg-slate-900 border-slate-700 p-6 hover:border-blue-500/50 transition-all cursor-pointer hover:shadow-2xl hover:shadow-blue-500/20 ${lab.completed ? "opacity-75" : ""}`}>
              <div className="flex items-start gap-4 mb-4">
                <motion.div 
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${lab.color} flex items-center justify-center shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <lab.icon className="w-7 h-7 text-white" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">{lab.title}</h3>
                  <p className="text-sm text-slate-400 mb-3">{lab.description}</p>
                  <div className="flex items-center gap-3 text-sm flex-wrap">
                    <Badge className={
                      lab.difficulty === "Beginner" ? "bg-green-500/20 text-green-400" :
                      lab.difficulty === "Intermediate" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-red-500/20 text-red-400"
                    }>
                      {lab.difficulty}
                    </Badge>
                    <span className="text-slate-400">⏱ {lab.time}</span>
                    <span className="text-yellow-400 font-semibold">+{lab.points} pts</span>
                  </div>
                </div>
                {lab.completed && (
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                )}
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  onClick={() => onStartLab(lab.id)}
                  className={`w-full ${
                    lab.completed 
                      ? "bg-slate-700 hover:bg-slate-600" 
                      : `bg-gradient-to-r ${lab.color} hover:opacity-90`
                  }`}
                >
                  {lab.completed ? "Review Lab" : "Start Lab"}
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </motion.div>
                </Button>
              </motion.div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Progress Page
function ProgressPage({ currentUser }: { currentUser: User }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div>
        <motion.h1 
          className="text-3xl font-bold text-white mb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          📈 Your Progress
        </motion.h1>
        <motion.p 
          className="text-slate-400"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          Track your learning journey
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Current Level", value: currentUser.level, sub: "650/1000 XP to Level " + (currentUser.level + 1), progress: 65, color: "blue" },
          { label: "Completion Rate", value: "75%", sub: "12 of 16 labs completed", progress: 75, color: "purple" },
          { label: "Day Streak", value: currentUser.streak, sub: "Keep it going!", progress: (currentUser.streak / 30) * 100, color: "orange" }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <Card className={`bg-slate-900 border-${stat.color}-500/30 p-6 cursor-pointer hover:shadow-2xl hover:shadow-${stat.color}-500/20 transition-all`}>
              <div className="text-center">
                <motion.div 
                  className="text-5xl font-bold text-white mb-2"
                  key={stat.value}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-slate-400 mb-4">{stat.label}</div>
                <Progress value={stat.progress} className="mb-2" />
                <div className="text-sm text-slate-500">{stat.sub}</div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-slate-900 border-slate-700 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: "Completed Lab", name: "Phishing Email Detection", time: "2 hours ago", points: 100, icon: CheckCircle2 },
            { action: "Earned Badge", name: "Phishing Hunter", time: "3 hours ago", points: 100, icon: Award },
            { action: "Quiz Completed", name: "Password Security", time: "1 day ago", points: 50, icon: Brain },
            { action: "Streak Milestone", name: "5 Day Streak", time: "1 day ago", points: 75, icon: Flame },
          ].map((activity, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className="flex items-center justify-between p-3 bg-slate-800 rounded-lg cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <activity.icon className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="font-semibold text-white">{activity.action}: {activity.name}</div>
                  <div className="text-sm text-slate-400">{activity.time}</div>
                </div>
              </div>
              <motion.div 
                className="text-yellow-400 font-semibold"
                whileHover={{ scale: 1.1 }}
              >
                +{activity.points}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
