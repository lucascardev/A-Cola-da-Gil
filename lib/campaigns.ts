import fs from 'fs';
import path from 'path';
import {
  Candidate,
  CampaignConfig,
  CampaignTheme,
  normalizeCampaign,
  generatePersonalColinha,
} from './campaign-types';

export type { Candidate, CampaignConfig, CampaignTheme };
export { normalizeCampaign, generatePersonalColinha };

const CAMPAIGNS_DIR = path.join(process.cwd(), 'data', 'campaigns');
export const DEFAULT_CAMPAIGN_SLUG = 'coladagil';

/**
 * Lê e carrega dinamicamente TODOS os arquivos .json da pasta data/campaigns/.
 * Não é necessário importar manualmente um a um!
 * Adicionar ou excluir um arquivo JSON na pasta tem efeito imediato e automático.
 */
export function loadCampaignsFromDisk(): Record<string, CampaignConfig> {
  const map: Record<string, CampaignConfig> = {};

  try {
    if (fs.existsSync(CAMPAIGNS_DIR)) {
      const files = fs.readdirSync(CAMPAIGNS_DIR);

      for (const file of files) {
        if (file.toLowerCase().endsWith('.json')) {
          try {
            const filePath = path.join(CAMPAIGNS_DIR, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            const parsed = JSON.parse(content);

            const fileSlug = file.replace(/\.json$/i, '').toLowerCase().trim();
            const normalized = normalizeCampaign(parsed, fileSlug);

            // Registra pelo slug definido no JSON e pelo nome do arquivo
            map[normalized.slug] = normalized;
            if (fileSlug !== normalized.slug) {
              map[fileSlug] = normalized;
            }

            // Registra alias curto (ex: "coladadagmar" -> "dagmar", "coladaadriana" -> "adriana")
            const shortAlias = normalized.slug
              .replace(/^colada/, '')
              .replace(/^colado/, '')
              .replace(/^cola-da-/, '')
              .replace(/^cola-do-/, '')
              .replace(/^cola_da_/, '')
              .replace(/^cola_do_/, '');

            if (shortAlias && shortAlias !== normalized.slug && !map[shortAlias]) {
              map[shortAlias] = normalized;
            }
          } catch (fileErr) {
            console.error(`Erro ao carregar colinha de ${file}:`, fileErr);
          }
        }
      }
    }
  } catch (dirErr) {
    console.error('Erro ao ler pasta de campanhas:', dirErr);
  }

  // Fallback de segurança para coladagil caso o arquivo não exista
  if (!map[DEFAULT_CAMPAIGN_SLUG]) {
    map[DEFAULT_CAMPAIGN_SLUG] = normalizeCampaign(
      {
        slug: DEFAULT_CAMPAIGN_SLUG,
        title: 'A Cola da Gil Tavares',
        slogan: 'Mulher em ação',
        badge: 'Mulher em ação',
        description:
          'Números para a urna eletrônica. Imprima sua colinha em papel para levar no dia do voto.',
        colors: {
          primary: '#ff28b4',
          primaryHover: '#e01f9c',
          lightBg: '#fdf2f8',
          border: '#fce7f3',
        },
        showPresident: false,
      },
      DEFAULT_CAMPAIGN_SLUG
    );
  }

  return map;
}

/**
 * Busca uma campanha pelo slug.
 * 1. Se encontrar na pasta data/campaigns/*.json, retorna os dados cadastrados daquele líder.
 * 2. Se a pessoa digitar uma URL inexistente/personalizada:
 *    Retorna automaticamente uma colinha gerada para ela criar a própria colinha,
 *    salvando apenas no LocalStorage dela, sem saber que existem outras campanhas.
 */
export function getCampaignBySlug(slug?: string | null): CampaignConfig {
  if (!slug) {
    return getDefaultCampaign();
  }

  const clean = slug.trim().toLowerCase();
  const campaigns = loadCampaignsFromDisk();

  if (campaigns[clean]) {
    return campaigns[clean];
  }

  // Se não existir, gera uma colinha pessoal para a pessoa criar a própria colinha
  return generatePersonalColinha(clean);
}

/**
 * Retorna a campanha padrão (A Cola da Gil Tavares) para a rota raiz `/`
 */
export function getDefaultCampaign(): CampaignConfig {
  const campaigns = loadCampaignsFromDisk();
  return campaigns[DEFAULT_CAMPAIGN_SLUG] || generatePersonalColinha(DEFAULT_CAMPAIGN_SLUG);
}

/**
 * Retorna os slugs de todas as campanhas em disco para pré-renderização estática.
 */
export function getAllCampaignSlugs(): string[] {
  const campaigns = loadCampaignsFromDisk();
  return Object.keys(campaigns);
}
