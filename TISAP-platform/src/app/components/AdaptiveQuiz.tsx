import { useState, useEffect, useCallback } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { useTheme } from "./ThemeProvider";
import { toast } from "sonner@2.0.3";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Award,
  TrendingUp,
  Sun,
  Moon,
  ArrowRight,
  RotateCcw,
  Home,
  Sparkles,
  Target,
  BookOpen
} from "lucide-react";

interface AdaptiveQuizProps {
  onNavigate: (page: string) => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function AdaptiveQuiz({ onNavigate }: AdaptiveQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const questions: Question[] = [
    {
      id: 0,
      question: "You receive an email from your bank asking you to verify your account information immediately. What should you do first?",
      options: [
        "Click the link in the email to verify quickly",
        "Call the number provided in the email",
        "Independently navigate to your bank's official website or call their verified number",
        "Reply to the email asking if it's legitimate"
      ],
      correct: 2,
      explanation: "Always verify through official channels you find independently, not through information in suspicious messages. Banks never ask for sensitive information via email.",
      category: "Phishing Detection",
      difficulty: "medium"
    },
    {
      id: 1,
      question: "What characteristics make a password truly strong and secure?",
      options: [
        "Your name combined with your birth year",
        "A long passphrase with mixed characters, numbers, and symbols (12+ characters)",
        "The same memorable password used across all accounts",
        "A simple dictionary word that's easy to remember"
      ],
      correct: 1,
      explanation: "Strong passwords are long (12+ characters), complex (mix of uppercase, lowercase, numbers, symbols), and unique for each account. Passphrases are even better!",
      category: "Password Security",
      difficulty: "easy"
    },
    {
      id: 2,
      question: "A pop-up suddenly appears claiming your computer is infected and offers a 'free immediate scan'. What is this most likely to be?",
      options: [
        "Helpful antivirus software trying to protect you",
        "Scareware designed to trick you into downloading malware",
        "A legitimate Windows security warning",
        "A standard browser security feature"
      ],
      correct: 1,
      explanation: "This is classic scareware - malicious software that uses fear tactics to trick users into downloading malware or paying for fake services. Legitimate antivirus doesn't advertise through random pop-ups.",
      category: "Malware Recognition",
      difficulty: "medium"
    },
    {
      id: 3,
      question: "What is two-factor authentication (2FA) and why is it important?",
      options: [
        "Using two different passwords for extra security",
        "Requiring two forms of identification to access an account (password + phone/biometric)",
        "Having two separate email accounts for different purposes",
        "Logging in from two different trusted devices"
      ],
      correct: 1,
      explanation: "2FA adds an extra layer of security by requiring something you know (password) PLUS something you have (phone, security key) or something you are (fingerprint, face). This makes accounts much harder to compromise.",
      category: "Authentication",
      difficulty: "easy"
    },
    {
      id: 4,
      question: "You find a USB drive in the company parking lot labeled 'Q4 Salaries - Confidential'. What should you do?",
      options: [
        "Plug it into your work computer to identify the owner",
        "Take it home and check the contents on your personal computer",
        "Turn it in to IT security immediately without plugging it in anywhere",
        "Throw it in the trash to prevent data leaks"
      ],
      correct: 2,
      explanation: "Unknown USB drives can contain malware designed to compromise systems when plugged in. This is a common social engineering tactic. Always report found devices to IT security without connecting them to any computer.",
      category: "Physical Security",
      difficulty: "hard"
    },
    {
      id: 5,
      question: "A colleague sends you a Dropbox link to download a file, but the URL looks unusual and they don't typically use Dropbox. What should you do?",
      options: [
        "Click the link since it's from a colleague",
        "Download the file but scan it with antivirus first",
        "Contact your colleague through a different channel to verify they sent it",
        "Forward the email to others to see if they received it too"
      ],
      correct: 2,
      explanation: "Account compromise is common. Always verify unexpected requests through a different communication channel. Attackers often impersonate colleagues to spread malware.",
      category: "Social Engineering",
      difficulty: "medium"
    },
    {
      id: 6,
      question: "What is the safest way to handle sensitive company data when working remotely?",
      options: [
        "Use public Wi-Fi but clear browser history afterward",
        "Email sensitive files to your personal email for easy access",
        "Use company VPN on secured networks and follow data handling policies",
        "Save files to a personal cloud storage for backup"
      ],
      correct: 2,
      explanation: "Always use company-approved VPN connections and follow data handling policies. Never use personal email or cloud storage for company data, and avoid public Wi-Fi for sensitive work.",
      category: "Data Protection",
      difficulty: "hard"
    },
    {
      id: 7,
      question: "You notice unusual activity on your work account - login attempts from unfamiliar locations. What's the best immediate action?",
      options: [
        "Wait to see if it happens again before taking action",
        "Change your password and immediately report to IT security",
        "Log out of all devices and continue monitoring",
        "Assume it's a system error and ignore it"
      ],
      correct: 1,
      explanation: "Unusual login attempts are serious security incidents. Immediately change your password, report to IT security, and review account activity. Quick response can prevent or limit damage from account compromise.",
      category: "Incident Response",
      difficulty: "medium"
    }
  ];

  // Timer effect with proper cleanup
  useEffect(() => {
    if (!quizStarted || quizCompleted || showFeedback) return;
    
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Time's up - auto submit
      handleTimeUp();
    }
  }, [timeRemaining, quizStarted, quizCompleted, showFeedback]);

