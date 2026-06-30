/* Retail brokers / platforms — the front door to VOF's retail investors.
   Retail holders can't be profiled individually, so the broker is the unit of analysis:
   understand the platform AND the investors on it. The orientation is BRANDING — every
   insight serves how VOF promotes the future of Vietnam's economy to that platform's
   audience (the only listed access to Vietnam's listed AND private champions, 20+ years
   building leaders, ~USD 1bn AUM, the "Doi Moi 2.0" next chapter). Facts from each
   platform's disclosures and reputable coverage (cited). AUA/client figures are
   approximate and move over time. */

export interface Broker {
  slug: string;
  name: string;
  /* list-card fields */
  type: string;
  scale: string;
  role: string;
  /* hero */
  descriptor: string;
  /* facts */
  snapshot: { label: string; value: string }[];
  /* scannable detail */
  atAGlance: string[];
  investorProfile: string;       // the retail investors on this platform — lead
  investorTraits: string[];      // chips
  editorialQuote: string;        // how the platform shapes what gets bought — pull-quote
  editorialPoints: string[];
  brandHook: string;             // the Vietnam-future brand story for this platform's audience
  howToWin: string[];            // brand-led actions to win visibility & land that story
  watchOuts: string[];           // chips
  sources: { label: string; url: string }[];
}

