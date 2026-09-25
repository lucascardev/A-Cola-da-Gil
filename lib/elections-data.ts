import { Candidate, getDefaultCampaign } from './campaigns';

export type { Candidate } from './campaigns';

// Mantém retrocompatibilidade para componentes existentes
export const GIL_DEFAULT_CANDIDATES: Candidate[] = getDefaultCampaign().candidates;

export const STORAGE_KEY = 'a_cola_da_gil_custom_v2';

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
