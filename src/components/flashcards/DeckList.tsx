import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { BookOpen, Sparkles, Plus, Play, CheckCircle } from 'lucide-react';

interface DeckListProps {
  selectedSubjectId: string | 'all';
  onSelectSubject: (id: string | 'all') => void;
  onOpenGenerator: () => void;
  onStartDeckReview: (cardIds: string[]) => void;
}

export const DeckList: React.FC<DeckListProps> = ({
  selectedSubjectId,
  onSelectSubject,
  onOpenGenerator,
  onStartDeckReview,
}) => {
  const { decks, subjects, flashcards } = useAppStore();

  const filteredDecks = selectedSubjectId === 'all'
    ? decks
    : decks.filter((d) => d.subjectId === selectedSubjectId);

  return (
    <div className="space-y-6">
      {/* Top Filter & Add Deck Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Subject filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => onSelectSubject('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedSubjectId === 'all'
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            All Decks ({decks.length})
          </button>
          {subjects.map((sub) => (
            <button
              key={sub.id}
              onClick={() => onSelectSubject(sub.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedSubjectId === sub.id
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>

        {/* Generate Deck Button */}
        <button
          onClick={onOpenGenerator}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-500 hover:to-teal-400 text-white font-semibold text-xs transition shadow-md shadow-primary-500/20 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generate Deck with AI</span>
        </button>
      </div>

      {/* Grid of Decks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDecks.map((deck) => {
          const sub = subjects.find((s) => s.id === deck.subjectId);
          const deckCards = flashcards.filter((c) => deck.cardIds.includes(c.id));
          const masteredCount = deckCards.filter((c) => c.mastery === 'mastered').length;
          const percentage = deckCards.length > 0 ? Math.round((masteredCount / deckCards.length) * 100) : 0;

          return (
            <div
              key={deck.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-500 border border-primary-500/20">
                    {sub?.name || 'General'}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {deckCards.length} Cards
                  </span>
                </div>

                <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">
                  {deck.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {deck.description}
                </p>

                {/* Progress bar */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Mastery</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {masteredCount}/{deckCards.length} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary-500 to-teal-400"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-teal-500 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Ready to study</span>
                </span>
                <button
                  onClick={() => onStartDeckReview(deck.cardIds)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary-600 hover:text-white text-slate-700 dark:text-slate-200 text-xs font-semibold transition"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Practice</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
