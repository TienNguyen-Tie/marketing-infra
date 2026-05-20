import type { TapNetworkOverview } from './types';

/**
 * TAP Network overview snapshot — curated estimates, v1.
 *
 * Numbers below are PLACEHOLDER ESTIMATES to seed the structure.
 * They are deliberately round and conservative. User should
 * refresh monthly from Passio admin or other authoritative data
 * source.
 *
 * No Passio integration yet (snapshotMethod: 'curated'). The
 * structure is non-breakingly-swappable to integrated data
 * when/if integration is built.
 */
export const TAP_NETWORK_OVERVIEW: TapNetworkOverview = {
  snapshotDate: '2026-05-20',
  snapshotMethod: 'curated',

  estimatedActiveCount: 8000,
  estimatedDormantCount: 4000,
  estimatedTotalRegisteredCount: 12000,

  distributionByArchetype: [
    {
      archetypeSlug: 'beauty-tutorial',
      estimatedCount: 2400,
      note: 'Largest single archetype; concentrated in VN.',
    },
    {
      archetypeSlug: 'beauty-livestream-specialist',
      estimatedCount: 1600,
      note: 'Second-largest; livestream-mature in VN, growing in PH and ID.',
    },
    {
      archetypeSlug: 'fmcg-haul-family',
      estimatedCount: 1800,
      note: 'Cross-market distribution roughly even.',
    },
    {
      archetypeSlug: 'electronics-tech-reviewer',
      estimatedCount: 120,
      note: 'Under-represented — acquisition gap flagged for sales/CEO discussion.',
    },
    {
      archetypeSlug: 'fashion-tryon',
      estimatedCount: 800,
      note: 'Growing, especially in VN and PH.',
    },
    {
      archetypeSlug: 'parenting-education',
      estimatedCount: 600,
      note: 'Smaller but high-trust; over-indexed in PH.',
    },
    {
      archetypeSlug: 'food-cooking',
      estimatedCount: 400,
      note: 'Niche but stable; even distribution across markets.',
    },
    {
      archetypeSlug: 'general-livestream-host',
      estimatedCount: 280,
      note: 'Mostly TSP-pipeline. Question whether this should be counted as a TAP archetype at all.',
    },
  ],

  distributionByMarket: [
    {
      marketSlug: 'vn',
      estimatedCount: 4500,
      note: 'Largest by far — most established TAP market.',
    },
    {
      marketSlug: 'ph',
      estimatedCount: 2000,
      note: 'Mid-tier presence.',
    },
    {
      marketSlug: 'id',
      estimatedCount: 1500,
      note: 'Smallest but growing fastest.',
    },
  ],

  distributionByAudienceSizeBand: [
    {
      band: 'micro',
      estimatedCount: 5400,
      note: 'Long-tail majority — micro creators (<10K) dominate.',
    },
    {
      band: 'mid',
      estimatedCount: 2200,
      note: 'Sweet spot for commercial activation.',
    },
    {
      band: 'macro',
      estimatedCount: 350,
      note: 'Concentrated in beauty livestream specialists.',
    },
    {
      band: 'mega',
      estimatedCount: 50,
      note: 'Rare; typically activated via TSP-side rather than open TAP.',
    },
  ],

  notableCreators: [],

  observations:
    "TAP network skews heavily toward beauty and FMCG verticals, reflecting historical client demand. Electronics is the most-flagged acquisition gap. Vietnam-vs-Indonesia presence imbalance (3x) is a strategic question — Indonesia's larger total population means TAP's relative penetration is much lower there. All numbers are May 2026 curated estimates; refresh monthly from Passio admin.",
};
