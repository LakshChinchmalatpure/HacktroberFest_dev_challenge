import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Clock,
  BookOpen,
  FileQuestion,
  FolderKanban,
  BarChart3,
  CalendarCheck,
  Award,
  Settings,
  Flame,
  Zap,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { calculateLevel } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAppStore();
  const currentLevel = calculateLevel(user.xp);
  const xpInCurrentLevel = user.xp - currentLevel.minXp;
  const xpNeeded = currentLevel.maxXp - currentLevel.minXp;
  const levelProgress = Math.min(100, Math.round((xpInCurrentLevel / xpNeeded) * 100));

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/app' },
    { label: 'Focus Pomodoro', icon: Clock, path: '/app/focus' },
    { label: 'Smart Flashcards', icon: BookOpen, path: '/app/flashcards' },
    { label: 'AI Quizzes', icon: FileQuestion, path: '/app/quizzes' },
    { label: 'Subjects', icon: FolderKanban, path: '/app/subjects' },
    { label: 'Study Analytics', icon: BarChart3, path: '/app/analytics' },
    { label: 'Study Planner', icon: CalendarCheck, path: '/app/planner' },
    { label: 'Achievements', icon: Award, path: '/app/achievements' },
    { label: 'Settings', icon: Settings, path: '/app/settings' },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 border-r border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c101c] flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Navigation list */}
        <div className="p-3.5 space-y-1 overflow-y-auto">
          <div className="px-3 py-2 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            WORKSPACE
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/app'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-semibold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-40" />
              </NavLink>
            );
          })}
        </div>

        {/* Gamification footer card: Streak + Level Progress */}
        <div className="p-3.5 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
          {/* Streak capsule */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-500">
                <Flame className="w-4 h-4 fill-amber-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {user.currentStreak} Day Streak
                </p>
                <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                  {user.currentStreak >= 7 ? 'On fire! Keep it going' : 'Study today to continue'}
                </p>
              </div>
            </div>
          </div>

          {/* Level & XP */}
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary-500 fill-primary-500" />
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Lv. {currentLevel.level}
                </span>
                <span className="text-[11px] text-slate-400">({currentLevel.title})</span>
              </div>
              <span className="text-[11px] font-semibold text-primary-600 dark:text-primary-400">
                {user.xp} XP
              </span>
            </div>

            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-brand-400 transition-all duration-500"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>{xpInCurrentLevel} XP</span>
              <span>{xpNeeded} XP to next level</span>
            </div>
          </div>

          {/* Hacktoberfest badge */}
          <div className="mt-3 flex items-center justify-between px-2 text-[11px] text-slate-400">
            <span>Hacktoberfest Edition</span>
            <span className="text-emerald-500 font-semibold flex items-center gap-1">
              Open Source <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
