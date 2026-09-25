// Utilitário de rastreamento de eventos com Google Analytics 4 (gtag.js)

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Registra o clique no botão de imprimir a colinha no Google Analytics
 */
export function trackPrintClick(
  source: 'topo' | 'cabecalho' | 'rodape' | 'mobile_flutuante' | 'modal',
  campaignSlug: string = 'coladagil',
  campaignTitle: string = 'A Cola da Gil'
) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'imprimir_colinha_click', {
        event_category: 'Engajamento',
        event_label: 'Botão Imprimir Minha Colinha',
        origem: source,
        campaign_slug: campaignSlug,
        campaign_title: campaignTitle,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (e) {
    console.debug('Erro ao enviar evento para o Google Analytics:', e);
  }
}
