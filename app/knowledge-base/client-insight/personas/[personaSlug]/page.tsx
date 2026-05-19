import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPersonas, getPersonaBySlug } from '@/data/personas/helpers';
import { getIcpBySlug } from '@/data/icps/helpers';
import type { PersonaType, SeniorityLevel, InfluenceLevel } from '@/data/personas/types';
import { getInsightsForPersona } from '@/lib/research/helpers';
import RelevantResearchSection from '@/components/research/RelevantResearchSection';
import styles from './persona.module.css';

/* ── Static params ──────────────────────────────────────── */

export async function generateStaticParams() {
  return getAllPersonas().map(p => ({ personaSlug: p.slug }));
}

/* ── Label maps ─────────────────────────────────────────── */

const PERSONA_TYPE_LABELS: Record<PersonaType, string> = {
  champion: 'Champion',
  influencer: 'Influencer',
  blocker: 'Blocker',
  gatekeeper: 'Gatekeeper',
  mixed: 'Mixed',
};

const PERSONA_TYPE_DESCS: Record<PersonaType, string> = {
  champion: 'natural Ecomobi sponsor',
  influencer: 'shapes the decision without owning it',
  blocker: 'can halt progress on brand-fit or strategic grounds',
  gatekeeper: 'controls final approval or access',
  mixed: 'can be champion or blocker depending on context',
};

const SENIORITY_LABELS: Record<SeniorityLevel, string> = {
  operator: 'Operator',
  manager: 'Manager',
  director: 'Director',
  executive: 'Executive',
};

const SENIORITY_DESCS: Record<SeniorityLevel, string> = {
  operator: 'hands-on execution role',
  manager: 'mid-level with brand or functional ownership',
  director: 'regional or functional leadership',
  executive: 'country or regional P&L owner',
};

const INFLUENCE_LABELS: Record<InfluenceLevel, string> = {
  decider: 'Decider',
  influencer: 'Influencer',
  gate: 'Gatekeeper',
  executor: 'Executor',
};

const INFLUENCE_DESCS: Record<InfluenceLevel, string> = {
  decider: 'primary decision authority',
  influencer: 'shapes but does not own the decision',
  gate: 'veto or approval power at a specific stage',
  executor: 'implements but does not decide',
};

/* ── Shared mini-components ─────────────────────────────── */

function GroupDivider({ label }: { label: string }) {
  return (
    <div className={styles.groupDivider}>
      <span className={styles.groupEyebrow}>{label}</span>
      <span className={styles.groupLine} />
    </div>
  );
}

function SectionHeader({ num, title, subtitle }: { num: string; title: string; subtitle?: string }) {
  return (
    <div className={styles.sectionHeader}>
      <span className={styles.sectionNum}>{num}</span>
      <div className={styles.sectionTitles}>
        <span className={styles.sectionTitle}>{title}</span>
        {subtitle && <span className={styles.sectionSubtitle}>{subtitle}</span>}
      </div>
    </div>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.fieldRow}>
      <span className={styles.fieldLabel}>{label}</span>
      <div className={styles.fieldValue}>{children}</div>
    </div>
  );
}

function Muted({ children }: { children?: React.ReactNode }) {
  return <span className={styles.fieldMuted}>{children ?? 'Not yet captured'}</span>;
}

/* ── Page ───────────────────────────────────────────────── */

