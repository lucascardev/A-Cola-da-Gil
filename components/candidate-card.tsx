'use client';

import React, { useState } from 'react';
import { Candidate } from '@/lib/elections-data';
import { Edit3, Check, RotateCcw, AlertCircle, Star } from 'lucide-react';

interface CandidateCardProps {
  candidate: Candidate;
  isModified: boolean;
  onUpdate: (updated: Partial<Candidate>) => void;
  onResetOne: () => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  isModified,
  onUpdate,
  onResetOne,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editNumber, setEditNumber] = useState(candidate.number);
  const [editName, setEditName] = useState(candidate.name);
  const [editParty, setEditParty] = useState(candidate.party);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSave = () => {
    const cleanNumber = editNumber.replace(/\D/g, '');
    if (!cleanNumber) {
      setErrorMsg('Informe o número do candidato.');
      return;
    }
    if (cleanNumber.length !== candidate.digits) {
      setErrorMsg(`O número deve ter exatamente ${candidate.digits} dígitos.`);
      return;
    }

    onUpdate({
      number: cleanNumber,
      name: editName.trim() || `Candidato ${cleanNumber}`,
      party: editParty.trim() || 'Partido',
    });
    setErrorMsg('');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditNumber(candidate.number);
    setEditName(candidate.name);
    setEditParty(candidate.party);
    setErrorMsg('');
    setIsEditing(false);
  };

  const numberDigits = candidate.number.padEnd(candidate.digits, ' ').split('');

  return (
    <div
      id={`card-${candidate.id}`}
      className={`rounded-2xl transition-all ${
        candidate.isMainHighlight
          ? 'bg-pink-50/50 border-2 border-[#ff28b4] shadow-md shadow-pink-500/10'
          : 'bg-white border border-slate-200 shadow-xs'
      } p-4 sm:p-5`}
    >
      {!isEditing ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Candidate Info (Cargo e Nome) */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black tracking-wider uppercase text-slate-500">
                {candidate.role}
              </span>
              {candidate.isMainHighlight && (
                <span className="inline-flex items-center gap-1 text-[11px] font-black bg-[#ff28b4] text-white px-2 py-0.5 rounded-full">
                  <Star className="w-3 h-3 fill-white" />
                  <span>Destaque da Gil</span>
                </span>
              )}
              {isModified && (
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                  Personalizado
                </span>
              )}
            </div>

            <div className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              {candidate.name}
            </div>

            <div className="text-xs font-semibold text-slate-400">
              {candidate.party}
            </div>
          </div>

          {/* Large Urna Digits & Quick Actions */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {numberDigits.map((d, index) => (
                <div
                  key={index}
                  className={`w-11 h-14 sm:w-12 sm:h-16 rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-black shadow-sm border-2 ${
                    candidate.isMainHighlight
                      ? 'bg-[#ff28b4] text-white border-[#ff28b4]'
                      : 'bg-slate-900 text-white border-slate-900'
                  }`}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Subtle Edit / Reset Button */}
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => setIsEditing(true)}
                className="text-slate-400 hover:text-[#ff28b4] p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                title="Editar número ou nome"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              {isModified && (
                <button
                  onClick={onResetOne}
                  className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Restaurar número original da Gil"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Simple Edit Form */
        <div className="space-y-3 bg-white p-3 rounded-xl border border-pink-200">
          <div className="text-xs font-bold text-slate-700">
            Modificar voto para {candidate.role}:
          </div>

          {errorMsg && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Número ({candidate.digits} dígitos)
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={candidate.digits}
                value={editNumber}
                onChange={(e) => setEditNumber(e.target.value.replace(/\D/g, ''))}
                className="w-full text-base font-black tracking-widest text-slate-900 bg-white border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-[#ff28b4]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Nome do Candidato
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-[#ff28b4]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Partido
              </label>
              <input
                type="text"
                value={editParty}
                onChange={(e) => setEditParty(e.target.value)}
                className="w-full text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-[#ff28b4]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={handleCancel}
              className="text-xs font-bold text-slate-600 hover:text-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#ff28b4] hover:bg-[#db1096] px-3.5 py-1.5 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Salvar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
