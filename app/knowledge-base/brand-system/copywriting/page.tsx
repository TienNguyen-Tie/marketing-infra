import styles from './copywriting.module.css';
import PlatformRulesPanel from './_components/PlatformRulesPanel';

/* Content extracted from the VinaCapital Brand Book (2022) — Brand Strategy
   (personality, values, promises), Typography System, and Disclaimer. */

const VOICE = [
  { n: '01', label: 'Focused & Driven', title: 'Say what matters. Never lose the thread.', body: 'We are focused, passionate, and driven — never losing sight of what is important or what needs to be done. Copy leads with the point; it does not bury it.' },
  { n: '02', label: 'Experienced & Balanced', title: 'Confidence balanced by diligence.', body: 'We are proud of our accomplishments but know we can achieve more. Our appetite for ambition is balanced by diligence, research, and good governance — so we are optimistic, never hype.' },
  { n: '03', label: 'Passionate & Adaptable', title: 'Believe in Vietnam. Adapt to the reader.', body: 'We passionately believe in Vietnam’s potential and are excited to try new things. The same truth is told differently to a first-time saver and a global institution — never off-brand, always on-message.' },
];

const PROMISES = [
  'Go-to, trusted advice',
  'Traditional & alternative investment',
  'Education, information & access',
  'International experience, local insight',
  'Optimism, enthusiasm & ambition',
  'Knowledge, expertise & confidence',
];

const HIERARCHY = [
  { role: 'Headline', face: 'Helvetica Now Display ExtraBold', spec: 'Sentence case · leading 110% · tracking 0', sample: <span className={styles.specimenDisplay}>Creating prosperity together</span> },
  { role: 'Sub-headline', face: 'Helvetica Now (tracked)', spec: 'ALL CAPS · leading 120% · tracking +200', sample: <span className={styles.specimenCaps}>Brand Strategy</span> },
  { role: 'Body copy', face: 'Helvetica Now Text Light / Medium', spec: 'Sentence case · leading 150% · tracking −10', sample: <span className={styles.specimenBody}>We invest in the best opportunities in Vietnam.</span> },
  { role: 'Decoration', face: 'Georgia Regular', spec: 'Editorial accents, pull-quotes, figures', sample: <span className={styles.specimenSerif}>USD 3.8b</span> },
];

const USE = ['Trusted', 'Prosperity', 'Growth', 'Opportunity', 'Partner', 'Insight', 'Long-term', 'Expertise', 'Discipline', 'Vietnam'];
const AVOID = ['Guaranteed', 'Risk-free', 'Get rich', 'Hype', 'Best-ever', 'Jargon-for-jargon', 'Hard-sell'];

