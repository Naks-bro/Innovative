import { useState } from "react";
import { ThemeProvider, useTheme } from "./components/ThemeProvider";
import { UserProvider } from "./components/UserContext";
import { Toaster } from "./components/Toaster";
import EmployeeDashboard from "./components/EmployeeDashboard";

// Enhanced Components
import EnhancedLabCatalog from "./components/EnhancedLabCatalog";
import EnhancedWindowsLab from "./components/EnhancedWindowsLab";
import EnhancedQuiz from "./components/EnhancedQuiz";
import EnhancedResults from "./components/EnhancedResults";

// Original Components (keep for backward compatibility)
import BrowserSimulation from "./components/BrowserSimulation";
import EmailSimulation from "./components/EmailSimulation";
import MicroTrainingModal from "./components/MicroTrainingModal";
import AdminSnapshot from "./components/AdminSnapshot";
import DesignSystemSpec from "./components/DesignSystemSpec";

import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { 
  Shield, 
  Users, 
  BookOpen, 
  Palette,
  Layout,
  Smartphone,
  Sun,
  Moon,
  Target,
  Award,
  ChevronRight
} from "lucide-react";
import { motion } from "motion/react";

type Page = 
  | 'landing'
  | 'dashboard' 
  | 'catalog' 
  | 'windows-lab'
  | 'browser-sim' 
  | 'email-sim' 
  | 'micro-training' 
  | 'quiz' 
  | 'results' 
  | 'admin'
  | 'design-system';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [currentLabId, setCurrentLabId] = useState<string>('usb-malware');
  const [quizScore, setQuizScore] = useState<number>(0);
  const [completedLabs, setCompletedLabs] = useState<string[]>([]);
  const { theme, toggleTheme } = useTheme();

  const navigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleStartLab = (labId: string) => {
    setCurrentLabId(labId);
    navigate('windows-lab');
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    if (!completedLabs.includes(currentLabId)) {
      setCompletedLabs([...completedLabs, currentLabId]);
    }
    navigate('results');
  };

  // Landing/Navigation Page
  if (currentPage === 'landing') {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 hero-gradient cyber-mesh"></div>
        
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-blue/8 rounded-full blur-3xl float-animation"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-cyan/8 rounded-full blur-3xl float-animation" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent-teal/6 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Theme Toggle */}
        <Button
          className="fixed top-6 right-6 z-50 glass-panel border-2 border-primary-blue/40 bg-card/80 backdrop-blur-xl text-foreground hover:border-accent-cyan/60 transition-all rounded-full w-12 h-12 shadow-lg"
          onClick={toggleTheme}
          size="icon"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-accent-cyan" /> : <Moon className="w-5 h-5 text-primary-blue" />}
        </Button>

        <div className="relative z-10 container mx-auto px-6 py-16 max-w-7xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-32"
          >
            <div className="icon-container-light w-32 h-32 bg-gradient-to-br from-primary-blue via-accent-cyan to-accent-teal rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl float-animation">
              <Shield className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight leading-tight">
              Transform Human Risk<br />into Cyber Strength
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Train. Simulate. Defend. — A Threat-Informed Security Awareness Platform
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Button 
                className="gradient-btn text-white px-10 py-6 rounded-xl text-lg shadow-xl hover:shadow-2xl transition-all"
                onClick={() => navigate('dashboard')}
              >
                <Shield className="w-5 h-5 mr-2" />
                Get Started
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-primary-blue bg-card/50 backdrop-blur text-primary-blue hover:bg-primary-blue hover:text-white px-10 py-6 rounded-xl text-lg transition-all shadow-lg"
                onClick={() => navigate('catalog')}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                View Labs
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <Badge className="glass-panel border-2 border-primary-blue/40 bg-card/80 backdrop-blur text-foreground px-5 py-3 text-sm shadow-lg">
                🖥️ Desktop (1440px)
              </Badge>
              <Badge className="glass-panel border-2 border-accent-cyan/40 bg-card/80 backdrop-blur text-foreground px-5 py-3 text-sm shadow-lg">
                📱 Mobile (375px)
              </Badge>
              <Badge className="glass-panel border-2 border-accent-teal/40 bg-card/80 backdrop-blur text-foreground px-5 py-3 text-sm shadow-lg">
                ⚡ Responsive
              </Badge>
            </div>
          </motion.div>

          {/* Featured Labs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-32"
          >
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-4 text-4xl">New Enhanced Training Labs</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                Experience realistic Windows 11 simulations with professional UI polish
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  id: 'usb-malware',
                  title: 'USB Malware Trap',
                  description: 'Handle suspicious USB drives safely',
                  color: '#F97316',
                  difficulty: 'Easy',
                  points: 100
                },
                {
                  id: 'phishing-email',
                  title: 'Phishing Email Attack',
                  description: 'Detect malicious attachments',
                  color: '#EF4444',
                  difficulty: 'Medium',
                  points: 150
                },
                {
                  id: 'fake-defender',
                  title: 'Fake Security Alert',
                  description: 'Identify scareware popups',
                  color: '#2563EB',
                  difficulty: 'Medium',
                  points: 150
                }
              ].map((lab, i) => (
                <motion.div
                  key={lab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.03, y: -8 }}
                  className="cursor-pointer"
                  onClick={() => {
                    setCurrentLabId(lab.id);
                    navigate('catalog');
                  }}
                >
                  <Card className="glass-panel light-mode-card border-2 bg-card/80 backdrop-blur-xl shadow-xl p-8 h-full">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                      style={{ background: lab.color }}
                    >
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-foreground mb-3 text-xl font-semibold">
                      {lab.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                      {lab.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-primary-blue/20 text-primary-blue border border-primary-blue/40">
                        {lab.difficulty}
                      </Badge>
                      <span className="text-accent-gold font-bold">+{lab.points} pts</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                onClick={() => navigate('catalog')}
                className="gradient-btn text-white px-8 py-4 rounded-xl shadow-xl"
              >
                View All 5 Labs
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>

          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-foreground mb-4 text-4xl">Explore All Pages</h2>
              <p className="text-muted-foreground text-lg">Complete prototype with all features</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: 'dashboard', title: 'Employee Dashboard', icon: <Layout />, badge: 'Interactive' },
                { id: 'catalog', title: 'Enhanced Lab Catalog', icon: <BookOpen />, badge: '🆕 New' },
                { id: 'admin', title: 'Admin Dashboard', icon: <Users />, badge: 'Admin' },
                { id: 'design-system', title: 'Design System', icon: <Palette />, badge: 'Specs' }
              ].map((item) => (
                <Card 
                  key={item.id}
                  className="glass-card light-mode-card border-2 bg-card/80 backdrop-blur-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group p-6"
                  onClick={() => navigate(item.id as Page)}
                >
                  <div className="icon-container-light w-16 h-16 bg-gradient-to-br from-primary-blue to-accent-cyan rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <div className="text-white w-8 h-8 flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-foreground mb-2 text-lg font-semibold">{item.title}</h3>
                  <Badge className="bg-primary-blue/20 text-primary-blue border border-primary-blue/40">
                    {item.badge}
                  </Badge>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Render the appropriate page based on navigation
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <EmployeeDashboard onNavigate={navigate} />;
      
      case 'catalog':
        return <EnhancedLabCatalog 
          onNavigate={navigate} 
          onBack={() => navigate('dashboard')} 
          onStartLab={handleStartLab}
        />;
      
      case 'windows-lab':
        return <EnhancedWindowsLab 
          onNavigate={navigate} 
          onBack={() => navigate('catalog')}
          labId={currentLabId}
        />;
      
      case 'quiz':
        return <EnhancedQuiz 
          onNavigate={navigate}
          labId={currentLabId}
        />;
      
      case 'results':
        return <EnhancedResults 
          onNavigate={navigate}
          score={quizScore}
          labsCompleted={completedLabs.length}
          badgesEarned={3}
        />;
      
      case 'browser-sim':
        return <BrowserSimulation onNavigate={navigate} onBack={() => navigate('catalog')} />;
      
      case 'email-sim':
        return <EmailSimulation onNavigate={navigate} onBack={() => navigate('catalog')} />;
      
      case 'micro-training':
        return <MicroTrainingModal onNavigate={navigate} />;
      
      case 'admin':
        return <AdminSnapshot onBack={() => navigate('landing')} />;
      
      case 'design-system':
        return <DesignSystemSpec onBack={() => navigate('landing')} />;
      
      default:
        return <EmployeeDashboard onNavigate={navigate} />;
    }
  };

  return (
    <div className="relative">
      <Toaster />
      {/* Floating Navigation Button */}
      {currentPage !== 'landing' && (
        <Button
          className="fixed bottom-6 right-6 z-50 bg-tisap-teal hover:bg-tisap-teal-dark text-white shadow-2xl rounded-full px-6 py-6"
          onClick={() => navigate('landing')}
        >
          <Layout className="w-4 h-4 mr-2" />
          View All Pages
        </Button>
      )}
      
      {renderPage()}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  );
}
