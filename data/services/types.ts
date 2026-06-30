export type ModuleSlug =
  | 'livestream-commerce'
  | 'affiliate-marketing'
  | 'brand-advocacy'
  | 'ugc-content-production'
  | 'performance-boosting'
  | 'content-commerce';

// Narrowed to a union of literals in Prompt 3 when routes are built
export type ServiceLineSlug = string;

// Position in the universal upsell path; null = not sequenced / modular
export type UpsellPosition = 1 | 2 | 3 | 4 | 5 | null;

export type DemandRole = 'demand-creation' | 'demand-conversion' | 'consolidation';

export type ServiceStatus = 'active' | 'proposed' | 'deprecated';

export interface Module {
  pillarId: 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6';
  slug: ModuleSlug;
  name: string;
  oneLiner: string;
  corePromise: string;
  demandRole: DemandRole;
  status: ServiceStatus;
  strategicPositioning: string;
  whatItsFor: string;
  audiencePainPoints: string;
  differentiators: string;
  toneAndStyle: string;
  serviceLineSlugs: ServiceLineSlug[];
  relevantIcpSlugs: string[];
  decisionMakerPersonaSlugs: string[];
  firstDefined: string;
}

export interface ServiceLine {
  slug: ServiceLineSlug;
  name: string;
  tierLevel: string;
  oneLiner?: string;
  status: ServiceStatus;
  upsellPosition: UpsellPosition;
  pricingModel?: string;
  vinacapitalProvides?: string;
  brandProvides?: string;
  bestFor?: string;
  successCriteria?: string;
  internalNotes?: string;
  composedOf?: ServiceLineSlug[];
  addOns: ServiceLineSlug[];
  moduleSlugs: ModuleSlug[];
  relevantIcpSlugs: string[];
  decisionMakerPersonaSlugs: string[];
  firstDefined: string;
}

export interface DealUsp {
  slug: string;
  name: string;
  icon: string;
  whenToDeploy: string;
  commercialFrame: string;
  dealsClosed: string;
  resonatesWithPersonaSlugs: string[];
  relevantModuleSlugs: ModuleSlug[];
  relevantServiceLineSlugs: ServiceLineSlug[];
}
