import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { useTheme } from "./ThemeProvider";
import { 
  Shield, 
  Monitor,
  Globe,
  Mail,
  Wifi,
  Clock,
  Award,
  ChevronLeft,
  Filter,
  Search,
  Sun,
  Moon,
  Target,
  TrendingUp,
  ArrowUpDown,
  CheckCircle2,
  PlayCircle,
  Star,
  Users,
  Zap,
  Activity
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface LabCatalogProps {
  onNavigate: (page: string) => void;
  onBack: () => void;
}

export default function LabCatalog({ onNavigate, onBack }: LabCatalogProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const { theme, toggleTheme } = useTheme();

  const labs = [
    {
      id: 1,
      title: "Detecting Ransomware Pop-ups",
      category: "Windows",
      duration: "15 min",
      difficulty: "Intermediate",
      points: 250,
      description: "Learn to identify and respond to fake system warning pop-ups and ransomware threats.",
      icon: Monitor,
      progress: 65,
      color: "primary-blue",
      completedBy: 3247,
      rating: 4.8,
      isPopular: true,
      isRecommended: true
    },
    {
      id: 2,
      title: "Phishing Email Detection",
      category: "Email",
      duration: "20 min",
      difficulty: "Beginner",
      points: 200,
      description: "Identify malicious email patterns, suspicious links, and header manipulation techniques.",
      icon: Mail,
      progress: 0,
      color: "accent-teal",
      completedBy: 5821,
      rating: 4.9,
      isPopular: true,
      isRecommended: true
    },
    {
      id: 3,
      title: "Malicious Browser Extensions",
      category: "Browser",
      duration: "25 min",
      difficulty: "Advanced",
      points: 350,
      description: "Recognize harmful browser extensions and understand permission exploitation.",
      icon: Globe,
      progress: 100,
      color: "accent-cyan",
      completedBy: 1893,
      rating: 4.7,
      isPopular: false,
      isRecommended: false
    },
    {
      id: 4,
      title: "Fake Captcha & Ad Threats",
      category: "Browser",
      duration: "10 min",
      difficulty: "Beginner",
      points: 150,
      description: "Spot fake captcha prompts and malicious advertisements designed to trick users.",
      icon: Globe,
      progress: 0,
      color: "accent-cyan",
      completedBy: 4156,
      rating: 4.6,
      isPopular: false,
      isRecommended: true
    },
    {
      id: 5,
      title: "IoT Device Security Basics",
      category: "IoT",
      duration: "30 min",
      difficulty: "Intermediate",
      points: 300,
      description: "Secure smart devices and understand IoT vulnerability patterns.",
      icon: Wifi,
      progress: 30,
      color: "accent-teal",
      completedBy: 2104,
      rating: 4.5,
      isPopular: false,
      isRecommended: false
    },
    {
      id: 6,
      title: "Windows Security Warnings",
      category: "Windows",
      duration: "18 min",
      difficulty: "Beginner",
      points: 175,
      description: "Distinguish between legitimate and fake Windows security alerts.",
      icon: Monitor,
      progress: 0,
      color: "primary-blue",
      completedBy: 3891,
      rating: 4.7,
      isPopular: true,
      isRecommended: false
    },
  ];

  const filteredLabs = labs.filter(lab => {
    const matchesFilter = activeFilter === "All" || lab.category === activeFilter;
    const matchesSearch = lab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lab.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sort labs
  const sortedLabs = [...filteredLabs].sort((a, b) => {
    switch (sortBy) {
      case "difficulty":
        const difficultyOrder = { "Beginner": 1, "Intermediate": 2, "Advanced": 3 };
        return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - 
               difficultyOrder[b.difficulty as keyof typeof difficultyOrder];
      case "duration":
        return parseInt(a.duration) - parseInt(b.duration);
      case "points":
        return b.points - a.points;
      case "popular":
        return b.completedBy - a.completedBy;
      case "rating":
        return b.rating - a.rating;
      default: // recommended
        return (b.isRecommended ? 1 : 0) - (a.isRecommended ? 1 : 0);
    }
  });

  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": 
        return { 
          bg: "bg-emerald-500/20 dark:bg-emerald-500/30", 
          text: "text-emerald-700 dark:text-emerald-400", 
          border: "border-emerald-500/50",
          glow: "shadow-emerald-500/20"
        };
      case "Intermediate": 
        return { 
          bg: "bg-blue-500/20 dark:bg-blue-500/30", 
          text: "text-blue-700 dark:text-blue-400", 
          border: "border-blue-500/50",
          glow: "shadow-blue-500/20"
        };
      case "Advanced": 
        return { 
          bg: "bg-amber-500/20 dark:bg-amber-500/30", 
          text: "text-amber-700 dark:text-amber-400", 
          border: "border-amber-500/50",
          glow: "shadow-amber-500/20"
        };
      default: 
        return { 
          bg: "bg-muted", 
          text: "text-muted-foreground", 
          border: "border-muted",
          glow: ""
        };
    }
  };

  const filters = [
    { value: "All", label: "All Labs", icon: Shield, count: labs.length },
    { value: "Windows", label: "Windows", icon: Monitor, count: labs.filter(l => l.category === "Windows").length },
    { value: "Browser", label: "Browser", icon: Globe, count: labs.filter(l => l.category === "Browser").length },
    { value: "Email", label: "Email", icon: Mail, count: labs.filter(l => l.category === "Email").length },
    { value: "IoT", label: "IoT", icon: Wifi, count: labs.filter(l => l.category === "IoT").length },
  ];

  // Calculate stats
  const stats = {
    total: labs.length,
    completed: labs.filter(l => l.progress === 100).length,
    inProgress: labs.filter(l => l.progress > 0 && l.progress < 100).length,
    notStarted: labs.filter(l => l.progress === 0).length,
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 hero-gradient cyber-mesh"></div>
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary-blue/10 rounded-full blur-3xl float-animation"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent-cyan/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Theme Toggle */}
      <Button
        className="fixed top-6 right-6 z-50 glass-panel border-2 border-primary/50 bg-card backdrop-blur-xl text-foreground hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all rounded-full w-12 h-12"
        onClick={toggleTheme}
        size="icon"
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-accent-cyan" />
        ) : (
          <Moon className="w-5 h-5 text-primary-blue" />
        )}
      </Button>

      {/* Header */}
      <div className="relative z-10">
        <div className="glass-panel border-b-2 border-primary/30 bg-card/80 backdrop-blur-xl shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <Button 
                variant="ghost" 
                className="text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all"
                onClick={onBack}
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back to Dashboard
              </Button>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-blue via-accent-cyan to-accent-teal rounded-2xl flex items-center justify-center shadow-2xl glow-blue float-animation">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl text-foreground mb-1">Lab Catalog</h1>
                  <p className="text-base sm:text-lg text-muted-foreground">
                    Master cybersecurity through hands-on simulations
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="glass-panel border border-primary/30 bg-card/60 backdrop-blur-md px-4 py-2 rounded-xl">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-foreground font-semibold">{stats.completed}</span>
                    <span className="text-xs text-muted-foreground">Completed</span>
                  </div>
                </div>
                <div className="glass-panel border border-primary/30 bg-card/60 backdrop-blur-md px-4 py-2 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-foreground font-semibold">{stats.inProgress}</span>
                    <span className="text-xs text-muted-foreground">In Progress</span>
                  </div>
                </div>
                <div className="glass-panel border border-primary/30 bg-card/60 backdrop-blur-md px-4 py-2 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-accent-cyan" />
                    <span className="text-sm text-foreground font-semibold">{stats.notStarted}</span>
                    <span className="text-xs text-muted-foreground">Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated Glow Line */}
            <div className="h-1 bg-gradient-to-r from-primary-blue via-accent-cyan to-accent-teal rounded-full glow-blue" 
                 style={{ width: '200px' }}></div>
          </div>
        </div>

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Search, Filter & Sort Section */}
          <Card className="glass-panel border-2 border-primary/30 bg-card/90 backdrop-blur-xl p-4 sm:p-6 mb-8 shadow-xl">
            <div className="flex flex-col gap-6">
              {/* Search and Sort Row */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Search labs by title or description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-11 h-12 glass-panel border-2 border-primary/30 bg-input-background backdrop-blur text-foreground placeholder:text-muted-foreground focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Sort Dropdown */}
                <div className="w-full sm:w-64">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-12 glass-panel border-2 border-primary/30 bg-input-background backdrop-blur text-foreground focus:border-primary transition-all shadow-sm">
                      <ArrowUpDown className="w-4 h-4 mr-2 text-muted-foreground" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="glass-panel border-2 border-primary/30 bg-card backdrop-blur-xl">
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="difficulty">Difficulty</SelectItem>
                      <SelectItem value="duration">Duration</SelectItem>
                      <SelectItem value="points">Points</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Filter className="w-5 h-5" />
                  <span className="text-sm font-semibold">Category:</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {filters.map((filter) => {
                    const Icon = filter.icon;
                    const isActive = activeFilter === filter.value;
                    return (
                      <button
                        key={filter.value}
                        onClick={() => setActiveFilter(filter.value)}
                        className={`
                          px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium
                          transition-all duration-300 border-2 shadow-sm
                          ${isActive 
                            ? 'bg-gradient-to-r from-primary-blue to-accent-cyan text-white border-transparent shadow-lg shadow-primary/30 scale-105' 
                            : 'bg-card/50 text-foreground border-primary/30 hover:bg-primary/10 hover:border-primary/50 hover:text-foreground'
                          }
                        `}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{filter.label}</span>
                        <Badge className={`ml-1 ${isActive ? 'bg-white/20' : 'bg-muted'} text-xs px-1.5 py-0.5`}>
                          {filter.count}
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="text-foreground font-semibold">{sortedLabs.length}</span> of <span className="text-foreground font-semibold">{labs.length}</span> labs
                </p>
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Clear search
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Lab Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedLabs.map((lab) => {
              const Icon = lab.icon;
              const difficultyConfig = getDifficultyConfig(lab.difficulty);
              
              return (
                <Card 
                  key={lab.id} 
                  className="glass-card light-mode-card border-2 border-primary/30 bg-card/90 backdrop-blur-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 overflow-hidden group cursor-pointer neon-border card-hover relative"
                  onClick={() => {
                    if (lab.category === "Windows") onNavigate('windows-sim');
                    else if (lab.category === "Browser") onNavigate('browser-sim');
                    else if (lab.category === "Email") onNavigate('email-sim');
                    else alert('Lab starting...');
                  }}
                >
                  {/* Badges for Popular/Recommended */}
                  {(lab.isPopular || lab.isRecommended) && (
                    <div className="absolute top-4 right-4 z-10 flex gap-2">
                      {lab.isRecommended && (
                        <Badge className="bg-gradient-to-r from-accent-cyan to-primary-blue text-white border-0 shadow-lg text-xs px-2 py-1">
                          <Zap className="w-3 h-3 mr-1" />
                          Recommended
                        </Badge>
                      )}
                      {lab.isPopular && (
                        <Badge className="bg-gradient-to-r from-accent-gold to-amber-500 text-white border-0 shadow-lg text-xs px-2 py-1">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Top Color Bar */}
                  <div className="h-2 bg-gradient-to-r from-primary-blue via-accent-cyan to-accent-teal"></div>
                  
                  <div className="p-6">
                    {/* Header with Icon */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="icon-container-light w-14 h-14 bg-gradient-to-br from-primary-blue to-accent-cyan rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={`${difficultyConfig.bg} ${difficultyConfig.text} border-2 ${difficultyConfig.border} font-semibold px-3 py-1 shadow-sm ${difficultyConfig.glow}`}>
                          {lab.difficulty}
                        </Badge>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-foreground mb-3 text-xl font-semibold group-hover:text-primary transition-colors leading-tight">
                      {lab.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                      {lab.description}
                    </p>

                    {/* Progress Bar (if started) */}
                    {lab.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground font-semibold">Progress</span>
                          <span className="text-xs text-primary font-bold">{lab.progress}%</span>
                        </div>
                        <div className="h-2.5 bg-muted/80 border border-border rounded-full overflow-hidden shadow-inner">
                          <div 
                            className="h-full bg-gradient-to-r from-primary-blue to-accent-cyan rounded-full transition-all duration-500 shadow-lg"
                            style={{ width: `${lab.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Meta Info Row 1: Duration and Points */}
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/50">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground font-medium">{lab.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-accent-gold" />
                        <span className="text-sm text-accent-gold font-bold">{lab.points} pts</span>
                      </div>
                    </div>

                    {/* Meta Info Row 2: Rating and Users */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-accent-gold fill-accent-gold" />
                        <span className="text-sm text-foreground font-medium">{lab.rating}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{lab.completedBy.toLocaleString()} completed</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button 
                      className={`w-full gradient-btn text-white rounded-xl py-6 shadow-lg hover:shadow-2xl hover:shadow-primary/30 transition-all font-semibold text-base ${
                        lab.progress === 100 ? 'opacity-90' : ''
                      }`}
                    >
                      {lab.progress === 100 ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 mr-2" />
                          Completed • Replay
                        </>
                      ) : lab.progress > 0 ? (
                        <>
                          <PlayCircle className="w-5 h-5 mr-2" />
                          Continue Lab
                        </>
                      ) : (
                        <>
                          <Shield className="w-5 h-5 mr-2" />
                          Start Lab
                        </>
                      )}
                    </Button>

                    {/* Category Tag */}
                    <div className="mt-3 flex items-center justify-center">
                      <Badge className="bg-muted/80 text-muted-foreground border border-border text-xs px-3 py-1">
                        {lab.category}
                      </Badge>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Empty State */}
          {sortedLabs.length === 0 && (
            <Card className="glass-panel border-2 border-primary/30 bg-card/90 backdrop-blur-xl p-16 text-center shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-blue to-accent-cyan rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg glow-blue">
                <Search className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-foreground mb-3 text-2xl font-semibold">No labs found</h3>
              <p className="text-muted-foreground mb-6 text-lg max-w-md mx-auto">
                We couldn't find any labs matching your criteria. Try adjusting your filters or search query.
              </p>
              <Button 
                variant="outline"
                className="border-2 border-primary bg-card/50 backdrop-blur text-primary hover:bg-primary hover:text-white px-8 py-6 rounded-xl text-base shadow-lg font-semibold"
                onClick={() => {
                  setActiveFilter("All");
                  setSearchQuery("");
                }}
              >
                Clear All Filters
              </Button>
            </Card>
          )}

          {/* Pagination */}
          {sortedLabs.length > 0 && (
            <div className="mt-12 flex justify-center">
              <div className="glass-panel border-2 border-primary/30 bg-card/80 backdrop-blur-xl p-2 rounded-2xl shadow-lg flex items-center gap-2">
                <button className="w-11 h-11 rounded-xl bg-gradient-to-r from-primary-blue to-accent-cyan text-white flex items-center justify-center shadow-lg glow-blue font-semibold hover:scale-105 transition-transform">
                  1
                </button>
                <button className="w-11 h-11 rounded-xl border-2 border-primary/30 bg-transparent text-foreground hover:bg-primary/20 flex items-center justify-center transition-all font-medium">
                  2
                </button>
                <button className="w-11 h-11 rounded-xl border-2 border-primary/30 bg-transparent text-foreground hover:bg-primary/20 flex items-center justify-center transition-all font-medium">
                  3
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}