import type { DraftInsight } from './extraction-prompt';

const KEY_PREFIX = 'research-drafts-';

export function saveDrafts(sourceId: string, drafts: DraftInsight[]): void {
  if (typeof window === 'undefined') return;
  if (drafts.length === 0) {
    localStorage.removeItem(KEY_PREFIX + sourceId);
  } else {
    localStorage.setItem(KEY_PREFIX + sourceId, JSON.stringify(drafts));
  }
}

export function loadDrafts(sourceId: string): DraftInsight[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY_PREFIX + sourceId);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function clearDrafts(sourceId: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY_PREFIX + sourceId);
}
