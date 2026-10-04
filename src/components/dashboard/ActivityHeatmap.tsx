import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Flame, Calendar } from 'lucide-react';

export const ActivityHeatmap: React.FC = () => {
  const { dailyLogs, user } = useAppStore();

  const getColorClass = (minutes: number) => {
    if (minutes === 0) return 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-800';
    if (minutes < 30) return 'bg-primary-500/30 border-primary-500/40 text-primary-200';
    if (minutes < 60) return 'bg-primary-500/60 border-primary-500/70 text-white';
    if (minutes < 90) return 'bg-primary-600 border-primary-500 text-white';
    return 'bg-brand-500 border-brand-400 text-white';
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0f172a] p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h4 className="font-heading font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary-500" />
            Study Activity (Last 30 Days)
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Consistency is key to long-term memory retention
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 text-amber-500 font-bold border border-amber-500/20">
            <Flame className="w-3.5 h-3.5 fill-amber-500" />
            <span>{user.currentStreak} Day Streak</span>
          </div>
          <span className="text-slate-400">Best: {user.bestStreak} days</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-15 gap-2 pt-1">
        {dailyLogs.map((log) => {
          const dateObj = new Date(log.date);
          const formattedDate = dateObj.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          });
          return (
            <div
              key={log.date}
              title={`${formattedDate}: ${log.minutes} mins (${log.sessionsCount} sessions, ${log.quizzesCompleted} quizzes)`}
              className={`h-9 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 ${getColorClass(
                log.minutes
              )}`}
            >
              <span className="text-[10px] font-medium opacity-80">{dateObj.getDate()}</span>
              {log.minutes > 0 && (
                <span className="text-[8px] font-bold opacity-90">{log.minutes}m</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-4 text-[11px] text-slate-400">
        <span>Less</span>
        <div className="w-3 h-3 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
        <div className="w-3 h-3 rounded bg-primary-500/30" />
        <div className="w-3 h-3 rounded bg-primary-500/60" />
        <div className="w-3 h-3 rounded bg-primary-600" />
        <div className="w-3 h-3 rounded bg-brand-500" />
        <span>More (90m+)</span>
      </div>
    </div>
  );
};
