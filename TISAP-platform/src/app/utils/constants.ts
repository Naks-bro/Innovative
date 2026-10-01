/**
 * Application-wide constants and configuration
 */

// Color variants for consistent theming
export const COLOR_VARIANTS = {
  blue: {
    border: 'border-primary-blue/30',
    bg: 'bg-primary-blue/10',
    text: 'text-primary-blue',
    gradient: 'from-primary-blue to-primary-blue-dark',
  },
  cyan: {
    border: 'border-accent-cyan/30',
    bg: 'bg-accent-cyan/10',
    text: 'text-accent-cyan',
    gradient: 'from-accent-cyan to-accent-cyan-dark',
  },
  teal: {
    border: 'border-accent-teal/30',
    bg: 'bg-accent-teal/10',
    text: 'text-accent-teal',
    gradient: 'from-accent-teal to-tisap-teal-dark',
  },
  gold: {
    border: 'border-accent-gold/30',
    bg: 'bg-accent-gold/10',
    text: 'text-accent-gold',
    gradient: 'from-accent-gold to-accent-gold-dark',
  },
} as const;

// Animation durations
export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;

// Difficulty levels
export const DIFFICULTY_LEVELS = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
} as const;

// Quiz settings
export const QUIZ_CONFIG = {
  timePerQuestion: 60, // seconds
  passingScore: 75, // percentage
  totalQuestions: 8,
} as const;

// Score thresholds
export const SCORE_THRESHOLDS = {
  expert: 90,
  proficient: 75,
  developing: 60,
  novice: 0,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  theme: 'tisap-theme',
  userProgress: 'tisap-user-progress',
  completedLabs: 'tisap-completed-labs',
  quizScores: 'tisap-quiz-scores',
} as const;

// Analytics events
export const ANALYTICS_EVENTS = {
  pageView: 'page_view',
  labStart: 'lab_start',
  labComplete: 'lab_complete',
  quizStart: 'quiz_start',
  quizComplete: 'quiz_complete',
  badgeEarned: 'badge_earned',
} as const;

// Badge criteria
export const BADGE_CRITERIA = {
  securityAwareness: {
    requiresLab: true,
    requiresQuiz: true,
    minScore: 75,
  },
  phishingMaster: {
    requiresLab: false,
    requiresQuiz: true,
    minScore: 90,
  },
  windowsExpert: {
    requiresLab: true,
    requiresQuiz: false,
    minScore: 100,
  },
} as const;

// Responsive breakpoints
export const BREAKPOINTS = {
  mobile: 375,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
} as const;
