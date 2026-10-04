import React, { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const OfflineBadge: React.FC = () => {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const { setOfflineStatus } = useAppStore();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setOfflineStatus(false);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setOfflineStatus(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOfflineStatus]);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/90 text-white backdrop-blur-md text-xs font-semibold shadow-lg shadow-amber-500/20 animate-pulse">
      <WifiOff className="w-3.5 h-3.5" />
      <span>Offline Mode • Cached Workspace Ready</span>
    </div>
  );
};
