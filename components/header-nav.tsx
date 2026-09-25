'use client';

import React from 'react';
import { Heart, RotateCcw } from 'lucide-react';
import { PWAInstallButton } from './pwa-install-button';
import { CampaignConfig } from '@/lib/campaign-types';

interface HeaderNavProps {
  onPrint: () => void;
  onResetAll?: () => void;
  isAnyModified?: boolean;
  campaign: CampaignConfig;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onPrint,
  onResetAll,
  isAnyModified,
  campaign,
}) => {
  return (
    <header
      id="main-app-header"
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b shadow-xs px-4 sm:px-6 py-3.5 print:hidden transition-colors"
      style={{ borderBottomColor: campaign.colors.border }}
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Brand: Title + Slogan (100% individual - sem dropdown nem menu de outros líderes) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div
            className="w-10 h-10 rounded-2xl text-white flex items-center justify-center font-black shadow-md flex-shrink-0"
            style={{
              backgroundColor: campaign.colors.primary,
              boxShadow: `0 4px 14px ${campaign.colors.primary}40`,
            }}
          >
            <Heart className="w-5 h-5 fill-white" />
          </div>

          <div>
            <span className="font-black text-slate-900 text-lg sm:text-xl tracking-tight leading-none block">
              {campaign.title}
            </span>
            <span
              className="text-[11px] font-bold tracking-wide block uppercase mt-0.5"
              style={{ color: campaign.colors.primary }}
            >
              {campaign.slogan}
            </span>
          </div>
        </div>

        {/* Right actions: Neutral Install App + Reset + Print */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <PWAInstallButton />

          {isAnyModified && onResetAll && (
            <button
              onClick={onResetAll}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-all cursor-pointer"
              title="Restaurar números originais desta colinha"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restaurar</span>
            </button>
          )}

          <button
            id="btn-header-print"
            onClick={onPrint}
            className="inline-flex items-center gap-2 text-sm font-black text-white px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            style={{
              backgroundColor: campaign.colors.primary,
              boxShadow: `0 4px 14px ${campaign.colors.primary}35`,
            }}
          >
            <span>Imprimir</span>
          </button>
        </div>
      </div>
    </header>
  );
};
