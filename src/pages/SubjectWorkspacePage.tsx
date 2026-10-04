import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import {
  FolderKanban,
  Clock,
  Target,
  BookOpen,
  Sparkles,
  Play,
  AlertCircle,
  CheckCircle2,
  FileQuestion,
  ChevronRight,
} from 'lucide-react';
import { formatMinutes } from '@/lib/utils';

export const SubjectWorkspacePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { subjects, startPomodoro, setAIChatOpen } = useAppStore();
  const navigate = useNavigate();

  const currentId = searchParams.get('id') || subjects[0]?.id || 'sub-dsa';
  const activeSubject = subjects.find((s) => s.id === currentId) || subjects[0];

  const handleLaunchFocus = (topicName: string) => {
    startPomodoro(
      activeSubject.id,
      activeSubject.name,
      topicName,
      `Dedicated study: ${activeSubject.name} - ${topicName}`
    );
    navigate('/app/focus');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Subject Navigation Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-slate-200 dark:border-slate-800">
        {subjects.map((sub) => {
          const isSelected = sub.id === activeSubject.id;
          return (
            <button
              key={sub.id}
              onClick={() => setSearchParams({ id: sub.id })}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                isSelected
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{sub.name}</span>
              <span className="text-[10px] opacity-75">({sub.code})</span>
            </button>
          );
        })}
      </div>

      {/* Subject Workspace Header */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-primary-500/10 text-primary-500 border border-primary-500/20">
                {activeSubject.code}
              </span>
              <span className="text-xs text-slate-400">Computer Science Core</span>
            </div>

            <h1 className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
              {activeSubject.name}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeSubject.description}
            </p>
          </div>

          {/* Quick Subject Launchers */}
          <div className="flex flex-col sm:flex-row items-stretch gap-2.5 shrink-0">
            <button
              onClick={() => handleLaunchFocus(activeSubject.topics[0]?.name || 'Fundamentals')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-500 hover:to-teal-400 text-white font-bold text-xs shadow-md shadow-primary-500/20 transition"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Start 25m Focus</span>
            </button>

            <button
              onClick={() => navigate('/app/flashcards')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Subject Flashcards</span>
            </button>
          </div>
        </div>

        {/* 4 Stat KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">Syllabus Progress</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                {activeSubject.progress}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mt-2">
              <div
                className="h-full rounded-full bg-primary-500"
                style={{ width: `${activeSubject.progress}%` }}
              />
            </div>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">Focus Time</span>
            <span className="text-xl font-bold font-heading text-emerald-500">
              {formatMinutes(activeSubject.studyMinutes)}
            </span>
            <p className="text-[10px] text-slate-400 mt-1">Accumulated hours</p>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">Quiz Accuracy</span>
            <span className="text-xl font-bold font-heading text-primary-500">
              {activeSubject.quizAccuracy}%
            </span>
            <p className="text-[10px] text-slate-400 mt-1">Across all tests</p>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">Flashcard Mastery</span>
            <span className="text-xl font-bold font-heading text-teal-400">
              {activeSubject.cardsMastered}/{activeSubject.cardsCount}
            </span>
            <p className="text-[10px] text-slate-400 mt-1">Spaced recall cards</p>
          </div>
        </div>
      </div>

      {/* Syllabus Topics Breakdown */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 shadow-sm">
        <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-4">
          Topic Breakdown & Mastery Status
        </h3>

        <div className="space-y-3">
          {activeSubject.topics.map((topic) => (
            <div
              key={topic.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                topic.isWeakArea
                  ? 'border-rose-500/40 bg-rose-500/5 dark:bg-rose-500/5'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {topic.name}
                  </h4>
                  {topic.isWeakArea ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
                      <AlertCircle className="w-3 h-3" />
                      Weak Topic (Needs Revision)
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      Solid Retention
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {topic.description}
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {topic.masteryPercentage}%
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {topic.quizzesTaken || 2} Quizzes Taken
                  </span>
                </div>

                <button
                  onClick={() => handleLaunchFocus(topic.name)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-200/80 hover:bg-primary-600 hover:text-white dark:bg-slate-800 dark:hover:bg-primary-600 text-slate-800 dark:text-slate-200 text-xs font-semibold transition"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Focus Block</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
