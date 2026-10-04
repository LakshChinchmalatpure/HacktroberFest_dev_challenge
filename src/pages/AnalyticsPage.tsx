import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';
import {
  Clock,
  Target,
  BookOpen,
  Flame,
  Trophy,
  Calendar,
  BarChart3,
  TrendingUp,
} from 'lucide-react';
import { ActivityHeatmap } from '@/components/dashboard/ActivityHeatmap';
import { formatMinutes } from '@/lib/utils';

export const AnalyticsPage: React.FC = () => {
  const { user, subjects, flashcards, quizAttempts } = useAppStore();

  // Weekly study time data (Mon - Sun)
  const weeklyData = [
    { day: 'Mon', minutes: 75 },
    { day: 'Tue', minutes: 60 },
    { day: 'Wed', minutes: 90 },
    { day: 'Thu', minutes: 45 },
    { day: 'Fri', minutes: 80 },
    { day: 'Sat', minutes: 110 },
    { day: 'Sun', minutes: 50 },
  ];

  // Subject distribution data for Donut chart
  const subjectDistributionData = subjects.map((s) => ({
    name: s.name,
    value: s.studyMinutes,
    color: s.accentColor,
  }));

  // Quiz Performance timeline data
  const quizPerformanceData = [
    { attempt: 'Quiz 1', accuracy: 60, subject: 'DBMS' },
    { attempt: 'Quiz 2', accuracy: 70, subject: 'DSA' },
    { attempt: 'Quiz 3', accuracy: 40, subject: 'DBMS (Joins)' },
    { attempt: 'Quiz 4', accuracy: 85, subject: 'OS' },
    { attempt: 'Quiz 5', accuracy: 92, subject: 'Networks' },
    { attempt: 'Quiz 6', accuracy: 100, subject: 'Trees' },
  ];

  // Flashcard Mastery distribution
  const masteryCounts = {
    mastered: flashcards.filter((c) => c.mastery === 'mastered').length,
    review: flashcards.filter((c) => c.mastery === 'review').length,
    learning: flashcards.filter((c) => c.mastery === 'learning').length,
    new: flashcards.filter((c) => c.mastery === 'new').length,
  };

  const masteryData = [
    { name: 'Mastered', count: masteryCounts.mastered, fill: '#10b981' },
    { name: 'Review State', count: masteryCounts.review, fill: '#3b82f6' },
    { name: 'Learning', count: masteryCounts.learning, fill: '#f59e0b' },
    { name: 'New Cards', count: masteryCounts.new, fill: '#64748b' },
  ];

  const totalStudyHours = (user.totalStudyMinutes / 60).toFixed(1);

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
          Study Analytics & Insights
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Comprehensive performance visualizations, study time distributions, and accuracy trends
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Clock className="w-3.5 h-3.5 text-emerald-500" />
            <span>Total Hours</span>
          </div>
          <p className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
            {totalStudyHours}h
          </p>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Lifetime focus</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Calendar className="w-3.5 h-3.5 text-primary-500" />
            <span>Avg Session</span>
          </div>
          <p className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
            25m
          </p>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Pomodoro standard</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Target className="w-3.5 h-3.5 text-teal-400" />
            <span>Quiz Accuracy</span>
          </div>
          <p className="text-2xl font-extrabold font-heading text-teal-400">
            78%
          </p>
          <span className="text-[10px] text-emerald-500 mt-0.5 block">+12% trend</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
            <span>Mastered Cards</span>
          </div>
          <p className="text-2xl font-extrabold font-heading text-indigo-400">
            {masteryCounts.mastered}
          </p>
          <span className="text-[10px] text-slate-400 mt-0.5 block">SM-2 interval 30d</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Current Streak</span>
          </div>
          <p className="text-2xl font-extrabold font-heading text-amber-500">
            {user.currentStreak}d
          </p>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Daily active</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Trophy className="w-3.5 h-3.5 text-purple-400" />
            <span>Best Streak</span>
          </div>
          <p className="text-2xl font-extrabold font-heading text-purple-400">
            {user.bestStreak}d
          </p>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Personal record</span>
        </div>
      </div>

      {/* Row 1 Charts: Weekly Study Time + Subject Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Study Time Bar Chart */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                Weekly Study Time
              </h3>
              <p className="text-xs text-slate-400">Minutes focused each day this week</p>
            </div>
            <span className="text-xs font-semibold text-primary-500 bg-primary-500/10 px-2.5 py-1 rounded-lg">
              8.5h Total
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                  formatter={(val: any) => [`${val} mins`, 'Study Time']}
                />
                <Bar dataKey="minutes" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Distribution Donut Chart */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                Subject Distribution
              </h3>
              <p className="text-xs text-slate-400">Proportional time spent by course</p>
            </div>
            <span className="text-xs font-semibold text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-lg">
              5 Courses
            </span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subjectDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {subjectDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                  formatter={(val: any) => [`${formatMinutes(val)}`, 'Time']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Subject color legend */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2 text-xs">
            {subjectDistributionData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-400">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 Charts: Quiz Accuracy Line + Flashcard Mastery */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quiz Performance Over Time */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                Quiz Accuracy Trend
              </h3>
              <p className="text-xs text-slate-400">Score progress across consecutive tests</p>
            </div>
            <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
              Upward Velocity
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={quizPerformanceData}>
                <defs>
                  <linearGradient id="accuracyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="attempt" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                  formatter={(val: any) => [`${val}%`, 'Accuracy']}
                />
                <Area
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#14b8a6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#accuracyGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Flashcard Mastery State Distribution */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                Flashcard Mastery Progression
              </h3>
              <p className="text-xs text-slate-400">Active recall stages across all decks</p>
            </div>
            <span className="text-xs font-semibold text-primary-500 bg-primary-500/10 px-2.5 py-1 rounded-lg">
              {flashcards.length} Total Cards
            </span>
          </div>

          <div className="space-y-4 py-2">
            {masteryData.map((stage) => {
              const pct = flashcards.length > 0 ? Math.round((stage.count / flashcards.length) * 100) : 0;
              return (
                <div key={stage.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {stage.name}
                    </span>
                    <span className="text-slate-400 font-medium">
                      {stage.count} cards ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: stage.fill,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Activity Heatmap */}
      <ActivityHeatmap />
    </div>
  );
};
