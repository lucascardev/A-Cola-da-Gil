'use client';

import React from 'react';
import { Candidate, CampaignConfig } from '@/lib/campaigns';
import { trackPrintClick } from '@/lib/analytics';
import { Printer, X, Scissors, Info } from 'lucide-react';

interface PrintableColaProps {
  candidates: Candidate[];
  isOpen: boolean;
  onClose: () => void;
  campaign: CampaignConfig;
}

export const PrintableCola: React.FC<PrintableColaProps> = ({
  candidates,
  isOpen,
  onClose,
  campaign,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    trackPrintClick('modal', campaign.slug, campaign.title);
    window.print();
  };

  // Sort by official voting machine order
  const sorted = [...candidates].sort((a, b) => a.order - b.order);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto print:p-0 print:static print:bg-white print:backdrop-blur-none">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto print:shadow-none print:border-none print:max-w-none">
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between bg-slate-900 text-white px-5 py-3.5 print:hidden">
          <div className="flex items-center gap-2">
            <Printer
              className="w-4 h-4"
              style={{ color: campaign.colors.primary }}
            />
            <h3 className="text-sm font-bold">Impressão da Colinha Eleitoral</h3>
          </div>
          <div className="flex items-center gap-3">
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

        {/* Informative notice on top (Hidden in Print) */}
        <div
          className="border-b p-3 text-xs text-slate-700 flex items-start gap-2.5 print:hidden"
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
            <strong>Regra Eleitoral do TSE:</strong> O uso de aparelho celular na cabina de votação é proibido pela Justiça Eleitoral. No entanto, a <strong>colinha em papel é 100% permitida e incentivada</strong>! Imprima e dobre no seu bolso.
          </p>
        </div>

        {/* THE PRINTABLE SHEET (Formats cleanly on paper) */}
        <div id="printable-area" className="p-6 sm:p-8 bg-white text-slate-900">
          {/* Printable Border / Pocket Cutout */}
          <div className="border-2 border-dashed border-slate-400 rounded-xl p-5 relative bg-white">
            {/* Cut indicator */}
            <div className="absolute -top-3 left-6 bg-white px-2 flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <Scissors className="w-3 h-3" />
              <span>Dobre ou recorte aqui (Tamanho de Bolso)</span>
            </div>

            {/* Header */}
            <div className="text-center pb-4 mb-4 border-b-2 border-slate-900">
              <div className="inline-block px-3 py-0.5 rounded-full bg-slate-900 text-white text-[11px] font-black uppercase tracking-wider mb-1">
                Colinha Eleitoral Oficial
              </div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
                {campaign.title}
              </h2>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                {campaign.slogan}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Consulte a ordem correta para digitar na urna eletrônica
              </p>
            </div>

            {/* Table of Candidates */}
            <div className="space-y-2.5">
              {sorted.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-2.5 rounded-lg border ${
                    item.isMainHighlight
                      ? 'border-2 border-slate-900 bg-slate-50'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-black flex items-center justify-center flex-shrink-0">
                      {item.order}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-600 uppercase">
                        {item.role}
                      </div>
                      <div className="text-sm font-black text-slate-900">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {item.party}
                      </div>
                    </div>
                  </div>

                  {/* Big bold number */}
                  <div className="text-right flex-shrink-0">
                    <span className="inline-block px-3 py-1 bg-slate-900 text-white font-black text-lg sm:text-xl tracking-widest rounded-md">
                      {item.number}
                    </span>
                    {item.isMainHighlight && (
                      <div className="text-[9px] font-black text-slate-800 uppercase tracking-tight mt-0.5">
                        ★ Destaque Principal
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer on Colinha */}
            <div className="mt-4 pt-3 border-t border-slate-300 flex items-center justify-between text-[10px] text-slate-500">
              <span>{campaign.footerNote || `${campaign.title} • ${campaign.slogan}`}</span>
              <span>Eleições 2026</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Close (Hidden in print) */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex justify-end gap-3 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Fechar
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white rounded-lg shadow-sm transition-colors cursor-pointer"
            style={{ backgroundColor: campaign.colors.primary }}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / Salvar em PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
