import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, Zap, Sparkles, BookOpen, Clock, AlertTriangle } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { getRelativeTimeString } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useAppStore();
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'insight':
        return <Sparkles className="w-4 h-4 text-brand-400" />;
      case 'streak':
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 'flashcard':
        return <BookOpen className="w-4 h-4 text-indigo-400" />;
      case 'focus':
        return <Clock className="w-4 h-4 text-emerald-400" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-primary-400" />;
    }
  };

  const handleNotificationClick = (id: string, type: string) => {
    markNotificationAsRead(id);
    setIsOpen(false);
    if (type === 'flashcard') navigate('/app/flashcards');
    else if (type === 'focus' || type === 'streak') navigate('/app/focus');
    else if (type === 'insight') navigate('/app');
    else if (type === 'quiz') navigate('/app/quizzes');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition focus:outline-none focus:ring-2 focus:ring-primary-500/40"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-900 animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary-500/10 text-primary-600 dark:text-primary-400">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsAsRead}
                className="text-xs text-slate-500 hover:text-primary-500 dark:text-slate-400 transition"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">
                No notifications right now
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNotificationClick(item.id, item.type)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition ${
                    item.read
                      ? 'opacity-70 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                      : 'bg-primary-500/5 hover:bg-primary-500/10 dark:bg-primary-500/10 dark:hover:bg-primary-500/15'
                  }`}
                >
                  <div className="mt-0.5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-0.5">
                      {item.message}
                    </p>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">
                      {getRelativeTimeString(item.timestamp)}
                    </span>
                  </div>
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
