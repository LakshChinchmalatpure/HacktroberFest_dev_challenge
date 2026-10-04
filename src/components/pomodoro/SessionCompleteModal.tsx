import React from 'react';
import { CheckCircle2, Flame, Zap, Clock, FolderKanban, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

interface SessionCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  durationMinutes: number;
  subjectName: string;
  topicName: string;
}

export const SessionCompleteModal: React.FC<SessionCompleteModalProps> = ({
  isOpen,
  onClose,
  durationMinutes,
  subjectName,
  topicName,
}) => {
  const { user } = useAppStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 text-center shadow-2xl">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white mb-4 shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mb-2 inline-block">
          Focus Session Complete
        </span>

        <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white mb-1">
          Great Focus, {user.name}!
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Your focused session has been saved to your learning analytics and streak.
        </p>

        {/* Stats summary grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 text-left">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <FolderKanban className="w-3.5 h-3.5 text-primary-500" />
              <span>Subject</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
              {subjectName}
            </p>
            <p className="text-[10px] text-slate-400 truncate">{topicName}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 text-left">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              <span>Duration</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {durationMinutes} Minutes
            </p>
            <p className="text-[10px] text-slate-400">Deep study block</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 text-left">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>XP Earned</span>
            </div>
            <p className="text-sm font-bold text-amber-500">
              +100 XP
            </p>
            <p className="text-[10px] text-slate-400">Total: {user.xp} XP</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 text-left">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Flame className="w-3.5 h-3.5 text-rose-500" />
              <span>Current Streak</span>
            </div>
            <p className="text-sm font-bold text-rose-500">
              {user.currentStreak} Days
            </p>
            <p className="text-[10px] text-slate-400">Streak secured!</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-primary-600 to-brand-500 hover:from-primary-500 hover:to-brand-400 text-white font-semibold text-sm transition shadow-lg shadow-primary-500/20"
        >
          <span>Continue Learning</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
