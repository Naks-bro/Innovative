import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner@2.0.3";
import { 
  Mail,
  Paperclip,
  Flag,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronLeft,
  Star,
  Archive,
  Trash2,
  MoreVertical,
  Info,
  Eye,
  Lightbulb,
  Inbox,
  Send,
  FileWarning
} from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

interface EmailSimulationProps {
  onComplete: (results: any) => void;
  onExit: () => void;
}

export default function EmailSimulation({ onComplete, onExit }: EmailSimulationProps) {
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [showHeaders, setShowHeaders] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleChoice = (choice: string) => {
    setUserChoice(choice);
    if (choice === "report-phishing") {
      toast.success("Correct! ✅", {
        description: "You identified all the phishing red flags!"
      });
      setTimeout(() => {
        onComplete({
          score: 100,
          points: 100,
          labName: "Phishing Detection Lab",
          correct: true
        });
      }, 2000);
    } else {
      toast.warning("Partial Credit", {
        description: "This was a simulation, but good caution!"
      });
      setTimeout(() => {
        onComplete({
          score: 75,
          points: 75,
          labName: "Phishing Detection Lab",
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
                Email Security Lab
              </Badge>
              <span className="text-sm text-muted-foreground">Phishing Email Detection</span>
            </div>

            <div className="h-6 w-px bg-border"></div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHeaders(!showHeaders)}
              className="text-foreground hover:text-primary"
            >
              <Eye className="w-4 h-4 mr-2" />
              {showHeaders ? 'Hide' : 'View'} Headers
            </Button>

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
                <strong className="text-accent-gold">Phishing Red Flags:</strong>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Suspicious sender domain</li>
                  <li>• Urgent/threatening language</li>
                  <li>• Requests for sensitive info</li>
                  <li>• Lookalike URLs (hover to check)</li>
                  <li>• Unexpected executable attachments</li>
                  <li>• Failed email authentication (SPF/DKIM)</li>
                </ul>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email Client Interface */}
      <div className="pt-32 pb-8 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-12 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Email Sidebar */}
            <div className="col-span-3">
              <Card className="p-4 border-slate-700 bg-slate-900">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-4">
                  <Send className="w-4 h-4 mr-2" />
                  Compose
                </Button>
                
                <div className="space-y-1">
                  <div className="px-3 py-2 bg-blue-600/20 text-blue-400 rounded cursor-pointer border border-blue-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Inbox className="w-4 h-4" />
                        <span className="text-sm font-medium">Inbox</span>
                      </div>
                      <Badge className="bg-blue-600 text-white">1</Badge>
                    </div>
                  </div>
                  <div className="px-3 py-2 hover:bg-slate-800 rounded cursor-pointer text-slate-400">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      <span className="text-sm">Starred</span>
                    </div>
                  </div>
                  <div className="px-3 py-2 hover:bg-slate-800 rounded cursor-pointer text-slate-400">
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      <span className="text-sm">Sent</span>
                    </div>
                  </div>
                  <div className="px-3 py-2 hover:bg-slate-800 rounded cursor-pointer text-slate-400">
                    <div className="flex items-center gap-2">
                      <FileWarning className="w-4 h-4" />
                      <span className="text-sm">Spam</span>
                    </div>
                  </div>
                  <div className="px-3 py-2 hover:bg-slate-800 rounded cursor-pointer text-slate-400">
                    <div className="flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm">Trash</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="mt-4 p-4 border-yellow-500/30 bg-yellow-500/10">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-yellow-500 mb-2">Detection Tips</h4>
                    <ul className="text-xs text-slate-300 space-y-1">
                      <li>• Hover over links</li>
                      <li>• Check sender address</li>
                      <li>• Look for urgency</li>
                      <li>• Verify attachments</li>
                      <li>• Check headers</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            {/* Email Content */}
            <div className="col-span-9">
              <Card className="border-slate-700 bg-slate-900 overflow-hidden">
                {/* Email Header */}
                <div className="bg-slate-900 border-b border-slate-700 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-xl font-bold text-white">⚠️ URGENT: Verify Your Account Now</h2>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <Badge className="bg-red-600 text-white">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Suspicious
                          </Badge>
                        </motion.div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <div className="flex items-center gap-2 cursor-help hover:text-blue-400 transition-colors">
                              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">S</span>
                              </div>
                              <div>
                                <p className="text-white font-medium">Security Team</p>
                                <p className="text-slate-400 text-xs">security@company-verify.com</p>
                              </div>
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80 border-red-500/30 bg-red-900/20 backdrop-blur-xl">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-red-400">
                                <AlertTriangle className="w-4 h-4" />
                                <span className="text-sm font-semibold">Suspicious Sender</span>
                              </div>
                              <p className="text-xs text-slate-300">
                                Domain "company-verify.com" does not match your organization's official domain.
                              </p>
                              <div className="bg-slate-900 rounded p-2 text-xs font-mono text-slate-300 border border-slate-700">
                                Expected: @yourcompany.com<br/>
                                Received: @company-verify.com
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                        
                        <div className="text-slate-400">
                          to: me@yourcompany.com
                        </div>
                        
                        <div className="text-slate-400">
                          10:23 AM (2 hours ago)
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                        <Star className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                        <Archive className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {showHeaders && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <Alert className="border-red-500/30 bg-red-900/20 mb-4">
                          <Mail className="w-4 h-4 text-red-400" />
                          <AlertDescription>
                            <div className="text-xs font-mono text-slate-300 space-y-1">
                              <p><strong>From:</strong> security@company-verify.com (Spoofed)</p>
                              <p><strong>Reply-To:</strong> <span className="text-red-400">noreply@phishing-site.ru 🚨</span></p>
                              <p><strong>SPF:</strong> <span className="text-red-400">FAIL 🚨</span></p>
                              <p><strong>DKIM:</strong> <span className="text-red-400">FAIL 🚨</span></p>
                              <p><strong>Return-Path:</strong> <span className="text-red-400">bounce@suspicious-mailer.xyz 🚨</span></p>
                            </div>
                          </AlertDescription>
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email Body */}
                <div className="p-6 bg-slate-900">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-slate-300 mb-4">Dear Valued Employee,</p>
                    
                    <motion.div 
                      className="bg-red-900/20 border-l-4 border-red-600 p-4 mb-4"
                      animate={{ borderColor: ["#dc2626", "#ef4444", "#dc2626"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <p className="text-white font-semibold mb-2">
                        <AlertTriangle className="inline w-4 h-4 mr-1" />
                        IMMEDIATE ACTION REQUIRED
                      </p>
                      <p className="text-slate-300 text-sm">
                        We have detected unusual activity on your account. Your account will be 
                        <strong className="text-red-400"> suspended in 24 hours</strong> unless you verify your credentials immediately.
                      </p>
                    </motion.div>

                    <p className="text-slate-300 mb-3">
                      To maintain access to your account and prevent service disruption, please click the button below 
                      to complete the verification process:
                    </p>

                    <div className="my-6 text-center">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button 
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg cursor-help shadow-lg shadow-red-600/30"
                            onClick={(e) => e.preventDefault()}
                          >
                            Verify Account Now →
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 border-red-500/30 bg-red-900/20 backdrop-blur-xl">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-red-400">
                              <AlertTriangle className="w-4 h-4" />
                              <span className="text-sm font-semibold">Malicious Link Detected</span>
                            </div>
                            <p className="text-xs text-slate-300 mb-2">
                              This link leads to a fake login page:
                            </p>
                            <div className="bg-slate-900 rounded p-2 text-xs font-mono text-red-400 break-all border border-slate-700">
                              http://companỳ-verify.com/login
                            </div>
                            <p className="text-xs text-slate-400">
                              Notice: Uses lookalike characters (ỳ instead of y)
                            </p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>

                    <p className="text-slate-300 mb-3">
                      If you do not verify within 24 hours, you will lose access to:
                    </p>
                    <ul className="text-slate-300 mb-3 space-y-1 list-disc list-inside">
                      <li>Company email and communication tools</li>
                      <li>Internal file sharing and documents</li>
                      <li>Payroll and benefits portal</li>
                      <li>All enterprise applications</li>
                    </ul>

                    <p className="text-slate-300 mb-4">
                      Thank you for your immediate attention to this matter.
                    </p>

                    <div className="border-t border-slate-700 pt-4 mt-4 text-xs text-slate-500">
                      <p>IT Security Team</p>
                      <p>Your Company Name</p>
                      <p className="text-red-400">This is an automated message - do not reply</p>
                    </div>
                  </div>

                  {/* Attachment Preview */}
                  <div className="mt-6">
                    <h4 className="text-sm text-white mb-3 flex items-center gap-2 font-medium">
                      <Paperclip className="w-4 h-4" />
                      1 Attachment
                    </h4>
                    <Card className="p-3 border-red-500/30 bg-red-900/10 hover:bg-red-900/20 cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className="w-10 h-10 bg-red-600/20 rounded flex items-center justify-center"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                        </motion.div>
                        <div className="flex-1">
                          <p className="text-sm text-white">Account_Verification_Form.exe</p>
                          <p className="text-xs text-red-400">⚠️ Executable file - High Risk</p>
                        </div>
                        <Badge className="bg-red-600 text-white">Blocked</Badge>
                      </div>
                    </Card>
                  </div>

                  {/* Action Buttons */}
                  <AnimatePresence>
                    {!userChoice ? (
                      <motion.div 
                        className="mt-6 flex gap-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Button 
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-6"
                          onClick={() => handleChoice('report-phishing')}
                        >
                          <Flag className="w-4 h-4 mr-2" />
                          Report as Phishing
                        </Button>
                        <Button 
                          variant="outline"
                          className="flex-1 border-2 border-slate-600 text-slate-300 hover:bg-slate-800 py-6"
                          onClick={() => handleChoice('report-safe')}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark as Safe
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <Alert className={userChoice === 'report-phishing' 
                          ? 'border-2 border-green-500 bg-green-500/10 mt-6' 
                          : 'border-2 border-yellow-500 bg-yellow-500/10 mt-6'
                        }>
                          {userChoice === 'report-phishing' ? (
                            <>
                              <CheckCircle className="w-5 h-5 text-green-400" />
                              <AlertDescription className="text-green-300">
                                <strong className="block mb-1">✅ Excellent Decision!</strong>
                                You correctly identified all the red flags: spoofed domain, urgency language, 
                                suspicious link with lookalike characters, failed email authentication, and malicious .exe attachment.
                              </AlertDescription>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-5 h-5 text-yellow-400" />
                              <AlertDescription className="text-yellow-300">
                                <strong className="block mb-1">⚠️ This Was a Phishing Attack!</strong>
                                Review the red flags: suspicious sender domain, urgent threats, fake verification link, 
                                and executable attachment. Always verify with IT before clicking links in urgent emails.
                              </AlertDescription>
                            </>
                          )}
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>

              {/* Red Flags Indicator */}
              <Card className="mt-4 p-4 border-red-500/30 bg-red-900/10">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  Identified Red Flags
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-red-400">
                    <XCircle className="w-3 h-3" />
                    <span>Suspicious sender domain</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-400">
                    <XCircle className="w-3 h-3" />
                    <span>Urgent language / threats</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-400">
                    <XCircle className="w-3 h-3" />
                    <span>Lookalike URL characters</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-400">
                    <XCircle className="w-3 h-3" />
                    <span>Malicious attachment (.exe)</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-400">
                    <XCircle className="w-3 h-3" />
                    <span>Failed SPF/DKIM checks</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-400">
                    <XCircle className="w-3 h-3" />
                    <span>Generic greeting</span>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