  const handleStart = useCallback(() => {
    setQuizStarted(true);
    setUserAnswers(new Array(questions.length).fill(null));
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setTimeRemaining(60);
    setQuizCompleted(false);
    
    toast.success("Quiz Started! 🎯", {
      description: "Answer carefully - you have 60 seconds per question"
    });
  }, [questions.length]);

  const handleTimeUp = useCallback(() => {
    if (selectedAnswer === null && !showFeedback) {
      toast.error("Time's Up! ⏰", {
        description: "Moving to next question..."
      });
      
      setUserAnswers(prev => {
        const updated = [...prev];
        updated[currentQuestion] = null;
        return updated;
      });
      
      setTimeout(() => {
        moveToNext();
      }, 1500);
    }
  }, [selectedAnswer, showFeedback, currentQuestion]);

  const handleAnswer = useCallback((index: number) => {
    if (showFeedback || isTransitioning) return;
    
    setSelectedAnswer(index);
    setShowFeedback(true);
    
    const isCorrect = index === questions[currentQuestion].correct;
    setUserAnswers(prev => {
      const updated = [...prev];
      updated[currentQuestion] = index;
      return updated;
    });

    // Show feedback toast
    if (isCorrect) {
      toast.success("Correct! 🎉", {
        description: "Great job!"
      });
    } else {
      toast.error("Incorrect ❌", {
        description: "Check the explanation below"
      });
    }
  }, [showFeedback, isTransitioning, currentQuestion, questions]);

