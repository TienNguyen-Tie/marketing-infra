import Link from 'next/link';
import styles from '../investor-insight.module.css';
import { INVESTORS } from './_data/investors';

/* Target-audience analysis of VOF's institutional base.
   Grounding (the register) is real — from VOF's LSE/RNS holdings disclosures, the AIC,
   MarketScreener, Edison, Insider Monkey. The audience is then profiled through two
   psychology lenses: MICE (motivation) and RASCALS (Cialdini influence levers).
   Stakes move over time — treat percentages as indicative of scale and role.
   Each holder links to a full profile under ./[slug]. */

const SEGMENTS = [
  { n: '01', label: 'Dedicated frontier funds', body: 'Ashmore Frontier, Schroder Frontier, T. Rowe Frontier. Vietnam is a core frontier overweight. Won by the frontier thesis, liquidity and governance.' },
  { n: '02', label: 'Single-country Vietnam funds', body: 'Dragon Capital (VEIL), Vietnam Holding, JPMorgan Vietnam. Direct VOF peers — they benchmark VOF’s NAV, discount and private exposure against their own.' },
  { n: '03', label: 'Global EM (GEM) funds', body: 'Lazard EM, GQG, Fidelity EM. Vietnam is a small but rising sleeve inside a global emerging-markets book. Kept by relative performance.' },
  { n: '04', label: 'Asia ex-Japan / regional', body: 'abrdn Asian, Schroder AsiaPacific, Pacific Assets. Reach Vietnam through the Asia bucket; want the regional growth story.' },
  { n: '05', label: 'EM closed-end-fund activists', body: 'City of London IM, Allspring, Saba, Metage. Buy the listed discount and push for buybacks, tenders and continuation. Discount control is the lever.' },
  { n: '06', label: 'EM pensions & asset owners', body: 'LGPS (West Yorkshire), endowments, sovereign and development-finance capital. Long-dated, governance- and ESG-led — the stickiest money.' },
  { n: '07', label: 'EM sustainable / impact', body: 'EM ESG and impact mandates drawn to Vietnam’s development story — the manufacturing shift, financial inclusion, the rising middle class.' },
  { n: '08', label: 'EM multi-asset & income', body: 'Multi-asset and EM-income desks adding a listed Vietnam line for growth plus the dividend, without single-stock risk.' },
];

const MICE = [
  { l: 'M', word: 'Money', body: 'Allocators are paid on performance. The hard case: NAV total return vs benchmark, the discount (buying $1 of assets below par), the dividend and buyback. Money is the floor of the conversation — never the whole story.' },
  { l: 'I', word: 'Ideology', body: 'Mandate conviction. EM/frontier specialists must believe the Vietnam thesis first — demographics, the manufacturing shift, “Doi Moi 2.0”, the frontier-to-EM re-rating — then back VOF to express it. Pensions add an ESG / stewardship belief.' },
  { l: 'C', word: 'Compromise', body: 'Read as constraints. Mandates, liquidity needs and index rules bound what they can hold — FTSE 250 membership is what makes VOF ownable at scale. Give reasons that fit inside their box.' },
  { l: 'E', word: 'Ego', body: 'The status of a differentiated, well-governed position: the contrarian early to Vietnam; the activist seen winning a tender. Reputation among peers, trustees and consultants matters.' },
];

const RASCALS = [
  { l: 'R', word: 'Reciprocation', body: 'Give first: proprietary macro research, data, manager access, portfolio-company site visits.', app: 'Content: thought-leadership reports & case studies. Social: pro-only webinars and insight invites.' },
  { l: 'A', word: 'Authority', body: '20-year audited record, FTSE 250, independent board, named PMs, third-party coverage (Edison, Morningstar, broker notes).', app: 'Content: track-record dossiers, by-lines. Social: LinkedIn from named experts.', guard: 'Authority claims must be evidenced and balanced.' },
  { l: 'S', word: 'Scarcity', body: 'Genuine uniqueness: the only Main-Market route to Vietnam’s listed and private champions, with private-deal access others can’t reach.', app: 'Ads / IR: lead on the “only way to own this” truth.', guard: 'Scarcity must be real — never manufactured urgency or pressure to act.' },
  { l: 'C', word: 'Commitment', body: 'Small commitments compound: research subscription → webinar → meeting → allocation. A consistent message and capital-return policy over 20 years build trust.', app: 'Content: a returning research series; consistent positioning.' },
  { l: 'L', word: 'Liking', body: 'Relationship-led IR — roadshows, the human team, shared values (long-term, disciplined). Institutions allocate to people.', app: 'Social/events: put named experts forward; roadshow content.' },
  { l: 'S', word: 'Social proof', body: 'Smart money is already here: Lazard, pension funds, broker consensus, index inclusion, AGM support.', app: 'Content: peer ownership, flows, ratings.', guard: 'Naming holders or flows must be accurate and never imply a recommendation.' },
];

