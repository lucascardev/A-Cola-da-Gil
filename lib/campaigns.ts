import coladagilRaw from '@/data/campaigns/coladagil.json';
import coladaandreiaRaw from '@/data/campaigns/coladaandreia.json';
import coladomarcosRaw from '@/data/campaigns/coladomarcos.json';

export interface Candidate {
  id: string;
  role: string;
  roleShort: string;
  order: number;
  digits: number;
  number: string;
  name: string;
  party: string;
  badge?: string;
  isMainHighlight?: boolean;
  notes?: string;
}

export interface CampaignTheme {
  primary: string;
  primaryHover: string;
  lightBg: string;
  border: string;
}

export interface CampaignConfig {
  slug: string;
  title: string;
  slogan: string;
  badge?: string;
  description: string;
  colors: CampaignTheme;
  showPresident: boolean;
  footerNote?: string;
  candidates: Candidate[];
}

/**
 * Normaliza e valida a configuração de uma campanha.
 * Aplica a regra de showPresident: se false, remove automaticamente o Presidente.
 */
function normalizeCampaign(raw: Record<string, unknown>): CampaignConfig {
  const showPresident = Boolean(raw.showPresident);
  const rawCandidates = Array.isArray(raw.candidates) ? (raw.candidates as Candidate[]) : [];

  const filteredCandidates = rawCandidates.filter((c) => {
    const isPresident =
      c.id === 'presidente' ||
      c.id === 'presidente-da-republica' ||
      c.role?.toLowerCase().includes('presidente');

    if (isPresident && !showPresident) {
      return false;
    }
    return true;
  });

  // Ordena pela ordem oficial da urna (order)
  filteredCandidates.sort((a, b) => a.order - b.order);

  const colors = (raw.colors as Partial<CampaignTheme>) || {};

  return {
    slug: String(raw.slug || 'coladagil').toLowerCase(),
    title: String(raw.title || 'A Cola da Gil'),
    slogan: String(raw.slogan || 'A força da mulher'),
    badge: raw.badge ? String(raw.badge) : undefined,
    description: String(
      raw.description ||
        'Números para a urna eletrônica. Imprima sua colinha em papel para levar no dia do voto.'
    ),
    colors: {
      primary: colors.primary || '#ff28b4',
      primaryHover: colors.primaryHover || '#e01f9c',
      lightBg: colors.lightBg || '#fdf2f8',
      border: colors.border || '#fce7f3',
    },
    showPresident,
    footerNote: raw.footerNote ? String(raw.footerNote) : undefined,
    candidates: filteredCandidates,
  };
}

// Registro estático das campanhas cadastradas
const REGISTERED_CAMPAIGNS: Record<string, CampaignConfig> = {
  coladagil: normalizeCampaign(coladagilRaw),
  coladaandreia: normalizeCampaign(coladaandreiaRaw),
  coladomarcos: normalizeCampaign(coladomarcosRaw),
};

export const DEFAULT_CAMPAIGN_SLUG = 'coladagil';

/**
 * Busca uma campanha pelo slug (case-insensitive).
 * Suporta sinônimos e alias comuns (ex: 'gil' -> 'coladagil', 'andreia' -> 'coladaandreia').
 */
export function getCampaignBySlug(slug?: string | null): CampaignConfig | null {
  if (!slug) return null;
  const clean = slug.trim().toLowerCase();

  if (REGISTERED_CAMPAIGNS[clean]) {
    return REGISTERED_CAMPAIGNS[clean];
  }

  // Alias comuns amigáveis
  if (clean === 'gil') return REGISTERED_CAMPAIGNS['coladagil'];
  if (clean === 'andreia') return REGISTERED_CAMPAIGNS['coladaandreia'];
  if (clean === 'marcos') return REGISTERED_CAMPAIGNS['coladomarcos'];

  return null;
}

/**
 * Retorna a campanha padrão (A Cola da Gil) para rota raiz `/`
 */
export function getDefaultCampaign(): CampaignConfig {
  return REGISTERED_CAMPAIGNS[DEFAULT_CAMPAIGN_SLUG];
}

/**
 * Retorna todas as campanhas cadastradas
 */
export function getAllCampaigns(): CampaignConfig[] {
  return Object.values(REGISTERED_CAMPAIGNS);
}

/**
 * Retorna a lista de todos os slugs válidos
 */
export function getAllCampaignSlugs(): string[] {
  return Object.keys(REGISTERED_CAMPAIGNS);
}
