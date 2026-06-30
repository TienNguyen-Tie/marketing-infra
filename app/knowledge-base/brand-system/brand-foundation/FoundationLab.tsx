'use client';

import { useState, useCallback } from 'react';
import type { Audience, Market, BrandLayer } from './foundation-data';
import {
  getVariant,
  contextTokens as ALL_TOKENS,
  AUDIENCE_LABELS,
  MARKET_LABELS,
} from './foundation-data';
import TokenReviewPanel from './TokenReviewPanel';
import styles from './brand-foundation.module.css';

type LabTier = 'overarching' | 'localized';
type Mode = 'adapt' | 'translate' | 'rewrite';

interface GeneratedLayer {
  id: string;
  layerNumber: string;
  layerName: string;
  title: string;
  body: string;
  diffState: 'unchanged' | 'modified' | 'added';
}

interface GenerationResult {
  layers: GeneratedLayer[];
  overallReasoning: string;
  warnings: string[];
}

// In overarching mode, brands is already the source — only other audiences are valid targets
const OVERARCHING_TARGETS: Audience[] = ['employer-branding'];
const ALL_AUDIENCES: Audience[] = ['brands', 'employer-branding'];
const MARKETS: Market[] = ['vn', 'th', 'id', 'ph', 'my', 'sg'];

const MODE_META: Record<Mode, { label: string; desc: string }> = {
  adapt: { label: 'Adapt', desc: 'Adjust tone & culture, keep strategic core' },
  translate: { label: 'Translate', desc: 'Localise language and proof points natively' },
  rewrite: { label: 'Rewrite', desc: 'Fresh language, source as reference only' },
};

const DIFF_BADGE: Record<string, { label: string; cls: string }> = {
  unchanged: { label: 'Unchanged', cls: styles.diffUnchanged },
  modified: { label: 'Modified', cls: styles.diffModified },
  added: { label: 'Added', cls: styles.diffAdded },
};

