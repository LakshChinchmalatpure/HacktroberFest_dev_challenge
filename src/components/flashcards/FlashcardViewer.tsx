import React, { useState } from 'react';
import {
  RotateCcw,
  CheckCircle,
  XCircle,
  Award,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { Flashcard } from '@/types';
import { soundManager } from '@/lib/sound';

interface FlashcardViewerProps {
  cards: Flashcard[];
  onReviewCard: (cardId: string, result: 'know' | 'again' | 'mastered') => void;
  onToggleBookmark: (cardId: string) => void;
  onFinishReview?: (stats: { reviewed: number; mastered: number; again: number }) => void;
}

export const FlashcardViewer: React.FC<FlashcardViewerProps> = ({
  cards,
  onReviewCard,
  onToggleBookmark,
  onFinishReview,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, mastered: 0, again: 0 });

  if (!cards || cards.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-12 text-center">
        <Sparkles className="w-10 h-10 text-primary-500 mx-auto mb-3" />
        <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
          All Caught Up!
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
          No cards due for revision right now. You can generate new AI flashcards or review existing decks.
        </p>
      </div>
    );
  }

  const currentCard = cards[currentIndex] || cards[0];

  const handleFlip = () => {
    soundManager.playCardFlip();
    setIsFlipped(!isFlipped);
  };

  const handleAction = (result: 'know' | 'again' | 'mastered') => {
    onReviewCard(currentCard.id, result);

    setSessionStats((prev) => ({
      reviewed: prev.reviewed + 1,
      mastered: result === 'mastered' ? prev.mastered + 1 : prev.mastered,
      again: result === 'again' ? prev.again + 1 : prev.again,
    }));

    setIsFlipped(false);

    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finished all cards in queue
      if (onFinishReview) {
        onFinishReview({
          reviewed: sessionStats.reviewed + 1,
          mastered: sessionStats.mastered + (result === 'mastered' ? 1 : 0),
          again: sessionStats.again + (result === 'again' ? 1 : 0),
        });
      }
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const getMasteryColor = (mastery: string) => {
    switch (mastery) {
      case 'mastered':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'review':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'learning':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top Header: Progress & Subject Tag */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary-500/10 text-primary-500 border border-primary-500/20">
            {currentCard.subjectName}
          </span>
          <span className="text-xs text-slate-400">• {currentCard.topicName}</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getMasteryColor(
              currentCard.mastery
            )}`}
          >
            {currentCard.mastery}
          </span>
          <button
            onClick={() => onToggleBookmark(currentCard.id)}
            className={`p-1.5 rounded-lg border transition ${
              currentCard.bookmarked
                ? 'bg-amber-500/20 text-amber-500 border-amber-500/30'
                : 'text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-200'
            }`}
            title="Bookmark card"
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-teal-400 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
        />
      </div>

      {/* 3D Flip Card Container */}
      <div
        className="perspective-1000 w-full min-h-[320px] sm:min-h-[360px] cursor-pointer"
        onClick={handleFlip}
      >
        <div
          className={`relative w-full h-full min-h-[320px] sm:min-h-[360px] rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0f172a] shadow-xl p-6 sm:p-8 flex flex-col justify-between transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Card Front (Question) */}
          <div
            className={`absolute inset-0 p-6 sm:p-8 flex flex-col justify-between backface-hidden ${
              isFlipped ? 'pointer-events-none' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
                <span className="flex items-center gap-1 font-semibold text-primary-500">
                  <HelpCircle className="w-4 h-4" />
                  QUESTION
                </span>
                <span>
                  Card {currentIndex + 1} of {cards.length}
                </span>
              </div>

              <h3 className="font-heading font-bold text-lg sm:text-2xl text-slate-900 dark:text-white leading-relaxed">
                {currentCard.question}
              </h3>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800/60">
              <span>Difficulty: {currentCard.difficulty}</span>
              <span className="text-primary-500 font-semibold flex items-center gap-1">
                Click to reveal answer ↺
              </span>
            </div>
          </div>

          {/* Card Back (Answer) */}
          <div
            className={`absolute inset-0 p-6 sm:p-8 flex flex-col justify-between rotate-y-180 backface-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 rounded-3xl text-white ${
              !isFlipped ? 'pointer-events-none' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                <span className="flex items-center gap-1 font-semibold text-teal-400">
                  <Sparkles className="w-4 h-4" />
                  EXPLANATION & ANSWER
                </span>
                <span>
                  Card {currentIndex + 1} of {cards.length}
                </span>
              </div>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed whitespace-pre-line font-normal">
                {currentCard.answer}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-800">
              <span>Reviewed: {currentCard.reviewCount} times</span>
              <span className="text-teal-400 font-semibold">Click to flip back ↺</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Controls & Spaced Recall Rating */}
      <div className="space-y-4">
        {/* Rating Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleAction('again')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 transition group"
          >
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <XCircle className="w-4 h-4" />
              <span>Review Again</span>
            </div>
            <span className="text-[10px] text-rose-400/80 mt-0.5">Repeat in 1 day</span>
          </button>

          <button
            onClick={() => handleAction('know')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-primary-500/10 hover:bg-primary-500/20 text-primary-600 dark:text-primary-300 border border-primary-500/20 transition group"
          >
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <CheckCircle className="w-4 h-4" />
              <span>I Know This</span>
            </div>
            <span className="text-[10px] text-primary-400/80 mt-0.5">Repeat in 3 days</span>
          </button>

          <button
            onClick={() => handleAction('mastered')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 transition group"
          >
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <Award className="w-4 h-4" />
              <span>Mastered</span>
            </div>
            <span className="text-[10px] text-emerald-400/80 mt-0.5">Repeat in 30 days</span>
          </button>
        </div>

        {/* Previous / Next Navigation */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 hover:text-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Card</span>
          </button>

          <button
            onClick={handleFlip}
            className="flex items-center gap-1 text-primary-500 font-semibold hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Flip Card</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === cards.length - 1}
            className="flex items-center gap-1 hover:text-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <span>Next Card</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
