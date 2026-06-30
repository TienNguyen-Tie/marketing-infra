'use client';

import { useState } from 'react';
import styles from '../copywriting.module.css';

/* Platform ad-rule sets for promoting financial products. Sourced from the platforms'
   current advertising policies (Meta Advertising Standards — financial & insurance
   products + UK FCA verification; LinkedIn Advertising Policies — financial services).
   Both gate UK financial promotions behind FCA authorisation, which ties back to the
   FCA section beside this panel. */

type PlatformId = 'linkedin' | 'facebook';

interface Platform {
  id: PlatformId;
  name: string;
  meta: string;
  summary: string;
  rules: { key: string; val: string }[];
  prohibited: string[];
  tieIn: string;
  policyUrl: string;
  policyLabel: string;
}

const PLATFORMS: Record<PlatformId, Platform> = {
  facebook: {
    id: 'facebook',
    name: 'Facebook & Instagram (Meta)',
    meta: 'Meta Advertising Standards · Financial & insurance products',
    summary:
      'Meta gates UK financial ads at the account level: the advertiser must be FCA-authorised and pass Meta’s financial-services verification before any promotion can run.',
    rules: [
      { key: 'FCA verification (UK)', val: 'Promoting financial services to UK users requires FCA authorisation and Meta’s verification — submit the firm’s FCA Reference Number (FRN) and a business contact.' },
      { key: 'Accurate & non-deceptive', val: 'No misleading, exaggerated, or guaranteed-return claims. The landing page must match the ad.' },
      { key: 'Audience 18+', val: 'Financial ads must target adults only and must not exploit anyone’s financial situation.' },
      { key: 'Required disclosures', val: 'Carry the FCA risk warnings (capital at risk, past performance) — Meta enforces local-law compliance.' },
    ],
    prohibited: [
      'Unlicensed / unauthorised financial services',
      'Misleading or guaranteed-return claims',
      'Cryptocurrency products without Meta pre-approval (Crypto Ad Review)',
      'Predatory or certain short-term loan products',
    ],
    tieIn: 'No FCA authorisation + Meta verification = the ad cannot run. This sits on top of the s21 sign-off in the FCA rules beside this panel.',
    policyUrl: 'https://transparency.meta.com/en-gb/policies/ad-standards/restricted-goods-services/financial-services/',
    policyLabel: 'Meta — Financial products & services',
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    meta: 'LinkedIn Advertising Policies · Financial services',
    summary:
      'LinkedIn permits regulated financial ads but puts compliance on the advertiser: required disclosures, licensing, and full local-law (FCA) compliance in every target market.',
    rules: [
      { key: 'Licensing & disclosures', val: 'Include all legally required disclosures, disclaimers and licensing — for the UK, FCA authorisation and the s21-approved promotion.' },
      { key: 'No misleading claims', val: 'No deceptive, exaggerated, or guaranteed-return messaging. Be clear on terms, risk and eligibility.' },
      { key: 'Professional targeting', val: 'Strong B2B targeting (job, industry, seniority) — never to enable discrimination, and adults only.' },
      { key: 'Advertiser is responsible', val: 'LinkedIn holds the advertiser responsible for compliance with the regulator’s requirements in each market.' },
    ],
    prohibited: [
      'Unlicensed / illegal financial instruments',
      'Most crypto & unregistered token offerings (select markets only)',
      'Payday / short-term loan & cash-advance products',
      'Debt-collection services; MLM schemes',
    ],
    tieIn: 'For UK financial promotions, LinkedIn expects full FCA compliance — the same s21 authorisation the FCA rules beside this panel require.',
    policyUrl: 'https://www.linkedin.com/legal/ads-policy',
    policyLabel: 'LinkedIn — Advertising Policies',
  },
};

export default function PlatformRulesPanel() {
  const [platformId, setPlatformId] = useState<PlatformId>('linkedin');
  const p = PLATFORMS[platformId];

  return (
    <div className={styles.panel}>
      <div className={styles.panelHead}>
        <p className={styles.panelEyebrow}>Paid social · Financial promotion</p>
        <p className={styles.panelTitle}>Platform ad rules</p>
      </div>

      <div className={styles.panelSelectWrap}>
        <p className={styles.panelSelectLabel}>Show rules for</p>
        <select
          className={styles.panelSelect}
          value={platformId}
          onChange={(e) => setPlatformId(e.target.value as PlatformId)}
          aria-label="Choose platform"
        >
          <option value="linkedin">LinkedIn</option>
          <option value="facebook">Facebook &amp; Instagram (Meta)</option>
        </select>
      </div>

      <div className={styles.panelBody}>
        <p className={styles.panelMeta}>{p.meta}</p>
        <p className={styles.panelSummary}>{p.summary}</p>

        {p.rules.map((r) => (
          <div key={r.key} className={styles.ruleRow}>
            <p className={styles.ruleKey}>{r.key}</p>
            <p className={styles.ruleVal}>{r.val}</p>
          </div>
        ))}

        <p className={styles.prohHead}>Prohibited / restricted</p>
        <ul className={styles.prohList}>
          {p.prohibited.map((x) => <li key={x}>{x}</li>)}
        </ul>

        <p className={styles.panelTieIn}><strong>Ties to FCA:</strong> {p.tieIn}</p>

        <a className={styles.policyBtn} href={p.policyUrl} target="_blank" rel="noopener noreferrer">
          <span className="material-icons-round">open_in_new</span>
          {p.policyLabel}
        </a>
      </div>
    </div>
  );
}
