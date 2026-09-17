'use client';

import React, { useState } from 'react';
import {
  Candidate,
  GIL_DEFAULT_CANDIDATES,
} from '@/lib/elections-data';
import { useCandidates } from '@/lib/local-storage-store';
import { HeaderNav } from '@/components/header-nav';
import { CandidateCard } from '@/components/candidate-card';
import { PrintableCola } from '@/components/printable-cola';
import { OfflineIndicator } from '@/components/offline-indicator';
import { trackPrintClick } from '@/lib/analytics';
import { Printer, Heart, RotateCcw } from 'lucide-react';

export default function HomePage() {
  const [candidates, setCandidates] = useCandidates();
  const [isPrintOpen, setIsPrintOpen] = useState(false);

  const handleOpenPrint = (source: 'topo' | 'cabecalho' | 'rodape' | 'mobile_flutuante') => {
    trackPrintClick(source);
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

  // Reset single candidate to Gil's original
  const handleResetOne = (id: string) => {
    const original = GIL_DEFAULT_CANDIDATES.find((c) => c.id === id);
    if (!original) return;
    const updatedList = candidates.map((c) => (c.id === id ? { ...original } : c));
    saveCandidates(updatedList);
  };

  // Reset all candidates to Gil's originals
  const handleResetAll = () => {
    if (
      window.confirm(
        'Deseja restaurar todos os números originais indicados pela Gil?'
      )
    ) {
      saveCandidates(GIL_DEFAULT_CANDIDATES);
    }
  };

  // Check if any candidate differs from default
  const isAnyModified = candidates.some((c) => {
    const original = GIL_DEFAULT_CANDIDATES.find((orig) => orig.id === c.id);
    return original ? original.number !== c.number || original.name !== c.name : false;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-20 sm:pb-12">
      {/* Offline Status Indicator */}
      <OfflineIndicator />

      {/* Main App Navigation */}
      <HeaderNav
        onPrint={() => handleOpenPrint('cabecalho')}
        onResetAll={handleResetAll}
        isAnyModified={isAnyModified}
      />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Simple & Focused Top Banner */}
        <section className="bg-white rounded-3xl border border-pink-100 shadow-sm p-5 sm:p-7 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-[#ff28b4] text-xs font-black uppercase tracking-wider border border-pink-100">
              <Heart className="w-3.5 h-3.5 fill-[#ff28b4]" />
              <span>A força da mulher</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              A Cola da Gil
            </h1>
            <p className="text-sm font-medium text-slate-600">
              Números para a urna eletrônica. Imprima sua colinha em papel para levar no dia do voto.
            </p>
          </div>

          <button
            id="btn-main-print"
            onClick={() => handleOpenPrint('topo')}
            className="inline-flex items-center gap-2.5 bg-[#ff28b4] hover:bg-[#e01f9c] text-white px-6 py-3.5 rounded-2xl text-base font-black shadow-lg shadow-pink-500/25 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Printer className="w-5 h-5" />
            <span>Imprimir Colinha</span>
          </button>
        </section>

        {/* Section Title & Quick Reset if customized */}
        <div className="flex items-center justify-between gap-2 px-1">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">
            Números na Ordem da Urna
          </h2>

          {isAnyModified && (
            <button
              onClick={handleResetAll}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar da Gil</span>
            </button>
          )}
        </div>

        {/* Candidate Numbers List */}
        <div className="space-y-3">
          {candidates.map((candidate) => {
            const original = GIL_DEFAULT_CANDIDATES.find(
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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#ff28b4] hover:bg-[#e01f9c] text-white px-8 py-4 rounded-2xl text-base sm:text-lg font-black shadow-xl shadow-pink-500/25 transition-all active:scale-95 cursor-pointer"
          >
            <Printer className="w-6 h-6" />
            <span>Imprimir Minha Colinha</span>
          </button>
        </div>
      </main>

      {/* Floating Bottom Bar on Mobile for Instant Print Access */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 sm:hidden shadow-lg print:hidden flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-[#ff28b4] fill-[#ff28b4]" />
          <span className="text-sm font-black text-slate-900">A cola da Gil</span>
        </div>

        <button
          id="btn-mobile-float-print"
          onClick={() => handleOpenPrint('mobile_flutuante')}
          className="inline-flex items-center gap-2 text-xs font-black text-white bg-[#ff28b4] hover:bg-[#e01f9c] px-4 py-2.5 rounded-xl shadow-sm cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir Colinha</span>
        </button>
      </div>

      {/* Printable Colinha Modal */}
      <PrintableCola
        candidates={candidates}
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
      />
    </div>
  );
}
