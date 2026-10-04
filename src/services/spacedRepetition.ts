import { Flashcard, FlashcardMastery } from '@/types';

export function calculateNextReview(
  card: Flashcard,
  result: 'know' | 'again' | 'mastered'
): Flashcard {
  const now = new Date();
  let nextDate = new Date(now);
  let newMastery: FlashcardMastery = card.mastery;
  let correctCount = card.correctCount;
  let incorrectCount = card.incorrectCount;
  const reviewCount = card.reviewCount + 1;

  if (result === 'again') {
    incorrectCount += 1;
    newMastery = 'learning';
    // Review again today or tomorrow (10 mins to 1 day)
    nextDate.setDate(now.getDate() + 1);
  } else if (result === 'know') {
    correctCount += 1;
    if (card.mastery === 'new') {
      newMastery = 'learning';
      nextDate.setDate(now.getDate() + 1);
    } else if (card.mastery === 'learning') {
      newMastery = 'review';
      nextDate.setDate(now.getDate() + 3);
    } else if (card.mastery === 'review') {
      if (correctCount >= 3) {
        newMastery = 'mastered';
        nextDate.setDate(now.getDate() + 14);
      } else {
        nextDate.setDate(now.getDate() + 7);
      }
    } else {
      // Already mastered
      nextDate.setDate(now.getDate() + 30);
    }
  } else if (result === 'mastered') {
    correctCount += 1;
    newMastery = 'mastered';
    nextDate.setDate(now.getDate() + 30);
  }

  return {
    ...card,
    mastery: newMastery,
    reviewCount,
    correctCount,
    incorrectCount,
    lastReviewedAt: now.toISOString(),
    nextReviewDate: nextDate.toISOString(),
  };
}
