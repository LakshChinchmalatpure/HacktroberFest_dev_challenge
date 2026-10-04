import React from 'react';
import { Sparkles, AlertCircle, ArrowRight, Play, BookOpen, FileQuestion, Clock } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useNavigate } from 'react-router-dom';

export const AdaptiveInsightCard: React.FC = () => {
  const { recommendations, startPomodoro } = useAppStore();
  const navigate = useNavigate();

  if (!recommendations || recommendations.length === 0) return null;

  const topRec = recommendations[0];

  const handleStartRemedialSession = () => {
    // 1-click launch: Starts Pomodoro focus for this exact weak topic
    startPomodoro(
      topRec.subjectId,
      topRec.subjectName,
      topRec.topicName,
      `Adaptive Remedial: Master ${topRec.topicName} concepts`
    );
    navigate('/app/focus');
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary-500/30 bg-gradient-to-r from-primary-950/40 via-slate-900/90 to-teal-950/30 p-5 sm:p-6 backdrop-blur-md shadow-lg shadow-primary-500/5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/10 text-brand-400 border border-brand-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              Cogniva Insight • Adaptive Engine
            </span>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">
              <AlertCircle className="w-3 h-3" />
              Weak Area Detected
            </span>
          </div>

          <h3 className="text-xl font-bold font-heading text-white">
            {topRec.title}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            {topRec.reason}
          </p>

          {/* Action tags */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-200">
              <BookOpen className="w-3.5 h-3.5 text-teal-400" />
              <span>{topRec.recommendedActions.flashcardsCount} Flashcards</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-200">
              <FileQuestion className="w-3.5 h-3.5 text-amber-400" />
              <span>{topRec.recommendedActions.quizQuestionsCount} Question Quiz</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-200">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{topRec.recommendedActions.focusDurationMinutes}m Focus Block</span>
            </div>
          </div>
        </div>

        {/* 1-Click Launch Button */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-2.5 shrink-0">
          <button
            onClick={handleStartRemedialSession}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-brand-500 hover:from-primary-500 hover:to-brand-400 text-white font-semibold text-sm shadow-md shadow-primary-500/20 transition group"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start Recommended Session</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => navigate('/app/flashcards')}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Review Flashcards First</span>
          </button>
        </div>
      </div>
    </div>
  );
};