export default async function PersonaDetailPage({
  params,
}: {
  params: Promise<{ personaSlug: string }>;
}) {
  const { personaSlug } = await params;
  const persona = getPersonaBySlug(personaSlug);
  if (!persona) notFound();

  const relevantInsights = await getInsightsForPersona(persona.slug);
  const icpVariationsCount = persona.icpVariations?.length ?? 0;
  const objectionCount = persona.commonObjections?.length ?? 0;

  return (
    <div className={styles.page}>

      {/* ── Breadcrumb ── */}
      <p className={styles.breadcrumb}>
        Knowledge Base ›{' '}
        <Link href="/knowledge-base/client-insight/personas" style={{ color: 'inherit', textDecoration: 'none' }}>
          Decision-maker Personas
        </Link>{' '}
        › {persona.name}
      </p>

      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <p className={styles.heroEyebrow}>
            DECISION-MAKER PERSONA · {persona.seniorityLevel.toUpperCase()}
          </p>
          <h1 className={styles.heroH1}>{persona.name}</h1>
          <p className={styles.heroMeta}>
            {persona.shortCode} · {persona.typicalJobTitles.length} title variations · Appears in {icpVariationsCount} ICP{icpVariationsCount !== 1 ? 's' : ''}
          </p>
        </div>
        <div className={styles.heroRight}>
          <span className={`${styles.typePill} ${styles[`type--${persona.personaType}`]}`}>
            {PERSONA_TYPE_LABELS[persona.personaType]}
          </span>
          {persona.lastReviewed && (
            <span className={styles.heroReviewed}>
              Reviewed {new Date(persona.lastReviewed).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
          )}
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className={styles.statsStrip}>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{icpVariationsCount}</span>
          <span className={styles.statLabel}>ICP Variations</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>
            {persona.roleInDeals?.typicalInfluenceLevel
              ? INFLUENCE_LABELS[persona.roleInDeals.typicalInfluenceLevel]
              : '—'}
          </span>
          <span className={styles.statLabel}>Influence Level</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{objectionCount}</span>
          <span className={styles.statLabel}>Common Objections</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{persona.typicalJobTitles.length}</span>
          <span className={styles.statLabel}>Typical Titles</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP A · PERSONA IDENTITY
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP A · PERSONA IDENTITY" />

      {/* §01 — Persona Profile */}
      <div className={styles.section}>
        <SectionHeader num="01" title="PERSONA PROFILE" />
        <div className={styles.profileCard}>
          <FieldRow label="PERSONA NAME">{persona.name}</FieldRow>
          <FieldRow label="SHORT CODE">
            <span className={styles.monoCode}>{persona.shortCode}</span>
          </FieldRow>
          <FieldRow label="PERSONA TYPE">
            <span className={`${styles.typePill} ${styles[`type--${persona.personaType}`]}`}>
              {PERSONA_TYPE_LABELS[persona.personaType]}
            </span>
            <span className={styles.pillDesc}>— {PERSONA_TYPE_DESCS[persona.personaType]}</span>
          </FieldRow>
          <FieldRow label="SENIORITY LEVEL">
            <span className={`${styles.seniorityPill} ${styles[`seniority--${persona.seniorityLevel}`]}`}>
              {SENIORITY_LABELS[persona.seniorityLevel]}
            </span>
            <span className={styles.pillDesc}>— {SENIORITY_DESCS[persona.seniorityLevel]}</span>
          </FieldRow>
          <FieldRow label="TYPICAL JOB TITLES">
            {persona.typicalJobTitles.length > 0 ? (
              <div className={styles.pillRow}>
                {persona.typicalJobTitles.map(t => (
                  <span key={t} className={styles.titlePill}>{t}</span>
                ))}
              </div>
            ) : (
              [0, 1, 2].map(i => (
                <span key={i} className={`${styles.titlePill} ${styles.ghostCard}`}>
                  <span className={styles.ghostText}>Title not yet captured</span>
                </span>
              ))
            )}
          </FieldRow>
          <FieldRow label="TYPICAL REPORTING LINE">
            {persona.typicalReportingLine ?? <Muted />}
          </FieldRow>
          <FieldRow label="FIRST DEFINED">
            {persona.firstDefined
              ? new Date(persona.firstDefined).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
              : <Muted />}
          </FieldRow>
          <FieldRow label="LAST REVIEWED">
            {persona.lastReviewed
              ? new Date(persona.lastReviewed).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
              : <Muted />}
          </FieldRow>
        </div>
      </div>

      {/* §02 — Persona Snapshot */}
      <div className={styles.section}>
        <SectionHeader num="02" title="PERSONA SNAPSHOT" />
        <div className={styles.profileCard}>
          <FieldRow label="ONE-SENTENCE DEFINITION">
            {persona.snapshot?.oneSentenceDefinition
              ? <p className={styles.definitionText}>{persona.snapshot.oneSentenceDefinition}</p>
              : <Muted />}
          </FieldRow>
          <FieldRow label="CORE ROLE">
            {persona.snapshot?.coreRole ?? <Muted />}
          </FieldRow>
          <FieldRow label="TYPICAL BACKGROUND">
            {persona.snapshot?.typicalBackground ?? <Muted />}
          </FieldRow>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP B · INSIDE THEIR HEAD
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP B · INSIDE THEIR HEAD" />

      {/* §03 — What They Care About */}
      <div className={styles.section}>
        <SectionHeader num="03" title="WHAT THEY CARE ABOUT" />
        <div className={styles.profileCard}>
          <FieldRow label="PERSONAL INCENTIVES">
            {persona.caresAbout?.personalIncentives ?? <Muted />}
          </FieldRow>
        </div>

        <div className={styles.twoColGrid}>
          <div>
            <p className={styles.subSectionLabel}>PUBLIC GOALS</p>
            {persona.caresAbout?.publicGoals && persona.caresAbout.publicGoals.length > 0 ? (
              <ul className={styles.goalList}>
                {persona.caresAbout.publicGoals.map((g, i) => (
                  <li key={i} className={styles.goalItemRed}>
                    <span className={styles.goalDotRed} />
                    {g}
                  </li>
                ))}
              </ul>
            ) : (
              [0, 1, 2].map(i => (
                <div key={i} className={`${styles.ghostRow} ${styles.ghostCard}`}>
                  <span className={styles.ghostDotRed} />
                  <span className={styles.ghostText}>Public goal not yet captured</span>
                </div>
              ))
            )}
          </div>
          <div>
            <p className={styles.subSectionLabel}>PRIVATE GOALS</p>
            {persona.caresAbout?.privateGoals && persona.caresAbout.privateGoals.length > 0 ? (
              <ul className={styles.goalList}>
                {persona.caresAbout.privateGoals.map((g, i) => (
                  <li key={i} className={styles.goalItemAmber}>
                    <span className={styles.goalDotAmber} />
                    {g}
                  </li>
                ))}
              </ul>
            ) : (
              [0, 1, 2].map(i => (
                <div key={i} className={`${styles.ghostRow} ${styles.ghostCard}`}>
                  <span className={styles.ghostDotAmber} />
                  <span className={styles.ghostText}>Private goal not yet captured</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* §04 — Pressures and Fears */}
      <div className={styles.section}>
        <SectionHeader num="04" title="PRESSURES AND FEARS" />
        <div className={styles.profileCard}>
          <FieldRow label="WHAT KEEPS THEM UP AT NIGHT">
            {persona.pressuresAndFears?.keepsThemUpAtNight ?? <Muted />}
          </FieldRow>
          <FieldRow label="COMMON FRUSTRATIONS">
            {persona.pressuresAndFears?.commonFrustrations ?? <Muted />}
          </FieldRow>
          <FieldRow label="FEAR OF FAILURE MODES">
            {persona.pressuresAndFears?.fearOfFailureModes ?? <Muted />}
          </FieldRow>
          <FieldRow label="WHAT MAKES THEM DEFENSIVE">
            {persona.pressuresAndFears?.makesThemDefensive
              ? <p className={styles.warningText}>{persona.pressuresAndFears.makesThemDefensive}</p>
              : <Muted />}
          </FieldRow>
        </div>
      </div>

      {/* §05 — How They Make Decisions */}
      <div className={styles.section}>
        <SectionHeader num="05" title="HOW THEY MAKE DECISIONS" />
        <div className={styles.profileCard}>
          <FieldRow label="DECISION STYLE">
            {persona.decisionMaking?.decisionStyle ?? <Muted />}
          </FieldRow>
        </div>

        <div className={styles.twoColGrid}>
          <div>
            <p className={styles.subSectionLabel}>EVIDENCE THAT PERSUADES</p>
            {persona.decisionMaking?.evidenceThatPersuades && persona.decisionMaking.evidenceThatPersuades.length > 0 ? (
              <ul className={styles.bulletList}>
                {persona.decisionMaking.evidenceThatPersuades.map((e, i) => (
                  <li key={i} className={styles.bulletGreen}>{e}</li>
                ))}
              </ul>
            ) : (
              [0, 1, 2].map(i => (
                <div key={i} className={`${styles.ghostRow} ${styles.ghostCard}`}>
                  <span className={styles.ghostDotGreen} />
                  <span className={styles.ghostText}>Evidence type not yet captured</span>
                </div>
              ))
            )}
          </div>
          <div>
            <p className={styles.subSectionLabel}>EVIDENCE THAT DOESN'T</p>
            {persona.decisionMaking?.evidenceThatDoesnt && persona.decisionMaking.evidenceThatDoesnt.length > 0 ? (
              <ul className={styles.bulletList}>
                {persona.decisionMaking.evidenceThatDoesnt.map((e, i) => (
                  <li key={i} className={styles.bulletGray}>{e}</li>
                ))}
              </ul>
            ) : (
              [0, 1, 2].map(i => (
                <div key={i} className={`${styles.ghostRow} ${styles.ghostCard}`}>
                  <span className={styles.ghostDotGray} />
                  <span className={styles.ghostText}>Counter-evidence not yet captured</span>
                </div>
              ))
            )}
          </div>
        </div>

        <p className={styles.subSectionLabel} style={{ marginTop: 20 }}>INFLUENCE SOURCES TRUSTED</p>
        {persona.decisionMaking?.influenceSourcesTrusted && persona.decisionMaking.influenceSourcesTrusted.length > 0 ? (
          <ul className={styles.neutralList}>
            {persona.decisionMaking.influenceSourcesTrusted.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        ) : (
          [0, 1, 2].map(i => (
            <div key={i} className={`${styles.ghostRow} ${styles.ghostCard}`}>
              <span className={styles.ghostText}>Influence source not yet captured</span>
            </div>
          ))
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP C · WORKING WITH THEM
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP C · WORKING WITH THEM" />

      {/* §06 — Communication Preferences */}
      <div className={styles.section}>
        <SectionHeader num="06" title="COMMUNICATION PREFERENCES" />
        <div className={styles.profileCard}>
          <FieldRow label="PREFERRED CHANNELS">
            {persona.communication?.preferredChannels ?? <Muted />}
          </FieldRow>
          <FieldRow label="TONE THEY RESPOND TO">
            {persona.communication?.toneTheyRespondTo ?? <Muted />}
          </FieldRow>
          <FieldRow label="CADENCE EXPECTATIONS">
            {persona.communication?.cadenceExpectations ?? <Muted />}
          </FieldRow>
          <FieldRow label="MEETING STYLE">
            {persona.communication?.meetingStyle ?? <Muted />}
          </FieldRow>
        </div>
      </div>

      {/* §07 — Pitch Patterns That Work */}
      <div className={styles.section}>
        <SectionHeader num="07" title="PITCH PATTERNS THAT WORK" />

        <p className={styles.subSectionLabel}>OPENING HOOKS</p>
        {persona.pitchPatterns?.openingHooks && persona.pitchPatterns.openingHooks.length > 0 ? (
          <ol className={styles.numberedList}>
            {persona.pitchPatterns.openingHooks.map((h, i) => (
              <li key={i}>
                <span className={styles.numberedDot}>{i + 1}</span>
                {h}
              </li>
            ))}
          </ol>
        ) : (
          [0, 1, 2].map(i => (
            <div key={i} className={`${styles.ghostRow} ${styles.ghostCard}`}>
              <span className={styles.numberedDotGhost}>{i + 1}</span>
              <span className={styles.ghostText}>Opening hook not yet captured</span>
            </div>
          ))
        )}

        <div className={styles.profileCard} style={{ marginTop: 16 }}>
          <FieldRow label="PITCH STRUCTURE">
            {persona.pitchPatterns?.pitchStructure ?? <Muted />}
          </FieldRow>
        </div>

        <div className={styles.twoColGrid} style={{ marginTop: 16 }}>
          <div>
            <p className={styles.subSectionLabel}>MATERIALS THEY WANT TO SEE</p>
            {persona.pitchPatterns?.materialsTheyWantToSee && persona.pitchPatterns.materialsTheyWantToSee.length > 0 ? (
              <ul className={styles.bulletList}>
                {persona.pitchPatterns.materialsTheyWantToSee.map((m, i) => (
                  <li key={i} className={styles.bulletGreen}>{m}</li>
                ))}
              </ul>
            ) : (
              [0, 1, 2].map(i => (
                <div key={i} className={`${styles.ghostRow} ${styles.ghostCard}`}>
                  <span className={styles.ghostText}>Material not yet captured</span>
                </div>
              ))
            )}
          </div>
          <div>
            <p className={styles.subSectionLabel}>ANTI-PATTERNS</p>
            {persona.pitchPatterns?.antiPatterns && persona.pitchPatterns.antiPatterns.length > 0 ? (
              <ul className={styles.antiList}>
                {persona.pitchPatterns.antiPatterns.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            ) : (
              [0, 1, 2].map(i => (
                <div key={i} className={`${styles.ghostRow} ${styles.ghostCard}`}>
                  <span className={styles.ghostDotGray} />
                  <span className={styles.ghostText}>Anti-pattern not yet captured</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* §08 — Common Objections */}
      <div className={styles.section}>
        <SectionHeader num="08" title="COMMON OBJECTIONS (PERSONA-LEVEL)" subtitle="How this persona typically pushes back, and how to respond." />
        {persona.commonObjections && persona.commonObjections.length > 0 ? (
          <div className={styles.objectionList}>
            {persona.commonObjections.map((o, i) => (
              <div key={i} className={styles.objectionCard}>
                <p className={styles.objectionQ}>{o.objection}</p>
                <p className={styles.objectionA}>{o.response}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.objectionList}>
            {[0, 1, 2].map(i => (
              <div key={i} className={`${styles.objectionCard} ${styles.ghostCard}`}>
                <p className={styles.ghostText}>Objection not yet captured</p>
                <p className={styles.ghostText}>Response not yet captured</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP D · THEIR ROLE IN DEALS
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP D · THEIR ROLE IN DEALS" />

      {/* §09 — Their Role in the Buying Process */}
      <div className={styles.section}>
        <SectionHeader num="09" title="THEIR ROLE IN THE BUYING PROCESS" />
        <div className={styles.profileCard}>
          <FieldRow label="TYPICAL INFLUENCE LEVEL">
            {persona.roleInDeals?.typicalInfluenceLevel ? (
              <>
                <span className={`${styles.influencePill} ${styles[`influence--${persona.roleInDeals.typicalInfluenceLevel}`]}`}>
                  {INFLUENCE_LABELS[persona.roleInDeals.typicalInfluenceLevel]}
                </span>
                <span className={styles.pillDesc}>— {INFLUENCE_DESCS[persona.roleInDeals.typicalInfluenceLevel]}</span>
              </>
            ) : <Muted>Not yet classified</Muted>}
          </FieldRow>
          <FieldRow label="WHEN IN CYCLE THEY ENTER">
            {persona.roleInDeals?.whenInCycleTheyEnter ?? <Muted />}
          </FieldRow>
          <FieldRow label="WHAT THEY OWN VS HAND OFF">
            {persona.roleInDeals?.whatTheyOwnVsHandOff ?? <Muted />}
          </FieldRow>
          <FieldRow label="ALLIES AND ADVERSARIES">
            {persona.roleInDeals?.alliesAndAdversaries ?? <Muted />}
          </FieldRow>
        </div>
      </div>

      {/* §10 — ICP Variations */}
      <div className={styles.section}>
        <SectionHeader
          num="10"
          title="ICP VARIATIONS"
          subtitle="How this persona behaves at different ICP types. The same role looks different across company types — these are the specifics."
        />
        {persona.icpVariations && persona.icpVariations.length > 0 ? (
          <div className={styles.variationList}>
            {persona.icpVariations.map((v, i) => {
              const icp = getIcpBySlug(v.icpSlug);
              return (
                <div key={i} className={styles.variationCard}>
                  <div className={styles.variationTop}>
                    {icp ? (
                      <Link
                        href={`/knowledge-base/client-insight/icps/${v.icpSlug}`}
                        className={styles.variationIcpLink}
                      >
                        {icp.name} →
                      </Link>
                    ) : (
                      <span className={styles.variationIcpLink}>{v.icpSlug}</span>
                    )}
                  </div>
                  <p className={styles.variationBehavior}>{v.behaviorAtThisIcp}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.variationList}>
            {[0, 1, 2].map(i => (
              <div key={i} className={`${styles.variationCard} ${styles.ghostCard}`}>
                <p className={styles.ghostText}>ICP not yet linked</p>
                <p className={styles.ghostText}>Persona behavior at this ICP not yet captured</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP E · KNOWLEDGE & REFERENCE
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP E · KNOWLEDGE & REFERENCE" />

      {/* §11 — Relevant Research */}
      <div className={styles.section}>
        <SectionHeader
          num="11"
          title="RELEVANT RESEARCH FROM THE LIBRARY"
          subtitle="Insights tagged with this persona's slug from the Research & Insights library."
        />
        <RelevantResearchSection
          insights={relevantInsights}
          viewAllHref={`/knowledge-base/research?tab=insights&personas=${persona.slug}`}
          emptyMessage={`No research yet tagged with persona slug '${persona.slug}' — tag insights in their applicability field to surface them here.`}
        />
      </div>

      {/* §12 — Reference Index */}
      <div className={styles.section}>
        <SectionHeader num="12" title="REFERENCE INDEX" />
        <div className={styles.profileCard}>
          <FieldRow label="TAG CLUSTERS">
            {persona.referenceIndex?.tagClusters && persona.referenceIndex.tagClusters.length > 0 ? (
              <div className={styles.tagClusterList}>
                {persona.referenceIndex.tagClusters.map((cluster, i) => (
                  <div key={i} className={styles.tagCluster}>
                    <span className={styles.tagClusterName}>{cluster.name}</span>
                    <div className={styles.pillRow}>
                      {cluster.tags.map(t => (
                        <span key={t} className={styles.tagPill}>{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : <Muted>No tags clustered yet</Muted>}
          </FieldRow>
          <FieldRow label="LINKED ENTITIES">
            {persona.referenceIndex?.linkedEntities && persona.referenceIndex.linkedEntities.length > 0 ? (
              <div className={styles.pillRow}>
                {persona.referenceIndex.linkedEntities.map((e, i) => (
                  e.slug
                    ? <Link
                        key={i}
                        href={e.type === 'icp'
                          ? `/knowledge-base/client-insight/icps/${e.slug}`
                          : `/knowledge-base/client-insight/portfolio/${e.slug}`}
                        className={styles.entityPill}
                      >
                        {e.name}
                      </Link>
                    : <span key={i} className={styles.entityPillPlain}>{e.name}</span>
                ))}
              </div>
            ) : <Muted>No linked entities yet</Muted>}
          </FieldRow>
          <FieldRow label="AI-READY NOTE">
            {persona.referenceIndex?.aiNote ?? <Muted>AI summary not yet generated</Muted>}
          </FieldRow>
        </div>
      </div>

    </div>
  );
}
