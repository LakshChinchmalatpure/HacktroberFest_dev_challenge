import React, { useState } from 'react';
import { Sparkles, X, Loader2, BookOpen, Layers } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { aiService } from '@/services/aiService';

interface FlashcardGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubjectId?: string;
}

export const FlashcardGeneratorModal: React.FC<FlashcardGeneratorModalProps> = ({
  isOpen,
  onClose,
  defaultSubjectId,
}) => {
  const { subjects, addFlashcards } = useAppStore();

  const [selectedSubId, setSelectedSubId] = useState(defaultSubjectId || subjects[1]?.id || subjects[0]?.id);
  const currentSub = subjects.find((s) => s.id === selectedSubId) || subjects[0];
  const [topic, setTopic] = useState(currentSub?.topics[0]?.name || 'SQL Joins');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [cardCount, setCardCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const generatedCards = await aiService.generateFlashcards({
        subjectId: currentSub.id,
        subjectName: currentSub.name,
        topic,
        difficulty,
        count: cardCount,
      });

      addFlashcards(generatedCards, `${currentSub.name}: ${topic}`);
      onClose();
    } catch (err) {
      console.error('Failed to generate cards', err);
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
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-primary-600 to-teal-400 text-white shadow-md shadow-primary-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
              Generate Flashcards with AI
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Create high-yield active recall cards tailored to your syllabus
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
              placeholder="e.g. SQL Joins, B-Trees, AVL Rotations..."
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
                      ? 'bg-primary-500/10 border-primary-500 text-primary-500 dark:text-primary-300 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Number of cards */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Number of Cards ({cardCount} Cards)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[5, 10, 15].map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setCardCount(cnt)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                    cardCount === cnt
                      ? 'bg-teal-500/10 border-teal-500 text-teal-600 dark:text-teal-300 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {cnt} Cards
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate CTA */}
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
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-500 hover:to-teal-400 text-white text-xs font-bold transition shadow-lg shadow-primary-500/25 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Crafting Cards...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Cards</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
