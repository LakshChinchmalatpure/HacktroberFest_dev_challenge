import React from 'react';
import { Clock, BookOpen, FileQuestion, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  const { setAIChatOpen } = useAppStore();

  const actions = [
    {
      title: 'Start Focus',
      description: 'Begin a 25m Pomodoro session',
      icon: Clock,
      gradient: 'from-emerald-500/10 via-teal-500/10 to-emerald-500/5',
      iconBg: 'bg-emerald-500/20 text-emerald-500 dark:text-emerald-400',
      borderHover: 'hover:border-emerald-500/40',
      onClick: () => navigate('/app/focus'),
    },
    {
      title: 'Review Cards',
      description: 'Review cards due today with spaced recall',
      icon: BookOpen,
      gradient: 'from-indigo-500/10 via-primary-500/10 to-indigo-500/5',
      iconBg: 'bg-primary-500/20 text-primary-600 dark:text-primary-400',
      borderHover: 'hover:border-primary-500/40',
      onClick: () => navigate('/app/flashcards'),
    },
    {
      title: 'Take Quiz',
      description: 'Test your knowledge on weak topics',
      icon: FileQuestion,
      gradient: 'from-amber-500/10 via-orange-500/10 to-amber-500/5',
      iconBg: 'bg-amber-500/20 text-amber-500 dark:text-amber-400',
      borderHover: 'hover:border-amber-500/40',
      onClick: () => navigate('/app/quizzes'),
    },
    {
      title: 'Ask Cogniva',
      description: 'AI Study Assistant for any topic',
      icon: Sparkles,
      gradient: 'from-purple-500/10 via-pink-500/10 to-purple-500/5',
      iconBg: 'bg-purple-500/20 text-purple-500 dark:text-purple-400',
      borderHover: 'hover:border-purple-500/40',
      onClick: () => setAIChatOpen(true),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <button
            key={act.title}
            onClick={act.onClick}
            className={`relative flex flex-col justify-between p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0f172a] hover:bg-slate-50 dark:hover:bg-[#131e36] text-left transition-all shadow-sm hover:shadow-md group ${act.borderHover}`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${act.iconBg} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
              <h4 className="font-heading font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-primary-500 transition-colors">
                {act.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {act.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};
