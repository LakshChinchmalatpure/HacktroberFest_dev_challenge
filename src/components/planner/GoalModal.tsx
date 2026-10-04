import React, { useState } from 'react';
import { Target, X, Plus, Trash2 } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoalModal: React.FC<GoalModalProps> = ({ isOpen, onClose }) => {
  const { subjects, addStudyGoal } = useAppStore();

  const [selectedSubId, setSelectedSubId] = useState(subjects[0]?.id || 'sub-dsa');
  const currentSub = subjects.find((s) => s.id === selectedSubId) || subjects[0];
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [days, setDays] = useState(30);
  const [tasks, setTasks] = useState<string[]>(['Core Fundamentals', 'Solve Practice Problems', 'Review Mistakes']);
  const [newTaskInput, setNewTaskInput] = useState('');

  if (!isOpen) return null;

  const handleAddTask = () => {
    if (!newTaskInput.trim()) return;
    setTasks([...tasks, newTaskInput.trim()]);
    setNewTaskInput('');
  };

  const handleRemoveTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || tasks.length === 0) return;

    addStudyGoal({
      subjectId: currentSub.id,
      subjectName: currentSub.name,
      title: title.trim(),
      targetDescription: description.trim() || `Master core topics of ${currentSub.name}`,
      progressPercentage: 0,
      deadlineDays: days,
      targetDate: new Date(Date.now() + 86400000 * days).toISOString(),
      completed: false,
      tasks: tasks.map((t, idx) => ({
        id: `task-${Date.now()}-${idx}`,
        title: t,
        completed: false,
      })),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-primary-600 to-indigo-600 text-white shadow-md shadow-primary-500/20">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
              Create Study Goal
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Set milestones and track progress for your courses
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Subject
            </label>
            <select
              value={selectedSubId}
              onChange={(e) => setSelectedSubId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            >
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name} ({sub.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Goal Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Master Tree Traversals & Shortest Paths"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Target Deadline (Days)
            </label>
            <input
              type="number"
              min="1"
              max="365"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Tasks & Milestones ({tasks.length})
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Add sub-task or topic..."
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTask();
                  }
                }}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              />
              <button
                type="button"
                onClick={handleAddTask}
                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-36 overflow-y-auto space-y-1.5">
              {tasks.map((task, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50"
                >
                  <span className="truncate">{task}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTask(idx)}
                    className="p-1 text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white text-xs font-bold transition shadow-md shadow-primary-500/20"
            >
              Create Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