const PLAYBOOK = [
  { icon: 'description', title: 'Content', rows: [
    ['Angle', 'Macro thesis backed by a 20-year audited record.'],
    ['Format', 'Long-form reports, case studies (ACV, FPT, Vinamilk), factsheets, RNS.'],
    ['Proof', 'Audited NAV, discount data, capital-return history.'],
    ['Watch-out', 'Balanced benefit/risk; fair, clear & not misleading.'],
  ]},
  { icon: 'group', title: 'Social (LinkedIn)', rows: [
    ['Angle', 'Named-expert authority and macro point of view.'],
    ['Format', 'Thought-leadership posts, webinar clips, market takes.'],
    ['Proof', 'Real attribution to PMs/economists.'],
    ['Watch-out', 'Each post standalone-compliant (FG24/1) with risk warning.'],
  ]},
  { icon: 'campaign', title: 'Branding ads', rows: [
    ['Angle', '“The trusted partner for investing in Vietnam.”'],
    ['Format', 'FT / Investment Week / IPE, sponsorships, roadshow brand.'],
    ['Proof', 'Track record, index status, governance.'],
    ['Watch-out', 's21 approval; capital-at-risk warning prominent.'],
  ]},
];

export default function InstitutionalInvestorPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbText}>Knowledge Base › Investor Insight › Institutional Investor</span>
          <span className={styles.tag}>Target audience · Institutional</span>
        </div>
        <h1 className={styles.title}>Institutional Investor</h1>
        <p className={styles.subtitle}>
          Our institutional target audience, focused on the funds that own developing markets — the dedicated
          frontier, single-country Vietnam, global-EM, Asian and closed-end-fund specialists that VOF competes
          with for an emerging-markets allocation. We ground them in VOF&rsquo;s real register, then read each
          type through two lenses — <strong>MICE</strong> (what motivates them) and <strong>RASCALS</strong>{' '}
          (which influence levers ethically move them) — so content, social and branding ads speak to the same
          truths.
        </p>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}><p className={styles.statNum}>~<em>USD&nbsp;1b</em></p><p className={styles.statLabel}>VOF net assets under management</p></div>
        <div className={styles.stat}><p className={styles.statNum}><em>FTSE 250</em></p><p className={styles.statLabel}>LSE Main Market constituent</p></div>
        <div className={styles.stat}><p className={styles.statNum}><em>8</em></p><p className={styles.statLabel}>Developing-market fund types</p></div>
        <div className={styles.stat}><p className={styles.statNum}><em>2003</em></p><p className={styles.statLabel}>20+ year track record</p></div>
      </div>

      {/* Who holds it */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>The register</p>
          <h2 className={styles.sectionTitle}>Who the audience actually is</h2>
          <p className={styles.sectionSub}>Named holders from VOF’s public disclosures — click any for a full profile (philosophy, focus, vision and how to approach them). Percentages indicate scale and role; registers shift with buybacks, tenders and trading.</p>
        </div>
        <div className={styles.holderList}>
          {INVESTORS.map((inv) => (
            <Link key={inv.slug} href={`/knowledge-base/investor-insight/institutional-investor/${inv.slug}`} className={styles.holderCard}>
              <div className={styles.hcLeft}>
                <span className={styles.hcName}>{inv.name}</span>
                <span className={styles.typePill}>{inv.type}</span>
              </div>
              <span className={styles.hcRole}>{inv.role}</span>
              <span className={styles.hcRight}>
                <span className={styles.hcStake}>{inv.stake}</span>
                <span className={styles.hcArrow}><span className="material-icons-round">arrow_forward</span></span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Segments */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Fund types</p>
          <h2 className={styles.sectionTitle}>Developing-market funds, broken down</h2>
          <p className={styles.sectionSub}>VOF competes for the same capital that funds emerging and frontier markets. Eight fund types, each owning Vietnam for a different reason — and each responding to a different lever.</p>
        </div>
        <div className={styles.cardGrid3}>
          {SEGMENTS.map((s) => (
            <div key={s.n} className={styles.card}>
              <p className={styles.cardNum}>{s.n}</p>
              <p className={styles.cardTitle} style={{ fontSize: 15 }}>{s.label}</p>
              <p className={styles.cardBody}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Framework intro */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>The lenses</p>
          <h2 className={styles.sectionTitle}>Two frameworks, one audience</h2>
          <p className={styles.sectionSub}>Borrowed from behavioural psychology and intelligence tradecraft, used here purely as marketing audience analysis.</p>
        </div>
        <div className={styles.frameworkIntro}>
          <div className={styles.fwCard}>
            <p className={styles.fwName}>MICE</p>
            <p className={styles.fwExpand}>Money · Ideology · Compromise · Ego</p>
            <p className={styles.fwBody}>The motivation lens — <em>why</em> this audience acts. What they are actually trying to get, believe, are constrained by, and want to be seen as.</p>
          </div>
          <div className={styles.fwCard}>
            <p className={styles.fwName}>RASCALS</p>
            <p className={styles.fwExpand}>Reciprocation · Authority · Scarcity · Commitment · Liking · Social proof</p>
            <p className={styles.fwBody}>Cialdini’s six influence principles — <em>how</em> to move them, ethically and within FCA limits. Each becomes a content, social and advertising lever.</p>
          </div>
        </div>
      </section>

      {/* MICE */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>MICE · Motivation</p>
          <h2 className={styles.sectionTitle}>What drives the institutional audience</h2>
        </div>
        <div className={styles.grid4}>
          {MICE.map((m) => (
            <div key={m.l} className={styles.letterCard}>
              <p className={styles.letter}>{m.l}</p>
              <p className={styles.letterWord}>{m.word}</p>
              <p className={styles.letterBody}>{m.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RASCALS */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>RASCALS · Influence</p>
          <h2 className={styles.sectionTitle}>How to move them — ethically, within FCA limits</h2>
          <p className={styles.sectionSub}>Each lever maps to a concrete content, social or advertising play. Where a lever risks crossing FCA lines, the guard rail is noted.</p>
        </div>
        <div className={styles.cardGrid3}>
          {RASCALS.map((r) => (
            <div key={r.word} className={styles.letterCard}>
              <p className={styles.letter}>{r.l}</p>
              <p className={styles.letterWord}>{r.word}</p>
              <p className={styles.letterBody}>{r.body}</p>
              <p className={styles.appLine}><strong>Use it:</strong> {r.app}</p>
              {r.guard && <p className={styles.guard}><strong>FCA guard:</strong> {r.guard}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Playbook */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Channel playbook</p>
          <h2 className={styles.sectionTitle}>From insight to content, social &amp; ads</h2>
        </div>
        <div className={styles.playbook}>
          {PLAYBOOK.map((p) => (
            <div key={p.title} className={styles.playCol}>
              <div className={styles.playHead}>
                <span className="material-icons-round">{p.icon}</span>
                <span className={styles.playColTitle}>{p.title}</span>
              </div>
              {p.rows.map(([k, v]) => (
                <div key={k} className={styles.playRow}>
                  <p className={styles.playKey}>{k}</p>
                  <p className={styles.playVal}>{v}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.callout} style={{ marginTop: 28 }}>
          <p className={styles.calloutEyebrow}>The institutional message</p>
          <p className={styles.calloutText}>
            VOF is the only Main-Market way to own Vietnam’s most promising listed <em>and</em> private
            companies — a 20-year record, a real discount-control policy, and capital returned to shareholders.
          </p>
        </div>
      </section>

      <p className={styles.sources}>
        Grounding sources: VOF / LSE RNS holdings notifications · the AIC · MarketScreener · Edison Group ·
        Insider Monkey. Frameworks: Cialdini’s principles of influence; Burkett, “From MICE to RASCLS”
        (Studies in Intelligence, 2013), used here as marketing audience analysis. Stakes are indicative.
      </p>
    </div>
  );
}
