import { useState, useEffect, useRef } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { toast } from "sonner@2.0.3";
import Confetti from "./Confetti";
import {
  AlertTriangle,
  ShieldAlert,
  Download,
  CheckCircle,
  XCircle,
  ChevronLeft,
  X,
  Minimize2,
  Maximize2,
  Folder,
  Mail,
  Shield,
  Chrome,
  MessageSquare,
  Usb,
  FileWarning,
  Search,
  Wifi,
  Volume2,
  Battery,
  Clock,
  Home,
  Power,
  Settings,
  User
} from "lucide-react";

interface Lab {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  accentColor: string;
  icon: React.ReactNode;
  scenario: string;
  correctAction: string;
  wrongAction: string;
  points: number;
}

interface EnhancedWindowsLabProps {
  onComplete: (results: any) => void;
  onExit: () => void;
  labId?: string;
}

const labs: Lab[] = [
  {
    id: "usb-malware",
    title: "USB Malware Trap",
    description: "Identify and handle suspicious USB drives safely",
    difficulty: "easy",
    accentColor: "#F97316",
    icon: <Usb className="w-6 h-6" />,
    scenario: "You found a USB drive in the parking lot labeled 'Executive Salary Info 2024'",
    correctAction: "Eject USB and report to IT Security",
    wrongAction: "Open the USB drive to see what's inside",
    points: 100
  },
  {
    id: "phishing-email",
    title: "Phishing Email Attachment",
    description: "Recognize malicious email attachments",
    difficulty: "medium",
    accentColor: "#EF4444",
    icon: <Mail className="w-6 h-6" />,
    scenario: "Email from 'finance@company-secure.com' with attachment 'Invoice_Q4.pdf.exe'",
    correctAction: "Report as phishing and delete",
    wrongAction: "Open the attachment to view invoice",
    points: 150
  },
  {
    id: "fake-defender",
    title: "Fake Windows Defender Alert",
    description: "Distinguish real security alerts from fake ones",
    difficulty: "medium",
    accentColor: "#2563EB",
    icon: <ShieldAlert className="w-6 h-6" />,
    scenario: "Pop-up claiming to be Windows Defender: 'Critical Threat Detected - Click to Remove'",
    correctAction: "Close popup and open real Windows Security",
    wrongAction: "Click the popup to resolve threat",
    points: 150
  },
  {
    id: "browser-extension",
    title: "Suspicious Browser Extension",
    description: "Identify malicious browser extensions",
    difficulty: "easy",
    accentColor: "#10B981",
    icon: <Chrome className="w-6 h-6" />,
    scenario: "Browser prompts to install 'SpeedBoost Pro' extension for faster browsing",
    correctAction: "Deny installation and report",
    wrongAction: "Install extension for better speed",
    points: 100
  },
  {
    id: "fake-it-chat",
    title: "Fake IT Chat Support",
    description: "Verify authenticity of IT support requests",
    difficulty: "hard",
    accentColor: "#8B5CF6",
    icon: <MessageSquare className="w-6 h-6" />,
    scenario: "Teams message from 'IT Helpdesk': 'Update required - click this link immediately'",
    correctAction: "Verify sender through corporate directory",
    wrongAction: "Click the link to update",
    points: 200
  }
];

