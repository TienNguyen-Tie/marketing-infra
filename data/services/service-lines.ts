import type { ServiceLine } from './types';

/**
 * All 26 Service Lines — the operational units.
 *
 * Breakdown:
 *   P1 Livestream Commerce     — 5 PL2 tiers + 1 bundle  (6)
 *   P2 Affiliate Marketing     — 4 PL1 tiers + 1 bundle  (5)
 *   P3 Brand Advocacy          — 2                        (2)
 *   P4 UGC Content Production  — 4                        (4)
 *   P5 Performance Boosting    — 5 PL3 tiers              (5)
 *   P6 Content Commerce        — 1 bundle + 1 active + 2 proposed (4)
 *
 * 3 bundles carry composedOf references to their component lines.
 */
export const SERVICE_LINES: ServiceLine[] = [

  // ─── P1 Livestream Commerce — 5 PL2 tiers + 1 bundle ──────────────────────

  {
    slug: 'pl2-facility-only',
    name: 'Facility Only — Room + Tech',
    tierLevel: 'Entry',
    oneLiner:
      'Studio space and tech setup, brand brings everything else. Hourly or daily rental.',
    status: 'active',
    upsellPosition: null,
    pricingModel: 'Hourly / daily room rental rate',
    vinacapitalProvides:
      'Studio space + full tech setup (lighting, camera, ring light, green screen, audio, streaming infrastructure) + tech support during the stream',
    brandProvides: 'Host, ops team, script, product, ads management',
    bestFor:
      'Brands with in-house livestream capability who just need professional infrastructure. Common for large local brands with existing live commerce teams.',
    addOns: [],
    moduleSlugs: ['livestream-commerce'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },
  {
    slug: 'pl2-room-ops-host',
    name: 'Room + Tech + Operation + Host',
    tierLevel: 'Growth · Standard Managed',
    oneLiner:
      'Full managed livestream service. VinaCapital runs the stream end-to-end; brand provides product and brief.',
    status: 'active',
    upsellPosition: 4,
    pricingModel: 'Management fee + performance bonus on GMV above target',
    vinacapitalProvides:
      'Studio + tech + trained host + ops-live team + stream script + real-time GPM monitoring',
    brandProvides: 'Product, campaign brief, product samples, Pub-U budget (via Melia)',
    bestFor:
      'Brands new to TSP. FMCG and beauty brands doing regular weekly or bi-weekly streams. Unilever OMO, Comfort, Sunlight tier.',
    addOns: [],
    moduleSlugs: ['livestream-commerce'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },
  {
    slug: 'pl2-host-only',
    name: 'Host Only — Modular',
    tierLevel: 'Modular',
    oneLiner:
      "Trained host talent deployed to a brand's own studio. Per-stream fee plus monthly retainer for regular bookings.",
    status: 'active',
    upsellPosition: null,
    pricingModel: 'Per-stream host fee + monthly retainer for regular bookings',
    vinacapitalProvides:
      'Trained host talent matched to brand vertical + product briefing + performance scoring post-stream',
    bestFor:
      'Cross-border brands with production infrastructure but no local Vietnamese/Thai/Indonesian host. Also for brands that have studio but in-house host conversion is low.',
    addOns: [],
    moduleSlugs: ['livestream-commerce'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },
  {
    slug: 'pl2-mega-production',
    name: 'Mega Production',
    tierLevel: 'Scale · Event',
    oneLiner:
      'High-production livestream event — multi-camera, branded set, director-led. Per-event pricing for flagship campaign moments.',
    status: 'active',
    upsellPosition: null,
    pricingModel: 'Project fee — higher than standard stream, per-event pricing',
    vinacapitalProvides:
      'Full production crew, set design, multi-cam, director, branded overlays, event ops team',
    brandProvides: 'Campaign brief, spokesperson or brand ambassador, product showcase items',
    bestFor:
      'MNC brands for flagship launches. Beauty brands for new product reveal. FMCG for seasonal mega events.',
    addOns: [],
    moduleSlugs: ['livestream-commerce'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },
  {
    slug: 'pl2-mega-kol',
    name: 'Mega Production + KOL',
    tierLevel: 'Premium · Flagship',
    oneLiner:
      'Mega production paired with sourced KOL talent as co-host. The premium TSP offering for major launches.',
    status: 'active',
    upsellPosition: null,
    pricingModel: 'Highest TSP tier — production fee + KOL talent fee + management fee',
    vinacapitalProvides:
      'Full production + KOL sourcing + KOL contract management + KOL briefing + post-event attribution',
    bestFor:
      "L'Oréal new product launch, Unilever Tết campaign, cross-border brand market entry event",
    addOns: [],
    moduleSlugs: ['livestream-commerce'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },

  // ─── P2 Affiliate Marketing — 4 PL1 tiers + 1 bundle ──────────────────────

  {
    slug: 'pl1-open-plan',
    name: 'Open Plan',
    tierLevel: 'Entry',
    oneLiner:
      'Brand lists products on TAP platform. Any suitable creator can apply. Lowest cost, lowest commitment.',
    status: 'active',
    upsellPosition: 1,
    pricingModel: 'Standard platform commission rate (base)',
    vinacapitalProvides: 'Platform access + creator matching algorithm',
    bestFor:
      'Brands testing TikTok affiliate for the first time; brands with strong product-market fit who just need creator access.',
    addOns: [],
    moduleSlugs: ['affiliate-marketing'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },
  {
    slug: 'pl1-pure-commission',
    name: 'Pure Commission',
    tierLevel: 'Growth',
    oneLiner:
      'Curated creator pool with active matching, weekly performance digest, soft GMV estimate.',
    status: 'active',
    upsellPosition: 2,
    pricingModel: "Higher than Open Plan — reflects VinaCapital's active creator curation",
    vinacapitalProvides:
      'Curated creator pool, weekly performance digest, creator success support',
    bestFor:
      'Local brands with established TikTok Shop presence; brands post-Open-Plan trial.',
    addOns: [],
    moduleSlugs: ['affiliate-marketing'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },
  {
    slug: 'pl1-comm-sample',
    name: 'Commission + Sample',
    tierLevel: 'Scale',
    oneLiner:
      'Brand provides product samples to selected creators. VinaCapital manages sample logistics, creator briefing, and content quality.',
    status: 'active',
    upsellPosition: 3,
    pricingModel:
      'Higher commission rate than Pure Commission — creator has product = higher conversion rate',
    vinacapitalProvides:
      'Sample logistics, creator briefing, content review, performance tracking per creator',
    brandProvides: 'Product samples (30-100 units per creator cohort)',
    bestFor:
      'Brands with tangible, demonstrable products (beauty, health, electronics). Works best when product experience drives purchase intent.',
    addOns: [],
    moduleSlugs: ['affiliate-marketing'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },
  {
    slug: 'pl1-cir',
    name: 'Commission + Sample + Cash (CIR)',
    tierLevel: 'Full CIR Service',
    oneLiner:
      'Full Creator Investment & Results service. Brand provides commission + samples + cash incentives. VinaCapital commits to hard GMV with a campaign plan.',
    status: 'active',
    upsellPosition: 3,
    pricingModel: 'Highest commission tier — reflects full VinaCapital resource deployment',
    vinacapitalProvides:
      'Dedicated creator team, content calendar, weekly reporting, SLA-backed GMV plan',
    brandProvides: 'Samples + cash budget for creator incentives and content boosting',
    successCriteria:
      'Hard GMV commit + campaign plan. SLA terms — if under-delivered, VinaCapital runs a remediation campaign.',
    bestFor:
      "MNC brands (Unilever, L'Oréal) doing seasonal campaigns; local brands preparing for 11.11 / 12.12 / Tết push.",
    addOns: [],
    moduleSlugs: ['affiliate-marketing'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },

  // ─── P3 Brand Advocacy — 2 lines ───────────────────────────────────────────

  {
    slug: 'branded-content-at-scale',
    name: 'Branded Content Production at Scale',
    tierLevel: 'Scale',
    oneLiner:
      'Mass UGC and branded content production across social platforms, with brand-safety pre-review. The 5,000+ videos/month capability.',
    status: 'active',
    upsellPosition: null,
    addOns: [],
    moduleSlugs: ['brand-advocacy'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },
  {
    slug: 'always-on-creator-network',
    name: 'Always-On Creator Network for Brand Awareness',
    tierLevel: 'Subscription',
    oneLiner:
      'Continuous creator seeding for share-of-voice. Measured in impressions, brand lift, organic reach — not GMV.',
    status: 'active',
    upsellPosition: null,
    addOns: [],
    moduleSlugs: ['brand-advocacy'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },

  // ─── P4 UGC Content Production — 4 lines ───────────────────────────────────

  {
    slug: 'content-factory-60day',
    name: 'Content Factory (60-day Setup)',
    tierLevel: 'Flagship',
    oneLiner:
      'The hero engagement. 500+ creators activated, 1,000+ variations/month, win-rate >30% target. Self-sustaining content operation deployed in 60 days.',
    status: 'active',
    upsellPosition: null,
    addOns: [],
    moduleSlugs: ['ugc-content-production'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },
  {
    slug: 'angle-testing',
    name: 'Angle Testing & Win-Rate Optimization',
    tierLevel: 'Scoped',
    oneLiner:
      'Scoped engagement to systematically test 50-100 creative angles, identify winners, hand off learnings. Lower-commitment entry point.',
    status: 'active',
    upsellPosition: null,
    addOns: [],
    moduleSlugs: ['ugc-content-production'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },
  {
    slug: 'creator-briefing-qc',
    name: 'Creator Briefing & Content QC',
    tierLevel: 'Modular',
    oneLiner:
      'Brand provides creators; VinaCapital handles brief writing, content review, and quality optimization. Modular for brands with existing networks.',
    status: 'active',
    upsellPosition: null,
    addOns: [],
    moduleSlugs: ['ugc-content-production'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },
  {
    slug: 'always-on-ugc-subscription',
    name: 'Always-On UGC Subscription',
    tierLevel: 'Subscription',
    oneLiner:
      'Monthly retainer for ongoing content output (50-100 videos/month) without the full Factory commitment. Fills the gap between one-off projects and the full Factory.',
    status: 'active',
    upsellPosition: null,
    addOns: [],
    moduleSlugs: ['ugc-content-production'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },

  // ─── P5 Performance Boosting — 5 PL3 tiers ────────────────────────────────

  {
    slug: 'pl3-account-rental',
    name: 'Account Rental Only',
    tierLevel: 'Entry',
    oneLiner:
      'Managed TikTok Business Center account access for brands without local entities. Cross-border entry point.',
    status: 'active',
    upsellPosition: 1,
    pricingModel: 'Monthly account rental fee (flat)',
    vinacapitalProvides:
      'Verified TikTok Business Center account, onboarding, compliance, billing management',
    brandProvides: 'All campaign creation, optimization, creative, and budget decisions',
    bestFor:
      "Cross-border brands that can't get a local TikTok Ads account. Brands that have in-house media buyers but no local entity. Quick market access.",
    addOns: [],
    moduleSlugs: ['performance-boosting'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },
  {
    slug: 'pl3-spark-ads',
    name: 'Spark Ads Management',
    tierLevel: 'Modular',
    oneLiner:
      'Amplification of winning creator content via TikTok Spark Ads. Couples directly with Affiliate output.',
    status: 'active',
    upsellPosition: 2,
    addOns: [],
    moduleSlugs: ['performance-boosting'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },
  {
    slug: 'pl3-gmv-max',
    name: 'GMV Max Optimization',
    tierLevel: 'Modular',
    oneLiner:
      "Shop-attached campaign management via TikTok's GMV Max product. Couples with livestream and affiliate output for end-to-end commerce performance.",
    status: 'active',
    upsellPosition: 2,
    addOns: [],
    moduleSlugs: ['performance-boosting'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },
  {
    slug: 'pl3-pub-u-live',
    name: 'Pub-U Live Management',
    tierLevel: 'Modular',
    oneLiner:
      'Livestream-specific ad spend management during streams. Couples with Livestream Commerce module.',
    status: 'active',
    upsellPosition: 2,
    addOns: [],
    moduleSlugs: ['performance-boosting'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },
  {
    slug: 'pl3-full-service',
    name: 'Full Melia Service',
    tierLevel: 'Full Service',
    oneLiner:
      'Complete performance media engagement — all PL3 tiers plus creative testing and weekly ROAS reporting. Priced as % of managed spend.',
    status: 'active',
    upsellPosition: 4,
    pricingModel: '% of ad spend managed (10-15%) + optional performance bonus on ROAS above target',
    vinacapitalProvides:
      'Account + full campaign strategy + Spark Ads + Pub-U + GMV Max + creative testing + weekly reporting',
    bestFor:
      'All brand types. MNC brands with large budgets = highest Melia revenue. Local brands scaling TikTok spend = fastest growth clients.',
    addOns: [],
    moduleSlugs: ['performance-boosting'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },

  // ─── P6 Content Commerce — 1 active + 1 active bundle + 2 proposed ────────

  {
    slug: 'multi-marketplace-engagement',
    name: 'Multi-Marketplace Commerce Engagement',
    tierLevel: 'Bundle',
    oneLiner:
      'The full social commerce operation across multiple marketplaces under one engagement. Designed for brands consolidating their entire social commerce presence with VinaCapital.',
    status: 'active',
    upsellPosition: null,
    addOns: [],
    moduleSlugs: ['content-commerce'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },
  {
    slug: 'content-commerce-diagnostic',
    name: 'Content Commerce Diagnostic',
    tierLevel: 'Scoped',
    oneLiner:
      "Scoped audit of a brand's social commerce readiness — current content, creator network, ad spend, marketplace presence. Produces a deployment plan.",
    status: 'proposed',
    upsellPosition: null,
    internalNotes:
      'Proposed — pending verification with sales/CEO. May or may not be a real contractable engagement today.',
    addOns: [],
    moduleSlugs: ['content-commerce'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },
  {
    slug: 'flywheel-onboarding',
    name: 'Flywheel Onboarding (90-day Embed)',
    tierLevel: 'Scoped',
    oneLiner:
      'High-touch first quarter of a consolidation engagement. Proves the flywheel before annual commitment.',
    status: 'proposed',
    upsellPosition: null,
    internalNotes:
      'Proposed — pending verification with sales/CEO. May or may not be a real contractable engagement today.',
    addOns: [],
    moduleSlugs: ['content-commerce'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },

  // ─── Bundles ───────────────────────────────────────────────────────────────

  {
    slug: 'bundle-affiliate-commerce',
    name: 'Affiliate Commerce Bundle (CIR + Ads)',
    tierLevel: 'Bundle',
    oneLiner:
      'Hard affiliate GMV target + Spark Ads + GMV Max. Free remediation campaign if missed.',
    status: 'active',
    upsellPosition: null,
    pricingModel: 'Package rate — CIR commission + % of managed ad spend',
    vinacapitalProvides:
      'CIR Affiliate + Melia Spark Ads + GMV Max + weekly GMV flash + monthly full report with ROAS attribution',
    successCriteria:
      'Hard affiliate GMV target — monthly, with weekly milestone tracking. If under-delivered, VinaCapital runs free remediation in the following month.',
    bestFor:
      'Brands that want affiliate-led commerce as primary TikTok channel. No livestream. Beauty, health, fashion — high creator-content categories.',
    composedOf: ['pl1-cir', 'pl3-spark-ads', 'pl3-gmv-max'],
    addOns: [],
    moduleSlugs: ['affiliate-marketing'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },
  {
    slug: 'bundle-livestream-commerce',
    name: 'Livestream Commerce Bundle (TSP + Ads)',
    tierLevel: 'Bundle',
    oneLiner:
      'Full managed livestream with Melia Ads optimization. Hard livestream GMV commit. GPM benchmark guaranteed.',
    status: 'active',
    upsellPosition: null,
    pricingModel: 'Package rate — TSP management fee + Melia % of managed ad spend',
    vinacapitalProvides:
      'Room + Ops + Host + Pub-U Live + GMV Max + post-stream Spark Ads + post-stream report within 2h + monthly QBR',
    successCriteria:
      'Hard livestream GMV target — per stream and monthly aggregate. GPM benchmark guaranteed.',
    bestFor:
      'Brands whose primary TikTok commerce channel is self-selling livestream. Home care, FMCG, electronics — products that need demonstration.',
    composedOf: ['pl2-room-ops-host', 'pl3-pub-u-live', 'pl3-gmv-max', 'pl3-spark-ads'],
    addOns: [],
    moduleSlugs: ['livestream-commerce'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },
  {
    slug: 'bundle-full-commerce',
    name: 'Full Commerce Bundle (CIR + TSP + Ads)',
    tierLevel: 'Bundle',
    oneLiner:
      'The full-stack engagement. Hard total GMV commit. One AM owns affiliate + livestream + ads. Unified reporting. The agency-displacement product.',
    status: 'active',
    upsellPosition: 5,
    pricingModel:
      'Package rate — lower per-component than buying separately. 5-8× revenue vs single-product brand.',
    vinacapitalProvides:
      'CIR Affiliate + TSP Full Managed + Full Melia Ads + unified AM + integrated reporting + monthly QBR',
    successCriteria:
      'Hard total store GMV target — affiliate GMV + livestream GMV combined, monthly. SLA-backed.',
    bestFor:
      "L'Oréal, Unilever, P&G tier MNCs. Large local brands in beauty/FMCG who have committed TikTok commerce as a primary channel for the year.",
    composedOf: ['pl1-cir', 'pl2-room-ops-host', 'pl3-full-service'],
    addOns: [],
    moduleSlugs: ['content-commerce'],
    relevantIcpSlugs: [],
    decisionMakerPersonaSlugs: [],
    firstDefined: '2026-05-20',
  },
];
