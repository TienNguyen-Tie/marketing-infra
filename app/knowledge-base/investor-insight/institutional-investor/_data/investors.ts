/* Institutional investor profiles — the VOF register, made deep enough to brief marketing.
   The orientation is BRANDING: every insight serves how VOF promotes the future of Vietnam's
   economy to this audience. VOF's brand spine — the only listed access to Vietnam's listed AND
   private champions, 20+ years helping leaders like Vinamilk and Hoa Phat grow, ~USD 1bn AUM,
   and the "Doi Moi 2.0" next chapter — is angled per holder via `brandHook` and the brand-led
   `marketing` actions. Public facts/philosophy from each firm's disclosures + reputable coverage
   (cited). VOF stakes are indicative and move with buybacks/tenders/trading. */

export interface Investor {
  slug: string;
  name: string;
  /* list-card fields */
  type: string;
  stake: string;
  role: string;
  /* hero */
  descriptor: string;
  /* facts */
  snapshot: { label: string; value: string }[];
  /* scannable detail */
  atAGlance: string[];          // 4 punchy takeaways
  philosophyQuote: string;      // distilled, one line
  philosophyPoints: string[];   // 2–3 supporting bullets
  focusTags: string[];          // chips: asset classes / geos / style
  vietnamFit: string;           // one-line callout
  vision: string;               // one line, shown as a quote box
  vofSummary: string;           // one sentence
  vofWatches: string[];         // chips: what they monitor
  brandHook: string;            // the Vietnam-future brand story, angled to this audience
  marketing: string[];          // brand-led actions to land that story
  sources: { label: string; url: string }[];
}

