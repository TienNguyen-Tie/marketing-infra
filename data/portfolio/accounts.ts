import type { PortfolioAccount } from './types';

export const PORTFOLIO_ACCOUNTS: PortfolioAccount[] = [

  /* ════════════════════════════════════════════════════════════
     L'ORÉAL VN — CONSUMER PRODUCTS  (SHOWCASE)
  ════════════════════════════════════════════════════════════ */
  {
    slug: 'loreal-vn-consumer',
    name: "L'Oréal VN — Consumer Products",
    initials: 'LO',
    version: 'v2026',
    lastVerified: '2d ago',

    parentCompany: "L'Oréal Vietnam",
    parentSlug: 'loreal-vietnam',
    categoryName: 'Consumer Products',
    categorySlug: 'consumer',
    isGeneralCategory: false,

    category: 'beauty',
    categoryLabel: 'Beauty & Personal Care',

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

    keyContacts: [
      { name: 'Linh Nguyen', role: 'Marketing Director · approves all brand spend', personaSlug: 'minh-mnc', personaLabel: 'Minh-MNC', isPrimary: true },
      { name: 'Quang Tran', role: 'Head of Commerce · cross-brand TikTok lead', personaSlug: 'hung-ecom', personaLabel: 'Hung-Ecom' },
      { name: 'Mai Pham', role: 'TikTok Shop Manager · procurement contact', personaSlug: 'hung-ecom', personaLabel: 'Hung-Ecom' },
    ],

    brands: [
      {
        id: 'loreal-paris',
        slug: 'loreal-paris',
        name: "L'Oréal Paris",
        status: 'active',
        subCategory: 'Premium Mass',
        targetConsumer: 'Women 25-45, mid-to-premium income',
        contractedServices: ['P1', 'P4'],
        gmvLabel: '$5M+',
        positioning: "Premium-aspirational beauty backed by science — accessible French elegance for women who care about results.",
        voiceTone: "Confident and expert. Speaks like a knowledgeable friend, not a clinical brand. French elegance threaded through but never gatekeeping. 'You're worth it' is positioning, not a slogan to repeat.",
        messagingPillars: [
          "Science-backed efficacy (proof, not just claims)",
          "Premium feel at accessible price",
          "Empowerment without preachiness",
        ],
        brandAudience: {
          demographics: "Women 25-45, mid-to-premium income, urban Vietnam, professional or aspiring",
          psychographics: "Self-improvement-oriented, research-driven before purchase, values quality over trends, brand-loyal once trust is earned",
          channelPreferences: "TikTok primary for discovery, YouTube/forums for research, premium product purchase via brand stores or D2C",
          notes: "Older than the broader CPD audience. Higher income. More patient with content — will watch a 60-second product explanation; won't tolerate a 60-second ad.",
        },
        products: [
          {
            id: 'lp-revitalift-filler',
            slug: 'revitalift-filler',
            name: 'Revitalift Filler',
            productLine: 'Revitalift',
            categoryType: 'skincare',
            status: 'hero',
            marketingRole: 'hero',
            targetSubAudience: 'Women 35-55 concerned with anti-aging signs',
            positioning: 'Hyaluronic acid filler for plumping and firming — visible results in 4 weeks',
            servicesDeployed: ['P1', 'P4'],
            performanceHighlight: '#1 anti-aging product on TikTok Shop Beauty in VN, Q4 2024',
          },
          {
            id: 'lp-excellence-creme',
            slug: 'excellence-creme',
            name: 'Excellence Crème Hair Color',
            productLine: 'Excellence',
            categoryType: 'haircare',
            status: 'active',
            marketingRole: 'volume-driver',
            targetSubAudience: 'Women 30+ doing at-home hair color',
            positioning: 'Salon-quality hair color, gentle on hair, easy application',
            servicesDeployed: ['P1'],
          },
          {
            id: 'lp-color-riche',
            slug: 'color-riche-lipstick',
            name: 'Color Riche Lipstick',
            productLine: 'Color Riche',
            categoryType: 'makeup',
            status: 'active',
            marketingRole: 'volume-driver',
            targetSubAudience: 'Women 25-45, daily wear, mid-premium',
            positioning: "Iconic lipstick range, rich pigment, classic L'Oréal premium feel",
          },
          {
            id: 'lp-casting-creme',
            slug: 'casting-creme-gloss',
            name: 'Casting Crème Gloss',
            productLine: 'Casting Crème',
            categoryType: 'haircare',
            status: 'considered',
            marketingRole: 'heritage',
            targetSubAudience: 'Women 25+ doing at-home hair color, gentler/temporary preference',
            positioning: 'Ammonia-free hair color, conditioning gloss finish',
          },
        ],
        brandStoryCapital: {
          definingNarrative: "L'Oréal Paris was our first L'Oréal CPD brand activation in VN. The Tet 2024 livestream exceeded GMV target by 220%, becoming the regional case study that justified scaling the relationship to other CPD brands. The brand is our 'premium beauty hero' across Ecomobi marketing.",
          storyWorthyMoments: [
            { date: 'Feb 2024', label: 'Tet 2024 — 220% over target', description: 'Defined the format for premium beauty livestream in VN' },
            { date: 'May 2024', label: "Featured in L'Oréal APAC regional review", description: 'Cross-market case study' },
            { date: 'Oct 2024', label: 'Revitalift Filler became #1 anti-aging SKU on TikTok Shop VN', description: 'Sustained leadership through Q4' },
          ],
          quotableMaterial: "#1 anti-aging product on TikTok Shop Beauty Vietnam (Q4 2024). First L'Oréal CPD brand to use exclusive livestream commerce partner in VN.",
          uniqueAngles: "Science-backed positioning lands harder than aspiration-only competitors. Expert creators outperform celebrity influencers 2-3x.",
        },
        brandTopCreators: [
          {
            name: 'Linh Skincare',
            handle: '@linhskincare',
            audienceMatch: 'Women 25-45, ingredient-led, skincare-fluent',
            notes: 'Best repurchase driver for Revitalift line — audience trusts ingredient explanations. Outperforms aspirational creators 2.4x on premium skincare.',
          },
          {
            name: 'Dr. Hà Beauty',
            handle: '@drhabeauty',
            audienceMatch: 'Women 30+, evidence-led, premium-aspirational',
            notes: 'Dermatologist credential drives credibility for Revitalift. Higher AOV than non-expert creators.',
          },
        ],
        brandContentAngles: [
          {
            id: 'lp-ca1',
            angle: 'Science before aspiration',
            why: 'Premium beauty audience wants ingredient education before lifestyle imagery. 60-second product science outperforms 30-second aspirational lifestyle 2-3x on conversion.',
            exampleProject: 'Tet 2024 Livestream Series',
          },
          {
            id: 'lp-ca2',
            angle: 'Expert creator + visible result',
            why: 'Pairing dermatologist or beauty-expert creators with 4-week visible-result claims drives higher AOV and lower return rate than influencer aspiration content.',
          },
          {
            id: 'lp-ca3',
            angle: "Heritage as proof, not nostalgia",
            why: "L'Oréal heritage works when framed as 'trusted by 4 generations,' not 'since 1909.' Audience cares about reliability, not history.",
          },
        ],
        brandOutcomes: {
          metrics: [
            { value: '220%', label: 'Tet 2024 vs target', source: 'Campaign close report' },
            { value: '#1', label: 'Anti-aging on TikTok Shop VN', source: 'Q4 2024 category leadership' },
            { value: '$3.2M', label: 'Brand-level GMV 2024', source: 'Annual rollup' },
          ],
          narrative: "L'Oréal Paris is the flagship brand within L'Oréal CPD VN. 2024 performance set the benchmark for premium beauty operations in market and triggered cross-brand expansion within the portfolio.",
        },
        brandReferenceIndex: {
          tagClusters: [
            { name: 'Audience', tags: ['Women 25-45', 'Premium beauty', 'Urban Vietnam'] },
            { name: 'Categories', tags: ['Skincare', 'Haircare', 'Makeup'] },
            { name: 'Marketing notes', tags: ['Hero brand', 'Premium-positioning', 'Expert creators preferred'] },
          ],
          linkedEntities: [
            { name: 'Revitalift Filler', type: 'product-hero' },
            { name: 'Tet 2024 Livestream Series', type: 'project' },
            { name: 'Linh Skincare', type: 'creator' },
          ],
          aiNote: "L'Oréal Paris is the hero brand of L'Oréal CPD VN portfolio. Premium positioning with science-led messaging. Targets women 25-45 mid-premium. Best creators are expert/dermatologist types. Revitalift Filler is the standout product. Defining campaign: Tet 2024 livestream (220% over target).",
        },
      },
      {
        id: 'maybelline',
        slug: 'maybelline',
        name: 'Maybelline',
        status: 'active',
        subCategory: 'Mass Color',
        targetConsumer: 'Women 18-35, trend-driven, price-conscious',
        contractedServices: ['P1', 'P3'],
        gmvLabel: '$2.5M+',
        positioning: "Mass-market color cosmetics for the everyday confident woman. Trend-forward but accessible.",
        voiceTone: "Playful, accessible, 'girl-next-door' tone. Trend-aware without being trying-too-hard.",
        brandAudience: {
          demographics: "Women 18-25, mass-market, price-sensitive, urban VN",
        },
        products: [
          {
            id: 'mb-lash-sensational',
            slug: 'lash-sensational',
            name: 'Lash Sensational Mascara',
            categoryType: 'makeup',
            status: 'hero',
            marketingRole: 'hero',
            servicesDeployed: ['P1', 'P3'],
          },
          {
            id: 'mb-superstay',
            slug: 'superstay-lipstick',
            name: 'Superstay Lipstick',
            categoryType: 'makeup',
            status: 'active',
            marketingRole: 'volume-driver',
            servicesDeployed: ['P1'],
          },
          {
            id: 'mb-fit-me',
            slug: 'fit-me-foundation',
            name: 'Fit Me Foundation',
            categoryType: 'makeup',
            status: 'active',
            marketingRole: 'new-launch',
            servicesDeployed: ['P1', 'P2'],
          },
        ],
      },
      {
        id: 'garnier',
        slug: 'garnier',
        name: 'Garnier',
        status: 'pitched',
        subCategory: 'Mass Skincare / Hair',
        targetConsumer: 'Women 20-40, ingredient-aware, value-seeking',
        pitchSolution: 'P2 UGC seeding + P1 education-led livestream for hair care range',
      },
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

    accountBrief: {
      goals: [
        "Build scalable TikTok commerce capability across L’Oréal Paris, Maybelline, and Garnier",
        'Establish daily BAU livestream as the standard operating model for every brand',
        'Win market leadership in beauty on TikTok Shop Vietnam',
      ],
      painPoints: [
        'No in-house livestream operation — fully dependent on external partners',
        'Long procurement cycles slow campaign activation across brands',
        'Each brand has different brand-safety requirements',
      ],
    },

    accountSolution: {
      servicesOverview: 'P1 anchors every new brand. P4 layers in at 60 days. P2 and P3 deployed selectively based on brand stage.',
      reasoning: 'We operate as a multi-brand livestream factory — separate host pools, separate content calendars, unified procurement management.',
    },

    accountOutcomes: {
      metrics: [
        { value: '$8M+', label: 'Total GMV', source: 'Annual contract data' },
        { value: '3', label: 'Brands activated', source: 'Internal ops log' },
        { value: '2024', label: 'Winning Agency', source: 'TikTok Vietnam recognition' },
      ],
      narrative: "2024 Winning Agency recognition. Cited by TikTok Vietnam as the model multi-brand commerce operation in the beauty category.",
    },

    categoryMarketIntelligence: {
      categorySize: '$2.3B mass beauty market in VN (2024 est.)',
      categoryGrowth: '9% YoY total, digital channels growing 18%',
      marketPosition: 'leader',
      keyCompetitors: ['P&G Beauty', 'Beiersdorf', 'Unilever Beauty', 'Local indie brands'],
      marketDynamicsNotes: 'Mass beauty in Vietnam is undergoing rapid digital migration. Offline still holds ~40% but TikTok Shop is reshaping the discovery-to-purchase journey faster than any other category.',
    },

    audienceInsights: {
      demographics: 'Women 18-45, urban Vietnam (HCMC, Hanoi, Da Nang primary), middle-class+, smartphone-native, 70% on TikTok daily',
      psychographics: 'Beauty-engaged, social-media-influenced, brand-conscious but value-aware. Tutorials and transformation content drive discovery. Authenticity beats production polish.',
      purchaseBehavior: 'Discovery on TikTok/IG, research on YouTube/forums, purchase via TikTok Shop or Shopee, repurchase via loyalty programs. Average decision cycle 3-7 days.',
      channelPreferences: 'TikTok primary (60% of beauty discovery), Shopee secondary (40% of beauty purchase), Lazada tertiary, offline still 40% for premium SKUs',
      notes: 'Mass beauty audience in VN is more brand-loyal than expected for an emerging market — but only when authentic creator advocacy is sustained. One-off campaigns don\'t move brand affinity.',
    },

    storyCapital: {
      definingNarrative: "L’Oréal CPD chose Ecomobi as exclusive livestream partner in Feb 2024 after a single Maybelline pilot delivered 240% over target. The relationship scaled to 3 brands within 6 months and became the regional case study for L’Oréal APAC on TikTok commerce execution.",
      storyWorthyMoments: [
        { date: 'Feb 2024', label: 'Pilot exceeded target by 240%', description: 'Single Maybelline livestream test event triggered the full cross-brand expansion conversation' },
        { date: 'May 2024', label: 'All Q1 KPIs exceeded', description: 'GMV target raised by 60% mid-year based on overachievement' },
        { date: 'Aug 2024', label: "L’Oréal 2024 Winning Agency", description: 'Regional recognition for innovative digital execution' },
        { date: 'Dec 2024', label: "Featured in L’Oréal APAC playbook", description: 'Cross-brand livestream operation cited as model approach for the region' },
      ],
      quotableMaterial: "Largest TikTok Shop GMV operator in VN beauty category (2024). Exclusive livestream partner for L’Oréal CPD in Vietnam. Featured in L’Oréal APAC regional digital playbook.",
      uniqueAngles: "Multi-brand simultaneous operation at MNC scale. Integrated content-to-commerce flow. Procurement-compliant operation with regional brand safety standards. First Vietnamese agency featured in L’Oréal APAC regional playbook.",
    },

    creatorStrategy: {
      creatorProfile: 'Beauty-vertical creators in the 50K-500K follower range. Urban Vietnam audiences, female-skewing 70%+, ages 18-35. Authenticity over polish.',
      audienceMatch: 'Creator audience must skew female 70%+, predominantly VN-based (>80%), with active beauty/lifestyle content interest. Avoid pure lifestyle creators — beauty fluency is required.',
      contentStyleNeeds: 'Tutorial-led, expert-led, transformation-led primary. Routine-style secondary. Avoid pure GRWM for new product education.',
      topPerformers: [
        { name: 'Hương Beauty', handle: '@huongbeauty', notes: 'Consistent 3x category benchmark on Maybelline campaigns. Strong tutorial framing.' },
        { name: 'Chuyên Làm Đẹp', handle: '@chuyennaubep', notes: 'Top GMV across 3 Garnier hair launches. Expert positioning builds trust.' },
        { name: 'Linh Skincare', handle: '@linhskincare', notes: 'Best repurchase rate driver — audience trusts ingredient-led explanations.' },
      ],
      notes: 'Science/expert-positioned creators outperform celebrity-style for L’Oréal CPD. This is a category-wide pattern.',
    },

    contentAngles: [
      { id: 'ca1', angle: 'Expert-led education before commerce', why: 'Pre-launch education content (P2 UGC seeding) consistently outperforms straight commerce content for new SKUs. The audience needs to understand the product before they buy.', exampleProject: 'Dove Dry Serum UGC' },
      { id: 'ca2', angle: 'Cultural moment as ritual, not sale', why: 'Reframing Tet, 8.3, 11.11 campaigns as cultural beauty rituals (gifting, self-care, transformation) beats straight sale-driven messaging by 2-3x in GMV.', exampleProject: 'Tet 2024 Livestream Series' },
      { id: 'ca3', angle: 'Authenticity over production polish', why: 'Lower-production-value KOC content drives 2-3x conversion vs polished brand-style content for mass beauty. Real bathroom, real lighting, real reactions outperform studio-shot creative.', exampleProject: 'Maybelline Summer Launch' },
      { id: 'ca4', angle: 'Multi-brand category narrative', why: 'Positioning multiple brands under a unified category story drives cross-brand recall and shared audience growth. Less efficient per campaign but builds compounding category authority.' },
    ],

    coPromotionOpportunities: [
      { id: 'cp1', type: 'event', title: 'TikTok Shop Summit Vietnam 2026', description: "L’Oréal CPD scheduled to present case study; opportunity for joint Ecomobi presentation on the same panel", timing: 'March 2026' },
      { id: 'cp2', type: 'event', title: 'Vietnam Beauty Expo 2026', description: 'Joint booth opportunity discussed informally', timing: 'October 2026' },
      { id: 'cp3', type: 'industry-presence', title: "L’Oréal Regional Digital Awards 2026", description: 'Joint nomination submission for the Innovation category', timing: 'Submission window Q3 2026' },
      { id: 'cp4', type: 'co-content', title: "L’Oréal APAC blog feature", description: "L’Oréal APAC team interested in featuring our Vietnam case study on their regional digital blog", timing: 'Q2-Q3 2026' },
    ],
  },

  /* ════════════════════════════════════════════════════════════
     L'ORÉAL VN — ACTIVE COSMETICS
  ════════════════════════════════════════════════════════════ */
  {
    slug: 'loreal-vn-active',
    name: "L'Oréal VN — Active Cosmetics",
    initials: 'LA',
    version: 'v2026',
    lastVerified: '1w ago',

    parentCompany: "L'Oréal Vietnam",
    parentSlug: 'loreal-vietnam',
    categoryName: 'Active Cosmetics',
    categorySlug: 'active',
    isGeneralCategory: false,

    category: 'beauty',
    categoryLabel: 'Beauty & Personal Care',

    industry: 'Beauty / Clinical',
    market: 'VN',
    sizeTier: 'mnc',
    sizeTierLabel: 'MNC',
    parentEntity: "L'Oréal Group",
    engagedSince: 'Jul 2024',
    primaryBU: 'direct-brand',
    icpSlug: 'mnc-global',
    icpLabel: 'MNC / Global',
    icpVerified: true,
    icpRationale: 'Active Cosmetics division operates with distinct procurement and ROAS accountability separate from Consumer division.',
    totalGmvLabel: '140% ROAS',

    keyContacts: [],

    brands: [
      {
        id: 'la-roche-posay',
        slug: 'la-roche-posay',
        name: 'La Roche-Posay',
        status: 'active',
        subCategory: 'Clinical Skincare',
        contractedServices: ['P1', 'P4'],
        positioning: "The reference in dermo-cosmetics — dermatologist-tested, allergy-tested, recommended by healthcare professionals.",
        products: [
          {
            id: 'lrp-anthelios',
            slug: 'anthelios',
            name: 'Anthelios Sunscreen',
            categoryType: 'skincare',
            status: 'hero',
            marketingRole: 'hero',
            servicesDeployed: ['P1', 'P4'],
            performanceHighlight: 'Expert-presenter format: 2.3x vs lifestyle hosts (A/B test Q3)',
          },
          {
            id: 'lrp-toleriane',
            slug: 'toleriane',
            name: 'Toleriane Sensitive Range',
            categoryType: 'skincare',
            status: 'active',
            marketingRole: 'volume-driver',
            servicesDeployed: ['P1'],
          },
        ],
      },
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

    tagClusters: [
      { category: 'industry', label: 'Industry', tags: ['Beauty', 'Derma', 'Clinical skincare'] },
      { category: 'service-combo', label: 'Services used', tags: ['P1', 'P4'] },
      { category: 'outcome-type', label: 'Outcome class', tags: ['140% ROAS', 'Regional model'] },
    ],

    linkedEntities: [
      { kind: 'icp', slug: 'mnc-global', label: 'MNC / Global' },
    ],

    accountBrief: {
      goals: [
        'Establish La Roche-Posay as science-led derma brand on TikTok Shop',
        'Scale expert-led livestream format across pharma-adjacent brands',
      ],
      painPoints: [
        'Credentialed host sourcing is 3× slower than lifestyle hosts',
        'Regional HQ ROAS targets are non-negotiable',
      ],
    },

    accountSolution: {
      servicesOverview: 'P1 with credentialed hosts (dermatologists/pharmacists). P4 targeted at skin-concern audience segments.',
      reasoning: 'Derma category requires trust signals that lifestyle hosts cannot provide. Expert hosting produces 2.3× better conversion.',
    },

    accountOutcomes: {
      metrics: [
        { value: '140%', label: 'ROAS vs 130% target', source: 'TikTok ads dashboard' },
        { value: 'Regional model', label: 'Expert-led format', source: "L'Oréal regional HQ" },
      ],
      narrative: "La Roche-Posay VN cited by regional HQ as model market for expert-led livestream. Format rolling to ID and TH.",
    },

    categoryMarketIntelligence: {
      marketPosition: 'niche',
    },
  },

  /* ════════════════════════════════════════════════════════════
     UNILEVER VN — BEAUTY & WELLBEING
  ════════════════════════════════════════════════════════════ */
  {
    slug: 'unilever-vn-beauty',
    name: 'Unilever VN — Beauty & Wellbeing',
    initials: 'UV',
    version: 'v2026',
    lastVerified: '1w ago',

    parentCompany: 'Unilever Vietnam',
    parentSlug: 'unilever-vietnam',
    categoryName: 'Beauty & Wellbeing',
    categorySlug: 'beauty-wellbeing',
    isGeneralCategory: false,

    category: 'beauty',
    categoryLabel: 'Beauty & Personal Care',

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

    keyContacts: [],

    brands: [
      {
        id: 'dove',
        slug: 'dove',
        name: 'Dove',
        status: 'active',
        contractedServices: ['P1', 'P2'],
        positioning: "Real beauty for real women. Skincare and haircare grounded in self-acceptance.",
        brandAudience: {
          demographics: "Women 18-35, mass-market, value-seeking, urban and semi-urban VN",
        },
        products: [
          {
            id: 'dove-dry-serum',
            slug: 'dove-dry-serum',
            name: 'Dove Dry Serum',
            categoryType: 'haircare',
            status: 'hero',
            marketingRole: 'new-launch',
            servicesDeployed: ['P2', 'P4'],
            performanceHighlight: '68.48M views, 4× category benchmark on KOC seeding',
          },
          {
            id: 'dove-dry-shampoo',
            slug: 'dove-dry-shampoo',
            name: 'Dove Dry Shampoo',
            categoryType: 'haircare',
            status: 'active',
            marketingRole: 'volume-driver',
            servicesDeployed: ['P1', 'P2'],
            performanceHighlight: 'Category #1 dry shampoo on TikTok Shop VN',
          },
        ],
        brandOutcomes: {
          metrics: [
            { value: '68.48M', label: 'Views — Dry Serum launch', source: 'UGC campaign analytics' },
            { value: 'Cat. #1', label: 'Dry Shampoo on TikTok Shop', source: 'Category report' },
          ],
          narrative: "Dove Dry Serum UGC program set the benchmark for category education via KOC seeding. Dry Shampoo launch proved the P2→P1 sequencing model.",
        },
      },
      { id: 'sunsilk', slug: 'sunsilk', name: 'Sunsilk', status: 'prospect' },
      { id: 'ponds', slug: 'ponds', name: "Pond's", status: 'prospect' },
    ],

    projects: [
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
    ],

    tagClusters: [
      { category: 'industry', label: 'Industry', tags: ['Beauty', 'FMCG', 'Multi-brand'] },
      { category: 'service-combo', label: 'Services used', tags: ['P1', 'P2', 'P5'] },
      { category: 'outcome-type', label: 'Outcome class', tags: ['$8M+ GMV', 'Multi-brand scale'] },
    ],

    linkedEntities: [
      { kind: 'icp', slug: 'mnc-global', label: 'MNC / Global' },
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
      servicesOverview: 'P2 education seeding deployed 4 weeks before P1 commerce launch.',
      reasoning: 'The P2-first, then P1 sequencing was invented for Dove Dry Shampoo and proved the category education model.',
    },

    accountOutcomes: {
      metrics: [
        { value: '$8M+', label: 'Total GMV', source: 'Annual contract data' },
        { value: 'Cat. #1', label: 'Dove Dry Shampoo on TikTok Shop', source: 'Category report' },
      ],
      narrative: 'Category education model proven with Dove Dry Shampoo. Now referenced as the playbook for any new-format product launch.',
    },
  },

  /* ════════════════════════════════════════════════════════════
     COCOON — MINIMUM VIABLE
  ════════════════════════════════════════════════════════════ */
  {
    slug: 'cocoon',
    name: 'Cocoon',
    initials: 'Co',
    version: 'v2026',
    lastVerified: '1w ago',

    parentCompany: 'Cocoon',
    parentSlug: 'cocoon',
    categoryName: 'General',
    categorySlug: 'general',
    isGeneralCategory: true,

    category: 'beauty',
    categoryLabel: 'Beauty & Personal Care',

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

    keyContacts: [],

    brands: [
      { id: 'cocoon-beauty', slug: 'cocoon-beauty', name: 'Cocoon Beauty', status: 'active', contractedServices: ['P1', 'P2', 'P5'] },
    ],

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

    tagClusters: [
      { category: 'industry', label: 'Industry', tags: ['Beauty', 'Indie', 'D2C'] },
      { category: 'service-combo', label: 'Services used', tags: ['P1', 'P2', 'P5'] },
      { category: 'outcome-type', label: 'Outcome class', tags: ['1M followers', 'Affiliate growth'] },
    ],

    linkedEntities: [
      { kind: 'icp', slug: 'local-indie', label: 'Local Indie' },
      { kind: 'account', slug: 'bobby', label: 'Bobby' },
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
  },

  /* ════════════════════════════════════════════════════════════
     PAMPERS — MINIMUM VIABLE
  ════════════════════════════════════════════════════════════ */
  {
    slug: 'pampers',
    name: 'Pampers',
    initials: 'Pa',
    version: 'v2026',
    lastVerified: '1w ago',

    parentCompany: 'Pampers',
    parentSlug: 'pampers',
    categoryName: 'General',
    categorySlug: 'general',
    isGeneralCategory: true,

    category: 'mom-kid',
    categoryLabel: 'Mom & Kid',

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

    keyContacts: [],

    brands: [
      { id: 'pampers-vn', slug: 'pampers-vn', name: 'Pampers VN', status: 'active', contractedServices: ['P1', 'P3'] },
    ],

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

    tagClusters: [
      { category: 'industry', label: 'Industry', tags: ['Mom & Kid', 'Diapers', 'MNC'] },
      { category: 'service-combo', label: 'Services used', tags: ['P1', 'P3'] },
      { category: 'outcome-type', label: 'Outcome class', tags: ['Category leader', 'First mover'] },
    ],

    linkedEntities: [
      { kind: 'icp', slug: 'mnc-global', label: 'MNC / Global' },
      { kind: 'account', slug: 'friso', label: 'Friso' },
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
  },

  /* ════════════════════════════════════════════════════════════
     FRISO — MINIMUM VIABLE
  ════════════════════════════════════════════════════════════ */
  {
    slug: 'friso',
    name: 'Friso',
    initials: 'Fr',
    version: 'v2026',
    lastVerified: '1w ago',

    parentCompany: 'Friso',
    parentSlug: 'friso',
    categoryName: 'General',
    categorySlug: 'general',
    isGeneralCategory: true,

    category: 'mom-kid',
    categoryLabel: 'Mom & Kid',

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

    keyContacts: [],

    brands: [
      { id: 'friso-vn', slug: 'friso-vn', name: 'Friso VN', status: 'active', contractedServices: ['P4'] },
    ],

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

    tagClusters: [
      { category: 'industry', label: 'Industry', tags: ['Mom & Kid', 'Premium Dairy', 'MNC'] },
      { category: 'service-combo', label: 'Services used', tags: ['P4', 'P2'] },
      { category: 'outcome-type', label: 'Outcome class', tags: ['2.5× ROAS', 'Performance benchmark'] },
    ],

    linkedEntities: [
      { kind: 'icp', slug: 'mnc-global', label: 'MNC / Global' },
      { kind: 'account', slug: 'pampers', label: 'Pampers' },
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
  },

  /* ════════════════════════════════════════════════════════════
     BOBBY — MINIMUM VIABLE
  ════════════════════════════════════════════════════════════ */
  {
    slug: 'bobby',
    name: 'Bobby',
    initials: 'Bo',
    version: 'v2026',
    lastVerified: '1w ago',

    parentCompany: 'Bobby',
    parentSlug: 'bobby',
    categoryName: 'General',
    categorySlug: 'general',
    isGeneralCategory: true,

    category: 'mom-kid',
    categoryLabel: 'Mom & Kid',

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

    keyContacts: [],

    brands: [
      { id: 'bobby-vn', slug: 'bobby-vn', name: 'Bobby VN', status: 'active', contractedServices: ['P1'] },
    ],

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
        approachReasoning: "Bobby's advantage is community trust — \"Vietnamese brand for Vietnamese families\". Livestream format led with brand story and community pride, then product conversion. Not the reverse.",
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

    tagClusters: [
      { category: 'industry', label: 'Industry', tags: ['Mom & Kid', 'Diapers', 'Local brand'] },
      { category: 'service-combo', label: 'Services used', tags: ['P1'] },
      { category: 'outcome-type', label: 'Outcome class', tags: ['Category defense', 'Community trust'] },
    ],

    linkedEntities: [
      { kind: 'icp', slug: 'local-large', label: 'Local Large' },
      { kind: 'account', slug: 'sunhouse', label: 'Sunhouse' },
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
  },

  /* ════════════════════════════════════════════════════════════
     SUNHOUSE — MINIMUM VIABLE
  ════════════════════════════════════════════════════════════ */
  {
    slug: 'sunhouse',
    name: 'Sunhouse',
    initials: 'Su',
    version: 'v2026',
    lastVerified: '1w ago',

    parentCompany: 'Sunhouse',
    parentSlug: 'sunhouse',
    categoryName: 'General',
    categorySlug: 'general',
    isGeneralCategory: true,

    category: 'home-care',
    categoryLabel: 'Home Care',

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

    keyContacts: [],

    brands: [
      { id: 'sunhouse-vn', slug: 'sunhouse-vn', name: 'Sunhouse VN', status: 'active', contractedServices: ['P1', 'P4'] },
    ],

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

    tagClusters: [
      { category: 'industry', label: 'Industry', tags: ['Home Appliance', 'Kitchen', 'Home Care'] },
      { category: 'service-combo', label: 'Services used', tags: ['P1', 'P4', 'P5'] },
      { category: 'outcome-type', label: 'Outcome class', tags: ['357% GMV', 'Demonstration ROI'] },
    ],

    linkedEntities: [
      { kind: 'icp', slug: 'local-large', label: 'Local Large' },
      { kind: 'account', slug: 'comet', label: 'Comet' },
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
  },

  /* ════════════════════════════════════════════════════════════
     COMET — MINIMUM VIABLE
  ════════════════════════════════════════════════════════════ */
  {
    slug: 'comet',
    name: 'Comet',
    initials: 'Cm',
    version: 'v2026',
    lastVerified: '1w ago',

    parentCompany: 'Comet',
    parentSlug: 'comet',
    categoryName: 'General',
    categorySlug: 'general',
    isGeneralCategory: true,

    category: 'home-care',
    categoryLabel: 'Home Care',

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

    keyContacts: [],

    brands: [
      { id: 'comet-vn', slug: 'comet-vn', name: 'Comet VN', status: 'active', contractedServices: ['P1'] },
    ],

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

    tagClusters: [
      { category: 'industry', label: 'Industry', tags: ['Cleaning', 'Home Care', 'MNC'] },
      { category: 'service-combo', label: 'Services used', tags: ['P1', 'P2'] },
      { category: 'outcome-type', label: 'Outcome class', tags: ['Category entry', 'Low-engagement breakthrough'] },
    ],

    linkedEntities: [
      { kind: 'icp', slug: 'mnc-global', label: 'MNC / Global' },
      { kind: 'account', slug: 'sunhouse', label: 'Sunhouse' },
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
  },
];
