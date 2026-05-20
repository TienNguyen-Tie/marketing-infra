import type { CreatorArchetype } from './types';

/**
 * All Creator Archetypes — the recognized types of TAP creators
 * Ecomobi acquires, nurtures, and activates.
 *
 * Seed populated 2026-05-20. Content depth is intentionally LIGHT
 * — required identity fields populated for every archetype, but
 * deeper operational fields left for incremental authoring as
 * the team's understanding of each archetype develops. The
 * transparency pattern (D-008) renders empty fields as muted
 * "Not yet captured" text or ghost cards.
 *
 * 2 archetypes are flagged as 'proposed' — recognized in concept
 * but with little current TAP network presence. These show the
 * 'PROPOSED · pending verification' pill on listing/detail pages.
 *
 * Population tier (core/emerging/niche) is a curated estimate of
 * relative size in the network. Exact creator counts (also
 * curated estimates in v1) live in TAP_NETWORK_OVERVIEW.
 * distributionByArchetype.
 */
export const CREATOR_ARCHETYPES: CreatorArchetype[] = [
  {
    slug: 'beauty-tutorial',
    name: 'Beauty Tutorial Creator',
    shortCode: 'BT',
    oneSentenceDefinition:
      'Creators producing short-form beauty tutorials and product demonstrations, typically posting 3-7 times per week across TikTok feed and Shop tabs.',
    populationTier: 'core',
    status: 'active',
    typicalContentFormats: ['short-video', 'static-image'],
    marketsActive: ['vn', 'ph', 'id'],
    firstDefined: '2026-05-20',
    recognitionCues:
      'Multi-product routines, before/after sequences, "get ready with me" framing, swatches and texture close-ups, low-to-mid production polish but consistent visual identity.',
    contentAndBehavior: {
      primaryContentFormat:
        'Short video (15-60 seconds), tutorial sequence or product walkthrough.',
      postingCadence: '3-7 posts per week.',
    },
    audienceProfile: {
      audienceSizeBands: ['micro', 'mid'],
      audienceSizeNotes:
        'Majority sit in micro and mid bands. A subset graduates to macro through consistent posting + algorithmic favor.',
    },
    acquisitionPatterns: {
      acquisitionDifficulty: 'established',
      acquisitionDifficultyNote:
        'Largest single source — recruit via referral, beauty creator communities, and Passio app discovery.',
    },
    workingHypotheses: [
      {
        statement:
          'Beauty tutorial creators with 10K-50K followers convert at higher win-rates than larger creators because audience trust is stronger at micro-mid bands.',
        date: '2026-05-20',
        status: 'active',
      },
    ],
  },

  {
    slug: 'beauty-livestream-specialist',
    name: 'Beauty Livestream Specialist',
    shortCode: 'BLS',
    oneSentenceDefinition:
      'Creators whose primary commercial output is live shopping streams — typically 3-7 streams per week, often 2-4 hours each, anchored in beauty and personal care.',
    populationTier: 'core',
    status: 'active',
    typicalContentFormats: ['livestream', 'short-video'],
    marketsActive: ['vn', 'ph', 'id'],
    firstDefined: '2026-05-20',
    recognitionCues:
      'Consistent stream schedules, on-camera selling vocabulary, comfortable handling multiple SKUs in a single session, often work with brand-supplied sample boxes.',
    contentAndBehavior: {
      primaryContentFormat: 'Livestream (2-4 hours per session).',
      postingCadence: '3-7 livestream sessions per week.',
      livestreamComfort:
        'Native comfort with livestream selling — this is their primary commercial channel, not an add-on.',
    },
    commercialBehavior: {
      priceSensitivity:
        'Live sellers care intensely about commission rates and sample availability — these are core to their unit economics.',
    },
    acquisitionPatterns: {
      acquisitionDifficulty: 'accessible',
      acquisitionDifficultyNote:
        'Findable through livestream community circles and platform leaderboards. Recruitment hook: sample access + commission + studio support.',
    },
    workingHypotheses: [
      {
        statement:
          'Beauty livestream specialists who also use TSP managed services (Room+Ops+Host) outperform self-managed livestream by 2-3x on average GMV.',
        date: '2026-05-20',
        status: 'active',
      },
    ],
  },

  {
    slug: 'fmcg-haul-family',
    name: 'FMCG Haul / Family Lifestyle Creator',
    shortCode: 'FH',
    oneSentenceDefinition:
      'Family lifestyle creators producing household haul content — multi-product showcases anchored in home care, personal care, and food/beverage purchases.',
    populationTier: 'core',
    status: 'active',
    typicalContentFormats: ['short-video', 'carousel'],
    marketsActive: ['vn', 'ph', 'id'],
    firstDefined: '2026-05-20',
    recognitionCues:
      'Family/household framing (mother, wife, parent identity), multi-product hauls, before/after kitchen or home reveal, value-led framing ("worth the money", "lasts ages").',
    audienceProfile: {
      audienceSizeBands: ['micro', 'mid'],
      audiencePurchaseIntent:
        'High — audience is typically household decision-makers actively shopping for everyday products.',
    },
    acquisitionPatterns: {
      acquisitionDifficulty: 'accessible',
      acquisitionDifficultyNote:
        'Large pool but quality varies. Recruit via sample-led outreach — FMCG haul creators respond to physical product availability.',
    },
  },

  {
    slug: 'electronics-tech-reviewer',
    name: 'Electronics Tech Reviewer',
    shortCode: 'ETR',
    oneSentenceDefinition:
      'Creators producing in-depth electronics reviews — phones, audio, home tech, accessories — typically longer-form content with technical depth.',
    populationTier: 'niche',
    status: 'proposed',
    internalNotes:
      'Proposed archetype — flagged in CEO/sales conversation as a category Ecomobi wants to win client work in but currently under-served in the TAP network. Acquisition push needed.',
    typicalContentFormats: ['long-video', 'short-video'],
    marketsActive: ['vn', 'ph', 'id'],
    firstDefined: '2026-05-20',
    recognitionCues:
      'Technical vocabulary, comparison tables, spec deep-dives, unboxing sequences, established channels with consistent visual identity across long video.',
    acquisitionPatterns: {
      acquisitionDifficulty: 'hard',
      acquisitionDifficultyNote:
        'Tech reviewers operate at scale on YouTube first; TikTok Shop is secondary for most. Recruitment requires targeted outreach with hardware sample programs.',
    },
    workingHypotheses: [
      {
        statement:
          'Tech reviewers prefer YouTube as primary channel; we need a TikTok-Shop-specific commercial proposition (e.g., guaranteed GMV floor, exclusive product access) to convert them.',
        date: '2026-05-20',
        status: 'active',
      },
    ],
    openQuestions: [
      'What hardware sample programs would Ecomobi need to offer to convert top-tier tech reviewers from YouTube-primary to TikTok-Shop-primary?',
      'Is the tech reviewer archetype viable in mid-band audiences (10K-100K), or only at macro?',
    ],
  },

  {
    slug: 'fashion-tryon',
    name: 'Fashion Try-On Creator',
    shortCode: 'FT',
    oneSentenceDefinition:
      'Creators producing apparel and accessories try-on content — outfit-of-the-day, multi-look reveals, sizing and styling demonstrations.',
    populationTier: 'emerging',
    status: 'active',
    typicalContentFormats: ['short-video'],
    marketsActive: ['vn', 'ph', 'id'],
    firstDefined: '2026-05-20',
    recognitionCues:
      'Outfit reveals, mirror or static-camera try-ons, body-positive framing, mix of fast-fashion and mid-tier brand mentions, sizing notes ("I am [X], wearing size [Y]").',
    acquisitionPatterns: {
      acquisitionDifficulty: 'accessible',
      acquisitionDifficultyNote:
        'Growing pool, especially in VN and PH. Recruit via fashion community channels and sample-led outreach.',
    },
  },

  {
    slug: 'parenting-education',
    name: 'Parenting & Education Creator',
    shortCode: 'PE',
    oneSentenceDefinition:
      'Creators producing parenting, family health, and child education content — anchored in trust and expertise, often featuring infant/child products, OTC health, and educational tools.',
    populationTier: 'emerging',
    status: 'active',
    typicalContentFormats: ['short-video', 'long-video'],
    marketsActive: ['vn', 'ph', 'id'],
    firstDefined: '2026-05-20',
    recognitionCues:
      'Parent or family identity foregrounded, child-focused content, educational framing, conservative product endorsement style (high trust threshold), credentials sometimes referenced (pediatrician, teacher).',
    audienceProfile: {
      whatEarnsAudienceTrust:
        'Consistency, perceived expertise, and conservative endorsement patterns. Audience punishes over-commercial behavior.',
    },
    commercialBehavior: {
      priceSensitivity:
        'Less price-sensitive than haul/lifestyle creators — they protect their endorsement signal.',
    },
    acquisitionPatterns: {
      acquisitionDifficulty: 'effortful',
      acquisitionDifficultyNote:
        'Higher trust threshold — they vet brands before partnering. Recruit via brand-safety credentials and credible product partnerships first.',
    },
  },

  {
    slug: 'food-cooking',
    name: 'Food & Cooking Creator',
    shortCode: 'FC',
    oneSentenceDefinition:
      'Creators producing recipe and cooking content — typically anchored in pantry goods, kitchen tools, and ingredient brands; recipe-first format with embedded product mentions.',
    populationTier: 'niche',
    status: 'active',
    typicalContentFormats: ['short-video', 'long-video'],
    marketsActive: ['vn', 'ph', 'id'],
    firstDefined: '2026-05-20',
    recognitionCues:
      'Step-by-step recipe format, ingredient close-ups, branded packaging visible but not emphasized, comfort food and family-meal positioning common.',
    acquisitionPatterns: {
      acquisitionDifficulty: 'accessible',
      acquisitionDifficultyNote:
        'Findable through food creator communities. Sample-led outreach effective — they need ingredients and tools regardless of brand.',
    },
  },

  {
    slug: 'general-livestream-host',
    name: 'General Livestream Host',
    shortCode: 'GLH',
    oneSentenceDefinition:
      'Multi-vertical livestream hosts — comfortable selling across categories in a single session, often working from studios or as part of agency-style host rosters rather than as personal-brand creators.',
    populationTier: 'niche',
    status: 'proposed',
    internalNotes:
      'Proposed archetype — overlaps with TSP (TikTok Shop Partner) host model. Question to validate: do we treat these as TAP creators in the affiliate sense, or are they purely TSP-side resources? May not be a real TAP archetype.',
    typicalContentFormats: ['livestream'],
    marketsActive: ['vn', 'ph', 'id'],
    firstDefined: '2026-05-20',
    acquisitionPatterns: {
      acquisitionDifficulty: 'effortful',
      acquisitionDifficultyNote:
        'Mostly recruited via TSP host pipeline rather than open TAP acquisition. Question whether this is genuinely an archetype or just a TSP resource type.',
    },
    openQuestions: [
      'Are general livestream hosts genuinely TAP creators, or are they a TSP-side resource that should not be modeled in the TAP archetype taxonomy?',
      'If yes, what differentiates them commercially from vertical-specific livestream specialists?',
    ],
  },
];
