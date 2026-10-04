import { create } from 'zustand';
import {
  UserProfile,
  Subject,
  Flashcard,
  FlashcardDeck,
  QuizAttempt,
  PomodoroSession,
  StudyGoal,
  Achievement,
  NotificationItem,
  AdaptiveRecommendation,
  DailyStudyLog,
} from '@/types';
import {
  INITIAL_USER,
  INITIAL_SUBJECTS,
  INITIAL_DECKS,
  INITIAL_QUIZ_ATTEMPTS,
  INITIAL_POMODORO_SESSIONS,
  INITIAL_STUDY_GOALS,
  INITIAL_ACHIEVEMENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_RECOMMENDATIONS,
  INITIAL_DAILY_LOGS,
} from '@/data/initialData';
import { PRESET_FLASHCARDS } from '@/data/presetFlashcards';
import { calculateNextReview } from '@/services/spacedRepetition';
import { soundManager } from '@/lib/sound';

interface ActivePomodoroState {
  isRunning: boolean;
  timeLeft: number;
  totalDuration: number;
  mode: 'focus' | 'short_break' | 'long_break';
  subjectId: string;
  subjectName: string;
  topicName: string;
  goal: string;
  sessionsCompleted: number;
}

interface AppState {
  user: UserProfile;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  subjects: Subject[];
  flashcards: Flashcard[];
  decks: FlashcardDeck[];
  quizAttempts: QuizAttempt[];
  pomodoroSessions: PomodoroSession[];
  studyGoals: StudyGoal[];
  achievements: Achievement[];
  notifications: NotificationItem[];
  recommendations: AdaptiveRecommendation[];
  dailyLogs: DailyStudyLog[];

  // Global UI state
  activePomodoro: ActivePomodoroState;
  isAIChatOpen: boolean;
  isGlobalSearchOpen: boolean;
  isOffline: boolean;
  latestUnlockedAchievement: Achievement | null;

  // Actions
  loginAsDemo: () => void;
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateUserPreferences: (prefs: Partial<UserProfile['preferences']>) => void;
  addXp: (amount: number) => void;

  // Pomodoro Actions
  startPomodoro: (subjectId: string, subjectName: string, topicName: string, goal: string) => void;
  pausePomodoro: () => void;
  resumePomodoro: () => void;
  resetPomodoro: () => void;
  tickPomodoro: () => void;
  skipPomodoro: () => void;
  completePomodoroSession: () => void;

  // Flashcards Actions
  reviewCard: (cardId: string, result: 'know' | 'again' | 'mastered') => void;
  addFlashcards: (cards: Flashcard[], deckTitle?: string) => void;
  toggleBookmarkCard: (cardId: string) => void;

  // Quiz Actions
  recordQuizAttempt: (attempt: QuizAttempt) => void;

  // Goal Actions
  addStudyGoal: (goal: Omit<StudyGoal, 'id'>) => void;
  toggleGoalTask: (goalId: string, taskId: string) => void;
  deleteStudyGoal: (goalId: string) => void;

  // Notification & UI Actions
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  setAIChatOpen: (open: boolean) => void;
  setGlobalSearchOpen: (open: boolean) => void;
  setOfflineStatus: (offline: boolean) => void;
  clearLatestAchievement: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  resetToDemoData: () => void;
}

const STORAGE_KEY = 'cogniva_store_v1';

// Helper to load persisted state or fallback
const loadSavedState = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Could not parse local storage state', e);
  }
  return null;
};

const saved = loadSavedState();

