import { useState, useEffect, useCallback } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner@2.0.3";
import Confetti from "./Confetti";
import {
  CheckCircle,
  XCircle,
  Clock,
  Award,
  Target,
  TrendingUp,
  Home,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Shield
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
}

interface EnhancedQuizProps {
  onComplete: (results: any) => void;
  onExit: () => void;
  labId?: string;
}

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
    question: "A pop-up suddenly appears claiming your computer is infected. What is this most likely to be?",
    options: [
      "Helpful antivirus software trying to protect you",
      "Scareware designed to trick you into downloading malware",
      "A legitimate Windows security warning",
      "A standard browser security feature"
    ],
    correct: 1,
    explanation: "This is classic scareware - malicious software that uses fear tactics to trick users into downloading malware or paying for fake services.",
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
      "Logging in twice to verify your identity"
    ],
    correct: 1,
    explanation: "2FA adds an extra layer of security by requiring a second form of verification beyond just a password, making unauthorized access much harder.",
    category: "Authentication",
    difficulty: "easy"
  },
  {
    id: 4,
    question: "You find a USB drive in the company parking lot labeled 'Executive Salaries'. What should you do?",
    options: [
      "Plug it into your work computer to see if you can return it",
      "Take it home and check it on your personal computer",
      "Report it to IT/Security without plugging it in",
      "Leave it where you found it"
    ],
    correct: 2,
    explanation: "USB drops are a common attack vector. Never plug unknown USB devices into any computer. Always report to IT/Security.",
    category: "Physical Security",
    difficulty: "medium"
  },
  {
    id: 5,
    question: "Which of these email addresses is most likely to be a phishing attempt?",
    options: [
      "support@company.com",
      "noreply@company.com",
      "security@c0mpany.com (with a zero)",
      "admin@company.com"
    ],
    correct: 2,
    explanation: "Attackers often use lookalike domains with subtle character substitutions (like 0 for O) to trick recipients.",
    category: "Phishing Detection",
    difficulty: "hard"
  },
  {
    id: 6,
    question: "What is the safest way to connect to public WiFi?",
    options: [
      "Just connect normally - WiFi is always safe",
      "Use a VPN to encrypt your connection",
      "Only visit HTTPS websites",
      "Turn off WiFi and use cellular data instead"
    ],
    correct: 1,
    explanation: "A VPN encrypts all your traffic, protecting your data even on unsecured public WiFi networks.",
    category: "Network Security",
    difficulty: "medium"
  },
  {
    id: 7,
    question: "An email attachment has a double file extension like 'document.pdf.exe'. What does this indicate?",
    options: [
      "It's a compressed PDF file",
      "It's likely malware disguising itself as a PDF",
      "It's a special secure document format",
      "It's a normal PDF that requires extra software"
    ],
    correct: 1,
    explanation: "Double extensions (especially ending in .exe, .scr, .bat) are a common malware technique to disguise executable files as documents.",
    category: "Malware Recognition",
    difficulty: "hard"
  }
];

