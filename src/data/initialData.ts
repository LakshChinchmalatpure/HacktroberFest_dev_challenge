import {
  UserProfile,
  Subject,
  FlashcardDeck,
  QuizAttempt,
  PomodoroSession,
  StudyGoal,
  Achievement,
  NotificationItem,
  AdaptiveRecommendation,
  DailyStudyLog,
} from '@/types';
import { PRESET_FLASHCARDS } from './presetFlashcards';
import { PRESET_QUESTIONS } from './presetQuestions';

export const INITIAL_USER: UserProfile = {
  id: 'user-laksh',
  name: 'Laksh',
  email: 'laksh@cogniva.dev',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'student',
  bio: 'CS Junior & aspiring Systems / AI Engineer | Focusing on DSA, DBMS & OS',
  currentStreak: 12,
  bestStreak: 15,
  lastActiveDate: new Date().toISOString(),
  totalStudyMinutes: 2892, // ~48.2 hours
  todayStudyMinutes: 45,
  xp: 2840,
  preferences: {
    theme: 'dark',
    soundEnabled: true,
    notificationsEnabled: true,
    pomodoroFocusMinutes: 25,
    pomodoroShortBreakMinutes: 5,
    pomodoroLongBreakMinutes: 15,
    aiProvider: 'cogniva-mock',
  },
};

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'sub-dsa',
    name: 'Data Structures',
    code: 'CS201',
    description: 'Fundamental data structures, algorithmic complexity, tree balancing, and graph traversals.',
    iconName: 'Network',
    color: 'from-blue-600 to-indigo-600',
    accentColor: '#6366f1',
    progress: 72,
    studyMinutes: 870, // 14.5 hrs
    quizAccuracy: 82,
    cardsCount: 32,
    cardsMastered: 24,
    topics: [
      { id: 'top-dsa-arrays', subjectId: 'sub-dsa', name: 'Arrays & Dynamic Arrays', description: 'Amortized analysis, vector memory allocation', masteryPercentage: 92, quizzesTaken: 5 },
      { id: 'top-dsa-linked-lists', subjectId: 'sub-dsa', name: 'Linked Lists', description: 'Singly, doubly, cycle detection (Floyd\'s algorithm)', masteryPercentage: 88, quizzesTaken: 4 },
      { id: 'top-dsa-stacks-queues', subjectId: 'sub-dsa', name: 'Stack & Queue', description: 'Monotonic stack, circular buffer, deque', masteryPercentage: 84, quizzesTaken: 3 },
      { id: 'top-dsa-trees', subjectId: 'sub-dsa', name: 'Trees & BST', description: 'AVL balancing, Red-Black properties, BFS/DFS', masteryPercentage: 70, quizzesTaken: 6 },
      { id: 'top-dsa-graphs', subjectId: 'sub-dsa', name: 'Graphs', description: 'Dijkstra, Bellman-Ford, Prim, Kruskal, Topological sort', masteryPercentage: 55, isWeakArea: true, quizzesTaken: 4 },
    ],
  },
  {
    id: 'sub-dbms',
    name: 'DBMS',
    code: 'CS302',
    description: 'Relational database engines, SQL querying, indexing structures, and transaction concurrency.',
    iconName: 'Database',
    color: 'from-teal-500 to-emerald-600',
    accentColor: '#14b8a6',
    progress: 58,
    studyMinutes: 672, // 11.2 hrs
    quizAccuracy: 64,
    cardsCount: 28,
    cardsMastered: 16,
    topics: [
      { id: 'top-dbms-relational', subjectId: 'sub-dbms', name: 'Relational Algebra', description: 'Tuple calculus, projections, selections', masteryPercentage: 76, quizzesTaken: 3 },
      { id: 'top-dbms-sql-joins', subjectId: 'sub-dbms', name: 'SQL Joins', description: 'Outer, inner, cross, hash join mechanisms', masteryPercentage: 42, isWeakArea: true, quizzesTaken: 5 },
      { id: 'top-dbms-norm', subjectId: 'sub-dbms', name: 'Normalization', description: '1NF, 2NF, 3NF, BCNF dependency preservation', masteryPercentage: 68, quizzesTaken: 3 },
      { id: 'top-dbms-indexes', subjectId: 'sub-dbms', name: 'B-Trees & Indexing', description: 'B+ Tree fan-out, clustered vs secondary indexes', masteryPercentage: 80, quizzesTaken: 4 },
      { id: 'top-dbms-transactions', subjectId: 'sub-dbms', name: 'Transactions & ACID', description: 'Isolation levels, 2-Phase Locking, WAL', masteryPercentage: 72, quizzesTaken: 4 },
    ],
  },
  {
    id: 'sub-os',
    name: 'Operating Systems',
    code: 'CS303',
    description: 'Kernel architectures, CPU scheduling, thread synchronization, memory paging, and file systems.',
    iconName: 'Cpu',
    color: 'from-purple-600 to-pink-600',
    accentColor: '#a855f7',
    progress: 81,
    studyMinutes: 960, // 16 hrs
    quizAccuracy: 85,
    cardsCount: 36,
    cardsMastered: 29,
    topics: [
      { id: 'top-os-processes', subjectId: 'sub-os', name: 'Process & Threads', description: 'Context switching, IPC, POSIX fork', masteryPercentage: 90, quizzesTaken: 5 },
      { id: 'top-os-concurrency', subjectId: 'sub-os', name: 'Deadlocks & Concurrency', description: 'Banker algorithm, semaphores, mutexes', masteryPercentage: 86, quizzesTaken: 6 },
      { id: 'top-os-memory', subjectId: 'sub-os', name: 'Virtual Memory & Paging', description: 'TLB, page replacement, inverted tables', masteryPercentage: 78, quizzesTaken: 4 },
      { id: 'top-os-filesystem', subjectId: 'sub-os', name: 'File Systems & I/O', description: 'Inodes, directory structures, journaling', masteryPercentage: 82, quizzesTaken: 3 },
    ],
  },
  {
    id: 'sub-cn',
    name: 'Computer Networks',
    code: 'CS304',
    description: 'Layered network stack, TCP flow and congestion control, IP addressing, and web application protocols.',
    iconName: 'Globe',
    color: 'from-amber-500 to-orange-600',
    accentColor: '#f59e0b',
    progress: 62,
    studyMinutes: 588, // 9.8 hrs
    quizAccuracy: 76,
    cardsCount: 24,
    cardsMastered: 18,
    topics: [
      { id: 'top-cn-osi', subjectId: 'sub-cn', name: 'OSI & TCP/IP Model', description: 'Layer responsibilities and encapsulation', masteryPercentage: 88, quizzesTaken: 3 },
      { id: 'top-cn-transport', subjectId: 'sub-cn', name: 'TCP/IP & Transport Layer', description: '3-way handshake, congestion window, flow control', masteryPercentage: 74, quizzesTaken: 4 },
      { id: 'top-cn-routing', subjectId: 'sub-cn', name: 'Routing Protocols', description: 'OSPF, BGP, distance vector vs link-state', masteryPercentage: 62, isWeakArea: true, quizzesTaken: 2 },
      { id: 'top-cn-application', subjectId: 'sub-cn', name: 'DNS & HTTP/3', description: 'QUIC, TLS handshake, resolver caching', masteryPercentage: 80, quizzesTaken: 3 },
    ],
  },
  {
    id: 'sub-aiml',
    name: 'AI & Machine Learning',
    code: 'CS405',
    description: 'Machine learning fundamentals, deep learning, gradient optimization, and evaluation metrics.',
    iconName: 'Sparkles',
    color: 'from-rose-500 to-red-600',
    accentColor: '#f43f5e',
    progress: 45,
    studyMinutes: 450, // 7.5 hrs
    quizAccuracy: 71,
    cardsCount: 22,
    cardsMastered: 12,
    topics: [
      { id: 'top-aiml-supervised', subjectId: 'sub-aiml', name: 'Supervised Learning', description: 'Regression, classification, bias-variance tradeoff', masteryPercentage: 82, quizzesTaken: 3 },
      { id: 'top-aiml-deep-learning', subjectId: 'sub-aiml', name: 'Neural Networks & Deep Learning', description: 'Backpropagation, activation functions, CNNs', masteryPercentage: 58, isWeakArea: true, quizzesTaken: 4 },
      { id: 'top-aiml-optimization', subjectId: 'sub-aiml', name: 'Optimization & Loss Functions', description: 'SGD, Adam, Cross-Entropy, MSE', masteryPercentage: 68, quizzesTaken: 2 },
    ],
  },
];

