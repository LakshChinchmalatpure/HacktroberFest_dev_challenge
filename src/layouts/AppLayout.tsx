import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/common/Navbar';
import { Sidebar } from '@/components/common/Sidebar';
import { GlobalSearch } from '@/components/common/GlobalSearch';
import { AIChatDrawer } from '@/components/ai/AIChatDrawer';
import { AchievementCelebrationModal } from '@/components/common/AchievementCelebrationModal';

export const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top sticky Navbar */}
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex">
        {/* Left Navigation Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content Area */}
        <main className="flex-1 md:ml-64 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] max-w-7xl mx-auto w-full transition-all">
          <Outlet />
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <GlobalSearch />
      <AIChatDrawer />
      <AchievementCelebrationModal />
    </div>
  );
};
