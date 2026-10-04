import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { GoalCard } from '@/components/planner/GoalCard';
import { GoalModal } from '@/components/planner/GoalModal';
import { CalendarCheck, Plus, Target, CheckCircle2, Clock } from 'lucide-react';

export const PlannerPage: React.FC = () => {
  const { studyGoals } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const completedGoals = studyGoals.filter((g) => g.completed).length;
  const inProgressGoals = studyGoals.filter((g) => !g.completed).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            Study Planner & Goals
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Organize course milestones, syllabus checklists, and exam deadlines
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-primary-500/20 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Create Learning Goal</span>
        </button>
      </div>

      {/* Goal Summary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Active Goals</span>
            <Target className="w-4 h-4 text-primary-500" />
          </div>
          <p className="text-xl font-bold font-heading text-slate-900 dark:text-white">
            {inProgressGoals} in Progress
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Completed Goals</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-xl font-bold font-heading text-emerald-500">
            {completedGoals} Mastered
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Total Tasks Logged</span>
            <CalendarCheck className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-xl font-bold font-heading text-amber-500">
            {studyGoals.reduce((acc, g) => acc + g.tasks.length, 0)} Milestones
          </p>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studyGoals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>

      {/* Goal Modal */}
      <GoalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
