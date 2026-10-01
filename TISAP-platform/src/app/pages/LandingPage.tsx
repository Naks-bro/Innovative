import React from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import { useTheme } from '../components/ThemeProvider';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import GlassCard from '../components/shared/GlassCard';
import GradientButton from '../components/shared/GradientButton';
import IconContainer from '../components/shared/IconContainer';
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
  Award
} from 'lucide-react';
import { motion } from 'motion/react';

/**
 * Landing page with hero section and navigation to all app pages
 */
export default function LandingPage() {
  const { navigate } = useNavigation();
  const { theme, toggleTheme } = useTheme();

  const navigationCards = [
    {
      id: 'dashboard',
      title: 'Employee Dashboard',
      description: 'User profile, risk score, leaderboard, activity feed, quick actions',
      icon: <Layout className="w-8 h-8" />,
      variant: 'blue' as const,
      badge: 'Interactive'
    },
    {
      id: 'catalog',
      title: 'Lab Catalog',
      description: 'Category filters, lab cards with difficulty and points',
      icon: <BookOpen className="w-8 h-8" />,
      variant: 'cyan' as const,
      badge: 'Interactive'
    },
    {
      id: 'windows-sim',
      title: 'Windows Simulation',
      description: 'Ransomware pop-ups, fake security alerts, timeline',
      icon: <Shield className="w-8 h-8" />,
      variant: 'teal' as const,
      badge: 'Lab Exercise'
    },
    {
      id: 'browser-sim',
      title: 'Browser Simulation',
      description: 'Malicious extensions, fake captcha, insecure sites',
      icon: <Shield className="w-8 h-8" />,
      variant: 'blue' as const,
      badge: 'Lab Exercise'
    },
    {
      id: 'email-sim',
      title: 'Email Simulation',
      description: 'Phishing detection, header inspection, hover tooltips',
      icon: <Shield className="w-8 h-8" />,
      variant: 'cyan' as const,
      badge: 'Lab Exercise'
    },
    {
      id: 'micro-training',
      title: 'Micro-Training',
      description: 'Quick checks, immediate feedback, progress tracking',
      icon: <BookOpen className="w-8 h-8" />,
      variant: 'teal' as const,
      badge: 'Training'
    },
    {
      id: 'quiz',
      title: 'Adaptive Quiz',
      description: 'Timed questions, instant feedback, difficulty progression',
      icon: <BookOpen className="w-8 h-8" />,
      variant: 'blue' as const,
      badge: 'Assessment'
    },
    {
      id: 'results',
      title: 'Results & Badges',
      description: 'Score breakdown, earned badges, recommendations',
      icon: <Shield className="w-8 h-8" />,
      variant: 'gold' as const,
      badge: 'Achievement'
    },
    {
      id: 'admin',
      title: 'Admin Dashboard',
      description: 'Campaign management, team stats, risk heatmap',
      icon: <Users className="w-8 h-8" />,
      variant: 'cyan' as const,
      badge: 'Admin View'
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 hero-gradient cyber-mesh" />
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-blue/8 rounded-full blur-3xl float-animation" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-cyan/8 rounded-full blur-3xl float-animation" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent-teal/6 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }} />
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
          <IconContainer
            icon={<Shield className="w-16 h-16" />}
            size="xl"
            variant="gradient"
            className="mx-auto mb-8"
          />
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight leading-tight">
            Transform Human Risk<br />into Cyber Strength
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Train. Simulate. Defend. — A Threat-Informed Security Awareness Platform
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <GradientButton
              onClick={() => navigate('dashboard')}
              icon={<Shield className="w-5 h-5" />}
              size="lg"
            >
              Get Started
            </GradientButton>
            
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

        {/* All Pages Navigation */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-foreground mb-4 text-4xl">Complete Prototype Pages</h2>
            <p className="text-muted-foreground text-lg">Explore all interactive components and simulations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {navigationCards.map((card, index) => (
              <GlassCard
                key={card.id}
                variant="light"
                hover
                onClick={() => navigate(card.id as any)}
                delay={index * 0.05}
                className="p-6"
              >
                <IconContainer
                  icon={card.icon}
                  variant={card.variant}
                  size="md"
                  className="mb-4 group-hover:scale-110 transition-transform"
                />
                <h3 className="text-foreground mb-2 text-lg">{card.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {card.description}
                </p>
                <Badge className={`bg-${card.variant === 'blue' ? 'primary-blue' : `accent-${card.variant}`}/20 text-${card.variant === 'blue' ? 'primary-blue' : `accent-${card.variant}`} border border-${card.variant === 'blue' ? 'primary-blue' : `accent-${card.variant}`}/40`}>
                  {card.badge}
                </Badge>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Design System Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard
            variant="light"
            hover
            onClick={() => navigate('design-system')}
            className="p-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <IconContainer
                icon={<Palette className="w-12 h-12" />}
                size="xl"
                variant="gradient"
              />
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-foreground mb-3 text-2xl">Complete Design System</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Color palette, typography scale, component library, icon set, state variations, and copy-ready specifications
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge className="bg-primary-blue/20 text-primary-blue border-2 border-primary-blue/40">Colors</Badge>
                  <Badge className="bg-accent-cyan/20 text-accent-cyan border-2 border-accent-cyan/40">Typography</Badge>
                  <Badge className="bg-accent-gold/20 text-accent-gold border-2 border-accent-gold/40">Components</Badge>
                  <Badge className="bg-accent-teal/20 text-accent-teal border-2 border-accent-teal/40">Icons</Badge>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
