import React from 'react';
import { Clock, BookOpen, FileQuestion, BarChart3, Sparkles, Cpu, Layers } from 'lucide-react';

export const FeatureGrid: React.FC = () => {
  const features = [
    {
      title: 'Focus',
      tagline: 'Deep study intervals',
      description: 'Stay productive with intelligent Pomodoro sessions, circular visual timers, session tagging, and audio feedback.',
      icon: Clock,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Learn',
      tagline: 'Active recall flashcards',
      description: 'Create and review intelligent flashcards powered by the SM-2 spaced repetition algorithm for optimal memory retention.',
      icon: BookOpen,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10 border-indigo-500/20',
    },
    {
      title: 'Practice',
      tagline: 'Multi-format testing',
      description: 'Generate adaptive quizzes based on your subjects and weak areas, supporting multiple-choice, true/false, and multiple-answer.',
      icon: FileQuestion,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'Improve',
      tagline: 'Data-driven feedback',
      description: 'Use study analytics, weekly time distributions, accuracy trendlines, and activity heatmaps to continuously improve.',
      icon: BarChart3,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10 border-teal-500/20',
    },
    {
      title: 'Personalize',
      tagline: 'Adaptive learning engine',
      description: 'Let Cogniva detect weak topics from quiz mistakes and formulate targeted remedial sessions with one-click execution.',
      icon: Sparkles,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
    {
      title: 'AI Co-Pilot',
      tagline: 'Cogniva AI Assistant',
      description: 'Ask questions, simplify complex computer science concepts, diagnose error patterns, and formulate custom 7-day study plans.',
      icon: Cpu,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20',
    },
  ];

  return (
    <section id="why-cogniva" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 border border-primary-500/20 mb-3 inline-block">
          Why Cogniva?
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
          The Complete Learning Operating System
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
          The primary learning loop connects focus, memory recall, test diagnostics, and adaptive improvement into a unified workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.title}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 shadow-sm hover:shadow-md transition-all group hover:border-primary-500/30"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-4 group-hover:scale-110 transition-transform ${feat.bg}`}>
                <Icon className={`w-6 h-6 ${feat.color}`} />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                {feat.tagline}
              </span>
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">
                {feat.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {feat.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
