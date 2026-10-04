import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Target, FolderKanban, BookOpen } from 'lucide-react';

interface StudySubjectSelectorProps {
  selectedSubjectId: string;
  selectedTopic: string;
  goalText: string;
  onSubjectChange: (subId: string, subName: string) => void;
  onTopicChange: (topic: string) => void;
  onGoalChange: (goal: string) => void;
  disabled?: boolean;
}

export const StudySubjectSelector: React.FC<StudySubjectSelectorProps> = ({
  selectedSubjectId,
  selectedTopic,
  goalText,
  onSubjectChange,
  onTopicChange,
  onGoalChange,
  disabled = false,
}) => {
  const { subjects } = useAppStore();
  const currentSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0f172a] p-5 shadow-sm space-y-4">
      <div>
        <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Target className="w-4 h-4 text-primary-500" />
          What are you studying?
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Attach this session to a subject to track analytics and mastery
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Subject selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
            <FolderKanban className="w-3.5 h-3.5 text-slate-400" />
            Subject
          </label>
          <select
            disabled={disabled}
            value={selectedSubjectId}
            onChange={(e) => {
              const sub = subjects.find((s) => s.id === e.target.value);
              if (sub) {
                onSubjectChange(sub.id, sub.name);
                if (sub.topics.length > 0) {
                  onTopicChange(sub.topics[0].name);
                }
              }
            }}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/40 disabled:opacity-50"
          >
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name} ({sub.code})
              </option>
            ))}
          </select>
        </div>

        {/* Topic selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            Topic
          </label>
          <select
            disabled={disabled}
            value={selectedTopic}
            onChange={(e) => onTopicChange(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/40 disabled:opacity-50"
          >
            {currentSubject.topics.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name} {t.isWeakArea ? '⚠️ (Weak Area)' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Goal input */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Session Goal (Optional)
        </label>
        <input
          type="text"
          disabled={disabled}
          placeholder="e.g. Master SQL Outer Joins & Cartesian queries..."
          value={goalText}
          onChange={(e) => onGoalChange(e.target.value)}
          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 disabled:opacity-50"
        />
      </div>
    </div>
  );
};
