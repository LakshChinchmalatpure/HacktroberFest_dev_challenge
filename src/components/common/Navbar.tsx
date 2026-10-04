import React from 'react';
import { Search, Sparkles, RotateCcw, Menu, Flame } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { NotificationCenter } from './NotificationCenter';
import { ThemeToggle } from './ThemeToggle';
import { OfflineBadge } from './OfflineBadge';
import { calculateLevel } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { user, setGlobalSearchOpen, setAIChatOpen, resetToDemoData } = useAppStore();
  const currentLevel = calculateLevel(user.xp);

  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#090d16]/85 backdrop-blur-md transition-colors">
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/app" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 via-indigo-600 to-brand-400 flex items-center justify-center shadow-md shadow-primary-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-primary-600 to-brand-500 dark:from-white dark:via-primary-400 dark:to-brand-300 bg-clip-text text-transparent">
                Cogniva
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20">
                Workspace
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Search Trigger (Ctrl+K) */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
          <button
            onClick={() => setGlobalSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 transition group text-sm"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-primary-500 transition-colors" />
              <span>Search subjects, cards, quizzes...</span>
            </div>
            <kbd className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right Action Icons & User profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick AI Assistant Trigger */}
          <button
            onClick={() => setAIChatOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-primary-600/10 via-primary-500/10 to-teal-500/10 hover:from-primary-600/20 hover:to-teal-500/20 text-primary-600 dark:text-primary-300 border border-primary-500/20 transition text-xs font-semibold shadow-sm"
            title="Ask Cogniva AI co-pilot"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary-500" />
            <span className="hidden sm:inline">Ask Cogniva</span>
          </button>

          {/* Quick Streak Badge */}
          <Link
            to="/app/focus"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold"
            title={`${user.currentStreak} Day Study Streak`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
            <span>{user.currentStreak}d</span>
          </Link>

          {/* Re-seed demo button (judge friendly) */}
          <button
            onClick={resetToDemoData}
            className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Reset to fresh Alex Morgan demo data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>

          {/* Notification dropdown */}
          <NotificationCenter />

          {/* Theme switcher */}
          <ThemeToggle />

          {/* User profile capsule */}
          <Link
            to="/app/settings"
            className="flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-slate-800 hover:opacity-90 transition"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-8 h-8 rounded-xl object-cover ring-2 ring-primary-500/30"
            />
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
                {user.name}
              </p>
              <p className="text-[10px] text-primary-500 font-medium">
                Lv. {currentLevel.level} {currentLevel.title}
              </p>
            </div>
          </Link>
        </div>
      </div>
      <OfflineBadge />
    </header>
  );
};
