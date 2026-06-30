import type { Module } from './types';

/**
 * All 6 Service Modules — the strategic frames.
 *
 * Demand architecture:
 *   - Demand creation:    P3 Brand Advocacy (brand-led), P4 UGC Content (content-led)
 *   - Demand conversion:  P1 Livestream (ops), P2 Affiliate (network), P5 Performance (paid)
 *   - Consolidation:      P6 Content Commerce (flywheel)
 *
 * P7 from the legacy stub routes is intentionally NOT a module.
 */
export const SERVICE_MODULES: Module[] = [
  {
    slug: 'livestream-commerce',
    pillarId: 'P1',
    name: 'Livestream Commerce',
    oneLiner:
      'End-to-end livestream commerce — facility, host, ops, and data — built on the deepest studio infrastructure in Southeast Asia.',
    corePromise:
      'Turn livestream from a campaign moment into a scalable revenue channel — with the infrastructure, trained hosts, and real-time optimization that make every stream accountable to a number.',
    demandRole: 'demand-conversion',
    status: 'active',

    strategicPositioning:
      'The high-touch operations module. Livestream commerce requires physical infrastructure, trained human talent, and continuous operational depth — none of which can be shortcut. This module is where VinaCapital separates from agencies that rent capability rather than own it.',
    whatItsFor:
      'Brands committed to livestream as a primary commerce channel. Whether running 2 streams a month or 200, this module covers facility access through to flagship event production.',
    audiencePainPoints:
      "No in-house livestream team. Stream revenue is volatile and underperforming. Lack of scripts and host quality. High operational cost without ROI. Can't measure GPM (gross profit margin per stream).",
    differentiators:
      "Southeast Asia's largest branded livestream factory: 2,000m² studio, 80+ rooms across HCM, Hanoi, Manila, Jakarta. 15,000+ livestream hours per month. 100+ trained hosts. L'Oréal 2024 Winning Agency.",
    toneAndStyle:
      'Professional, credibility-first, data-driven. Show facility scale and real numbers. Behind-the-scenes content resonates.',

    serviceLineSlugs: [
      'pl2-facility-only',
      'pl2-room-ops-host',
      'pl2-host-only',
      'pl2-mega-production',
      'pl2-mega-kol',
      'bundle-livestream-commerce',
    ],
    relevantIcpSlugs: ['mnc-global-fmcg', 'regional-d2c-beauty', 'vietnamese-domestic-cpg'],
    decisionMakerPersonaSlugs: ['regional-commerce-director', 'brand-manager'],
    firstDefined: '2026-05-20',
  },

  {
    slug: 'affiliate-marketing',
    pillarId: 'P2',
    name: 'Affiliate Marketing',
    oneLiner:
      "Multi-marketplace affiliate system connecting brands with VinaCapital's 1M+ creator network — across every major social commerce platform.",
    corePromise:
      'Build authentic purchase demand at scale — through a creator network that earns trust with audiences before it earns commission from brands.',
    demandRole: 'demand-conversion',
    status: 'active',

    strategicPositioning:
      "The foundational module. Affiliate is where VinaCapital started — commission-based, performance-accountable, creator-native. Every other module compounds the affiliate engine's reach.",
    whatItsFor:
      'Brands testing TikTok Shop, Shopee, or Lazada affiliate; brands scaling proven products through curated creator pools; MNCs running seasonal campaigns with hard GMV commits.',
    audiencePainPoints:
      "Creator commerce feels uncontrolled. No way to measure which creators drive real GMV. Can't scale beyond a handful of trusted KOLs. Commission negotiation is ad-hoc per deal.",
    differentiators:
      '1M+ creators across 6 SEA markets, AI-powered matching via the Passio platform, automated payment cycles shortened from 90 days to 25 days, fraud detection at the engagement layer. Born in affiliate — not added later.',
    toneAndStyle:
      'Performance-led, numbers-forward. Show creator counts, payment speed, GMV examples. Less narrative, more proof.',

    serviceLineSlugs: [
      'pl1-open-plan',
      'pl1-pure-commission',
      'pl1-comm-sample',
      'pl1-cir',
      'bundle-affiliate-commerce',
    ],
    relevantIcpSlugs: ['mnc-global-fmcg', 'regional-d2c-beauty', 'vietnamese-domestic-cpg'],
    decisionMakerPersonaSlugs: ['regional-commerce-director', 'brand-manager'],
    firstDefined: '2026-05-20',
  },

  {
    slug: 'brand-advocacy',
    pillarId: 'P3',
    name: 'Brand Advocacy',
    oneLiner:
      'Creator-led brand building at scale — content production focused on share-of-voice, brand safety, and algorithmic discoverability across social platforms.',
    corePromise:
      'Fill every stage of the awareness journey with authentic creator content — measured in trust and presence, not GMV.',
    demandRole: 'demand-creation',
    status: 'active',

    strategicPositioning:
      "The brand-team module. Where commerce buyers measure GMV, brand teams measure share-of-voice and brand lift. This module speaks to that buyer — and earns the right to a commerce conversation later.",
    whatItsFor:
      'Brand teams at MNCs running upper-funnel campaigns. New product launches needing trust-building before commerce activation. Brands with brand-safety procurement requirements.',
    audiencePainPoints:
      "Need creator content but worried about brand safety. KOL campaigns feel like one-off transactions, not ongoing relationships. Hard to prove brand-side ROI on creator spend.",
    differentiators:
      '5,000+ videos per month production capability. Passio platform fraud detection. Brand-safety pre-review baked into every engagement.',
    toneAndStyle:
      'Brand-conscious, trust-led. Less data, more narrative. Tone matches premium beauty/FMCG buyer language.',

    serviceLineSlugs: [
      'branded-content-at-scale',
      'always-on-creator-network',
    ],
    relevantIcpSlugs: ['mnc-global-fmcg', 'mnc-pharma-otc'],
    decisionMakerPersonaSlugs: ['brand-manager'],
    firstDefined: '2026-05-20',
  },

  {
    slug: 'ugc-content-production',
    pillarId: 'P4',
    name: 'UGC Content Production',
    oneLiner:
      'The content factory — mass UGC production with angle testing, win-rate optimization, and platform-conformant output for any social commerce channel.',
    corePromise:
      "Move every stage of the purchase journey with content that doesn't just reach your audience — it moves them toward buying with genuine conviction.",
    demandRole: 'demand-creation',
    status: 'active',

    strategicPositioning:
      'The content infrastructure module. Where Brand Advocacy is brand-led, UGC Content is operator-led — built for brands that need authentic content at volume, optimized for performance, deployable across whichever platform they sell on.',
    whatItsFor:
      'Brands scaling TikTok Shop content needs. Performance teams looking for systematic angle testing. Cross-border brands needing local creator content.',
    audiencePainPoints:
      'Content win-rate is unpredictable. Producing volume is expensive and slow. Brand-made creative underperforms creator-led content but creator content is hard to control at scale.',
    differentiators:
      '60-day Content Factory setup. 500+ creators per active engagement. 1,000+ content variations per month. Win-rate target >30% (vs industry average ~15%). Systematic angle testing built into the operation.',
    toneAndStyle:
      'Operator-led, factory metaphor. Show throughput numbers, win-rate percentages, content variation counts.',

    serviceLineSlugs: [
      'content-factory-60day',
      'angle-testing',
      'creator-briefing-qc',
      'always-on-ugc-subscription',
    ],
    relevantIcpSlugs: ['mnc-global-fmcg', 'regional-d2c-beauty', 'vietnamese-domestic-cpg', 'mnc-pharma-otc'],
    decisionMakerPersonaSlugs: ['brand-manager', 'regional-commerce-director'],
    firstDefined: '2026-05-20',
  },

  {
    slug: 'performance-boosting',
    pillarId: 'P5',
    name: 'Performance Boosting',
    oneLiner:
      'The performance media operation — Spark Ads, GMV Max, Pub-U Live, and account optimization that makes every other VinaCapital service perform harder.',
    corePromise:
      'Make every piece of winning content work harder and every livestream reach further — turning authentic intent into measurable, scalable GMV growth.',
    demandRole: 'demand-conversion',
    status: 'active',

    strategicPositioning:
      'The amplification layer. Sold standalone to brands already spending on TikTok Ads with poor ROAS, or bundled with affiliate and livestream to multiply impact. This is where VinaCapital competes directly with media agencies — and wins on creator-integrated Spark Ads ROAS.',
    whatItsFor:
      'Brands burning budget on TikTok Ads with brand-made creative underperforming. Cross-border brands without local TikTok entity access. MNCs ready to replace incumbent media agencies.',
    audiencePainPoints:
      "Brand-made TikTok Ads underperform creator-led Spark Ads by 2-3x. Can't get local TikTok Ads account access for cross-border entry. ROAS plateaus and incumbent agency can't unlock the next level.",
    differentiators:
      'Creator-integrated Spark Ads (using the same creators activated in Affiliate). Verified TikTok Business Center access for cross-border brands. Every $1M in managed ad spend = $100-150K VinaCapital revenue at zero incremental COGS.',
    toneAndStyle:
      'Performance media voice — ROAS-led, % uplift-led. Compete on numbers, not narrative.',

    serviceLineSlugs: [
      'pl3-account-rental',
      'pl3-spark-ads',
      'pl3-gmv-max',
      'pl3-pub-u-live',
      'pl3-full-service',
    ],
    relevantIcpSlugs: ['mnc-global-fmcg', 'regional-d2c-beauty', 'vietnamese-domestic-cpg'],
    decisionMakerPersonaSlugs: ['regional-commerce-director', 'country-gm'],
    firstDefined: '2026-05-20',
  },

  {
    slug: 'content-commerce',
    pillarId: 'P6',
    name: 'Content Commerce',
    oneLiner:
      'The full-stack consolidation — demand creation and demand conversion under one plan, one team, one GMV target.',
    corePromise:
      'Become a self-sustaining social commerce growth engine — the agency-displacement product for brands serious about social commerce as a primary channel.',
    demandRole: 'consolidation',
    status: 'active',

    strategicPositioning:
      'The destination module. Where the other five modules feed in, Content Commerce is the consolidated engagement: one AM, one ROAS view, one GMV number. This is what replaces Publicis (or any incumbent agency) on social commerce.',
    whatItsFor:
      "L'Oréal-tier MNCs ready for annual commitment. Large local brands consolidating their social commerce operation. Brands at Month 6+ of the universal upsell path.",
    audiencePainPoints:
      'Multiple vendors creating coordination overhead. No unified ROAS view across content, affiliate, livestream, and ads. Annual incumbent agency contract delivering diminishing returns.',
    differentiators:
      'One AM owns affiliate + livestream + ads + content. Unified weekly reporting. Package rate 5-8× revenue vs single-product engagement. Replaces Publicis on TikTok commerce.',
    toneAndStyle:
      'C-suite voice. Strategic narrative-led, not product-led. Frame as architecture choice, not service purchase.',

    serviceLineSlugs: [
      'bundle-full-commerce',
      'multi-marketplace-engagement',
      'content-commerce-diagnostic',
      'flywheel-onboarding',
    ],
    relevantIcpSlugs: ['mnc-global-fmcg', 'regional-d2c-beauty'],
    decisionMakerPersonaSlugs: ['regional-commerce-director', 'country-gm'],
    firstDefined: '2026-05-20',
  },
];
