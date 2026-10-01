import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { useTheme } from "./ThemeProvider";
import TISAPHeader from "./TISAPHeader";
import Confetti from "./Confetti";
import { 
  Award,
  Trophy,
  Target,
  TrendingUp,
  Share2,
  Download,
  Home,
  PlayCircle,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Sun,
  Moon
} from "lucide-react";

interface ResultsBadgeProps {
  onNavigate: (page: string) => void;
}

export default function ResultsBadge({ onNavigate }: ResultsBadgeProps) {
  const { theme, toggleTheme } = useTheme();

  const results = {
    overallScore: 88,
    clickThroughRate: 5, // Lower is better
    reportingAccuracy: 95,
    quizScore: 80,
    timeSpent: "12m 34s",
    passed: true,
    badgeEarned: "Phishing Detective",
    pointsEarned: 350
  };

  const performanceMetrics = [
    {
      label: "Click-Through Rate",
      value: results.clickThroughRate,
      max: 100,
      status: results.clickThroughRate < 10 ? "excellent" : results.clickThroughRate < 25 ? "good" : "needs-improvement",
      description: "Percentage of malicious links clicked (lower is better)",
      icon: Target
    },
    {
      label: "Reporting Accuracy",
      value: results.reportingAccuracy,
      max: 100,
      status: results.reportingAccuracy >= 90 ? "excellent" : results.reportingAccuracy >= 70 ? "good" : "needs-improvement",
      description: "Correctly identified and reported threats",
      icon: AlertTriangle
    },
    {
      label: "Quiz Score",
      value: results.quizScore,
      max: 100,
      status: results.quizScore >= 80 ? "excellent" : results.quizScore >= 60 ? "good" : "needs-improvement",
      description: "Knowledge assessment performance",
      icon: Lightbulb
    }
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "excellent": 
        return { 
          color: "text-emerald-600 dark:text-emerald-400",
          bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
          badge: "bg-emerald-500 text-white border-emerald-600"
        };
      case "good": 
        return { 
          color: "text-amber-600 dark:text-amber-400",
          bg: "bg-amber-500/10 dark:bg-amber-500/20",
          badge: "bg-amber-500 text-white border-amber-600"
        };
      case "needs-improvement": 
        return { 
          color: "text-red-600 dark:text-red-400",
          bg: "bg-red-500/10 dark:bg-red-500/20",
          badge: "bg-red-500 text-white border-red-600"
        };
      default: 
        return { 
          color: "text-muted-foreground",
          bg: "bg-muted",
          badge: "bg-muted text-foreground"
        };
    }
  };

  return (
    <div className="min-h-screen bg-background circuit-bg relative overflow-hidden">
      {/* Confetti Animation */}
      {results.passed && <Confetti />}
      
      {/* Theme Toggle */}
      <Button
        className="fixed top-6 right-6 z-50 glass-panel border-2 border-primary/50 bg-card backdrop-blur-xl text-foreground hover:border-primary transition-all rounded-full w-12 h-12"
        onClick={toggleTheme}
        size="icon"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5 text-accent-cyan" /> : <Moon className="w-5 h-5 text-primary-blue" />}
      </Button>

      {/* Header */}
      <TISAPHeader title="Training Results" />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        {/* Success Banner */}
        <Card className="mb-8 p-8 glass-panel border-2 border-emerald-500/50 dark:border-emerald-500/30 bg-card/95 backdrop-blur-xl fade-in shadow-2xl">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-accent-gold via-amber-500 to-accent-gold rounded-full flex items-center justify-center mx-auto mb-6 pulse-badge shadow-2xl" style={{
              boxShadow: '0 0 40px rgba(243, 192, 77, 0.5)'
            }}>
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-foreground mb-2 text-3xl">Congratulations! 🎉</h2>
            <p className="text-xl text-muted-foreground mb-6">
              You've successfully completed the Email Phishing Lab
            </p>
            <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
              <Badge className="bg-emerald-500 text-white border-emerald-600 px-6 py-2 text-base shadow-lg">Passed</Badge>
              <Badge className="bg-accent-gold text-gray-900 border-accent-gold px-6 py-2 text-base shadow-lg font-bold">+{results.pointsEarned} Points</Badge>
            </div>
            <p className="text-foreground text-2xl font-bold">
              Overall Score: <span className="text-primary">{results.overallScore}%</span>
            </p>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Badge Card */}
          <Card className="lg:col-span-2 p-6 glass-panel border-2 border-primary/30 bg-card/95 backdrop-blur-xl shadow-xl">
            <h2 className="text-foreground mb-6 text-2xl">Achievement Unlocked!</h2>
            
            <div className="bg-gradient-to-br from-accent-gold/20 to-amber-500/20 rounded-xl p-8 border-2 border-accent-gold/60 mb-6 shadow-inner">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-accent-gold to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl" style={{
                  boxShadow: '0 0 60px rgba(243, 192, 77, 0.6)'
                }}>
                  <Award className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-foreground mb-2 text-2xl font-bold">{results.badgeEarned}</h3>
                <p className="text-muted-foreground mb-4">
                  Awarded for exceptional phishing detection and security awareness
                </p>
                <Badge className="bg-accent-gold text-gray-900 border-accent-gold px-4 py-2 shadow-lg font-bold">
                  <Trophy className="w-4 h-4 mr-2" />
                  +{results.pointsEarned} Points
                </Badge>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline"
                className="flex-1 border-2 border-primary/30 bg-card hover:bg-muted text-foreground"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Achievement
              </Button>
              <Button 
                variant="outline"
                className="flex-1 border-2 border-primary/30 bg-card hover:bg-muted text-foreground"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Certificate
              </Button>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6 glass-panel border-2 border-primary/30 bg-card/95 backdrop-blur-xl shadow-xl">
            <h3 className="text-foreground mb-4 text-xl">Performance Summary</h3>
            
            <div className="space-y-4">
              <div className="p-4 glass-panel border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground font-medium">Overall</span>
                  <span className="text-foreground font-bold">{results.overallScore}%</span>
                </div>
                <Progress value={results.overallScore} className="h-2" />
              </div>

              <div className="p-4 glass-panel border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground font-medium">CTR (Lower is better)</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{results.clickThroughRate}%</span>
                </div>
                <Progress value={100 - results.clickThroughRate} className="h-2" />
              </div>

              <div className="p-4 glass-panel border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground font-medium">Reporting</span>
                  <span className="text-foreground font-bold">{results.reportingAccuracy}%</span>
                </div>
                <Progress value={results.reportingAccuracy} className="h-2" />
              </div>

              <div className="p-4 glass-panel border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground font-medium">Quiz</span>
                  <span className="text-foreground font-bold">{results.quizScore}%</span>
                </div>
                <Progress value={results.quizScore} className="h-2" />
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed Breakdown */}
        <Card className="p-6 glass-panel border-2 border-primary/30 bg-card/95 backdrop-blur-xl mb-6 shadow-xl">
          <h3 className="text-foreground mb-6 text-2xl">Detailed Score Breakdown</h3>
          
          <div className="space-y-6">
            {performanceMetrics.map((metric, index) => {
              const Icon = metric.icon;
              const statusConfig = getStatusConfig(metric.status);
              
              return (
                <div key={index}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${statusConfig.bg}`}>
                        <Icon className={`w-5 h-5 ${statusConfig.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="text-foreground font-semibold">{metric.label}</h4>
                          <Badge className={statusConfig.badge}>
                            {metric.status === 'excellent' ? 'Excellent' :
                             metric.status === 'good' ? 'Good' : 'Needs Improvement'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{metric.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${statusConfig.color}`}>
                        {metric.value}%
                      </p>
                    </div>
                  </div>
                  <Progress value={metric.value} className="h-3" />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recommended Next Steps */}
        <Card className="p-6 glass-panel border-2 border-primary/30 bg-card/95 backdrop-blur-xl mb-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-foreground text-xl font-semibold">Recommended Next Steps</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 glass-panel border-2 border-primary/30 bg-card rounded-xl hover:border-primary hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary-blue/20 border border-primary-blue/40 rounded-lg flex items-center justify-center flex-shrink-0">
                  <PlayCircle className="w-5 h-5 text-primary-blue" />
                </div>
                <div>
                  <h4 className="text-foreground mb-1 font-semibold">Advanced Email Analysis</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Master header inspection and domain verification techniques
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                    <Badge className="bg-primary-blue text-white border-primary-blue text-xs">Intermediate</Badge>
                    <span>25 min</span>
                    <span>•</span>
                    <span className="text-accent-gold font-semibold">400 pts</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 glass-panel border-2 border-primary/30 bg-card rounded-xl hover:border-primary hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-amber-500/20 border border-amber-500/40 rounded-lg flex items-center justify-center flex-shrink-0">
                  <PlayCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="text-foreground mb-1 font-semibold">Social Engineering Defense</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Learn to recognize and resist manipulation tactics
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                    <Badge className="bg-amber-500 text-white border-amber-600 text-xs">Advanced</Badge>
                    <span>30 min</span>
                    <span>•</span>
                    <span className="text-accent-gold font-semibold">500 pts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <Button 
            variant="outline"
            className="flex-1 border-2 border-primary/30 bg-card hover:bg-muted text-foreground py-6 text-base font-semibold"
            onClick={() => onNavigate('dashboard')}
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <Button 
            className="flex-1 gradient-btn text-white py-6 text-base font-semibold shadow-lg"
            onClick={() => onNavigate('catalog')}
          >
            <PlayCircle className="w-4 h-4 mr-2" />
            Start Another Lab
          </Button>
        </div>
      </main>
    </div>
  );
}
