import React from 'react';
import { PomodoroTimer } from '@/components/pomodoro/PomodoroTimer';
import { useAppStore } from '@/store/useAppStore';
import { Clock, Zap, CheckCircle2, History, FolderKanban } from 'lucide-react';
import { getRelativeTimeString } from '@/lib/utils';

export const FocusPage: React.FC = () => {
  const { pomodoroSessions, user } = useAppStore();

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            Pomodoro Focus System
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Structured intervals for deep uninterrupted work and flow state
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-300 border border-primary-500/20 text-xs font-semibold">
            {pomodoroSessions.length} Focus Blocks Logged
          </span>
        </div>
      </div>

      {/* Main Focus Timer Component */}
      <PomodoroTimer />

      {/* Focus History Log */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <History className="w-4 h-4 text-primary-500" />
            Recent Focus Sessions
          </h3>
          <span className="text-xs text-slate-400">
            Total Focus Time: {(user.totalStudyMinutes / 60).toFixed(1)} Hours
          </span>
        </div>

        {pomodoroSessions.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-8">
            No completed sessions yet. Start your first 25m Pomodoro above!
          </p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {pomodoroSessions.slice(0, 5).map((session) => (
              <div
                key={session.id}
                className="py-3 flex items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-100">
                      {session.subjectName} • {session.topicName}
                    </p>
                    <p className="text-slate-400 mt-0.5 line-clamp-1">
                      {session.goal || 'General Focus Block'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 text-right">
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {session.durationMinutes} mins
                    </span>
                    <span className="text-slate-400 text-[10px] block">
                      {getRelativeTimeString(session.completedAt)}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
                    <Zap className="w-3 h-3 fill-amber-500" />
                    +{session.xpEarned} XP
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
