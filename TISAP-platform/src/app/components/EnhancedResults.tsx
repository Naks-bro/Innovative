import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";
import Confetti from "./Confetti";
import {
  Award,
  CheckCircle,
  TrendingUp,
  Target,
  Shield,
  Download,
  Share2,
  Home,
  ChevronRight,
  Trophy,
  Star,
  Zap,
  Medal,
  BookOpen
} from "lucide-react";

interface EnhancedResultsProps {
  results: any;
  onClose: () => void;
  onRetry: () => void;
}

const badges = [
  {
    id: "security-awareness",
    name: "Security Awareness Expert",
    description: "Completed all security awareness modules",
    icon: <Shield className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500",
    earned: true
  },
  {
    id: "phishing-master",
    name: "Phishing Detection Master",
    description: "Scored 100% on phishing identification",
    icon: <Target className="w-8 h-8" />,
    color: "from-emerald-500 to-teal-500",
    earned: true
  },
  {
    id: "quick-learner",
    name: "Quick Learner",
    description: "Completed training in under 20 minutes",
    icon: <Zap className="w-8 h-8" />,
    color: "from-amber-500 to-orange-500",
    earned: true
  },
  {
    id: "perfect-score",
    name: "Perfect Score",
    description: "Achieved 100% on the adaptive quiz",
    icon: <Trophy className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500",
    earned: false
  }
];

const recommendedLabs = [
  {
    id: "advanced-phishing",
    title: "Advanced Phishing Techniques",
    difficulty: "Hard",
    duration: "15-20 min",
    points: 200,
    color: "#EF4444"
  },
  {
    id: "social-engineering",
    title: "Social Engineering Defense",
    difficulty: "Medium",
    duration: "10-15 min",
    points: 150,
    color: "#F59E0B"
  },
  {
    id: "data-protection",
    title: "Data Protection Fundamentals",
    difficulty: "Easy",
    duration: "8-12 min",
    points: 100,
    color: "#10B981"
  }
];

