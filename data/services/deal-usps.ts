import type { DealUsp } from './types';

/**
 * Deal USPs — pitch closers. Rendered as cards on the Services
 * listing page (Deal USPs tab) and surfaced on Module / Service
 * Line / Persona pages where relevant.
 */
export const DEAL_USPS: DealUsp[] = [
  {
    slug: 'loreal-winning-agency',
    name: "L'Oréal 2024 Winning Agency",
    icon: '🏆',
    whenToDeploy: 'Close MNC contracts; drop procurement skepticism in one slide',
    commercialFrame:
      "Recognised by L'Oréal Group as the year's winning agency. Use as opener for any MNC pitch above $500K annual.",
    dealsClosed:
      "L'Oréal expansion (2025), Unilever Comfort Tết campaign, P&G regional retainer",
    resonatesWithPersonaSlugs: ['regional-commerce-director', 'country-gm'],
    relevantModuleSlugs: ['livestream-commerce', 'content-commerce'],
    relevantServiceLineSlugs: ['bundle-livestream-commerce', 'bundle-full-commerce'],
  },
  {
    slug: 'agency-displacement',
    name: 'Agency Displacement (Bundle 3)',
    icon: '⚡',
    whenToDeploy: 'Replace incumbent agency on social commerce',
    commercialFrame:
      "When a brand buys CIR + TSP + Ads from VinaCapital, there's no role left for Publicis on TikTok commerce. One AM, one ROAS view, 5-8× revenue vs single-product engagement.",
    dealsClosed: "Unilever Home Care annual, L'Oréal Beauty Year 2 expansion",
    resonatesWithPersonaSlugs: ['country-gm', 'regional-commerce-director'],
    relevantModuleSlugs: ['content-commerce'],
    relevantServiceLineSlugs: ['bundle-full-commerce'],
  },
  {
    slug: 'top-live-factory-sea',
    name: 'Top #1 Live Factory SEA',
    icon: '📡',
    whenToDeploy: 'Pitch Bundle 2 vs facility-rental competitors',
    commercialFrame:
      '2,000m² studio, 80+ rooms across HCM/Hà Nội/Manila/Jakarta, 15,000+ hours/month, 100+ trained hosts. No competitor matches the operational depth.',
    dealsClosed: 'Sunhouse weekly cadence, Cocoon Tết campaign, Coolmate ongoing',
    resonatesWithPersonaSlugs: ['regional-commerce-director', 'brand-manager'],
    relevantModuleSlugs: ['livestream-commerce'],
    relevantServiceLineSlugs: ['pl2-room-ops-host', 'pl2-mega-production', 'pl2-mega-kol'],
  },
  {
    slug: 'payment-90-to-25',
    name: 'Payment 90d → 25d',
    icon: '💸',
    whenToDeploy: 'Cross-border first meeting; solve cash-flow objection',
    commercialFrame:
      'Automated paperwork — payment cycle shortened from 90 days to 25 days. Removes the cash-flow objection that kills creator retention in cross-border affiliate programs.',
    dealsClosed: 'Romand SEA entry, OMUSE market entry, Korean beauty mid-tier expansions',
    resonatesWithPersonaSlugs: ['country-gm'],
    relevantModuleSlugs: ['affiliate-marketing'],
    relevantServiceLineSlugs: ['pl1-pure-commission', 'pl1-comm-sample'],
  },
  {
    slug: 'fraud-detection-bigdata',
    name: 'Fraud Detection · Big Data',
    icon: '🛡️',
    whenToDeploy: 'Brand-safety objection from MNC procurement',
    commercialFrame:
      'Passio App auto-detects and removes fake engagement. Live moderation. Brand safety guaranteed at scale — solves the #1 objection from MNC procurement on creator-led commerce.',
    dealsClosed: "CeraVe (parent unlock), Reckitt regional pilot, Kiehl's Y2 renewal",
    resonatesWithPersonaSlugs: ['brand-manager'],
    relevantModuleSlugs: ['brand-advocacy', 'affiliate-marketing'],
    relevantServiceLineSlugs: ['branded-content-at-scale', 'pl1-comm-sample'],
  },
];
