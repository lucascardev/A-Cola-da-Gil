'use client';

import React from 'react';
import { Candidate } from '@/lib/elections-data';
import { trackPrintClick } from '@/lib/analytics';
import { Printer, X, Scissors, Info } from 'lucide-react';

interface PrintableColaProps {
  candidates: Candidate[];
  isOpen: boolean;
  onClose: () => void;
}

export const PrintableCola: React.FC<PrintableColaProps> = ({
  candidates,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    trackPrintClick('modal');
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
            <Printer className="w-4 h-4 text-[#ff28b4]" />
            <h3 className="text-sm font-bold">Impressão da Colinha Eleitoral</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-[#ff28b4] hover:bg-[#e01f9c] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
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
        <div className="bg-pink-50 border-b border-pink-100 p-3 text-xs text-slate-700 flex items-start gap-2.5 print:hidden">
          <Info className="w-4 h-4 text-[#ff28b4] flex-shrink-0 mt-0.5" />
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
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                A COLA DA GIL
              </h2>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                A Força da Mulher
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
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-black flex items-center justify-center">
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
                  <div className="text-right">
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
              <span>A cola da Gil • A força da mulher</span>
              <span>Cibele 4478 • Dep. Federal</span>
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
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#ff28b4] hover:bg-[#e01f9c] rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / Salvar em PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
