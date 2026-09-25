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
  isCustomPersonal?: boolean;
}

/**
 * Normaliza e valida a configuração de uma campanha.
 * Aplica a regra de showPresident: se false, remove automaticamente o Presidente.
 */
export function normalizeCampaign(
  raw: Record<string, unknown>,
  fallbackSlug: string = 'coladagil'
): CampaignConfig {
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
    slug: String(raw.slug || fallbackSlug).toLowerCase().trim(),
    title: String(raw.title || 'A Cola da Gil'),
    slogan: String(raw.slogan || 'Mulher em ação'),
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

/**
 * Formata um slug em um título amigável e exclusivo.
 * Exemplo: 'coladopedro' -> 'A Cola do Pedro'
 *          'meuvoto' -> 'Minha Colinha Eleitoral'
 */
function formatTitleFromSlug(slug: string): string {
  const clean = slug.toLowerCase().replace(/[^a-z0-9_-]/g, '');
  if (!clean || clean === 'minhacola' || clean === 'meuvoto' || clean === 'colinha') {
    return 'Minha Colinha Eleitoral';
  }

  if (clean.startsWith('colada')) {
    const name = clean.replace('colada', '');
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    return `A Cola da ${capitalized}`;
  }

  if (clean.startsWith('colado')) {
    const name = clean.replace('colado', '');
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    return `A Cola do ${capitalized}`;
  }

  const capitalized = clean.charAt(0).toUpperCase() + clean.slice(1);
  return `Colinha de ${capitalized}`;
}

/**
 * Cria uma colinha personalizada quando o usuário acessa uma URL não cadastrada.
 * A pessoa se sente única, sem saber de outras campanhas, e seus dados salvam no LocalStorage.
 */
export function generatePersonalColinha(slug: string): CampaignConfig {
  const cleanSlug = slug.toLowerCase().trim();
  const title = formatTitleFromSlug(cleanSlug);

  return {
    slug: cleanSlug,
    title,
    slogan: 'Meu Voto, Minha Escolha',
    badge: 'Colinha Pessoal',
    description:
      'Preencha seus candidatos abaixo e clique em Imprimir para levar sua colinha de papel no dia da eleição.',
    colors: {
      primary: '#1e3a8a',
      primaryHover: '#1e40af',
      lightBg: '#f8fafc',
      border: '#e2e8f0',
    },
    showPresident: true,
    footerNote: `${title} • Eleições 2026 • Meu Voto, Minha Escolha`,
    isCustomPersonal: true,
    candidates: [
      {
        id: 'deputado-federal',
        role: 'Deputado Federal',
        roleShort: 'Dep. Federal',
        order: 1,
        digits: 4,
        number: '0000',
        name: 'Seu Deputado Federal',
        party: 'Clique no ícone de lápis para alterar',
        notes: '4 dígitos na urna eletrônica',
      },
      {
        id: 'deputado-estadual',
        role: 'Deputado Estadual',
        roleShort: 'Dep. Estadual',
        order: 2,
        digits: 5,
        number: '00000',
        name: 'Seu Deputado Estadual',
        party: 'Clique no ícone de lápis para alterar',
        notes: '5 dígitos na urna eletrônica',
      },
      {
        id: 'senador-1',
        role: 'Senador (1ª Vaga)',
        roleShort: 'Senador 1',
        order: 3,
        digits: 3,
        number: '000',
        name: 'Seu 1º Senador',
        party: 'Clique no ícone de lápis para alterar',
        notes: '3 dígitos na urna eletrônica',
      },
      {
        id: 'senador-2',
        role: 'Senador (2ª Vaga)',
        roleShort: 'Senador 2',
        order: 4,
        digits: 3,
        number: '000',
        name: 'Seu 2º Senador',
        party: 'Clique no ícone de lápis para alterar',
        notes: '3 dígitos na urna eletrônica',
      },
      {
        id: 'governador',
        role: 'Governador',
        roleShort: 'Governador',
        order: 5,
        digits: 2,
        number: '00',
        name: 'Seu Governador',
        party: 'Clique no ícone de lápis para alterar',
        notes: '2 dígitos na urna eletrônica',
      },
      {
        id: 'presidente',
        role: 'Presidente da República',
        roleShort: 'Presidente',
        order: 6,
        digits: 2,
        number: '00',
        name: 'Seu Presidente',
        party: 'Clique no ícone de lápis para alterar',
        notes: '2 dígitos na urna eletrônica',
      },
    ],
  };
}