export const INITIAL_DECKS: FlashcardDeck[] = [
  {
    id: 'deck-dbms-joins',
    subjectId: 'sub-dbms',
    title: 'SQL Joins & Relational Algebra',
    description: 'Core joins, anti-joins, Cartesian products, and engine algorithms.',
    totalCards: 5,
    masteredCount: 1,
    dueTodayCount: 3,
    cardIds: ['fc-dbms-1', 'fc-dbms-2', 'fc-dbms-3', 'fc-dbms-4', 'fc-dbms-5'],
  },
  {
    id: 'deck-dsa-trees',
    subjectId: 'sub-dsa',
    title: 'Trees & Graph Algorithms',
    description: 'Balanced trees, shortest path algorithms, and traversals.',
    totalCards: 3,
    masteredCount: 2,
    dueTodayCount: 1,
    cardIds: ['fc-dsa-1', 'fc-dsa-2', 'fc-dsa-3'],
  },
  {
    id: 'deck-os-concurrency',
    subjectId: 'sub-os',
    title: 'OS Concurrency & Deadlocks',
    description: 'Coffman criteria, synchronization primitives, and virtual memory.',
    totalCards: 2,
    masteredCount: 1,
    dueTodayCount: 1,
    cardIds: ['fc-os-1', 'fc-os-2'],
  },
];

