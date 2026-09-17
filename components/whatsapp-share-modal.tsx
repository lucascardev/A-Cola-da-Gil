'use client';

import React, { useState } from 'react';
import { Candidate } from '@/lib/elections-data';
import { Share2, Copy, Check, X, MessageCircle } from 'lucide-react';

interface WhatsAppShareModalProps {
  candidates: Candidate[];
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppShareModal: React.FC<WhatsAppShareModalProps> = ({
  candidates,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sorted = [...candidates].sort((a, b) => a.order - b.order);

  const shareText = `🗳️ *A COLA DA GIL - A FORÇA DA MULHER* 🗳️

Anote os números para votar na urna eletrônica:

` +
    sorted
      .map((c) => {
        const highlight = c.isMainHighlight ? ' ★ (Destaque da Gil)' : '';
        return `• *${c.role}*: ${c.number} - ${c.name}${highlight}`;
      })
      .join('\n') +
    `\n\n📌 *Dica Eleitoral:* O TSE permite e recomenda levar a colinha anotada em papel para a cabina de votação!`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-pink-100 p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#ff28b4]" />
            <h3 className="text-base font-bold text-slate-900">Compartilhar Colinha</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Text preview box */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs font-mono text-slate-800 whitespace-pre-line max-h-56 overflow-y-auto leading-relaxed">
          {shareText}
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 px-4 text-xs font-bold transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Copiado com Sucesso!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-600" />
                <span>Copiar Mensagem</span>
              </>
            )}
          </button>

          <button
            onClick={handleWhatsApp}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-4 text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Enviar no WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