export default function EnhancedResults({ 
  results, 
  onClose, 
  onRetry
}: EnhancedResultsProps) {
  const [showCertificate, setShowCertificate] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  const earnedBadges = badges.filter(b => b.earned);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {showConfetti && <Confetti />}

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass-panel border-2 border-accent-gold/40 bg-slate-900/80 backdrop-blur-2xl p-8 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-32 h-32 bg-gradient-to-br from-accent-gold via-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
            >
              <Award className="w-16 h-16 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-5xl font-bold text-white mb-4"
            >
              Congratulations! 🎉
            </motion.h1>
            <p className="text-xl text-white/80 mb-8">
              You've successfully completed the Security Awareness Training
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-6 bg-white/5 backdrop-blur rounded-xl border border-white/10"
              >
                <div className="text-6xl font-bold text-green-400 mb-2">{results.score}%</div>
                <div className="text-white/60">Final Score</div>
                <div className="mt-3 flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(results.score / 20) ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-6 bg-white/5 backdrop-blur rounded-xl border border-white/10"
              >
                <div className="text-6xl font-bold text-cyan-400 mb-2">{results.labsCompleted}</div>
                <div className="text-white/60">Labs Completed</div>
                <div className="mt-3">
                  <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/40">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    All Done
                  </Badge>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="p-6 bg-white/5 backdrop-blur rounded-xl border border-white/10"
              >
                <div className="text-6xl font-bold text-purple-400 mb-2">{results.badgesEarned}</div>
                <div className="text-white/60">Badges Earned</div>
                <div className="mt-3">
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/40">
                    <Medal className="w-3 h-3 mr-1" />
                    Achievement
                  </Badge>
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                onClick={() => setShowCertificate(true)}
                className="flex-1 py-6 bg-gradient-to-r from-accent-gold to-orange-500 hover:from-accent-gold-dark hover:to-orange-600 text-white text-lg shadow-xl"
              >
                <Award className="w-5 h-5 mr-2" />
                View Certificate
              </Button>
              <Button
                variant="outline"
                onClick={() => onClose()}
                className="flex-1 py-6 border-2 border-white/20 text-white hover:bg-white/10 text-lg"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Earned Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="glass-panel border-2 border-white/10 bg-slate-900/60 backdrop-blur-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Trophy className="w-8 h-8 text-accent-gold" />
              Earned Badges
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: badge.earned ? 1 : 0.4, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="relative group"
                >
                  <Card className={`p-6 border-2 transition-all ${
                    badge.earned 
                      ? 'bg-white/5 border-white/20 hover:border-white/40 hover:shadow-xl' 
                      : 'bg-black/20 border-white/5 grayscale'
                  }`}>
                    {badge.earned && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div 
                      className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg bg-gradient-to-br ${badge.color}`}
                    >
                      <div className="text-white">
                        {badge.icon}
                      </div>
                    </div>
                    <h3 className="font-semibold text-white text-center mb-2">
                      {badge.name}
                    </h3>
                    <p className="text-sm text-white/60 text-center">
                      {badge.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Next Training Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Card className="glass-panel border-2 border-primary-blue/40 bg-slate-900/60 backdrop-blur-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-primary-blue" />
                Recommended Next Steps
              </h2>
              <Badge className="bg-primary-blue/20 text-primary-blue border-primary-blue/40 px-4 py-2">
                Continue Learning
              </Badge>
            </div>
            <p className="text-white/60 mb-6">
              Keep building your security knowledge with these advanced modules
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedLabs.map((lab, index) => (
                <motion.div
                  key={lab.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="cursor-pointer"
                  onClick={() => onRetry()}
                >
                  <Card className="p-6 bg-white/5 border-2 border-white/10 hover:border-white/30 transition-all h-full">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg"
                      style={{ background: lab.color }}
                    >
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">
                      {lab.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-white/10 text-white/80 border-white/20 text-xs">
                        {lab.difficulty}
                      </Badge>
                      <Badge className="bg-white/10 text-white/80 border-white/20 text-xs">
                        {lab.duration}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-accent-gold font-semibold">+{lab.points} pts</span>
                      <ChevronRight className="w-5 h-5 text-white/40" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
        <DialogContent className="max-w-4xl bg-slate-900 border-2 border-accent-gold/40">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white text-center mb-6">
              Security Awareness Certificate
            </DialogTitle>
            <DialogDescription className="sr-only">
              Your official security training certificate
            </DialogDescription>
          </DialogHeader>
          
          {/* Certificate Design */}
          <div className="relative bg-gradient-to-br from-white via-slate-50 to-slate-100 p-12 rounded-xl border-8 border-accent-gold/60 shadow-2xl">
            {/* Decorative Corner Elements */}
            <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-accent-gold"></div>
            <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-accent-gold"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-accent-gold"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-accent-gold"></div>

            {/* Certificate Content */}
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-gradient-to-br from-accent-gold to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
                <Award className="w-12 h-12 text-white" />
              </div>

              <h2 className="text-4xl font-bold text-slate-800 mb-2">
                Certificate of Completion
              </h2>
              
              <div className="h-1 w-32 bg-gradient-to-r from-accent-gold to-orange-500 mx-auto rounded-full"></div>

              <p className="text-lg text-slate-600">
                This certifies that
              </p>

              <h3 className="text-3xl font-bold text-primary-blue">
                [Employee Name]
              </h3>

              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                has successfully completed the <strong>TISAP Labs Security Awareness Training</strong>
                <br />and demonstrated excellent understanding of cybersecurity best practices
              </p>

              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-6">
                <div>
                  <div className="text-3xl font-bold text-primary-blue">{results.score}%</div>
                  <div className="text-sm text-slate-600">Final Score</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-blue">{results.labsCompleted}</div>
                  <div className="text-sm text-slate-600">Labs Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-blue">{results.badgesEarned}</div>
                  <div className="text-sm text-slate-600">Badges Earned</div>
                </div>
              </div>

              <div className="pt-8 flex items-center justify-between max-w-2xl mx-auto">
                <div className="text-left">
                  <div className="h-0.5 w-32 bg-slate-400 mb-2"></div>
                  <div className="text-sm text-slate-600">Date of Completion</div>
                  <div className="font-semibold text-slate-800">
                    {new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
                <div className="text-right">
                  <div className="h-0.5 w-32 bg-slate-400 mb-2 ml-auto"></div>
                  <div className="text-sm text-slate-600">Certificate ID</div>
                  <div className="font-semibold text-slate-800">
                    TISAP-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="flex gap-4 mt-6">
            <Button
              className="flex-1 py-6 bg-gradient-to-r from-primary-blue to-accent-cyan text-white"
              onClick={() => {
                // Download certificate functionality
                toast.success("Certificate downloaded! 📄");
              }}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Certificate
            </Button>
            <Button
              variant="outline"
              className="flex-1 py-6 border-2 border-white/20 text-white hover:bg-white/10"
              onClick={() => {
                // Share certificate functionality
                toast.success("Share link copied! 🔗");
              }}
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}