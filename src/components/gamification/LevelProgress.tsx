import React from 'react';
import { Zap, ShieldCheck, Sparkles } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { calculateLevel } from '@/lib/utils';

export const LevelProgress: React.FC = () => {
  const { user } = useAppStore();
  const currentLevel = calculateLevel(user.xp);
  const xpInCurrentLevel = user.xp - currentLevel.minXp;
  const xpNeeded = currentLevel.maxXp - currentLevel.minXp;
  const levelProgress = Math.min(100, Math.round((xpInCurrentLevel / xpNeeded) * 100));

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-600 to-brand-400 flex items-center justify-center text-white shadow-md shadow-primary-500/20">
            <Zap className="w-6 h-6 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-500">
                Level {currentLevel.level}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-300 font-semibold border border-primary-500/20">
                {currentLevel.title}
              </span>
            </div>
            <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
              {user.xp} Total XP Accumulated
            </h3>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-xs text-slate-400">Next Rank Progression</p>
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
            {currentLevel.maxXp - user.xp} XP to Level {currentLevel.level + 1}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-600 via-indigo-500 to-teal-400 transition-all duration-500"
            style={{ width: `${levelProgress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-400">
          <span>{currentLevel.minXp} XP</span>
          <span>{levelProgress}% Completed</span>
          <span>{currentLevel.maxXp} XP</span>
        </div>
      </div>
    </div>
  );
};
