export interface Candidate {
  id: string;
  role: string;
  roleShort: string;
  order: number; // Urna voting order
  digits: number;
  number: string;
  name: string;
  party: string;
  badge?: string;
  isMainHighlight?: boolean;
  notes?: string;
}

export const GIL_DEFAULT_CANDIDATES: Candidate[] = [
  {
    id: 'deputado-federal',
    role: 'Deputada Federal',
    roleShort: 'Dep. Federal',
    order: 1,
    digits: 4,
    number: '4478',
    name: 'Cibele de Teobaldo',
    party: 'União Brasil',
    badge: 'Destaque Principal ★ A Força da Mulher',
    isMainHighlight: true,
    notes: 'Candidata de destaque da Gil. Representante da força feminina.',
  },
  {
    id: 'deputado-estadual',
    role: 'Deputado Estadual',
    roleShort: 'Dep. Estadual',
    order: 2,
    digits: 5,
    number: '44000',
    name: 'Pedro Tavares',
    party: 'União Brasil',
    notes: 'Trabalho e dedicação pela Bahia.',
  },
  {
    id: 'senador-1',
    role: 'Senador (1ª Vaga)',
    roleShort: 'Senador 1',
    order: 3,
    digits: 3,
    number: '100',
    name: 'Angelo Coronel',
    party: 'PSD',
    notes: 'Primeiro voto para o Senado Federal.',
  },
  {
    id: 'senador-2',
    role: 'Senador (2ª Vaga)',
    roleShort: 'Senador 2',
    order: 4,
    digits: 3,
    number: '222',
    name: 'João Roma',
    party: 'PL',
    notes: 'Segundo voto para o Senado Federal.',
  },
  {
    id: 'governador',
    role: 'Governador',
    roleShort: 'Governador',
    order: 5,
    digits: 2,
    number: '44',
    name: 'ACM Neto',
    party: 'União Brasil (Vice Zé Coca)',
    notes: 'Para transformar o governo do Estado.',
  },
  {
    id: 'presidente',
    role: 'Presidente da República',
    roleShort: 'Presidente',
    order: 6,
    digits: 2,
    number: '22',
    name: 'Presidente 22',
    party: 'PL',
    notes: 'Eleição para Presidente da República.',
  },
];

export const STORAGE_KEY = 'a_cola_da_gil_custom_v1';

// Data oficial da eleição fixada internamente no sistema: 4 de outubro de 2026 às 08:00
export const OFFICIAL_ELECTION_DATE = '2026-10-04T08:00';

export function isBlackoutPeriod(electionDateStr: string = OFFICIAL_ELECTION_DATE): boolean {
  try {
    const electionTime = new Date(electionDateStr).getTime();
    const now = Date.now();
    // 2 dias antes da eleição (48 horas = 48 * 60 * 60 * 1000 = 172.800.000 ms)
    const blackoutStart = electionTime - (2 * 24 * 60 * 60 * 1000);
    // O período de silêncio fica ativo até as 18h do dia da eleição (fim da votação)
    const electionEnd = electionTime + (10 * 60 * 60 * 1000); // 18:00
    return now >= blackoutStart && now <= electionEnd;
  } catch {
    return false;
  }
}