export const INITIAL_QUIZ_ATTEMPTS: QuizAttempt[] = [
  {
    id: 'qa-1',
    subjectId: 'sub-dbms',
    subjectName: 'DBMS',
    topicName: 'SQL Joins',
    difficulty: 'intermediate',
    questions: PRESET_QUESTIONS['DBMS-SQL Joins'] || [],
    userAnswers: {
      'q-sql-1': ['opt-1a'], // Wrong (answered 9 instead of 20)
      'q-sql-2': ['opt-2b'], // Correct (HAVING)
      'q-sql-3': ['opt-3a'], // Correct (True)
      'q-sql-4': ['opt-4a'], // Partially incorrect
      'q-sql-5': ['opt-5a'], // Wrong
    },
    score: 2,
    totalQuestions: 5,
    accuracy: 40,
    timeSpentSeconds: 145,
    xpEarned: 40,
    completedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: 'qa-2',
    subjectId: 'sub-dsa',
    subjectName: 'Data Structures',
    topicName: 'Trees & Graphs',
    difficulty: 'intermediate',
    questions: PRESET_QUESTIONS['Data Structures-Trees & Graphs'] || [],
    userAnswers: {
      'q-dsa-1': ['opt-dsa1-a'],
      'q-dsa-2': ['opt-dsa2-a'],
      'q-dsa-3': ['opt-dsa3-a', 'opt-dsa3-b'],
    },
    score: 3,
    totalQuestions: 3,
    accuracy: 100,
    timeSpentSeconds: 98,
    xpEarned: 150,
    completedAt: new Date(Date.now() - 3600000 * 42).toISOString(),
  },
];

