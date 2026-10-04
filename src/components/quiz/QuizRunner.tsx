import React, { useState, useEffect } from 'react';
import { Clock, ChevronLeft, ChevronRight, CheckSquare, Square, CheckCircle, HelpCircle } from 'lucide-react';
import { QuizQuestion, QuizAttempt } from '@/types';
import { formatTime } from '@/lib/utils';
import { soundManager } from '@/lib/sound';

interface QuizRunnerProps {
  questions: QuizQuestion[];
  meta: {
    subjectId: string;
    subjectName: string;
    topic: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
  };
  onSubmitQuiz: (attempt: QuizAttempt) => void;
  onExit: () => void;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({
  questions,
  meta,
  onSubmitQuiz,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string[]>>({});
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentQ = questions[currentIndex];
  const isMultipleAnswer = currentQ.type === 'multiple_answer';
  const selectedOptions = userAnswers[currentQ.id] || [];

  const handleSelectOption = (optionId: string) => {
    soundManager.playClick();
    if (isMultipleAnswer) {
      const exists = selectedOptions.includes(optionId);
      const updated = exists
        ? selectedOptions.filter((id) => id !== optionId)
        : [...selectedOptions, optionId];
      setUserAnswers({ ...userAnswers, [currentQ.id]: updated });
    } else {
      // Single select (multiple choice or true/false)
      setUserAnswers({ ...userAnswers, [currentQ.id]: [optionId] });
    }
  };

  const answeredCount = Object.keys(userAnswers).filter(
    (k) => userAnswers[k] && userAnswers[k].length > 0
  ).length;

  const handleSubmit = () => {
    soundManager.playClick();

    // Grade attempt
    let correctCount = 0;
    questions.forEach((q) => {
      const selected = userAnswers[q.id] || [];
      const correctOptionIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);

      const isAllCorrect =
        selected.length === correctOptionIds.length &&
        selected.every((id) => correctOptionIds.includes(id));

      if (isAllCorrect) {
        correctCount += 1;
      }
    });

    const accuracy = Math.round((correctCount / questions.length) * 100);
    const xpEarned = correctCount * 30 + (accuracy >= 80 ? 50 : 20);

    const attempt: QuizAttempt = {
      id: `qa-${Date.now()}`,
      subjectId: meta.subjectId,
      subjectName: meta.subjectName,
      topicName: meta.topic,
      difficulty: meta.difficulty,
      questions,
      userAnswers,
      score: correctCount,
      totalQuestions: questions.length,
      accuracy,
      timeSpentSeconds: secondsElapsed,
      xpEarned,
      completedAt: new Date().toISOString(),
    };

    onSubmitQuiz(attempt);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Bar: Subject, Timer, Progress */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary-500">
            {meta.subjectName} • {meta.topic}
          </span>
          <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
            Question {currentIndex + 1} of {questions.length}
          </h3>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 text-primary-500" />
            <span>{formatTime(secondsElapsed)}</span>
          </div>

          <button
            onClick={onExit}
            className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1 rounded-lg hover:bg-slate-800 transition"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card (Distraction-Free) */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 uppercase font-semibold">
              {currentQ.type.replace('_', ' ')}
            </span>
            <span className="text-slate-400 capitalize">Difficulty: {currentQ.difficulty}</span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold font-heading text-slate-900 dark:text-white leading-relaxed">
            {currentQ.question}
          </h2>
        </div>

        {/* Options List */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOptions.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full flex items-center gap-3.5 p-4 rounded-2xl text-left text-sm transition border ${
                  isSelected
                    ? 'bg-primary-500/10 border-primary-500 text-primary-600 dark:text-primary-300 font-semibold shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border ${
                    isSelected
                      ? 'bg-primary-500 border-primary-500 text-white'
                      : 'border-slate-300 dark:border-slate-700 text-transparent'
                  }`}
                >
                  {isMultipleAnswer ? (
                    <CheckSquare className="w-3.5 h-3.5" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span className="flex-1">{opt.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Navigation Grid & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Navigation Quick Jump Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {questions.map((q, idx) => {
            const isAnswered = userAnswers[q.id]?.length > 0;
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition flex items-center justify-center ${
                  isCurrent
                    ? 'bg-primary-600 text-white ring-2 ring-primary-500/40'
                    : isAnswered
                    ? 'bg-emerald-500/15 text-emerald-500 dark:text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Previous, Next & Submit */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 text-xs font-semibold transition"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-xs font-bold transition shadow-md shadow-emerald-500/20"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Submit Quiz ({answeredCount}/{questions.length})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
