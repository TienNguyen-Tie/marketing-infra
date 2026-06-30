import Link from 'next/link';
import styles from '../investor-insight.module.css';
import { PLATFORMS, ADVISED, DISTRIBUTORS } from './_data/channels';

/* Target-audience analysis of VOF's retail base, narrowed to the segment that matters
   most: older, highly experienced, self-directed investors. Retail holders can't be
   named, so the broker is the unit of analysis — understand each platform and the
   investors on it (click any broker for a full profile). Investors are then profiled
   through MICE (motivation) and RASCALS (Cialdini influence levers), tuned for content,
   social and branding ads under FCA financial-promotion limits. */

const SEGMENTS = [
  { n: '01', label: 'Retired income investor', body: 'Lives off dividends plus drawdown. Wants reliable income and capital preservation far more than a growth story. The dividend (since 2017) is the hook.' },
  { n: '02', label: 'The ex-professional', body: 'A former finance or business career. Reads the annual report, scrutinises governance and the manager’s pedigree, and is allergic to spin.' },
  { n: '03', label: 'Veteran trust enthusiast', body: 'Decades in investment trusts, fluent in the AIC. Tracks the discount, the buyback and the board as closely as any activist.' },
  { n: '04', label: 'Seasoned EM / Asia hand', body: 'Has invested across Asian cycles — perhaps lived or worked in the region. Long memory, thematic conviction, unmoved by hype.' },
  { n: '05', label: 'Wealth-preservation / legacy', body: 'Protecting and passing on capital. IHT- and estate-aware; a horizon measured in heirs, not quarters.' },
  { n: '06', label: 'Second-career DIY investor', body: 'Runs the portfolio as a serious post-retirement vocation. Time-rich, detail-hungry — wants depth, not dumbing-down.' },
];

const MICE = [
  { l: 'M', word: 'Money', body: 'Income and preservation first. The dividend funds retirement; the discount reads as value to a bargain-literate eye; total return matters, but protecting capital matters more. Durable compounding, not growth dreams.' },
  { l: 'I', word: 'Ideology', body: 'Hard-won conviction — in Vietnam, and in disciplined management. They’ve watched EM cycles and reward managers who survived them. “Creating prosperity together” lands only when a record backs it.' },
  { l: 'C', word: 'Compromise', body: 'Time-rich but risk-aware. Bounded by what platforms offer, by ISA/SIPP and IHT planning, and by a shorter personal horizon — but with capital and patience. Give them depth and tax-efficiency, not friction.' },
  { l: 'E', word: 'Ego', body: '“I know what I’m doing.” Decades of experience is their identity. They resent being marketed to like beginners and respond to being treated as a peer whose judgement is respected.' },
];

const RASCALS = [
  { l: 'R', word: 'Reciprocation', body: 'Give depth, not a beginner’s guide — the full annual report, manager interviews, portfolio data, AGM access. To an expert, rigour is the gift.', app: 'Content: in-depth dossiers and manager Q&As. Social: long-form, data-rich.' },
  { l: 'A', word: 'Authority', body: 'They trust third-party scrutiny over advertising — Kepler & Edison notes, AIC ratings, Morningstar, the named managers’ 20-year record, serious press.', app: 'Content: independent research & ratings; PM credentials.', guard: 'Cite sources; show the performance warning.' },
  { l: 'S', word: 'Scarcity', body: 'Genuine access to Vietnam’s private champions they can’t buy directly — real exclusivity, never urgency.', app: 'Ads / content: lead on the “only way in” truth.', guard: 'No “act now” or countdowns — experienced investors see through it and the FCA prohibits it.' },
  { l: 'C', word: 'Commitment', body: 'Many are already long-term holders. Reinforce with consistency — a steady dividend, RNS, the AGM, an unchanging message. Honour their loyalty.', app: 'Content: AGM/RNS cadence; consistent positioning.' },
  { l: 'L', word: 'Liking', body: 'Candour and respect win. The human team, straight talk about risk as well as reward, a peer-to-peer tone.', app: 'Social/events: manager interviews, honest commentary.' },
  { l: 'S', word: 'Social proof', body: 'Peer credibility — held by pension funds and EM specialists, AIC sector standing, fellow experienced investors in the forums.', app: 'Content/ads: institutional ownership, sector ratings.', guard: 'Accurate, and never implying guaranteed outcomes.' },
];

