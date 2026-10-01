import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { motion, AnimatePresence } from "motion/react";
import GlassCard from "./shared/GlassCard";
import {
  Search,
  Filter,
  ChevronLeft,
  Shield,
  Usb,
  Mail,
  ShieldAlert,
  Chrome,
  MessageSquare,
  Clock,
  Award,
  TrendingUp,
  CheckCircle,
  Lock,
  Target
} from "lucide-react";

interface Lab {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  duration: string;
  points: number;
  category: string;
  icon: React.ReactNode;
  accentColor: string;
  completed: boolean;
  locked: boolean;
}

interface EnhancedLabCatalogProps {
  onNavigate: (page: string) => void;
  onBack: () => void;
  onStartLab: (labId: string) => void;
}

const labs: Lab[] = [
  {
    id: "usb-malware",
    title: "USB Malware Trap",
    description: "Learn to identify and handle suspicious USB drives safely. Practice proper USB device handling protocols.",
    difficulty: "easy",
    duration: "8-10 min",
    points: 100,
    category: "Physical Security",
    icon: <Usb className="w-6 h-6" />,
    accentColor: "#F97316",
    completed: false,
    locked: false
  },
  {
    id: "phishing-email",
    title: "Phishing Email Attachment",
    description: "Master the art of recognizing malicious email attachments and social engineering tactics.",
    difficulty: "medium",
    duration: "10-12 min",
    points: 150,
    category: "Email Security",
    icon: <Mail className="w-6 h-6" />,
    accentColor: "#EF4444",
    completed: false,
    locked: false
  },
  {
    id: "fake-defender",
    title: "Fake Windows Defender Alert",
    description: "Learn to distinguish genuine security alerts from sophisticated scareware and fake antivirus popups.",
    difficulty: "medium",
    duration: "10-12 min",
    points: 150,
    category: "Malware Detection",
    icon: <ShieldAlert className="w-6 h-6" />,
    accentColor: "#2563EB",
    completed: false,
    locked: false
  },
  {
    id: "browser-extension",
    title: "Suspicious Browser Extension",
    description: "Identify malicious browser extensions and understand permission risks associated with browser plugins.",
    difficulty: "easy",
    duration: "8-10 min",
    points: 100,
    category: "Web Security",
    icon: <Chrome className="w-6 h-6" />,
    accentColor: "#10B981",
    completed: false,
    locked: false
  },
  {
    id: "fake-it-chat",
    title: "Fake IT Chat Support",
    description: "Advanced training on verifying IT support authenticity and defending against sophisticated social engineering.",
    difficulty: "hard",
    duration: "15-18 min",
    points: 200,
    category: "Social Engineering",
    icon: <MessageSquare className="w-6 h-6" />,
    accentColor: "#8B5CF6",
    completed: false,
    locked: false
  },
  {
    id: "ransomware-defense",
    title: "Ransomware Defense",
    description: "Understand ransomware attack vectors and learn critical response procedures.",
    difficulty: "hard",
    duration: "15-20 min",
    points: 200,
    category: "Malware Detection",
    icon: <ShieldAlert className="w-6 h-6" />,
    accentColor: "#DC2626",
    completed: false,
    locked: true
  }
];

const categories = ["All", "Physical Security", "Email Security", "Malware Detection", "Web Security", "Social Engineering"];
const difficulties = ["All", "Easy", "Medium", "Hard"];

