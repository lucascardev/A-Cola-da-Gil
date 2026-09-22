'use client';

import { useSyncExternalStore } from 'react';
import {
  Candidate,
  GIL_DEFAULT_CANDIDATES,
  STORAGE_KEY,
} from './elections-data';

// Custom event to notify storage changes across components and tabs
const STORAGE_EVENT = 'cola_da_gil_storage_change';

function notifyChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }
}

// Candidates store
let cachedCandidates: Candidate[] = GIL_DEFAULT_CANDIDATES;
let lastCandidatesRaw: string | null = null;

function subscribeCandidates(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(STORAGE_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(STORAGE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

function getCandidatesSnapshot(): Candidate[] {
  if (typeof window === 'undefined') return GIL_DEFAULT_CANDIDATES;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === lastCandidatesRaw && raw !== null) {
    return cachedCandidates;
  }
  lastCandidatesRaw = raw;
  if (!raw) {
    cachedCandidates = GIL_DEFAULT_CANDIDATES;
    return cachedCandidates;
  }
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      cachedCandidates = parsed.filter((c: Candidate) => c.id !== 'presidente');
      return cachedCandidates;
    }
  } catch {
    // Fallback
  }
  cachedCandidates = GIL_DEFAULT_CANDIDATES;
  return cachedCandidates;
}

function getCandidatesServerSnapshot(): Candidate[] {
  return GIL_DEFAULT_CANDIDATES;
}

export function useCandidates() {
  const candidates = useSyncExternalStore(
    subscribeCandidates,
    getCandidatesSnapshot,
    getCandidatesServerSnapshot
  );

  const setCandidates = (newList: Candidate[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
      notifyChange();
    } catch (e) {
      console.warn('Erro ao salvar candidatos:', e);
    }
  };

  return [candidates, setCandidates] as const;
}
