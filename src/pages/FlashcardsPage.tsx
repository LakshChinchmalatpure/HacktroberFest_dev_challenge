import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { FlashcardViewer } from '@/components/flashcards/FlashcardViewer';
import { FlashcardGeneratorModal } from '@/components/flashcards/FlashcardGeneratorModal';
import { ReviewSummaryModal } from '@/components/flashcards/ReviewSummaryModal';
import { DeckList } from '@/components/flashcards/DeckList';
import {
  BookOpen,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Flashcard } from '@/types';

export const FlashcardsPage: React.FC = () => {
  const { flashcards, reviewCard, toggleBookmarkCard } = useAppStore();

  const [activeTab, setActiveTab] = useState<'review' | 'decks' | 'all'>('review');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | 'all'>('all');
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [reviewSummaryStats, setReviewSummaryStats] = useState<{
    reviewed: number;
    mastered: number;
    again: number;
  } | null>(null);

  // Cards due for review today (nextReviewDate <= now or 'new' or 'learning')
  const dueCards = flashcards.filter((c) => {
    if (c.mastery === 'new' || c.mastery === 'learning') return true;
    const reviewDate = new Date(c.nextReviewDate);
    return reviewDate <= new Date();
  });

  const [activeDeckCardIds, setActiveDeckCardIds] = useState<string[] | null>(null);

  // Determine current active cards queue
  const currentQueueCards: Flashcard[] = activeDeckCardIds
    ? flashcards.filter((c) => activeDeckCardIds.includes(c.id))
    : dueCards.length > 0
    ? dueCards
    : flashcards.slice(0, 10);

  const totalMastered = flashcards.filter((c) => c.mastery === 'mastered').length;
  const totalLearning = flashcards.filter((c) => c.mastery === 'learning').length;
  const totalReview = flashcards.filter((c) => c.mastery === 'review').length;
  const totalNew = flashcards.filter((c) => c.mastery === 'new').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
            Smart Flashcards
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Active recall powered by spaced repetition (SM-2 memory intervals)
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsGeneratorOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-600 to-teal-500 hover:from-primary-500 hover:to-teal-400 text-white font-bold text-xs shadow-md shadow-primary-500/20 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Cards with AI</span>
          </button>
        </div>
      </div>

      {/* Mastery KPI Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Due for Review</span>
            <Calendar className="w-4 h-4 text-primary-500" />
          </div>
          <p className="text-xl font-bold font-heading text-primary-500">
            {dueCards.length} Cards
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Mastered</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-xl font-bold font-heading text-emerald-500">
            {totalMastered} Cards
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Learning State</span>
            <RotateCcw className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-xl font-bold font-heading text-amber-500">
            {totalLearning + totalReview} Cards
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Library Total</span>
            <BookOpen className="w-4 h-4 text-teal-400" />
          </div>
          <p className="text-xl font-bold font-heading text-slate-900 dark:text-white">
            {flashcards.length} Cards
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => {
            setActiveTab('review');
            setActiveDeckCardIds(null);
          }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'review'
              ? 'bg-primary-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Review Today ({dueCards.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('decks')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'decks'
              ? 'bg-primary-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Decks & Topics</span>
        </button>
      </div>

      {/* Main Content Area */}
      {activeTab === 'review' ? (
        <div className="space-y-6">
          <div className="text-center max-w-md mx-auto">
            <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
              {activeDeckCardIds ? 'Practicing Selected Deck' : 'Active Recall Queue'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Rate your confidence after flipping to automatically update spaced intervals
            </p>
          </div>

          <FlashcardViewer
            cards={currentQueueCards}
            onReviewCard={reviewCard}
            onToggleBookmark={toggleBookmarkCard}
            onFinishReview={(stats) => setReviewSummaryStats(stats)}
          />
        </div>
      ) : (
        <DeckList
          selectedSubjectId={selectedSubjectId}
          onSelectSubject={setSelectedSubjectId}
          onOpenGenerator={() => setIsGeneratorOpen(true)}
          onStartDeckReview={(cardIds) => {
            setActiveDeckCardIds(cardIds);
            setActiveTab('review');
          }}
        />
      )}

      {/* Modals */}
      <FlashcardGeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
      />

      <ReviewSummaryModal
        isOpen={reviewSummaryStats !== null}
        onClose={() => {
          setReviewSummaryStats(null);
          setActiveDeckCardIds(null);
        }}
        stats={reviewSummaryStats || { reviewed: 0, mastered: 0, again: 0 }}
      />
    </div>
  );
};
