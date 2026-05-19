export type ProjectType = 'full-case' | 'adhoc';
export type ClientCategory = 'beauty' | 'mom-kid' | 'home-care' | 'fnb' | 'fashion' | 'electronics';
export type SizeTier = 'mnc' | 'enterprise' | 'local-large' | 'local-indie' | 'mid-market' | 'sme';
export type BU = 'direct-brand' | 'affiliate' | 'creator-acq';
export type ServiceCode = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'P7';
export type TagClusterCategory = 'industry' | 'geography' | 'size-type' | 'service-combo' | 'outcome-type' | 'bu-coverage';
export type LinkedEntityKind = 'icp' | 'persona' | 'service' | 'case' | 'account';
export type BrandStatus = 'active' | 'prospect' | 'pitched' | 'lapsed' | 'paused';
export type MarketPosition = 'leader' | 'challenger' | 'niche' | 'emerging';
export type CoPromoType = 'event' | 'platform' | 'co-content' | 'industry-presence';

/* ── Product ─────────────────────────────────────────────── */

export type ProductStatus = 'hero' | 'active' | 'upcoming' | 'considered' | 'sunset';
export type ProductMarketingRole = 'hero' | 'new-launch' | 'volume-driver' | 'portfolio-expansion' | 'heritage';

export interface Product {
  id: string;
  slug?: string;
  name: string;
  productLine?: string;
  categoryType?: string;
  status: ProductStatus;
  marketingRole?: ProductMarketingRole;
  targetSubAudience?: string;
  positioning?: string;
  servicesDeployed?: string[];
  performanceHighlight?: string;
}

/* ── Brand ───────────────────────────────────────────────── */

export interface Brand {
  id: string;
  slug?: string;
  name: string;
  status: BrandStatus;
  subCategory?: string;
  targetConsumer?: string;
  brandManager?: string;
  pitchSolution?: string;
  contractedServices?: ServiceCode[];
  gmvLabel?: string;

  // Brand dossier fields (brand detail page)
  positioning?: string;
  voiceTone?: string;
  messagingPillars?: string[];
  brandAudience?: {
    demographics?: string;
    psychographics?: string;
    channelPreferences?: string;
    notes?: string;
  };
  products?: Product[];
  brandStoryCapital?: {
    definingNarrative?: string;
    storyWorthyMoments?: StoryWorthyMoment[];
    quotableMaterial?: string;
    uniqueAngles?: string;
  };
  brandTopCreators?: Array<{
    name: string;
    handle?: string;
    audienceMatch?: string;
    notes?: string;
  }>;
  brandContentAngles?: Array<{
    id: string;
    angle: string;
    why: string;
    exampleProject?: string;
  }>;
  brandOutcomes?: {
    metrics?: Array<{ value: string; label: string; source?: string }>;
    narrative?: string;
  };
  brandReferenceIndex?: {
    tagClusters?: Array<{ name: string; tags: string[] }>;
    linkedEntities?: Array<{ name: string; type: string }>;
    aiNote?: string;
  };
}

/* ── Contacts ────────────────────────────────────────────── */

export interface AccountContact {
  name: string;
  role: string;
  personaSlug?: string;
  personaLabel?: string;
  isPrimary?: boolean;
}

/* ── Project types ───────────────────────────────────────── */

export interface DeployedService {
  code: ServiceCode;
  detail: string;
  bu: BU;
  since: string;
}

export interface OutcomeMetric {
  value: string;
  label: string;
  source: string;
}

export interface NarrativeOutcome {
  type: 'award' | 'recognition' | 'case-study';
  text: string;
}

export interface Pattern {
  id: string;
  title: string;
  appliesTo: string;
  insight: string;
}

export interface TagCluster {
  category: TagClusterCategory;
  label: string;
  tags: string[];
}

export interface LinkedEntity {
  kind: LinkedEntityKind;
  slug: string;
  label: string;
}

export interface AccountBrief {
  goals: string[];
  painPoints: string[];
}

export interface AccountSolution {
  servicesOverview: string;
  reasoning: string;
}

export interface AccountOutcome {
  metrics: OutcomeMetric[];
  narrative: string;
}

export interface KPI {
  name: string;
  target: string;
  achieved: string;
  met: boolean;
}

export interface Milestone {
  milestone: string;
  date: string;
}

export interface ProjectBase {
  slug: string;
  name: string;
  brandSlug: string;
  brandName: string;
  type: ProjectType;
  period: string;
  services: ServiceCode[];
  outcomeHeadline: string;
}

export interface FullCaseProject extends ProjectBase {
  type: 'full-case';
  goals: string[];
  painPoints: string[];
  deployedServices: DeployedService[];
  approachReasoning: string;
  outcomeMetrics: OutcomeMetric[];
  narrativeOutcomes: NarrativeOutcome[];
  patterns: Pattern[];
  tagClusters: TagCluster[];
  linkedEntities: LinkedEntity[];
  version: string;
  lastVerified: string;
  projectObjective?: string;
  concept?: string;
  contentStrategy?: string;
  timeline?: Milestone[];
  targetAudience?: string;
  audienceReached?: string;
  kpis?: KPI[];
}

