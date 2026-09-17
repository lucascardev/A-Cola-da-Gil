'use client';

import React from 'react';
import { Heart, Printer, RotateCcw } from 'lucide-react';
import { PWAInstallButton } from './pwa-install-button';

interface HeaderNavProps {
  onPrint: () => void;
  onResetAll?: () => void;
  isAnyModified?: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onPrint,
  onResetAll,
  isAnyModified,
}) => {
  return (
    <header
      id="main-app-header"
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-xs px-4 sm:px-6 py-3.5 print:hidden"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Brand: A cola da Gil */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#ff28b4] text-white flex items-center justify-center font-black shadow-md shadow-pink-500/20 flex-shrink-0">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <span className="font-black text-slate-900 text-lg sm:text-xl tracking-tight leading-none block">
              A cola da Gil
            </span>
            <span className="text-[11px] font-bold text-[#ff28b4] tracking-wide block uppercase">
              A força da mulher
            </span>
          </div>
        </div>

        {/* Right actions: Only Print Button + PWA install */}
        <div className="flex items-center gap-2.5">
          <PWAInstallButton />

          {isAnyModified && onResetAll && (
            <button
              onClick={onResetAll}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-all cursor-pointer"
              title="Restaurar números originais da Gil"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restaurar Original</span>
            </button>
          )}

          <button
            id="btn-header-print"
            onClick={onPrint}
            className="inline-flex items-center gap-2 text-sm font-black text-white bg-[#ff28b4] hover:bg-[#e01f9c] px-4 py-2.5 rounded-xl shadow-md shadow-pink-500/20 transition-all active:scale-95 cursor-pointer"
            title="Imprimir colinha para levar à cabine de votação"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Colinha</span>
          </button>
        </div>
      </div>
    </header>
  );
};