export const BROKERS: Broker[] = [
  {
    slug: 'hargreaves-lansdown',
    name: 'Hargreaves Lansdown',
    type: 'D2C platform',
    scale: '~£150bn AUA',
    role: 'The UK’s largest platform — and ~6.7% of VOF as nominee.',
    descriptor: 'The UK’s biggest direct-to-consumer platform — mass-affluent, brand-loyal, and the single biggest pool of VOF’s retail investors.',
    snapshot: [
      { label: 'Founded', value: '1981' },
      { label: 'HQ', value: 'Bristol, UK' },
      { label: 'AUA', value: '~£150bn' },
      { label: 'Clients', value: '~1.8m' },
    ],
    atAGlance: [
      'Largest UK D2C platform (~1.8m clients).',
      'Holds ~6.7% of VOF as nominee.',
      'Editorial power: the Wealth Shortlist.',
      'Mass-affluent, older, brand-loyal — premium fees.',
    ],
    investorProfile: 'HL’s clients skew mass-affluent and older, value brand and service over the lowest fee, and lean heavily on HL’s own research to decide.',
    investorTraits: ['Mass-affluent', 'Older / retirement-focused', 'Advice-curious', 'Brand-loyal', 'Research-led'],
    editorialQuote: 'What HL features, HL’s clients buy — the Wealth Shortlist and fund research are the shelf.',
    editorialPoints: [
      'The Wealth Shortlist and fund/trust ratings drive discovery.',
      'Strong factsheets, commentary and tools are what surface a fund.',
    ],
    brandHook: 'A simple way for UK savers to own Vietnam’s future — the next great Asian growth story, in one trusted, 20-year trust.',
    howToWin: [
      'Put the Vietnam-future story on HL’s shelf: optimistic, simple, “own the new tiger economy”.',
      'Earn the Wealth Shortlist with the 20-year record and the dividend as trust signals.',
      'Educational content that makes Vietnam’s future understandable to a mass-affluent saver.',
    ],
    watchOuts: ['Premium fees vs flat-fee rivals', 'Editorial, not pay-to-play', 'FCA promotion rules'],
    sources: [
      { label: 'Hargreaves Lansdown — VOF listing', url: 'https://www.hl.co.uk/shares/shares-search-results/v/vinacapital-vietnam-opportunity-usd0.01' },
    ],
  },
  {
    slug: 'interactive-investor',
    name: 'interactive investor',
    type: 'Flat-fee D2C platform',
    scale: '~£93bn AUA',
    role: 'Home of experienced, cost-conscious DIY investors.',
    descriptor: 'The UK’s #1 flat-fee platform (owned by abrdn) — home to experienced, cost-aware DIY investors and an unusually active community.',
    snapshot: [
      { label: 'Founded', value: '1995' },
      { label: 'HQ', value: 'London' },
      { label: 'AUA', value: '~£93bn' },
      { label: 'Clients', value: '~492k' },
    ],
    atAGlance: [
      'UK’s #1 flat-fee platform (£4.99/mo+).',
      '~492k customers, ~£93bn AUA.',
      'Owned by abrdn since 2022.',
      'Experienced DIY investors; active forums.',
    ],
    investorProfile: 'ii skews to experienced, self-directed investors with larger portfolios — the flat fee rewards size — who research hard and debate on the community.',
    investorTraits: ['Experienced DIY', 'Cost-conscious (flat fee)', 'Larger portfolios', 'Forum-active', 'Trust-savvy'],
    editorialQuote: 'Discovery runs through ii’s curated lists, model portfolios and an unusually engaged community.',
    editorialPoints: [
      'The “Super 60” / “ACE 40” lists and ratings steer picks.',
      'The ii community forums shape sentiment on investment trusts.',
    ],
    brandHook: 'The depth case for Vietnam’s future — the only listed way to own its private champions, for investors who do their homework.',
    howToWin: [
      'Give the ii audience the deep Vietnam-future thesis — data, the champions VOF built, Doi Moi 2.0.',
      'Earn Super 60 / community credibility with rigour, not slogans.',
      'Frame unique access to private leaders as the edge experienced DIY investors prize.',
    ],
    watchOuts: ['Flat fee suits bigger portfolios', 'Sceptical, sophisticated audience', 'FCA rules'],
    sources: [
      { label: 'interactive investor', url: 'https://www.ii.co.uk/' },
    ],
  },
  {
    slug: 'aj-bell',
    name: 'AJ Bell',
    type: 'Low-cost D2C platform',
    scale: '~£109bn AUA',
    role: 'Cost-focused, SIPP / pension-heavy investors.',
    descriptor: 'A FTSE 250 low-cost platform out of Manchester — strong with cost-focused, pension-led (SIPP/ISA) long-term investors.',
    snapshot: [
      { label: 'Founded', value: '1995' },
      { label: 'HQ', value: 'Manchester, UK' },
      { label: 'AUA', value: '~£109bn' },
      { label: 'Clients', value: '~723k' },
    ],
    atAGlance: [
      'FTSE 250 low-cost platform (~0.25% custody).',
      '~723k customers, ~£109bn AUA.',
      'SIPP / ISA and pension-heavy.',
      'Value-seeking, long-term holders.',
    ],
    investorProfile: 'AJ Bell’s base is cost-conscious and pension-focused — SIPP and ISA investors building or drawing down for the long run.',
    investorTraits: ['Cost-focused', 'SIPP / pension-led', 'Long-term / decumulation', 'Value-seeking', 'Self-directed'],
    editorialQuote: 'AJ Bell’s “favourite funds” lists and award-winning research steer cost-aware investors.',
    editorialPoints: [
      'The “favourite funds” lists and ratings drive picks.',
      'Pension and decumulation framing resonates strongly.',
    ],
    brandHook: 'Vietnam’s growth and income, for the long run — back the future of an economy while it pays you a dividend.',
    howToWin: [
      'Lead with Vietnam’s future plus the income / dividend story for long-term, pension-led holders.',
      'Get onto the favourite-funds lists with clean, low-friction fundamentals.',
      'Keep the structural-growth story tax-wrapper-friendly (ISA/SIPP) and cost-transparent.',
    ],
    watchOuts: ['Fee-sensitive audience', 'Pension / tax framing matters', 'FCA rules'],
    sources: [
      { label: 'AJ Bell', url: 'https://www.ajbell.co.uk/' },
    ],
  },
  {
    slug: 'financial-advisers',
    name: 'Financial advisers (IFAs)',
    type: 'Advised channel',
    scale: 'Intermediated',
    role: 'Older, advised clients — legacy, drawdown, IHT.',
    descriptor: 'Not a platform but a channel: independent financial advisers who place older, advised clients into VOF as a satellite emerging-markets allocation.',
    snapshot: [
      { label: 'Channel', value: 'Independent advisers (IFAs)' },
      { label: 'Clients', value: 'Advised, older, higher-value' },
      { label: 'Wrappers', value: 'ISA · SIPP · trusts' },
      { label: 'Gatekeepers', value: 'Research panels & DFMs' },
    ],
    atAGlance: [
      'A channel, not a single platform.',
      'Older, advised, often higher-value clients.',
      'Vietnam as a satellite EM / diversifier.',
      'Gatekept by adviser research panels.',
    ],
    investorProfile: 'Advised clients are typically older and wealth-focused — they delegate to an adviser who decides, so you are really selling to the adviser, not the end client.',
    investorTraits: ['Older / wealth-preservation', 'IHT & legacy-aware', 'Delegated decisions', 'Drawdown / decumulation', 'Risk-managed'],
    editorialQuote: 'The adviser is the buyer — ratings, due-diligence panels and DFM model portfolios are the gate.',
    editorialPoints: [
      'Defaqto, RSMR and Square Mile ratings open doors.',
      'Inclusion in DFM and model portfolios scales reach.',
    ],
    brandHook: 'A governed, diversifying allocation to Vietnam’s structural future — the only listed access to its listed and private champions.',
    howToWin: [
      'Give advisers the Vietnam-future story as a suitable, diversifying EM allocation — governance first.',
      'Win the ratings and research panels with adviser-grade due diligence on the 20-year record and access.',
      'Frame around long-term structural growth and risk management, never hype.',
    ],
    watchOuts: ['Suitability & Consumer Duty', 'Long, gatekept sales cycle', 'FCA promotion rules'],
    sources: [
      { label: 'The AIC — for advisers', url: 'https://www.theaic.co.uk/' },
    ],
  },
];

export function getBroker(slug: string): Broker | undefined {
  return BROKERS.find((b) => b.slug === slug);
}
