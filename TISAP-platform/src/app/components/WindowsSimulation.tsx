import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Slider } from "./ui/slider";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner@2.0.3";
import { 
  AlertTriangle,
  ShieldAlert,
  Download,
  Flag,
  CheckCircle,
  XCircle,
  ChevronLeft,
  Lightbulb,
  Wifi,
  Volume2,
  Battery,
  Search,
  Maximize2,
  Minimize2,
  X,
  Folder,
  Chrome,
  Mail,
  Settings,
  User,
  Power,
  Monitor,
  HardDrive,
  Network,
  Bell,
  Trash2,
  FileText,
  Image,
  Calendar,
  Calculator,
  Music,
  Video,
  ChevronRight,
  Plus,
  RefreshCw,
  Home,
  Clock
} from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import qualysWallpaper from "figma:asset/d8047478c47ebef2a397b646024a0ba725775518.png";

interface WindowsSimulationProps {
  onNavigate?: (page: string) => void;
  onBack?: () => void;
  onComplete?: (results: any) => void;
  onExit?: () => void;
}

export default function WindowsSimulation({ onNavigate, onBack, onComplete, onExit }: WindowsSimulationProps) {
  const [showHint, setShowHint] = useState(false);
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [popupMinimized, setPopupMinimized] = useState(false);
  const [popupMaximized, setPopupMaximized] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showWifiMenu, setShowWifiMenu] = useState(false);
  const [showActionCenter, setShowActionCenter] = useState(false);
  const [volume, setVolume] = useState([50]);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [maximizedWindows, setMaximizedWindows] = useState<string[]>([]);

  // Update clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close context menu on click
  useEffect(() => {
    const handleClick = () => setShowContextMenu(false);
    if (showContextMenu) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [showContextMenu]);

  const handleChoice = (choice: string) => {
    setUserChoice(choice);
    if (choice === "report") {
      toast.success("Correct! ✅", {
        description: "You identified the ransomware trap!"
      });
      setTimeout(() => {
        if (onComplete) {
          onComplete({
            score: 100,
            points: 100,
            labName: "Malware Detection Lab",
            correct: true
          });
        } else if (onNavigate) {
          onNavigate('micro-training');
        }
      }, 2500);
    } else if (choice === "download") {
      toast.error("Incorrect! ❌", {
        description: "This was ransomware! Let's learn what to look for..."
      });
      setTimeout(() => {
        if (onComplete) {
          onComplete({
            score: 50,
            points: 50,
            labName: "Malware Detection Lab",
            correct: false
          });
        } else if (onNavigate) {
          onNavigate('micro-training');
        }
      }, 2500);
    } else if (choice === "close") {
      toast.warning("Closed ⚠️", {
        description: "Good instinct, but you should also report suspicious popups!"
      });
      setTimeout(() => {
        setUserChoice(null);
      }, 2000);
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuPos({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const openWindow = (windowName: string) => {
    if (!openWindows.includes(windowName)) {
      setOpenWindows([...openWindows, windowName]);
    }
    // Remove from minimized if it was there
    setMinimizedWindows(minimizedWindows.filter(w => w !== windowName));
  };

  const closeWindow = (windowName: string) => {
    setOpenWindows(openWindows.filter(w => w !== windowName));
    setMinimizedWindows(minimizedWindows.filter(w => w !== windowName));
  };

  const minimizeWindow = (windowName: string) => {
    if (!minimizedWindows.includes(windowName)) {
      setMinimizedWindows([...minimizedWindows, windowName]);
    }
  };

  const restoreWindow = (windowName: string) => {
    setMinimizedWindows(minimizedWindows.filter(w => w !== windowName));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden" onContextMenu={handleRightClick}>
      {/* Qualys Wallpaper */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${qualysWallpaper})`
        }}
      >
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Training Control Bar - Floating at top */}
      <motion.div 
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glass-panel border-2 border-primary/30 bg-card/95 backdrop-blur-xl shadow-2xl">
          <div className="px-6 py-3 flex items-center gap-6">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-foreground hover:text-primary"
              onClick={onExit || onBack}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Exit Lab
            </Button>
            
            <div className="h-6 w-px bg-border"></div>
            
            <div className="flex items-center gap-3">
              <Badge className="bg-primary text-white border-primary">
                Windows Security Lab
              </Badge>
              <span className="text-sm text-muted-foreground">Ransomware Detection Training</span>
            </div>

            <div className="h-6 w-px bg-border"></div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHint(!showHint)}
              className="text-accent-gold hover:text-accent-gold-dark"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Hint Panel */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-md"
            initial={{ y: -20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.95 }}
          >
            <Alert className="border-2 border-accent-gold bg-accent-gold/10 backdrop-blur-xl">
              <Lightbulb className="w-5 h-5 text-accent-gold" />
              <AlertDescription className="text-foreground">
                <strong className="text-accent-gold">Red Flags to Look For:</strong>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Urgent/threatening language ("15 minutes!")</li>
                  <li>• Suspicious file types (.zip, .exe)</li>
                  <li>• Suspicious URLs (security-update-windows[.]com)</li>
                  <li>• Requests for immediate downloads</li>
                  <li>• Fake security warnings</li>
                </ul>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Icons */}
      <motion.div 
        className="absolute top-24 left-6 space-y-4 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <DesktopIcon 
          icon={<Folder className="w-8 h-8" />} 
          label="This PC" 
          onClick={() => openWindow('explorer')}
        />
        <DesktopIcon 
          icon={<HardDrive className="w-8 h-8" />} 
          label="Documents" 
          onClick={() => openWindow('documents')}
        />
        <DesktopIcon 
          icon={<Network className="w-8 h-8" />} 
          label="Network" 
          onClick={() => toast.info("Network", { description: "Network locations" })}
        />
        <DesktopIcon 
          icon={<Trash2 className="w-8 h-8" />} 
          label="Recycle Bin" 
          onClick={() => toast.info("Recycle Bin", { description: "Recycle Bin is empty" })}
        />
        <DesktopIcon 
          icon={<FileText className="w-8 h-8" />} 
          label="Report.docx" 
          onClick={() => toast.info("Opening...", { description: "Microsoft Word" })}
        />
        
        {/* SUSPICIOUS FILE - MATCHES THE RANSOMWARE POPUP */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        >
          <DesktopIcon 
            icon={
              <div className="relative">
                <Download className="w-8 h-8 text-yellow-500" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            } 
            label="Windows_Security_Update_URGENT.zip" 
            onClick={() => toast.warning("Suspicious File!", { 
              description: "This file matches the popup - be careful!" 
            })}
          />
        </motion.div>
      </motion.div>

      {/* Right-Click Context Menu */}
      <AnimatePresence>
        {showContextMenu && (
          <motion.div
            className="fixed z-50 w-64 bg-[#2a2a2a]/98 backdrop-blur-xl rounded-lg border border-white/10 shadow-2xl py-2"
            style={{ left: contextMenuPos.x, top: contextMenuPos.y }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <ContextMenuItem icon={<RefreshCw />} label="Refresh" />
            <ContextMenuItem icon={<Plus />} label="New" hasSubmenu />
            <div className="h-px bg-white/10 my-2" />
            <ContextMenuItem icon={<Settings />} label="Display settings" />
            <ContextMenuItem icon={<Image />} label="Personalize" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* File Explorer Window */}
      <AnimatePresence>
        {openWindows.includes('explorer') && !minimizedWindows.includes('explorer') && (
          <WindowFrame
            title="File Explorer"
            icon={<Folder className="w-5 h-5" />}
            onClose={() => closeWindow('explorer')}
            onMinimize={() => minimizeWindow('explorer')}
            initialPosition={{ x: 150, y: 150 }}
          >
            <div className="bg-white h-96">
              <div className="border-b border-gray-200 p-3 flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <div className="flex-1 bg-gray-100 rounded px-3 py-1.5 text-sm text-gray-700">
                  This PC {'>'} Documents
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-4 gap-4">
                  <FileItem icon={<Folder />} name="Work Files" />
                  <FileItem icon={<Folder />} name="Pictures" />
                  <FileItem icon={<Folder />} name="Videos" />
                  <FileItem icon={<FileText />} name="Report.docx" />
                  <FileItem icon={<Image />} name="Photo.jpg" />
                  <FileItem icon={<Music />} name="Song.mp3" />
                </div>
              </div>
            </div>
          </WindowFrame>
        )}
      </AnimatePresence>

      {/* Documents Window */}
      <AnimatePresence>
        {openWindows.includes('documents') && !minimizedWindows.includes('documents') && (
          <WindowFrame
            title="Documents"
            icon={<HardDrive className="w-5 h-5" />}
            onClose={() => closeWindow('documents')}
            onMinimize={() => minimizeWindow('documents')}
            initialPosition={{ x: 200, y: 200 }}
          >
            <div className="bg-white h-80">
              <div className="p-6">
                <h3 className="text-gray-900 font-semibold mb-4">Recent Documents</h3>
                <div className="space-y-2">
                  <DocumentRow icon={<FileText />} name="Q4_Report.docx" date="Today, 2:30 PM" />
                  <DocumentRow icon={<FileText />} name="Budget_2024.xlsx" date="Yesterday" />
                  <DocumentRow icon={<FileText />} name="Presentation.pptx" date="Nov 8" />
                  <DocumentRow icon={<FileText />} name="Notes.txt" date="Nov 5" />
                </div>
              </div>
            </div>
          </WindowFrame>
        )}
      </AnimatePresence>

      {/* Ransomware Pop-up Window */}
      <AnimatePresence>
        {!popupMinimized && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-full max-w-2xl"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.6 }}
          >
            {/* Window Shadow */}
            <div className="absolute inset-0 bg-black/30 blur-2xl translate-y-2"></div>
            
            {/* Actual Window */}
            <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl border border-gray-300">
              {/* Windows Title Bar */}
              <div className="bg-white border-b border-gray-200 px-3 py-2 flex items-center justify-between select-none">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-gray-900">Windows Security Alert</span>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    className="w-11 h-8 hover:bg-gray-100 flex items-center justify-center rounded transition-colors group"
                    onClick={() => setPopupMinimized(true)}
                    title="Minimize"
                  >
                    <div className="w-3 h-0.5 bg-gray-700 group-hover:bg-gray-900"></div>
                  </button>
                  <button 
                    className="w-11 h-8 hover:bg-gray-100 flex items-center justify-center rounded transition-colors group"
                    onClick={() => setPopupMaximized(!popupMaximized)}
                    title="Maximize"
                  >
                    <div className="w-3 h-3 border border-gray-700 group-hover:border-gray-900"></div>
                  </button>
                  <button 
                    className="w-11 h-8 hover:bg-red-500 flex items-center justify-center rounded transition-colors group"
                    onClick={() => handleChoice('close')}
                    title="Close"
                  >
                    <div className="relative w-3 h-3">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-0.5 bg-gray-700 group-hover:bg-white rotate-45"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-0.5 bg-gray-700 group-hover:bg-white -rotate-45"></div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Window Content */}
              <div className="bg-white">
                {/* Alert Header */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                    <ShieldAlert className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-1">⚠️ CRITICAL SECURITY ALERT</h2>
                    <p className="text-white/95 text-sm">Your system has been compromised! Immediate action required.</p>
                  </div>
                </div>

                {/* Alert Body */}
                <div className="p-6 space-y-4">
                  {/* Threat Information */}
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Download className="w-10 h-10 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-lg mb-2">
                          Windows_Security_Update_URGENT.zip
                        </p>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          Microsoft Windows Defender has detected <strong>5 critical security threats</strong> on your system. 
                          Download and install this official security patch immediately to prevent data loss and system damage.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Urgency Warning */}
                  <motion.div 
                    className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4"
                    animate={{ 
                      boxShadow: [
                        '0 0 0 0 rgba(250, 204, 21, 0.4)',
                        '0 0 0 8px rgba(250, 204, 21, 0)',
                        '0 0 0 0 rgba(250, 204, 21, 0.4)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-yellow-900">⏱️ Action Required Within 15 Minutes!</p>
                        <p className="text-sm text-yellow-800 mt-1">
                          Failure to install this update will result in permanent encryption of your personal files.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Threat Details */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-600" />
                      Detected Threats:
                    </h4>
                    <div className="space-y-2">
                      <ThreatItem name="Trojan.Win32.Generic" severity="Critical" />
                      <ThreatItem name="Malware.Ransomware.2024" severity="High" />
                      <ThreatItem name="Spyware.KeyLogger.XYZ" severity="Critical" />
                      <ThreatItem name="Backdoor.RemoteAccess" severity="High" />
                      <ThreatItem name="Worm.Network.Spreader" severity="Medium" />
                    </div>
                  </div>

                  {/* File Details */}
                  <div className="flex items-center gap-6 text-xs text-gray-500 border-t border-gray-200 pt-3">
                    <span>📦 File size: 2.3 MB</span>
                    <span>•</span>
                    <span>🌐 Source: security-update-windows[.]com</span>
                    <span>•</span>
                    <span>🔒 Digitally Signed: Microsoft Corporation</span>
                  </div>

                  {/* Action Buttons */}
                  {!userChoice ? (
                    <div className="flex gap-3 pt-2">
                      <Button 
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white text-base py-6 shadow-lg"
                        onClick={() => handleChoice('download')}
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download & Install Now
                      </Button>
                      <Button 
                        variant="outline"
                        className="flex-1 border-2 border-green-600 text-green-700 hover:bg-green-50 text-base py-6"
                        onClick={() => handleChoice('report')}
                      >
                        <Flag className="w-5 h-5 mr-2" />
                        Report as Suspicious
                      </Button>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Alert className={userChoice === 'report' 
                        ? 'border-2 border-green-500 bg-green-50' 
                        : 'border-2 border-red-500 bg-red-50'
                      }>
                        {userChoice === 'report' ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <AlertDescription className="text-green-900">
                              <strong className="block mb-1">✅ Excellent Decision!</strong>
                              You correctly identified this as a ransomware attack. This fake security alert is designed to trick users into downloading malware. Key red flags include the urgent countdown, suspicious URL, and requests for immediate downloads.
                            </AlertDescription>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-red-600" />
                            <AlertDescription className="text-red-900">
                              <strong className="block mb-1">❌ This Was a Ransomware Trap!</strong>
                              This pop-up contained several warning signs: urgent language, suspicious file type (.zip), fake URL, and pressure tactics. Real Windows updates never come from pop-ups or external websites.
                            </AlertDescription>
                          </>
                        )}
                      </Alert>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Windows 11 Taskbar */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 h-12 bg-[#202020]/95 backdrop-blur-xl border-t border-white/10 z-30"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="h-full flex items-center justify-between px-2">
          {/* Left Side - Start Button & Apps */}
          <div className="flex items-center gap-1">
            {/* Start Button */}
            <motion.button
              className="w-10 h-10 flex items-center justify-center rounded hover:bg-white/10 transition-colors relative"
              onClick={() => setShowStartMenu(!showStartMenu)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-6 h-6 grid grid-cols-2 gap-0.5">
                <div className="bg-white/90 rounded-sm"></div>
                <div className="bg-white/90 rounded-sm"></div>
                <div className="bg-white/90 rounded-sm"></div>
                <div className="bg-white/90 rounded-sm"></div>
              </div>
            </motion.button>

            {/* Search */}
            <div className="ml-1 px-3 py-1.5 bg-white/10 rounded hover:bg-white/15 transition-colors cursor-pointer flex items-center gap-2 min-w-[200px]">
              <Search className="w-4 h-4 text-white/70" />
              <span className="text-sm text-white/70">Type here to search</span>
            </div>

            {/* Taskbar Apps */}
            <TaskbarApp icon={<Chrome className="w-5 h-5 text-white" />} active />
            <TaskbarApp icon={<Mail className="w-5 h-5 text-white" />} />
            <TaskbarApp 
              icon={<Folder className="w-5 h-5 text-white" />} 
              active={openWindows.includes('explorer')}
              onClick={() => openWindows.includes('explorer') ? restoreWindow('explorer') : openWindow('explorer')}
            />
            
            {/* Minimized Popup */}
            {popupMinimized && (
              <TaskbarApp 
                icon={<ShieldAlert className="w-5 h-5 text-red-400" />} 
                onClick={() => setPopupMinimized(false)}
                highlight
              />
            )}
            
            {/* Minimized Windows */}
            {minimizedWindows.includes('explorer') && (
              <TaskbarApp 
                icon={<Folder className="w-5 h-5 text-blue-400" />} 
                onClick={() => restoreWindow('explorer')}
              />
            )}
            {minimizedWindows.includes('documents') && (
              <TaskbarApp 
                icon={<HardDrive className="w-5 h-5 text-blue-400" />} 
                onClick={() => restoreWindow('documents')}
              />
            )}
          </div>

          {/* Right Side - System Tray */}
          <div className="flex items-center gap-2">
            {/* System Icons */}
            <div className="relative">
              <SystemTrayIcon 
                icon={<Wifi className="w-4 h-4" />} 
                onClick={() => setShowWifiMenu(!showWifiMenu)}
              />
              <AnimatePresence>
                {showWifiMenu && (
                  <motion.div
                    className="absolute bottom-14 right-0 w-80 bg-[#1a1a1a]/98 backdrop-blur-2xl rounded-xl border border-white/10 shadow-2xl p-4"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  >
                    <h3 className="text-white font-semibold mb-3">WiFi Networks</h3>
                    <div className="space-y-2">
                      <WifiNetwork name="Qualys-Corporate" signal={3} connected />
                      <WifiNetwork name="Guest-Network" signal={2} />
                      <WifiNetwork name="Conference-Room" signal={1} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="relative">
              <SystemTrayIcon 
                icon={<Volume2 className="w-4 h-4" />}
                onClick={() => setShowVolumeSlider(!showVolumeSlider)}
              />
              <AnimatePresence>
                {showVolumeSlider && (
                  <motion.div
                    className="absolute bottom-14 right-0 w-64 bg-[#1a1a1a]/98 backdrop-blur-2xl rounded-xl border border-white/10 shadow-2xl p-4"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  >
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-5 h-5 text-white" />
                      <Slider 
                        value={volume} 
                        onValueChange={setVolume}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-white text-sm w-8">{volume[0]}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <SystemTrayIcon icon={<Battery className="w-4 h-4" />} />
            
            {/* Notifications */}
            <motion.button
              className="px-2 py-1.5 rounded hover:bg-white/10 transition-colors relative"
              onClick={() => setShowActionCenter(!showActionCenter)}
              whileHover={{ scale: 1.05 }}
            >
              <Bell className="w-4 h-4 text-white/90" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </motion.button>

            {/* Clock */}
            <div className="px-3 py-1 text-white/90 text-xs font-medium text-right leading-tight cursor-pointer hover:bg-white/10 rounded transition-colors"
              onClick={() => toast.info("Calendar", { description: formatDate(currentTime) })}
            >
              <div>{formatTime(currentTime)}</div>
              <div className="text-white/70">{formatDate(currentTime)}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Start Menu */}
      <AnimatePresence>
        {showStartMenu && (
          <motion.div
            className="fixed bottom-14 left-1/2 -translate-x-1/2 z-40 w-[640px]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            <div className="bg-[#1a1a1a]/98 backdrop-blur-2xl rounded-xl border border-white/10 shadow-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Pinned</h3>
                <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                  All apps →
                </Button>
              </div>
              <div className="grid grid-cols-6 gap-4 mb-6">
                <StartMenuItem icon={<Settings />} label="Settings" />
                <StartMenuItem icon={<Folder />} label="Explorer" onClick={() => openWindow('explorer')} />
                <StartMenuItem icon={<Chrome />} label="Edge" />
                <StartMenuItem icon={<Mail />} label="Mail" />
                <StartMenuItem icon={<Calendar />} label="Calendar" />
                <StartMenuItem icon={<Calculator />} label="Calculator" />
                <StartMenuItem icon={<FileText />} label="Notepad" />
                <StartMenuItem icon={<Music />} label="Music" />
                <StartMenuItem icon={<Video />} label="Movies" />
                <StartMenuItem icon={<Image />} label="Photos" />
                <StartMenuItem icon={<Monitor />} label="Display" />
                <StartMenuItem icon={<ShieldAlert />} label="Security" />
              </div>
              
              <div className="border-t border-white/10 pt-4">
                <h3 className="text-white font-semibold mb-3">Recommended</h3>
                <div className="space-y-2">
                  <RecommendedItem icon={<FileText />} title="Report.docx" subtitle="Opened 2 hours ago" />
                  <RecommendedItem icon={<Folder />} title="Work Files" subtitle="Modified today" />
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm">John Doe</span>
                </div>
                <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                  <Power className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Center */}
      <AnimatePresence>
        {showActionCenter && (
          <motion.div
            className="fixed bottom-14 right-4 z-40 w-96"
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
          >
            <div className="bg-[#1a1a1a]/98 backdrop-blur-2xl rounded-xl border border-white/10 shadow-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Notifications</h3>
                <Button variant="ghost" size="sm" className="text-white/70 hover:text-white text-xs">
                  Clear all
                </Button>
              </div>
              <div className="space-y-2">
                <NotificationItem 
                  icon={<ShieldAlert className="w-5 h-5 text-yellow-400" />}
                  title="Security Training Alert"
                  message="Suspicious pop-up detected - Make your choice"
                  time="Just now"
                />
                <NotificationItem 
                  icon={<Mail className="w-5 h-5 text-blue-400" />}
                  title="New Email"
                  message="You have 3 unread messages"
                  time="5 min ago"
                />
                <NotificationItem 
                  icon={<Monitor className="w-5 h-5 text-blue-400" />}
                  title="Windows Update"
                  message="Updates are available"
                  time="2 hours ago"
                />
                <NotificationItem 
                  icon={<Calendar className="w-5 h-5 text-green-400" />}
                  title="Meeting Reminder"
                  message="Team sync in 30 minutes"
                  time="30 min ago"
                />
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/10">
                <h4 className="text-white/70 text-xs mb-3">Quick Settings</h4>
                <div className="grid grid-cols-3 gap-2">
                  <QuickSetting icon={<Wifi />} label="WiFi" active />
                  <QuickSetting icon={<Volume2 />} label="Sound" active />
                  <QuickSetting icon={<Monitor />} label="Display" />
                  <QuickSetting icon={<Battery />} label="Battery" active />
                  <QuickSetting icon={<Settings />} label="Settings" />
                  <QuickSetting icon={<Network />} label="Network" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper Components
function DesktopIcon({ icon, label, onClick }: { 
  icon: React.ReactNode; 
  label: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-1 p-2 rounded cursor-pointer hover:bg-white/10 transition-colors w-24"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="text-white drop-shadow-lg">{icon}</div>
      <span className="text-white text-xs text-center drop-shadow-lg max-w-[70px] truncate block">{label}</span>
    </motion.div>
  );
}

function TaskbarApp({ icon, active, highlight, onClick }: { 
  icon: React.ReactNode; 
  active?: boolean; 
  highlight?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.button
      className={`w-10 h-10 flex items-center justify-center rounded relative ${
        highlight ? 'bg-red-500/20' : 'hover:bg-white/10'
      } transition-colors`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
      {active && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/90 rounded-full"></div>
      )}
      {highlight && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}

function SystemTrayIcon({ icon, onClick }: { icon: React.ReactNode; onClick?: () => void }) {
  return (
    <motion.button
      className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors text-white/90"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {icon}
    </motion.button>
  );
}

function StartMenuItem({ icon, label, onClick }: { 
  icon: React.ReactNode; 
  label: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
        {icon}
      </div>
      <span className="text-white/90 text-xs text-center">{label}</span>
    </motion.div>
  );
}

function NotificationItem({ icon, title, message, time }: {
  icon: React.ReactNode;
  title: string;
  message: string;
  time: string;
}) {
  return (
    <div className="p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
      <div className="flex gap-3">
        <div className="flex-shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium">{title}</p>
          <p className="text-white/70 text-xs mt-0.5">{message}</p>
          <p className="text-white/50 text-xs mt-1">{time}</p>
        </div>
      </div>
    </div>
  );
}

function ThreatItem({ name, severity }: { name: string; severity: string }) {
  const severityColor = 
    severity === 'Critical' ? 'text-red-600' :
    severity === 'High' ? 'text-orange-600' :
    'text-yellow-600';

  return (
    <div className="flex items-center justify-between py-2 px-3 bg-white rounded border border-gray-200">
      <div className="flex items-center gap-2">
        <XCircle className={`w-4 h-4 ${severityColor}`} />
        <span className="text-sm text-gray-900">{name}</span>
      </div>
      <Badge className={`${severityColor} bg-transparent text-xs`}>
        {severity}
      </Badge>
    </div>
  );
}

function ContextMenuItem({ icon, label, hasSubmenu }: {
  icon: React.ReactNode;
  label: string;
  hasSubmenu?: boolean;
}) {
  return (
    <div className="px-3 py-2 hover:bg-white/10 cursor-pointer flex items-center gap-3 text-white/90 text-sm">
      <div className="w-4 h-4">{icon}</div>
      <span className="flex-1">{label}</span>
      {hasSubmenu && <ChevronRight className="w-4 h-4" />}
    </div>
  );
}

function WindowFrame({ title, icon, onClose, onMinimize, children, initialPosition }: {
  title: string;
  icon: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  children: React.ReactNode;
  initialPosition: { x: number; y: number };
}) {
  const [isMaximized, setIsMaximized] = useState(false);
  
  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <motion.div
      className="fixed z-30"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: 0,
        width: isMaximized ? '100vw' : '700px',
        height: isMaximized ? '100vh' : 'auto',
        x: isMaximized ? 0 : initialPosition.x,
        y: isMaximized ? 0 : initialPosition.y,
        top: isMaximized ? 0 : undefined,
        left: isMaximized ? 0 : undefined
      }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      drag={!isMaximized}
      dragMomentum={false}
      dragElastic={0}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      whileDrag={{ scale: 1.02, cursor: "grabbing" }}
      transition={{
        duration: 0.2,
        ease: "easeOut"
      }}
      style={{ 
        left: !isMaximized ? initialPosition.x : undefined, 
        top: !isMaximized ? initialPosition.y : undefined 
      }}
    >
      <div className={`bg-white ${isMaximized ? 'h-full' : 'rounded-lg'} overflow-hidden shadow-2xl border border-gray-300`}>
        <div className="bg-white border-b border-gray-200 px-3 py-2 flex items-center justify-between select-none cursor-move">
          <div className="flex items-center gap-3">
            <div className="text-gray-600">{icon}</div>
            <span className="text-sm font-medium text-gray-900">{title}</span>
          </div>
          <div className="flex items-center gap-1">
            <button 
              className="w-11 h-8 hover:bg-gray-100 flex items-center justify-center rounded transition-colors group"
              onClick={onMinimize}
              title="Minimize"
            >
              <div className="w-3 h-0.5 bg-gray-700 group-hover:bg-gray-900"></div>
            </button>
            <button 
              className="w-11 h-8 hover:bg-gray-100 flex items-center justify-center rounded transition-colors group"
              onClick={handleMaximize}
              title={isMaximized ? "Restore Down" : "Maximize"}
            >
              {isMaximized ? (
                <div className="relative w-3 h-3">
                  <div className="absolute top-0.5 right-0 w-2.5 h-2.5 border border-gray-700 group-hover:border-gray-900"></div>
                  <div className="absolute bottom-0 left-0.5 w-2.5 h-2.5 border border-gray-700 group-hover:border-gray-900 bg-white"></div>
                </div>
              ) : (
                <div className="w-3 h-3 border border-gray-700 group-hover:border-gray-900"></div>
              )}
            </button>
            <button 
              className="w-11 h-8 hover:bg-red-500 flex items-center justify-center rounded transition-colors group"
              onClick={onClose}
              title="Close"
            >
              <div className="relative w-3 h-3">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-0.5 bg-gray-700 group-hover:bg-white rotate-45"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-0.5 bg-gray-700 group-hover:bg-white -rotate-45"></div>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className={isMaximized ? 'h-[calc(100%-44px)] overflow-auto' : ''}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function FileItem({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <div className="flex flex-col items-center gap-2 p-3 hover:bg-blue-50 rounded cursor-pointer">
      <div className="text-blue-600 text-4xl">{icon}</div>
      <span className="text-xs text-gray-900 text-center">{name}</span>
    </div>
  );
}

function DocumentRow({ icon, name, date }: {
  icon: React.ReactNode;
  name: string;
  date: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded cursor-pointer">
      <div className="text-blue-600">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </div>
  );
}

function WifiNetwork({ name, signal, connected }: {
  name: string;
  signal: number;
  connected?: boolean;
}) {
  return (
    <div className={`p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors ${connected ? 'bg-white/5' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Wifi className="w-5 h-5 text-white/90" />
          <div>
            <p className="text-white text-sm">{name}</p>
            {connected && <p className="text-white/70 text-xs">Connected</p>}
          </div>
        </div>
        <div className="flex gap-0.5">
          {[1, 2, 3].map((bar) => (
            <div
              key={bar}
              className={`w-1 ${bar === 1 ? 'h-2' : bar === 2 ? 'h-3' : 'h-4'} rounded ${
                bar <= signal ? 'bg-white' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function RecommendedItem({ icon, title, subtitle }: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded cursor-pointer">
      <div className="text-primary">{icon}</div>
      <div className="flex-1">
        <p className="text-white text-sm">{title}</p>
        <p className="text-white/70 text-xs">{subtitle}</p>
      </div>
    </div>
  );
}

function QuickSetting({ icon, label, active }: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div className={`p-3 rounded-lg cursor-pointer transition-colors ${
      active ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/70 hover:bg-white/10'
    }`}>
      <div className="flex flex-col items-center gap-1">
        <div className="w-5 h-5">{icon}</div>
        <span className="text-xs">{label}</span>
      </div>
    </div>
  );
}