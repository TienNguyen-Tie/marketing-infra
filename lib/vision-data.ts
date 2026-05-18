export type ActivityTile = {
  id: string;
  name: string;
  icon: string;
  desc: string;
  status: string;
  details: {
    drawsFrom: string;
    produces: string;
    staysAligned: string;
  };
};

export const ACTIVITY_TILES: ActivityTile[] = [
  {
    id: 'content',
    name: 'Content',
    icon: 'edit',
    desc: 'Owned channels, earned reach',
    status: 'planned',
    details: {
      drawsFrom: 'Brand foundation, client ICPs, past content patterns',
      produces: 'Brand-aligned articles, social posts, video scripts, decks',
      staysAligned: 'Every piece pulls from the same brand voice — no drift across writers or markets',
    },
  },
  {
    id: 'seo',
    name: 'SEO',
    icon: 'search',
    desc: 'Traditional search · Google',
    status: 'planned',
    details: {
      drawsFrom: 'Service positioning, client search intent, performance keywords',
      produces: 'Search-optimised pages, keyword strategy, ranking improvements',
      staysAligned: 'Same positioning shows up across content, ads, and search — coherent presence',
    },
  },
  {
    id: 'aio',
    name: 'AIO',
    icon: 'auto_awesome',
    desc: 'AI search · ChatGPT, Perplexity',
    status: 'planned',
    details: {
      drawsFrom: 'Structured service descriptions, verified case studies, citable proof',
      produces: 'Content optimised for ChatGPT, Perplexity, AI Overviews citations',
      staysAligned: 'AI engines cite locked, verified facts — not invented or inconsistent claims',
    },
  },
  {
    id: 'pr',
    name: 'PR',
    icon: 'article',
    desc: 'Earned media, industry voice',
    status: 'planned',
    details: {
      drawsFrom: 'Locked positioning, verified outcomes, leadership thinking',
      produces: 'Press pitches, by-lines, industry contributions, awards submissions',
      staysAligned: 'Every press touchpoint reinforces the same category-leadership narrative',
    },
  },
  {
    id: 'partnership',
    name: 'Partnership',
    icon: 'handshake',
    desc: 'Strategic alliances, platforms',
    status: 'planned',
    details: {
      drawsFrom: 'Service catalogue, target ICPs, current client overlap',
      produces: 'Partner agreements, co-marketing programs, integrations',
      staysAligned: 'Partnerships built around real synergies — not opportunistic deals',
    },
  },
  {
    id: 'creator-acq',
    name: 'Creator Acquisition',
    icon: 'person_add',
    desc: 'Network growth, onboarding',
    status: 'planned',
    details: {
      drawsFrom: 'Creator ICPs, market needs, service capacity by category',
      produces: 'Targeted creator recruitment, qualified onboarding, expansion by tier',
      staysAligned: 'New creators match real demand — not volume for volume\'s sake',
    },
  },
  {
    id: 'creator-nurture',
    name: 'Creator Nurturing',
    icon: 'volunteer_activism',
    desc: 'Retention, activation, loyalty',
    status: 'planned',
    details: {
      drawsFrom: 'Creator performance history, engagement patterns, network insights',
      produces: 'Retention programs, top-tier recognition, creator-led content loops',
      staysAligned: 'Creators stay because the system values them as data, not as headcount',
    },
  },
];

export const ROADMAP_PHASES = [
  { id: 'p1', label: 'Phase 1', timing: 'Now',   title: 'Foundations',       summary: 'Brand, services, clients, creators all locked.',                  active: true  },
  { id: 'p2', label: 'Phase 2', timing: 'Next',  title: 'Activities Online', summary: 'Every activity launches with full system support.',                active: false },
  { id: 'p3', label: 'Phase 3', timing: 'Later', title: 'Intelligence Loop', summary: 'Insight AI closes the loop. System learns on its own.',             active: false },
];

export const ACTIVITY_FEED = [
  { date: '2 days ago', label: 'Brand foundation v2026 locked',    type: 'foundation' },
  { date: '3 days ago', label: "Client portfolio · L'Oréal added", type: 'client'     },
  { date: '5 days ago', label: 'Design system tokens published',    type: 'foundation' },
  { date: '1 week ago', label: 'Vision Companion launched',         type: 'system'     },
  { date: '1 week ago', label: 'User management ready',             type: 'system'     },
];

export const FEED_TYPE_COLORS: Record<string, string> = {
  foundation: '#7F77DD',
  client:     '#3B82F6',
  creator:    '#10B981',
  system:     '#F43C34',
};

