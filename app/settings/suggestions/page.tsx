'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './suggestions.module.css';

type SuggestionUser = { id: string; name: string; email: string; role: string };

type Suggestion = {
  id: string;
  userId: string;
  user: SuggestionUser;
  mode: string;
  contextTag: string | null;
  userPrompt: string;
  aiResponse: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const MODE_COLORS: Record<string, string> = {
  'explain-role': '#3B82F6',
  'brainstorm':   '#7F77DD',
  'stress-test':  '#D97706',
  'new-activity': '#F43C34',
};

const MODE_LABELS: Record<string, string> = {
  'explain-role': 'Explain Role',
  'brainstorm':   'Brainstorm',
  'stress-test':  'Stress-test',
  'new-activity': 'New Activity',
};

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  new:         { bg: '#EEF2FF', color: '#4338CA' },
  reviewed:    { bg: '#ECFDF5', color: '#065F46' },
  implemented: { bg: '#F0FAF6', color: '#0F6E56' },
  dismissed:   { bg: '#F5F5F5', color: '#727272' },
};

const ALL_STATUSES = ['all', 'new', 'reviewed', 'implemented', 'dismissed'];

function relativeDate(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins < 1)   return 'just now';
  if (mins < 60)  return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export default function SuggestionsPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/suggestions');
    if (res.status === 403) { setForbidden(true); setLoading(false); return; }
    const data = await res.json();
    setSuggestions(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  // Close action menu on outside click
  useEffect(() => {
    if (!openMenu) return;
    function handler() { setOpenMenu(null); }
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [openMenu]);

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    setOpenMenu(null);
    await fetch(`/api/suggestions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setSuggestions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    setUpdating(null);
  }

  function toggleExpand(id: string) {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  const filtered = filter === 'all' ? suggestions : suggestions.filter(s => s.status === filter);
  const counts: Record<string, number> = { all: suggestions.length };
  ALL_STATUSES.slice(1).forEach(s => { counts[s] = suggestions.filter(x => x.status === s).length; });

  if (forbidden) {
    return (
      <div className={styles.page}>
        <div className={styles.forbidden}>
          <span className="material-icons-round" style={{ fontSize: 40, color: '#D3D3D3' }}>lock</span>
          <p className={styles.forbiddenTitle}>Access Denied</p>
          <p className={styles.forbiddenSub}>This page is for admins only.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <p className={styles.breadcrumb}>Settings › Vision Suggestions</p>

      {/* Heading */}
      <h1 className={styles.h1}>Vision Suggestions</h1>
      <p className={styles.subtitle}>Ideas contributed by the team via the AI Companion.</p>

      {/* Filter bar */}
      <div className={styles.filterBar}>
        {ALL_STATUSES.map(s => (
          <button
            key={s}
            className={`${styles.filterChip} ${filter === s ? styles.filterChipActive : ''}`}
            onClick={() => setFilter(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
            <span className={`${styles.filterCount} ${filter === s ? styles.filterCountActive : ''}`}>
              {counts[s] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className={styles.loadingState}>
          <span className="material-icons-round" style={{ fontSize: 32, color: '#D3D3D3', animation: 'spin 1s linear infinite' }}>autorenew</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className={styles.emptyState}>
          <span className="material-icons-round" style={{ fontSize: 40, color: '#D3D3D3' }}>speaker_notes_off</span>
          <p className={styles.emptyTitle}>
            {filter === 'all'
              ? 'No suggestions yet.'
              : `No ${filter} suggestions.`}
          </p>
          <p className={styles.emptySub}>
            {filter === 'all'
              ? "They'll appear here when team members use the Vision Companion."
              : 'Change the filter to see others.'}
          </p>
        </div>
      ) : (
        <div className={styles.list}>
          {filtered.map(s => {
            const isExpanded = expanded.has(s.id);
            const statusStyle = STATUS_COLORS[s.status] ?? { bg: '#F5F5F5', color: '#727272' };
            const modeColor = MODE_COLORS[s.mode] ?? '#A3A3A3';
            const modeLabel = MODE_LABELS[s.mode] ?? s.mode;
            const isUpdating = updating === s.id;

            return (
              <div key={s.id} className={styles.card}>
                {/* Top row */}
                <div className={styles.cardTop}>
                  <div className={styles.cardMeta}>
                    <div className={styles.cardMetaRow}>
                      <span className={styles.userName}>{s.user.name}</span>
                      <span className={styles.rolePill}>{s.user.role}</span>
                      <span className={styles.cardTime}>{relativeDate(s.createdAt)}</span>
                    </div>
                    <div className={styles.cardTags}>
                      <span className={styles.modePill} style={{ background: modeColor + '18', color: modeColor }}>
                        {modeLabel}
                      </span>
                      {s.contextTag && (
                        <span className={styles.contextTag}>
                          <span className="material-icons-round" style={{ fontSize: 10 }}>label</span>
                          {s.contextTag}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    <span
                      className={styles.statusPill}
                      style={{ background: statusStyle.bg, color: statusStyle.color }}
                    >
                      {s.status}
                    </span>
                    <div className={styles.menuWrap}>
                      <button
                        className={styles.menuBtn}
                        onClick={e => { e.stopPropagation(); setOpenMenu(openMenu === s.id ? null : s.id); }}
                        disabled={isUpdating}
                        aria-label="Actions"
                      >
                        <span className="material-icons-round" style={{ fontSize: 18 }}>more_vert</span>
                      </button>
                      {openMenu === s.id && (
                        <div className={styles.dropdown} onClick={e => e.stopPropagation()}>
                          {['reviewed', 'implemented', 'dismissed'].map(st => (
                            <button
                              key={st}
                              className={styles.dropdownItem}
                              onClick={() => updateStatus(s.id, st)}
                            >
                              Mark as {st.charAt(0).toUpperCase() + st.slice(1)}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Prompt */}
                <div className={styles.section}>
                  <p className={styles.sectionLabel}>PROMPT</p>
                  <p className={styles.sectionBody}>{s.userPrompt}</p>
                </div>

                {/* AI Response */}
                <div className={styles.section}>
                  <p className={styles.sectionLabel}>AI RESPONSE</p>
                  <p className={`${styles.sectionBody} ${styles.aiBody} ${!isExpanded ? styles.aiBodyClamped : ''}`}>
                    {s.aiResponse}
                  </p>
                  {s.aiResponse.length > 300 && (
                    <button className={styles.expandBtn} onClick={() => toggleExpand(s.id)}>
                      {isExpanded ? 'Show less' : 'Show more'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
