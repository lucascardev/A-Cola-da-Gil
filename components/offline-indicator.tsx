'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { useIsMounted } from '@/hooks/use-is-mounted';

function subscribeOnline(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getOnlineSnapshot(): boolean {
  return typeof navigator !== 'undefined' ? navigator.onLine : true;
}

function getOnlineServerSnapshot(): boolean {
  return true;
}

export const OfflineIndicator: React.FC = () => {
  const isMounted = useIsMounted();
  const isOnline = useSyncExternalStore(
    subscribeOnline,
    getOnlineSnapshot,
    getOnlineServerSnapshot
  );
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setShowReconnected(true);
      const timer = setTimeout(() => setShowReconnected(false), 3500);
      return () => clearTimeout(timer);
    };

    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!isMounted) return null;

  if (showReconnected) {
    return (
      <aside
        id="banner-reconnected"
        aria-live="polite"
        className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300 print:hidden"
      >
        <Wifi className="w-4 h-4 text-emerald-200" />
        <span>Conexão restabelecida! Atualizado.</span>
      </aside>
    );
  }

  if (isOnline) return null;

  return (
    <aside
      id="banner-offline"
      aria-live="polite"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-xl bg-slate-900/90 text-white backdrop-blur-md px-4 py-2 text-xs font-semibold shadow-xl border border-pink-500/30 print:hidden animate-pulse"
    >
      <div className="w-2.5 h-2.5 rounded-full bg-[#ff28b4] animate-ping" />
      <WifiOff className="w-4 h-4 text-[#ff28b4]" />
      <span>Modo Offline Ativo — Consulta rápida salva no aparelho</span>
    </aside>
  );
};
