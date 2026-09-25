'use client';

import { useSyncExternalStore, useMemo } from 'react';
import { Candidate, CampaignConfig, getDefaultCampaign } from './campaigns';
import { STORAGE_KEY } from './elections-data';

// Custom event to notify storage changes across components and tabs
const STORAGE_EVENT = 'colinha_storage_change';

function notifyChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }
}

function subscribeCandidates(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(STORAGE_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(STORAGE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

// Cache snapshots per storage key to guarantee stable references in useSyncExternalStore
const snapshotCache = new Map<
  string,
  { raw: string | null; candidates: Candidate[] }
>();

function getStorageKey(slug: string): string {
  if (slug === 'coladagil') {
    return STORAGE_KEY;
  }
  return `colinha_${slug}_custom_v1`;
}

function getCandidatesForCampaign(
  campaign: CampaignConfig,
  key: string
): Candidate[] {
  if (typeof window === 'undefined') return campaign.candidates;

  const raw = localStorage.getItem(key);
  const cached = snapshotCache.get(key);

  if (cached && cached.raw === raw) {
    return cached.candidates;
  }

  if (!raw) {
    snapshotCache.set(key, { raw: null, candidates: campaign.candidates });
    return campaign.candidates;
  }

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Filter out president if showPresident is false
      const filtered = parsed.filter((c: Candidate) => {
        if (!campaign.showPresident) {
          return (
            c.id !== 'presidente' &&
            c.id !== 'presidente-da-republica' &&
            !c.role?.toLowerCase().includes('presidente')
          );
        }
        return true;
      });

      snapshotCache.set(key, { raw, candidates: filtered });
      return filtered;
    }
  } catch {
    // fallback
  }

  snapshotCache.set(key, { raw, candidates: campaign.candidates });
  return campaign.candidates;
}

/**
 * Hook para gerenciar os candidatos de uma campanha específica
 */
export function useCampaignCandidates(campaign: CampaignConfig) {
  const key = useMemo(() => getStorageKey(campaign.slug), [campaign.slug]);

  const candidates = useSyncExternalStore(
    subscribeCandidates,
    () => getCandidatesForCampaign(campaign, key),
    () => campaign.candidates
  );

  const setCandidates = (newList: Candidate[]) => {
    try {
      localStorage.setItem(key, JSON.stringify(newList));
      notifyChange();
    } catch (e) {
      console.warn('Erro ao salvar candidatos:', e);
    }
  };

  const resetCandidates = () => {
    try {
      localStorage.removeItem(key);
      notifyChange();
    } catch (e) {
      console.warn('Erro ao restaurar candidatos:', e);
    }
  };

  return [candidates, setCandidates, resetCandidates] as const;
}

/**
 * Retrocompatibilidade para chamadas sem parâmetros (usa A Cola da Gil)
 */
export function useCandidates() {
  const defaultCampaign = getDefaultCampaign();
  const [candidates, setCandidates] = useCampaignCandidates(defaultCampaign);
  return [candidates, setCandidates] as const;
}
