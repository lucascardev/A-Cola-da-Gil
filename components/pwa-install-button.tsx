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

  // If already running as an installed standalone PWA, show a discreet status badge in neutral tone
  if (isInstalled) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
        <span className="hidden sm:inline">App Instalado</span>
      </div>
    );
  }

  // Chromium / Android / Desktop flow (neutral slate styling)
  if (isInstallable) {
    return (
      <button
        id="btn-install-pwa"
        onClick={install}
        className="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
        title="Instalar aplicativo no celular ou computador"
      >
        <Download className="w-4 h-4 text-slate-200" />
        <span>Instalar App</span>
      </button>
    );
  }

  // iOS Safari flow (neutral slate styling)
  if (isIOS) {
    return (
      <>
        <button
          id="btn-install-ios"
          onClick={() => setShowIOSGuide(true)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 px-3 py-2 text-xs font-bold shadow-xs transition-all cursor-pointer"
          title="Como adicionar à tela de início no iPhone"
        >
          <Smartphone className="w-3.5 h-3.5 text-slate-600" />
          <span>Instalar App</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 relative">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-black">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Como instalar no iPhone</h3>
                  <p className="text-xs text-slate-500">Adicione à tela de início para usar offline</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <span>Toque no botão <strong>Compartilhar</strong> (ícone com quadrado e seta para cima) no Safari.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <span>Role para baixo e toque em <strong>&quot;Adicionar à Tela de Início&quot;</strong>.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <span>Confirme tocando em <strong>Adicionar</strong> no canto superior direito.</span>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-slate-900 py-2.5 text-sm font-bold text-white hover:bg-slate-800 transition-colors cursor-pointer"
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