  const moveToNext = useCallback(() => {
    if (isTransitioning) return;
    
    if (currentQuestion < questions.length - 1) {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setTimeRemaining(60);
        setIsTransitioning(false);
      }, 400);
    } else {
      completeQuiz();
    }
  }, [currentQuestion, questions.length, isTransitioning]);

  const completeQuiz = useCallback(() => {
    setQuizCompleted(true);
    const finalScore = calculateScore();
    const percentage = Math.round((finalScore / questions.length) * 100);
    
    toast.success(`Quiz Complete! 🎊`, {
      description: `You scored ${percentage}% - ${finalScore}/${questions.length} correct`
    });
  }, [questions.length]);

  const calculateScore = useCallback(() => {
    return userAnswers.filter((answer, index) => answer === questions[index].correct).length;
  }, [userAnswers, questions]);

  const handleNext = useCallback(() => {
    moveToNext();
  }, [moveToNext]);

  const handleRestart = useCallback(() => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers(new Array(questions.length).fill(null));
    setShowFeedback(false);
    setTimeRemaining(60);
    setQuizStarted(false);
    setQuizCompleted(false);
    setIsTransitioning(false);
    
    toast.info("Quiz Reset 🔄", {
      description: "Ready to try again!"
    });
  }, [questions.length]);

  const currentQ = questions[currentQuestion];
  const isCorrect = selectedAnswer === currentQ?.correct;
  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  // Quiz Start Screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4 md:p-6">
        <div className="circuit-bg absolute inset-0 opacity-50" />
        
        <Button
          className="fixed top-4 right-4 md:top-6 md:right-6 z-50 glass-panel border-2 border-primary/50 bg-card backdrop-blur-xl text-foreground hover:border-primary transition-all rounded-full w-12 h-12 shadow-lg"
          onClick={toggleTheme}
          size="icon"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-accent-cyan" />
          ) : (
            <Moon className="w-5 h-5 text-primary-blue" />
          )}
        </Button>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="w-full max-w-2xl relative z-10"
        >
          <Card className="glass-panel border-2 border-primary/30 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden">
            <motion.div 
              className="bg-gradient-to-r from-primary-blue to-accent-teal p-6 md:p-8 text-white text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div 
                className="icon-container-light w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", duration: 0.8 }}
              >
                <AlertCircle className="w-10 h-10 text-white" />
              </motion.div>
              <motion.h1 
                className="mb-2 text-white text-3xl md:text-4xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Adaptive Security Quiz
              </motion.h1>
              <motion.p 
                className="text-white/90 text-base md:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Test and improve your cybersecurity knowledge
              </motion.p>
            </motion.div>
            
            <div className="p-6 md:p-8">
              <motion.h3 
                className="text-foreground mb-6 text-xl md:text-2xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                Quiz Overview
              </motion.h3>
              
              <div className="space-y-4 mb-8">
                <motion.div 
                  className="flex items-start gap-3 p-4 rounded-lg bg-primary-blue/5 border border-primary-blue/20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="w-8 h-8 bg-primary-blue/20 border-2 border-primary-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-blue font-bold">8</span>
                  </div>
                  <div>
                    <p className="text-foreground font-semibold">Eight comprehensive questions</p>
                    <p className="text-sm text-muted-foreground">Covering key security concepts and real-world scenarios</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start gap-3 p-4 rounded-lg bg-accent-cyan/5 border border-accent-cyan/20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="w-8 h-8 bg-accent-cyan/20 border-2 border-accent-cyan rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-4 h-4 text-accent-cyan" />
                  </div>
                  <div>
                    <p className="text-foreground font-semibold">60 seconds per question</p>
                    <p className="text-sm text-muted-foreground">Think carefully but answer promptly</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start gap-3 p-4 rounded-lg bg-accent-teal/5 border border-accent-teal/20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="w-8 h-8 bg-accent-teal/20 border-2 border-accent-teal rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <TrendingUp className="w-4 h-4 text-accent-teal" />
                  </div>
                  <div>
                    <p className="text-foreground font-semibold">Instant feedback with explanations</p>
                    <p className="text-sm text-muted-foreground">Learn from each question with detailed explanations</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start gap-3 p-4 rounded-lg bg-accent-gold/5 border border-accent-gold/20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="w-8 h-8 bg-accent-gold/20 border-2 border-accent-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-4 h-4 text-accent-gold" />
                  </div>
                  <div>
                    <p className="text-foreground font-semibold">Earn achievements and track progress</p>
                    <p className="text-sm text-muted-foreground">75%+ score earns a Security Awareness badge</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  className="w-full gradient-btn text-white py-6 text-lg shadow-lg"
                  onClick={handleStart}
                >
                  Start Quiz
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <Button
                  variant="ghost"
                  className="w-full mt-3 text-muted-foreground hover:text-foreground"
                  onClick={() => onNavigate('dashboard')}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Quiz Completed Screen
  if (quizCompleted) {
    const passed = percentage >= 75;
    
    return (
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4 md:p-6">
        <div className="circuit-bg absolute inset-0 opacity-50" />
        
        <Button
          className="fixed top-4 right-4 md:top-6 md:right-6 z-50 glass-panel border-2 border-primary/50 bg-card backdrop-blur-xl text-foreground hover:border-primary transition-all rounded-full w-12 h-12 shadow-lg"
          onClick={toggleTheme}
          size="icon"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-accent-cyan" />
          ) : (
            <Moon className="w-5 h-5 text-primary-blue" />
          )}
        </Button>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="w-full max-w-2xl relative z-10"
        >
          <Card className="glass-panel border-2 border-primary/30 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden">
            <motion.div 
              className={`p-6 md:p-8 text-white text-center ${passed ? 'bg-gradient-to-r from-accent-teal to-primary-blue' : 'bg-gradient-to-r from-tisap-grey-600 to-tisap-grey-700'}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
                className="icon-container-light w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                {passed ? (
                  <Award className="w-12 h-12 text-white" />
                ) : (
                  <TrendingUp className="w-12 h-12 text-white" />
                )}
              </motion.div>
              <motion.h1 
                className="mb-2 text-white text-3xl md:text-4xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {passed ? "Congratulations! 🎉" : "Quiz Complete!"}
              </motion.h1>
              <motion.p 
                className="text-white/90 text-base md:text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {passed ? "You've demonstrated strong security awareness!" : "Keep learning to improve your security knowledge"}
              </motion.p>
            </motion.div>
            
            <div className="p-6 md:p-8">
              {/* Score Display */}
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <div className="inline-block">
                  <motion.div 
                    className="text-6xl md:text-7xl font-bold text-foreground mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: "spring", duration: 0.8 }}
                  >
                    {percentage}%
                  </motion.div>
                  <motion.p 
                    className="text-muted-foreground text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    {score} out of {questions.length} correct
                  </motion.p>
                </div>
              </motion.div>

              {/* Performance Badge */}
              <motion.div 
                className="flex justify-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Badge 
                  className={`px-6 py-3 text-lg ${
                    percentage >= 90 ? 'bg-accent-gold/20 text-accent-gold border-2 border-accent-gold' :
                    percentage >= 75 ? 'bg-accent-teal/20 text-accent-teal border-2 border-accent-teal' :
                    percentage >= 60 ? 'bg-accent-cyan/20 text-accent-cyan border-2 border-accent-cyan' :
                    'bg-muted text-muted-foreground border-2 border-muted'
                  }`}
                >
                  {percentage >= 90 ? '⭐ Expert' :
                   percentage >= 75 ? '🏆 Proficient' :
                   percentage >= 60 ? '📈 Developing' :
                   '📚 Keep Learning'}
                </Badge>
              </motion.div>

              {/* Review Breakdown */}
              <motion.div 
                className="space-y-3 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <h3 className="text-foreground text-lg font-semibold mb-4">Question Review:</h3>
                {questions.map((q, idx) => {
                  const userAnswer = userAnswers[idx];
                  const wasCorrect = userAnswer === q.correct;
                  
                  return (
                    <motion.div 
                      key={q.id}
                      className={`p-4 rounded-lg border-2 ${
                        wasCorrect 
                          ? 'bg-accent-teal/5 border-accent-teal/30' 
                          : 'bg-tisap-error/5 border-tisap-error/30'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0 + idx * 0.05 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          wasCorrect ? 'bg-accent-teal/20' : 'bg-tisap-error/20'
                        }`}>
                          {wasCorrect ? (
                            <CheckCircle className="w-5 h-5 text-accent-teal" />
                          ) : (
                            <XCircle className="w-5 h-5 text-tisap-error" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-foreground font-medium text-sm">
                            Question {idx + 1}: {q.category}
                          </p>
                          <p className="text-muted-foreground text-xs mt-1">
                            {wasCorrect ? 'Correct' : userAnswer === null ? 'Not answered' : 'Incorrect'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    className="w-full gradient-btn text-white py-6 text-lg shadow-lg"
                    onClick={() => onNavigate('results')}
                  >
                    View Detailed Results
                    <Award className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="w-full py-6 text-lg border-2"
                    onClick={handleRestart}
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Retake Quiz
                  </Button>
                </motion.div>

                <Button
                  variant="ghost"
                  className="w-full text-muted-foreground hover:text-foreground"
                  onClick={() => onNavigate('dashboard')}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Return to Dashboard
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Active Quiz Screen
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4 md:p-6">
      <div className="circuit-bg absolute inset-0 opacity-50" />
      
      <Button
        className="fixed top-4 right-4 md:top-6 md:right-6 z-50 glass-panel border-2 border-primary/50 bg-card backdrop-blur-xl text-foreground hover:border-primary transition-all rounded-full w-12 h-12 shadow-lg"
        onClick={toggleTheme}
        size="icon"
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-accent-cyan" />
        ) : (
          <Moon className="w-5 h-5 text-primary-blue" />
        )}
      </Button>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.98 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="w-full max-w-2xl relative z-10"
        >
          <Card className="glass-card light-mode-card border-2 border-primary/30 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Header with Progress */}
            <div className="bg-gradient-to-r from-primary-blue to-accent-cyan p-4 md:p-6">
              <motion.div 
                className="flex justify-between items-center mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div>
                  <Badge className="bg-white/20 text-white border-white/30 mb-2">
                    Question {currentQuestion + 1} of {questions.length}
                  </Badge>
                  <p className="text-white/90 text-sm">{currentQ.category}</p>
                </div>
                <motion.div 
                  className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm"
                  animate={timeRemaining <= 10 ? {
                    scale: [1, 1.05, 1],
                    transition: { repeat: Infinity, duration: 0.5 }
                  } : {}}
                >
                  <Clock className={`w-5 h-5 ${timeRemaining <= 10 ? 'text-tisap-error' : 'text-white'}`} />
                  <span className={`font-bold ${timeRemaining <= 10 ? 'text-tisap-error' : 'text-white'}`}>
                    {timeRemaining}s
                  </span>
                </motion.div>
              </motion.div>
              <Progress value={(currentQuestion / questions.length) * 100} className="h-2 bg-white/20" />
            </div>

            <div className="p-6 md:p-8">
              {/* Question */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
              >
                <h2 className="text-foreground text-xl md:text-2xl font-semibold mb-2">
                  {currentQ.question}
                </h2>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {currentQ.difficulty}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Current Score: {score}/{currentQuestion + (showFeedback ? 1 : 0)}
                  </span>
                </div>
              </motion.div>

              {/* Answer Options */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrectOption = index === currentQ.correct;
                  const showCorrect = showFeedback && isCorrectOption;
                  const showIncorrect = showFeedback && isSelected && !isCorrectOption;

                  return (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      onClick={() => handleAnswer(index)}
                      disabled={showFeedback || isTransitioning}
                      whileHover={!showFeedback && !isTransitioning ? { scale: 1.02, x: 5 } : {}}
                      whileTap={!showFeedback && !isTransitioning ? { scale: 0.98 } : {}}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                        showCorrect
                          ? 'border-accent-teal bg-accent-teal/10 ring-2 ring-accent-teal/50'
                          : showIncorrect
                          ? 'border-tisap-error bg-tisap-error/10 ring-2 ring-tisap-error/50'
                          : isSelected
                          ? 'border-primary-blue bg-primary-blue/10'
                          : 'border-border bg-card hover:border-primary-blue/50 hover:bg-primary-blue/5'
                      } ${showFeedback || isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            showCorrect
                              ? 'border-accent-teal bg-accent-teal text-white'
                              : showIncorrect
                              ? 'border-tisap-error bg-tisap-error text-white'
                              : isSelected
                              ? 'border-primary-blue bg-primary-blue text-white'
                              : 'border-muted-foreground'
                          }`}
                          animate={showCorrect ? { 
                            scale: [1, 1.2, 1],
                            rotate: [0, 360]
                          } : showIncorrect ? {
                            scale: [1, 1.1, 1],
                            rotate: [0, -10, 10, 0]
                          } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          {showCorrect ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : showIncorrect ? (
                            <XCircle className="w-5 h-5" />
                          ) : (
                            <span className="text-sm font-medium">
                              {String.fromCharCode(65 + index)}
                            </span>
                          )}
                        </motion.div>
                        <span className={`flex-1 ${
                          showCorrect || showIncorrect ? 'font-semibold' : ''
                        } text-foreground`}>
                          {option}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`p-4 rounded-lg border-2 overflow-hidden ${
                      isCorrect
                        ? 'bg-accent-teal/10 border-accent-teal/30'
                        : 'bg-tisap-error/10 border-tisap-error/30'
                    }`}
                  >
                    <motion.div 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-accent-teal flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-6 h-6 text-tisap-error flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className={`font-semibold mb-1 ${isCorrect ? 'text-accent-teal' : 'text-tisap-error'}`}>
                          {isCorrect ? 'Correct! Well done! 🎉' : 'Not quite right'}
                        </p>
                        <motion.p 
                          className="text-foreground text-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {currentQ.explanation}
                        </motion.p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next Button */}
              <AnimatePresence>
                {showFeedback && !isTransitioning && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className="w-full gradient-btn text-white py-6 text-lg shadow-lg"
                      onClick={handleNext}
                    >
                      {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}