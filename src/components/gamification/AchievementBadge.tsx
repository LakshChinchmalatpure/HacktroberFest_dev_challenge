import React from 'react';
import { Award, Zap, CheckCircle2, Lock, Flame, Trophy, Clock, BookOpen } from 'lucide-react';
import { Achievement } from '@/types';

interface AchievementBadgeProps {
  achievement: Achievement;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({ achievement }) => {
  const getIcon = () => {
    switch (achievement.icon) {
      case 'Flame':
        return <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />;
      case 'Trophy':
        return <Trophy className="w-6 h-6 text-amber-400 fill-amber-400" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-emerald-400" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-teal-400" />;
      default:
        return <Award className="w-6 h-6 text-primary-400" />;
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-5 transition-all ${
        achievement.unlocked
          ? 'bg-white dark:bg-[#0f172a] border-primary-500/30 shadow-sm hover:shadow-md'
          : 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800/60 opacity-75'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Badge Icon container */}
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${
            achievement.unlocked
              ? 'bg-gradient-to-tr from-amber-500/20 to-primary-500/20 border-amber-500/40 shadow-inner'
              : 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700'
          }`}
        >
          {achievement.unlocked ? getIcon() : <Lock className="w-5 h-5 text-slate-400" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white truncate">
              {achievement.title}
            </h4>
            <span className="flex items-center gap-1 text-[11px] font-bold text-amber-500 shrink-0">
              <Zap className="w-3 h-3 fill-amber-500" />
              +{achievement.xpReward} XP
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            {achievement.description}
          </p>

          {/* Progress bar */}
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>{achievement.unlocked ? 'Completed' : 'In Progress'}</span>
              <span>
                {achievement.currentValue} / {achievement.targetValue} {achievement.unit}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  achievement.unlocked
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    : 'bg-gradient-to-r from-primary-500 to-brand-400'
                }`}
                style={{ width: `${achievement.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
