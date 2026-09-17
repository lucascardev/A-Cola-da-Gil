'use client';

import React from 'react';
import { AlertTriangle, Printer, Clock, ShieldCheck, RefreshCw } from 'lucide-react';
import { Candidate, OFFICIAL_ELECTION_DATE } from '@/lib/elections-data';

interface BlackoutScreenProps {
  candidates: Candidate[];
  onOpenPrint: () => void;
  onToggleSimulatedBlackout?: () => void;
  isSimulated?: boolean;
  electionDateStr?: string;
}

export const BlackoutScreen: React.FC<BlackoutScreenProps> = ({
  candidates,
  onOpenPrint,
  onToggleSimulatedBlackout,
  isSimulated = false,
  electionDateStr = OFFICIAL_ELECTION_DATE,
}) => {
  const formattedElectionDate = (() => {
    try {
      return new Date(electionDateStr).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return electionDateStr;
    }
  })();

  return (
    <div
      id="screen-electoral-blackout"
      className="min-h-[80vh] flex items-center justify-center p-4"
    >
      <div className="w-full max-w-xl rounded-3xl bg-white border-2 border-amber-300 shadow-2xl p-6 sm:p-8 text-center space-y-6">
        {/* Warning Icon Badge */}
        <div className="mx-auto w-20 h-20 rounded-3xl bg-amber-500/10 border-2 border-amber-400 flex items-center justify-center text-amber-600 shadow-inner">
          <AlertTriangle className="w-10 h-10 animate-bounce" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-black uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Período de Silêncio Eleitoral (48h Antes)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Página Temporariamente Fora do Ar
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            Em respeito à legislação eleitoral brasileira que veda propaganda e atos de campanha nas <strong>48 horas que antecedem a eleição</strong> (data prevista: {formattedElectionDate}), a exibição online está suspensa.
          </p>
        </div>

        {/* Important notice box */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Como votar na cabine eletrônica?</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            O Tribunal Superior Eleitoral (TSE) <strong>proíbe o uso de aparelhos celulares ou câmeras na cabina de votação</strong>. A única forma permitida para consulta no momento do voto é a <strong>colinha impressa em papel</strong>.
          </p>
        </div>

        {/* Action button: Print saved cola */}
        <div className="space-y-3 pt-2">
          <button
            id="btn-blackout-print"
            onClick={onOpenPrint}
            className="w-full inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#ff28b4] hover:bg-[#e01f9c] text-white py-3.5 px-6 font-extrabold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all active:scale-95 cursor-pointer"
          >
            <Printer className="w-5 h-5" />
            <span>Imprimir Minha Colinha Salva para Levar à Urna</span>
          </button>

          <p className="text-[11px] text-slate-400">
            A Cola da Gil • A força da mulher • Cibele de Teobaldo 4478
          </p>
        </div>

        {/* Developer / Reviewer simulation toggle */}
        <div className="pt-4 border-t border-slate-200">
          <button
            id="btn-toggle-blackout-simulation"
            onClick={onToggleSimulatedBlackout}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>
              {isSimulated
                ? 'Desativar modo de teste (Voltar para o app normal)'
                : 'Testar / Simular tela de 2 dias antes da eleição'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
