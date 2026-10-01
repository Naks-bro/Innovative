import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { useTheme } from "./ThemeProvider";
import { 
  CheckCircle,
  XCircle,
  Lightbulb,
  ArrowRight,
  Award,
  AlertTriangle,
  Sun,
  Moon
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

interface MicroTrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic?: string;
}

export default function MicroTrainingModal({ isOpen, onClose, topic = "Security Tips" }: MicroTrainingModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const questions = [
    {
      id: 0,
      question: "What was the primary red flag in the simulation?",
      options: [
        "The email had poor grammar",
        "The sender's email domain didn't match the official company domain",
        "The email was too long",
        "It was sent on a weekend"
      ],
      correctAnswer: 1,
      explanation: "The sender's domain 'company-verify.com' is a spoofed domain designed to look legitimate. Always verify the sender's email domain matches your organization's official domain."
    },
    {
      id: 1,
      question: "Why is urgency language a red flag in security emails?",
      options: [
        "It makes the email harder to read",
        "It pressures you to act quickly without thinking critically",
        "It's unprofessional",
        "It wastes time"
      ],
      correctAnswer: 1,
      explanation: "Attackers use urgency ('act now!', 'within 24 hours', 'account suspended') to bypass your critical thinking and make you act impulsively before verifying authenticity."
    },
    {
      id: 2,
      question: "What should you do when you receive a suspicious email?",
      options: [
        "Delete it immediately",
        "Click the link to verify if it's real",
        "Report it through official channels and verify independently",
        "Forward it to colleagues to warn them"
      ],
      correctAnswer: 2,
      explanation: "Always report suspicious emails through your organization's official reporting mechanism. If you need to verify account information, contact your IT department directly or navigate to the official website independently (don't use links in the email)."
    }
  ];

  const currentQ = questions[currentQuestion];
  const isAnswered = answers[currentQuestion] !== undefined;
  const isCorrect = answers[currentQuestion] === currentQ.correctAnswer.toString();
  const allAnswered = Object.keys(answers).length === questions.length;
  const score = Object.entries(answers).filter(([key, value]) => 
    value === questions[parseInt(key)].correctAnswer.toString()
  ).length;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
    } else {
      onClose();
    }
  };

  const handleTryAgain = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowFeedback(false);
  };

  return (
    <div className="min-h-screen bg-background/95 backdrop-blur flex items-center justify-center p-6 relative overflow-hidden">
      {/* Theme Toggle */}
      <Button
        className="fixed top-6 right-6 z-50 glass-panel border-2 border-primary/50 bg-card backdrop-blur-xl text-foreground hover:border-primary transition-all rounded-full w-12 h-12"
        onClick={toggleTheme}
        size="icon"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5 text-accent-cyan" /> : <Moon className="w-5 h-5 text-primary-blue" />}
      </Button>

      <Card className="w-full max-w-2xl glass-panel border-2 border-primary/30 bg-card/95 backdrop-blur-xl shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-accent-teal to-primary-blue p-6 text-white rounded-t-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shadow-lg">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white text-2xl">Micro-Training: Phishing Detection</h2>
              <p className="text-sm text-white/90">Quick knowledge check</p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2 text-white/90">
              <span className="font-medium">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="font-medium">{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
            </div>
            <Progress value={((currentQuestion + 1) / questions.length) * 100} className="bg-white/20" />
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {!allAnswered || currentQuestion < questions.length ? (
            <>
              <h3 className="text-foreground mb-6 text-xl font-semibold leading-relaxed">{currentQ.question}</h3>
              
              <RadioGroup 
                value={answers[currentQuestion]?.toString()} 
                onValueChange={handleAnswer}
                className="space-y-4"
              >
                {currentQ.options.map((option, index) => {
                  const isSelected = answers[currentQuestion] === index.toString();
                  const showResult = showFeedback && isSelected;
                  const isThisCorrect = index === currentQ.correctAnswer;
                  
                  return (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all ${
                        showResult
                          ? isThisCorrect
                            ? 'border-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20'
                            : 'border-red-500 bg-red-500/10 dark:bg-red-500/20'
                          : 'border-primary/30 bg-card hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10'
                      } ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
                    >
                      <RadioGroupItem 
                        value={index.toString()} 
                        id={`option-${index}`}
                        className="mt-1"
                        disabled={showFeedback}
                      />
                      <Label 
                        htmlFor={`option-${index}`} 
                        className="flex-1 cursor-pointer text-foreground font-medium"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span>{option}</span>
                          {showResult && (
                            isThisCorrect ? (
                              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                            )
                          )}
                        </div>
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>

              {showFeedback && (
                <div className={`mt-6 p-5 rounded-xl border-2 ${
                  isCorrect 
                    ? 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10' 
                    : 'border-amber-500 bg-amber-500/5 dark:bg-amber-500/10'
                }`}>
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
                    )}
                    <div>
                      <h4 className={`mb-2 font-bold ${isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>
                        {isCorrect ? 'Correct!' : 'Not quite right'}
                      </h4>
                      <p className="text-sm text-foreground leading-relaxed">{currentQ.explanation}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-8">
                <Button 
                  variant="outline"
                  className="border-2 border-primary/30 bg-card hover:bg-muted text-foreground"
                  onClick={handleTryAgain}
                >
                  Start Over
                </Button>
                <Button 
                  className="flex-1 gradient-btn text-white font-semibold shadow-lg"
                  onClick={handleNext}
                  disabled={!isAnswered}
                >
                  {currentQuestion === questions.length - 1 ? 'Complete Training' : 'Next Question'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </>
          ) : null}
        </div>

        {/* Footer */}
        <div className="glass-panel border-t-2 border-border px-8 py-4 rounded-b-xl">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-foreground">
              <Award className="w-4 h-4 text-accent-gold" />
              <span className="font-semibold text-accent-gold">+50 points upon completion</span>
            </div>
            <div className="text-foreground font-medium">
              Score: <span className="font-bold text-primary">{score}/{questions.length}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}