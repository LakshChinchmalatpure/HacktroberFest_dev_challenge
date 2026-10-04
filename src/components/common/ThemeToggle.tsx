import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const ThemeToggle: React.FC = () => {
  const { user, setTheme } = useAppStore();
  const isDark = user.preferences.theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/40"
      aria-label="Toggle theme"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <Sun className="w-5 h-5 text-amber-400 animate-spin-once" /> : <Moon className="w-5 h-5 text-indigo-600" />}
    </button>
  );
};
