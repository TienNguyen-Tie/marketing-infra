'use client';

import { useState } from 'react';
import type { Audience, Market, BrandLayer } from './foundation-data';
import { getVariant, AUDIENCE_LABELS, MARKET_LABELS } from './foundation-data';
import styles from './brand-foundation.module.css';

const AUDIENCES: Audience[] = ['brands', 'employer-branding'];
const MARKETS: Market[] = ['vn', 'th', 'id', 'ph', 'my', 'sg'];

const LAYER_LABEL: Record<string, string> = {
  '01': 'Layer 1 · Core Truth',
  '02': 'Layer 2 · Brand Essence',
  '03': 'Layer 2 · Core USP',
  '04': 'Layer 2 · Brand Persona',
};

function EmptyVariantState({ variantLabel }: { variantLabel: string }) {
  return (
    <div className={styles.evsContainer}>
      <span className={`material-icons-round ${styles.evsIcon}`}>folder_open</span>
      <p className={styles.evsHeading}>{variantLabel} not yet built</p>
      <p className={styles.evsSubtitle}>
        Generate this variant in the Foundation Lab below — sourced from the locked overarching Brand foundation.
      </p>
      <button
        className={styles.evsBtn}
        onClick={() =>
          document.getElementById('foundation-lab')?.scrollIntoView({ behavior: 'smooth' })
        }
      >
        Generate in Lab ↓
      </button>
    </div>
  );
}

export default function QuickReference() {
  const [ovAudience, setOvAudience] = useState<Audience>('brands');
  const [locAudience, setLocAudience] = useState<Audience>('brands');
  const [locMarket, setLocMarket] = useState<Market>('vn');

  const ovVariant = getVariant('overarching', ovAudience);
  const ovHasContent = ovVariant.layers.length > 0;

  return (
    <div className={styles.qrWrapper}>

      {/* ── SUB-SECTION A: OVERARCHING ── */}
      <div className={styles.qrSection}>
        <p className={styles.sectionLabel}>Quick Reference · Overarching</p>
        <p className={styles.qrSubtitle}>
          The company-wide brand foundation. Applies across all markets.
        </p>

        <div className={styles.qrToggles}>
          <div className={styles.togglePills}>
            {AUDIENCES.map((a) => (
              <button
                key={a}
                className={`${styles.togglePill} ${ovAudience === a ? styles.togglePillActive : ''}`}
                onClick={() => setOvAudience(a)}
              >
                {AUDIENCE_LABELS[a]}
              </button>
            ))}
          </div>
        </div>

        {ovHasContent ? (
          <div className={styles.cardGrid}>
            {ovVariant.layers.map((layer: BrandLayer) => (
              <div key={layer.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.cardNumber}>{layer.layerNumber}</div>
                  <span className={styles.cardLayer}>
                    {LAYER_LABEL[layer.layerNumber] ?? `Layer ${layer.layerNumber}`}
                  </span>
                </div>
                <p className={styles.cardTitle}>{layer.title}</p>
                <p className={styles.cardDesc}>{layer.body}</p>
                {ovVariant.status === 'locked' && (
                  <span className={styles.cardBadge}>● Locked</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyVariantState variantLabel={`${AUDIENCE_LABELS[ovAudience]} overarching`} />
        )}
      </div>

      {/* ── DIVIDER ── */}
      <div className={styles.qrDivider} />

      {/* ── SUB-SECTION B: MARKET-LOCALIZED ── */}
      <div className={styles.qrSection}>
        <p className={styles.sectionLabel}>Quick Reference · Market-Localized</p>
        <p className={styles.qrSubtitle}>
          Localized adaptation of the overarching foundation, tuned to each market&apos;s specific context and voice.
        </p>

        <div className={styles.qrToggles}>
          <div className={styles.toggleGroup}>
            <span className={styles.toggleGroupLabel}>Audience</span>
            <div className={styles.togglePills}>
              {AUDIENCES.map((a) => (
                <button
                  key={a}
                  className={`${styles.togglePill} ${locAudience === a ? styles.togglePillActive : ''}`}
                  onClick={() => setLocAudience(a)}
                >
                  {AUDIENCE_LABELS[a]}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.toggleGroup}>
            <span className={styles.toggleGroupLabel}>Market</span>
            <div className={styles.togglePills}>
              {MARKETS.map((m) => (
                <button
                  key={m}
                  className={`${styles.togglePill} ${locMarket === m ? styles.togglePillActive : ''}`}
                  onClick={() => setLocMarket(m)}
                >
                  {MARKET_LABELS[m]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <EmptyVariantState
          variantLabel={`${AUDIENCE_LABELS[locAudience]} × ${MARKET_LABELS[locMarket]}`}
        />
      </div>

    </div>
  );
}
