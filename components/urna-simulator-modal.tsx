'use client';

import React, { useState } from 'react';
import { Candidate } from '@/lib/elections-data';
import { X, Check, Delete, Volume2, RefreshCw, Trophy } from 'lucide-react';

interface UrnaSimulatorModalProps {
  candidates: Candidate[];
  isOpen: boolean;
  onClose: () => void;
}

export const UrnaSimulatorModal: React.FC<UrnaSimulatorModalProps> = ({
  candidates,
  isOpen,
  onClose,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [enteredDigits, setEnteredDigits] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const sortedCandidates = [...candidates].sort((a, b) => a.order - b.order);
  const currentCandidate = sortedCandidates[currentStepIndex];

  // Play TSE Urna sound using Web Audio API
  const playUrnaBeep = (type: 'key' | 'confirma' | 'fim') => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'key') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'confirma') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(1050, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'fim') {
        // Classic "PI-LI-LI-LI" finish sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(550, ctx.currentTime);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.2);
        osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      }
    } catch {
      // Audio not supported or blocked
    }
  };

  const handleKeyPress = (digit: string) => {
    if (isFinished || !currentCandidate) return;
    if (enteredDigits.length < currentCandidate.digits) {
      const nextDigits = enteredDigits + digit;
      setEnteredDigits(nextDigits);
      playUrnaBeep('key');
    }
  };

  const handleCorrige = () => {
    setEnteredDigits('');
    playUrnaBeep('key');
  };

  const handleConfirma = () => {
    if (isFinished || !currentCandidate) return;

    if (currentStepIndex + 1 < sortedCandidates.length) {
      playUrnaBeep('confirma');
      setCurrentStepIndex(currentStepIndex + 1);
      setEnteredDigits('');
    } else {
      playUrnaBeep('fim');
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setEnteredDigits('');
    setIsFinished(false);
  };

  // Check if entered digits match candidate's number
  const isMatch = currentCandidate && enteredDigits === currentCandidate.number;
  const isComplete = currentCandidate && enteredDigits.length === currentCandidate.digits;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-2xl bg-slate-950 text-white rounded-3xl shadow-2xl border-4 border-slate-800 overflow-hidden my-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between bg-slate-900 px-5 py-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
            <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-200">
              Simulador da Urna Eletrônica (TSE)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isFinished && currentCandidate ? (
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Left Screen: Electronic Display */}
            <div className="md:col-span-7 bg-[#d9e2ec] text-slate-900 rounded-2xl p-4 sm:p-5 border-4 border-slate-400 shadow-inner flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Seu Voto Para:
                </div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
                  {currentCandidate.role}
                </div>
                <div className="text-xs font-semibold text-slate-500 mb-4">
                  Ordem de votação: {currentStepIndex + 1} de {sortedCandidates.length}
                </div>

                {/* Digit boxes */}
                <div className="flex items-center gap-2 my-4">
                  <span className="text-xs font-bold text-slate-700 mr-1">Número:</span>
                  {Array.from({ length: currentCandidate.digits }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-9 h-12 rounded-lg flex items-center justify-center text-2xl font-black border-2 ${
                        enteredDigits[i]
                          ? 'border-slate-800 bg-white text-slate-900 shadow-xs'
                          : i === enteredDigits.length
                          ? 'border-[#ff28b4] bg-pink-100/50 text-[#ff28b4] animate-pulse'
                          : 'border-slate-400 bg-slate-200/50 text-slate-400'
                      }`}
                    >
                      {enteredDigits[i] || ''}
                    </div>
                  ))}
                </div>

                {/* Candidate Info on Screen */}
                {isComplete && (
                  <div className="mt-3 p-2.5 rounded-xl bg-white border border-slate-300 animate-in fade-in duration-200">
                    {isMatch ? (
                      <div>
                        <div className="text-xs text-slate-500 font-semibold">Nome:</div>
                        <div className="text-base font-black text-slate-900">
                          {currentCandidate.name}
                        </div>
                        <div className="text-xs text-slate-600">
                          Partido: <strong>{currentCandidate.party}</strong>
                        </div>
                        {currentCandidate.isMainHighlight && (
                          <div className="text-[11px] font-black text-[#ff28b4] mt-1">
                            ★ Cibele de Teobaldo - A Força da Mulher
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-xs font-bold text-amber-700">
                        Voto em outro número (Diferente da indicação da Gil: {currentCandidate.number})
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom guide on display */}
              <div className="border-t border-slate-300 pt-2 mt-4 text-[10px] text-slate-600 flex justify-between items-center">
                <span>Aperte tecla:</span>
                <div className="flex gap-2">
                  <span className="font-bold text-amber-700">LARANJA para CORRIGIR</span>
                  <span className="font-bold text-emerald-800">VERDE para CONFIRMAR</span>
                </div>
              </div>
            </div>

            {/* Right Keypad */}
            <div className="md:col-span-5 bg-slate-900 rounded-2xl p-4 border border-slate-800 flex flex-col justify-between">
              {/* Numeric pad */}
              <div className="grid grid-cols-3 gap-2.5 max-w-[220px] mx-auto mb-4">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', ''].map((d, idx) => {
                  if (d === '') return <div key={idx} />;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleKeyPress(d)}
                      className="w-14 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xl shadow-md active:scale-95 transition-all border-b-4 border-slate-950 cursor-pointer"
                    >
                      {d}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons: BRANCO, CORRIGE, CONFIRMA */}
              <div className="grid grid-cols-3 gap-2 text-xs font-black">
                <button
                  onClick={() => {
                    setEnteredDigits('BRANCO');
                    playUrnaBeep('key');
                  }}
                  className="py-3 px-1 rounded-xl bg-slate-100 text-slate-900 hover:bg-white active:scale-95 border-b-4 border-slate-300 shadow-md cursor-pointer uppercase text-[10px]"
                >
                  Branco
                </button>
                <button
                  onClick={handleCorrige}
                  className="py-3 px-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-95 border-b-4 border-amber-700 shadow-md cursor-pointer uppercase text-[10px]"
                >
                  Corrige
                </button>
                <button
                  onClick={handleConfirma}
                  className="py-3 px-1 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 active:scale-95 border-b-4 border-emerald-700 shadow-md cursor-pointer uppercase text-[10px]"
                >
                  Confirma
                </button>
              </div>

              {/* Help tip */}
              <div className="mt-3 text-center text-[11px] text-pink-300 bg-pink-950/40 p-2 rounded-xl border border-pink-800/40">
                Cola da Gil: <strong>{currentCandidate.roleShort} = {currentCandidate.number}</strong>
              </div>
            </div>
          </div>
        ) : (
          /* Finished Screen ("FIM") */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="mx-auto w-24 h-24 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500 flex items-center justify-center">
              <Trophy className="w-12 h-12 animate-bounce" />
            </div>

            <div className="space-y-2">
              <div className="text-5xl sm:text-6xl font-black tracking-widest text-emerald-400">
                FIM
              </div>
              <p className="text-base text-slate-300 max-w-md mx-auto">
                Parabéns! Você concluiu a simulação completa de todos os cargos eleitorais com sucesso!
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 text-xs font-bold transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Simular Novamente</span>
              </button>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-xl bg-[#ff28b4] hover:bg-[#e01f9c] text-white px-5 py-2.5 text-xs font-black transition-all"
              >
                <span>Voltar para a Cola</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
