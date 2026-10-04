import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipForward, Volume2, VolumeX, Sparkles, Bell } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { CircularProgress } from './CircularProgress';
import { StudySubjectSelector } from './StudySubjectSelector';
import { SessionCompleteModal } from './SessionCompleteModal';
import { formatTime } from '@/lib/utils';

export const PomodoroTimer: React.FC = () => {
  const {
    activePomodoro,
    user,
    startPomodoro,
    pausePomodoro,
    resumePomodoro,
    resetPomodoro,
    tickPomodoro,
    skipPomodoro,
    updateUserPreferences,
  } = useAppStore();

  const [selectedSubId, setSelectedSubId] = useState(activePomodoro.subjectId || 'sub-dbms');
  const [selectedSubName, setSelectedSubName] = useState(activePomodoro.subjectName || 'DBMS');
  const [selectedTopic, setSelectedTopic] = useState(activePomodoro.topicName || 'SQL Joins');
  const [goalText, setGoalText] = useState(activePomodoro.goal || '');
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [lastDuration, setLastDuration] = useState(25);

  // Interval timer tick
  useEffect(() => {
    let interval: any = null;
    if (activePomodoro.isRunning) {
      interval = setInterval(() => {
        tickPomodoro();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activePomodoro.isRunning, tickPomodoro]);

  // Request browser notification permission if enabled
  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  };

  const handleStart = () => {
    requestNotificationPermission();
    if (!activePomodoro.isRunning && activePomodoro.timeLeft < activePomodoro.totalDuration) {
      resumePomodoro();
    } else {
      startPomodoro(selectedSubId, selectedSubName, selectedTopic, goalText);
    }
  };

  const handleSkipOrComplete = () => {
    setLastDuration(Math.round(activePomodoro.totalDuration / 60));
    setShowCompleteModal(true);
    skipPomodoro();
  };

  const percentage = Math.round(
    ((activePomodoro.totalDuration - activePomodoro.timeLeft) / activePomodoro.totalDuration) * 100
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Timer Display Card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0f172a] p-6 sm:p-10 shadow-xl flex flex-col items-center justify-center text-center">
        {/* Top Controls: Sound & Preset Durations */}
        <div className="w-full flex items-center justify-between mb-6">
          {/* Preset focus duration buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs">
            {[15, 25, 45, 60].map((mins) => (
              <button
                key={mins}
                disabled={activePomodoro.isRunning}
                onClick={() => {
                  updateUserPreferences({ pomodoroFocusMinutes: mins });
                  resetPomodoro();
                }}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  user.preferences.pomodoroFocusMinutes === mins
                    ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-300 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {mins}m
              </button>
            ))}
          </div>

          {/* Sound & Notifications toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                updateUserPreferences({ soundEnabled: !user.preferences.soundEnabled })
              }
              className={`p-2 rounded-xl border transition ${
                user.preferences.soundEnabled
                  ? 'bg-primary-500/10 border-primary-500/30 text-primary-500'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
              }`}
              title={user.preferences.soundEnabled ? 'Sound enabled' : 'Muted'}
            >
              {user.preferences.soundEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={requestNotificationPermission}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-primary-500 transition"
              title="Browser notifications"
            >
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Circular Progress Gauge */}
        <div className="my-2">
          <CircularProgress
            percentage={percentage}
            timeFormatted={formatTime(activePomodoro.timeLeft)}
            mode={activePomodoro.mode}
            isRunning={activePomodoro.isRunning}
            sessionsCompleted={activePomodoro.sessionsCompleted}
          />
        </div>

        {/* Current Study Target Label */}
        <div className="mt-4 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-500">
            {activePomodoro.subjectName} • {activePomodoro.topicName}
          </span>
          {activePomodoro.goal && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto italic">
              "{activePomodoro.goal}"
            </p>
          )}
        </div>

        {/* Playback Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={resetPomodoro}
            className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {activePomodoro.isRunning ? (
            <button
              onClick={pausePomodoro}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-base shadow-lg shadow-amber-500/20 transition group"
            >
              <Pause className="w-5 h-5 fill-white" />
              <span>Pause Focus</span>
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-primary-600 to-brand-500 hover:from-primary-500 hover:to-brand-400 text-white font-bold text-base shadow-xl shadow-primary-500/25 transition group"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>{activePomodoro.timeLeft < activePomodoro.totalDuration ? 'Resume Focus' : 'Start Focus'}</span>
            </button>
          )}

          <button
            onClick={handleSkipOrComplete}
            className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
            title="Complete / Skip"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Subject and Goal Selector */}
      <StudySubjectSelector
        selectedSubjectId={selectedSubId}
        selectedTopic={selectedTopic}
        goalText={goalText}
        disabled={activePomodoro.isRunning}
        onSubjectChange={(id, name) => {
          setSelectedSubId(id);
          setSelectedSubName(name);
        }}
        onTopicChange={setSelectedTopic}
        onGoalChange={setGoalText}
      />

      {/* Completion Modal */}
      <SessionCompleteModal
        isOpen={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        durationMinutes={lastDuration}
        subjectName={selectedSubName}
        topicName={selectedTopic}
      />
    </div>
  );
};
