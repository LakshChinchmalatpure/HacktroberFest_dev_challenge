import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { QuizGeneratorModal } from '@/components/quiz/QuizGeneratorModal';
import { QuizRunner } from '@/components/quiz/QuizRunner';
import { QuizResults } from '@/components/quiz/QuizResults';
import {
  FileQuestion,
  Sparkles,
  Trophy,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
} from 'lucide-react';
import { QuizQuestion, QuizAttempt } from '@/types';
import { getRelativeTimeString } from '@/lib/utils';
import { PRESET_QUESTIONS } from '@/data/presetQuestions';

export const QuizzesPage: React.FC = () => {
  const { quizAttempts, recordQuizAttempt, subjects } = useAppStore();

  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [activeQuizState, setActiveQuizState] = useState<{
    questions: QuizQuestion[];
    meta: {
      subjectId: string;
      subjectName: string;
      topic: string;
      difficulty: 'beginner' | 'intermediate' | 'advanced';
    };
  } | null>(null);

  const [latestAttempt, setLatestAttempt] = useState<QuizAttempt | null>(null);

  const handleStartQuickQuiz = (subjectId: string, subjectName: string, topic: string) => {
    const key = `${subjectName}-${topic}`;
    const questions = PRESET_QUESTIONS[key] || PRESET_QUESTIONS['DBMS-SQL Joins'];

    setActiveQuizState({
      questions,
      meta: {
        subjectId,
        subjectName,
        topic,
        difficulty: 'intermediate',
      },
    });
    setLatestAttempt(null);
  };

  const handleQuizSubmit = (attempt: QuizAttempt) => {
    recordQuizAttempt(attempt);
    setLatestAttempt(attempt);
    setActiveQuizState(null);
  };

  // If a quiz is actively being run:
  if (activeQuizState) {
    return (
      <div className="py-4 animate-in fade-in">
        <QuizRunner
          questions={activeQuizState.questions}
          meta={activeQuizState.meta}
          onSubmitQuiz={handleQuizSubmit}
          onExit={() => setActiveQuizState(null)}
        />
      </div>
    );
  }

  // If quiz results are showing:
  if (latestAttempt) {
    return (
      <div className="py-4 animate-in fade-in">
        <QuizResults
          attempt={latestAttempt}
          onRetry={() => {
            setActiveQuizState({
              questions: latestAttempt.questions,
              meta: {
                subjectId: latestAttempt.subjectId,
                subjectName: latestAttempt.subjectName,
                topic: latestAttempt.topicName,
                difficulty: latestAttempt.difficulty,
              },
            });
            setLatestAttempt(null);
          }}
          onExit={() => setLatestAttempt(null)}
        />
      </div>
    );
  }

  // General Quizzes Hub Page
  const avgAccuracy = quizAttempts.length > 0
    ? Math.round(quizAttempts.reduce((acc, q) => acc + q.accuracy, 0) / quizAttempts.length)
    : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            Adaptive Quiz Engine
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Test knowledge with AI-curated multiple choice, true/false, and multi-answer questions
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsGeneratorOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Custom Quiz</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Quizzes Completed</span>
          <p className="text-xl font-bold font-heading text-slate-900 dark:text-white">
            {quizAttempts.length} Tests
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Average Accuracy</span>
          <p className="text-xl font-bold font-heading text-primary-500">
            {avgAccuracy}%
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">XP Earned from Tests</span>
          <p className="text-xl font-bold font-heading text-amber-500">
            +{quizAttempts.reduce((acc, q) => acc + q.xpEarned, 0)} XP
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Weak Area Detected</span>
          <p className="text-xl font-bold font-heading text-rose-500">
            SQL Joins (42%)
          </p>
        </div>
      </div>

      {/* Quick Launch Quizzes by Subject */}
      <div>
        <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-slate-100 mb-3">
          Launch Practice Assessment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-500/5 to-amber-500/5 dark:bg-[#0f172a] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
                Weak Area Diagnostic
              </span>
              <span className="text-xs text-slate-400">5 Questions</span>
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                DBMS: SQL Joins Mastery
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Outer joins, cross joins, and engine query algorithms
              </p>
            </div>
            <button
              onClick={() => handleStartQuickQuiz('sub-dbms', 'DBMS', 'SQL Joins')}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:opacity-90 text-white font-semibold text-xs shadow-md shadow-rose-500/20 transition"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Start Diagnostic Test</span>
            </button>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-500 border border-primary-500/20">
                Core Systems
              </span>
              <span className="text-xs text-slate-400">3 Questions</span>
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                Data Structures: Trees & Graphs
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Binary search trees, AVL rotations, and negative cycle detection
              </p>
            </div>
            <button
              onClick={() => handleStartQuickQuiz('sub-dsa', 'Data Structures', 'Trees & Graphs')}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-primary-600 hover:text-white dark:bg-slate-800 dark:hover:bg-primary-600 text-slate-700 dark:text-slate-200 font-semibold text-xs transition"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start Test</span>
            </button>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                Advanced OS
              </span>
              <span className="text-xs text-slate-400">2 Questions</span>
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                Operating Systems: Deadlocks & Mutex
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Coffman conditions, banker algorithm, and resource allocation
              </p>
            </div>
            <button
              onClick={() => handleStartQuickQuiz('sub-os', 'Operating Systems', 'Deadlocks & Concurrency')}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-primary-600 hover:text-white dark:bg-slate-800 dark:hover:bg-primary-600 text-slate-700 dark:text-slate-200 font-semibold text-xs transition"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start Test</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quiz Attempt History */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 shadow-sm">
        <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white mb-4">
          Past Quiz Attempts & Performance
        </h3>

        {quizAttempts.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">
            No quiz attempts yet. Start your first quiz above!
          </p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {quizAttempts.map((attempt) => (
              <div
                key={attempt.id}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      {attempt.subjectName} • {attempt.topicName}
                    </span>
                    <span className="capitalize px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-400">
                      {attempt.difficulty}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Completed {getRelativeTimeString(attempt.completedAt)}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-slate-400">Score: </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {attempt.score}/{attempt.totalQuestions} ({attempt.accuracy}%)
                    </span>
                  </div>

                  <span className="font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
                    +{attempt.xpEarned} XP
                  </span>

                  <button
                    onClick={() => setLatestAttempt(attempt)}
                    className="text-primary-500 hover:underline font-semibold"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <QuizGeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        onQuizReady={(questions, meta) => {
          setActiveQuizState({ questions, meta });
        }}
      />
    </div>
  );
};
