'use client';

import React, { useState } from 'react';
import { usePWAInstall } from '@/hooks/use-pwa-install';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { Download, Share2, X, Smartphone, CheckCircle } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const isMounted = useIsMounted();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (!isMounted) return null;

  // If already running as an installed standalone PWA, show a discreet status badge
  if (isInstalled) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-[#ff28b4] border border-pink-200">
        <CheckCircle className="w-3.5 h-3.5 text-[#ff28b4]" />
        <span>App Instalado</span>
      </div>
    );
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        id="btn-install-pwa"
        onClick={install}
        className="inline-flex items-center gap-2 rounded-xl bg-[#ff28b4] hover:bg-[#e01f9c] text-white px-4 py-2.5 text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
        title="Instalar A Cola da Gil no seu celular ou computador"
      >
        <Download className="w-4 h-4" />
        <span>Instalar Aplicativo</span>
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported by WebKit)
  if (isIOS) {
    return (
      <>
        <button
          id="btn-install-ios"
          onClick={() => setShowIOSGuide(true)}
          className="inline-flex items-center gap-2 rounded-xl border-2 border-[#ff28b4] bg-white hover:bg-pink-50 text-[#ff28b4] px-3.5 py-2 text-xs font-bold shadow-sm transition-all cursor-pointer"
        >
          <Smartphone className="w-4 h-4 text-[#ff28b4]" />
          <span>Instalar no iPhone</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-pink-100 relative">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#ff28b4]/10 text-[#ff28b4] flex items-center justify-center font-black">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Como instalar no iPhone</h3>
                  <p className="text-xs text-slate-500">Adicione à tela de início para usar offline</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-700 bg-pink-50/50 p-4 rounded-xl border border-pink-100/60">
                <div className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ff28b4] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <span>Toque no botão <strong>Compartilhar</strong> (ícone do quadrado com a seta para cima) na barra do Safari.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ff28b4] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <span>Role as opções para baixo e toque em <strong>&quot;Adicionar à Tela de Início&quot;</strong>.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ff28b4] text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <span>Confirme tocando em <strong>Adicionar</strong> no canto superior direito.</span>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-[#ff28b4] py-2.5 text-sm font-bold text-white hover:bg-[#e01f9c] transition-colors"
              >
                Entendi
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback for browsers that don't support install prompts directly
  return null;
};
