import React from 'react';
import { ArrowRight, BookOpen, Clock, Target, Play } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useNavigate } from 'react-router-dom';
import { formatMinutes } from '@/lib/utils';

export const ContinueLearning: React.FC = () => {
  const { subjects, startPomodoro } = useAppStore();
  const navigate = useNavigate();

  // Show top 3 active subjects
  const topSubjects = subjects.slice(0, 3);

  const handleQuickStudy = (sub: typeof subjects[0], e: React.MouseEvent) => {
    e.stopPropagation();
    const primaryTopic = sub.topics[0]?.name || 'Core Fundamentals';
    startPomodoro(sub.id, sub.name, primaryTopic, `Study session for ${sub.name}`);
    navigate('/app/focus');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-slate-100">
            Continue Learning
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pick up right where you left off
          </p>
        </div>
        <button
          onClick={() => navigate('/app/subjects')}
          className="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
        >
          <span>All Subjects ({subjects.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topSubjects.map((sub) => {
          return (
            <div
              key={sub.id}
              onClick={() => navigate(`/app/subjects?id=${sub.id}`)}
              className="relative p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0f172a] hover:border-primary-500/40 dark:hover:border-primary-500/40 transition-all cursor-pointer shadow-sm hover:shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-primary-500 uppercase tracking-wide">
                      {sub.code}
                    </span>
                    <h4 className="font-heading font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-primary-500 transition-colors">
                      {sub.name}
                    </h4>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {sub.progress}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-4">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary-500 to-brand-400"
                    style={{ width: `${sub.progress}%` }}
                  />
                </div>

                {/* Mini stats */}
                <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 text-center mb-4">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>Time</span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                      {formatMinutes(sub.studyMinutes)}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
                      <Target className="w-3 h-3" />
                      <span>Quiz</span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                      {sub.quizAccuracy}%
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
                      <BookOpen className="w-3 h-3" />
                      <span>Cards</span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                      {sub.cardsMastered}/{sub.cardsCount}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={(e) => handleQuickStudy(sub, e)}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-primary-600 hover:text-white dark:bg-slate-800 dark:hover:bg-primary-600 text-slate-700 dark:text-slate-200 text-xs font-semibold transition"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Quick Focus (25m)</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
