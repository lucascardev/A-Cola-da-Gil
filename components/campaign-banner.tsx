'use client';

import React from 'react';
import { Heart, Sparkles, Check, Vote, Printer, Share2 } from 'lucide-react';

interface CampaignBannerProps {
  onPrint: () => void;
  onShare: () => void;
  onOpenSimulator: () => void;
}

export const CampaignBanner: React.FC<CampaignBannerProps> = ({
  onPrint,
  onShare,
  onOpenSimulator,
}) => {
  return (
    <div
      id="campaign-hero-banner"
      className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#ff28b4] via-[#e61b9e] to-[#9b0d66] text-white shadow-xl shadow-pink-500/20 border border-pink-300/30 p-5 sm:p-7 md:p-8"
    >
      {/* Background decorative elements */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-pink-900/30 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left / Main text info */}
        <div className="flex-1 text-center lg:text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs sm:text-sm font-black uppercase tracking-wider text-pink-100 border border-white/25">
            <Heart className="w-3.5 h-3.5 text-white fill-white animate-pulse" />
            <span>A força da mulher</span>
            <Sparkles className="w-3.5 h-3.5 text-pink-200" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-xs">
            A Cola da Gil
          </h1>

          <p className="text-sm sm:text-base text-pink-50 max-w-xl leading-relaxed">
            Consulte os números de voto recomendados pela <strong className="text-white font-bold">Gil</strong> para Governador, Presidente, Senadores e Deputados, ou personalize com os seus candidatos favoritos.
          </p>

          {/* Destaque principal Cibele */}
          <div className="mt-2 inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 bg-white/15 backdrop-blur-sm p-2.5 sm:p-3 rounded-2xl border border-white/20">
            <span className="text-xs uppercase font-bold text-pink-100">
              Candidata de Destaque Principal:
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white text-slate-900 font-extrabold text-sm shadow-sm">
              <span className="text-[#ff28b4]">Cibele de Teobaldo</span>
              <span className="text-xs bg-[#ff28b4] text-white px-2 py-0.5 rounded-md font-black">
                4478
              </span>
            </span>
            <span className="text-xs text-pink-100 hidden sm:inline">Deputada Federal</span>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <button
              id="btn-hero-print"
              onClick={onPrint}
              className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-pink-50 text-[#ff28b4] px-4 py-2.5 text-sm font-black shadow-lg hover:shadow-xl transition-all active:scale-95 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#ff28b4]" />
              <span>Imprimir Colinha</span>
            </button>

            <button
              id="btn-hero-urna-sim"
              onClick={onOpenSimulator}
              className="inline-flex items-center gap-2 rounded-xl bg-pink-900/40 hover:bg-pink-900/60 text-white border border-white/30 px-4 py-2.5 text-sm font-bold backdrop-blur-xs transition-all active:scale-95 cursor-pointer"
            >
              <Vote className="w-4 h-4 text-pink-200" />
              <span>Treinar na Urna</span>
            </button>

            <button
              id="btn-hero-share"
              onClick={onShare}
              className="inline-flex items-center gap-2 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 px-3.5 py-2.5 text-sm font-semibold transition-all active:scale-95 cursor-pointer"
              title="Compartilhar no WhatsApp"
            >
              <Share2 className="w-4 h-4 text-white" />
              <span>Compartilhar</span>
            </button>
          </div>
        </div>

        {/* Right side: Visual representation of Gil & Cibele Campaign Banner */}
        <div className="w-full max-w-xs sm:max-w-sm flex-shrink-0">
          <div className="relative rounded-2xl bg-white p-4 text-slate-900 shadow-2xl border-4 border-white/40">
            {/* Top header badge */}
            <div className="flex items-center justify-between border-b border-pink-100 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff28b4]" />
                <span className="text-xs font-black text-slate-800 tracking-wider uppercase">
                  Campanha Oficial
                </span>
              </div>
              <span className="text-[11px] font-bold text-[#ff28b4] bg-pink-50 px-2 py-0.5 rounded-full">
                Bahia
              </span>
            </div>

            {/* Visual illustration of Gil & Cibele */}
            <div className="relative overflow-hidden rounded-xl bg-linear-to-b from-pink-500 to-rose-700 p-4 text-white text-center mb-3">
              <div className="absolute inset-0 bg-radial from-pink-400/30 to-transparent pointer-events-none" />
              
              {/* Graphic badges representation */}
              <div className="relative z-10 flex items-center justify-center gap-3 py-2">
                {/* Gil badge */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-pink-100 border-2 border-white flex items-center justify-center text-[#ff28b4] shadow-md relative">
                    <span className="text-2xl font-black">GIL</span>
                    <span className="absolute -bottom-1 bg-[#ff28b4] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                      Rosa
                    </span>
                  </div>
                  <span className="text-xs font-bold text-white mt-1">Gil</span>
                  <span className="text-[10px] text-pink-200">Liderança</span>
                </div>

                <div className="text-white text-xl font-bold">♥</div>

                {/* Cibele badge */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-orange-400 flex items-center justify-center text-slate-900 shadow-md relative">
                    <span className="text-xs font-black text-center leading-tight">Cibele<br/><span className="text-orange-600">4478</span></span>
                  </div>
                  <span className="text-xs font-bold text-white mt-1">Cibele</span>
                  <span className="text-[10px] text-orange-200">Federal</span>
                </div>
              </div>

              <p className="text-[11px] font-medium text-pink-100 mt-1 italic">
                &ldquo;Gil e Cibele juntas com a força da mulher!&rdquo;
              </p>
            </div>

            {/* Quick summary strip */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Gov. 44</span>
                <strong className="text-slate-800 text-xs">ACM Neto</strong>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Estadual 44000</span>
                <strong className="text-slate-800 text-xs">Pedro Tavares</strong>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Senadores</span>
                <strong className="text-slate-800 text-xs">100 & 222</strong>
              </div>
              <div className="bg-pink-50 p-2 rounded-lg border border-pink-200">
                <span className="text-[10px] text-[#ff28b4] block uppercase font-bold">Presidente</span>
                <strong className="text-[#ff28b4] text-xs">22</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