export const useAppStore = create<AppState>((set, get) => ({
  user: saved?.user || INITIAL_USER,
  isAuthenticated: saved?.isAuthenticated ?? true,
  isDemoMode: saved?.isDemoMode ?? true,
  subjects: saved?.subjects || INITIAL_SUBJECTS,
  flashcards: saved?.flashcards || PRESET_FLASHCARDS,
  decks: saved?.decks || INITIAL_DECKS,
  quizAttempts: saved?.quizAttempts || INITIAL_QUIZ_ATTEMPTS,
  pomodoroSessions: saved?.pomodoroSessions || INITIAL_POMODORO_SESSIONS,
  studyGoals: saved?.studyGoals || INITIAL_STUDY_GOALS,
  achievements: saved?.achievements || INITIAL_ACHIEVEMENTS,
  notifications: saved?.notifications || INITIAL_NOTIFICATIONS,
  recommendations: saved?.recommendations || INITIAL_RECOMMENDATIONS,
  dailyLogs: saved?.dailyLogs || INITIAL_DAILY_LOGS,

  activePomodoro: {
    isRunning: false,
    timeLeft: 25 * 60,
    totalDuration: 25 * 60,
    mode: 'focus',
    subjectId: 'sub-dsa',
    subjectName: 'Data Structures',
    topicName: 'Trees & Graphs',
    goal: 'Review AVL tree rotations and node balancing',
    sessionsCompleted: 0,
  },
  isAIChatOpen: false,
  isGlobalSearchOpen: false,
  isOffline: false,
  latestUnlockedAchievement: null,

  loginAsDemo: () => {
    set({
      user: INITIAL_USER,
      isAuthenticated: true,
      isDemoMode: true,
    });
    get().setTheme('dark');
  },

  login: (email: string, name?: string) => {
    set((state) => ({
      isAuthenticated: true,
      isDemoMode: false,
      user: {
        ...state.user,
        email,
        name: name || email.split('@')[0],
      },
    }));
  },

  logout: () => {
    set({
      isAuthenticated: false,
    });
  },

  updateUserPreferences: (prefs) => {
    set((state) => {
      const nextUser = {
        ...state.user,
        preferences: {
          ...state.user.preferences,
          ...prefs,
        },
      };
      if (prefs.theme) {
        if (prefs.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      if (prefs.soundEnabled !== undefined) {
        soundManager.setEnabled(prefs.soundEnabled);
      }
      return { user: nextUser };
    });
  },

  addXp: (amount: number) => {
    set((state) => {
      const newXp = state.user.xp + amount;
      return {
        user: { ...state.user, xp: newXp },
      };
    });
  },

  // Pomodoro timer handlers
  startPomodoro: (subjectId, subjectName, topicName, goal) => {
    soundManager.playClick();
    const duration = get().user.preferences.pomodoroFocusMinutes * 60;
    set({
      activePomodoro: {
        isRunning: true,
        timeLeft: duration,
        totalDuration: duration,
        mode: 'focus',
        subjectId,
        subjectName,
        topicName,
        goal,
        sessionsCompleted: get().activePomodoro.sessionsCompleted,
      },
    });
  },

  pausePomodoro: () => {
    soundManager.playClick();
    set((state) => ({
      activePomodoro: { ...state.activePomodoro, isRunning: false },
    }));
  },

  resumePomodoro: () => {
    soundManager.playClick();
    set((state) => ({
      activePomodoro: { ...state.activePomodoro, isRunning: true },
    }));
  },

  resetPomodoro: () => {
    soundManager.playClick();
    set((state) => {
      const mins =
        state.activePomodoro.mode === 'focus'
          ? state.user.preferences.pomodoroFocusMinutes
          : state.activePomodoro.mode === 'short_break'
          ? state.user.preferences.pomodoroShortBreakMinutes
          : state.user.preferences.pomodoroLongBreakMinutes;
      return {
        activePomodoro: {
          ...state.activePomodoro,
          isRunning: false,
          timeLeft: mins * 60,
          totalDuration: mins * 60,
        },
      };
    });
  },

  tickPomodoro: () => {
    const { activePomodoro } = get();
    if (!activePomodoro.isRunning) return;

    if (activePomodoro.timeLeft <= 1) {
      // Completed current interval
      get().completePomodoroSession();
    } else {
      set({
        activePomodoro: {
          ...activePomodoro,
          timeLeft: activePomodoro.timeLeft - 1,
        },
      });
    }
  },

  skipPomodoro: () => {
    soundManager.playClick();
    get().completePomodoroSession();
  },

  completePomodoroSession: () => {
    soundManager.playSessionComplete();
    const { activePomodoro, user, subjects, dailyLogs, achievements } = get();
    const wasFocus = activePomodoro.mode === 'focus';
    const durationMins = Math.round(activePomodoro.totalDuration / 60);

    const nextCompletedCount = wasFocus
      ? activePomodoro.sessionsCompleted + 1
      : activePomodoro.sessionsCompleted;

    let nextMode: 'focus' | 'short_break' | 'long_break' = 'focus';
    let nextDuration = user.preferences.pomodoroFocusMinutes * 60;

    if (wasFocus) {
      if (nextCompletedCount % 4 === 0) {
        nextMode = 'long_break';
        nextDuration = user.preferences.pomodoroLongBreakMinutes * 60;
      } else {
        nextMode = 'short_break';
        nextDuration = user.preferences.pomodoroShortBreakMinutes * 60;
      }
    }

    // Record session if it was focus
    let newSessions = get().pomodoroSessions;
    let nextUser = { ...user };
    let nextSubjects = [...subjects];
    let nextLogs = [...dailyLogs];

    if (wasFocus) {
      const xpEarned = 100;
      const newSession: PomodoroSession = {
        id: `pomo-${Date.now()}`,
        subjectId: activePomodoro.subjectId,
        subjectName: activePomodoro.subjectName,
        topicName: activePomodoro.topicName,
        goal: activePomodoro.goal,
        durationMinutes: durationMins,
        type: 'focus',
        completedAt: new Date().toISOString(),
        xpEarned,
      };
      newSessions = [newSession, ...newSessions];

      // Update User stats
      nextUser = {
        ...nextUser,
        xp: nextUser.xp + xpEarned,
        todayStudyMinutes: nextUser.todayStudyMinutes + durationMins,
        totalStudyMinutes: nextUser.totalStudyMinutes + durationMins,
      };

      // Update Subject stats
      nextSubjects = nextSubjects.map((s) => {
        if (s.id === activePomodoro.subjectId) {
          return {
            ...s,
            studyMinutes: s.studyMinutes + durationMins,
            progress: Math.min(100, s.progress + 1),
          };
        }
        return s;
      });

      // Update Daily Logs
      const todayStr = new Date().toISOString().split('T')[0];
      const todayIdx = nextLogs.findIndex((l) => l.date === todayStr);
      if (todayIdx >= 0) {
        nextLogs[todayIdx] = {
          ...nextLogs[todayIdx],
          minutes: nextLogs[todayIdx].minutes + durationMins,
          sessionsCount: nextLogs[todayIdx].sessionsCount + 1,
        };
      } else {
        nextLogs.push({
          date: todayStr,
          minutes: durationMins,
          sessionsCount: 1,
          quizzesCompleted: 0,
          cardsReviewed: 0,
        });
      }

      // Check achievement "First Focus"
      const firstFocusAch = achievements.find((a) => a.id === 'ach-first-focus');
      if (firstFocusAch && !firstFocusAch.unlocked) {
        firstFocusAch.unlocked = true;
        firstFocusAch.unlockedAt = new Date().toISOString();
        soundManager.playAchievement();
        set({ latestUnlockedAchievement: firstFocusAch });
      }
    }

    set({
      user: nextUser,
      subjects: nextSubjects,
      pomodoroSessions: newSessions,
      dailyLogs: nextLogs,
      activePomodoro: {
        ...activePomodoro,
        isRunning: false,
        timeLeft: nextDuration,
        totalDuration: nextDuration,
        mode: nextMode,
        sessionsCompleted: nextCompletedCount,
      },
    });

    // Save to local storage
    saveStateToStorage(get());
  },

  // Flashcards Review
  reviewCard: (cardId, result) => {
    if (result === 'again') {
      soundManager.playWrong();
    } else {
      soundManager.playCorrect();
    }

    const { flashcards, user, decks, subjects } = get();
    const target = flashcards.find((c) => c.id === cardId);
    if (!target) return;

    const updated = calculateNextReview(target, result);
    const updatedCards = flashcards.map((c) => (c.id === cardId ? updated : c));

    const xpEarned = result === 'know' ? 15 : result === 'mastered' ? 30 : 5;
    const nextUser = {
      ...user,
      xp: user.xp + xpEarned,
    };

    // Update Decks & Subjects mastered counts
    const masteredCount = updatedCards.filter((c) => c.mastery === 'mastered').length;

    const updatedSubjects = subjects.map((s) => {
      if (s.id === target.subjectId) {
        const subCards = updatedCards.filter((c) => c.subjectId === s.id);
        const subMastered = subCards.filter((c) => c.mastery === 'mastered').length;
        return {
          ...s,
          cardsMastered: subMastered,
          cardsCount: subCards.length,
        };
      }
      return s;
    });

    const updatedDecks = decks.map((d) => {
      const deckCards = updatedCards.filter((c) => d.cardIds.includes(c.id));
      const deckMastered = deckCards.filter((c) => c.mastery === 'mastered').length;
      return {
        ...d,
        masteredCount: deckMastered,
      };
    });

    set({
      flashcards: updatedCards,
      user: nextUser,
      subjects: updatedSubjects,
      decks: updatedDecks,
    });

    saveStateToStorage(get());
  },

  addFlashcards: (newCards, deckTitle) => {
    soundManager.playCorrect();
    const { flashcards, decks, subjects } = get();
    const updatedCards = [...newCards, ...flashcards];

    let updatedDecks = [...decks];
    if (deckTitle && newCards.length > 0) {
      const subjectId = newCards[0].subjectId;
      const newDeck: FlashcardDeck = {
        id: `deck-${Date.now()}`,
        subjectId,
        title: deckTitle,
        description: `Generated AI flashcards for ${newCards[0].topicName}`,
        totalCards: newCards.length,
        masteredCount: 0,
        dueTodayCount: newCards.length,
        cardIds: newCards.map((c) => c.id),
      };
      updatedDecks.push(newDeck);
    }

    // Update subjects cards count
    const updatedSubjects = subjects.map((s) => {
      const totalInSub = updatedCards.filter((c) => c.subjectId === s.id).length;
      return {
        ...s,
        cardsCount: totalInSub,
      };
    });

    set({
      flashcards: updatedCards,
      decks: updatedDecks,
      subjects: updatedSubjects,
    });

    saveStateToStorage(get());
  },

  toggleBookmarkCard: (cardId) => {
    soundManager.playClick();
    set((state) => ({
      flashcards: state.flashcards.map((c) =>
        c.id === cardId ? { ...c, bookmarked: !c.bookmarked } : c
      ),
    }));
  },

  // Quiz submission & recording
  recordQuizAttempt: (attempt) => {
    soundManager.playSessionComplete();
    const { quizAttempts, user, subjects, dailyLogs, recommendations } = get();
    const nextAttempts = [attempt, ...quizAttempts];

    // Compute subject's updated accuracy
    const updatedSubjects = subjects.map((s) => {
      if (s.id === attempt.subjectId) {
        const subAttempts = nextAttempts.filter((a) => a.subjectId === s.id);
        const avgAcc = Math.round(
          subAttempts.reduce((acc, curr) => acc + curr.accuracy, 0) / subAttempts.length
        );
        return {
          ...s,
          quizAccuracy: avgAcc,
          progress: Math.min(100, s.progress + 2),
        };
      }
      return s;
    });

    // Update user XP
    const nextUser = {
      ...user,
      xp: user.xp + attempt.xpEarned,
    };

    // Update daily log
    const todayStr = new Date().toISOString().split('T')[0];
    const nextLogs = dailyLogs.map((log) => {
      if (log.date === todayStr) {
        return {
          ...log,
          quizzesCompleted: log.quizzesCompleted + 1,
        };
      }
      return log;
    });

    // Adaptive Learning Engine check:
    // If accuracy < 60%, identify as weak topic and generate / update recommendation
    let nextRecs = [...recommendations];
    if (attempt.accuracy < 60) {
      const existing = nextRecs.find(
        (r) => r.subjectName === attempt.subjectName && r.topicName === attempt.topicName
      );
      if (!existing) {
        nextRecs.unshift({
          id: `rec-${Date.now()}`,
          subjectId: attempt.subjectId,
          subjectName: attempt.subjectName,
          topicName: attempt.topicName,
          title: `Remedial Mastery: ${attempt.topicName}`,
          reason: `Your score was ${attempt.accuracy}% on ${attempt.topicName}. We recommend a targeted review cycle.`,
          urgency: 'high',
          scoreDifference: attempt.accuracy - 78,
          recommendedActions: {
            flashcardsCount: 8,
            quizQuestionsCount: 5,
            focusDurationMinutes: 25,
          },
        });
      }
    }

    set({
      quizAttempts: nextAttempts,
      subjects: updatedSubjects,
      user: nextUser,
      dailyLogs: nextLogs,
      recommendations: nextRecs,
    });

    saveStateToStorage(get());
  },

  // Goals
  addStudyGoal: (goalData) => {
    soundManager.playClick();
    const newGoal: StudyGoal = {
      ...goalData,
      id: `goal-${Date.now()}`,
    };
    set((state) => ({
      studyGoals: [newGoal, ...state.studyGoals],
    }));
    saveStateToStorage(get());
  },

  toggleGoalTask: (goalId, taskId) => {
    soundManager.playClick();
    set((state) => {
      const nextGoals = state.studyGoals.map((g) => {
        if (g.id === goalId) {
          const updatedTasks = g.tasks.map((t) =>
            t.id === taskId ? { ...t, completed: !t.completed } : t
          );
          const done = updatedTasks.filter((t) => t.completed).length;
          const progress = Math.round((done / updatedTasks.length) * 100);
          return {
            ...g,
            tasks: updatedTasks,
            progressPercentage: progress,
            completed: progress === 100,
          };
        }
        return g;
      });
      return { studyGoals: nextGoals };
    });
    saveStateToStorage(get());
  },

  deleteStudyGoal: (goalId) => {
    soundManager.playClick();
    set((state) => ({
      studyGoals: state.studyGoals.filter((g) => g.id !== goalId),
    }));
    saveStateToStorage(get());
  },

  // Notifications
  markNotificationAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
    saveStateToStorage(get());
  },

  markAllNotificationsAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    }));
    saveStateToStorage(get());
  },

  setAIChatOpen: (open) => {
    soundManager.playClick();
    set({ isAIChatOpen: open });
  },

  setGlobalSearchOpen: (open) => {
    set({ isGlobalSearchOpen: open });
  },

  setOfflineStatus: (offline) => {
    set({ isOffline: offline });
  },

  clearLatestAchievement: () => {
    set({ latestUnlockedAchievement: null });
  },

  setTheme: (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    set((state) => ({
      user: {
        ...state.user,
        preferences: {
          ...state.user.preferences,
          theme,
        },
      },
    }));
    saveStateToStorage(get());
  },

  resetToDemoData: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({
      user: INITIAL_USER,
      isAuthenticated: true,
      isDemoMode: true,
      subjects: INITIAL_SUBJECTS,
      flashcards: PRESET_FLASHCARDS,
      decks: INITIAL_DECKS,
      quizAttempts: INITIAL_QUIZ_ATTEMPTS,
      pomodoroSessions: INITIAL_POMODORO_SESSIONS,
      studyGoals: INITIAL_STUDY_GOALS,
      achievements: INITIAL_ACHIEVEMENTS,
      notifications: INITIAL_NOTIFICATIONS,
      recommendations: INITIAL_RECOMMENDATIONS,
      dailyLogs: INITIAL_DAILY_LOGS,
    });
    get().setTheme('dark');
  },
}));

function saveStateToStorage(state: AppState) {
  if (typeof window === 'undefined') return;
  try {
    const toSave = {
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      isDemoMode: state.isDemoMode,
      subjects: state.subjects,
      flashcards: state.flashcards,
      decks: state.decks,
      quizAttempts: state.quizAttempts,
      pomodoroSessions: state.pomodoroSessions,
      studyGoals: state.studyGoals,
      achievements: state.achievements,
      notifications: state.notifications,
      recommendations: state.recommendations,
      dailyLogs: state.dailyLogs,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.warn('Failed to save state to localStorage', e);
  }
}
