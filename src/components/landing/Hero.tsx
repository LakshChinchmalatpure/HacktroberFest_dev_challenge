import React from 'react';
import { ArrowRight, Sparkles, Flame, CheckCircle, Zap, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { loginAsDemo } = useAppStore();

  const handleStartLearning = () => {
    loginAsDemo();
    navigate('/app');
  };

  return (
    <div className="relative pt-12 sm:pt-20 pb-16 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[250px] bg-brand-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
        {/* Hacktoberfest badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-300 text-xs font-semibold backdrop-blur-sm animate-fade-in shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-primary-500" />
          <span>Hacktoberfest Dev Challenge 2026</span>
          <span className="w-1 h-1 rounded-full bg-primary-400" />
          <span className="text-emerald-500 font-bold">Open Source SaaS</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight leading-[1.1]">
          Learn Smarter.{' '}
          <span className="bg-gradient-to-r from-primary-600 via-indigo-500 to-teal-400 bg-clip-text text-transparent">
            Focus Deeper.
          </span>{' '}
          Improve Faster.
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          Cogniva is an AI-powered learning workspace that combines focused study sessions, intelligent flashcards, adaptive quizzes, and personalized learning insights.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <button
            onClick={handleStartLearning}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-primary-600 to-brand-500 hover:from-primary-500 hover:to-brand-400 text-white font-bold text-sm transition-all shadow-xl shadow-primary-500/25 group"
          >
            <span>Start Learning (Try Demo)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#why-cogniva"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold transition"
          >
            <span>Explore Cogniva</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Instant Demo (No API Setup Required)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Offline-First PWA</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-rose-500" />
            <span>Spaced Repetition & Adaptive AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};
