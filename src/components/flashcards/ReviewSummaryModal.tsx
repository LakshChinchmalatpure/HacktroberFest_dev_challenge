import React from 'react';
import { Award, CheckCircle, RotateCcw, Zap, ArrowRight } from 'lucide-react';

interface ReviewSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: {
    reviewed: number;
    mastered: number;
    again: number;
  };
}

export const ReviewSummaryModal: React.FC<ReviewSummaryModalProps> = ({
  isOpen,
  onClose,
  stats,
}) => {
  if (!isOpen) return null;

  const accuracy = stats.reviewed > 0
    ? Math.round(((stats.reviewed - stats.again) / stats.reviewed) * 100)
    : 100;
  const xpEarned = stats.mastered * 30 + (stats.reviewed - stats.mastered - stats.again) * 15 + stats.again * 5;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-center shadow-2xl">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-500 to-primary-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-teal-500/20">
          <Award className="w-8 h-8" />
        </div>

        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-500 border border-teal-500/20 mb-2 inline-block">
          Review Session Complete
        </span>

        <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white mb-1">
          Review Summary
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Spaced repetition algorithm updated review intervals for each card
        </p>

        {/* 4 Stat Boxes */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-left">
            <span className="text-[11px] text-slate-400 font-semibold block mb-1">
              Cards Reviewed
            </span>
            <p className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              {stats.reviewed}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-left">
            <span className="text-[11px] text-emerald-500 font-semibold block mb-1">
              Cards Mastered
            </span>
            <p className="text-xl font-bold font-heading text-emerald-500">
              {stats.mastered}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-left">
            <span className="text-[11px] text-rose-500 font-semibold block mb-1">
              To Revisit
            </span>
            <p className="text-xl font-bold font-heading text-rose-500">
              {stats.again}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-left">
            <span className="text-[11px] text-primary-500 font-semibold block mb-1">
              Accuracy
            </span>
            <p className="text-xl font-bold font-heading text-primary-500">
              {accuracy}%
            </p>
          </div>
        </div>

        {/* XP Gained banner */}
        <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold text-xs mb-6">
          <Zap className="w-4 h-4 fill-amber-500" />
          <span>+{xpEarned} XP Earned From Recall</span>
        </div>

        <button
          onClick={onClose}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-500 hover:to-teal-400 text-white font-semibold text-xs transition shadow-lg shadow-primary-500/20"
        >
          <span>Continue Learning</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