export interface AdhocProject extends ProjectBase {
  type: 'adhoc';
  briefNote: string;
  outcomeNote: string;
}

export type Project = FullCaseProject | AdhocProject;

/* ── Marketing dossier sections ──────────────────────────── */

export interface CategoryMarketIntelligence {
  categorySize?: string;
  categoryGrowth?: string;
  marketPosition?: MarketPosition;
  keyCompetitors?: string[];
  marketDynamicsNotes?: string;
}

export interface AudienceInsights {
  demographics?: string;
  psychographics?: string;
  purchaseBehavior?: string;
  channelPreferences?: string;
  notes?: string;
}

export interface StoryWorthyMoment {
  date?: string;
  label: string;
  description?: string;
}

export interface StoryCapital {
  definingNarrative?: string;
  storyWorthyMoments?: StoryWorthyMoment[];
  quotableMaterial?: string;
  uniqueAngles?: string;
}

export interface TopPerformer {
  name: string;
  handle?: string;
  notes?: string;
}

export interface CreatorStrategy {
  creatorProfile?: string;
  audienceMatch?: string;
  contentStyleNeeds?: string;
  topPerformers?: TopPerformer[];
  notes?: string;
}

export interface ContentAngle {
  id: string;
  angle: string;
  why: string;
  exampleProject?: string;
}

export interface CoPromotionOpportunity {
  id: string;
  type: CoPromoType;
  title: string;
  description?: string;
  timing?: string;
}

/* ── Portfolio account ───────────────────────────────────── */

export interface PortfolioAccount {
  // Identity
  slug: string;
  name: string;
  initials: string;
  version: string;
  lastVerified: string;

  // Portfolio = Parent × Category
  parentCompany: string;
  parentSlug: string;
  categoryName: string;
  categorySlug: string;
  isGeneralCategory: boolean;

  // Legacy category (kept for filter compatibility)
  category: ClientCategory;
  categoryLabel: string;

  // Profile
  industry: string;
  market: string;
  sizeTier: SizeTier;
  sizeTierLabel: string;
  parentEntity?: string;
  engagedSince: string;
  primaryBU: BU;
  icpSlug?: string;
  /** @deprecated Use icpSlug + getIcpBySlug() for canonical name. Kept for backward compat. */
  icpLabel?: string;
  icpVerified?: boolean;
  icpRationale?: string;
  totalGmvLabel?: string;

  // Brands & contacts
  keyContacts: AccountContact[];
  brands: Brand[];
  projects: Project[];

  // Reference tags
  tagClusters: TagCluster[];
  linkedEntities: LinkedEntity[];

  // GROUP C — Engagement
  accountBrief?: AccountBrief;
  accountSolution?: AccountSolution;
  accountOutcomes?: AccountOutcome;

  // GROUP B — Market & Audience
  categoryMarketIntelligence?: CategoryMarketIntelligence;
  audienceInsights?: AudienceInsights;

  // GROUP D — Story Capital
  storyCapital?: StoryCapital;

  // GROUP E — Creator Strategy
  creatorStrategy?: CreatorStrategy;

  // GROUP F — Marketing Playbook
  contentAngles?: ContentAngle[];
  coPromotionOpportunities?: CoPromotionOpportunity[];
}

/* ── Lookup tables ───────────────────────────────────────── */

export const SERVICE_NAMES: Record<ServiceCode, string> = {
  P1: 'Livestream Commerce',
  P2: 'UGC & Content Production',
  P3: 'TikTok Shop Partner',
  P4: 'Performance Media',
  P5: 'Affiliate & Creator Network',
  P6: 'Technology & Data Platform',
  P7: 'Service Seven',
};

export const CATEGORY_LABELS: Record<ClientCategory, string> = {
  beauty: 'Beauty & Personal Care',
  'mom-kid': 'Mom & Kid',
  'home-care': 'Home Care',
  fnb: 'Food & Beverage',
  fashion: 'Fashion & Apparel',
  electronics: 'Electronics & Tech',
};

export const CATEGORY_ORDER: ClientCategory[] = [
  'beauty', 'mom-kid', 'home-care', 'fnb', 'fashion', 'electronics',
];

export const SIZE_TIER_LABELS: Record<SizeTier, string> = {
  mnc: 'MNC',
  enterprise: 'Enterprise',
  'local-large': 'Local Large',
  'local-indie': 'Local Indie',
  'mid-market': 'Mid-market',
  sme: 'SME',
};

export const BU_LABELS: Record<BU, string> = {
  'direct-brand': 'Direct Brand',
  affiliate: 'Affiliate',
  'creator-acq': 'Creator Acq.',
};

export const MARKET_POSITION_LABELS: Record<MarketPosition, string> = {
  leader: 'Category Leader',
  challenger: 'Challenger',
  niche: 'Niche',
  emerging: 'Emerging',
};

export const COPROMO_TYPE_LABELS: Record<CoPromoType, string> = {
  event: 'Event',
  platform: 'Platform',
  'co-content': 'Co-content',
  'industry-presence': 'Industry Presence',
};
