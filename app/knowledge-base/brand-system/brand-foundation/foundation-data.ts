/* ── TYPES ─────────────────────────────────────────────────── */

export type VariantTier = 'overarching' | 'localized';

// kebab-case values; display via AUDIENCE_LABELS
export type Audience = 'brands' | 'employer-branding';

// lowercase values; display via MARKET_LABELS
export type Market = 'vn' | 'th' | 'id' | 'ph' | 'my' | 'sg';

export type DiffState = 'unchanged' | 'modified' | 'added' | 'removed';

// which scope this layer was authored for (independent of variant tier)
export type LayerScope = 'universal' | 'audience' | 'market';

export interface BrandLayer {
  id: string;
  layerNumber: string;
  layerName: string;
  title: string;
  body: string;
  scope: LayerScope;
  diffState?: DiffState;
}

export interface FoundationVariant {
  tier: VariantTier;
  audience: Audience;
  market?: Market;        // only for tier === 'localized'
  status: 'locked' | 'draft' | 'empty';
  version?: string;
  layers: BrandLayer[];
}

export interface ContextToken {
  id: string;
  category: 'market' | 'audience' | 'channel' | 'objective';
  label: string;
  value: string;
  defaultActive: boolean;
}

export interface Metric {
  number: string;
  label: string;
}

export interface AspirationalQuote {
  primary: string;
  secondary: string;
  eyebrow: string;
}

/* ── DISPLAY MAPS ──────────────────────────────────────────── */

export const AUDIENCE_LABELS: Record<Audience, string> = {
  'brands': 'Brand',
  'employer-branding': 'Employer Branding',
};

export const MARKET_LABELS: Record<Market, string> = {
  'vn': 'VN',
  'th': 'TH',
  'id': 'ID',
  'ph': 'PH',
  'my': 'MY',
  'sg': 'SG',
};

/* ── SEED DATA: BRAND OVERARCHING (locked) ─────────────────── */

const overarchingBrandsLayers: BrandLayer[] = [
  {
    id: 'ob-01',
    layerNumber: '01',
    layerName: 'Brand Essence',
    title: 'Expertise, Experience, Growth.',
    body: "Our brand DNA. A diverse team of world-class professionals, deep experience in Vietnam complemented by international expertise, and a commitment to continually learn and grow with the market.",
    scope: 'universal',
  },
  {
    id: 'ob-02',
    layerNumber: '02',
    layerName: 'Our Belief',
    title: 'Everyone should have access to Vietnam’s prosperity and growth.',
    body: "We passionately believe in Vietnam’s extraordinary economic potential — and that local and international investors alike should be able to benefit from it.",
    scope: 'universal',
  },
  {
    id: 'ob-03',
    layerNumber: '03',
    layerName: 'Proposition',
    title: 'Vietnam’s only multi-disciplinary investment manager.',
    body: "Uniquely positioned to create value and share the opportunities and benefits of the country’s growth across every asset class — listed equity, private equity, venture, real estate, fixed income.",
    scope: 'universal',
  },
  {
    id: 'ob-04',
    layerNumber: '04',
    layerName: 'Brand Personality',
    title: 'Focused, passionate, driven — balanced by diligence.',
    body: "Proud of our track record but ambitious for more; adaptable when a new approach is needed. Our appetite for opportunity is always balanced by research, discipline, and good governance.",
    scope: 'universal',
  },
];

/* ── ALL VARIANTS ──────────────────────────────────────────── */

const ALL_AUDIENCES: Audience[] = ['brands', 'employer-branding'];
const ALL_MARKETS: Market[] = ['vn', 'th', 'id', 'ph', 'my', 'sg'];

export const variants: FoundationVariant[] = [
  // ── 1 locked overarching ──
  {
    tier: 'overarching',
    audience: 'brands',
    status: 'locked',
    version: 'v2026',
    layers: overarchingBrandsLayers,
  },
  // ── 2 empty overarching ──
  { tier: 'overarching', audience: 'employer-branding', status: 'empty', layers: [] },
  // ── 18 empty localized (3 audiences × 6 markets) ──
  ...ALL_AUDIENCES.flatMap((audience) =>
    ALL_MARKETS.map((market) => ({
      tier: 'localized' as VariantTier,
      audience,
      market,
      status: 'empty' as const,
      layers: [],
    })),
  ),
];

