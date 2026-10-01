import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { useState, useEffect } from "react";
import { 
  Shield, 
  Users, 
  TrendingUp, 
  Award,
  Zap,
  Target,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Brain,
  Trophy,
  Mail,
  Chrome,
  Monitor,
  Lock,
  Sparkles,
  Activity,
  Globe2,
  Play,
  X
} from "lucide-react";

interface ProfessionalLandingPageProps {
  onGetStarted: () => void;
}

export default function ProfessionalLandingPage({ onGetStarted }: ProfessionalLandingPageProps) {
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Prevent scrolling when video modal is open
  useEffect(() => {
    if (showVideoModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showVideoModal]);

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showVideoModal) {
        setShowVideoModal(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showVideoModal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Video Modal Overlay */}
      {showVideoModal && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-xl"
          onClick={() => setShowVideoModal(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setShowVideoModal(false)}
            className="absolute top-6 right-6 z-[10000] p-3 bg-slate-900/80 hover:bg-slate-800 rounded-full text-white transition-all hover:scale-110 group"
            aria-label="Close video"
          >
            <X className="w-6 h-6" />
            <span className="absolute -bottom-10 right-0 text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-slate-900 px-3 py-1 rounded">
              Press ESC
            </span>
          </button>

          {/* Video Container - Medium Size */}
          <div 
            className="relative w-full max-w-4xl mx-4" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Iframe */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-blue-500/30 bg-slate-900">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://app.heygen.com/embedded-player/8b8fd9f2f81247a0a282775dd1aa0c4a" 
                title="HeyGen video player" 
                frameBorder="0" 
                allow="encrypted-media; fullscreen;" 
                allowFullScreen
                className="w-full h-full"
                style={{ border: 'none' }}
              />
            </div>

            {/* Decorative Glow */}
            <div className="absolute -z-10 inset-0 bg-blue-500/20 rounded-full blur-[120px]" />
          </div>
        </div>
      )}

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />
      
      {/* Animated Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Navigation */}
      <motion.nav 
        className="relative z-10 backdrop-blur-sm bg-slate-900/30 border-b border-slate-800/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-white text-xl tracking-tight">TISAP Labs</div>
                <div className="text-xs text-slate-400">Security Training Platform</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">How It Works</a>
              <a href="#stats" className="text-slate-300 hover:text-white transition-colors">Results</a>
            </div>

            <Button 
              onClick={onGetStarted}
              className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-5 bg-blue-600/10 text-blue-400 border border-blue-500/20 hover:bg-blue-600/20">
              <Sparkles className="w-3 h-3 mr-1.5" />
              Interactive Cyber Defense Training
            </Badge>

            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1]">
              Train Your Team to
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Stop Real Threats
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-lg">
              Hands-on security simulations, interactive labs, and gamified learning that actually prepares your employees for modern cyber attacks.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button 
                onClick={onGetStarted}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/30 px-8"
              >
                Start Training
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-slate-700 hover:bg-slate-800 px-8"
                onClick={() => setShowVideoModal(true)}
              >
                View Demo
              </Button>
            </div>

            <div className="flex items-center gap-8 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No credit card</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Card className="bg-slate-900/70 border-slate-800 backdrop-blur-xl p-6 shadow-2xl">
              {/* Simulated Dashboard Interface */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <div className="ml-auto text-xs text-slate-500">dashboard.tisap.com</div>
              </div>

              <div className="space-y-4">
                {/* Score Display */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/20">
                  <div>
                    <div className="text-sm text-slate-400">Security Score</div>
                    <div className="text-3xl font-bold text-white">87%</div>
                  </div>
                  <Activity className="w-10 h-10 text-blue-400" />
                </div>

                {/* Mini Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <motion.div 
                    className="p-3 bg-slate-800/50 rounded-lg border border-slate-700"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Trophy className="w-5 h-5 text-yellow-400 mb-2" />
                    <div className="text-lg font-bold text-white">12</div>
                    <div className="text-xs text-slate-400">Badges</div>
                  </motion.div>
                  <motion.div 
                    className="p-3 bg-slate-800/50 rounded-lg border border-slate-700"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  >
                    <Target className="w-5 h-5 text-green-400 mb-2" />
                    <div className="text-lg font-bold text-white">95%</div>
                    <div className="text-xs text-slate-400">Accuracy</div>
                  </motion.div>
                  <motion.div 
                    className="p-3 bg-slate-800/50 rounded-lg border border-slate-700"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    <Zap className="w-5 h-5 text-purple-400 mb-2" />
                    <div className="text-lg font-bold text-white">24</div>
                    <div className="text-xs text-slate-400">Labs Done</div>
                  </motion.div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                      <span>Phishing Detection</span>
                      <span>92%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        initial={{ width: 0 }}
                        animate={{ width: "92%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                      <span>Malware Awareness</span>
                      <span>85%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Floating badges */}
            <motion.div
              className="absolute -top-6 -right-6 bg-green-600 text-white p-4 rounded-xl shadow-2xl shadow-green-600/40"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <CheckCircle className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="relative z-10 max-w-7xl mx-auto px-6 py-16 border-y border-slate-800/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "98%", label: "Threat Detection" },
            { value: "500K+", label: "Users Trained" },
            { value: "85%", label: "Attack Reduction" },
            { value: "24/7", label: "Monitoring" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Video Demo Section - Between Stats and Features */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Card className="bg-gradient-to-br from-slate-900/50 to-slate-900/30 border-blue-500/20 backdrop-blur-xl p-12 text-center overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:2rem_2rem]" />
            </div>

            <div className="relative z-10">
              <Badge className="mb-4 bg-blue-600/10 text-blue-400 border border-blue-500/20">
                <Play className="w-3 h-3 mr-1.5" />
                Watch Demo
              </Badge>
              
              <h2 className="text-3xl font-bold text-white mb-4">
                See TISAP Labs in Action
              </h2>
              
              <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                Discover how our platform transforms security training with real-world simulations and gamified learning
              </p>

              {/* Video Thumbnail / Play Button */}
              <motion.button
                onClick={() => setShowVideoModal(true)}
                className="group relative mx-auto block w-full max-w-3xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-2 border-blue-500/30 group-hover:border-blue-500/50 transition-all shadow-2xl">
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all">
                    <div className="w-20 h-20 rounded-full bg-blue-600 group-hover:bg-blue-700 group-hover:scale-110 transition-all flex items-center justify-center shadow-xl shadow-blue-600/50">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>

                  {/* Fake Video Preview */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <Monitor className="w-16 h-16 text-blue-400 mx-auto opacity-50" />
                      <div className="text-slate-300 font-semibold">Watch Platform Demo</div>
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute -z-10 inset-0 bg-blue-500/20 blur-2xl group-hover:bg-blue-500/30 transition-all" />
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur px-3 py-1 rounded text-sm text-white">
                  2:30
                </div>
              </motion.button>

              <p className="text-sm text-slate-500 mt-6">
                Click to watch our interactive platform demonstration
              </p>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 bg-purple-600/10 text-purple-400 border border-purple-500/20">
            Why TISAP Labs
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4">
            Everything You Need in One Platform
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            From simulated attacks to real-time analytics, we've got your security training covered.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Target className="w-6 h-6" />,
              title: "Real-World Scenarios",
              description: "Authentic phishing emails, malware simulations, and social engineering tests"
            },
            {
              icon: <Brain className="w-6 h-6" />,
              title: "Adaptive Learning",
              description: "AI-powered training that adjusts to each user's skill level and progress"
            },
            {
              icon: <BarChart3 className="w-6 h-6" />,
              title: "Deep Analytics",
              description: "Track performance, identify weak points, and measure improvement over time"
            },
            {
              icon: <Trophy className="w-6 h-6" />,
              title: "Gamified Training",
              description: "Points, badges, leaderboards, and challenges that keep teams engaged"
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: "Multi-Vector Coverage",
              description: "Email, web browser, and system-level security training in one place"
            },
            {
              icon: <Users className="w-6 h-6" />,
              title: "Role-Based Dashboards",
              description: "Separate views for admins, HR managers, and employees with tailored features"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm p-6 h-full hover:border-blue-500/30 transition-all">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center mb-4 border border-blue-500/20 text-blue-400">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/20 backdrop-blur-xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                How TISAP Labs Works
              </h2>
              <p className="text-slate-300 text-lg">
                Three simple steps to a more secure organization
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  icon: <Mail className="w-8 h-8" />,
                  title: "Deploy Simulations",
                  description: "Launch realistic phishing emails, malware tests, and security challenges to your team"
                },
                {
                  step: "02",
                  icon: <Activity className="w-8 h-8" />,
                  title: "Monitor & Train",
                  description: "Track who clicks, who reports, and provide instant training when mistakes happen"
                },
                {
                  step: "03",
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: "Measure Results",
                  description: "Watch your team's security awareness improve with detailed analytics and reports"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  className="text-center relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="text-6xl font-bold text-blue-500/20 mb-4">{item.step}</div>
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/30">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 p-12 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Build a Security-First Culture?
              </h2>
              <p className="text-xl text-blue-5 mb-8 max-w-2xl mx-auto">
                Join hundreds of companies protecting their teams with TISAP Labs
              </p>
              <Button 
                onClick={onGetStarted}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-2xl px-12"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 bg-slate-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-sm">© 2024 TISAP Labs. Built for security teams.</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}