export const INVESTORS: Investor[] = [
  {
    slug: 'lazard-asset-management',
    name: 'Lazard Asset Management',
    type: 'EM / value specialist',
    stake: '~12.5%',
    role: 'Long-horizon EM mandate; historically VOF’s largest holder.',
    descriptor: 'A bottom-up, quality-and-value emerging-markets house — historically VOF’s single largest holder.',
    snapshot: [
      { label: 'Founded', value: '1848 (Lazard)' },
      { label: 'HQ', value: 'New York' },
      { label: 'AUM', value: '~USD 240bn (LAM)' },
      { label: 'Structure', value: 'Arm of Lazard (NYSE: LAZ)' },
    ],
    atAGlance: [
      'Bottom-up quality-value — screens companies, not stories.',
      'Historically VOF’s largest holder (~12.5%).',
      '30+ years of EM/international equity.',
      'Patient, low-noise, long-horizon capital.',
    ],
    philosophyQuote: 'Own well-run, profitable companies that are mispriced — quality and value, bought through cycles.',
    philosophyPoints: [
      'Screens thousands of EM stocks daily on growth, valuation, quality and sentiment.',
      'Fundamentals-first; no thematic country bets.',
    ],
    focusTags: ['Global / international equity', 'EM specialism', 'Quality + value', 'Stock-level selection'],
    vietnamFit: 'Held inside a diversified EM mandate — because specific Vietnamese companies screen well, not as a country punt.',
    vision: 'Deliver long-term capital appreciation by owning quality businesses at sensible prices.',
    vofSummary: 'A way to access Vietnam’s quality compounders inside an EM mandate.',
    vofWatches: ['NAV total return', 'Portfolio quality', 'Governance'],
    brandHook: 'Vietnam’s next market leaders, owned early. VOF helped build Vinamilk and Hoa Phat — and is the only listed way to own the quality champions of Doi Moi 2.0.',
    marketing: [
      'Tell the future-champion story with proof: VOF helped today’s leaders (Vinamilk, Hoa Phat) grow — now show the next ones.',
      'Frame portfolio quality and the 20-year record as evidence Vietnam’s future thesis actually compounds.',
      'Lead the brand on “the only access to Vietnam’s listed and private quality” — their kind of edge.',
    ],
    sources: [
      { label: 'Lazard — Emerging Markets', url: 'https://www.lazardassetmanagement.com/us/en_us/investment-solutions/featured/emerging-markets' },
    ],
  },
  {
    slug: 'city-of-london-investment-management',
    name: 'City of London Investment Management (ICM)',
    type: 'CEF discount activist',
    stake: '~10.8%',
    role: 'Closed-end-fund discount specialist; pressed for a tender / continuation vote.',
    descriptor: 'A specialist that invests almost entirely in closed-end funds to harvest discount inefficiencies — and will agitate to close them.',
    snapshot: [
      { label: 'Founded', value: '1991' },
      { label: 'HQ', value: 'London' },
      { label: 'AUM', value: '~USD 4bn (CLIM)' },
      { label: 'Structure', value: 'Part of City of London Inv. Group (LSE: CLIG)' },
    ],
    atAGlance: [
      'Closed-end-fund discount arbitrageur.',
      'A top holder (~10.8%) that votes.',
      'Capital structure matters more than the portfolio.',
      'Has pressed for tenders / a continuation vote.',
    ],
    philosophyQuote: 'Buy quality closed-end funds below NAV and profit as the discount narrows.',
    philosophyPoints: [
      'Proprietary analysis of under-followed CEFs.',
      'EM, International, Opportunistic Value & Frontier strategies for institutions.',
    ],
    focusTags: ['Closed-end funds', 'Discount arbitrage', 'EM / frontier', 'Institutional'],
    vietnamFit: 'VOF enters as a discounted EM/frontier CEF — the discount, not Vietnam, is why it’s held.',
    vision: 'Capture the value released when closed-end-fund discounts narrow — disciplined, technical, governance-led.',
    vofSummary: 'Holds VOF as a quality EM CEF that has traded at a discount, and watches the continuation vote.',
    vofWatches: ['Discount to NAV', 'Buyback delivery', 'Tender / continuation', 'Board governance'],
    brandHook: 'The future of Vietnam, at a discount — the only listed vehicle that owns the country’s private champions, available below what they’re worth.',
    marketing: [
      'Bridge brand and discount: the asset is Vietnam’s future; the opportunity is buying that future below NAV.',
      'Keep the discount-control and buyback story loud — but anchor it to the value of unique, irreplaceable access.',
      'Use governance and the 20-year record as proof the access is worth closing the discount for.',
    ],
    sources: [
      { label: 'City of London Investment Group — History', url: 'https://clig.com/history/' },
    ],
  },
  {
    slug: 'hargreaves-lansdown',
    name: 'Hargreaves Lansdown',
    type: 'Retail platform (nominee)',
    stake: '~6.7%',
    role: 'Holds for thousands of retail investors — the bridge to the Retail audience.',
    descriptor: 'The UK’s largest retail investment platform — a nominee holding for thousands of retail investors, not a fund manager.',
    snapshot: [
      { label: 'Founded', value: '1981' },
      { label: 'HQ', value: 'Bristol, UK' },
      { label: 'AUA', value: '~£150bn' },
      { label: 'Structure', value: 'Largest UK D2C platform' },
    ],
    atAGlance: [
      'A nominee, not a fund manager.',
      'Holds ~6.7% for thousands of retail investors.',
      'Influence is editorial — the Wealth Shortlist.',
      'The bridge to the Retail audience.',
    ],
    philosophyQuote: 'Not an investor with a view — a platform whose research and shortlists shape what retail buys.',
    philosophyPoints: [
      'UK’s largest D2C platform (~1.8m clients).',
      'Whole-of-market access; editorial influence via ratings & tools.',
    ],
    focusTags: ['Retail platform', 'Nominee / custody', 'ISA · SIPP', 'Editorial reach'],
    vietnamFit: 'VOF is one of thousands of holdings, surfaced (or not) by HL’s research.',
    vision: 'Make investing simple and accessible for UK individuals — and be the default home for their portfolios.',
    vofSummary: 'The biggest pool of retail investors on the register — but a conduit, not a decision-maker.',
    vofWatches: ['Platform demand', 'Research ratings', 'Wealth Shortlist'],
    brandHook: 'A simple way for UK savers to own Vietnam’s future — the next great Asian growth story, in one trusted, 20-year trust.',
    marketing: [
      'Aim the Vietnam-future story at HL’s retail audience: simple, optimistic, “own the next tiger economy”.',
      'Use the 20-year record and the dividend as the trust signal that earns the Wealth Shortlist.',
      'This is brand reach, not an institutional sell — coordinate with the Retail Investor playbook.',
    ],
    sources: [
      { label: 'Hargreaves Lansdown — VOF listing', url: 'https://www.hl.co.uk/shares/shares-search-results/v/vinacapital-vietnam-opportunity-usd0.01' },
    ],
  },
  {
    slug: 'allspring-global-investments',
    name: 'Allspring Global Investments',
    type: 'Institutional manager',
    stake: '~4–5.6%',
    role: 'Ex-Wells; value-oriented, engaged on capital return.',
    descriptor: 'A large, independent US institutional manager (formerly Wells Fargo Asset Management), value-oriented and engaged on shareholder returns.',
    snapshot: [
      { label: 'Founded', value: '1995 (as WFAM)' },
      { label: 'HQ', value: 'Charlotte, NC' },
      { label: 'AUM', value: '~USD 570bn' },
      { label: 'Structure', value: 'Independent since 2021 (ex-Wells Fargo)' },
    ],
    atAGlance: [
      'Large independent US manager, ex-Wells Fargo.',
      '~$570bn AUM, multi-asset.',
      'Value-oriented on listed funds.',
      'Constructive on capital return — lower-key than an activist.',
    ],
    philosophyQuote: 'Research-led and value-oriented — focused on the gap between price and intrinsic value.',
    philosophyPoints: [
      'Multi-boutique across equities, fixed income and multi-asset.',
      'Constructive engagement on the discount and shareholder returns.',
    ],
    focusTags: ['Multi-asset', 'Value-oriented', 'Institutional', 'Capital return'],
    vietnamFit: 'Sits within value/income equity allocations, not a dedicated frontier mandate.',
    vision: 'Independent, investment-led thinking that helps clients reach their goals.',
    vofSummary: 'A value-oriented holder aligned with shareholder returns and constructive on the discount.',
    vofWatches: ['Price-to-NAV', 'Capital return', 'Reporting quality'],
    brandHook: 'Vietnam’s structural growth, captured in the only listed access vehicle — value today, the future of an economy tomorrow.',
    marketing: [
      'Frame the future-of-Vietnam upside alongside the value and discount case they already buy.',
      'Use unique access to listed and private champions, plus the 20-year returns, as the brand proof.',
      'Keep it balanced — let capital-return discipline carry the value half of the story.',
    ],
    sources: [
      { label: 'Allspring Global Investments (overview)', url: 'https://en.wikipedia.org/wiki/Allspring_Global_Investments' },
    ],
  },
  {
    slug: 'skagen',
    name: 'SKAGEN',
    type: 'Nordic value / EM fund',
    stake: '~2.9%',
    role: 'Contrarian value house; long-term Vietnam exposure.',
    descriptor: 'A Norwegian active-value boutique, unafraid of unpopular stocks — its Kon-Tiki fund is a long-standing emerging-markets vehicle.',
    snapshot: [
      { label: 'Founded', value: '1993' },
      { label: 'HQ', value: 'Stavanger, Norway' },
      { label: 'AUM', value: '~USD 5–6bn (equity)' },
      { label: 'Structure', value: 'Boutique within Storebrand AM' },
    ],
    atAGlance: [
      'Norwegian active-value boutique.',
      'Contrarian — willing to own the unpopular.',
      'Kon-Tiki = EM fund (≥50% EM).',
      'Patient conviction capital (~2.9%).',
    ],
    philosophyQuote: 'Buy undervalued companies on deep research — unafraid of unpopular names.',
    philosophyPoints: [
      'Active, contrarian value; independent board within Storebrand.',
      'Patience over benchmark-hugging.',
    ],
    focusTags: ['Active value', 'Contrarian', 'Global + EM tilt', 'Boutique'],
    vietnamFit: 'Held as a long-term value position — often where others are absent.',
    vision: 'Best possible risk-adjusted return through active, independent, value-driven stock-picking.',
    vofSummary: 'A contrarian value holder drawn to mispriced, under-owned EM exposure.',
    vofWatches: ['Valuation / discount', 'Long-term value', 'Independent research'],
    brandHook: 'Be early to Vietnam’s future — the unloved, under-owned access to an economy entering its Doi Moi 2.0 chapter.',
    marketing: [
      'Lean into a contrarian brand: “own Vietnam’s future before the crowd”, via the only access vehicle.',
      'Pair the discount and value case with the long-run country story they can hold for years.',
      'Give depth — the champions VOF helped build are the proof the future thesis is real.',
    ],
    sources: [
      { label: 'SKAGEN — Investment philosophy', url: 'https://www.skagenfunds.com/topic/investment-philosophy/' },
    ],
  },
  {
    slug: 'west-yorkshire-pension-fund',
    name: 'West Yorkshire Pension Fund',
    type: 'LGPS pension',
    stake: '~1.5%',
    role: 'Long-dated, governance- and ESG-attentive capital.',
    descriptor: 'One of England’s largest local-government pension funds — long-dated, low-cost, stewardship-led asset-owner capital.',
    snapshot: [
      { label: 'Founded', value: '1974' },
      { label: 'HQ', value: 'Bradford, UK' },
      { label: 'AUM', value: '~£20bn (pool £60bn+)' },
      { label: 'Structure', value: 'LGPS; part of Northern LGPS pool' },
    ],
    atAGlance: [
      'One of England’s largest LGPS funds (~£20bn).',
      'Pools via Northern LGPS (£60bn+).',
      'Low-cost, largely in-house.',
      'Stewardship-Code, ESG-led — the stickiest capital.',
    ],
    philosophyQuote: 'Long-term, diversified asset-owner investing with a strong responsible-investment overlay.',
    philosophyPoints: [
      'ESG and engagement are integral; UK Stewardship Code signatory.',
      'Cost discipline is a defining feature.',
    ],
    focusTags: ['LGPS pension', 'Diversified / multi-asset', 'Responsible investment', 'Low-cost'],
    vietnamFit: 'A long-dated EM equity allocation, held for the long run.',
    vision: 'Pay members’ pensions sustainably as a responsible, cost-efficient asset owner.',
    vofSummary: 'Patient, governance-led capital kept by stewardship credibility, not performance noise.',
    vofWatches: ['ESG & stewardship', 'Transparency', 'Fees / efficiency', 'Long-term alignment'],
    brandHook: 'Vietnam’s sustainable development story — a rising middle class and broadening financial inclusion — as long-term, responsible growth capital.',
    marketing: [
      'Tell the future-of-Vietnam story through a development and ESG lens: inclusion, the middle class, real-economy impact.',
      'Anchor to stewardship, governance and the 20-year record — responsible growth, not speculation.',
      'Match horizons: Vietnam’s future is a decades-long story, like their liabilities.',
    ],
    sources: [
      { label: 'West Yorkshire Pension Fund — Investments', url: 'https://www.wypf.org.uk/wypf/investments/' },
    ],
  },
  {
    slug: 'ashmore',
    name: 'Ashmore Group',
    type: 'Frontier EM specialist',
    stake: 'Sleeve',
    role: 'Dedicated frontier mandate; Vietnam overweight.',
    descriptor: 'A London-listed, EM-exclusive specialist with a dedicated frontier-equities team — the purest frontier lens on the register.',
    snapshot: [
      { label: 'Founded', value: '1992 (independent 1999)' },
      { label: 'HQ', value: 'London' },
      { label: 'AUM', value: '~USD 48bn' },
      { label: 'Structure', value: 'EM specialist (LSE: ASHM)' },
    ],
    atAGlance: [
      'EM-exclusive specialist (LSE: ASHM).',
      'Dedicated frontier-equities team since 2010.',
      '~$48bn AUM across debt, equity, alts.',
      'Buys the country first, the vehicle second.',
    ],
    philosophyQuote: 'Value-driven, active EM investing — disciplined country selection, using volatility as opportunity.',
    philosophyPoints: [
      'Emerging & frontier markets only.',
      'Believes active management adds real edge in inefficient markets.',
    ],
    focusTags: ['EM & frontier only', 'Active value', 'Debt + equity + alts', 'Frontier specialist'],
    vietnamFit: 'A structural frontier overweight — owned for the long-run country thesis.',
    vision: 'Be the emerging-markets investment specialist of choice, capturing the EM growth premium.',
    vofSummary: 'A natural fit: a frontier specialist that wants Vietnam exposure.',
    vofWatches: ['Frontier thesis', 'Portfolio quality', 'Liquidity'],
    brandHook: 'The next great EM story, owned early — Vietnam’s frontier-to-emerging rise, accessible only through VOF’s listed and private holdings.',
    marketing: [
      'Go all-in on the macro future story — Doi Moi 2.0, the manufacturing shift, the frontier-to-EM re-rating.',
      'Unique access to private champions is the brand differentiator they’ll value most.',
      'Proof point: VOF helped build today’s leaders; it’s positioned for tomorrow’s.',
    ],
    sources: [
      { label: 'Ashmore Group', url: 'https://www.ashmoregroup.com/' },
    ],
  },
  {
    slug: 'blackrock',
    name: 'BlackRock',
    type: 'Generalist allocator',
    stake: 'Sleeve',
    role: 'Holds VOF inside broader EM / index books.',
    descriptor: 'The world’s largest asset manager — VOF is a small sleeve inside vast active and index EM books.',
    snapshot: [
      { label: 'Founded', value: '1988' },
      { label: 'HQ', value: 'New York' },
      { label: 'AUM', value: '~USD 11.5tn' },
      { label: 'Structure', value: 'Largest manager (NYSE: BLK)' },
    ],
    atAGlance: [
      'World’s largest manager (~$11.5tn).',
      'Both active and the dominant indexer (iShares).',
      'VOF = a minor sleeve in huge books.',
      'Low-touch — retained, not courted.',
    ],
    philosophyQuote: 'Both active and the dominant indexer — VOF is held for fit and consistency, not single-name conviction.',
    philosophyPoints: [
      'Enormous, diversified EM exposure via active + index.',
      'Held inside broad EM/frontier and index products.',
    ],
    focusTags: ['Every asset class', 'Index + active', 'Diversified EM', 'Scale'],
    vietnamFit: 'Runs through broad EM/frontier funds and index products, not a Vietnam mandate.',
    vision: 'Help more people experience financial well-being — at the scale of the global market.',
    vofSummary: 'A low-touch holder kept by consistent NAV, clean reporting and index relevance.',
    vofWatches: ['Consistency', 'Reporting', 'Index relevance'],
    brandHook: 'The cleanest single line on Vietnam’s future inside an EM book — the only listed access to its listed and private champions.',
    marketing: [
      'Keep the brand light-touch: one crisp line — “the access vehicle for Vietnam’s future” — backed by clean data.',
      'Let consistency and the 20-year record carry the message; no heavy narrative.',
      'The hook is uniqueness of access plus index/benchmark relevance.',
    ],
    sources: [
      { label: 'BlackRock', url: 'https://www.blackrock.com/' },
    ],
  },
  {
    slug: 'janus-henderson',
    name: 'Janus Henderson',
    type: 'Generalist allocator',
    stake: 'Sleeve',
    role: 'Holds VOF inside broader EM / Asia books.',
    descriptor: 'A global active manager formed from the 2017 Janus–Henderson merger — VOF sits inside its EM/Asia allocations.',
    snapshot: [
      { label: 'Founded', value: '2017 (merger)' },
      { label: 'HQ', value: 'London / Denver' },
      { label: 'AUM', value: '~USD 380bn' },
      { label: 'Structure', value: 'Active manager (NYSE: JHG)' },
    ],
    atAGlance: [
      'Global active manager (2017 merger).',
      '~$380bn AUM.',
      'VOF inside EM / Asia sleeves.',
      'A generalist allocation, not a core position.',
    ],
    philosophyQuote: 'Active, research-driven — VOF is a small line within broader EM/Asia strategies.',
    philosophyPoints: [
      'Equity, fixed income and multi-asset.',
      'Fundamentals-led; open to manager engagement.',
    ],
    focusTags: ['Active management', 'EM / Asia', 'Multi-asset', 'Generalist'],
    vietnamFit: 'Part of regional allocations rather than a dedicated mandate.',
    vision: 'Superior financial outcomes through differentiated, active insight.',
    vofSummary: 'A generalist allocation kept by consistent performance and clean reporting.',
    vofWatches: ['Performance', 'Reporting', 'Manager access'],
    brandHook: 'Vietnam’s future, expressed through the only fund that owns its listed and private leaders — a differentiated line in an EM/Asia book.',
    marketing: [
      'Offer a tight brand story for their EM/Asia sleeve: unique access to Vietnam’s future.',
      'Fundamentals and the 20-year record are the substance; occasional manager access deepens it.',
      'Authority and consistency over narrative volume.',
    ],
    sources: [
      { label: 'Janus Henderson', url: 'https://www.janushenderson.com/' },
    ],
  },
];

export function getInvestor(slug: string): Investor | undefined {
  return INVESTORS.find((i) => i.slug === slug);
}
