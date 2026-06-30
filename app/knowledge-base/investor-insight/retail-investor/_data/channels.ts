/* VOF's actual "How to invest" list — the platforms and brokers/distributors where you can
   buy VOF shares (LON:VOF), reflected verbatim from VinaCapital's how-to-invest page.
   Strategic platforms (HL, interactive investor, AJ Bell) and the advised channel carry a
   full internal profile via `profileSlug`; the rest link out to the platform. */

export interface ChannelLink {
  name: string;
  type: string;
  url?: string;          // external site
  profileSlug?: string;  // internal deep profile (takes precedence over url)
  email?: string;
  phone?: string;
}

/* Direct retail buy-points (LON:VOF) */
export const PLATFORMS: ChannelLink[] = [
  { name: 'AJ Bell', type: 'Low-cost D2C platform', profileSlug: 'aj-bell', url: 'https://www.ajbell.co.uk/' },
  { name: 'Bestinvest', type: 'Advice-led (Evelyn Partners)', url: 'https://www.bestinvest.co.uk/' },
  { name: 'Charles Stanley', type: 'Wealth manager / platform', url: 'https://www.charles-stanley-direct.co.uk/' },
  { name: 'Hargreaves Lansdown', type: 'Largest UK D2C platform', profileSlug: 'hargreaves-lansdown', url: 'https://www.hl.co.uk/' },
  { name: 'iDealing', type: 'Low-cost execution platform', url: 'https://www.idealing.com/' },
  { name: 'interactive investor', type: 'Flat-fee platform (abrdn)', profileSlug: 'interactive-investor', url: 'https://www.ii.co.uk/' },
  { name: 'Halifax', type: 'Bank share dealing', url: 'https://www.halifax.co.uk/investing/share-dealing.html' },
  { name: 'EQi', type: 'Execution-only platform', url: 'https://www.eqi.co.uk/' },
  { name: 'IG', type: 'Trading platform', url: 'https://www.ig.com/uk' },
];

/* Advised route — sell to the adviser, not the client (full profile) */
export const ADVISED: ChannelLink[] = [
  { name: 'Financial advisers (IFAs)', type: 'Advised channel', profileSlug: 'financial-advisers' },
];

/* VOF's corporate broker & distributors — institutional-facing, with direct contacts */
export const DISTRIBUTORS: ChannelLink[] = [
  { name: 'Deutsche Numis', type: 'Corporate broker', url: 'https://www.numis.com/', email: 'funds@numis.com', phone: '+44 20 7260 1000' },
  { name: 'Barclays', type: 'Distributor', url: 'https://www.barclays.co.uk/', email: 'barclaysinvestmentcompanies@barclays.com', phone: '+44 207 623 2323' },
  { name: 'Cadarn Capital', type: 'Distributor', url: 'https://www.cadarncapital.com/', email: 'info@cadarncapital.com', phone: '+44 20 7019 9042' },
];
