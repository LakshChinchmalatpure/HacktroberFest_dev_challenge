import React from 'react';
import { Hero } from '@/components/landing/Hero';
import { ProductPreview } from '@/components/landing/ProductPreview';
import { FeatureGrid } from '@/components/landing/FeatureGrid';
import { Footer } from '@/components/landing/Footer';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { GithubIcon } from '@/components/common/Icons';
import { useAppStore } from '@/store/useAppStore';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAsDemo } = useAppStore();

  const handleTryDemo = () => {
    loginAsDemo();
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Floating Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-[#090d16]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-primary-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-heading font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 to-primary-600 dark:from-white dark:to-teal-300 bg-clip-text text-transparent">
              Cogniva
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <a href="#why-cogniva" className="hover:text-primary-500 transition">
              Why Cogniva
            </a>
            <Link to="/app/focus" className="hover:text-primary-500 transition">
              Pomodoro
            </Link>
            <Link to="/app/flashcards" className="hover:text-primary-500 transition">
              Flashcards
            </Link>
            <Link to="/app/quizzes" className="hover:text-primary-500 transition">
              Quizzes
            </Link>
            <Link to="/app/analytics" className="hover:text-primary-500 transition">
              Analytics
            </Link>
          </nav>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />

            <Link
              to="/auth"
              className="hidden sm:inline-flex px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Sign In
            </Link>

            <button
              onClick={handleTryDemo}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-primary-600 to-brand-500 hover:from-primary-500 hover:to-brand-400 text-white font-bold text-xs shadow-md shadow-primary-500/20 transition group"
            >
              <span>Try Demo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Landing Sections */}
      <main className="flex-1">
        <Hero />
        <ProductPreview />
        <FeatureGrid />

        {/* Hacktoberfest Dev Challenge Showcase Banner */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 my-16">
          <div className="rounded-3xl border border-primary-500/30 bg-gradient-to-r from-primary-950/60 via-slate-900 to-teal-950/40 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider mb-4">
              Hacktoberfest Dev Challenge 2026
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight max-w-xl mx-auto mb-4">
              Open-Source Architecture Ready For Scaled Production
            </h2>

            <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
              Built with React, TypeScript, Tailwind CSS, Zustand, Recharts, and Service Workers.
              Cogniva was engineered as a portfolio-grade workspace with modular services that cleanly decouple storage, algorithms, and view layers.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleTryDemo}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs shadow-lg transition"
              >
                Experience Live App (Alex Morgan)
              </button>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-white font-semibold text-xs transition"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Browse Source & Docs</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