export default function EnhancedLabCatalog({ onNavigate, onBack, onStartLab }: EnhancedLabCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");

  const difficultyConfig = {
    easy: { color: "#10B981", emoji: "🟢", label: "Easy" },
    medium: { color: "#F59E0B", emoji: "🟡", label: "Medium" },
    hard: { color: "#EF4444", emoji: "🔴", label: "Hard" }
  };

  // Filter and sort labs
  const filteredLabs = labs.filter(lab => {
    const matchesSearch = lab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lab.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || lab.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || 
                             lab.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const sortedLabs = [...filteredLabs].sort((a, b) => {
    if (sortBy === "points") return b.points - a.points;
    if (sortBy === "difficulty") {
      const order = { easy: 1, medium: 2, hard: 3 };
      return order[a.difficulty] - order[b.difficulty];
    }
    return 0; // recommended (default order)
  });

  const stats = {
    total: labs.length,
    completed: labs.filter(l => l.completed).length,
    inProgress: labs.filter(l => !l.completed && !l.locked).length,
    totalPoints: labs.reduce((sum, lab) => sum + (lab.completed ? lab.points : 0), 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass-panel border-2 border-white/10 bg-slate-900/60 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={onBack}
                  className="text-white hover:bg-white/10"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">
                    Security Lab Catalog
                  </h1>
                  <p className="text-white/60">
                    Choose from {filteredLabs.length} interactive training scenarios
                  </p>
                </div>
              </div>
              <Button
                onClick={() => onNavigate('dashboard')}
                variant="outline"
                className="border-2 border-white/20 text-white hover:bg-white/10"
              >
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-blue to-accent-cyan rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{stats.total}</div>
                    <div className="text-xs text-white/60">Total Labs</div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{stats.completed}</div>
                    <div className="text-xs text-white/60">Completed</div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{stats.inProgress}</div>
                    <div className="text-xs text-white/60">Available</div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-gold to-amber-600 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{stats.totalPoints}</div>
                    <div className="text-xs text-white/60">Points Earned</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-panel border-2 border-white/10 bg-slate-900/60 backdrop-blur-xl p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    placeholder="Search labs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-primary-blue"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category 
                      ? "bg-primary-blue hover:bg-primary-blue-dark text-white" 
                      : "border-white/20 text-white hover:bg-white/10"
                    }
                    size="sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Difficulty Filter */}
              <div className="flex gap-2">
                {difficulties.map(diff => (
                  <Button
                    key={diff}
                    variant={selectedDifficulty === diff ? "default" : "outline"}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={selectedDifficulty === diff 
                      ? "bg-accent-cyan hover:bg-accent-cyan-dark text-white" 
                      : "border-white/20 text-white hover:bg-white/10"
                    }
                    size="sm"
                  >
                    {diff}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Labs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {sortedLabs.map((lab, index) => {
              const diff = difficultyConfig[lab.difficulty];
              
              return (
                <motion.div
                  key={lab.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.03, y: -8 }}
                  className="relative"
                >
                  <Card className={`p-6 h-full border-2 transition-all ${
                    lab.locked 
                      ? 'bg-black/40 border-white/5 opacity-60 cursor-not-allowed' 
                      : 'bg-white/5 border-white/10 hover:border-white/30 cursor-pointer hover:shadow-2xl'
                  }`}
                    onClick={() => !lab.locked && onStartLab(lab.id)}
                  >
                    {/* Lock Badge */}
                    {lab.locked && (
                      <div className="absolute top-4 right-4">
                        <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                          <Lock className="w-5 h-5 text-white/60" />
                        </div>
                      </div>
                    )}

                    {/* Completed Badge */}
                    {lab.completed && (
                      <div className="absolute top-4 right-4">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    )}

                    {/* Lab Icon */}
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                      style={{ background: lab.accentColor }}
                    >
                      <div className="text-white">
                        {lab.icon}
                      </div>
                    </div>

                    {/* Lab Info */}
                    <div className="mb-4">
                      <Badge className="bg-white/10 text-white/80 border-white/20 text-xs mb-3">
                        {lab.category}
                      </Badge>
                      <h3 className="font-bold text-white text-lg mb-2">
                        {lab.title}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {lab.description}
                      </p>
                    </div>

                    {/* Lab Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-3">
                        <Badge 
                          className="text-xs"
                          style={{ 
                            background: `${diff.color}20`,
                            color: diff.color,
                            borderColor: `${diff.color}40`
                          }}
                        >
                          {diff.emoji} {diff.label}
                        </Badge>
                        <div className="flex items-center gap-1 text-white/60 text-xs">
                          <Clock className="w-3 h-3" />
                          {lab.duration}
                        </div>
                      </div>
                      <div className="text-accent-gold font-bold">
                        +{lab.points} pts
                      </div>
                    </div>

                    {/* Start Button */}
                    {!lab.locked && !lab.completed && (
                      <Button
                        className="w-full mt-4"
                        style={{ 
                          background: `linear-gradient(135deg, ${lab.accentColor} 0%, ${lab.accentColor}dd 100%)`,
                          color: 'white'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onStartLab(lab.id);
                        }}
                      >
                        Start Lab
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}

                    {lab.completed && (
                      <Button
                        variant="outline"
                        className="w-full mt-4 border-2 border-green-500/40 text-green-400 hover:bg-green-500/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          onStartLab(lab.id);
                        }}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Review Lab
                      </Button>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {sortedLabs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-white/40" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No labs found
            </h3>
            <p className="text-white/60">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
