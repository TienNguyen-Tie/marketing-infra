import type { PortfolioAccount } from './types';

export const PORTFOLIO_ACCOUNTS: PortfolioAccount[] = [

  /* ════════════════════════════════════════════════════════════
     L'ORÉAL VN — CONSUMER PRODUCTS
  ════════════════════════════════════════════════════════════ */
  {
    slug: 'loreal-vn-consumer',
    name: "L'Oréal VN — Consumer Products",
    initials: 'LO',
    category: 'beauty',
    categoryLabel: 'Beauty & Personal Care',
    parentCompany: "L'Oréal Vietnam",
    parentSlug: 'loreal-vn',
    categoryName: 'Consumer Products',
    categorySlug: 'consumer-products',
    isGeneralCategory: false,
    industry: 'Beauty / Personal Care',
    market: 'VN',
    sizeTier: 'mnc',
    sizeTierLabel: 'MNC',
    parentEntity: "L'Oréal Group",
    engagedSince: 'Jan 2024',
    primaryBU: 'direct-brand',
    icpSlug: 'mnc-global',
    icpLabel: 'MNC / Global',
    icpVerified: true,
    icpRationale: 'Multi-brand parent with regional HQ. Structured procurement, sustained commerce investment, fits the MNC playbook across consumer brands.',
    totalGmvLabel: '$8M+',
    version: 'v2026',
    lastVerified: '2d ago',

    keyContacts: [
      { name: 'Linh Nguyen', role: 'Marketing Director · approves all brand spend', personaSlug: 'minh-mnc', personaLabel: 'Minh-MNC', isPrimary: true },
      { name: 'Quang Tran', role: 'Head of Commerce · cross-brand TikTok lead', personaSlug: 'hung-ecom', personaLabel: 'Hung-Ecom' },
      { name: 'Mai Pham', role: 'TikTok Shop Manager · procurement contact', personaSlug: 'hung-ecom', personaLabel: 'Hung-Ecom' },
    ],

    brands: [
      { id: 'loreal-paris', name: "L'Oréal Paris", status: 'active' },
      { id: 'maybelline', name: 'Maybelline', status: 'active' },
      { id: 'garnier', name: 'Garnier', status: 'active' },
    ],

    projects: [
      /* ── L'Oréal Paris — 1 full case ── */
      {
        slug: 'tet-2024-livestream-series',
        name: 'Tet 2024 Livestream Series',
        brandSlug: 'loreal-paris',
        brandName: "L'Oréal Paris",
        type: 'full-case',
        period: 'Jan – Feb 2024',
        services: ['P1', 'P4'],
        outcomeHeadline: '3× GMV vs Q4 baseline · 800+ sessions',
        goals: [
          'Dominate beauty GMV during Tet peak window',
          "Establish L'Oréal Paris as a daily BAU livestream brand",
          'Win beauty category on TikTok Shop for Tet week',
        ],
        painPoints: [
          'No in-house live operation to handle peak volume',
          'Premium brand requires brand-safe studio environment',
          'Short runway from brief to launch — 6 weeks',
        ],
        deployedServices: [
          { code: 'P1', detail: 'daily BAU studio + campaign peak scaling', bu: 'direct-brand', since: 'Jan 2024' },
          { code: 'P4', detail: 'Spark Ads + GMV Max for livestream traffic', bu: 'direct-brand', since: 'Jan 2024' },
        ],
        approachReasoning: 'Tet requires traffic surge that organic livestream reach cannot deliver alone. P4 was introduced simultaneously with P1 launch — against our usual P1-first sequencing — because the campaign window was too short to ramp separately.',
        outcomeMetrics: [
          { value: '3×', label: 'GMV vs Q4', source: 'TikTok Shop analytics' },
          { value: '800+', label: 'Sessions', source: 'Internal ops log' },
          { value: '6 wks', label: 'Brief to live', source: 'Project timeline' },
        ],
        narrativeOutcomes: [
          {
            type: 'recognition',
            text: "Referenced as TikTok Vietnam Tet commerce case study. L'Oréal Paris team used this as the benchmark brief for all subsequent seasonal campaigns.",
          },
        ],
        patterns: [
          {
            id: 'lo-p01',
            title: 'Tet window requires parallel P1+P4 launch, not sequential',
            appliesTo: 'Any seasonal campaign with <8 weeks runway',
            insight: 'The standard P1-first, P4-at-60-days sequencing breaks for short-window campaigns. Tet, 11.11, and 8.8 all need P4 live from day 1. Budget the parallel ramp cost into the proposal.',
          },
          {
            id: 'lo-p02',
            title: 'Studio volume should be pre-built 2 weeks before Tet peak',
            appliesTo: 'Premium brands running Tet campaigns on P1',
            insight: 'Ramping studio capacity during Tet week itself is too late — host availability and studio slots are locked by competitors. Build the peak capacity at T-14 days minimum.',
          },
          {
            id: 'lo-p03',
            title: 'Premium beauty brands need host audition, not just briefing',
            appliesTo: "L'Oréal Paris and La Roche-Posay projects",
            insight: "Mass-market hosts underperform for premium beauty. The brand team notices and escalates. Run a 3-day host audition with recorded demos before any premium brand P1 launch.",
          },
        ],
        tagClusters: [
          { category: 'industry', label: 'Industry', tags: ['Beauty', 'Premium', 'Seasonal'] },
          { category: 'geography', label: 'Geography', tags: ['Vietnam', 'Tet'] },
          { category: 'service-combo', label: 'Service combo', tags: ['P1+P4', 'Parallel launch', 'BAU + campaign'] },
          { category: 'outcome-type', label: 'Outcome', tags: ['3× GMV', 'Peak commerce', 'Category win'] },
        ],
        linkedEntities: [
          { kind: 'account', slug: 'loreal-vn-consumer', label: "L'Oréal VN — Consumer Products" },
          { kind: 'icp', slug: 'mnc-global', label: 'MNC / Global' },
          { kind: 'service', slug: 'p1-livestream-commerce', label: 'P1 Livestream' },
          { kind: 'service', slug: 'p4-performance-media', label: 'P4 Performance Media' },
        ],
        version: 'v2026',
        lastVerified: '2d ago',
        projectObjective: "Drive peak GMV for L'Oréal Paris during Tet 2024 — target 3× Q4 2023 baseline within a 6-week window from brief to campaign close.",
        concept: 'Expert-meets-gifting format. Beauty expert hosts paired with Tet-themed product bundles and gifting mechanics. Positioned as "your Tet beauty ritual" — not a sale event.',
        contentStrategy: 'Daily BAU streams with 3-hour extended peak slots during Tet week. Spark Ads traffic driven into peak sessions. GMV Max running throughout to capture high-intent re-engagers.',
        timeline: [
          { milestone: 'Brief received', date: 'Dec 2023' },
          { milestone: 'Studio + host onboarding', date: 'Jan W1 2024' },
          { milestone: 'BAU launch', date: 'Jan W2 2024' },
          { milestone: 'Tet peak week', date: 'Feb W1 2024' },
          { milestone: 'Wrap + reporting', date: 'Feb W3 2024' },
        ],
        targetAudience: 'Vietnamese women 25–45, beauty-interested, mid-to-premium income bracket, active TikTok users with prior beauty purchase intent.',
        audienceReached: '2.4M unique viewers across campaign window. 68% female, 25–44 bracket. 34% repeat viewers across multiple sessions. 12% add-to-cart rate on peak day.',
        kpis: [
          { name: 'GMV vs Q4 baseline', target: '1×', achieved: '3×', met: true },
          { name: 'Sessions delivered', target: '200', achieved: '800+', met: true },
          { name: 'Brief to launch', target: '8 weeks', achieved: '6 weeks', met: true },
          { name: 'Peak day GMV', target: '$150K', achieved: '$220K', met: true },
        ],
      },

      /* ── Maybelline — 1 full case + 1 adhoc ── */
      {
        slug: 'maybelline-summer-launch-q2',
        name: 'Summer Launch Q2 2024',
        brandSlug: 'maybelline',
        brandName: 'Maybelline',
        type: 'full-case',
        period: 'Apr – Jun 2024',
        services: ['P1', 'P3'],
        outcomeHeadline: '180% above GMV target · new product TikTok entry',
        goals: [
          'Launch new foundation range on TikTok Shop',
          'Establish Maybelline as a top-3 beauty brand on TikTok VN',
        ],
        painPoints: [
          'No prior TikTok Shop presence for Maybelline VN',
          'Competitive beauty category with established incumbents',
        ],
        deployedServices: [
          { code: 'P1', detail: 'BAU studio + affiliate KOL host program', bu: 'direct-brand', since: 'Apr 2024' },
          { code: 'P3', detail: 'TikTok Shop setup + affiliate program management', bu: 'direct-brand', since: 'Apr 2024' },
        ],
        approachReasoning: 'For a brand entering TikTok Shop with no prior presence, P1+P3 together is the fastest path to GMV — P3 builds the shop infrastructure and affiliate network while P1 drives the traffic that converts.',
        outcomeMetrics: [
          { value: '180%', label: 'Above GMV target', source: 'TikTok Shop dashboard' },
          { value: 'Top 3', label: 'Beauty brand rank', source: 'TikTok VN category report' },
        ],
        narrativeOutcomes: [],
        patterns: [
          {
            id: 'may-p01',
            title: 'P1+P3 is the fastest 0→GMV path for TikTok Shop entry',
            appliesTo: 'Any brand entering TikTok Shop for the first time',
            insight: 'P3 alone (shop setup) without P1 traffic produces a live shop with no buyers. P1 without P3 produces viewer intent with nowhere to convert. The pair is non-negotiable for new TikTok Shop launches.',
          },
          {
            id: 'may-p02',
            title: 'Mass-market beauty entry uses affiliate KOL hosts, not celebrity',
            appliesTo: 'Local mass-market beauty brands on P1',
            insight: 'Maybelline pricing and positioning fits affiliate KOL hosts (100K–500K followers) better than celebrity. Higher relatability translates directly to add-to-cart rates.',
          },
        ],
        tagClusters: [
          { category: 'industry', label: 'Industry', tags: ['Beauty', 'Mass-market', 'TikTok Entry'] },
          { category: 'service-combo', label: 'Service combo', tags: ['P1+P3', 'Shop launch', '0 to GMV'] },
          { category: 'outcome-type', label: 'Outcome', tags: ['180% above target', 'Category rank', 'New brand entry'] },
        ],
        linkedEntities: [
          { kind: 'account', slug: 'loreal-vn-consumer', label: "L'Oréal VN — Consumer Products" },
          { kind: 'service', slug: 'p1-livestream-commerce', label: 'P1 Livestream' },
          { kind: 'service', slug: 'p3-tiktok-shop-partner', label: 'P3 TikTok Shop' },
        ],
        version: 'v2026',
        lastVerified: '5d ago',
        projectObjective: 'Launch Maybelline onto TikTok Shop Vietnam — establish presence and hit 180% of GMV target in first 3 months.',
        concept: 'Mass-market glam format. Affiliate KOL hosts in the 100K–500K follower range. Relatability over celebrity — "real girl" positioning.',
        contentStrategy: 'P1 BAU daily + P3 shop affiliate program running simultaneously. Affiliate creators driving traffic into TikTok Shop. Cross-content with shop product pins.',
        timeline: [
          { milestone: 'Shop setup + affiliate onboarding', date: 'Apr W1 2024' },
          { milestone: 'Soft launch', date: 'Apr W3 2024' },
          { milestone: 'Full campaign', date: 'May 2024' },
          { milestone: 'Q2 reporting', date: 'Jun 2024' },
        ],
        targetAudience: 'Women 18–35, mass-market beauty, price-sensitive, heavy TikTok users.',
        audienceReached: 'Reached 1.8M unique viewers. 72% female 18–34. Top-3 beauty brand on TikTok Shop within 60 days of launch.',
        kpis: [
          { name: 'GMV vs target', target: '100%', achieved: '180%', met: true },
          { name: 'TikTok Shop rank', target: 'Top 5', achieved: 'Top 3', met: true },
        ],
      },

      {
        slug: 'maybelline-1111-flash-sale',
        name: '11.11 Flash Sale Stream',
        brandSlug: 'maybelline',
        brandName: 'Maybelline',
        type: 'adhoc',
        period: 'Nov 2024',
        services: ['P1'],
        outcomeHeadline: '6hr flash sale executed on-time',
        briefNote: 'One-off 6-hour flash sale livestream for 11.11 sale event. Used existing BAU studio and host roster — no new build required.',
        outcomeNote: 'Executed on schedule. GMV tracked but not separately reported. Used as benchmark for 12.12 planning.',
      },

      /* ── Garnier — 1 adhoc ── */
      {
        slug: 'garnier-affiliate-seeding-test',
        name: 'Affiliate Seeding Test — Vitamin C',
        brandSlug: 'garnier',
        brandName: 'Garnier',
        type: 'adhoc',
        period: 'Sep 2024',
        services: ['P5'],
        outcomeHeadline: 'Seeding test completed · informed Q4 full program',
        briefNote: 'Small-scale affiliate seeding test on Garnier Vitamin C range. 40 KOCs, 2-week window, commission-only structure. Used to validate category interest before committing to full P2 program.',
        outcomeNote: 'Positive signal — 34/40 KOCs produced content. Results briefed Q4 full UGC program. No GMV target on test.',
      },
    ],

    accountBrief: {
      goals: [
        'Build scalable TikTok commerce capability across all 3 consumer brands by end of 2024',
        'Establish daily BAU livestream as the standard operating model for every brand',
        'Win market leadership in beauty on TikTok Shop Vietnam',
      ],
      painPoints: [
        'No in-house livestream operation — fully dependent on external partners',
        'Long procurement cycles slow campaign activation across brands',
        'Each brand has different brand-safety requirements, making shared resources difficult to manage',
      ],
    },
    accountSolution: {
      servicesOverview: 'P1 anchors every new brand. P4 layers in at 60 days. P2 and P3 deployed selectively based on brand stage and TikTok Shop maturity.',
      reasoning: 'We operate as a multi-brand livestream factory — separate host pools, separate content calendars, unified procurement management. MNC scale requires performance media (P4) to be non-negotiable. P2 is deployed for launch moments that need authentic creator advocacy rather than paid placement.',
    },
    accountOutcomes: {
      metrics: [
        { value: '$8M+', label: 'Total GMV', source: 'Annual contract data' },
        { value: '3', label: 'Brands activated', source: 'Internal ops log' },
        { value: '2024', label: 'Winning Agency', source: 'TikTok Vietnam recognition' },
      ],
      narrative: "2024 Winning Agency recognition. Cited by TikTok Vietnam as the model multi-brand commerce operation in the beauty category. L'Oréal Paris Tet case referenced in TikTok regional playbook.",
    },
    accountPatterns: [
      {
        id: 'lo-acc-01',
        title: "All L'Oréal brands start P1 before layering P4 — no exceptions",
        appliesTo: "Observed across L'Oréal Paris, Maybelline, La Roche-Posay",
        insight: "Proposing P4 to a new L'Oréal brand before P1 BAU is established stalls procurement. Always sequence P1 first, introduce P4 at the 60-day mark — except for short seasonal windows.",
      },
      {
        id: 'lo-acc-02',
        title: 'Procurement approval requires 8+ weeks regardless of brand',
        appliesTo: "All L'Oréal brands — even when brand team wants to move faster",
        insight: "The bottleneck is L'Oréal Group legal and procurement, not the brand team. Build 8-week buffer into every new project kickoff timeline. Never promise earlier.",
      },
      {
        id: 'lo-acc-03',
        title: 'Each brand needs its own host pool — cross-brand sharing dilutes voice',
        appliesTo: 'All multi-brand MNC accounts with 3+ brands',
        insight: 'Maybelline (mass-glam) vs La Roche-Posay (derma-science) require completely different host profiles. Separate host rosters, separate content calendars. Budget efficiency from shared hosts is outweighed by conversion loss.',
      },
    ],

    tagClusters: [
      { category: 'industry', label: 'Industry', tags: ['Beauty', 'Personal Care', 'Premium', 'Mass-market'] },
      { category: 'geography', label: 'Geography', tags: ['Vietnam', 'MNC-managed'] },
      { category: 'size-type', label: 'Account type', tags: ['MNC', '3 brands', 'Group procurement', 'Regional HQ'] },
      { category: 'service-combo', label: 'Services ever used', tags: ['P1', 'P2', 'P3', 'P4', 'P5'] },
      { category: 'outcome-type', label: 'Outcome class', tags: ['$8M+ GMV', 'Award winner', 'Category leader'] },
      { category: 'bu-coverage', label: 'BU', tags: ['Direct Brand primary', 'Affiliate secondary'] },
    ],

    linkedEntities: [
      { kind: 'icp', slug: 'mnc-global', label: 'MNC / Global' },
      { kind: 'persona', slug: 'minh-mnc', label: 'Minh-MNC' },
      { kind: 'persona', slug: 'hung-ecom', label: 'Hung-Ecom' },
      { kind: 'account', slug: 'unilever-vn-beauty', label: 'Unilever VN — Beauty & Wellbeing' },
      { kind: 'account', slug: 'pampers', label: 'Pampers' },
    ],
  },

  /* ════════════════════════════════════════════════════════════
     L'ORÉAL VN — ACTIVE COSMETICS
  ════════════════════════════════════════════════════════════ */
  {
    slug: 'loreal-vn-active',
    name: "L'Oréal VN — Active Cosmetics",
    initials: 'LA',
    category: 'beauty',
    categoryLabel: 'Beauty & Personal Care',
    parentCompany: "L'Oréal Vietnam",
    parentSlug: 'loreal-vn',
    categoryName: 'Active Cosmetics',
    categorySlug: 'active-cosmetics',
    isGeneralCategory: false,
    industry: 'Beauty / Clinical',
    market: 'VN',
    sizeTier: 'mnc',
    sizeTierLabel: 'MNC',
    parentEntity: "L'Oréal Group",
    engagedSince: 'Jan 2024',
    primaryBU: 'direct-brand',
    icpSlug: 'mnc-global',
    icpLabel: 'MNC / Global',
    icpVerified: true,
    icpRationale: 'Active Cosmetics division operates with distinct procurement and ROAS accountability separate from Consumer division.',
    totalGmvLabel: '140% ROAS',
    version: 'v2026',
    lastVerified: '1w ago',

    keyContacts: [],

    brands: [
      { id: 'la-roche-posay', name: 'La Roche-Posay', status: 'active', contractedServices: ['P1', 'P4'] },
    ],

    projects: [
      /* ── La Roche-Posay — 1 full case ── */
      {
        slug: 'lrp-derma-expert-series-q3',
        name: 'Derma Expert Series Q3',
        brandSlug: 'la-roche-posay',
        brandName: 'La Roche-Posay',
        type: 'full-case',
        period: 'Jul – Sep 2024',
        services: ['P1', 'P4'],
        outcomeHeadline: '140% ROAS · expert-led format established',
        goals: [
          'Establish La Roche-Posay on TikTok Shop as a science-led brand',
          'Achieve 130%+ ROAS target set by regional HQ',
        ],
        painPoints: [
          'Derma category requires credentialed hosts — not lifestyle',
          'Brand safety requirements stricter than mass-market brands',
        ],
        deployedServices: [
          { code: 'P1', detail: 'Dermatologist-presenter livestream format', bu: 'direct-brand', since: 'Jul 2024' },
          { code: 'P4', detail: 'Targeted performance media to skin-concern audiences', bu: 'direct-brand', since: 'Jul 2024' },
        ],
        approachReasoning: 'La Roche-Posay requires medical credibility in livestream. We sourced dermatologist and pharmacist hosts rather than beauty influencers. This narrowed the host pool but lifted conversion rate significantly.',
        outcomeMetrics: [
          { value: '140%', label: 'ROAS achieved', source: 'TikTok ads dashboard' },
          { value: '2.3×', label: 'vs lifestyle hosts', source: 'A/B test Q3' },
        ],
        narrativeOutcomes: [
          {
            type: 'recognition',
            text: 'La Roche-Posay regional HQ cited VN as model market for expert-led livestream format. Format now being rolled to ID and TH.',
          },
        ],
        patterns: [
          {
            id: 'lrp-p01',
            title: 'Derma brands require credentialed hosts — lifestyle hosts underperform by 2×',
            appliesTo: 'Any pharma or clinical skincare brand on P1',
            insight: 'Dermatologist and pharmacist hosts achieve 2.3× better conversion than lifestyle beauty hosts for clinical skincare. The host sourcing process takes 3× longer — budget for it.',
          },
        ],
        tagClusters: [
          { category: 'industry', label: 'Industry', tags: ['Beauty', 'Derma', 'Clinical skincare'] },
          { category: 'service-combo', label: 'Service combo', tags: ['P1+P4', 'Expert host', 'Credentialed format'] },
          { category: 'outcome-type', label: 'Outcome', tags: ['140% ROAS', 'Format established', 'Regional model'] },
        ],
        linkedEntities: [
          { kind: 'account', slug: 'loreal-vn-active', label: "L'Oréal VN — Active Cosmetics" },
          { kind: 'service', slug: 'p1-livestream-commerce', label: 'P1 Livestream' },
          { kind: 'service', slug: 'p4-performance-media', label: 'P4 Performance Media' },
        ],
        version: 'v2026',
        lastVerified: '1w ago',
        projectObjective: 'Establish La Roche-Posay on TikTok Shop as a science-led derma brand — achieve 130%+ ROAS set by regional HQ.',
        concept: 'Dermatologist-presenter format. Credentialed hosts (dermatologists and pharmacists) replacing lifestyle beauty influencers. Science-first positioning.',
        contentStrategy: 'Expert livestream slots 3× per week. P4 targeted at skin-concern audience segments (acne, sensitive, anti-aging). A/B tested expert vs lifestyle host — expert won 2.3×.',
        timeline: [
          { milestone: 'Host sourcing + audition', date: 'Jun 2024' },
          { milestone: 'Pilot stream (2 sessions)', date: 'Jul W1 2024' },
          { milestone: 'Full program launch', date: 'Jul W3 2024' },
          { milestone: 'Q3 reporting', date: 'Sep 2024' },
        ],
        targetAudience: 'Women 25–45 with active skin concerns (acne, sensitivity, anti-aging). Higher income bracket, research-before-purchase behavior.',
        audienceReached: '890K unique viewers. 78% female 25–44. 62% of buyers were first-time La Roche-Posay purchasers on TikTok Shop.',
        kpis: [
          { name: 'ROAS', target: '130%', achieved: '140%', met: true },
          { name: 'vs lifestyle hosts', target: '—', achieved: '2.3×', met: true },
          { name: 'New customer rate', target: '50%', achieved: '62%', met: true },
        ],
      },
    ],

    accountBrief: {
      goals: [
        'Establish La Roche-Posay as science-led derma brand on TikTok Shop',
        'Scale expert-led livestream format across pharma-adjacent brands',
      ],
      painPoints: [
        'Credentialed host sourcing is 3× slower than lifestyle hosts',
        'Regional HQ ROAS targets are non-negotiable — no brand-only metrics accepted',
      ],
    },
    accountSolution: {
      servicesOverview: 'P1 with credentialed hosts (dermatologists/pharmacists). P4 targeted at skin-concern audience segments.',
      reasoning: 'Derma category requires trust signals that lifestyle hosts cannot provide. Expert hosting produces 2.3× better conversion despite narrower host pool.',
    },
    accountOutcomes: {
      metrics: [
        { value: '140%', label: 'ROAS vs 130% target', source: 'TikTok ads dashboard' },
        { value: 'Regional model', label: 'Expert-led format', source: "L'Oréal regional HQ" },
      ],
      narrative: "La Roche-Posay VN cited by regional HQ as model market for expert-led livestream. Format rolling to ID and TH.",
    },
    accountPatterns: [],

    tagClusters: [
      { category: 'industry', label: 'Industry', tags: ['Beauty', 'Derma', 'Clinical skincare'] },
      { category: 'service-combo', label: 'Services used', tags: ['P1', 'P4'] },
      { category: 'outcome-type', label: 'Outcome class', tags: ['140% ROAS', 'Regional model', 'Expert format'] },
    ],

    linkedEntities: [
      { kind: 'icp', slug: 'mnc-global', label: 'MNC / Global' },
      { kind: 'persona', slug: 'minh-mnc', label: 'Minh-MNC' },
    ],
  },

  /* ════════════════════════════════════════════════════════════
     UNILEVER VN — BEAUTY & WELLBEING
  ════════════════════════════════════════════════════════════ */
  {
    slug: 'unilever-vn-beauty',
    name: 'Unilever VN — Beauty & Wellbeing',
    initials: 'UV',
    category: 'beauty',
    categoryLabel: 'Beauty & Personal Care',
    parentCompany: 'Unilever Vietnam',
    parentSlug: 'unilever-vn',
    categoryName: 'Beauty & Wellbeing',
    categorySlug: 'beauty-wellbeing',
    isGeneralCategory: false,
    industry: 'Beauty / FMCG',
    market: 'VN',
    sizeTier: 'mnc',
    sizeTierLabel: 'MNC',
    parentEntity: 'Unilever Group',
    engagedSince: 'Feb 2024',
    primaryBU: 'direct-brand',
    icpSlug: 'mnc-global',
    icpLabel: 'MNC / Global',
    icpVerified: true,
    icpRationale: 'Multi-brand FMCG MNC with established procurement. Commerce investment across beauty and home care fits the MNC playbook.',
    totalGmvLabel: '$8M+',
    version: 'v2026',
    lastVerified: '1w ago',
    keyContacts: [],
    brands: [
      { id: 'dove', name: 'Dove', status: 'active' },
      { id: 'sunsilk', name: 'Sunsilk', status: 'active' },
      { id: 'ponds', name: "Pond's", status: 'active' },
    ],
    projects: [
      {
        slug: 'dove-dry-shampoo-launch',
        name: 'Dove Dry Shampoo Launch',
        brandSlug: 'dove',
        brandName: 'Dove',
        type: 'full-case',
        period: 'Mar – Apr 2024',
        services: ['P1', 'P2'],
        outcomeHeadline: 'Category-first dry shampoo launch via creator UGC',
        goals: ['Launch Dove Dry Shampoo as a new category on TikTok'],
        painPoints: ['No category awareness — consumers unfamiliar with dry shampoo format'],
        deployedServices: [
          { code: 'P1', detail: 'Education-led livestream with usage demo', bu: 'direct-brand', since: 'Mar 2024' },
          { code: 'P2', detail: 'Creator seeding for category education', bu: 'direct-brand', since: 'Feb 2024' },
        ],
        approachReasoning: 'P2 seeded 4 weeks before P1 launch to build category awareness. Livestream then converted the educated audience.',
        outcomeMetrics: [{ value: 'Cat. #1', label: 'Dry shampoo on TikTok Shop', source: 'Category report' }],
        narrativeOutcomes: [],
        patterns: [
          {
            id: 'uv-p01',
            title: 'New categories need P2 education before P1 commerce',
            appliesTo: 'Any brand launching a product format unfamiliar to Vietnamese consumers',
            insight: 'Livestream cannot educate and sell simultaneously for unfamiliar formats. Run P2 creator education 4 weeks before P1 launch. The livestream audience arrives already understanding why they need the product.',
          },
        ],
        tagClusters: [
          { category: 'industry', label: 'Industry', tags: ['Beauty', 'Hair Care', 'Category launch'] },
          { category: 'service-combo', label: 'Service combo', tags: ['P1+P2', 'Education-first', 'Category creation'] },
          { category: 'outcome-type', label: 'Outcome', tags: ['Category #1', 'New format launch'] },
        ],
        linkedEntities: [
          { kind: 'account', slug: 'unilever-vn-beauty', label: 'Unilever VN — Beauty & Wellbeing' },
          { kind: 'icp', slug: 'mnc-global', label: 'MNC / Global' },
        ],
        version: 'v2026',
        lastVerified: '1w ago',
        projectObjective: 'Launch Dove Dry Shampoo as a new product format on TikTok — build category awareness before driving commerce.',
        kpis: [
          { name: 'Category rank', target: 'Top 5', achieved: '#1', met: true },
          { name: 'P2 to P1 handoff', target: '4 weeks', achieved: '4 weeks', met: true },
        ],
      },
      {
        slug: 'sunsilk-1111-stream',
        name: '11.11 Sunsilk Stream',
        brandSlug: 'sunsilk',
        brandName: 'Sunsilk',
        type: 'adhoc',
        period: 'Nov 2024',
        services: ['P1'],
        outcomeHeadline: 'Executed on-time · BAU execution',
        briefNote: 'One-off 11.11 stream for Sunsilk. Used existing BAU studio from Dove engagement. 4-hour session, standard promotional format.',
        outcomeNote: 'Executed on schedule. Positive session metrics, no separate GMV reporting. Confirmed BAU capability cross-brand.',
      },
      {
        slug: 'dove-dry-serum-ugc',
        name: 'Dove Dry Serum UGC Program',
        brandSlug: 'dove',
        brandName: 'Dove',
        type: 'full-case',
        period: 'Mar – Apr 2024',
        services: ['P2'],
        outcomeHeadline: '4× UGC target exceeded · 68M views',
        goals: [
          'Launch Dove Dry Serum with authentic creator advocacy',
          'Generate 200 UGC pieces within 6 weeks',
        ],
        painPoints: [
          'New product — no existing creator reviews to seed',
          'Brand required creators to have genuinely tried the product',
        ],
        deployedServices: [
          { code: 'P2', detail: '185 KOC seeding + content program', bu: 'direct-brand', since: 'Mar 2024' },
        ],
        approachReasoning: 'Selected KOCs were screened for existing interest in hair care — not just follower count. Commission-based structure meant only creators who genuinely used the product continued producing content.',
        outcomeMetrics: [
          { value: '400', label: 'UGCs produced', source: 'Campaign tracker' },
          { value: '68M', label: 'Views', source: 'TikTok analytics' },
          { value: '4×', label: 'Target exceeded', source: 'vs 200 UGC brief' },
        ],
        narrativeOutcomes: [
          {
            type: 'recognition',
            text: '2024 Winning Agency citation. Authenticity multiplied reach beyond any paid seeding result in the category that year.',
          },
        ],
        patterns: [
          {
            id: 'lo-p04',
            title: 'Commission-only UGC self-selects for genuine product users',
            appliesTo: 'P2 programs for new product launches',
            insight: 'Paying a flat fee incentivises volume. Commission-only incentivises conversion. For launch UGC, commission-only produces 3–4× better content quality because uncommitted creators drop off early.',
          },
          {
            id: 'lo-p05',
            title: 'Interest-matched KOC seeding outperforms follower-matched',
            appliesTo: 'Beauty UGC programs with genuine product trial requirement',
            insight: 'Filtering the KOC pool by demonstrated interest in the category (prior content, engagement patterns) before follower count produces higher completion rates and better view-through.',
          },
        ],
        tagClusters: [
          { category: 'industry', label: 'Industry', tags: ['Beauty', 'Hair Care', 'UGC'] },
          { category: 'service-combo', label: 'Service combo', tags: ['P2 only', 'KOC seeding', 'Commission-based'] },
          { category: 'outcome-type', label: 'Outcome', tags: ['4× target', '68M views', 'Authenticity-led'] },
        ],
        linkedEntities: [
          { kind: 'account', slug: 'unilever-vn-beauty', label: 'Unilever VN — Beauty & Wellbeing' },
          { kind: 'icp', slug: 'mnc-global', label: 'MNC / Global' },
          { kind: 'service', slug: 'p2-ugc-content', label: 'P2 UGC & Content' },
        ],
        version: 'v2026',
        lastVerified: '2d ago',
        projectObjective: 'Launch Dove Dry Serum with authentic creator UGC — 200 pieces minimum within 6 weeks, genuine product users only.',
        concept: 'Commission-only KOC seeding. Creators screened for existing hair care interest, not follower count. Only creators who genuinely used the product continued producing.',
        contentStrategy: '185 KOCs seeded with physical product. Commission structure self-selected committed creators. No scripted content — brief provided tone direction only.',
        timeline: [
          { milestone: 'Product seeding', date: 'Mar W1 2024' },
          { milestone: 'Content window open', date: 'Mar W2 2024' },
          { milestone: 'Campaign close', date: 'Apr W2 2024' },
          { milestone: 'Reporting', date: 'Apr W3 2024' },
        ],
        targetAudience: 'Women 20–35, hair care interested, moderate income, TikTok-native content consumers.',
        audienceReached: '68.48M views total. 185 KOC participants, 400 UGC pieces produced. Avg view-through rate 4.2× category benchmark.',
        kpis: [
          { name: 'UGC pieces', target: '200', achieved: '400', met: true },
          { name: 'Total views', target: '15M', achieved: '68.48M', met: true },
          { name: 'KOC completion rate', target: '70%', achieved: '97%', met: true },
        ],
      },
    ],
    accountBrief: {
      goals: [
        'Scale TikTok commerce across Dove and Sunsilk simultaneously',
        'Establish category education as a replicable pre-launch motion for new product formats',
      ],
      painPoints: [
        'New product formats require consumer education before purchase intent exists',
        'Multi-brand coordination creates resource contention between BU teams',
      ],
    },
    accountSolution: {
      servicesOverview: 'P2 education seeding deployed 4 weeks before P1 commerce launch. Cross-brand studio time-sharing where brand safety permits.',
      reasoning: 'The P2-first, then P1 sequencing was invented for Dove Dry Shampoo and proved the category education model. Now applied as a standard motion for any Unilever product format unfamiliar to Vietnamese consumers.',
    },
    accountOutcomes: {
      metrics: [
        { value: '$8M+', label: 'Total GMV', source: 'Annual contract data' },
        { value: 'Cat. #1', label: 'Dove Dry Shampoo on TikTok Shop', source: 'Category report' },
      ],
      narrative: 'Category education model proven with Dove Dry Shampoo. Now referenced internally as the playbook for any new-format product launch across the Unilever portfolio.',
    },
    accountPatterns: [],
    tagClusters: [
      { category: 'industry', label: 'Industry', tags: ['Beauty', 'FMCG', 'Multi-brand'] },
      { category: 'service-combo', label: 'Services used', tags: ['P1', 'P2', 'P5'] },
      { category: 'outcome-type', label: 'Outcome class', tags: ['$8M+ GMV', 'Multi-brand scale'] },
    ],
    linkedEntities: [
      { kind: 'icp', slug: 'mnc-global', label: 'MNC / Global' },
      { kind: 'account', slug: 'loreal-vn-consumer', label: "L'Oréal VN — Consumer Products" },
    ],
  },

  /* ════════════════════════════════════════════════════════════
     COCOON — MINIMUM VIABLE
  ════════════════════════════════════════════════════════════ */
  {
    slug: 'cocoon',
    name: 'Cocoon',
    initials: 'Co',
    category: 'beauty',
    categoryLabel: 'Beauty & Personal Care',
    parentCompany: 'Cocoon',
    parentSlug: 'cocoon',
    categoryName: 'Beauty & Personal Care',
    categorySlug: 'beauty',
    isGeneralCategory: true,
    industry: 'Beauty / Indie',
    market: 'VN',
    sizeTier: 'local-indie',
    sizeTierLabel: 'Local Indie',
    engagedSince: 'Jan 2024',
    primaryBU: 'affiliate',
    icpSlug: 'local-indie',
    icpLabel: 'Local Indie',
    icpVerified: true,
    icpRationale: 'Vietnamese-founded indie beauty brand with strong community identity. Affiliate-first model matches budget constraints and brand values.',
    totalGmvLabel: '$2M+',
    version: 'v2026',
    lastVerified: '1w ago',
    keyContacts: [],
    brands: [{ id: 'cocoon-beauty', name: 'Cocoon Beauty', status: 'active', contractedServices: ['P1', 'P2', 'P5'] }],
    projects: [
      {
        slug: 'cocoon-affiliate-growth-2024',
        name: 'Affiliate Growth Program 2024',
        brandSlug: 'cocoon-beauty',
        brandName: 'Cocoon Beauty',
        type: 'full-case',
        period: 'Jan – Dec 2024',
        services: ['P1', 'P2'],
        outcomeHeadline: '0 → 1M followers via affiliate-first creator program',
        goals: ['Grow TikTok following to 1M by year end', 'Build sustainable affiliate creator community'],
        painPoints: ['Limited budget — cannot afford flat-fee macro creators', 'Brand identity needs to feel authentic, not sponsored'],
        deployedServices: [
          { code: 'P1', detail: 'Affiliate-led livestream events with community hosts', bu: 'affiliate', since: 'Jan 2024' },
          { code: 'P2', detail: 'Native UGC creator partnerships on commission model', bu: 'affiliate', since: 'Jan 2024' },
        ],
        approachReasoning: 'Commission-only model self-selects for creators who believe in the product. Combined with livestream events hosted by community members (not hired influencers), the result is authentic content at scale.',
        outcomeMetrics: [
          { value: '1M+', label: 'Followers', source: 'TikTok account analytics' },
          { value: '$2M+', label: 'Tracked GMV', source: 'Affiliate tracking' },
        ],
        narrativeOutcomes: [],
        patterns: [
          {
            id: 'co-p01',
            title: 'Indie brands grow faster with affiliate-commission model than paid UGC',
            appliesTo: 'Local indie beauty brands with sub-$30K monthly creator budgets',
            insight: 'Flat-fee UGC at indie budget levels buys ~5–8 creators/month. Commission-only at the same budget activates 40–60 creators, because you only pay on results. Volume of authentic content beats quality of paid content for follower growth.',
          },
        ],
        tagClusters: [
          { category: 'industry', label: 'Industry', tags: ['Beauty', 'Indie', 'Vietnamese-made'] },
          { category: 'service-combo', label: 'Service combo', tags: ['P1+P2', 'Affiliate model', 'Commission-only'] },
          { category: 'outcome-type', label: 'Outcome', tags: ['1M followers', 'Community-led', 'Organic growth'] },
        ],
        linkedEntities: [
          { kind: 'account', slug: 'cocoon', label: 'Cocoon' },
          { kind: 'icp', slug: 'local-indie', label: 'Local Indie' },
        ],
        version: 'v2026',
        lastVerified: '1w ago',
        projectObjective: 'Grow Cocoon TikTok following to 1M and achieve $2M+ GMV via a commission-only affiliate model — no flat-fee paid creators.',
        kpis: [
          { name: 'Follower count', target: '1M', achieved: '1M+', met: true },
          { name: 'Tracked GMV', target: '$1.5M', achieved: '$2M+', met: true },
        ],
      },
      {
        slug: 'cocoon-tet-boost',
        name: 'Tet Creator Boost',
        brandSlug: 'cocoon-beauty',
        brandName: 'Cocoon Beauty',
        type: 'adhoc',
        period: 'Jan 2025',
        services: ['P5'],
        outcomeHeadline: '3× content volume during Tet week',
        briefNote: 'Tet creator seeding push — 60 KOCs briefed with gifted product. Commission-only, 1-week window. Activated existing creator network.',
        outcomeNote: '3× normal content volume during Tet week. Organic reach boost without additional budget.',
      },
    ],
    accountBrief: {
      goals: [
        'Reach 1M TikTok followers using only commission-based creator economics',
        'Prove that an indie brand with limited budget can achieve sustainable affiliate revenue',
      ],
      painPoints: [
        'No budget for flat-fee macro creators — must rely on commission-only model',
        'Brand identity is authentic and community-led — sponsored content risks destroying it',
      ],
    },
    accountSolution: {
      servicesOverview: 'Commission-only P1 + P2 operating in parallel. Community hosts replace hired influencers across all touchpoints.',
      reasoning: 'For Cocoon, authenticity is the brand. Any creator who feels "paid" breaks the brand equity. Commission-only self-selects for believers — and believers produce content that converts because they mean it.',
    },
    accountOutcomes: {
      metrics: [
        { value: '$2M+', label: 'Tracked GMV', source: 'Affiliate tracking' },
        { value: '1M+', label: 'TikTok followers', source: 'TikTok account analytics' },
      ],
      narrative: 'Proved that the commission-only affiliate model is viable at scale for indie brands. Community-led growth now referenced as the Local Indie ICP playbook.',
    },
    accountPatterns: [],
    tagClusters: [
      { category: 'industry', label: 'Industry', tags: ['Beauty', 'Indie', 'D2C'] },
      { category: 'service-combo', label: 'Services used', tags: ['P1', 'P2', 'P5'] },
      { category: 'outcome-type', label: 'Outcome class', tags: ['1M followers', 'Affiliate growth'] },
    ],
    linkedEntities: [
      { kind: 'icp', slug: 'local-indie', label: 'Local Indie' },
      { kind: 'account', slug: 'bobby', label: 'Bobby' },
    ],
  },

  /* ════════════════════════════════════════════════════════════
     PAMPERS — MINIMUM VIABLE
  ════════════════════════════════════════════════════════════ */
  {
    slug: 'pampers',
    name: 'Pampers',
    initials: 'Pa',
    category: 'mom-kid',
    categoryLabel: 'Mom & Kid',
    parentCompany: 'Pampers',
    parentSlug: 'pampers',
    categoryName: 'Mom & Kid',
    categorySlug: 'mom-kid',
    isGeneralCategory: true,
    industry: 'Mom & Kid / FMCG',
    market: 'VN',
    sizeTier: 'mnc',
    sizeTierLabel: 'MNC',
    parentEntity: 'Procter & Gamble',
    engagedSince: 'Mar 2024',
    primaryBU: 'direct-brand',
    icpSlug: 'mnc-global',
    icpLabel: 'MNC / Global',
    icpVerified: true,
    icpRationale: 'P&G subsidiary with category-leader position. Fits MNC playbook — structured procurement and commerce scale ambition.',
    totalGmvLabel: '$3M+',
    version: 'v2026',
    lastVerified: '1w ago',
    keyContacts: [],
    brands: [{ id: 'pampers-vn', name: 'Pampers VN', status: 'active', contractedServices: ['P1', 'P3'] }],
    projects: [
      {
        slug: 'pampers-tiktok-shop-entry',
        name: 'TikTok Shop Category Entry',
        brandSlug: 'pampers-vn',
        brandName: 'Pampers VN',
        type: 'full-case',
        period: 'Mar – Jun 2024',
        services: ['P1', 'P3'],
        outcomeHeadline: 'First parenting brand to scale on TikTok Shop VN',
        goals: ['Establish Pampers as TikTok Shop category leader for diapers'],
        painPoints: ['No category precedent — parenting products not proven on TikTok Shop VN'],
        deployedServices: [
          { code: 'P3', detail: 'TikTok Shop storefront + certification badges', bu: 'direct-brand', since: 'Mar 2024' },
          { code: 'P1', detail: 'Expert-parent hosted livestream sessions', bu: 'direct-brand', since: 'Apr 2024' },
        ],
        approachReasoning: 'P3 storefront launched 3 weeks before first P1 session to establish shop credibility. Parent-credentialed hosts used throughout.',
        outcomeMetrics: [{ value: 'Cat. #1', label: 'Diapers on TikTok Shop VN', source: 'Category report Q2' }],
        narrativeOutcomes: [],
        patterns: [
          {
            id: 'pa-p01',
            title: 'Mom category hosts must be credible parents, not just lifestyle creators',
            appliesTo: 'Baby care and parenting brands on P1',
            insight: 'Viewers in the parenting category verify host credibility by looking for genuine parent signals — children visible, lived experience referenced. Lifestyle hosts without parent signals produce 40–50% lower add-to-cart rates.',
          },
        ],
        tagClusters: [
          { category: 'industry', label: 'Industry', tags: ['Mom & Kid', 'Diapers', 'TikTok entry'] },
          { category: 'service-combo', label: 'Service combo', tags: ['P1+P3', 'Expert-parent host', 'Shop first'] },
          { category: 'outcome-type', label: 'Outcome', tags: ['Category #1', 'First mover'] },
        ],
        linkedEntities: [
          { kind: 'account', slug: 'pampers', label: 'Pampers' },
          { kind: 'icp', slug: 'mnc-global', label: 'MNC / Global' },
        ],
        version: 'v2026',
        lastVerified: '1w ago',
        projectObjective: 'Establish Pampers as the first parenting brand to scale on TikTok Shop VN — no category precedent, build from zero.',
        kpis: [
          { name: 'Category rank', target: 'Top 3', achieved: '#1', met: true },
          { name: 'Shop setup to first P1', target: '4 weeks', achieved: '3 weeks', met: true },
        ],
      },
      {
        slug: 'pampers-mid-year-stream',
        name: 'Mid-Year Promo Stream',
        brandSlug: 'pampers-vn',
        brandName: 'Pampers VN',
        type: 'adhoc',
        period: 'Jun 2024',
        services: ['P1'],
        outcomeHeadline: 'Mid-year promo executed · results recorded',
        briefNote: 'Mid-year promotion stream, 4 hours, BAU execution. Standard promotional mechanics — bundle deals, flash price drops.',
        outcomeNote: 'Executed on schedule. Session results recorded and used in Q3 planning benchmark.',
      },
    ],
    accountBrief: {
      goals: [
        'Become category leader in diapers on TikTok Shop VN with no prior TikTok presence',
        'Prove TikTok Shop viability for the parenting category — no brand had done it at scale',
      ],
      painPoints: [
        'No category precedent for parenting products on TikTok Shop VN',
        'MNC procurement adds 6–8 weeks to any new vendor engagement',
      ],
    },
    accountSolution: {
      servicesOverview: 'P3 shop setup first (3 weeks ahead of P1 launch). Expert-parent hosts selected over lifestyle creators throughout.',
      reasoning: 'P3 storefront credibility signals matter in the parenting category — parents check shop ratings and certification badges. Leading with P3 built that credibility layer before the first livestream session.',
    },
    accountOutcomes: {
      metrics: [
        { value: 'Cat. #1', label: 'Diapers on TikTok Shop VN', source: 'Category report Q2' },
        { value: '$3M+', label: 'GMV achieved', source: 'TikTok Shop dashboard' },
      ],
      narrative: 'First parenting brand to achieve category leadership on TikTok Shop VN. The P3-first sequencing is now recommended as standard for all parenting category entries.',
    },
    accountPatterns: [],
    tagClusters: [
      { category: 'industry', label: 'Industry', tags: ['Mom & Kid', 'Diapers', 'MNC'] },
      { category: 'service-combo', label: 'Services used', tags: ['P1', 'P3'] },
      { category: 'outcome-type', label: 'Outcome class', tags: ['Category leader', 'First mover'] },
    ],
    linkedEntities: [
      { kind: 'icp', slug: 'mnc-global', label: 'MNC / Global' },
      { kind: 'account', slug: 'friso', label: 'Friso' },
    ],
  },

  /* ════════════════════════════════════════════════════════════
     FRISO — MINIMUM VIABLE
  ════════════════════════════════════════════════════════════ */
  {
    slug: 'friso',
    name: 'Friso',
    initials: 'Fr',
    category: 'mom-kid',
    categoryLabel: 'Mom & Kid',
    parentCompany: 'Friso',
    parentSlug: 'friso',
    categoryName: 'Mom & Kid',
    categorySlug: 'mom-kid',
    isGeneralCategory: true,
    industry: 'Mom & Kid / Premium Dairy',
    market: 'VN',
    sizeTier: 'mnc',
    sizeTierLabel: 'MNC',
    parentEntity: 'FrieslandCampina',
    engagedSince: 'May 2024',
    primaryBU: 'direct-brand',
    icpSlug: 'mnc-global',
    icpLabel: 'MNC / Global',
    icpVerified: true,
    icpRationale: 'Premium FMCG MNC with ROAS accountability. Performance-first mandate and structured procurement fit the MNC playbook.',
    totalGmvLabel: '2.5× ROAS',
    version: 'v2026',
    lastVerified: '1w ago',
    keyContacts: [],
    brands: [{ id: 'friso-vn', name: 'Friso VN', status: 'active', contractedServices: ['P4'] }],
    projects: [
      {
        slug: 'friso-performance-media-q3',
        name: 'Performance Media Q3 2024',
        brandSlug: 'friso-vn',
        brandName: 'Friso VN',
        type: 'full-case',
        period: 'Jul – Sep 2024',
        services: ['P4'],
        outcomeHeadline: '2.5× ROAS benchmark for premium dairy via P4',
        goals: ['Achieve 2× ROAS target on premium dairy formula'],
        painPoints: ['High-consideration purchase — standard retargeting insufficient', 'Regulatory constraints on creative messaging'],
        deployedServices: [
          { code: 'P4', detail: 'Parent-intent audience segmentation + premium-targeted Meta/TikTok', bu: 'direct-brand', since: 'Jul 2024' },
        ],
        approachReasoning: 'Household income and urban area signals layered with parent-intent behavioural data produced a tightly qualified audience. Regulatory constraints on formula advertising required creative workarounds approved in advance.',
        outcomeMetrics: [
          { value: '2.5×', label: 'ROAS achieved', source: 'Ads manager report' },
          { value: '35%', label: 'CPA reduction', source: 'vs previous campaign benchmark' },
        ],
        narrativeOutcomes: [],
        patterns: [
          {
            id: 'fr-p01',
            title: 'Premium dairy ROAS responds strongly to parent-intent audience targeting',
            appliesTo: 'Premium infant formula brands with strict targeting requirements',
            insight: 'Household income signals + urban area + parent-intent behaviour reduces CPA by 30–40% vs generic parenting audiences. The premium positioning justifies the narrow targeting — CPM is higher but conversion rate more than compensates.',
          },
        ],
        tagClusters: [
          { category: 'industry', label: 'Industry', tags: ['Mom & Kid', 'Premium Dairy', 'High-consideration'] },
          { category: 'service-combo', label: 'Service combo', tags: ['P4 only', 'Performance-first', 'ROAS benchmark'] },
          { category: 'outcome-type', label: 'Outcome', tags: ['2.5× ROAS', '35% CPA reduction'] },
        ],
        linkedEntities: [
          { kind: 'account', slug: 'friso', label: 'Friso' },
          { kind: 'icp', slug: 'mnc-global', label: 'MNC / Global' },
        ],
        version: 'v2026',
        lastVerified: '1w ago',
        projectObjective: 'Hit 2× ROAS benchmark for Friso premium dairy via parent-intent audience targeting — with regulatory-compliant creative.',
        kpis: [
          { name: 'ROAS', target: '2×', achieved: '2.5×', met: true },
          { name: 'CPA reduction vs prior', target: '20%', achieved: '35%', met: true },
        ],
      },
      {
        slug: 'friso-kol-seeding-test',
        name: 'KOL Seeding Test — New Line',
        brandSlug: 'friso-vn',
        brandName: 'Friso VN',
        type: 'adhoc',
        period: 'Oct 2024',
        services: ['P2'],
        outcomeHeadline: 'Seeding test run · informed Q4 plan',
        briefNote: '20 KOL micro-seeding test for new Friso product line. Commission model, 3-week window. Used to validate creator appetite before committing to full P2 program.',
        outcomeNote: 'Mixed results — 14/20 KOLs produced. Briefed Q4 plan, full program deferred to Q1 2025.',
      },
    ],
    accountBrief: {
      goals: [
        'Achieve 2× ROAS on premium dairy formula — MNC accountability standard',
        'Reduce CPA by optimising targeting rather than increasing spend',
      ],
      painPoints: [
        'Regulatory constraints on formula advertising limit creative messaging options',
        'High-consideration purchase — standard retargeting produces poor conversion rates',
      ],
    },
    accountSolution: {
      servicesOverview: 'P4 only — parent-intent behavioural audience + household income signals. Regulatory-approved creative brief pre-cleared before production.',
      reasoning: 'Premium dairy is a high-CPM, high-consideration category. Narrow targeting beats broad targeting because the conversion rate differential more than compensates for the higher CPM. The regulatory constraint on creative actually forced tighter audience thinking.',
    },
    accountOutcomes: {
      metrics: [
        { value: '2.5×', label: 'ROAS achieved', source: 'Ads manager report' },
        { value: '35%', label: 'CPA reduction', source: 'vs previous campaign benchmark' },
      ],
      narrative: '2.5× ROAS is the benchmark for premium dairy in VN. Parent-intent segmentation model now applied to all high-consideration Mom & Kid accounts.',
    },
    accountPatterns: [],
    tagClusters: [
      { category: 'industry', label: 'Industry', tags: ['Mom & Kid', 'Premium Dairy', 'MNC'] },
      { category: 'service-combo', label: 'Services used', tags: ['P4', 'P2'] },
      { category: 'outcome-type', label: 'Outcome class', tags: ['2.5× ROAS', 'Performance benchmark'] },
    ],
    linkedEntities: [
      { kind: 'icp', slug: 'mnc-global', label: 'MNC / Global' },
      { kind: 'account', slug: 'pampers', label: 'Pampers' },
    ],
  },

  /* ════════════════════════════════════════════════════════════
     BOBBY — MINIMUM VIABLE
  ════════════════════════════════════════════════════════════ */
  {
    slug: 'bobby',
    name: 'Bobby',
    initials: 'Bo',
    category: 'mom-kid',
    categoryLabel: 'Mom & Kid',
    parentCompany: 'Bobby',
    parentSlug: 'bobby',
    categoryName: 'Mom & Kid',
    categorySlug: 'mom-kid',
    isGeneralCategory: true,
    industry: 'Mom & Kid / Diapers',
    market: 'VN',
    sizeTier: 'local-large',
    sizeTierLabel: 'Local Large',
    engagedSince: 'Jun 2024',
    primaryBU: 'direct-brand',
    icpSlug: 'local-large',
    icpLabel: 'Local Large',
    icpVerified: true,
    icpRationale: 'Vietnamese category leader defending market share. Livestream-first strategy matches defensive positioning and community-trust advantage.',
    totalGmvLabel: 'Category leader',
    version: 'v2026',
    lastVerified: '1w ago',
    keyContacts: [],
    brands: [{ id: 'bobby-vn', name: 'Bobby VN', status: 'active', contractedServices: ['P1'] }],
    projects: [
      {
        slug: 'bobby-brand-storytelling-2024',
        name: 'Brand Storytelling Program 2024',
        brandSlug: 'bobby-vn',
        brandName: 'Bobby VN',
        type: 'full-case',
        period: 'Jun – Dec 2024',
        services: ['P1'],
        outcomeHeadline: 'Category-leader brand storytelling via expert-parent hosting',
        goals: ['Defend category leadership against MNC competitors on TikTok', 'Build brand loyalty through community livestream format'],
        painPoints: ['MNC competitors entering with larger budgets', 'Brand strength is community trust — must preserve it in digital'],
        deployedServices: [
          { code: 'P1', detail: 'Daily BAU story-led livestream with community hosts', bu: 'direct-brand', since: 'Jun 2024' },
        ],
        approachReasoning: 'Bobby\'s advantage is community trust — "Vietnamese brand for Vietnamese families". Livestream format led with brand story and community pride, then product conversion. Not the reverse.',
        outcomeMetrics: [{ value: 'Cat. #1', label: 'Diapers — Vietnamese brand', source: 'TikTok Shop category data' }],
        narrativeOutcomes: [],
        patterns: [
          {
            id: 'bo-p01',
            title: 'Local diapers brand needs local-hero hosts over celebrity for credibility',
            appliesTo: 'Vietnamese local-large brands in commodity categories defending against MNCs',
            insight: "Bobby's community advantage collapses if the host reads as 'aspirational' rather than 'like us'. Choose hosts from Bobby's existing community — mothers who already use the product. Zero paid-creator feeling is the goal.",
          },
        ],
        tagClusters: [
          { category: 'industry', label: 'Industry', tags: ['Mom & Kid', 'Diapers', 'Vietnamese brand'] },
          { category: 'service-combo', label: 'Service combo', tags: ['P1 only', 'Story-led', 'Community hosts'] },
          { category: 'outcome-type', label: 'Outcome', tags: ['Category #1', 'Brand defense', 'Community trust'] },
        ],
        linkedEntities: [
          { kind: 'account', slug: 'bobby', label: 'Bobby' },
          { kind: 'icp', slug: 'local-large', label: 'Local Large' },
        ],
        version: 'v2026',
        lastVerified: '1w ago',
        projectObjective: "Defend Bobby's category leadership against MNC competitors by deploying community-first brand storytelling via daily P1 livestream.",
        kpis: [
          { name: 'Category rank (Vietnamese brand)', target: '#1', achieved: '#1', met: true },
          { name: 'Daily BAU sessions', target: '5/week', achieved: '7/week', met: true },
        ],
      },
      {
        slug: 'bobby-tet-popup',
        name: 'Tet Popup Stream',
        brandSlug: 'bobby-vn',
        brandName: 'Bobby VN',
        type: 'adhoc',
        period: 'Jan 2025',
        services: ['P1'],
        outcomeHeadline: 'Tet popup positive · format tested for 2025 scale',
        briefNote: 'Tet popup stream, 3hrs, gifting mechanic — community members received gifted product kits for Tet. Tested "community gift-back" stream format.',
        outcomeNote: 'Strong engagement, format validated. Community gift-back mechanic to be scaled for 2025 Tet campaign.',
      },
    ],
    accountBrief: {
      goals: [
        "Maintain category #1 position as the leading Vietnamese diaper brand on TikTok",
        'Build community trust through livestream — not just product promotion',
      ],
      painPoints: [
        'MNC competitors entering with larger media budgets',
        "Bobby's advantage is community trust — digital activation risks feeling inauthentic",
      ],
    },
    accountSolution: {
      servicesOverview: "P1 BAU with community hosts — mothers from Bobby's existing customer base, not hired creators.",
      reasoning: "Bobby doesn't compete on production quality. It competes on community trust. Every host decision is filtered through one question: does this person feel like 'one of us' to a Bobby mother?",
    },
    accountOutcomes: {
      metrics: [
        { value: 'Cat. #1', label: 'Vietnamese diaper brand on TikTok', source: 'TikTok Shop category data' },
      ],
      narrative: "Category defense achieved. Bobby maintained #1 position as Vietnamese brand despite MNC competitor entry with larger budgets. Community-first streaming format is now the Bobby brand standard.",
    },
    accountPatterns: [],
    tagClusters: [
      { category: 'industry', label: 'Industry', tags: ['Mom & Kid', 'Diapers', 'Local brand'] },
      { category: 'service-combo', label: 'Services used', tags: ['P1'] },
      { category: 'outcome-type', label: 'Outcome class', tags: ['Category defense', 'Community trust'] },
    ],
    linkedEntities: [
      { kind: 'icp', slug: 'local-large', label: 'Local Large' },
      { kind: 'account', slug: 'sunhouse', label: 'Sunhouse' },
    ],
  },

  /* ════════════════════════════════════════════════════════════
     SUNHOUSE — MINIMUM VIABLE
  ════════════════════════════════════════════════════════════ */
  {
    slug: 'sunhouse',
    name: 'Sunhouse',
    initials: 'Su',
    category: 'home-care',
    categoryLabel: 'Home Care',
    parentCompany: 'Sunhouse',
    parentSlug: 'sunhouse',
    categoryName: 'Home Care',
    categorySlug: 'home-care',
    isGeneralCategory: true,
    industry: 'Home Appliance',
    market: 'VN',
    sizeTier: 'local-large',
    sizeTierLabel: 'Local Large',
    engagedSince: 'Sep 2023',
    primaryBU: 'direct-brand',
    icpSlug: 'local-large',
    icpLabel: 'Local Large',
    icpVerified: true,
    icpRationale: 'Established Vietnamese appliance brand with demonstration-category products. High livestream affinity — products need live demo to convert.',
    totalGmvLabel: '357% GMV uplift',
    version: 'v2026',
    lastVerified: '1w ago',
    keyContacts: [],
    brands: [{ id: 'sunhouse-vn', name: 'Sunhouse VN', status: 'active', contractedServices: ['P1', 'P4'] }],
    projects: [
      {
        slug: 'sunhouse-tiktok-commerce-launch',
        name: 'TikTok Commerce Launch',
        brandSlug: 'sunhouse-vn',
        brandName: 'Sunhouse VN',
        type: 'full-case',
        period: 'Sep – Nov 2023',
        services: ['P1', 'P4'],
        outcomeHeadline: '357% GMV uplift in 3 months · zero to market leader',
        goals: ['Achieve 3× GMV within 90 days', 'Establish Sunhouse as #1 local appliance brand on TikTok Shop'],
        painPoints: ['Starting from zero — no TikTok Shop presence', 'Products require demonstration — static content insufficient'],
        deployedServices: [
          { code: 'P1', detail: 'Demo-heavy BAU livestream with cooking/cleaning hosts', bu: 'direct-brand', since: 'Sep 2023' },
          { code: 'P4', detail: 'GMV Max + Spark Ads from top-performing demo content', bu: 'direct-brand', since: 'Oct 2023' },
        ],
        approachReasoning: '45-day ramp: Day 1–15 studio calibration + host selection. Day 15–30 daily demo sessions organic only. Day 30–45 introduce P4 using top demo content as Spark Ads. GMV inflection at day 38.',
        outcomeMetrics: [
          { value: '357%', label: 'GMV uplift', source: 'TikTok Shop dashboard' },
          { value: '90 days', label: 'To market leader', source: 'Category report' },
        ],
        narrativeOutcomes: [],
        patterns: [
          {
            id: 'su-p01',
            title: 'Local appliance brands need demo-heavy hosts who cook or clean on-stream',
            appliesTo: 'Home appliance and kitchen brands on P1',
            insight: 'Appliance livestream hosts must actually use the product on-stream — not describe it. Hosts who cook real meals or demonstrate cleaning tasks achieve 2–3× the add-to-cart rate of hosts who just present the product. Audition on demonstration skill, not presentation style.',
          },
        ],
        tagClusters: [
          { category: 'industry', label: 'Industry', tags: ['Home Appliance', 'Demo category', 'Vietnamese brand'] },
          { category: 'service-combo', label: 'Service combo', tags: ['P1+P4', '45-day ramp', 'Demo-led'] },
          { category: 'outcome-type', label: 'Outcome', tags: ['357% GMV', 'Zero to leader', '90 days'] },
        ],
        linkedEntities: [
          { kind: 'account', slug: 'sunhouse', label: 'Sunhouse' },
          { kind: 'icp', slug: 'local-large', label: 'Local Large' },
        ],
        version: 'v2026',
        lastVerified: '1w ago',
        projectObjective: 'Launch Sunhouse on TikTok Shop and achieve 3× GMV within 90 days — starting from zero with demo-heavy appliance products.',
        kpis: [
          { name: 'GMV uplift', target: '3×', achieved: '3.57×', met: true },
          { name: 'Time to GMV inflection', target: '45 days', achieved: '38 days', met: true },
        ],
      },
      {
        slug: 'sunhouse-affiliate-test',
        name: 'Affiliate Creator Test — Kitchen Range',
        brandSlug: 'sunhouse-vn',
        brandName: 'Sunhouse VN',
        type: 'adhoc',
        period: 'Feb 2024',
        services: ['P5'],
        outcomeHeadline: '28/35 creators produced content · informed P2 brief',
        briefNote: 'Affiliate creator seeding test for new kitchen range. 35 creators, commission-only, 2-week window. Goal: validate creator appetite for demo-style content before committing to full P2.',
        outcomeNote: '28/35 creators produced usable content. High-quality demos outperformed lifestyle shots. Informed full P2 brief for Q2 2024.',
      },
    ],
    accountBrief: {
      goals: [
        'Achieve 3× GMV within 90 days on TikTok Shop — starting from zero',
        'Establish demo-led livestream as the standard format for all Sunhouse products',
      ],
      painPoints: [
        'Starting from zero — no TikTok Shop presence, no audience, no creator pool',
        'Products require live demonstration to convert — static content insufficient for appliances',
      ],
    },
    accountSolution: {
      servicesOverview: 'P1 demo-heavy BAU with 45-day structured ramp. P4 introduced at day 30 using top-performing demo content as Spark Ads.',
      reasoning: 'The 45-day ramp was designed to build organic session quality before spending on P4. GMV Max and Spark Ads amplify content that already converts — launching P4 before that quality threshold is waste.',
    },
    accountOutcomes: {
      metrics: [
        { value: '357%', label: 'GMV uplift', source: 'TikTok Shop dashboard' },
        { value: '90 days', label: 'Zero to market leader', source: 'Category report' },
      ],
      narrative: '357% GMV uplift in 90 days. The demo-first, ramp-then-amplify structure is now the standard playbook for all home appliance category entries.',
    },
    accountPatterns: [],
    tagClusters: [
      { category: 'industry', label: 'Industry', tags: ['Home Appliance', 'Kitchen', 'Home Care'] },
      { category: 'service-combo', label: 'Services used', tags: ['P1', 'P4', 'P5'] },
      { category: 'outcome-type', label: 'Outcome class', tags: ['357% GMV', 'Demonstration ROI'] },
    ],
    linkedEntities: [
      { kind: 'icp', slug: 'local-large', label: 'Local Large' },
      { kind: 'account', slug: 'comet', label: 'Comet' },
    ],
  },

  /* ════════════════════════════════════════════════════════════
     COMET — MINIMUM VIABLE
  ════════════════════════════════════════════════════════════ */
  {
    slug: 'comet',
    name: 'Comet',
    initials: 'Cm',
    category: 'home-care',
    categoryLabel: 'Home Care',
    parentCompany: 'Comet',
    parentSlug: 'comet',
    categoryName: 'Home Care',
    categorySlug: 'home-care',
    isGeneralCategory: true,
    industry: 'Cleaning / Home Care',
    market: 'VN',
    sizeTier: 'mnc',
    sizeTierLabel: 'MNC',
    parentEntity: 'Henkel',
    engagedSince: 'Jul 2024',
    primaryBU: 'direct-brand',
    icpSlug: 'mnc-global',
    icpLabel: 'MNC / Global',
    icpVerified: true,
    icpRationale: 'Henkel subsidiary entering digitally underserved cleaning category. MNC playbook applies — structured approach, brand guidelines, regional support.',
    totalGmvLabel: 'Category entry',
    version: 'v2026',
    lastVerified: '1w ago',
    keyContacts: [],
    brands: [{ id: 'comet-vn', name: 'Comet VN', status: 'active', contractedServices: ['P1'] }],
    projects: [
      {
        slug: 'comet-cleaning-category-entry',
        name: 'Cleaning Category Entry',
        brandSlug: 'comet-vn',
        brandName: 'Comet VN',
        type: 'full-case',
        period: 'Jul – Sep 2024',
        services: ['P1'],
        outcomeHeadline: 'Cleaning category TikTok breakthrough · new audience segment',
        goals: ['Establish Comet presence on TikTok Shop in cleaning category'],
        painPoints: ['Cleaning is a low-engagement TikTok category — no proven playbook', 'MNC brand guidelines constrain creative format options'],
        deployedServices: [
          { code: 'P1', detail: 'Before/after demo livestream with anchor SKU focus', bu: 'direct-brand', since: 'Jul 2024' },
        ],
        approachReasoning: 'Started with single anchor SKU (most visually dramatic result). Before/after demonstration format agreed as exception to standard brand guidelines. Category viability benchmark established before expanding SKU range.',
        outcomeMetrics: [{ value: 'Cat. entry', label: 'Established TikTok presence', source: 'TikTok Shop data' }],
        narrativeOutcomes: [],
        patterns: [
          {
            id: 'cm-p01',
            title: 'Cleaning category converts best with before/after demo format',
            appliesTo: 'Cleaning and household care brands on P1 in low-engagement categories',
            insight: 'Generic lifestyle framing does not convert for cleaning products. Before/after format — showing product efficacy on a real mess — consistently outperforms. Negotiate this format exception with brand team in week 1, before any content is produced.',
          },
        ],
        tagClusters: [
          { category: 'industry', label: 'Industry', tags: ['Cleaning', 'Home Care', 'Henkel'] },
          { category: 'service-combo', label: 'Service combo', tags: ['P1 only', 'Before/after format', 'Anchor SKU'] },
          { category: 'outcome-type', label: 'Outcome', tags: ['Category breakthrough', 'Low-engagement category entry'] },
        ],
        linkedEntities: [
          { kind: 'account', slug: 'comet', label: 'Comet' },
          { kind: 'icp', slug: 'mnc-global', label: 'MNC / Global' },
        ],
        version: 'v2026',
        lastVerified: '1w ago',
        projectObjective: 'Establish Comet presence on TikTok Shop in the cleaning category — no proven playbook, no prior TikTok presence.',
        kpis: [
          { name: 'Category entry', target: 'Established', achieved: 'Established', met: true },
          { name: 'Before/after creative approval', target: 'Week 1', achieved: 'Week 1', met: true },
        ],
      },
      {
        slug: 'comet-kol-trial',
        name: 'KOL Trial — Bathroom Range',
        brandSlug: 'comet-vn',
        brandName: 'Comet VN',
        type: 'adhoc',
        period: 'Oct 2024',
        services: ['P2'],
        outcomeHeadline: 'Mixed results · brief updated · full program on hold',
        briefNote: '15 micro-KOL trial for Comet bathroom cleaning range. 2-week window, gifted product. Tested whether lifestyle KOLs can make cleaning content feel aspirational.',
        outcomeNote: 'Mixed results — 9/15 produced content. Lifestyle framing underperformed vs demo. Brief updated to demo-first for any future program. Full P2 program on hold pending Q1 2025 review.',
      },
    ],
    accountBrief: {
      goals: [
        'Enter TikTok Shop in the cleaning category — no precedent to reference',
        'Establish a format that works within strict MNC brand guidelines',
      ],
      painPoints: [
        'Cleaning is a low-engagement TikTok category — no proven content format',
        'Henkel brand guidelines constrain creative options significantly',
      ],
    },
    accountSolution: {
      servicesOverview: 'P1 only — before/after demo format, single anchor SKU. Format exception negotiated with brand team in week 1.',
      reasoning: 'The brand guideline constraint turned into a creative constraint that forced the right answer: before/after is the highest-converting format in cleaning. Getting brand sign-off on it week 1 meant no wasted production time on formats that would not convert.',
    },
    accountOutcomes: {
      metrics: [
        { value: 'Cat. entry', label: 'Established TikTok Shop presence', source: 'TikTok Shop data' },
      ],
      narrative: 'Cleaning category TikTok breakthrough. Before/after format proved as the only viable approach for the category. Comet now has a platform presence and established content format for Q1 2025 scale.',
    },
    accountPatterns: [],
    tagClusters: [
      { category: 'industry', label: 'Industry', tags: ['Cleaning', 'Home Care', 'MNC'] },
      { category: 'service-combo', label: 'Services used', tags: ['P1', 'P2'] },
      { category: 'outcome-type', label: 'Outcome class', tags: ['Category entry', 'Low-engagement breakthrough'] },
    ],
    linkedEntities: [
      { kind: 'icp', slug: 'mnc-global', label: 'MNC / Global' },
      { kind: 'account', slug: 'sunhouse', label: 'Sunhouse' },
    ],
  },
];
