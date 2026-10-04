// Core Models & Types for Cogniva

export type UserLevel = {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'student' | 'demo' | 'pro';
  bio: string;
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string; // ISO string
  totalStudyMinutes: number;
  todayStudyMinutes: number;
  xp: number;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    soundEnabled: boolean;
    notificationsEnabled: boolean;
    pomodoroFocusMinutes: number;
    pomodoroShortBreakMinutes: number;
    pomodoroLongBreakMinutes: number;
    apiKey?: string;
    aiProvider: 'cogniva-mock' | 'gemini' | 'openai';
  };
};

export type Subject = {
  id: string;
  name: string;
  code: string;
  description: string;
  iconName: string; // Lucide icon name string
  color: string; // Tailwind color class or hex
  accentColor: string;
  progress: number; // 0 - 100
  studyMinutes: number;
  quizAccuracy: number; // 0 - 100
  cardsCount: number;
  cardsMastered: number;
  topics: Topic[];
};

export type Topic = {
  id: string;
  subjectId: string;
  name: string;
  description: string;
  masteryPercentage: number;
  isWeakArea?: boolean;
  notesCount?: number;
  quizzesTaken?: number;
};

export type FlashcardMastery = 'new' | 'learning' | 'review' | 'mastered';

export type Flashcard = {
  id: string;
  subjectId: string;
  subjectName: string;
  topicId: string;
  topicName: string;
  question: string;
  answer: string;
  codeSnippet?: string;
  mastery: FlashcardMastery;
  reviewCount: number;
  correctCount: number;
  incorrectCount: number;
  lastReviewedAt?: string;
  nextReviewDate: string; // ISO string
  bookmarked: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
};

export type FlashcardDeck = {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  totalCards: number;
  masteredCount: number;
  dueTodayCount: number;
  cardIds: string[];
};

export type QuestionType = 'multiple_choice' | 'true_false' | 'multiple_answer';

export type QuizOption = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type QuizQuestion = {
  id: string;
  type: QuestionType;
  question: string;
  codeSnippet?: string;
  options: QuizOption[];
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topicName: string;
};

export type QuizAttempt = {
  id: string;
  subjectId: string;
  subjectName: string;
  topicName: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: QuizQuestion[];
  userAnswers: Record<string, string[]>; // questionId -> selectedOptionIds
  score: number; // correct count
  totalQuestions: number;
  accuracy: number; // percentage
  timeSpentSeconds: number;
  xpEarned: number;
  completedAt: string;
};

export type PomodoroSession = {
  id: string;
  subjectId: string;
  subjectName: string;
  topicName: string;
  goal: string;
  durationMinutes: number;
  type: 'focus' | 'short_break' | 'long_break';
  completedAt: string;
  xpEarned: number;
};

export type PlannerTask = {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
};

export type StudyGoal = {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  targetDescription: string;
  progressPercentage: number;
  deadlineDays: number;
  targetDate: string;
  tasks: PlannerTask[];
  completed: boolean;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  category: 'focus' | 'streak' | 'quiz' | 'flashcard' | 'mastery';
  unlocked: boolean;
  unlockedAt?: string;
  progress: number; // 0 - 100
  targetValue: number;
  currentValue: number;
  unit: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'streak' | 'quiz' | 'flashcard' | 'focus' | 'insight';
  actionUrl?: string;
};

export type AdaptiveRecommendation = {
  id: string;
  subjectId: string;
  subjectName: string;
  topicName: string;
  title: string;
  reason: string;
  urgency: 'high' | 'medium' | 'low';
  scoreDifference: number; // e.g. -18% vs avg
  recommendedActions: {
    flashcardsCount: number;
    quizQuestionsCount: number;
    focusDurationMinutes: number;
  };
};

export type AIChatMessage = {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  relatedSubject?: string;
  suggestedAction?: {
    type: 'create_quiz' | 'create_cards' | 'start_pomodoro';
    label: string;
    payload: Record<string, any>;
  };
};

export type DailyStudyLog = {
  date: string; // YYYY-MM-DD
  minutes: number;
  sessionsCount: number;
  quizzesCompleted: number;
  cardsReviewed: number;
};
