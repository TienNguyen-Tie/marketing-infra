export type ICPStatus = 'active' | 'evaluating' | 'deprioritized' | 'validated';
export type ICPTier = 1 | 2 | 3;
export type SocialCommerceMaturity = 'experimenting' | 'scaling' | 'mature' | 'disrupted';
export type FitConfidence = 'high' | 'medium' | 'low';
export type HypothesisStatus = 'testing' | 'confirmed' | 'disproven';

export interface ICP {
  // ── Identity (Section 01) ──
  slug: string;
  name: string;
  shortCode: string;
  status: ICPStatus;
  tier: ICPTier;
  verticalTags: string[];
  geography: string[];
  firstDefined?: string;
  lastReviewed?: string;

  // ── Definition Statement (Section 02) ──
  oneSentenceDefinition?: string;
  inclusionCriteria?: string[];
  exclusionCriteria?: string[];
  edgeCases?: string;

  // ── Company Profile (Section 03) ──
  companyProfile?: {
    typicalSize?: string;
    orgStructure?: string;
    operatingMarkets?: string;
    socialCommerceMaturity?: SocialCommerceMaturity;
    existingVendorFootprint?: string;
    techStackHints?: string;
  };

  // ── Business Pressures (Section 04) ──
  businessPressures?: {
    strategic?: string;
    operational?: string;
    market?: string;
    distinctive?: string;
  };

  // ── Buyers & Decision Process (Section 05) ──
  decisionProcess?: {
    primaryPersonaSlug?: string;
    primaryPersonaLabel?: string;
    influencerPersonas?: Array<{
      name: string;
      role: string;
      slug?: string;
    }>;
    decisionTimeline?: string;
    decisionStyle?: string;
    approvalGates?: string[];
    budgetCycle?: string;
  };

  // ── Why This ICP Fits Ecomobi (Section 06) ──
  whyFits?: {
    strengthsAligned?: string;
    whyBeatAlternatives?: string;
    marginEconomics?: string;
    lifetimeValue?: string;
  };

  // ── Pitch Solution (Section 07) ──
  pitchSolution?: {
    pitchPhaseSolution?: string;
    pitchFormat?: string;
    requiredStakeholders?: string[];
    commonObjections?: Array<{ objection: string; response: string }>;
    differentiatorsToLeadWith?: string[];
    antiPatterns?: string[];
  };

  // ── Service Mix (Section 08) ──
  serviceMix?: {
    heroServices?: string[];
    commonAddOns?: string[];
    rarelySold?: Array<{ pCode: string; whyNot: string }>;
    typicalSequencing?: string;
  };

  // ── Outcomes & Proof (Section 10) ──
  outcomes?: {
    metrics?: Array<{ value: string; label: string; source?: string }>;
    citableOutcomes?: Array<{
      headline: string;
      portfolioSlug?: string;
      projectSlug?: string;
      description: string;
    }>;
    narrative?: string;
  };

  // ── Story Capital (Section 11) ──
  storyCapital?: {
    definingWins?: Array<{ date?: string; label: string; description: string }>;
    learningCases?: Array<{
      date?: string;
      label: string;
      description: string;
      takeaway: string;
    }>;
    quotableMaterial?: Array<{ quote: string; attribution: string }>;
    uniqueAngles?: string;
  };

  // ── Sourcing & Targeting (Section 12) ──
  sourcing?: {
    whereTheyCluster?: string[];
    sourcingChannels?: string[];
    triggerEvents?: string[];
    watchList?: Array<{
      companyName: string;
      fitConfidence: FitConfidence;
      lastTouchpoint?: string;
      nextAction?: string;
      owner?: string;
    }>;
    antiTargets?: Array<{ companyName: string; whyNot: string }>;
  };

  // ── Outreach Patterns (Section 13) ──
  outreach?: {
    effectiveAngles?: string[];
    channelPreferences?: string;
    timing?: string;
    failedPatterns?: string[];
  };

  // ── Internal Notes & Hypotheses (Section 15) ──
  notes?: {
    workingHypotheses?: Array<{
      statement: string;
      date?: string;
      status: HypothesisStatus;
    }>;
    openQuestions?: string[];
  };

  // ── Reference Index (Section 16) ──
  referenceIndex?: {
    tagClusters?: Array<{ name: string; tags: string[] }>;
    linkedEntities?: Array<{ name: string; type: string; slug?: string }>;
    aiNote?: string;
  };
}
