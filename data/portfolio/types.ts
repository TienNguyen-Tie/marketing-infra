export type ProjectType = 'full-case' | 'adhoc';
export type ClientCategory = 'beauty' | 'mom-kid' | 'home-care' | 'fnb' | 'fashion' | 'electronics';
export type SizeTier = 'mnc' | 'enterprise' | 'local-large' | 'local-indie' | 'mid-market' | 'sme';
export type BU = 'direct-brand' | 'affiliate' | 'creator-acq';
export type ServiceCode = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'P7';
export type TagClusterCategory = 'industry' | 'geography' | 'size-type' | 'service-combo' | 'outcome-type' | 'bu-coverage';
export type LinkedEntityKind = 'icp' | 'persona' | 'service' | 'case' | 'account';

export type BrandStatus = 'active' | 'prospect' | 'lapsed';

export interface Brand {
  id: string;
  name: string;
  status: BrandStatus;
  subCategory?: string;
  targetConsumer?: string;
  brandManager?: string;
  pitchSolution?: string;
  contractedServices?: ServiceCode[];
  gmvLabel?: string;
}

export interface AccountContact {
  name: string;
  role: string;
  personaSlug: string;
  personaLabel: string;
  isPrimary?: boolean;
}

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

export interface PortfolioAccount {
  slug: string;
  name: string;
  initials: string;
  parentCompany: string;
  parentSlug: string;
  categoryName: string;
  categorySlug: string;
  isGeneralCategory: boolean;
  category: ClientCategory;
  categoryLabel: string;
  industry: string;
  market: string;
  sizeTier: SizeTier;
  sizeTierLabel: string;
  parentEntity?: string;
  engagedSince: string;
  primaryBU: BU;
  icpSlug: string;
  icpLabel: string;
  icpVerified: boolean;
  icpRationale: string;
  keyContacts: AccountContact[];
  brands: Brand[];
  projects: Project[];
  totalGmvLabel?: string;
  accountPatterns: Pattern[];
  tagClusters: TagCluster[];
  linkedEntities: LinkedEntity[];
  version: string;
  lastVerified: string;
  accountBrief?: AccountBrief;
  accountSolution?: AccountSolution;
  accountOutcomes?: AccountOutcome;
}

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
