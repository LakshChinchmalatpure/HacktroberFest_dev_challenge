import React from 'react';
import { Target, CheckCircle2, Circle, Trash2, Calendar, FolderKanban } from 'lucide-react';
import { StudyGoal } from '@/types';
import { useAppStore } from '@/store/useAppStore';

interface GoalCardProps {
  goal: StudyGoal;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const { toggleGoalTask, deleteStudyGoal } = useAppStore();

  const completedCount = goal.tasks.filter((t) => t.completed).length;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-500 border border-primary-500/20">
              {goal.subjectName}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {goal.deadlineDays} Days Target
            </span>
          </div>

          <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
            {goal.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            {goal.targetDescription}
          </p>
        </div>

        <button
          onClick={() => deleteStudyGoal(goal.id)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition"
          title="Delete goal"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Progress */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-slate-400 font-medium">Goal Completion</span>
          <span className="font-bold text-primary-500">
            {goal.progressPercentage}% ({completedCount}/{goal.tasks.length} Tasks)
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-teal-400 transition-all duration-300"
            style={{ width: `${goal.progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Milestones & Syllabus Topics
        </p>
        <div className="space-y-1.5">
          {goal.tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => toggleGoalTask(goal.id, task.id)}
              className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-left text-xs transition ${
                task.completed
                  ? 'bg-emerald-500/5 text-slate-400 dark:text-slate-500 line-through'
                  : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {task.completed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-slate-400 shrink-0" />
              )}
              <span className="flex-1">{task.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
