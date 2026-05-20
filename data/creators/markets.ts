import type { CreatorMarket } from './types';

/**
 * The 3 markets the TAP Creator network spans:
 *   - Vietnam (vn)
 *   - Philippines (ph)
 *   - Indonesia (id)
 *
 * Macro context fields seeded from reasonably-public knowledge
 * about TikTok Shop in each market. Operational notes are LIGHT
 * — user fills in TAP-specific details (presence depth, payment
 * specifics) as the team's understanding develops.
 */
export const CREATOR_MARKETS: CreatorMarket[] = [
  {
    slug: 'vn',
    name: 'Vietnam',
    countryCode: 'VN',
    status: 'active',
    oneLiner:
      "Southeast Asia's most mature TikTok Shop market — livestream-heavy, high creator commerce density, established affiliate culture.",
    macroContext: {
      creatorEconomyMaturity:
        'Most mature in SEA. Livestream commerce embedded in everyday shopping behavior, especially in Tier 1-2 cities. Established creator commerce hierarchy from micro to mega tiers.',
      platformBehaviorNotes:
        'Vietnamese consumers spend significant time on TikTok Shop daily. Mega-event sensitivity (Tết, 9.9, 10.10, 11.11, 12.12) creates predictable GMV peaks. Livestream and shoppable short-video drive most TikTok Shop GMV.',
      topContentCategories:
        'Beauty (largest), home & living, personal care, fashion, food/snacks, mom & baby.',
    },
    operationalNotes: {
      tapPresenceLevel:
        'Deepest TAP presence — Ecomobi headquarters in Vietnam; largest creator pool and most established acquisition pipelines.',
      preferredLanguages: 'Vietnamese (primary), English (secondary).',
      paymentInfrastructure:
        'Local bank transfers via Passio app. 25-day payment cycle (was 90-day) is a key creator-side differentiator.',
    },
    firstDefined: '2026-05-20',
  },

  {
    slug: 'ph',
    name: 'Philippines',
    countryCode: 'PH',
    status: 'active',
    oneLiner:
      'Community-led TikTok Shop market with English-language advantage — strong micro-influencer culture and growing livestream adoption.',
    macroContext: {
      creatorEconomyMaturity:
        'Mid-maturity. Strong community-led culture means trust and authenticity weigh heavily. Smaller per-creator GMV than Vietnam at equivalent audience size, but higher engagement per follower.',
      platformBehaviorNotes:
        'English-language content dominates, which lowers barrier for cross-border brand entry. Mobile-first consumption. Livestream growing but still secondary to short-video.',
      topContentCategories:
        'Beauty, fashion, lifestyle, food, electronics (smaller share than VN but growing).',
    },
    operationalNotes: {
      tapPresenceLevel:
        'Established but smaller than VN. Acquisition pipelines work well in Metro Manila, weaker outside Luzon.',
      preferredLanguages: 'English (primary), Filipino/Tagalog (secondary).',
    },
    firstDefined: '2026-05-20',
  },

  {
    slug: 'id',
    name: 'Indonesia',
    countryCode: 'ID',
    status: 'active',
    oneLiner:
      "SEA's largest population market — massive scale, brand-safety scrutiny higher than peers, regulatory environment more complex.",
    macroContext: {
      creatorEconomyMaturity:
        "Largest creator pool in SEA by absolute count. Quality variance higher — top tier is excellent but long-tail noise is significant. Livestream growing rapidly post-TikTok-Shop reopening in 2024.",
      platformBehaviorNotes:
        'Strong religious and cultural considerations in content. Halal and modesty norms shape product fit. Hijab fashion is a major sub-vertical. Regulatory environment around livestream commerce has been volatile (TikTok Shop suspended and reinstated in 2024).',
      topContentCategories:
        'Modest fashion, hijab styling, halal beauty/skincare, mom & baby, electronics, food (especially Ramadan-period).',
      regulationNotes:
        'Brand-safety scrutiny higher than VN or PH — both platform-side and government-side. Content vetting more critical for MNC clients.',
    },
    operationalNotes: {
      tapPresenceLevel:
        'Growing but less deep than VN. Acquisition focused on Jakarta-Surabaya-Bandung corridor.',
      preferredLanguages: 'Bahasa Indonesia (primary), English (limited).',
    },
    firstDefined: '2026-05-20',
  },
];