export default function EnhancedQuiz({ onComplete, onExit, labId }: EnhancedQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shake, setShake] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  const question = questions[currentQuestion];

  const difficultyConfig = {
    easy: { color: "#10B981", emoji: "🟢", label: "Easy", badgeClass: "bg-green-500/20 text-green-500 border-green-500/40" },
    medium: { color: "#F59E0B", emoji: "🟡", label: "Medium", badgeClass: "bg-amber-500/20 text-amber-500 border-amber-500/40" },
    hard: { color: "#EF4444", emoji: "🔴", label: "Hard", badgeClass: "bg-red-500/20 text-red-500 border-red-500/40" }
  };

  // Timer countdown
  useEffect(() => {
    if (quizStarted && !quizCompleted && !showFeedback && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (timeRemaining === 0 && !showFeedback) {
      handleTimeUp();
    }
  }, [quizStarted, quizCompleted, showFeedback, timeRemaining]);

  const handleStart = () => {
    setQuizStarted(true);
    setQuestionStartTime(Date.now());
  };

  const handleTimeUp = () => {
    toast.error("Time's up! ⏰", {
      description: "Moving to next question..."
    });
    setTimeout(() => {
      moveToNext();
    }, 1500);
  };

  const handleAnswer = (index: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(index);
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = index;
    setUserAnswers(newAnswers);
    setShowFeedback(true);

    const isCorrect = index === question.correct;
    
    if (isCorrect) {
      toast.success("Correct! ✅", {
        description: "+10 points",
        duration: 2000
      });
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      toast.error("Incorrect ❌", {
        description: "Review the explanation",
        duration: 2000
      });
    }
  };

  const moveToNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setTimeRemaining(60);
      setQuestionStartTime(Date.now());
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    setQuizCompleted(true);
    const score = calculateScore();
    if (score >= 75) {
      setShowConfetti(true);
    }
    
    setTimeout(() => {
      onComplete({ score, userAnswers });
    }, 3000);
  };

  const calculateScore = () => {
    const correct = userAnswers.filter((answer, idx) => answer === questions[idx].correct).length;
    return Math.round((correct / questions.length) * 100);
  };

  const getTimerColor = () => {
    if (timeRemaining > 40) return "#10B981";
    if (timeRemaining > 20) return "#F59E0B";
    return "#EF4444";
  };

  const diff = difficultyConfig[question?.difficulty || "medium"];

  // Start Screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full"
        >
          <Card className="glass-panel border-2 border-primary-blue/40 bg-slate-900/80 backdrop-blur-2xl p-12 text-center">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="w-24 h-24 bg-gradient-to-br from-primary-blue via-accent-cyan to-accent-teal rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
            >
              <Target className="w-12 h-12 text-white" />
            </motion.div>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              Security Awareness Quiz
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Test your knowledge and earn your certification
            </p>

            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="p-4 bg-white/5 backdrop-blur rounded-xl border border-white/10">
                <div className="text-3xl font-bold text-white mb-1">{questions.length}</div>
                <div className="text-sm text-white/60">Questions</div>
              </div>
              <div className="p-4 bg-white/5 backdrop-blur rounded-xl border border-white/10">
                <div className="text-3xl font-bold text-white mb-1">60s</div>
                <div className="text-sm text-white/60">Per Question</div>
              </div>
              <div className="p-4 bg-white/5 backdrop-blur rounded-xl border border-white/10">
                <div className="text-3xl font-bold text-white mb-1">75%</div>
                <div className="text-sm text-white/60">To Pass</div>
              </div>
            </div>

            <Button
              onClick={handleStart}
              className="w-full py-6 text-lg bg-gradient-to-r from-primary-blue to-accent-cyan hover:from-primary-blue-dark hover:to-accent-cyan-dark text-white shadow-xl"
            >
              <Target className="w-5 h-5 mr-2" />
              Start Quiz
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Completion Screen
  if (quizCompleted) {
    const score = calculateScore();
    const correct = userAnswers.filter((answer, idx) => answer === questions[idx].correct).length;
    const passed = score >= 75;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
        {showConfetti && <Confetti />}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="glass-panel border-2 border-accent-gold/40 bg-slate-900/80 backdrop-blur-2xl p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl ${
                passed ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-amber-500 to-orange-600'
              }`}
            >
              {passed ? (
                <Award className="w-16 h-16 text-white" />
              ) : (
                <TrendingUp className="w-16 h-16 text-white" />
              )}
            </motion.div>

            <h2 className="text-4xl font-bold text-white mb-4">
              {passed ? "Congratulations! 🎉" : "Good Effort! 💪"}
            </h2>
            <p className="text-xl text-white/80 mb-8">
              {passed 
                ? "You've passed the security awareness quiz!" 
                : "Keep practicing to improve your score"}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="p-6 bg-white/5 backdrop-blur rounded-xl border border-white/10">
                <div className="text-5xl font-bold text-white mb-2">{score}%</div>
                <div className="text-sm text-white/60">Final Score</div>
              </div>
              <div className="p-6 bg-white/5 backdrop-blur rounded-xl border border-white/10">
                <div className="text-5xl font-bold text-green-400 mb-2">{correct}</div>
                <div className="text-sm text-white/60">Correct</div>
              </div>
              <div className="p-6 bg-white/5 backdrop-blur rounded-xl border border-white/10">
                <div className="text-5xl font-bold text-red-400 mb-2">{questions.length - correct}</div>
                <div className="text-sm text-white/60">Incorrect</div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => onComplete({ score, userAnswers })}
                className="flex-1 py-6 bg-gradient-to-r from-primary-blue to-accent-cyan text-white"
              >
                <Award className="w-5 h-5 mr-2" />
                View Certificate
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="px-6 py-6 border-2 border-white/20 text-white hover:bg-white/10"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Quiz Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {showConfetti && <Confetti />}
      
      {/* Header with Progress */}
      <div className="max-w-4xl mx-auto mb-6">
        <Card className="glass-panel border-2 border-white/10 bg-slate-900/60 backdrop-blur-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onExit}
                className="text-white hover:bg-white/10"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Exit Quiz
              </Button>
              <div className="text-white/80 text-sm">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>
            
            {/* Circular Timer */}
            <div className="flex items-center gap-4">
              <Badge className={diff.badgeClass}>
                {diff.emoji} {diff.label}
              </Badge>
              <div className="relative">
                <svg className="w-16 h-16 -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke={getTimerColor()}
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - timeRemaining / 60)}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{timeRemaining}s</span>
                </div>
              </div>
            </div>
          </div>
          
          <Progress value={(currentQuestion / questions.length) * 100} className="h-2" />
        </Card>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0, scale: shake ? [1, 0.98, 1.02, 0.98, 1] : 1 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="glass-panel border-2 border-white/20 bg-slate-900/80 backdrop-blur-2xl p-8">
          {/* Category Badge */}
          <div className="flex items-center justify-between mb-6">
            <Badge className="bg-primary-blue/20 text-primary-blue border-2 border-primary-blue/40 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              {question.category}
            </Badge>
            <div className="text-white/60 text-sm">
              {userAnswers.filter(a => a !== null).length}/{questions.length} answered
            </div>
          </div>

          {/* Question */}
          <h3 className="text-2xl font-semibold text-white mb-8 leading-relaxed">
            {question.question}
          </h3>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correct;
              const showResult = showFeedback;

              let bgClass = "bg-white/5 hover:bg-white/10 border-white/20";
              let textClass = "text-white";

              if (showResult) {
                if (isCorrect) {
                  bgClass = "bg-green-500/20 border-green-500";
                  textClass = "text-green-400";
                } else if (isSelected && !isCorrect) {
                  bgClass = "bg-red-500/20 border-red-500";
                  textClass = "text-red-400";
                }
              } else if (isSelected) {
                bgClass = "bg-primary-blue/20 border-primary-blue";
              }

              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: showFeedback ? 1 : 1.02 }}
                  whileTap={{ scale: showFeedback ? 1 : 0.98 }}
                  onClick={() => handleAnswer(index)}
                  disabled={showFeedback}
                  className={`w-full p-6 rounded-xl border-2 transition-all text-left ${bgClass} ${
                    showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      showResult && isCorrect ? 'bg-green-500 border-green-500' :
                      showResult && isSelected && !isCorrect ? 'bg-red-500 border-red-500' :
                      isSelected ? 'bg-primary-blue border-primary-blue' :
                      'border-white/40'
                    }`}>
                      {showResult && isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : showResult && isSelected && !isCorrect ? (
                        <XCircle className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-white font-semibold">
                          {String.fromCharCode(65 + index)}
                        </span>
                      )}
                    </div>
                    <span className={`${textClass} flex-1 font-medium`}>
                      {option}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`p-6 rounded-xl border-2 ${
                  selectedAnswer === question.correct
                    ? 'bg-green-500/10 border-green-500/40'
                    : 'bg-blue-500/10 border-blue-500/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-semibold text-white mb-2">Explanation</h5>
                    <p className="text-white/80 leading-relaxed text-sm">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Button */}
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6"
            >
              <Button
                onClick={moveToNext}
                className="w-full py-6 bg-gradient-to-r from-primary-blue to-accent-cyan text-white text-lg"
              >
                {currentQuestion < questions.length - 1 ? (
                  <>
                    Next Question
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  <>
                    Complete Quiz
                    <CheckCircle className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}