export default function CopywritingPage() {
  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbText}>Knowledge Base › Brand System › Copywriting Guidelines</span>
          <span className={styles.version}>Brand Book v1.0 · 2022</span>
        </div>
        <h1 className={styles.title}>Copywriting Guidelines</h1>
        <p className={styles.subtitle}>
          How VinaCapital sounds in every piece of marketing — derived from the brand
          personality, values, and typography system in the 2022 Brand Book. Presenting
          ourselves in a uniform way, time and again, ensures every message carries the same brand.
        </p>
      </div>

      {/* Tagline */}
      <div className={styles.tagline}>
        <span className={styles.taglineEyebrow}>The line everything ladders up to</span>
        <span className={styles.taglineQuote}>Creating Prosperity Together.</span>
        <span className={styles.taglineSub}>
          Brand essence: <strong>Expertise · Experience · Growth.</strong> Every headline, report,
          and post should feel like a credible step toward that promise.
        </span>
      </div>

      {/* From the FCA section down: content column + sticky platform-rules rail */}
      <div className={styles.fcaLayout}>
        <div className={styles.fcaMain}>

      {/* FCA Regulation — read first, mandatory */}
      <section className={styles.fcaBlock}>
        <div className={styles.fcaTop}>
          <span className={styles.fcaBadge}>Read first · Mandatory</span>
          <span className={styles.fcaRegion}>Regulatory · United Kingdom</span>
        </div>
        <h2 className={styles.fcaTitle}>FCA financial promotion rules</h2>
        <p className={styles.fcaLead}>
          VinaCapital&rsquo;s funds (including the London-listed VOF) are marketed into the UK, so any
          copy that reaches UK investors is a <strong>financial promotion</strong> under FCA rules and
          the Financial Services and Markets Act. <strong>Brand voice never overrides compliance.</strong>{' '}
          Every UK-facing communication must be written against the rules below and{' '}
          <strong>approved by an FCA-authorised person before it is published</strong> — no sign-off,
          no publish. When voice and regulation conflict, regulation wins.
        </p>

        <p className={styles.fcaNuance}>
          <strong>Status check.</strong> VOF is a London-listed closed-ended investment trust (UKLR 11) —
          a mainstream, &ldquo;readily realisable&rdquo; security. It is <strong>excluded from the high-risk
          (RMMI / non-mass-market) promotion regime</strong>, so the prescribed high-risk warnings and
          24-hour cooling-off don&rsquo;t apply. The standard COBS 4 rules below do. Don&rsquo;t paste in
          high-risk-investment warnings that don&rsquo;t fit — and don&rsquo;t assume a lighter touch either.
        </p>

        <div className={styles.fcaGrid}>
          <div className={styles.fcaRule}>
            <p className={styles.fcaRuleRef}>COBS 4.2</p>
            <p className={styles.fcaRuleTitle}>Fair, clear &amp; not misleading</p>
            <p className={styles.fcaRuleBody}>The core test. Never disguise, diminish, or obscure risks, costs, or any material information — in words, design, or emphasis.</p>
          </div>
          <div className={styles.fcaRule}>
            <p className={styles.fcaRuleRef}>Balance</p>
            <p className={styles.fcaRuleTitle}>Benefit and risk, side by side</p>
            <p className={styles.fcaRuleBody}>Give a balanced impression. No upside claim without its corresponding risk shown with equal prominence.</p>
          </div>
          <div className={styles.fcaRule}>
            <p className={styles.fcaRuleRef}>Risk warnings</p>
            <p className={styles.fcaRuleTitle}>Mandatory &amp; prominent</p>
            <p className={styles.fcaRuleBody}>“The value of investments can go down as well as up and you may get back less than you invested.” “Past performance is not a guide to future results.” At least equal prominence to the rest of the copy.</p>
          </div>
          <div className={styles.fcaRule}>
            <p className={styles.fcaRuleRef}>s21 FSMA approval</p>
            <p className={styles.fcaRuleTitle}>Sign-off before publish</p>
            <p className={styles.fcaRuleBody}>A financial promotion must be made or approved by an authorised person. Route every UK-facing asset through compliance review first.</p>
          </div>
          <div className={styles.fcaRule}>
            <p className={styles.fcaRuleRef}>Consumer Duty</p>
            <p className={styles.fcaRuleTitle}>Support understanding</p>
            <p className={styles.fcaRuleBody}>Copy must enable good outcomes and the average retail investor’s understanding — not merely be technically accurate.</p>
          </div>
          <div className={styles.fcaRule}>
            <p className={styles.fcaRuleRef}>FG24/1 · Social media</p>
            <p className={styles.fcaRuleTitle}>Every post stands alone</p>
            <p className={styles.fcaRuleBody}>Risk warnings can’t be buried in a thread, hidden behind “more”, or lost on a repost. Influencer and affiliate content counts as a promotion too.</p>
          </div>
        </div>

        <p className={styles.fcaSubHead}>Mandatory risk-warning wording</p>
        <div className={styles.wordingList}>
          <div className={styles.wordingItem}><span>Capital at risk — always</span>The value of investments, and the income from them, can fall as well as rise. You may get back less than you invested.</div>
          <div className={styles.wordingItem}><span>Past performance — whenever performance is shown</span>Past performance is not a reliable indicator of future results.</div>
          <div className={styles.wordingItem}><span>Currency — overseas exposure</span>Movements in exchange rates can affect the value of overseas investments.</div>
          <div className={styles.wordingItem}><span>Investment trust — discount/premium</span>Shares in investment trusts can trade at a discount or premium to net asset value.</div>
          <div className={styles.wordingItem}><span>Status — not advice</span>This is a financial promotion. It is not advice or a recommendation to buy or sell.</div>
        </div>

        <p className={styles.fcaSubHead}>Copywriter&rsquo;s pre-publish checklist</p>
        <ul className={styles.checklist}>
          <li>Does this reach UK investors? If yes, it is a financial promotion and these rules apply.</li>
          <li>Fair, clear &amp; not misleading — no risk buried, downplayed, or out-designed?</li>
          <li>Benefits balanced by the matching risks, with equal prominence?</li>
          <li>Capital-at-risk and past-performance warnings present and prominent?</li>
          <li>Any performance shown per COBS 4.6 — right period, sourced, warned, not the headline?</li>
          <li>Costs, charges and discount-to-NAV represented fairly?</li>
          <li>No guarantees, no manufactured urgency, no pressure language?</li>
          <li>Social post stands alone (FG24/1) — warning not buried, clipped, or lost on reshare?</li>
          <li>Approved by an FCA-authorised person (s21) before publishing?</li>
          <li>A record kept of the exact approved version?</li>
        </ul>

        <div className={styles.fcaActions}>
          <a
            className={styles.downloadBtn}
            href="https://www.fca.org.uk/publication/finalised-guidance/fg24-1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <span className="material-icons-round">file_download</span>
            Download FCA FG24/1 (PDF)
          </a>
          <div className={styles.refLinks}>
            <a className={styles.refLink} href="https://www.handbook.fca.org.uk/handbook/COBS/4/2.html" target="_blank" rel="noopener noreferrer">COBS 4.2 — Fair, clear &amp; not misleading (Handbook)</a>
            <a className={styles.refLink} href="https://www.handbook.fca.org.uk/handbook/COBS/4/6.html" target="_blank" rel="noopener noreferrer">COBS 4.6 — Past, simulated &amp; future performance (Handbook)</a>
            <a className={styles.refLink} href="https://www.fca.org.uk/firms/risk-warnings-mainstream-investments" target="_blank" rel="noopener noreferrer">FCA — Risk warnings for mainstream investments</a>
            <a className={styles.refLink} href="https://api-handbook.fca.org.uk/files/sourcebook/COBS.pdf" target="_blank" rel="noopener noreferrer">COBS — full Conduct of Business Sourcebook (PDF)</a>
            <span className={styles.refMeta}>Official FCA sources — always check fca.org.uk for the current version.</span>
          </div>
        </div>
      </section>

      {/* Voice */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Voice</p>
          <h2 className={styles.sectionTitle}>Three traits, present in every line</h2>
          <p className={styles.sectionSub}>
            The brand personality — Focused, Passionate, Adaptable, Driven, Experienced, Balanced —
            translated into how we write.
          </p>
        </div>
        <div className={styles.grid3}>
          {VOICE.map((v) => (
            <div key={v.n} className={styles.card}>
              <p className={styles.cardNum}>{v.n}</p>
              <p className={styles.cardLabel}>{v.label}</p>
              <p className={styles.cardTitle}>{v.title}</p>
              <p className={styles.cardBody}>{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brand promises */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>What we promise</p>
          <h2 className={styles.sectionTitle}>Six promises behind the words</h2>
          <p className={styles.sectionSub}>
            From the Core Brand Elements. Strong copy delivers on at least one of these — and never
            contradicts any of them.
          </p>
        </div>
        <div className={styles.grid3}>
          {PROMISES.map((p, i) => (
            <div key={i} className={styles.card}>
              <p className={styles.cardNum}>{String(i + 1).padStart(2, '0')}</p>
              <p className={styles.cardTitle} style={{ marginBottom: 0 }}>{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Typographic voice */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Typographic voice</p>
          <h2 className={styles.sectionTitle}>Hierarchy carries the tone</h2>
          <p className={styles.sectionSub}>
            VinaCapital communications use exactly two typefaces: Helvetica Now (system fallback
            Helvetica / Arial) and Georgia. Never introduce a third.
          </p>
        </div>
        <table className={styles.table}>
          <thead>
            <tr><th>Role</th><th>Typeface</th><th>Spec</th><th>Specimen</th></tr>
          </thead>
          <tbody>
            {HIERARCHY.map((h) => (
              <tr key={h.role}>
                <td><strong>{h.role}</strong></td>
                <td>{h.face}</td>
                <td>{h.spec}</td>
                <td className={styles.specimen}>{h.sample}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Words */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Word choice</p>
          <h2 className={styles.sectionTitle}>Lean in / steer clear</h2>
        </div>
        <div className={styles.doDont}>
          <div className={styles.doCol}>
            <p className={styles.doHead}>Lean into</p>
            <div className={styles.chips}>
              {USE.map((w) => <span key={w} className={styles.chip}>{w}</span>)}
            </div>
            <ul style={{ marginTop: 18 }}>
              <li>Lead with the reader’s outcome — prosperity, growth, peace of mind.</li>
              <li>Pair ambition with evidence: track record, discipline, research.</li>
              <li>Plain, precise sentences. Sentence case in body, never shouting.</li>
            </ul>
          </div>
          <div className={styles.dontCol}>
            <p className={styles.dontHead}>Steer clear of</p>
            <div className={styles.chips}>
              {AVOID.map((w) => <span key={w} className={`${styles.chip} ${styles.chipMuted}`}>{w}</span>)}
            </div>
            <ul style={{ marginTop: 18 }}>
              <li>Never promise or imply guaranteed returns.</li>
              <li>No hype, superlatives, or pressure tactics — it reads as old-school hard-sell.</li>
              <li>Don’t bury the point in jargon; explain, don’t posture.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Example */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Worked example</p>
          <h2 className={styles.sectionTitle}>The proposition, in our voice</h2>
        </div>
        <div className={styles.example}>
          <div className={styles.exampleRow}>
            <span className={styles.exampleKey}>Headline</span>
            <span className={styles.exampleHeadline}>
              As Vietnam’s only multi-disciplinary investment manager, we share the country’s growth
              across every asset class.
            </span>
          </div>
          <div className={styles.exampleRow}>
            <span className={styles.exampleKey}>Body</span>
            <span className={styles.exampleVal}>
              We <em>discover the best investment opportunities</em> in Vietnam by leveraging our
              extensive relationships, local knowledge, analytical capability, and financial
              expertise — to become the <em>trusted partner</em> for investing in Vietnam, for local
              and international investors alike.
            </span>
          </div>
          <div className={styles.exampleRow}>
            <span className={styles.exampleKey}>Quote tone</span>
            <span className={styles.exampleVal}>
              “It is an up-and-coming powerhouse — the new tiger economy of Asia.” — confident,
              optimistic, grounded in a real point of view.
            </span>
          </div>
        </div>
        <p className={styles.note}>
          <strong>Always required.</strong> Wherever performance is mentioned, include the brand
          disclaimer: “Past performance is not a guarantee of future returns.” Marketing copy is not
          an offer to buy or sell securities.
        </p>
      </section>

        </div>{/* .fcaMain */}

        <aside className={styles.platformRail}>
          <PlatformRulesPanel />
        </aside>
      </div>{/* .fcaLayout */}
    </div>
  );
}