const PLAYBOOK = [
  { icon: 'description', title: 'Content', rows: [
    ['Angle', 'Depth and candour — treat them as the experts they are.'],
    ['Format', 'Annual reports, manager Q&As, the income & discount story, RNS.'],
    ['Proof', '20-year record, audited NAV, named managers.'],
    ['Watch-out', 'Balanced; capital-at-risk & performance warnings.'],
  ]},
  { icon: 'group', title: 'Social', rows: [
    ['Angle', 'Long-form, data-rich, peer tone — no beginner explainers.'],
    ['Format', 'LinkedIn, X, the ii / Citywire community, PM interview clips.'],
    ['Proof', 'Real attribution, real data.'],
    ['Watch-out', 'FG24/1: each post standalone-compliant with risk warning.'],
  ]},
  { icon: 'campaign', title: 'Branding ads', rows: [
    ['Angle', 'Trusted, understated — “the partner for investing in Vietnam.”'],
    ['Format', 'FT, Investors Chronicle, MoneyWeek, the AIC.'],
    ['Proof', 'Tenure, governance, income.'],
    ['Watch-out', 's21 approval; “value can go down as well as up” prominent.'],
  ]},
];

export default function PersonalInvestorPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbText}>Knowledge Base › Investor Insight › Retail Investor</span>
          <span className={styles.tag}>Target audience · Experienced retail</span>
        </div>
        <h1 className={styles.title}>Retail Investor</h1>
        <p className={styles.subtitle}>
          Our retail target audience, narrowed to the people who matter most for VOF: <strong>older, highly
          experienced, self-directed investors</strong> — typically retired or near it, with decades of
          investing behind them. They can&rsquo;t be named, so we reach them <strong>through brokers</strong>:
          understand each platform and the investors on it, then read those investors through{' '}
          <strong>MICE</strong> (what motivates them) and <strong>RASCALS</strong> (which influence levers
          ethically move them) — always within FCA financial-promotion limits.
        </p>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}><p className={styles.statNum}>~<em>6.7%</em></p><p className={styles.statLabel}>Held via Hargreaves Lansdown nominee</p></div>
        <div className={styles.stat}><p className={styles.statNum}><em>2017</em></p><p className={styles.statLabel}>First dividend — income in retirement</p></div>
        <div className={styles.stat}><p className={styles.statNum}><em>ISA·SIPP</em></p><p className={styles.statLabel}>Tax wrappers &amp; direct holdings</p></div>
        <div className={styles.stat}><p className={styles.statNum}><em>6</em></p><p className={styles.statLabel}>Experienced-investor types</p></div>
      </div>

      {/* Platforms — VOF's actual buy-list (LON:VOF) */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Platforms · where retail buys VOF</p>
          <h2 className={styles.sectionTitle}>You reach retail through the platform</h2>
          <p className={styles.sectionSub}>You can buy VOF shares (LON:VOF) with most UK stockbrokers and platforms — VinaCapital&rsquo;s own selection is below. The strategic platforms have a full profile (who&rsquo;s on it, the shelf, how to win); the rest are direct buy-points.</p>
        </div>
        <div className={styles.dirGrid}>
          {PLATFORMS.map((p) => (
            p.profileSlug ? (
              <Link key={p.name} href={`/knowledge-base/investor-insight/retail-investor/${p.profileSlug}`} className={styles.dirCard}>
                <span className={styles.dirArrow}><span className="material-icons-round">arrow_forward</span></span>
                <span className={styles.dirName}>{p.name}</span>
                <span className={styles.dirType}>{p.type}</span>
                <span className={styles.dirBadge}>Full profile →</span>
              </Link>
            ) : (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className={styles.dirCard}>
                <span className={styles.dirArrow}><span className="material-icons-round">north_east</span></span>
                <span className={styles.dirName}>{p.name}</span>
                <span className={styles.dirType}>{p.type}</span>
              </a>
            )
          ))}
        </div>
      </section>

      {/* Advised channel — sell to the adviser */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>The advised channel</p>
          <h2 className={styles.sectionTitle}>Reaching advised clients</h2>
          <p className={styles.sectionSub}>Older, higher-value clients often buy through an adviser — where the buyer is the adviser, not the client.</p>
        </div>
        <div className={styles.dirGrid}>
          {ADVISED.map((a) => (
            <Link key={a.name} href={`/knowledge-base/investor-insight/retail-investor/${a.profileSlug}`} className={styles.dirCard}>
              <span className={styles.dirArrow}><span className="material-icons-round">arrow_forward</span></span>
              <span className={styles.dirName}>{a.name}</span>
              <span className={styles.dirType}>{a.type}</span>
              <span className={styles.dirBadge}>Full profile →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Brokers & distributors — VOF's corporate broker + distributors, with contacts */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Brokers &amp; distributors</p>
          <h2 className={styles.sectionTitle}>Corporate broker &amp; distributors</h2>
          <p className={styles.sectionSub}>VOF&rsquo;s corporate broker and distributors — institutional-facing, with direct contacts (from VinaCapital&rsquo;s how-to-invest page).</p>
        </div>
        <div className={styles.dirGrid}>
          {DISTRIBUTORS.map((d) => (
            <div key={d.name} className={styles.dirCard}>
              <a href={d.url} target="_blank" rel="noopener noreferrer" className={styles.dirNameLink}>
                {d.name}<span className="material-icons-round">north_east</span>
              </a>
              <span className={styles.dirType}>{d.type}</span>
              {d.email && <span className={styles.dirContact}><a href={`mailto:${d.email}`}>{d.email}</a></span>}
              {d.phone && <span className={styles.dirPhone}><a href={`tel:${d.phone.replace(/\s/g, '')}`}>{d.phone}</a></span>}
            </div>
          ))}
        </div>
      </section>

      {/* Segments */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Investor types</p>
          <h2 className={styles.sectionTitle}>Six kinds of older, experienced investor</h2>
          <p className={styles.sectionSub}>Narrowed to the experienced end of the retail base — where conviction, capital and patience concentrate.</p>
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
          <p className={styles.sectionSub}>Behavioural-psychology lenses, used here purely as marketing audience analysis.</p>
        </div>
        <div className={styles.frameworkIntro}>
          <div className={styles.fwCard}>
            <p className={styles.fwName}>MICE</p>
            <p className={styles.fwExpand}>Money · Ideology · Compromise · Ego</p>
            <p className={styles.fwBody}>The motivation lens — <em>why</em> an experienced investor buys, believes, is constrained, and wants to feel.</p>
          </div>
          <div className={styles.fwCard}>
            <p className={styles.fwName}>RASCALS</p>
            <p className={styles.fwExpand}>Reciprocation · Authority · Scarcity · Commitment · Liking · Social proof</p>
            <p className={styles.fwBody}>Cialdini’s six influence principles — <em>how</em> to move them, ethically and within FCA limits. Each becomes a content, social and ad lever.</p>
          </div>
        </div>
      </section>

      {/* MICE */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>MICE · Motivation</p>
          <h2 className={styles.sectionTitle}>What drives the experienced investor</h2>
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
          <p className={styles.sectionSub}>These investors are hard to fool and easy to lose. Each lever maps to a play; the guard rail flags where it can cross a line.</p>
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
          <p className={styles.calloutEyebrow}>The message for experienced investors</p>
          <p className={styles.calloutText}>
            A disciplined, 20-year route into Vietnam&rsquo;s listed and private champions — with income, real
            governance, and no hype. <em>Creating prosperity together.</em> Capital at risk.
          </p>
        </div>
      </section>

      <p className={styles.sources}>
        Grounding: VOF platform availability (HL, interactive investor, AJ Bell), dividend &amp; buyback
        history, the AIC, LSE/RNS disclosures. Frameworks: Cialdini’s principles of influence; Burkett, “From
        MICE to RASCLS” (Studies in Intelligence, 2013), used as marketing audience analysis. Platform share indicative.
      </p>
    </div>
  );
}