export default function FoundationLab() {
  /* ── tier & mode ── */
  const [labTier, setLabTier] = useState<LabTier>('overarching');
  const [mode, setMode] = useState<Mode>('adapt');

  /* ── target dimensions ── */
  const [targetAudience, setTargetAudience] = useState<Audience>('employer-branding');
  const [targetMarket, setTargetMarket] = useState<Market>('vn');

  const [userPrompt, setUserPrompt] = useState('');

  /* ── token state ── */
  const [activeIds, setActiveIds] = useState<Set<string>>(
    () => new Set(ALL_TOKENS.filter((t) => t.defaultActive).map((t) => t.id)),
  );
  const [panelOpen, setPanelOpen] = useState(false);

  /* ── generation state ── */
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // source is always locked Brand overarching
  const sourceVariant = getVariant('overarching', 'brands');

  const targetLabel =
    labTier === 'overarching'
      ? `${AUDIENCE_LABELS[targetAudience]} overarching`
      : `${AUDIENCE_LABELS[targetAudience]} × ${MARKET_LABELS[targetMarket]}`;

  const handleTierChange = (tier: LabTier) => {
    setLabTier(tier);
    // brands can't be a target in overarching mode (it's the source)
    if (tier === 'overarching' && targetAudience === 'brands') {
      setTargetAudience('employer-branding');
    }
    setResult(null);
    setError(null);
  };

  const toggleToken = useCallback((id: string) => {
    setActiveIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    const activeTokenValues = ALL_TOKENS.filter((t) => activeIds.has(t.id)).map((t) => t.value);

    try {
      const res = await fetch('/api/foundation-lab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          sourceAudience: 'brands',
          sourceMarket: 'overarching',
          targetAudience,
          targetMarket: labTier === 'localized' ? targetMarket : 'overarching',
          targetLabel,
          userPrompt: userPrompt.trim() || undefined,
          sourceLayers: sourceVariant.layers,
          activeTokenValues,
          activeTokenIds: Array.from(activeIds),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Unknown error');
        return;
      }
      setResult(data as GenerationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdopt = () => {
    if (!result) return;
    try {
      const key =
        labTier === 'localized'
          ? `foundation-${targetAudience}-${targetMarket}`
          : `foundation-${targetAudience}-overarching`;
      localStorage.setItem(key, JSON.stringify(result.layers));
    } catch {
      /* localStorage may be unavailable */
    }
  };

  return (
    <div id="foundation-lab" className={styles.labWrapper}>
      <div className={styles.labHeader}>
        <div className={styles.labHeaderLeft}>
          <p className={styles.sectionLabel}>Foundation Lab</p>
          <p className={styles.labSubtitle}>
            Generate audience- and market-specific foundation variants with AI.
          </p>
        </div>
        <button className={styles.tokenBarBtn} onClick={() => setPanelOpen((p) => !p)}>
          <span className={`material-icons-round ${styles.tokenBarIcon}`}>tune</span>
          Context tokens
          <span className={styles.tokenBadge}>{activeIds.size}</span>
        </button>
      </div>

      {/* ── Tier selector ── */}
      <div className={styles.labTierSelector}>
        <span className={styles.labTierLabel}>Generating</span>
        <div className={styles.labTierPills}>
          {(['overarching', 'localized'] as LabTier[]).map((t) => (
            <button
              key={t}
              className={`${styles.labTierPill} ${labTier === t ? styles.labTierPillActive : ''}`}
              onClick={() => handleTierChange(t)}
            >
              {t === 'overarching' ? 'Overarching variant' : 'Market-localized variant'}
            </button>
          ))}
        </div>
      </div>

      {/* ── Mode selector ── */}
      <div className={styles.modeRow}>
        {(Object.entries(MODE_META) as [Mode, (typeof MODE_META)[Mode]][]).map(([key, meta]) => (
          <button
            key={key}
            className={`${styles.modeBtn} ${mode === key ? styles.modeBtnActive : ''}`}
            onClick={() => setMode(key)}
          >
            <span className={styles.modeBtnLabel}>{meta.label}</span>
            <span className={styles.modeBtnDesc}>{meta.desc}</span>
          </button>
        ))}
      </div>

      {/* ── Dimension bar ── */}
      <div className={styles.dimensionBar}>
        {/* Source — always locked */}
        <div className={styles.dimensionSide}>
          <span className={styles.dimensionSideLabel}>Source</span>
          <div className={styles.sourceLockedChip}>
            <span className={`material-icons-round ${styles.sourceLockedIcon}`}>lock</span>
            Brand · Overarching
          </div>
          <span className={styles.sourceLockedNote}>v2026 · Locked</span>
        </div>

        <span className={`material-icons-round ${styles.arrowIcon}`}>arrow_forward</span>

        {/* Target */}
        <div className={styles.dimensionSide}>
          <span className={styles.dimensionSideLabel}>Target</span>
          <div className={styles.dimensionPills}>
            {(labTier === 'overarching' ? OVERARCHING_TARGETS : ALL_AUDIENCES).map((a) => (
              <button
                key={a}
                className={`${styles.dimPill} ${targetAudience === a ? styles.dimPillActive : ''}`}
                onClick={() => setTargetAudience(a)}
              >
                {AUDIENCE_LABELS[a]}
              </button>
            ))}
          </div>
          {labTier === 'localized' && (
            <div className={styles.dimensionPills}>
              {MARKETS.map((m) => (
                <button
                  key={m}
                  className={`${styles.dimPill} ${targetMarket === m ? styles.dimPillActive : ''}`}
                  onClick={() => setTargetMarket(m)}
                >
                  {MARKET_LABELS[m]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Optional prompt ── */}
      <div className={styles.promptRow}>
        <label className={styles.promptLabel} htmlFor="lab-prompt">
          Additional instruction <span className={styles.promptOptional}>(optional)</span>
        </label>
        <textarea
          id="lab-prompt"
          className={styles.promptTextarea}
          rows={2}
          placeholder="e.g. Emphasise livestream commerce specifically. Use a warmer, more personal tone."
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
        />
      </div>

      {/* ── Generate button ── */}
      <button className={styles.generateBtn} onClick={handleGenerate} disabled={loading}>
        {loading ? (
          <>
            <span className={`material-icons-round ${styles.spinIcon}`}>autorenew</span>
            Generating…
          </>
        ) : (
          <>
            <span className="material-icons-round">auto_awesome</span>
            Generate {targetLabel}
          </>
        )}
      </button>

      {/* ── Error ── */}
      {error && (
        <div className={styles.labError}>
          <span className={`material-icons-round ${styles.errorIcon}`}>error_outline</span>
          {error}
        </div>
      )}

      {/* ── Comparison view ── */}
      {result && (
        <div className={styles.comparisonWrapper}>
          <div className={styles.comparisonHeader}>
            <div className={styles.comparisonTitle}>Generated: {targetLabel}</div>
            <div className={styles.comparisonActions}>
              {result.warnings.length > 0 && (
                <span className={styles.warningChip}>
                  <span className="material-icons-round" style={{ fontSize: 12 }}>warning</span>
                  {result.warnings.length} warning{result.warnings.length > 1 ? 's' : ''}
                </span>
              )}
              <button className={styles.adoptBtn} onClick={handleAdopt}>
                <span className="material-icons-round">save</span>
                Adopt to variant
              </button>
            </div>
          </div>

          {result.overallReasoning && (
            <div className={styles.reasoningBox}>
              <span className={`material-icons-round ${styles.reasoningIcon}`}>psychology</span>
              <p className={styles.reasoningText}>{result.overallReasoning}</p>
            </div>
          )}

          <div className={styles.comparisonGrid}>
            {result.layers.map((layer) => {
              const source = sourceVariant.layers.find(
                (l: BrandLayer) => l.layerNumber === layer.layerNumber,
              );
              const badge = DIFF_BADGE[layer.diffState] ?? DIFF_BADGE.modified;
              return (
                <div key={layer.id} className={styles.comparisonRow}>
                  <div className={styles.comparisonCell}>
                    <div className={styles.comparisonCellHeader}>
                      <span className={styles.comparisonCellNum}>{layer.layerNumber}</span>
                      <span className={styles.comparisonCellName}>{layer.layerName}</span>
                      <span className={styles.comparisonCellTag}>Source</span>
                    </div>
                    <p className={styles.comparisonCellTitle}>{source?.title ?? '—'}</p>
                    <p className={styles.comparisonCellBody}>{source?.body ?? '—'}</p>
                  </div>

                  <div className={`${styles.comparisonCell} ${styles.comparisonCellGenerated}`}>
                    <div className={styles.comparisonCellHeader}>
                      <span className={styles.comparisonCellNum}>{layer.layerNumber}</span>
                      <span className={styles.comparisonCellName}>{layer.layerName}</span>
                      <span className={`${styles.diffBadge} ${badge.cls}`}>{badge.label}</span>
                    </div>
                    <p className={styles.comparisonCellTitle}>{layer.title}</p>
                    <p className={styles.comparisonCellBody}>{layer.body}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {result.warnings.length > 0 && (
            <div className={styles.warningsList}>
              {result.warnings.map((w, i) => (
                <div key={i} className={styles.warningItem}>
                  <span className={`material-icons-round ${styles.warningItemIcon}`}>warning</span>
                  {w}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Token Review Panel ── */}
      {panelOpen && (
        <TokenReviewPanel
          tokens={ALL_TOKENS}
          activeIds={activeIds}
          onToggle={toggleToken}
          onClose={() => setPanelOpen(false)}
        />
      )}
    </div>
  );
}
