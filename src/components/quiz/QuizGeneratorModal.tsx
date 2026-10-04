import React, { useState } from 'react';
import { Sparkles, X, Loader2, FileQuestion } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { aiService } from '@/services/aiService';
import { QuizQuestion } from '@/types';

interface QuizGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuizReady: (questions: QuizQuestion[], meta: { subjectId: string; subjectName: string; topic: string; difficulty: 'beginner' | 'intermediate' | 'advanced' }) => void;
  defaultSubjectId?: string;
  defaultTopic?: string;
}

export const QuizGeneratorModal: React.FC<QuizGeneratorModalProps> = ({
  isOpen,
  onClose,
  onQuizReady,
  defaultSubjectId,
  defaultTopic,
}) => {
  const { subjects } = useAppStore();

  const [selectedSubId, setSelectedSubId] = useState(defaultSubjectId || subjects[1]?.id || subjects[0]?.id);
  const currentSub = subjects.find((s) => s.id === selectedSubId) || subjects[0];
  const [topic, setTopic] = useState(defaultTopic || currentSub?.topics[0]?.name || 'SQL Joins');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [questionCount, setQuestionCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const questions = await aiService.generateQuiz({
        subjectId: currentSub.id,
        subjectName: currentSub.name,
        topic,
        difficulty,
        count: questionCount,
      });

      onQuizReady(questions, {
        subjectId: currentSub.id,
        subjectName: currentSub.name,
        topic,
        difficulty,
      });
      onClose();
    } catch (err) {
      console.error('Failed to generate quiz', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20">
            <FileQuestion className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
              Generate AI Quiz
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive test questions with multiple-choice, true/false, and explanations
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Subject */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Subject
            </label>
            <select
              value={selectedSubId}
              onChange={(e) => {
                setSelectedSubId(e.target.value);
                const sub = subjects.find((s) => s.id === e.target.value);
                if (sub && sub.topics.length > 0) {
                  setTopic(sub.topics[0].name);
                }
              }}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            >
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name} ({sub.code})
                </option>
              ))}
            </select>
          </div>

          {/* Topic */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. SQL Joins, B-Trees, Deadlocks..."
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Difficulty
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['beginner', 'intermediate', 'advanced'] as const).map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setDifficulty(diff)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize border transition ${
                    difficulty === diff
                      ? 'bg-amber-500/10 border-amber-500 text-amber-500 dark:text-amber-300 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Question count */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Number of Questions ({questionCount} Questions)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[3, 5, 10].map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setQuestionCount(cnt)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                    questionCount === cnt
                      ? 'bg-primary-500/10 border-primary-500 text-primary-600 dark:text-primary-300 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {cnt} Questions
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isGenerating || !topic.trim()}
            onClick={handleGenerate}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-xs font-bold transition shadow-lg shadow-amber-500/25 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating Quiz...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Start Quiz</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
