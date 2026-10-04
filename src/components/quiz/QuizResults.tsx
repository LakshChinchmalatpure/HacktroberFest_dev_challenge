import React from 'react';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  Zap,
  RotateCcw,
  Sparkles,
  BookOpen,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { QuizAttempt } from '@/types';
import { formatTime } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';

interface QuizResultsProps {
  attempt: QuizAttempt;
  onRetry: () => void;
  onExit: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  attempt,
  onRetry,
  onExit,
}) => {
  const navigate = useNavigate();
  const { startPomodoro } = useAppStore();

  const isPassing = attempt.accuracy >= 60;
  const incorrectCount = attempt.totalQuestions - attempt.score;

  const handleReviewWeakTopics = () => {
    startPomodoro(
      attempt.subjectId,
      attempt.subjectName,
      attempt.topicName,
      `Weak Topic Review: ${attempt.topicName}`
    );
    navigate('/app/focus');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Score Header Card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-8 shadow-xl text-center">
        <div
          className={`mx-auto w-20 h-20 rounded-3xl flex items-center justify-center text-white mb-4 shadow-xl ${
            isPassing
              ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-emerald-500/25'
              : 'bg-gradient-to-tr from-amber-500 to-orange-500 shadow-amber-500/25'
          }`}
        >
          <Trophy className="w-10 h-10" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 border border-primary-500/20 mb-2 inline-block">
          Quiz Complete
        </span>

        <h2 className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white mb-2">
          {attempt.accuracy >= 80
            ? 'Outstanding Performance!'
            : attempt.accuracy >= 60
            ? 'Good Effort! Keep Improving'
            : 'Topic Needs Reinforcement'}
        </h2>

        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
          {attempt.subjectName} • {attempt.topicName} ({attempt.difficulty})
        </p>

        {/* 4 Score Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto mb-6">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">Accuracy</span>
            <p className="text-2xl font-extrabold font-heading text-primary-500">
              {attempt.accuracy}%
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">Score</span>
            <p className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
              {attempt.score}/{attempt.totalQuestions}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">Time</span>
            <p className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
              {formatTime(attempt.timeSpentSeconds)}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">XP Earned</span>
            <p className="text-2xl font-extrabold font-heading text-amber-500 flex items-center justify-center gap-1">
              <Zap className="w-5 h-5 fill-amber-500" />
              +{attempt.xpEarned}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onRetry}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retry Quiz</span>
          </button>

          {!isPassing && (
            <button
              onClick={handleReviewWeakTopics}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-xs font-bold transition shadow-md shadow-amber-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Review Weak Topics in Focus</span>
            </button>
          )}

          <button
            onClick={onExit}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold transition shadow-md shadow-primary-500/20"
          >
            <span>Back to Quizzes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Question by Question Review */}
      <div className="space-y-4">
        <div>
          <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
            Question Review
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Understand key concepts and learn from incorrect answers
          </p>
        </div>

        <div className="space-y-4">
          {attempt.questions.map((q, idx) => {
            const userAnsIds = attempt.userAnswers[q.id] || [];
            const correctOptIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);
            const isCorrect =
              userAnsIds.length === correctOptIds.length &&
              userAnsIds.every((id) => correctOptIds.includes(id));

            return (
              <div
                key={q.id}
                className={`rounded-2xl border p-5 sm:p-6 transition-all bg-white dark:bg-[#0f172a] ${
                  isCorrect
                    ? 'border-emerald-500/30'
                    : 'border-rose-500/30 shadow-sm shadow-rose-500/5'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">
                      Q{idx + 1}.
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                      {q.question}
                    </h4>
                  </div>
                  {isCorrect ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-500 shrink-0 px-2 py-0.5 rounded-full bg-emerald-500/10">
                      <CheckCircle2 className="w-4 h-4" />
                      Correct
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-rose-500 shrink-0 px-2 py-0.5 rounded-full bg-rose-500/10">
                      <XCircle className="w-4 h-4" />
                      Incorrect
                    </span>
                  )}
                </div>

                {/* Options display with correctness markup */}
                <div className="space-y-2 my-3">
                  {q.options.map((opt) => {
                    const isSelected = userAnsIds.includes(opt.id);
                    const isAnswerCorrect = opt.isCorrect;

                    let badgeClass = 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/40';
                    if (isAnswerCorrect) {
                      badgeClass = 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 font-semibold';
                    } else if (isSelected && !isAnswerCorrect) {
                      badgeClass = 'border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-300 font-medium line-through';
                    }

                    return (
                      <div
                        key={opt.id}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs leading-relaxed ${badgeClass}`}
                      >
                        <span className="flex-1">{opt.text}</span>
                        {isAnswerCorrect && (
                          <span className="text-[10px] font-bold text-emerald-500 uppercase ml-2 shrink-0">
                            Correct Answer
                          </span>
                        )}
                        {isSelected && !isAnswerCorrect && (
                          <span className="text-[10px] font-bold text-rose-500 uppercase ml-2 shrink-0">
                            Your Selection
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="mt-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs leading-relaxed">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 mb-1">
                    <HelpCircle className="w-3.5 h-3.5 text-primary-500" />
                    <span>Explanation</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    {q.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
