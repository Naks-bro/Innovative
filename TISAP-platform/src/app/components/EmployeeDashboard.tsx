import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import TISAPHeader from "./TISAPHeader";
import { toast } from "sonner@2.0.3";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  Trophy, 
  Clock, 
  Calendar, 
  AlertTriangle,
  TrendingUp,
  Mail,
  Play,
  Award,
  Flag,
  Target,
  Zap,
  BookOpen,
  CheckCircle,
  ArrowUpRight,
  ChevronRight,
  Sparkles,
  TrendingDown,
  Lock
} from "lucide-react";

interface EmployeeDashboardProps {
  onNavigate: (page: string) => void;
}

interface LeaderboardUser {
  rank: number;
  name: string;
  points: number;
  avatar: string;
  isCurrentUser?: boolean;
  trend?: 'up' | 'down' | 'same';
  lastWeekRank?: number;
}

interface Activity {
  id: number;
  type: 'success' | 'warning' | 'info' | 'achievement';
  title: string;
  time: string;
  icon: any;
  points?: number;
}

interface Lab {
  id: number;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  icon: any;
  color: string;
}

export default function EmployeeDashboard({ onNavigate }: EmployeeDashboardProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedPoints, setAnimatedPoints] = useState(0);
  const [animatedBadges, setAnimatedBadges] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'all'>('week');

  const targetScore = 87;
  const targetPoints = 2150;
  const targetBadges = 8;

  // Animated counter effect
  useEffect(() => {
    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const scoreIncrement = targetScore / steps;
    const pointsIncrement = targetPoints / steps;
    const badgesIncrement = targetBadges / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setAnimatedScore(Math.min(Math.round(scoreIncrement * currentStep), targetScore));
        setAnimatedPoints(Math.min(Math.round(pointsIncrement * currentStep), targetPoints));
        setAnimatedBadges(Math.min(Math.round(badgesIncrement * currentStep), targetBadges));
      } else {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const leaderboardData: LeaderboardUser[] = [
    { rank: 1, name: "Sarah Chen", points: 2450, avatar: "SC", trend: 'same', lastWeekRank: 1 },
    { rank: 2, name: "Marcus Johnson", points: 2380, avatar: "MJ", trend: 'up', lastWeekRank: 3 },
    { rank: 3, name: "Elena Rodriguez", points: 2210, avatar: "ER", trend: 'down', lastWeekRank: 2 },
    { rank: 4, name: "You (Jordan)", points: 2150, avatar: "JD", isCurrentUser: true, trend: 'up', lastWeekRank: 5 },
    { rank: 5, name: "Alex Kim", points: 2090, avatar: "AK", trend: 'down', lastWeekRank: 4 },
  ];

  const recentActivities: Activity[] = [
    { id: 1, type: "success", title: "Completed Email Phishing Lab", time: "2 hours ago", icon: Mail, points: 250 },
    { id: 2, type: "warning", title: "Reported suspicious link", time: "5 hours ago", icon: Flag, points: 50 },
    { id: 3, type: "achievement", title: "Earned 'Phishing Expert' Badge", time: "1 day ago", icon: Award, points: 500 },
    { id: 4, type: "info", title: "Started Browser Security Lab", time: "2 days ago", icon: Play },
    { id: 5, type: "success", title: "Completed Security Awareness Quiz", time: "3 days ago", icon: CheckCircle, points: 300 },
  ];

  const inProgressLabs: Lab[] = [
    { 
      id: 1, 
      title: "Browser Security Essentials", 
      category: "Web Security", 
      difficulty: 'Intermediate',
      progress: 65, 
      icon: Shield,
      color: "primary-blue"
    },
    { 
      id: 2, 
      title: "Password Management Pro", 
      category: "Authentication", 
      difficulty: 'Beginner',
      progress: 40, 
      icon: Lock,
      color: "accent-teal"
    },
    { 
      id: 3, 
      title: "Advanced Phishing Detection", 
      category: "Email Security", 
      difficulty: 'Advanced',
      progress: 20, 
      icon: Mail,
      color: "accent-cyan"
    },
  ];

  const handleQuickReport = () => {
    toast.success("Quick Report Submitted! 🚩", {
      description: "Security team has been notified. Thank you for staying vigilant!"
    });
  };

  const handleStartLab = (labTitle: string) => {
    toast.info(`Starting: ${labTitle}`, {
      description: "Loading your training session..."
    });
    setTimeout(() => {
      onNavigate('catalog');
    }, 1000);
  };

  const handleContinueLab = (lab: Lab) => {
    toast.info(`Resuming: ${lab.title}`, {
      description: `${lab.progress}% complete - Let's continue!`
    });
    
    // Navigate based on lab category
    if (lab.category === "Web Security") {
      setTimeout(() => onNavigate('browser-sim'), 800);
    } else if (lab.category === "Email Security") {
      setTimeout(() => onNavigate('email-sim'), 800);
    } else {
      setTimeout(() => onNavigate('catalog'), 800);
    }
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'same') => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3 text-accent-teal" />;
    if (trend === 'down') return <TrendingDown className="w-3 h-3 text-tisap-error" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-background circuit-bg">
      {/* Header */}
      <TISAPHeader title="Employee Dashboard" showRoleSwitcher={false} />

      <main className="max-w-[1440px] mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Welcome Section */}
        <motion.div 
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-foreground mb-2 text-2xl md:text-3xl">Welcome back, Jordan! 👋</h2>
              <p className="text-muted-foreground text-sm md:text-base">Keep up the great work securing our digital environment.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="border-tisap-error text-tisap-error hover:bg-tisap-error hover:text-white transition-all hover:scale-105"
                onClick={handleQuickReport}
              >
                <Flag className="w-4 h-4 mr-2" />
                Quick Report
              </Button>
              
              <Button 
                className="gradient-btn text-white shadow-lg hover:scale-105 transition-transform"
                onClick={() => {
                  toast.success("Taking Quiz! 🎯");
                  setTimeout(() => onNavigate('quiz'), 500);
                }}
              >
                <Zap className="w-4 h-4 mr-2" />
                Take Quiz
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onHoverStart={() => setHoveredCard('score')}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <Card className={`glass-panel border-2 p-6 transition-all duration-300 ${
              hoveredCard === 'score' ? 'border-accent-teal scale-105 shadow-2xl' : 'border-accent-teal/30'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Security Score</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">{animatedScore}</span>
                    <span className="text-muted-foreground">/100</span>
                  </div>
                </div>
                <div className="icon-container-light w-12 h-12 bg-gradient-to-br from-accent-teal to-accent-teal-dark rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <Progress value={animatedScore} className="h-2" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-accent-teal font-medium flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +5 this week
                  </span>
                  <span className="text-muted-foreground">Great progress!</span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onHoverStart={() => setHoveredCard('points')}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <Card className={`glass-panel border-2 p-6 transition-all duration-300 ${
              hoveredCard === 'points' ? 'border-primary-blue scale-105 shadow-2xl' : 'border-primary-blue/30'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Total Points</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">{animatedPoints.toLocaleString()}</span>
                  </div>
                </div>
                <div className="icon-container-light w-12 h-12 bg-gradient-to-br from-primary-blue to-primary-blue-dark rounded-xl flex items-center justify-center shadow-lg">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Rank #4 in company</p>
                <Badge className="bg-primary-blue/20 text-primary-blue border-primary-blue/40 text-xs">
                  Top 5%
                </Badge>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onHoverStart={() => setHoveredCard('badges')}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <Card className={`glass-panel border-2 p-6 transition-all duration-300 ${
              hoveredCard === 'badges' ? 'border-accent-gold scale-105 shadow-2xl' : 'border-accent-gold/30'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Badges Earned</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">{animatedBadges}</span>
                    <span className="text-muted-foreground">/15</span>
                  </div>
                </div>
                <div className="icon-container-light w-12 h-12 bg-gradient-to-br from-accent-gold to-accent-gold-dark rounded-xl flex items-center justify-center shadow-lg pulse-badge">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <Progress value={(animatedBadges / 15) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">7 more to unlock all badges</p>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* In Progress Labs */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-panel border-2 border-primary-blue/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary-blue" />
                  <h3 className="text-foreground text-xl">Continue Learning</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    toast.info("Opening Lab Catalog...");
                    setTimeout(() => onNavigate('catalog'), 500);
                  }}
                  className="text-primary-blue hover:text-primary-blue-dark"
                >
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="space-y-4">
                {inProgressLabs.map((lab, index) => (
                  <motion.div
                    key={lab.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="group"
                  >
                    <Card className="p-4 border-2 border-border hover:border-primary-blue/50 transition-all cursor-pointer hover:shadow-lg"
                      onClick={() => handleContinueLab(lab)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`icon-container-light w-12 h-12 bg-gradient-to-br from-${lab.color} to-${lab.color}-dark rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <lab.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1">
                              <h4 className="text-foreground font-semibold mb-1 group-hover:text-primary-blue transition-colors">
                                {lab.title}
                              </h4>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs text-muted-foreground">{lab.category}</span>
                                <Badge variant="outline" className="text-xs">
                                  {lab.difficulty}
                                </Badge>
                              </div>
                            </div>
                            <span className="text-sm font-medium text-primary-blue whitespace-nowrap">
                              {lab.progress}%
                            </span>
                          </div>
                          <Progress value={lab.progress} className="h-2" />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}

                <Button
                  variant="outline"
                  className="w-full mt-4 border-2 border-dashed border-primary-blue/30 hover:border-primary-blue hover:bg-primary-blue/5"
                  onClick={() => handleStartLab("New Training Module")}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start New Lab
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="glass-panel border-2 border-accent-gold/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-accent-gold" />
                  <h3 className="text-foreground text-xl">Leaderboard</h3>
                </div>
                <Badge className="bg-accent-gold/20 text-accent-gold border-accent-gold/40 pulse-badge">
                  🏆 Live
                </Badge>
              </div>

              <div className="space-y-3">
                {leaderboardData.map((user, index) => (
                  <motion.div
                    key={user.rank}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      user.isCurrentUser 
                        ? 'bg-accent-teal/10 border-2 border-accent-teal shadow-lg' 
                        : 'bg-muted/30 hover:bg-muted/50 border-2 border-transparent'
                    }`}
                  >
                    <div className={`icon-container-light w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      user.rank === 1 ? 'bg-gradient-to-br from-accent-gold to-accent-gold-dark' :
                      user.rank === 2 ? 'bg-gradient-to-br from-tisap-grey-400 to-tisap-grey-500' :
                      user.rank === 3 ? 'bg-gradient-to-br from-tisap-warning to-accent-gold-dark' :
                      'bg-tisap-grey-300'
                    }`}>
                      <span className="text-white">{user.rank}</span>
                    </div>
                    <Avatar className="w-10 h-10 border-2 border-background">
                      <AvatarFallback className="bg-primary-blue text-white text-sm">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground font-medium text-sm truncate">
                        {user.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">
                          {user.points.toLocaleString()} pts
                        </p>
                        {getTrendIcon(user.trend)}
                      </div>
                    </div>
                    {user.rank === 1 && (
                      <Sparkles className="w-4 h-4 text-accent-gold" />
                    )}
                  </motion.div>
                ))}
              </div>

              <Button
                variant="ghost"
                className="w-full mt-4 text-accent-gold hover:text-accent-gold-dark hover:bg-accent-gold/10"
                onClick={() => toast.info("Full leaderboard coming soon! 📊")}
              >
                View Full Rankings
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="glass-panel border-2 border-primary-blue/30 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-blue" />
                <h3 className="text-foreground text-xl">Recent Activity</h3>
              </div>
              
              <div className="flex gap-2">
                {(['week', 'month', 'all'] as const).map((timeframe) => (
                  <Button
                    key={timeframe}
                    variant={selectedTimeframe === timeframe ? 'default' : 'ghost'}
                    size="sm"
                    className={selectedTimeframe === timeframe ? 'gradient-btn text-white' : ''}
                    onClick={() => {
                      setSelectedTimeframe(timeframe);
                      toast.info(`Showing ${timeframe === 'all' ? 'all time' : `this ${timeframe}'s`} activity`);
                    }}
                  >
                    {timeframe === 'week' ? 'Week' : timeframe === 'month' ? 'Month' : 'All'}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary-blue/50 transition-all group cursor-pointer"
                    onClick={() => toast.info(`Viewing: ${activity.title}`)}
                  >
                    <div className={`icon-container-light w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      activity.type === 'success' ? 'bg-accent-teal/20 border border-accent-teal/40' :
                      activity.type === 'warning' ? 'bg-tisap-warning/20 border border-tisap-warning/40' :
                      activity.type === 'achievement' ? 'bg-accent-gold/20 border border-accent-gold/40' :
                      'bg-primary-blue/20 border border-primary-blue/40'
                    }`}>
                      <activity.icon className={`w-5 h-5 ${
                        activity.type === 'success' ? 'text-accent-teal' :
                        activity.type === 'warning' ? 'text-tisap-warning' :
                        activity.type === 'achievement' ? 'text-accent-gold' :
                        'text-primary-blue'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground font-medium group-hover:text-primary-blue transition-colors">
                        {activity.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                        {activity.points && (
                          <>
                            <span className="text-xs text-muted-foreground">•</span>
                            <Badge variant="outline" className="text-xs">
                              +{activity.points} pts
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}