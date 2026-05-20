import type {
  CreatorArchetype,
  CreatorMarket,
  TapNetworkOverview,
  ArchetypeSlug,
  MarketSlug,
  PopulationTier,
  EntityStatus,
  ContentFormat,
  AudienceSizeBand,
} from './types';
import { CREATOR_ARCHETYPES } from './archetypes';
import { CREATOR_MARKETS } from './markets';
import { TAP_NETWORK_OVERVIEW } from './network';

// ─── ARCHETYPE LOOKUPS ────────────────────────────────────────

export function getAllArchetypes(): CreatorArchetype[] {
  return CREATOR_ARCHETYPES;
}

export function getArchetypeBySlug(
  slug: ArchetypeSlug
): CreatorArchetype | undefined {
  return CREATOR_ARCHETYPES.find(a => a.slug === slug);
}

export function getArchetypesByPopulationTier(
  tier: PopulationTier
): CreatorArchetype[] {
  return CREATOR_ARCHETYPES.filter(a => a.populationTier === tier);
}

export function getArchetypesByStatus(
  status: EntityStatus
): CreatorArchetype[] {
  return CREATOR_ARCHETYPES.filter(a => a.status === status);
}

export function getArchetypesByMarket(
  marketSlug: MarketSlug
): CreatorArchetype[] {
  return CREATOR_ARCHETYPES.filter(a =>
    a.marketsActive.includes(marketSlug)
  );
}

export function getArchetypesByContentFormat(
  format: ContentFormat
): CreatorArchetype[] {
  return CREATOR_ARCHETYPES.filter(a =>
    a.typicalContentFormats.includes(format)
  );
}

// ─── MARKET LOOKUPS ───────────────────────────────────────────

export function getAllMarkets(): CreatorMarket[] {
  return CREATOR_MARKETS;
}

export function getMarketBySlug(
  slug: MarketSlug
): CreatorMarket | undefined {
  return CREATOR_MARKETS.find(m => m.slug === slug);
}

// ─── NETWORK OVERVIEW ─────────────────────────────────────────

export function getTapNetworkOverview(): TapNetworkOverview {
  return TAP_NETWORK_OVERVIEW;
}

export function getArchetypeCountInNetwork(
  archetypeSlug: ArchetypeSlug
): number {
  const entry = TAP_NETWORK_OVERVIEW.distributionByArchetype
    .find(d => d.archetypeSlug === archetypeSlug);
  return entry?.estimatedCount ?? 0;
}

export function getMarketCountInNetwork(
  marketSlug: MarketSlug
): number {
  const entry = TAP_NETWORK_OVERVIEW.distributionByMarket
    .find(d => d.marketSlug === marketSlug);
  return entry?.estimatedCount ?? 0;
}

// ─── COUNT HELPERS (for stats strips on listing pages) ────────

export function getCreatorStats(): {
  archetypeCount: number;
  coreArchetypeCount: number;
  emergingArchetypeCount: number;
  nicheArchetypeCount: number;
  proposedArchetypeCount: number;
  marketCount: number;
  estimatedActiveCount: number;
  estimatedTotalRegisteredCount: number;
} {
  return {
    archetypeCount: CREATOR_ARCHETYPES.length,
    coreArchetypeCount: CREATOR_ARCHETYPES.filter(
      a => a.populationTier === 'core'
    ).length,
    emergingArchetypeCount: CREATOR_ARCHETYPES.filter(
      a => a.populationTier === 'emerging'
    ).length,
    nicheArchetypeCount: CREATOR_ARCHETYPES.filter(
      a => a.populationTier === 'niche'
    ).length,
    proposedArchetypeCount: CREATOR_ARCHETYPES.filter(
      a => a.status === 'proposed'
    ).length,
    marketCount: CREATOR_MARKETS.length,
    estimatedActiveCount: TAP_NETWORK_OVERVIEW.estimatedActiveCount,
    estimatedTotalRegisteredCount:
      TAP_NETWORK_OVERVIEW.estimatedTotalRegisteredCount,
  };
}

// ─── DISPLAY LABEL HELPERS ────────────────────────────────────

export const POPULATION_TIER_LABELS: Record<PopulationTier, string> = {
  core: 'Core',
  emerging: 'Emerging',
  niche: 'Niche',
};

export const CONTENT_FORMAT_LABELS: Record<ContentFormat, string> = {
  livestream: 'Livestream',
  'short-video': 'Short Video',
  'long-video': 'Long Video',
  'static-image': 'Static Image',
  carousel: 'Carousel',
};

export const AUDIENCE_SIZE_BAND_LABELS: Record<AudienceSizeBand, string> = {
  micro: 'Micro (<10K)',
  mid: 'Mid (10K-100K)',
  macro: 'Macro (100K-1M)',
  mega: 'Mega (>1M)',
};
