import React from 'react';
import { Flame, AlertTriangle, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useNavigate } from 'react-router-dom';

export const StreakAlert: React.FC = () => {
  const { user } = useAppStore();
  const navigate = useNavigate();

  // If today's study minutes is less than 50 min, encourage completing a session
  if (user.todayStudyMinutes >= 60) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-amber-500/20 text-amber-500 shrink-0">
          <Flame className="w-5 h-5 fill-amber-500 animate-pulse" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            Streak Active • {user.currentStreak} Days
          </p>
          <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-0.5">
            Your streak is active! Complete at least one 25-minute focused session today to maintain your momentum.
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate('/app/focus')}
        className="shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs transition shadow-sm"
      >
        <span>Start 25m Focus</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
