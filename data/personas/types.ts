export type PersonaType = 'champion' | 'influencer' | 'blocker' | 'gatekeeper' | 'mixed';
export type SeniorityLevel = 'operator' | 'manager' | 'director' | 'executive';
export type InfluenceLevel = 'decider' | 'influencer' | 'gate' | 'executor';

export interface Persona {
  // ── Identity (Section 01) ──
  slug: string;
  name: string;
  shortCode: string;
  personaType: PersonaType;
  seniorityLevel: SeniorityLevel;
  typicalJobTitles: string[];
  typicalReportingLine?: string;
  firstDefined?: string;
  lastReviewed?: string;

  // ── Snapshot (Section 02) ──
  snapshot?: {
    oneSentenceDefinition?: string;
    coreRole?: string;
    typicalBackground?: string;
  };

  // ── What They Care About (Section 03) ──
  caresAbout?: {
    personalIncentives?: string;
    publicGoals?: string[];
    privateGoals?: string[];
  };

  // ── Pressures and Fears (Section 04) ──
  pressuresAndFears?: {
    keepsThemUpAtNight?: string;
    commonFrustrations?: string;
    fearOfFailureModes?: string;
    makesThemDefensive?: string;
  };

  // ── How They Make Decisions (Section 05) ──
  decisionMaking?: {
    decisionStyle?: string;
    evidenceThatPersuades?: string[];
    evidenceThatDoesnt?: string[];
    influenceSourcesTrusted?: string[];
  };

  // ── Communication Preferences (Section 06) ──
  communication?: {
    preferredChannels?: string;
    toneTheyRespondTo?: string;
    cadenceExpectations?: string;
    meetingStyle?: string;
  };

  // ── Pitch Patterns (Section 07) ──
  pitchPatterns?: {
    openingHooks?: string[];
    pitchStructure?: string;
    materialsTheyWantToSee?: string[];
    antiPatterns?: string[];
  };

  // ── Common Objections (Section 08) ──
  commonObjections?: Array<{
    objection: string;
    response: string;
  }>;

  // ── Their Role in Deals (Section 09) ──
  roleInDeals?: {
    typicalInfluenceLevel?: InfluenceLevel;
    whenInCycleTheyEnter?: string;
    whatTheyOwnVsHandOff?: string;
    alliesAndAdversaries?: string;
  };

  // ── ICP Variations (Section 10) ──
  icpVariations?: Array<{
    icpSlug: string;
    behaviorAtThisIcp: string;
  }>;

  // ── Reference Index (Section 12) ──
  referenceIndex?: {
    tagClusters?: Array<{ name: string; tags: string[] }>;
    linkedEntities?: Array<{ name: string; type: string; slug?: string }>;
    aiNote?: string;
  };
}
