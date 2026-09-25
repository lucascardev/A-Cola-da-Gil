'use client';

import React, { useState } from 'react';
import { CampaignConfig, Candidate } from '@/lib/campaign-types';
import { useCampaignCandidates } from '@/lib/local-storage-store';
import { HeaderNav } from '@/components/header-nav';
import { CandidateCard } from '@/components/candidate-card';
import { PrintableCola } from '@/components/printable-cola';
import { OfflineIndicator } from '@/components/offline-indicator';
import { trackPrintClick } from '@/lib/analytics';
import { Printer, Heart, RotateCcw, ShieldCheck } from 'lucide-react';

interface ColaPageViewProps {
  campaign: CampaignConfig;
}

export const ColaPageView: React.FC<ColaPageViewProps> = ({ campaign }) => {
  const [candidates, setCandidates, resetCandidates] = useCampaignCandidates(campaign);
  const [isPrintOpen, setIsPrintOpen] = useState(false);

  const handleOpenPrint = (
    source: 'topo' | 'cabecalho' | 'rodape' | 'mobile_flutuante'
  ) => {
    trackPrintClick(source, campaign.slug, campaign.title);
    setIsPrintOpen(true);
  };

  // Save changes to store
  const saveCandidates = (newList: Candidate[]) => {
    setCandidates(newList);
  };

  // Update candidate by ID
  const handleUpdateCandidate = (id: string, updated: Partial<Candidate>) => {
    const updatedList = candidates.map((c) =>
      c.id === id ? { ...c, ...updated } : c
    );
    saveCandidates(updatedList);
  };

  // Reset single candidate to campaign original
  const handleResetOne = (id: string) => {
    const original = campaign.candidates.find((c) => c.id === id);
    if (!original) return;
    const updatedList = candidates.map((c) =>
      c.id === id ? { ...original } : c
    );
    saveCandidates(updatedList);
  };

  // Reset all candidates to campaign originals
  const handleResetAll = () => {
    if (
      window.confirm(
        `Deseja restaurar todos os números originais indicados para ${campaign.title}?`
      )
    ) {
      resetCandidates();
    }
  };

  // Check if any candidate differs from default
  const isAnyModified = candidates.some((c) => {
    const original = campaign.candidates.find((orig) => orig.id === c.id);
    return original
      ? original.number !== c.number || original.name !== c.name
      : false;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-20 sm:pb-12 print:min-h-0 print:bg-white print:p-0 print:m-0 print:pb-0">
      {/* Offline Status Indicator */}
      <div className="print:hidden">
        <OfflineIndicator />
      </div>

      {/* Main App Navigation */}
      <HeaderNav
        campaign={campaign}
        onPrint={() => handleOpenPrint('cabecalho')}
        onResetAll={handleResetAll}
        isAnyModified={isAnyModified}
      />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6 print:hidden">
        {/* Simple & Focused Top Banner */}
        <section
          className="bg-white rounded-3xl border shadow-xs p-5 sm:p-7 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-5 transition-all"
          style={{ borderColor: campaign.colors.border }}
        >
          <div className="space-y-1.5">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border"
              style={{
                backgroundColor: campaign.colors.lightBg,
                color: campaign.colors.primary,
                borderColor: campaign.colors.border,
              }}
            >
              <Heart
                className="w-3.5 h-3.5"
                style={{
                  fill: campaign.colors.primary,
                  color: campaign.colors.primary,
                }}
              />
              <span>{campaign.badge || campaign.slogan}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {campaign.title}
            </h1>
            <p className="text-sm font-medium text-slate-600 max-w-lg">
              {campaign.description}
            </p>
          </div>

          <button
            id="btn-main-print"
            onClick={() => handleOpenPrint('topo')}
            className="inline-flex items-center gap-2.5 text-white px-6 py-3.5 rounded-2xl text-base font-black shadow-lg transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            style={{
              backgroundColor: campaign.colors.primary,
              boxShadow: `0 8px 24px ${campaign.colors.primary}35`,
            }}
          >
            <Printer className="w-5 h-5" />
            <span>Imprimir Colinha</span>
          </button>
        </section>

        {/* Section Title & Quick Reset if customized */}
        <div className="flex items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">
              Números na Ordem da Urna
            </h2>
            {campaign.showPresident && (
              <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-slate-600" />
                Com Presidente
              </span>
            )}
          </div>

          {isAnyModified && (
            <button
              onClick={handleResetAll}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Padrão</span>
            </button>
          )}
        </div>

        {/* Candidate Numbers List */}
        <div className="space-y-3">
          {candidates.map((candidate) => {
            const original = campaign.candidates.find(
              (c) => c.id === candidate.id
            );
            const isModified =
              original !== undefined &&
              (original.number !== candidate.number ||
                original.name !== candidate.name);

            return (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                colors={campaign.colors}
                campaignTitle={campaign.title}
                isModified={isModified}
                onUpdate={(updated) =>
                  handleUpdateCandidate(candidate.id, updated)
                }
                onResetOne={() => handleResetOne(candidate.id)}
              />
            );
          })}
        </div>

        {/* Big Bottom Print Button */}
        <div className="pt-4 text-center">
          <button
            id="btn-bottom-print"
            onClick={() => handleOpenPrint('rodape')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 text-white px-8 py-4 rounded-2xl text-base sm:text-lg font-black shadow-xl transition-all active:scale-95 cursor-pointer"
            style={{
              backgroundColor: campaign.colors.primary,
              boxShadow: `0 8px 30px ${campaign.colors.primary}40`,
            }}
          >
            <Printer className="w-6 h-6" />
            <span>Imprimir Minha Colinha</span>
          </button>
        </div>
      </main>

      {/* Floating Bottom Bar on Mobile for Instant Print Access */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 sm:hidden shadow-lg print:hidden flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <Heart
            className="w-4 h-4 flex-shrink-0"
            style={{
              color: campaign.colors.primary,
              fill: campaign.colors.primary,
            }}
          />
          <span className="text-sm font-black text-slate-900 truncate">
            {campaign.title}
          </span>
        </div>

        <button
          id="btn-mobile-float-print"
          onClick={() => handleOpenPrint('mobile_flutuante')}
          className="inline-flex items-center gap-2 text-xs font-black text-white px-4 py-2.5 rounded-xl shadow-xs cursor-pointer flex-shrink-0"
          style={{ backgroundColor: campaign.colors.primary }}
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir</span>
        </button>
      </div>

      {/* Printable Colinha Modal */}
      <PrintableCola
        candidates={candidates}
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
        campaign={campaign}
      />
    </div>
  );
};
