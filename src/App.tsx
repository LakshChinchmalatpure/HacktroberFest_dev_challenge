import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { registerServiceWorker } from '@/lib/pwa';

// Pages & Layouts
import { LandingPage } from '@/pages/LandingPage';
import { AuthPage } from '@/pages/AuthPage';
import { AppLayout } from '@/layouts/AppLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { FocusPage } from '@/pages/FocusPage';
import { FlashcardsPage } from '@/pages/FlashcardsPage';
import { QuizzesPage } from '@/pages/QuizzesPage';
import { SubjectWorkspacePage } from '@/pages/SubjectWorkspacePage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';
import { PlannerPage } from '@/pages/PlannerPage';
import { AchievementsPage } from '@/pages/AchievementsPage';
import { SettingsPage } from '@/pages/SettingsPage';

export function App() {
  const { user } = useAppStore();

  useEffect(() => {
    // Initialize theme class on mount
    if (user.preferences.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Register service worker for offline-first PWA
    registerServiceWorker();
  }, [user.preferences.theme]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected / Demo Workspace routes */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="focus" element={<FocusPage />} />
          <Route path="flashcards" element={<FlashcardsPage />} />
          <Route path="quizzes" element={<QuizzesPage />} />
          <Route path="subjects" element={<SubjectWorkspacePage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="planner" element={<PlannerPage />} />
          <Route path="achievements" element={<AchievementsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