/* ── HELPER ────────────────────────────────────────────────── */

export function getVariant(
  tier: VariantTier,
  audience: Audience,
  market?: Market,
): FoundationVariant {
  const found = variants.find(
    (v) =>
      v.tier === tier &&
      v.audience === audience &&
      (tier === 'localized' ? v.market === market : true),
  );
  return found ?? { tier, audience, market, status: 'empty', layers: [] };
}

/* ── METRICS ───────────────────────────────────────────────── */

export const metrics: Metric[] = [
  { number: '2003', label: 'Founded' },
  { number: '6', label: 'Asset Classes' },
  { number: '200+', label: 'Team Members' },
  { number: '20+', label: "Years' Experience" },
];

/* ── ASPIRATIONAL QUOTE ────────────────────────────────────── */

export const aspirationalQuote: AspirationalQuote = {
  eyebrow: 'VinaCapital — Brand Foundation',
  primary: 'Creating prosperity\ntogether.',
  secondary:
    'Our core values, global knowledge, local insight and many years of experience make us the trusted partner for investing in Vietnam — for local and international investors alike.',
};

/* ── CONTEXT TOKENS ────────────────────────────────────────── */

export const contextTokens: ContextToken[] = [
  // Market
  { id: 'mk-vn', category: 'market', label: 'Vietnam', value: 'Vietnam market: TikTok-dominant, strong livestream culture, price-sensitive mid-market', defaultActive: true },
  { id: 'mk-th', category: 'market', label: 'Thailand', value: 'Thailand market: premium-skewing, strong brand loyalty, Line and TikTok mix', defaultActive: false },
  { id: 'mk-id', category: 'market', label: 'Indonesia', value: 'Indonesia market: largest SEA population, Tokopedia/Shopee dominant, diverse regional cultures', defaultActive: false },
  { id: 'mk-ph', category: 'market', label: 'Philippines', value: 'Philippines market: high English fluency, Facebook-dominant, strong OFW gifting economy', defaultActive: false },
  { id: 'mk-my', category: 'market', label: 'Malaysia', value: 'Malaysia market: bilingual audience (EN/BM), premium and halal-conscious segments', defaultActive: false },
  { id: 'mk-sg', category: 'market', label: 'Singapore', value: 'Singapore market: regional HQ clients, B2B-skewing, premium positioning only', defaultActive: false },
  // Audience
  { id: 'aud-brands', category: 'audience', label: 'Brand CMO', value: 'Audience: Brand-side marketing decision maker — CMO or Head of Ecommerce. Cares about GMV attribution, CAC, brand safety', defaultActive: true },
  { id: 'aud-employer-branding', category: 'audience', label: 'Employer Branding', value: 'Audience: Employer branding — positioning VinaCapital as a destination for talent, emphasising culture, growth, and mission', defaultActive: false },
  // Channel
  { id: 'ch-tiktok', category: 'channel', label: 'TikTok Shop', value: 'Channel: TikTok Shop — short-video + livestream, algorithm-driven discovery, affiliate-native', defaultActive: true },
  { id: 'ch-shopee', category: 'channel', label: 'Shopee Affiliate', value: 'Channel: Shopee Affiliate — price-sensitive, voucher-heavy, high conversion intent', defaultActive: false },
  { id: 'ch-b2b', category: 'channel', label: 'B2B Deck', value: 'Channel: B2B pitch deck or proposal — formal tone, data-heavy, boardroom-ready', defaultActive: false },
  // Objective
  { id: 'obj-scale', category: 'objective', label: 'Scale', value: 'Objective: Scale reach — emphasise momentum, network density, and operational throughput', defaultActive: true },
  { id: 'obj-trust', category: 'objective', label: 'Build Trust', value: 'Objective: Build brand trust — emphasise authenticity, rigorous vetting, long-term brand safety', defaultActive: false },
  { id: 'obj-enter', category: 'objective', label: 'Market Entry', value: 'Objective: Market entry — emphasise local network depth, regulatory know-how, and market-specific proof', defaultActive: false },
];