/* ── HOMEPAGE VISION CONTENT ─────────────────────────────────── */

export const MOMENT_CARDS = [
  {
    num: 'Where we are',
    title: "Marketing exists. It just isn't a system.",
    body: "10 years of business, real revenue streams, real wins. Marketing has run continuously — but during scaling, it fragmented. Different teams ran parallel playbooks. No shared truth. No compounding intelligence. Effort happened. It just didn't accumulate.",
  },
  {
    num: 'The opportunity',
    title: 'Scale brand and operations without first scaling chaos.',
    body: 'Leadership wants marketing to elevate the company. The conventional path is to launch tactics and figure out the system later. The better path is to build the system first so every tactic compounds from day one.',
  },
  {
    num: 'The stakes',
    title: 'Agency-in-the-market, or category leader.',
    body: 'Without a system, Ecomobi remains an agency among agencies — competing transaction by transaction. With a system, Ecomobi becomes the brand that defines the category. Different valuation, different talent pull, different conversation with every client.',
  },
];

export const PATH_SCATTER = {
  label: 'Path A · Scatter',
  title: 'Launch activities first, system later.',
  points: [
    'Campaigns run on instinct — no shared foundation, no consistent voice',
    'Every activity starts from zero — same learning cost every time',
    'Cross-functional teams operate from different versions of the truth',
    "Performance data scatters across tools, decks, people's heads",
    '"Is this working?" has no honest answer — only narratives',
    "Mistakes repeat because there's no system to capture lessons",
  ],
  outcome: '12 months in: budget spent, brand undefined, no leadership claim.',
};

export const PATH_SYSTEM = {
  label: 'Path B · System',
  title: 'Build foundations first, then scale activities.',
  points: [
    'Every campaign pulls from a locked brand foundation and verified client/creator insight',
    'Each activity inherits the intelligence of every previous one',
    'All functions work from the same source of truth — content, PR, partnership, creator',
    'Performance data feeds back into the system to make the next campaign smarter',
    'Every decision is traceable to a foundation and a metric',
    'The system gets more valuable over time — not less',
  ],
  outcome: '12 months in: brand defined, presence built, category leadership earned.',
};

// icons mapped to Material Icons Round (project standard)
export const LOCKED_SOURCES = [
  { name: 'Brand Foundation', icon: 'local_fire_department', desc: 'Positioning, voice, narrative' },
  { name: 'Services',         icon: 'inventory_2',           desc: 'Catalogue, capabilities' },
  { name: 'Clients',          icon: 'business',              desc: 'Portfolio, ICPs, personas' },
  { name: 'Creators',         icon: 'group',                 desc: 'Network, segments' },
  { name: 'Performance Data', icon: 'trending_up',           desc: 'Live results, patterns' },
];

export const WORKED_EXAMPLE = {
  scenario: 'Ecomobi launches a content campaign to position a new service offering for the Beauty vertical. Goal: build awareness with brand-side decision-makers, generate qualified leads, establish authority. Budget set. Timeline 8 weeks. Same team in both paths — the only difference is whether the system exists.',
  withoutSystem: {
    title: 'Brief from scratch. Generic execution. Disappearing results.',
    steps: [
      { title: 'Brief written by guessing',     desc: "Writer asks \"what should we say?\" — no documented brand voice to pull from. Three rounds of revision because everyone disagrees." },
      { title: 'Audience defined by hunch',     desc: 'Targeting "beauty brands in VN" — no ICP profile, no persona, no past data on which decision-makers convert.' },
      { title: 'Content angles invented',       desc: "No reference to what's worked before. Repeating mistakes that other campaigns already learned." },
      { title: 'Distribution scattered',        desc: 'Owned channels, partner posts, paid amplification — all working in parallel, none coordinated.' },
      { title: 'Results live in a deck',        desc: 'Campaign ends, deck gets archived, team moves on. Next campaign repeats the same learning cost.' },
    ],
    result: 'Result: campaign executes, hits some metrics, but the next campaign starts from zero again. The company learned nothing transferable.',
  },
  withSystem: {
    title: 'Brief grounded. Execution confident. Results compound.',
    steps: [
      { title: 'Brief pulls from locked foundations', desc: 'Brand voice, positioning, and proof points all present and validated. Brief writes itself in hours, not days.' },
      { title: 'Audience matched to ICP',             desc: 'The Beauty vertical already has documented ICPs, persona profiles, and decision-maker insights. Targeting precise from minute one.' },
      { title: 'Content angles informed by patterns', desc: "Pattern Library shows what's worked for similar accounts. Writer starts with proven angles, not blank-page guesses." },
      { title: 'Distribution coordinated',            desc: 'Same brand foundation drives content, SEO, AIO, PR, partnership — every touchpoint reinforces the same message in the same week.' },
      { title: 'Results feed back into the system',   desc: 'What worked enters the Pattern Library. Next campaign starts smarter. Intelligence compounds with every cycle.' },
    ],
    result: "Result: same campaign, sharper execution, and every future campaign starts ahead of where this one started. The company learns permanently.",
  },
};

