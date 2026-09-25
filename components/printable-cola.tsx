'use client';

import React from 'react';
import { Candidate, CampaignConfig } from '@/lib/campaign-types';
import { trackPrintClick } from '@/lib/analytics';
import { Printer, X, Scissors, Info } from 'lucide-react';

interface PrintableColaProps {
  candidates: Candidate[];
  isOpen: boolean;
  onClose: () => void;
  campaign: CampaignConfig;
}

/**
 * Cartão da Colinha de Bolso (modelo oficial com linha tracejada para recorte)
 */
const ColinhaPocketCard: React.FC<{
  candidates: Candidate[];
  campaign: CampaignConfig;
  isPrintVersion?: boolean;
}> = ({ candidates, campaign, isPrintVersion = false }) => {
  const sorted = [...candidates].sort((a, b) => a.order - b.order);

  return (
    <div
      className={`border-2 border-dashed rounded-xl relative bg-white print-avoid-break ${
        isPrintVersion
          ? 'border-slate-800 text-black max-w-[400px] mx-auto p-4'
          : 'border-slate-400 text-slate-900 p-5'
      }`}
    >
      {/* Cut indicator */}
      <div className="absolute -top-3 left-5 bg-white px-2 flex items-center gap-1 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
        <Scissors className="w-3.5 h-3.5 text-slate-800" />
        <span>Dobre ou recorte aqui (Tamanho de Bolso)</span>
      </div>

      {/* Header */}
      <div className="text-center pb-3 mb-3 border-b-2 border-slate-900">
        <div className="inline-block px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider mb-1">
          Colinha Eleitoral Oficial
        </div>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 uppercase">
          {campaign.title}
        </h2>
        <p className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">
          {campaign.slogan}
        </p>
        <p className="text-[9px] text-slate-500 mt-0.5">
          Consulte a ordem correta para digitar na urna eletrônica
        </p>
      </div>

      {/* Table of Candidates */}
      <div className="space-y-2">
        {sorted.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between p-2 rounded-lg border ${
              item.isMainHighlight
                ? 'border-2 border-slate-900 bg-slate-50'
                : 'border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center flex-shrink-0">
                {item.order}
              </span>
              <div>
                <div className="text-[10px] font-bold text-slate-600 uppercase leading-tight">
                  {item.role}
                </div>
                <div className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                  {item.name}
                </div>
                <div className="text-[9px] text-slate-500 leading-tight">
                  {item.party}
                </div>
              </div>
            </div>

            {/* Big bold number */}
            <div className="text-right flex-shrink-0 pl-2">
              <span className="inline-block px-2.5 py-1 bg-slate-900 text-white font-black text-base sm:text-lg tracking-widest rounded-md">
                {item.number}
              </span>
              {item.isMainHighlight && (
                <div className="text-[8px] font-black text-slate-900 uppercase tracking-tight mt-0.5">
                  ★ Destaque
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer on Colinha */}
      <div className="mt-3 pt-2.5 border-t border-slate-300 flex items-center justify-between text-[9px] text-slate-500">
        <span className="truncate max-w-[270px]">
          {campaign.footerNote || `${campaign.title} • ${campaign.slogan}`}
        </span>
        <span className="font-semibold flex-shrink-0">Eleições 2026</span>
      </div>
    </div>
  );
};

export const PrintableCola: React.FC<PrintableColaProps> = ({
  candidates,
  isOpen,
  onClose,
  campaign,
}) => {
  const handlePrint = () => {
    trackPrintClick('modal', campaign.slug, campaign.title);
    window.print();
  };

  return (
    <>
      {/* 
        ESTRUTURA EXCLUSIVA DE IMPRESSÃO:
        - Oculta em tela normal (hidden)
        - Única coisa visível ao mandar imprimir (print:block)
        - Ocupa EXATAMENTE 1 página de papel, centralizada no topo e com tamanho de bolso
      */}
      <div
        id="printable-sheet-root"
        className="hidden print:block w-full max-w-[400px] mx-auto p-0 m-0 pt-4 print-avoid-break"
      >
        <ColinhaPocketCard
          candidates={candidates}
          campaign={campaign}
          isPrintVersion={true}
        />
      </div>

      {/* MODAL EM TELA (Visualização e Confirmação - 100% oculto na impressão) */}
      {isOpen && (
        <div
          id="modal-print-preview"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto print:hidden"
        >
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between bg-slate-900 text-white px-5 py-3.5">
              <div className="flex items-center gap-2">
                <Printer
                  className="w-4 h-4"
                  style={{ color: campaign.colors.primary }}
                />
                <h3 className="text-sm font-bold">Impressão da Colinha Eleitoral</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  style={{ backgroundColor: campaign.colors.primary }}
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir Agora</span>
                </button>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-white p-1 rounded-md"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Informative notice on top */}
            <div
              className="border-b p-3 text-xs text-slate-700 flex items-start gap-2.5"
              style={{
                backgroundColor: campaign.colors.lightBg,
                borderBottomColor: campaign.colors.border,
              }}
            >
              <Info
                className="w-4 h-4 flex-shrink-0 mt-0.5"
                style={{ color: campaign.colors.primary }}
              />
              <p>
                <strong>Regra do TSE:</strong> Celulares são proibidos na cabina de votação, mas a <strong>colinha em papel é 100% permitida e recomendada</strong>! Imprima e dobre no seu bolso.
              </p>
            </div>

            {/* Screen Preview */}
            <div className="p-6 sm:p-8 bg-slate-50">
              <ColinhaPocketCard
                candidates={candidates}
                campaign={campaign}
                isPrintVersion={false}
              />
            </div>

            {/* Modal Bottom Actions */}
            <div className="bg-white px-5 py-3.5 border-t border-slate-200 flex justify-end items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Fechar
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                style={{ backgroundColor: campaign.colors.primary }}
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir / Salvar em PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
