import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import {
  Flame,
  Clock,
  Target,
  BookOpen,
  Zap,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { ContinueLearning } from '@/components/dashboard/ContinueLearning';
import { AdaptiveInsightCard } from '@/components/dashboard/AdaptiveInsightCard';
import { ActivityHeatmap } from '@/components/dashboard/ActivityHeatmap';
import { StreakAlert } from '@/components/dashboard/StreakAlert';
import { calculateLevel, formatMinutes } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { user, subjects, flashcards, setAIChatOpen } = useAppStore();
  const currentLevel = calculateLevel(user.xp);
  const navigate = useNavigate();

  // Greeting based on current time
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const totalMasteredCards = flashcards.filter((c) => c.mastery === 'mastered').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            {getGreeting()}, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Ready to make progress today? You have a 12-day streak going strong.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setAIChatOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-500 hover:to-teal-400 text-white font-bold text-xs shadow-md shadow-primary-500/20 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask Cogniva AI</span>
          </button>
        </div>
      </div>

      {/* Streak Risk Alert Banner */}
      <StreakAlert />

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          title="Current Streak"
          value={`${user.currentStreak} Days`}
          subtitle="Top 5% consistency"
          icon={Flame}
          colorClass="text-amber-500"
          bgClass="bg-amber-500/10"
          badge="Active"
        />

        <StatCard
          title="Today's Study"
          value={formatMinutes(user.todayStudyMinutes)}
          subtitle="Target: 45m/day"
          icon={Clock}
          colorClass="text-emerald-500"
          bgClass="bg-emerald-500/10"
        />

        <StatCard
          title="Weekly Study"
          value="8.5 Hours"
          subtitle="Across 5 subjects"
          icon={Calendar}
          colorClass="text-blue-500"
          bgClass="bg-blue-500/10"
        />

        <StatCard
          title="Quiz Accuracy"
          value="78%"
          subtitle="+12% this month"
          icon={Target}
          colorClass="text-teal-400"
          bgClass="bg-teal-500/10"
        />

        <StatCard
          title="Cards Mastered"
          value={`${totalMasteredCards}`}
          subtitle={`${flashcards.length} in library`}
          icon={BookOpen}
          colorClass="text-indigo-500"
          bgClass="bg-indigo-500/10"
        />

        <StatCard
          title="Level & XP"
          value={`Lv. ${currentLevel.level}`}
          subtitle={`${user.xp} Total XP`}
          icon={Zap}
          colorClass="text-purple-400"
          bgClass="bg-purple-500/10"
          badge={currentLevel.title}
        />
      </div>

      {/* Adaptive Learning Engine Highlight Card */}
      <AdaptiveInsightCard />

      {/* Quick Action Cards */}
      <div>
        <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-slate-100 mb-3">
          Quick Actions
        </h3>
        <QuickActions />
      </div>

      {/* Continue Learning Subjects */}
      <ContinueLearning />

      {/* 30-Day Activity Heatmap */}
      <ActivityHeatmap />
    </div>
  );
};
