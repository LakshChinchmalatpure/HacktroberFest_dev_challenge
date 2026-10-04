import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import {
  Settings as SettingsIcon,
  User,
  Sliders,
  Volume2,
  Sparkles,
  RotateCcw,
  Download,
  Key,
  CheckCircle,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, updateUserPreferences, resetToDemoData } = useAppStore();

  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [focusMins, setFocusMins] = useState(user.preferences.pomodoroFocusMinutes);
  const [shortBreakMins, setShortBreakMins] = useState(user.preferences.pomodoroShortBreakMinutes);
  const [longBreakMins, setLongBreakMins] = useState(user.preferences.pomodoroLongBreakMinutes);
  const [apiKey, setApiKey] = useState(user.preferences.apiKey || '');
  const [savedMsg, setSavedMsg] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserPreferences({
      pomodoroFocusMinutes: focusMins,
      pomodoroShortBreakMinutes: shortBreakMins,
      pomodoroLongBreakMinutes: longBreakMins,
      apiKey: apiKey.trim(),
    });
    setSavedMsg('Preferences updated successfully.');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const handleExportData = () => {
    const raw = localStorage.getItem('cogniva_store_v1');
    if (!raw) return;
    const blob = new Blob([raw], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cogniva-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
          Workspace Settings
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Configure Pomodoro timings, AI co-pilot provider, and student profile preferences
        </p>
      </div>

      {savedMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{savedMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Details */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 shadow-sm space-y-4">
          <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <User className="w-4 h-4 text-primary-500" />
            Student Profile
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Academic Bio & Learning Focus
            </label>
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            />
          </div>
        </div>

        {/* Pomodoro Focus Preferences */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 shadow-sm space-y-4">
          <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-500" />
            Pomodoro Focus Intervals
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Focus Duration (Minutes)
              </label>
              <input
                type="number"
                min="5"
                max="120"
                value={focusMins}
                onChange={(e) => setFocusMins(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Short Break (Minutes)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={shortBreakMins}
                onChange={(e) => setShortBreakMins(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Long Break (Minutes)
              </label>
              <input
                type="number"
                min="5"
                max="60"
                value={longBreakMins}
                onChange={(e) => setLongBreakMins(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              />
            </div>
          </div>
        </div>

        {/* AI Co-Pilot Preferences */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Cogniva AI Settings
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold border border-emerald-500/20">
              Active: Built-In Offline Engine
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Cogniva includes a self-contained offline learning model designed for hackathons.
            Optionally provide an external Gemini or OpenAI API key for extended live web research.
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-slate-400" />
              Optional External API Key (Gemini / OpenAI)
            </label>
            <input
              type="password"
              placeholder="sk-... or AIzaSy... (Optional)"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 font-mono"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md shadow-primary-500/20 transition"
          >
            Save Preferences
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleExportData}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Workspace Data</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset all workspace data back to fresh Alex Morgan demo state?')) {
                  resetToDemoData();
                  setSavedMsg('Workspace reset to fresh demo data.');
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-rose-500 hover:bg-rose-500/10 text-xs font-semibold transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo State</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
