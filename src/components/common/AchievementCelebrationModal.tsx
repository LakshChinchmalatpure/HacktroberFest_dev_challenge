import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, Zap, X } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const AchievementCelebrationModal: React.FC = () => {
  const { latestUnlockedAchievement, clearLatestAchievement } = useAppStore();

  useEffect(() => {
    if (latestUnlockedAchievement) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#14b8a6', '#f59e0b', '#ec4899'],
        });
      } catch {
        // ignore in non-browser env
      }
    }
  }, [latestUnlockedAchievement]);

  if (!latestUnlockedAchievement) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-6 text-center border border-primary-500/30 shadow-2xl shadow-primary-500/20">
        <button
          onClick={clearLatestAchievement}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/30 mb-4 animate-bounce">
          <Award className="w-8 h-8 text-slate-950" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
          Achievement Unlocked!
        </span>

        <h3 className="text-xl font-bold text-white mb-1 font-heading">
          {latestUnlockedAchievement.title}
        </h3>

        <p className="text-sm text-slate-300 mb-5 leading-relaxed">
          {latestUnlockedAchievement.description}
        </p>

        <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-slate-800/80 border border-slate-700/60 mb-5">
          <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-sm font-semibold text-white">
            +{latestUnlockedAchievement.xpReward} XP Earned
          </span>
        </div>

        <button
          onClick={clearLatestAchievement}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-medium text-sm transition shadow-lg shadow-primary-600/30"
        >
          Awesome! Keep Going
        </button>
      </div>
    </div>
  );
};
