import React from 'react';

interface CircularProgressProps {
  percentage: number;
  timeFormatted: string;
  mode: 'focus' | 'short_break' | 'long_break';
  isRunning: boolean;
  sessionsCompleted: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  timeFormatted,
  mode,
  isRunning,
  sessionsCompleted,
}) => {
  const size = 300;
  const strokeWidth = 14;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const getGradientColors = () => {
    switch (mode) {
      case 'focus':
        return { start: '#6366f1', end: '#14b8a6', glow: 'rgba(99, 102, 241, 0.4)' };
      case 'short_break':
        return { start: '#10b981', end: '#34d399', glow: 'rgba(16, 185, 129, 0.4)' };
      case 'long_break':
        return { start: '#3b82f6', end: '#60a5fa', glow: 'rgba(59, 130, 246, 0.4)' };
    }
  };

  const colors = getGradientColors();

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color={colors.start} />
            <stop offset="100%" stop-color={colors.end} />
          </linearGradient>
          <filter id="timerGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background track circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-200 dark:text-slate-800/80 fill-none"
        />

        {/* Progress active circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#timerGrad)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="fill-none transition-all duration-500 ease-out"
          style={{ filter: isRunning ? 'url(#timerGlow)' : 'none' }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${
            mode === 'focus'
              ? 'bg-primary-500/10 text-primary-500 border border-primary-500/20'
              : mode === 'short_break'
              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
              : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
          }`}
        >
          {mode === 'focus' ? 'Deep Focus' : mode === 'short_break' ? 'Short Break' : 'Long Break'}
        </span>

        <h2 className="text-5xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
          {timeFormatted}
        </h2>

        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
          Session {(sessionsCompleted % 4) + 1} of 4 • {sessionsCompleted} Completed
        </p>
      </div>
    </div>
  );
};
