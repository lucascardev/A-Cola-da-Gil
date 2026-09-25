'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Printer, RotateCcw, ChevronDown, Check, Layers } from 'lucide-react';
import { PWAInstallButton } from './pwa-install-button';
import { CampaignConfig, getAllCampaigns } from '@/lib/campaigns';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const allCampaigns = getAllCampaigns();

  return (
    <header
      id="main-app-header"
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b shadow-xs px-4 sm:px-6 py-3.5 print:hidden transition-colors"
      style={{ borderBottomColor: campaign.colors.border }}
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Brand: Title + Slogan + Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
            title="Clique para ver outras colinhas de líderes"
          >
            <div
              className="w-10 h-10 rounded-2xl text-white flex items-center justify-center font-black shadow-md flex-shrink-0 transition-transform group-hover:scale-105"
              style={{
                backgroundColor: campaign.colors.primary,
                boxShadow: `0 4px 14px ${campaign.colors.primary}40`,
              }}
            >
              <Heart className="w-5 h-5 fill-white" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-slate-900 text-lg sm:text-xl tracking-tight leading-none block">
                  {campaign.title}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-transform" />
              </div>
              <span
                className="text-[11px] font-bold tracking-wide block uppercase"
                style={{ color: campaign.colors.primary }}
              >
                {campaign.slogan}
              </span>
            </div>
          </button>

          {/* Dropdown list of campaign leaders */}
          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsMenuOpen(false)}
              />
              <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 p-2 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-slate-100 flex items-center gap-1.5 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Colinhas Disponíveis</span>
                </div>
                <div className="py-1 space-y-1">
                  {allCampaigns.map((c) => {
                    const isCurrent = c.slug === campaign.slug;
                    return (
                      <Link
                        key={c.slug}
                        href={c.slug === 'coladagil' ? '/' : `/${c.slug}`}
                        onClick={() => setIsMenuOpen(false)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors ${
                          isCurrent
                            ? 'bg-slate-100 text-slate-900 font-bold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: c.colors.primary }}
                          />
                          <div>
                            <div className="text-sm font-black leading-tight">
                              {c.title}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {c.slogan}
                            </div>
                          </div>
                        </div>
                        {isCurrent && (
                          <Check
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: campaign.colors.primary }}
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right actions: Only Print Button + PWA install */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <PWAInstallButton />

          {isAnyModified && onResetAll && (
            <button
              onClick={onResetAll}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-all cursor-pointer"
              title="Restaurar números originais desta colinha"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restaurar Original</span>
            </button>
          )}

          <button
            id="btn-header-print"
            onClick={onPrint}
            className="inline-flex items-center gap-2 text-sm font-black text-white px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            style={{
              backgroundColor: campaign.colors.primary,
              boxShadow: `0 4px 14px ${campaign.colors.primary}40`,
            }}
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
