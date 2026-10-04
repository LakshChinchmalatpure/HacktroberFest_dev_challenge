import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { AchievementBadge } from '@/components/gamification/AchievementBadge';
import { LevelProgress } from '@/components/gamification/LevelProgress';
import { Award, Trophy, Zap, Flame, ShieldCheck } from 'lucide-react';

export const AchievementsPage: React.FC = () => {
  const { achievements, user } = useAppStore();

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalXpRewards = achievements.reduce((acc, a) => acc + (a.unlocked ? a.xpReward : 0), 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
          Achievements & Mastery Ranks
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Earn XP for consistency, deep focus hours, quiz accuracy, and spaced recall mastery
        </p>
      </div>

      {/* Level Progress Banner */}
      <LevelProgress />

      {/* Gamification Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Badges Unlocked</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-xl font-bold font-heading text-slate-900 dark:text-white">
            {unlockedCount} of {achievements.length} Unlocked
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>XP from Badges</span>
            <Zap className="w-4 h-4 text-primary-500" />
          </div>
          <p className="text-xl font-bold font-heading text-primary-500">
            +{totalXpRewards} XP Earned
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Streak Multiplier</span>
            <Flame className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-xl font-bold font-heading text-rose-500">
            {user.currentStreak} Days (1.5x Multiplier)
          </p>
        </div>
      </div>

      {/* Achievements Badges Grid */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
          Badge Showcase
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((ach) => (
            <AchievementBadge key={ach.id} achievement={ach} />
          ))}
        </div>
      </div>
    </div>
  );
};
