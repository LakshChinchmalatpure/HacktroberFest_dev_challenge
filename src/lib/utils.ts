import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { UserLevel } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatMinutes(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = (minutes / 60).toFixed(1);
  return `${hours.endsWith('.0') ? hours.slice(0, -2) : hours}h`;
}

export function calculateLevel(xp: number): UserLevel {
  const levels: UserLevel[] = [
    { level: 1, title: 'Novice Scholar', minXp: 0, maxXp: 500 },
    { level: 2, title: 'Active Learner', minXp: 500, maxXp: 1200 },
    { level: 3, title: 'Focused Mind', minXp: 1200, maxXp: 2200 },
    { level: 4, title: 'Deep Thinker', minXp: 2200, maxXp: 3500 },
    { level: 5, title: 'Mastery Seeker', minXp: 3500, maxXp: 5200 },
    { level: 6, title: 'Cogniva Fellow', minXp: 5200, maxXp: 7500 },
    { level: 7, title: 'Grand Scholar', minXp: 7500, maxXp: 12000 },
  ];

  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].minXp) {
      return levels[i];
    }
  }
  return levels[0];
}

export function getRelativeTimeString(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString();
}
