export type Slug = string;
export type ArchetypeSlug = Slug;
export type MarketSlug = Slug;

export type EntityStatus = 'active' | 'proposed' | 'sunset';

export type PopulationTier = 'core' | 'emerging' | 'niche';

export type ContentFormat =
  | 'livestream'
  | 'short-video'
  | 'long-video'
  | 'static-image'
  | 'carousel';

export type AcquisitionDifficulty =
  | 'established'
  | 'accessible'
  | 'effortful'
  | 'hard';

export type AudienceSizeBand =
  | 'micro'
  | 'mid'
  | 'macro'
  | 'mega';

export type ActivityLevel =
  | 'active'
  | 'dormant'
  | 'churned';

export interface CreatorArchetype {
  // ── Identity ──────────────────────────────────────────────
  slug: ArchetypeSlug;
  name: string;
  shortCode?: string;
  oneSentenceDefinition: string;
  populationTier: PopulationTier;
  status: EntityStatus;

  typicalContentFormats: ContentFormat[];
  marketsActive: MarketSlug[];
  firstDefined: string;
  lastReviewed?: string;
  internalNotes?: string;

  // ── Recognition (Section 02) ──────────────────────────────
  recognitionCues?: string;

  // ── Content & Behavior (Section 03) ───────────────────────
  contentAndBehavior?: {
    primaryContentFormat?: string;
    contentThemes?: string;
    postingCadence?: string;
    livestreamComfort?: string;
  };

  // ── Audience Profile (Section 04) ─────────────────────────
  audienceProfile?: {
    audienceSizeBands?: AudienceSizeBand[];
    audienceSizeNotes?: string;
    audienceDemographics?: string;
    audiencePurchaseIntent?: string;
    whatEarnsAudienceTrust?: string;
  };

  // ── Commercial Behavior (Section 05) ──────────────────────
  commercialBehavior?: {
    typicalGmvBand?: string;
    typicalContentWinRate?: string;
    priceSensitivity?: string;
    commissionPreferences?: string;
    sampleExpectations?: string;
  };

  // ── Acquisition Patterns (Section 06) ─────────────────────
  acquisitionPatterns?: {
    acquisitionDifficulty?: AcquisitionDifficulty;
    acquisitionDifficultyNote?: string;
    whereTheyCluster?: string;
    sourcingChannelsThatWork?: string[];
    outreachHooksThatLand?: string[];
    antiPatterns?: string[];
  };

  // ── Nurturing & Retention (Section 07) ────────────────────
  nurturingAndRetention?: {
    whatKeepsThemActive?: string;
    commonDropOffReasons?: string;
    whatMakesTopPerformers?: string;
    dealBreakers?: string;
  };

  // ── Market Variations (Section 08) ────────────────────────
  marketVariations?: Array<{
    marketSlug: MarketSlug;
    variationNote: string;
  }>;

  // ── Working Hypotheses (Section 09) ───────────────────────
  workingHypotheses?: Array<{
    statement: string;
    date?: string;
    status: 'active' | 'validated' | 'disproven';
  }>;

  // ── Open Questions (Section 10) ───────────────────────────
  openQuestions?: string[];
}

export interface CreatorMarket {
  slug: MarketSlug;
  name: string;
  countryCode: string;
  status: EntityStatus;

  oneLiner: string;

  // ── Macro Context ─────────────────────────────────────────
  macroContext?: {
    creatorEconomyMaturity?: string;
    platformBehaviorNotes?: string;
    regulationNotes?: string;
    topContentCategories?: string;
  };

  // ── Operational Notes ─────────────────────────────────────
  operationalNotes?: {
    tapPresenceLevel?: string;
    preferredLanguages?: string;
    paymentInfrastructure?: string;
  };

  firstDefined: string;
  lastReviewed?: string;
  internalNotes?: string;
}

export interface TapNetworkOverview {
  snapshotDate: string;
  snapshotMethod: 'curated' | 'integrated';

  estimatedActiveCount: number;
  estimatedDormantCount: number;
  estimatedTotalRegisteredCount: number;

  distributionByArchetype: Array<{
    archetypeSlug: ArchetypeSlug;
    estimatedCount: number;
    note?: string;
  }>;

  distributionByMarket: Array<{
    marketSlug: MarketSlug;
    estimatedCount: number;
    note?: string;
  }>;

  distributionByAudienceSizeBand: Array<{
    band: AudienceSizeBand;
    estimatedCount: number;
    note?: string;
  }>;

  notableCreators?: Array<{
    handle: string;
    archetypeSlug?: ArchetypeSlug;
    marketSlug?: MarketSlug;
    note?: string;
  }>;

  observations?: string;
}