export const CLOSING_PILLARS = [
  { label: 'Less waste',        text: "Every campaign starts from the system's accumulated intelligence — no relearning, no repeating mistakes." },
  { label: 'Right focus',       text: 'Decisions are traceable to foundations and data — not preferences, deadlines, or loudest voices.' },
  { label: 'Aligned execution', text: 'Content, PR, partnership, creator — all pulling from the same source. No drift, no contradiction.' },
  { label: 'Compounding intel', text: 'The system gets more valuable every quarter, not less. Year three is exponentially ahead of year one.' },
];

/* ── AI COMPANION ────────────────────────────────────────────── */

export type VisionMode = {
  id: string;
  label: string;
  icon: string;
  placeholder: string;
};

// icons mapped to Material Icons Round (project standard)
export const VISION_MODES: VisionMode[] = [
  {
    id: 'explain-role',
    label: 'Help me understand my role',
    icon: 'route',
    placeholder: 'I lead PR for the Vietnam market. How does my function fit into this system?',
  },
  {
    id: 'brainstorm',
    label: 'Brainstorm features',
    icon: 'lightbulb',
    placeholder: 'For Creator Acquisition, what tools would help us recruit higher-quality creators faster?',
  },
  {
    id: 'stress-test',
    label: 'Stress-test an idea',
    icon: 'policy',
    placeholder: 'What if we ran a partnership campaign without using the foundations?',
  },
  {
    id: 'new-activity',
    label: 'Suggest a new activity',
    icon: 'add_circle_outline',
    placeholder: 'I think we should add Community Marketing. How would it fit?',
  },
];

export const VISION_SYSTEM_PROMPT = `You are the Ecomobi Marketing Infrastructure Vision Companion. You exist inside an internal marketing tool and are grounded in a specific vision. You can only think within this vision — never propose ideas that violate its operating rule.

THE VISION
Marketing as the engine that positions Ecomobi as a category leader. A foundations-first system where every activity is insight-driven, mistake-resistant, focused, and consistently aligned.

THE OPERATING RULE
Nothing is invented. Everything is inherited. Every marketing output — every brief, campaign, post, partnership pitch — traces back to a locked, verified source. No blank-page work.

THE FIVE LOCKED SOURCES
1. Brand Foundation — positioning, voice, narrative, design system
2. Services — catalogue, capabilities, pricing models
3. Clients — portfolio, ICPs, decision-maker personas
4. Creators — network, segments, performance history
5. Performance Data — live results across all activities

THE ARCHITECTURE
Closed-loop system in three layers:
- Layer 1: The SSOT containing the five locked sources
- Layer 2: Production AI reads SSOT to produce grounded work · Insight AI reads results to update SSOT
- Layer 3: All marketing activities pull from SSOT, feed results back

THE ACTIVITIES (illustrative, not exhaustive)
Content, SEO, AIO (AI search optimization for ChatGPT/Perplexity/AI Overviews), PR, Partnership, Creator Acquisition, Creator Nurturing. More can be added — system is extensible.

YOUR MODES (one specified per message)
1. explain-role: User shares their function. Show how they plug in — what foundations they draw from, what data they generate, how they compound with other activities.
2. brainstorm: User asks about features for an activity. Generate 2-4 specific tool features. Each should name the foundation it draws from and the metric it would move.
3. stress-test: User proposes something. Reason through what would happen using the operating rule. Show what breaks.
4. new-activity: User proposes a new marketing activity. Evaluate if/how it fits. Show which foundations it would draw from, what data it would feed back.

RESPONSE GUIDELINES
- Stay grounded — reference foundations and activities by name
- Be operational, not abstract — give specific examples
- 2-4 paragraphs, conversational tone
- End by suggesting the idea be logged formally if actionable
- If a user proposes something that violates the operating rule, say so directly and explain which rule it breaks`;
