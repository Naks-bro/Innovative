import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner@2.0.3";
import { 
  Globe,
  Lock,
  LockOpen,
  AlertTriangle,
  Download,
  Flag,
  CheckCircle,
  XCircle,
  ChevronLeft,
  Clock,
  Lightbulb,
  Search,
  Star,
  X,
  RefreshCw,
  ArrowLeft,
  ArrowRight,
  Menu
} from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";

interface BrowserSimulationProps {
  onComplete: (results: any) => void;
  onExit: () => void;
}

export default function BrowserSimulation({ onComplete, onExit }: BrowserSimulationProps) {
  const [showExtensionPrompt, setShowExtensionPrompt] = useState(false);
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleChoice = (choice: string) => {
    setUserChoice(choice);
    if (choice === "report") {
      toast.success("Correct! ✅", {
        description: "You identified the malicious browser extension!"
      });
      setTimeout(() => {
        onComplete({
          score: 100,
          points: 100,
          labName: "Browser Security Lab",
          correct: true
        });
      }, 2000);
    } else {
      toast.error("Incorrect! ❌", {
        description: "This extension would have stolen your data!"
      });
      setTimeout(() => {
        onComplete({
          score: 50,
          points: 50,
          labName: "Browser Security Lab",
          correct: false
        });
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Training Control Bar */}
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
              onClick={onExit}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Exit Lab
            </Button>
            
            <div className="h-6 w-px bg-border"></div>
            
            <div className="flex items-center gap-3">
              <Badge className="bg-primary text-white border-primary">
                Browser Security Lab
              </Badge>
              <span className="text-sm text-muted-foreground">Malicious Extension Detection</span>
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
                  <li>• Fake security warnings on websites</li>
                  <li>• Extensions requesting excessive permissions</li>
                  <li>• Non-HTTPS websites asking for sensitive data</li>
                  <li>• Suspicious URLs (misspellings like "deaIs")</li>
                  <li>• Pop-ups claiming your browser is outdated</li>
                </ul>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simulated Browser Window */}
      <div className="pt-32 pb-8 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="overflow-hidden shadow-2xl border-slate-700 bg-slate-900">
              {/* Browser Chrome */}
              <div className="bg-slate-800 border-b border-slate-700">
                {/* Tab Bar */}
                <div className="flex items-center gap-1 px-2 pt-2">
                  <div className="bg-slate-900 px-4 py-2 rounded-t-lg flex items-center gap-2 border-t border-l border-r border-slate-700">
                    <Globe className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">Online Shopping Deal</span>
                    <Button variant="ghost" className="h-5 w-5 p-0 hover:bg-slate-800 text-slate-400">
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="px-4 py-2 flex items-center gap-2 text-slate-500 hover:bg-slate-700 rounded-t-lg cursor-pointer">
                    <span className="text-sm">+</span>
                  </div>
                </div>
                
                {/* Address Bar */}
                <div className="bg-slate-900 p-3 flex items-center gap-3">
                  <div className="flex gap-2">
                    <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-200 hover:bg-slate-800">
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-200 hover:bg-slate-800">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-200 hover:bg-slate-800">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg">
                    <div className="flex items-center gap-2">
                      <LockOpen className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-slate-300">
                        http://amazing-deaIs-online.net/shop
                      </span>
                    </div>
                  </div>
                  
                  <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-200 hover:bg-slate-800">
                    <Star className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-200 hover:bg-slate-800">
                    <Menu className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Page Content */}
              <div className="bg-white min-h-[600px] relative">
                {/* Fake Website Content */}
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">🎉 Limited Time Offer!</h2>
                    <p className="text-xl text-gray-600">Up to 90% off on selected items</p>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="p-4 border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="w-full h-32 bg-gray-100 rounded mb-3 flex items-center justify-center text-gray-400">
                          Product Image
                        </div>
                        <p className="text-sm font-medium text-gray-900 mb-2">Premium Product {i}</p>
                        <p className="text-gray-600">
                          <span className="line-through text-sm">$99.99</span>
                          <span className="ml-2 text-2xl font-bold text-red-600">$9.99</span>
                        </p>
                        <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white">
                          Buy Now
                        </Button>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Fake Malicious Extension Popup */}
                <AnimatePresence>
                  {!userChoice && (
                    <motion.div 
                      className="absolute top-20 right-8 w-80"
                      initial={{ opacity: 0, x: 100, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ delay: 1, type: "spring" }}
                    >
                      <Card className="border-2 border-yellow-500 shadow-2xl bg-gradient-to-br from-yellow-50 to-orange-50">
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: [0, 10, -10, 10, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                            >
                              <AlertTriangle className="w-5 h-5 text-white" />
                            </motion.div>
                            <span className="font-bold text-white">Security Alert</span>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <p className="text-sm font-semibold text-gray-900 mb-1">
                            ⚠️ Your Browser is Outdated!
                          </p>
                          <p className="text-sm text-gray-700 mb-4">
                            Install our security extension to continue browsing safely and protect against malware.
                          </p>
                          
                          <div className="bg-gray-100 rounded p-3 mb-4 text-xs text-gray-600">
                            <p className="mb-1">✓ Real-time protection</p>
                            <p className="mb-1">✓ Ad blocking</p>
                            <p>✓ Password manager</p>
                          </div>
                          
                          <div className="space-y-2">
                            <Button 
                              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold"
                              onClick={() => setShowExtensionPrompt(true)}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Install Extension
                            </Button>
                            <Button 
                              variant="outline"
                              className="w-full border-2 border-green-600 text-green-700 hover:bg-green-50 font-semibold"
                              onClick={() => handleChoice('report')}
                            >
                              <Flag className="w-4 h-4 mr-2" />
                              Report as Suspicious
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Result Message */}
                <AnimatePresence>
                  {userChoice && (
                    <motion.div
                      className="absolute top-20 right-8 w-80"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
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
                              This was a fake security warning designed to trick you into installing a malicious extension.
                            </AlertDescription>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-red-600" />
                            <AlertDescription className="text-red-900">
                              <strong className="block mb-1">❌ This Was Malware!</strong>
                              The extension would have stolen your passwords and browsing data.
                            </AlertDescription>
                          </>
                        )}
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Extension Permission Dialog */}
      <Dialog open={showExtensionPrompt} onOpenChange={setShowExtensionPrompt}>
        <DialogContent className="max-w-md border-slate-700 bg-slate-900 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Extension Permissions Request
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              "SecureWeb Pro" wants to:
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 py-4">
            <div className="flex items-start gap-3 p-3 bg-red-900/20 border border-red-500/30 rounded">
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-white font-medium">Read and change all your data on all websites</p>
                <p className="text-xs text-red-300 mt-1">🚨 High Risk Permission</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-red-900/20 border border-red-500/30 rounded">
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-white font-medium">Manage your downloads</p>
                <p className="text-xs text-red-300 mt-1">🚨 Can download malware</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-red-900/20 border border-red-500/30 rounded">
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-white font-medium">Communicate with cooperating websites</p>
                <p className="text-xs text-red-300 mt-1">🚨 Data exfiltration risk</p>
              </div>
            </div>
          </div>

          <Alert className="border-yellow-500 bg-yellow-500/10">
            <Lightbulb className="w-4 h-4 text-yellow-500" />
            <AlertDescription className="text-yellow-200 text-sm">
              These permissions are extremely dangerous! Legitimate browser extensions rarely need this level of access.
            </AlertDescription>
          </Alert>

          <div className="flex gap-3 pt-2">
            <Button 
              variant="outline"
              className="flex-1 border-2 border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
              onClick={() => {
                setShowExtensionPrompt(false);
                handleChoice('report');
              }}
            >
              <Flag className="w-4 h-4 mr-2" />
              Report & Block
            </Button>
            <Button 
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                setShowExtensionPrompt(false);
                handleChoice('proceed');
              }}
            >
              Allow (Wrong!)
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
