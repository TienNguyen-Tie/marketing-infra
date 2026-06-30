'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ACTIVITY_TILES,
  ROADMAP_PHASES,
  ACTIVITY_FEED,
  FEED_TYPE_COLORS,
  MOMENT_CARDS,
  PATH_SCATTER,
  PATH_SYSTEM,
  LOCKED_SOURCES,
  WORKED_EXAMPLE,
  CLOSING_PILLARS,
  type ActivityTile,
} from '@/lib/vision-data';
import VisionCompanion from '@/components/VisionCompanion';
import styles from './home.module.css';

export default function HomePage() {
  const [companionOpen, setCompanionOpen] = useState(false);
  const [initialMode, setInitialMode] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<ActivityTile | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setSelectedActivity(null);
  }, []);

  useEffect(() => {
    if (selectedActivity) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedActivity, handleKeyDown]);

  function openCompanion(mode: string | null = null) {
    setInitialMode(mode);
    setCompanionOpen(true);
  }

  function handleSuggestClick() {
    openCompanion('new-activity');
  }

  return (
    <div className={styles.pageRoot}>

      {/* ── BAND 1 — HERO ─────────────────────────────────────── */}
      <section className={`${styles.band} ${styles.band1}`}>
        <div className={styles.heroLeft}>
          <p className={styles.heroEyebrow}>Marketing Infrastructure · Vision</p>
          <h1 className={styles.heroH1}>
            Marketing as the engine that makes VinaCapital the trusted partner for investing in Vietnam.
          </h1>
          <p className={styles.heroSub}>
            A foundations-first system where every report, story, and campaign is
            insight-driven, on-brand, and traceable — turning 20+ years of
            investment track record into a brand investors trust first.
          </p>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.statusPill}>
            <span className={`${styles.dot} ${styles.dotGreen}`} />
            Phase 1 · Foundations
          </div>
          <div className={styles.statusPill}>
            <span className={`${styles.dot} ${styles.dotPurple}`} />
            Brand Book v1.0 (2022) · Locked
          </div>
          <div className={styles.statusPill}>
            <span className={`${styles.dot} ${styles.dotGray}`} />
            Updated 2 days ago
          </div>
          <div className={styles.heroCtaWrap}>
            <button className={styles.heroCta} onClick={() => openCompanion()}>
              Talk to Vision Companion →
            </button>
          </div>
        </div>
      </section>

      {/* ── BAND 2 — THE MOMENT ───────────────────────────────── */}
      <section className={`${styles.band} ${styles.band2}`}>
        <p className={styles.eyebrow}>The Moment We&rsquo;re In</p>
        <h2 className={styles.bandH2}>
          20+ years of investment results. Marketing fragmented by growth.<br />
          A <em className={styles.redEm}>rare window</em> to rebuild it as a system.
        </h2>
        <p className={styles.bandSub}>
          Since 2003, VinaCapital has grown into one of Vietnam&rsquo;s leading
          investment managers — campaigns shipped, reports published,
          partnerships closed. But as the platform scaled, the marketing function
          fragmented while every team focused on investing. The moment to
          consolidate it into a real system is now.
        </p>

        <div className={styles.momentCards}>
          {MOMENT_CARDS.map((card, i) => (
            <div key={i} className={styles.momentCard}>
              <p className={styles.momentCardLabel}>{card.num}</p>
              <p className={styles.momentCardTitle}>{card.title}</p>
              <p className={styles.momentCardBody}>{card.body}</p>
            </div>
          ))}
        </div>

        <div className={styles.conclusionBanner}>
          <span className={styles.conclusionBannerLabel}>The choice</span>
          <span className={styles.conclusionBannerText}>
            <strong>Build the marketing engine before scaling activities</strong> — so
            every campaign, hire, and dollar compounds toward leadership positioning
            instead of dispersing into tactics.
          </span>
        </div>
      </section>

      {/* ── BAND 3 — TWO PATHS FORWARD ────────────────────────── */}
      <section className={`${styles.band} ${styles.band3}`}>
        <p className={styles.eyebrow}>Two Paths Forward</p>
        <h2 className={styles.bandH2}>
          The default path is tactical chaos.<br />
          The proposed path is <em className={styles.redEm}>systematic scale.</em>
        </h2>
        <p className={styles.bandSubNarrow}>
          Most marketing functions at companies this stage choose the first
          path — not by decision, but by default. The second requires patience
          now in exchange for compounding leverage later.
        </p>

        <div className={styles.pathsGrid}>
          {/* Path A — Scatter */}
          <div className={styles.pathCardGray}>
            <p className={styles.pathLabelGray}>
              <span className="material-icons-round" style={{ fontSize: 12 }}>close</span>
              {PATH_SCATTER.label}
            </p>
            <p className={styles.pathTitleGray}>{PATH_SCATTER.title}</p>
            <ul className={styles.pathList}>
              {PATH_SCATTER.points.map((pt, i) => (
                <li key={i} className={styles.pathItemGray}>{pt}</li>
              ))}
            </ul>
            <p className={styles.pathOutcomeGray}>{PATH_SCATTER.outcome}</p>
          </div>

          {/* Path B — System */}
          <div className={styles.pathCardRed}>
            <p className={styles.pathLabelRed}>
              <span className="material-icons-round" style={{ fontSize: 12 }}>check</span>
              {PATH_SYSTEM.label}
            </p>
            <p className={styles.pathTitleRed}>{PATH_SYSTEM.title}</p>
            <ul className={styles.pathList}>
              {PATH_SYSTEM.points.map((pt, i) => (
                <li key={i} className={styles.pathItemRed}>{pt}</li>
              ))}
            </ul>
            <p className={styles.pathOutcomeRed}>{PATH_SYSTEM.outcome}</p>
          </div>
        </div>
      </section>

      {/* ── BAND 4 — THE OPERATING RULE ───────────────────────── */}
      <section id="operating-rule" className={`${styles.band} ${styles.band4}`}>
        <p className={styles.eyebrow}>The Operating Rule</p>
        <h2 className={styles.bandH2Large}>
          Nothing is invented.{' '}
          <em className={styles.redEm}>Everything is inherited.</em>
        </h2>
        <p className={styles.bandSub}>
          This is the single rule the system enforces. Every brief, every
          campaign, every investor story, every piece of content — none of
          it originates from a blank page. Every output traces back to a
          locked, verified source: the brand book, the investment philosophy,
          the track record.
        </p>

        <div className={styles.pullDiagram}>
          {/* Locked Sources */}
          <div className={styles.lockedBlock}>
            <div className={styles.lockedBlockHeader}>
              <span className={styles.lockedBlockLabel}>THE LOCKED SOURCES</span>
              <span className={styles.lockedBlockTag}>
                <span className="material-icons-round" style={{ fontSize: 10 }}>lock</span>
                v2026 · verified
              </span>
            </div>
            <div className={styles.sourcesGrid}>
              {LOCKED_SOURCES.map(src => (
                <div key={src.name} className={styles.sourceCard}>
                  <span className="material-icons-round" style={{ fontSize: 18, color: '#3C3489' }}>
                    {src.icon}
                  </span>
                  <p className={styles.sourceName}>{src.name}</p>
                  <p className={styles.sourceDesc}>{src.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pull connector */}
          <div className={styles.pullConnector}>
            <span className={styles.pullArrow}>↑</span>
            <span className={styles.pullLabel}>Every output pulls from here</span>
            <span className={styles.pullArrow}>↑</span>
          </div>

          {/* Activities */}
          <div className={styles.activitiesBlock}>
            <p className={styles.activitiesBlockLabel}>EVERY MARKETING ACTIVITY</p>
            <p className={styles.activitiesBlockFlow}>
              Content · SEO · AIO · PR · Investor Relations · Partnerships · Creator Network · Brand Collaborations · Events · Reports ·{' '}
              <em style={{ color: '#727272' }}>+ every future activity</em>
            </p>
          </div>
        </div>

        <div className={styles.ruleBox}>
          <p className={styles.ruleBoxLabel}>WHAT THIS CHANGES</p>
          <p className={styles.ruleBoxBody}>
            This is what <strong>data-driven</strong> actually means at the operational
            level. Not dashboards. Not retrospective metrics.{' '}
            <strong>
              The structural guarantee that every marketing output — from a tweet to a
              partnership pitch — is downstream of a locked, verified source of truth.
            </strong>{' '}
            When someone asks &ldquo;why are we doing this?&rdquo; the answer is always
            one query away — pulled from the same place the campaign drew from in the
            first place.
          </p>
        </div>
      </section>

      {/* ── BAND 5 — THE SYSTEM ───────────────────────────────── */}
      <section id="system" className={`${styles.band} ${styles.band5}`}>
        <p className={styles.eyebrow}>The System · How It Works</p>
        <h2 className={styles.bandH2}>
          One source of truth feeds every activity.<br />
          Every activity feeds the truth <em className={styles.redEm}>back.</em>
        </h2>
        <p className={styles.bandSubNarrow}>
          Three layers, two AI flow directions, one closed loop. The system
          gets smarter with every cycle — every campaign run makes the next
          one more grounded, more focused, more confident.
        </p>

        <div className={styles.loopDiagram}>
          {/* SSOT */}
          <div className={styles.ssotBlock}>
            <p className={styles.ssotBlockLabel}>LAYER 1 · THE DATA SPINE</p>
            <p className={styles.ssotBlockTitle}>Single Source of Truth</p>
            <div className={styles.ssot2x2}>
              <span className={styles.ssotCell}>Brand · Services</span>
              <span className={styles.ssotCell}>Clients · Creators</span>
              <span className={`${styles.ssotCell} ${styles.ssotCellFull}`}>
                Activities · Performance Data
              </span>
            </div>
          </div>

          {/* Flow row */}
          <div className={styles.flowRow}>
            <div className={styles.insightBlock}>
              <p className={styles.insightLabel}>LAYER 2 · INBOUND</p>
              <p className={styles.insightTitle}>Insight AI</p>
              <p className={styles.insightDesc}>
                Reads activity results across all channels. Extracts patterns. Updates
                the SSOT so the next campaign launches smarter.
              </p>
              <p className={styles.insightTools}>
                <strong>Tools:</strong> Insight Extraction · Performance Sync · Pattern Library
              </p>
            </div>

            <div className={styles.flowCenter}>
              <div className={styles.flowArrowGroup}>
                <span className={styles.flowArrowUp} style={{ color: '#333B52' }}>↑</span>
                <span className={styles.flowArrowLabel}>feeds back</span>
              </div>
              <div className={styles.flowArrowGroup}>
                <span className={styles.flowArrowLabel}>grounds</span>
                <span className={styles.flowArrowUp} style={{ color: '#854F0B' }}>↑</span>
              </div>
            </div>

            <div className={styles.productionBlock}>
              <p className={styles.productionLabel}>LAYER 2 · OUTBOUND</p>
              <p className={styles.productionTitle}>Production AI</p>
              <p className={styles.productionDesc}>
                Reads the SSOT and produces brand-aligned work. Every output is
                grounded in locked context, not assumptions or templates.
              </p>
              <p className={styles.productionTools}>
                <strong>Tools:</strong> Content · Design · Briefing · Review
              </p>
            </div>
          </div>

          {/* Activities pool */}
          <div className={styles.activitiesPool}>
            <p className={styles.activitiesPoolLabel}>LAYER 3 · THE EXECUTION LAYER</p>
            <p className={styles.activitiesPoolTitle}>All Marketing Activities</p>
            <p className={styles.activitiesPoolDesc}>
              Content · SEO · AIO · PR · Partnership · Creator Acquisition · Creator
              Nurturing — every activity pulls from the same source
            </p>
          </div>

          <p className={styles.loopNote}>
            <strong>The loop closes here.</strong> Activities use the foundations to
            execute → results feed back through Insight AI → SSOT updates → next campaign
            starts smarter. The system compounds — it doesn&rsquo;t degrade.
          </p>
        </div>
      </section>

      {/* ── BAND 6 — ACTIVITY MAP ─────────────────────────────── */}
      <section className={`${styles.band} ${styles.band6}`}>
        <p className={styles.eyebrow}>Every Marketing Activity</p>
        <h2 className={styles.bandH2}>
          Seven activities in motion.{' '}
          <em className={styles.redEm}>Many more to come.</em>
        </h2>
        <p className={styles.band6Sub}>
          Each tile pulls from the same foundations. Click any to see how it plugs into the system.
        </p>

        <div className={styles.tileGrid}>
          {ACTIVITY_TILES.map(tile => (
            <div
              key={tile.id}
              className={styles.tile}
              onClick={() => setSelectedActivity(tile)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setSelectedActivity(tile)}
            >
              <div className={styles.tileTop}>
                <span className={styles.tileIcon}>
                  <span className="material-icons-round" style={{ fontSize: 14 }}>{tile.icon}</span>
                </span>
                <span className={styles.tileDot} />
              </div>
              <p className={styles.tileName}>{tile.name}</p>
              <p className={styles.tileDesc}>{tile.desc}</p>
            </div>
          ))}

          <div
            className={styles.suggestTile}
            onClick={handleSuggestClick}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && handleSuggestClick()}
          >
            <span className={styles.suggestPlus}>+</span>
            <p className={styles.suggestText}>Suggest a new activity</p>
          </div>
        </div>
      </section>

      {/* ── BAND 7 — WORKED EXAMPLE ───────────────────────────── */}
      <section className={`${styles.band} ${styles.band7}`}>
        <p className={styles.eyebrow}>A Worked Example</p>
        <h2 className={styles.bandH2}>
          Same content campaign.{' '}
          <em className={styles.redEm}>Two outcomes.</em>
        </h2>
        <p className={styles.bandSubNarrow}>
          The clearest way to see why the system matters is to walk one
          campaign through both paths. Same product, same budget, same effort.
          Different category of result.
        </p>

        <div className={styles.scenarioBanner}>
          <strong>Scenario.</strong> {WORKED_EXAMPLE.scenario}
        </div>

        <div className={styles.exampleGrid}>
          {/* Without system */}
          <div className={styles.exampleCardGray}>
            <p className={styles.exampleLabelGray}>
              <span className="material-icons-round" style={{ fontSize: 12 }}>close</span>
              Without the system
            </p>
            <p className={styles.exampleTitleGray}>{WORKED_EXAMPLE.withoutSystem.title}</p>
            <div className={styles.exampleSteps}>
              {WORKED_EXAMPLE.withoutSystem.steps.map((step, i) => (
                <div key={i} className={styles.exampleStep}>
                  <span className={styles.stepCircleGray}>{i + 1}</span>
                  <span className={styles.stepText}>
                    <strong>{step.title}.</strong> {step.desc}
                  </span>
                </div>
              ))}
            </div>
            <p className={styles.exampleResultGray}>{WORKED_EXAMPLE.withoutSystem.result}</p>
          </div>

          {/* With system */}
          <div className={styles.exampleCardRed}>
            <p className={styles.exampleLabelRed}>
              <span className="material-icons-round" style={{ fontSize: 12 }}>check</span>
              With the system
            </p>
            <p className={styles.exampleTitleRed}>{WORKED_EXAMPLE.withSystem.title}</p>
            <div className={styles.exampleSteps}>
              {WORKED_EXAMPLE.withSystem.steps.map((step, i) => (
                <div key={i} className={styles.exampleStep}>
                  <span className={styles.stepCircleRed}>{i + 1}</span>
                  <span className={styles.stepText}>
                    <strong>{step.title}.</strong> {step.desc}
                  </span>
                </div>
              ))}
            </div>
            <p className={styles.exampleResultRed}>{WORKED_EXAMPLE.withSystem.result}</p>
          </div>
        </div>
      </section>

      {/* ── BAND 8 — ROADMAP + WHAT'S NEW ─────────────────────── */}
      <section id="roadmap" className={`${styles.band} ${styles.band8}`}>
        <div>
          <p className={styles.eyebrow}>Roadmap</p>
          <h2 className={styles.band8H2}>Three phases. Each one earns the next.</h2>

          <div className={styles.phaseRow}>
            {ROADMAP_PHASES.map(phase => (
              <div
                key={phase.id}
                className={`${styles.phaseCard} ${phase.active ? styles.phaseCardActive : styles.phaseCardMuted}`}
              >
                <p className={`${styles.phaseLabel} ${phase.active ? styles.phaseLabelActive : styles.phaseLabelMuted}`}>
                  {phase.label}
                </p>
                <p className={`${styles.phaseTiming} ${phase.active ? styles.phaseTimingActive : styles.phaseTimingMuted}`}>
                  {phase.timing}
                </p>
                <p className={`${styles.phaseTitle} ${phase.active ? styles.phaseTitleActive : styles.phaseTitleMuted}`}>
                  {phase.title}
                </p>
                <p className={`${styles.phaseSummary} ${phase.active ? styles.phaseSummaryActive : styles.phaseSummaryMuted}`}>
                  {phase.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className={styles.eyebrow}>What&rsquo;s New</p>
          <h2 className={styles.band8H2}>System updates</h2>

          <div className={styles.feedList}>
            {ACTIVITY_FEED.map((item, i) => (
              <div key={i} className={styles.feedItem}>
                <span
                  className={styles.feedDot}
                  style={{ background: FEED_TYPE_COLORS[item.type] ?? '#A3A3A3' }}
                />
                <span className={styles.feedLabel}>{item.label}</span>
                <span className={styles.feedDate}>{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BAND 9 — CLOSING STATEMENT ────────────────────────── */}
      <section className={`${styles.band} ${styles.band9}`}>
        <div className={styles.closingPanel}>
          <p className={styles.closingEyebrow}>What this becomes at scale</p>
          <h2 className={styles.closingH2}>
            Not a fund among funds.<br />
            The name investors <em style={{ fontStyle: 'normal' }}>trust first.</em>
          </h2>
          <div className={styles.closingGrid}>
            {CLOSING_PILLARS.map(p => (
              <div key={p.label} className={styles.closingPillar}>
                <p className={styles.closingPillarLabel}>{p.label}</p>
                <p className={styles.closingPillarText}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BAND 10 — AI COMPANION CTA ────────────────────────── */}
      <section id="companion" className={`${styles.band} ${styles.band10}`}>
        <div className={styles.companionInner}>
          <p className={styles.companionEyebrow}>AI Vision Companion</p>
          <h2 className={styles.companionH2}>
            Brainstorm with a partner<br />
            that <em className={styles.redEm}>knows the vision.</em>
          </h2>
          <p className={styles.companionPara}>
            Talk to an AI grounded in every locked source. Stress-test ideas,
            brainstorm features, suggest new activities — every exchange is
            logged for the marketing team to review.
          </p>

          <div className={styles.companionCtaWrap}>
            <button className={styles.companionCta} onClick={() => openCompanion()}>
              Open Vision Companion
              <span className="material-icons-round" style={{ fontSize: 18 }}>arrow_forward</span>
            </button>
          </div>

          <div className={styles.previewWrap}>
            <div className={styles.previewCard}>
              <div className={styles.previewModes}>
                <span className={styles.modePillActive}>Help me understand my role</span>
                <span className={styles.modePillMuted}>Brainstorm features</span>
                <span className={styles.modePillMuted}>Stress-test an idea</span>
                <span className={styles.modePillMuted}>Suggest a new activity</span>
              </div>

              <div className={styles.chatBubbles}>
                <div className={styles.userBubble}>
                  I lead PR for the Vietnam market. How does my function fit into this system?
                </div>
                <div className={styles.aiBubble}>
                  Your PR work draws directly from the Brand Foundation (positioning, voice) and
                  VinaCapital&rsquo;s 20-year track record. Every press pitch reinforces the same
                  story: the trusted partner for investing in Vietnam...
                </div>
              </div>

              <div className={styles.previewInputRow}>
                <div className={styles.previewInput}>Ask anything about the vision...</div>
                <div className={styles.previewSend}>Send</div>
              </div>
            </div>
          </div>

          <p className={styles.previewCaption}>
            Preview · Every exchange is automatically logged for the team.
          </p>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer className={styles.pageFooter}>
        VinaCapital Marketing Infrastructure · Phase 1 deployment · May 2026
      </footer>

      {/* ── VISION COMPANION SLIDER ───────────────────────────── */}
      <VisionCompanion
        open={companionOpen}
        onClose={() => setCompanionOpen(false)}
        initialMode={initialMode}
      />

      {/* ── ACTIVITY DETAIL MODAL ─────────────────────────────── */}
      {selectedActivity && (
        <div
          className={styles.backdrop}
          onClick={() => setSelectedActivity(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <span className={styles.modalIcon}>
                <span className="material-icons-round" style={{ fontSize: 16 }}>
                  {selectedActivity.icon}
                </span>
              </span>
              <span className={styles.modalTitle}>{selectedActivity.name}</span>
              <button
                className={styles.modalClose}
                onClick={() => setSelectedActivity(null)}
                aria-label="Close"
              >
                <span className="material-icons-round" style={{ fontSize: 18 }}>close</span>
              </button>
            </div>
            <div className={styles.modalRow}>
              <p className={styles.modalRowLabel}>Draws From</p>
              <p className={styles.modalRowValue}>{selectedActivity.details.drawsFrom}</p>
            </div>
            <div className={styles.modalRow}>
              <p className={styles.modalRowLabel}>Produces</p>
              <p className={styles.modalRowValue}>{selectedActivity.details.produces}</p>
            </div>
            <div className={styles.modalRow}>
              <p className={styles.modalRowLabel}>Stays Aligned</p>
              <p className={styles.modalRowValue}>{selectedActivity.details.staysAligned}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