export const INITIAL_POMODORO_SESSIONS: PomodoroSession[] = [
  {
    id: 'pomo-1',
    subjectId: 'sub-dsa',
    subjectName: 'Data Structures',
    topicName: 'Graph Algorithms',
    goal: 'Understand Bellman-Ford negative cycle relaxation steps',
    durationMinutes: 25,
    type: 'focus',
    completedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    xpEarned: 100,
  },
  {
    id: 'pomo-2',
    subjectId: 'sub-dbms',
    subjectName: 'DBMS',
    topicName: 'SQL Joins',
    goal: 'Review nested loop vs hash join query plans',
    durationMinutes: 20,
    type: 'focus',
    completedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    xpEarned: 80,
  },
  {
    id: 'pomo-3',
    subjectId: 'sub-os',
    subjectName: 'Operating Systems',
    topicName: 'Virtual Memory',
    goal: 'Solve inverted page table exercises',
    durationMinutes: 25,
    type: 'focus',
    completedAt: new Date(Date.now() - 86400000).toISOString(),
    xpEarned: 100,
  },
];

export const INITIAL_STUDY_GOALS: StudyGoal[] = [
  {
    id: 'goal-dsa-mastery',
    subjectId: 'sub-dsa',
    subjectName: 'Data Structures',
    title: 'Master Data Structures',
    targetDescription: 'Complete comprehensive study across arrays, lists, stacks, queues, trees, and graphs.',
    progressPercentage: 68,
    deadlineDays: 30,
    targetDate: new Date(Date.now() + 86400000 * 30).toISOString(),
    completed: false,
    tasks: [
      { id: 't-1', title: 'Dynamic Arrays & Amortized Doubling', completed: true },
      { id: 't-2', title: 'Singly and Doubly Linked Lists', completed: true },
      { id: 't-3', title: 'Stack & Monotonic Stack Problems', completed: true },
      { id: 't-4', title: 'Queue & Circular Deque Implementations', completed: true },
      { id: 't-5', title: 'AVL & Binary Search Trees Rotations', completed: false },
      { id: 't-6', title: 'Graphs: Dijkstra & Bellman-Ford Shortest Path', completed: false },
    ],
  },
  {
    id: 'goal-dbms-sql',
    subjectId: 'sub-dbms',
    subjectName: 'DBMS',
    title: 'Relational Database & Query Optimization',
    targetDescription: 'Attain >85% mastery in complex SQL joins, indexing, and ACID guarantees.',
    progressPercentage: 50,
    deadlineDays: 21,
    targetDate: new Date(Date.now() + 86400000 * 21).toISOString(),
    completed: false,
    tasks: [
      { id: 't-dbms-1', title: 'Master Inner, Left, Right and Full Outer Joins', completed: false },
      { id: 't-dbms-2', title: 'Hash Joins vs Sort Merge Joins in Engine Plans', completed: false },
      { id: 't-dbms-3', title: 'B+ Tree Index Range Lookups', completed: true },
      { id: 't-dbms-4', title: 'Transaction Isolation Levels & Concurrency Anomalies', completed: true },
    ],
  },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-focus',
    title: 'First Focus',
    description: 'Complete your first Pomodoro study session.',
    icon: 'Flame',
    xpReward: 100,
    category: 'focus',
    unlocked: true,
    unlockedAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    progress: 100,
    targetValue: 1,
    currentValue: 1,
    unit: 'session',
  },
  {
    id: 'ach-7-day-streak',
    title: '7 Day Streak',
    description: 'Study for seven consecutive days without breaking streak.',
    icon: 'Zap',
    xpReward: 250,
    category: 'streak',
    unlocked: true,
    unlockedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    progress: 100,
    targetValue: 7,
    currentValue: 12,
    unit: 'days',
  },
  {
    id: 'ach-quiz-master',
    title: 'Quiz Master',
    description: 'Achieve 90% or higher accuracy across five separate quizzes.',
    icon: 'Trophy',
    xpReward: 300,
    category: 'quiz',
    unlocked: true,
    unlockedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    progress: 100,
    targetValue: 5,
    currentValue: 5,
    unit: 'quizzes',
  },
  {
    id: 'ach-flashcard-master',
    title: 'Flashcard Master',
    description: 'Master 100 flashcards in your active library.',
    icon: 'BookOpen',
    xpReward: 400,
    category: 'flashcard',
    unlocked: false,
    progress: 64,
    targetValue: 100,
    currentValue: 64,
    unit: 'cards',
  },
  {
    id: 'ach-10h-scholar',
    title: '10 Hour Scholar',
    description: 'Complete ten hours of focused Pomodoro learning.',
    icon: 'Clock',
    xpReward: 350,
    category: 'focus',
    unlocked: true,
    unlockedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    progress: 100,
    targetValue: 10,
    currentValue: 48,
    unit: 'hours',
  },
  {
    id: 'ach-14-day-streak',
    title: 'Fortnight Titan',
    description: 'Reach a continuous 14-day study streak.',
    icon: 'Award',
    xpReward: 500,
    category: 'streak',
    unlocked: false,
    progress: 86,
    targetValue: 14,
    currentValue: 12,
    unit: 'days',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Cogniva Adaptive Insight',
    message: 'Your performance in SQL Joins is below average (42%). A remedial session is ready.',
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    read: false,
    type: 'insight',
  },
  {
    id: 'notif-2',
    title: 'Flashcards Due For Review',
    message: 'You have 15 flashcards due for revision today across DBMS and Data Structures.',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    read: false,
    type: 'flashcard',
  },
  {
    id: 'notif-3',
    title: 'Streak At Risk',
    message: 'Your 12-day streak is active! Complete at least one 25m focus session today to preserve it.',
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    read: false,
    type: 'streak',
  },
  {
    id: 'notif-4',
    title: 'Performance Update',
    message: 'Your Data Structures quiz score reached 100% on Trees & Graphs.',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    read: true,
    type: 'quiz',
  },
];

