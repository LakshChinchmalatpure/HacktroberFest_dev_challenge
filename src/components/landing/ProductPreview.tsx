import React from 'react';
import { Flame, Clock, Target, BookOpen, Sparkles, Play, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';

export const ProductPreview: React.FC = () => {
  const navigate = useNavigate();
  const { loginAsDemo } = useAppStore();

  const handleLaunch = () => {
    loginAsDemo();
    navigate('/app');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 my-10">
      <div className="relative rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-900/90 shadow-2xl overflow-hidden p-2 sm:p-4 backdrop-blur-xl group">
        {/* Browser Mockup Window Bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 mb-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-3 font-mono text-[11px] text-slate-400 hidden sm:inline">
              cogniva.workspace/app/dashboard
            </span>
          </div>

          <button
            onClick={handleLaunch}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 font-semibold text-xs border border-primary-500/30 hover:bg-primary-500/30 transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Live Interactive Demo</span>
          </button>
        </div>

        {/* Dashboard Preview Inner */}
        <div className="space-y-4 p-2 sm:p-4 rounded-2xl bg-[#090d16] text-left">
          {/* Header Preview */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Good evening, Laksh 👋
              </h2>
              <p className="text-xs text-slate-400">Ready to make progress today?</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold flex items-center gap-1.5">
                <Flame className="w-4 h-4 fill-amber-500" />
                12 Day Streak
              </span>
              <span className="px-3 py-1 rounded-xl bg-primary-500/10 text-primary-300 border border-primary-500/20 text-xs font-bold">
                Level 4 • 2,840 XP
              </span>
            </div>
          </div>

          {/* KPI Stat Cards Preview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400">Study Today</span>
              <p className="text-lg font-bold text-white mt-1">45m</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400">Weekly Time</span>
              <p className="text-lg font-bold text-white mt-1">8.5 Hours</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400">Quiz Accuracy</span>
              <p className="text-lg font-bold text-primary-400 mt-1">78%</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400">Cards Mastered</span>
              <p className="text-lg font-bold text-emerald-400 mt-1">64 Cards</p>
            </div>
          </div>

          {/* Adaptive Insight Banner Preview */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-primary-950/60 to-slate-900 border border-primary-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Cogniva Insight • Weak Area Detected
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">
                Remedial Mastery: SQL Joins & Relational Sets
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Recommend: 10 Flashcards + 5 Question Quiz + 25 Min Focus Session
              </p>
            </div>
            <button
              onClick={handleLaunch}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary-600 to-teal-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-primary-500/20"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Start Session</span>
            </button>
          </div>

          {/* Continue Learning Subjects Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex justify-between text-xs font-semibold text-white mb-2">
                <span>Data Structures</span>
                <span className="text-primary-400">72%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full w-[72%]" />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex justify-between text-xs font-semibold text-white mb-2">
                <span>DBMS</span>
                <span className="text-teal-400">58%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-teal-400 rounded-full w-[58%]" />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex justify-between text-xs font-semibold text-white mb-2">
                <span>Operating Systems</span>
                <span className="text-purple-400">81%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full w-[81%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Hover Overlay Hint */}
        <div
          onClick={handleLaunch}
          className="absolute inset-0 bg-primary-950/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer"
        >
          <div className="px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-sm shadow-2xl border border-primary-500/40 flex items-center gap-2">
            <Play className="w-4 h-4 fill-primary-500 text-primary-500" />
            <span>Click Anywhere To Open Live Interactive Workspace</span>
          </div>
        </div>
      </div>
    </div>
  );
};