export default function EnhancedWindowsLab({ onComplete, onExit, labId = "usb-malware" }: EnhancedWindowsLabProps) {
  const [currentLab, setCurrentLab] = useState<Lab>(labs.find(l => l.id === labId) || labs[0]);
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [windowPosition, setWindowPosition] = useState({ x: 100, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [shake, setShake] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  // Spring physics for dragging
  const x = useMotionValue(windowPosition.x);
  const y = useMotionValue(windowPosition.y);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const playSound = (type: 'success' | 'error' | 'click') => {
    if (!soundEnabled) return;
    // Sound feedback placeholder - integrate with Web Audio API
    console.log(`🔊 Playing ${type} sound`);
  };

  const handleChoice = (isCorrect: boolean) => {
    playSound('click');
    setUserChoice(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      playSound('success');
      setShowConfetti(true);
      toast.success("Excellent! ✅", {
        description: `+${currentLab.points} points earned!`,
        duration: 3000
      });
      setTimeout(() => {
        onComplete({
          score: 100,
          points: currentLab.points,
          labName: currentLab.title,
          correct: true
        });
      }, 2500);
    } else {
      playSound('error');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      toast.error("Not quite! ❌", {
        description: "Review the scenario and try again.",
        duration: 3000
      });
    }
  };

  const difficultyConfig = {
    easy: { color: "#10B981", label: "🟢 Easy", badgeClass: "bg-green-500/20 text-green-500 border-green-500/40" },
    medium: { color: "#F59E0B", label: "🟡 Medium", badgeClass: "bg-amber-500/20 text-amber-500 border-amber-500/40" },
    hard: { color: "#EF4444", label: "🔴 Hard", badgeClass: "bg-red-500/20 text-red-500 border-red-500/40" }
  };

  const diff = difficultyConfig[currentLab.difficulty];

  // Render specific lab scenario
  const renderLabScenario = () => {
    switch (currentLab.id) {
      case "usb-malware":
        return <USBMalwareScenario />;
      case "phishing-email":
        return <PhishingEmailScenario />;
      case "fake-defender":
        return <FakeDefenderScenario />;
      case "browser-extension":
        return <BrowserExtensionScenario />;
      case "fake-it-chat":
        return <FakeITChatScenario />;
      default:
        return <USBMalwareScenario />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {showConfetti && <Confetti />}
      
      {/* Windows 11 Wallpaper Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80')`,
          filter: 'brightness(0.4) blur(2px)'
        }}
      />

      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Breadcrumb Navigation */}
      <div className="absolute top-4 left-4 right-4 z-40">
        <Card className="glass-panel border-2 border-white/10 bg-black/30 backdrop-blur-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onExit}
                className="text-white hover:bg-white/10"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Labs
              </Button>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span>Lab Catalog</span>
                <ChevronLeft className="w-4 h-4 rotate-180" />
                <span className="text-white font-medium">{currentLab.title}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={diff.badgeClass}>
                {diff.label}
              </Badge>
              <Badge className="bg-white/10 text-white border-white/20">
                {currentLab.points} pts
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="text-white hover:bg-white/10"
              >
                <Volume2 className={`w-4 h-4 ${soundEnabled ? 'text-green-400' : 'text-white/50'}`} />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Windows 11 Desktop */}
      <div className="relative h-screen pt-24 pb-20">
        {/* Desktop Icons */}
        <div className="absolute top-28 left-8 space-y-4">
          {[
            { icon: <Folder className="w-8 h-8" />, label: "Documents" },
            { icon: <Chrome className="w-8 h-8" />, label: "Browser" },
            { icon: <Mail className="w-8 h-8" />, label: "Email" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-white/10 backdrop-blur-sm cursor-pointer transition-all group"
            >
              <div className="text-white drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">
                {item.icon}
              </div>
              <span className="text-xs text-white drop-shadow-lg font-medium">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Main Lab Window */}
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              ref={windowRef}
              drag
              dragMomentum={false}
              dragElastic={0.1}
              dragConstraints={{ top: 0, left: 0, right: 800, bottom: 400 }}
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ 
                scale: isMaximized ? 1.5 : 1, 
                opacity: 1, 
                y: 0,
                x: shake ? [0, -10, 10, -10, 10, 0] : 0
              }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                x: shake ? { duration: 0.5 } : undefined
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px]"
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
            >
              {/* Windows 11 Style Window */}
              <Card className="overflow-hidden shadow-2xl border-2 border-white/20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-xl">
                {/* Window Title Bar */}
                <div 
                  className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700 cursor-grab active:cursor-grabbing"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentLab.accentColor}15 0%, transparent 100%)`
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
                      style={{ background: currentLab.accentColor }}
                    >
                      <div className="text-white">
                        {currentLab.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">
                        {currentLab.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Security Lab Simulation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-10 h-10 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg"
                      onClick={() => setIsMinimized(true)}
                    >
                      <Minimize2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-10 h-10 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg"
                      onClick={() => setIsMaximized(!isMaximized)}
                    >
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-10 h-10 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                      onClick={onExit}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Window Content */}
                <div className="p-8">
                  {/* Scenario Description */}
                  <div 
                    className="mb-6 p-6 rounded-xl border-2"
                    style={{ 
                      borderColor: `${currentLab.accentColor}40`,
                      background: `linear-gradient(135deg, ${currentLab.accentColor}10 0%, transparent 100%)`
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                        style={{ background: currentLab.accentColor }}
                      >
                        <AlertTriangle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          Security Challenge
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {currentLab.scenario}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Lab-Specific Scenario UI */}
                  {renderLabScenario()}

                  {/* Action Buttons */}
                  {!userChoice && (
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <Button
                        onClick={() => handleChoice(false)}
                        variant="outline"
                        className="py-6 text-left justify-start border-2 hover:border-red-500 hover:bg-red-500/10 transition-all"
                      >
                        <XCircle className="w-5 h-5 mr-3 flex-shrink-0 text-red-500" />
                        <div>
                          <div className="font-semibold text-foreground text-sm">
                            Wrong Choice
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {currentLab.wrongAction}
                          </div>
                        </div>
                      </Button>
                      <Button
                        onClick={() => handleChoice(true)}
                        className="py-6 text-left justify-start border-2 transition-all"
                        style={{ 
                          borderColor: currentLab.accentColor,
                          background: `linear-gradient(135deg, ${currentLab.accentColor} 0%, ${currentLab.accentColor}dd 100%)`
                        }}
                      >
                        <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0 text-white" />
                        <div className="text-white">
                          <div className="font-semibold text-sm">
                            Correct Choice
                          </div>
                          <div className="text-xs text-white/80 mt-1">
                            {currentLab.correctAction}
                          </div>
                        </div>
                      </Button>
                    </div>
                  )}

                  {/* Feedback */}
                  {userChoice && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6"
                    >
                      {userChoice === "correct" ? (
                        <div className="p-6 rounded-xl bg-green-500/10 border-2 border-green-500/40">
                          <div className="flex items-start gap-4">
                            <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                            <div>
                              <h5 className="font-semibold text-green-600 dark:text-green-400 mb-2">
                                Perfect! You made the right call!
                              </h5>
                              <p className="text-sm text-muted-foreground">
                                Proceeding to quiz to test your knowledge...
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 rounded-xl bg-red-500/10 border-2 border-red-500/40">
                          <div className="flex items-start gap-4">
                            <XCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
                            <div>
                              <h5 className="font-semibold text-red-600 dark:text-red-400 mb-2">
                                Careful! That choice could lead to a security incident.
                              </h5>
                              <p className="text-sm text-muted-foreground">
                                Review the scenario and try again.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Windows 11 Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-2xl border-t border-white/10 flex items-center justify-between px-4">
        {/* Start Button & Apps */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-12 h-12 rounded-lg hover:bg-white/10 text-white"
          >
            <Home className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-12 h-12 rounded-lg hover:bg-white/10 text-white"
          >
            <Search className="w-5 h-5" />
          </Button>
          {isMinimized && (
            <Button
              variant="ghost"
              size="sm"
              className="px-3 h-12 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              onClick={() => setIsMinimized(false)}
            >
              <div className="flex items-center gap-2">
                <div style={{ color: currentLab.accentColor }}>
                  {currentLab.icon}
                </div>
                <span className="text-sm">{currentLab.title}</span>
              </div>
            </Button>
          )}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-4 text-white/80 text-sm">
          <Wifi className="w-4 h-4" />
          <Volume2 className="w-4 h-4" />
          <Battery className="w-4 h-4" />
          <div className="text-xs">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Lab-Specific Scenario Components
function USBMalwareScenario() {
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-slate-50 dark:bg-slate-800/50 border-2 border-orange-500/20">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
            <Usb className="w-8 h-8 text-white" />
          </div>
          <div>
            <h5 className="font-semibold text-foreground">USB Drive Detected</h5>
            <p className="text-sm text-muted-foreground">Removable Disk (E:)</p>
          </div>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <Folder className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium text-foreground">Executive_Salary_Info_2024.exe</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Size: 2.4 MB • Modified: Today
          </p>
        </div>
        <p className="text-sm text-amber-600 dark:text-amber-400 mt-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          What will you do with this USB drive?
        </p>
      </Card>
    </div>
  );
}

function PhishingEmailScenario() {
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-slate-50 dark:bg-slate-800/50 border-2 border-red-500/20">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          <Mail className="w-6 h-6 text-red-500" />
          <div>
            <h5 className="font-semibold text-foreground">Urgent: Invoice Review Required</h5>
            <p className="text-xs text-muted-foreground">From: finance@company-secure.com</p>
          </div>
        </div>
        <p className="text-sm text-foreground mb-4 leading-relaxed">
          Dear Employee,<br /><br />
          Please review the attached Q4 invoice immediately. This requires your urgent attention.
        </p>
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-2 border-red-500/40">
          <div className="flex items-center gap-3">
            <FileWarning className="w-8 h-8 text-red-500" />
            <div>
              <div className="font-semibold text-sm text-foreground">📎 Invoice_Q4.pdf.exe</div>
              <div className="text-xs text-muted-foreground">2.8 MB • Double-click to open</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function FakeDefenderScenario() {
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-500">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="w-10 h-10 text-white" />
          </div>
          <h5 className="font-bold text-lg text-red-600 dark:text-red-400">
            ⚠️ CRITICAL THREAT DETECTED
          </h5>
          <p className="text-sm text-foreground">
            Windows Defender has detected malware on your system!<br />
            <strong>5 threats found</strong> - Immediate action required
          </p>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg">
            <p className="text-xs text-muted-foreground mb-2">Scanning: C:\Windows\System32...</p>
            <Progress value={67} className="h-2" />
          </div>
          <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
            Click Here to Remove Threats Now
          </Button>
        </div>
      </Card>
    </div>
  );
}

function BrowserExtensionScenario() {
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-slate-50 dark:bg-slate-800/50 border-2 border-green-500/20">
        <div className="flex items-center gap-3 mb-4">
          <Chrome className="w-8 h-8 text-green-500" />
          <h5 className="font-semibold text-foreground">Add Extension to Browser</h5>
        </div>
        <div className="p-6 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <span className="text-2xl">⚡</span>
          </div>
          <div>
            <h6 className="font-bold text-foreground mb-1">SpeedBoost Pro</h6>
            <p className="text-xs text-muted-foreground">by FastWeb Inc.</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Boost your browsing speed by 300%! Over 10 million users!
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-amber-600">
            <AlertTriangle className="w-4 h-4" />
            <span>This extension can read and change all your data on websites</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

function FakeITChatScenario() {
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-slate-50 dark:bg-slate-800/50 border-2 border-purple-500/20">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h5 className="font-semibold text-foreground">IT Helpdesk</h5>
            <p className="text-xs text-green-500">● Online</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="bg-slate-200 dark:bg-slate-700 p-3 rounded-lg rounded-tl-none">
            <p className="text-sm text-foreground">
              Hi! This is IT Support. We've detected unusual activity on your account.
            </p>
            <p className="text-xs text-muted-foreground mt-1">10:23 AM</p>
          </div>
          <div className="bg-slate-200 dark:bg-slate-700 p-3 rounded-lg rounded-tl-none">
            <p className="text-sm text-foreground">
              Please click this link immediately to verify your identity:
            </p>
            <div className="mt-2 p-2 bg-purple-100 dark:bg-purple-900/30 rounded border border-purple-500/40">
              <a href="#" className="text-sm text-purple-600 dark:text-purple-400 underline">
                https://company-verify-secure.net/login
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-1">10:24 AM</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