export const INITIAL_RECOMMENDATIONS: AdaptiveRecommendation[] = [
  {
    id: 'rec-sql-joins',
    subjectId: 'sub-dbms',
    subjectName: 'DBMS',
    topicName: 'SQL Joins',
    title: 'Remedial Mastery: SQL Joins & Relational Sets',
    reason: 'Your performance in SQL Joins is below your average (42% vs your 78% average). We recommend a targeted session to lock in core mental models.',
    urgency: 'high',
    scoreDifference: -36,
    recommendedActions: {
      flashcardsCount: 10,
      quizQuestionsCount: 5,
      focusDurationMinutes: 25,
    },
  },
  {
    id: 'rec-dsa-graphs',
    subjectId: 'sub-dsa',
    subjectName: 'Data Structures',
    topicName: 'Graphs',
    title: 'Reinforcement: Shortest Paths & Negative Cycles',
    reason: 'Graph traversal accuracy dipped to 55% during your last review. Strengthening edge relaxation will boost exam readiness.',
    urgency: 'medium',
    scoreDifference: -23,
    recommendedActions: {
      flashcardsCount: 8,
      quizQuestionsCount: 4,
      focusDurationMinutes: 25,
    },
  },
];

// 30 days activity heatmap log for Laksh
export const INITIAL_DAILY_LOGS: DailyStudyLog[] = Array.from({ length: 30 }).map((_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (29 - i));
  const dateStr = d.toISOString().split('T')[0];
  
  // Create natural study variation, maintaining the last 12 days active streak
  const isStreakActiveDay = i >= 18; // last 12 days
  const minutes = isStreakActiveDay 
    ? (i === 29 ? 45 : Math.floor(40 + (i * 7) % 65))
    : (i % 3 === 0 ? 0 : Math.floor(25 + (i * 5) % 50));

  return {
    date: dateStr,
    minutes,
    sessionsCount: minutes > 0 ? Math.max(1, Math.round(minutes / 25)) : 0,
    quizzesCompleted: minutes > 30 ? (i % 2 === 0 ? 1 : 2) : 0,
    cardsReviewed: minutes > 0 ? Math.floor(minutes / 3) : 0,
  };
});
