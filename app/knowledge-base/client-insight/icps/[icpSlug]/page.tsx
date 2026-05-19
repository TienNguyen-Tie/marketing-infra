import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllIcps, getIcpBySlug, getPortfoliosByIcp } from '@/data/icps/helpers';
import { getPersonaBySlug } from '@/data/personas/helpers';
import type { ICPStatus, ICPTier, SocialCommerceMaturity, HypothesisStatus, FitConfidence } from '@/data/icps/types';
import { getInsightsForIcp } from '@/lib/research/helpers';
import RelevantResearchSection from '@/components/research/RelevantResearchSection';
import styles from './icp.module.css';

/* ── Static params ──────────────────────────────────────── */

export async function generateStaticParams() {
  return getAllIcps().map(i => ({ icpSlug: i.slug }));
}

/* ── Label maps ─────────────────────────────────────────── */

const STATUS_LABELS: Record<ICPStatus, string> = {
  validated: 'Validated',
  active: 'Active',
  evaluating: 'Evaluating',
  deprioritized: 'Deprioritized',
};

const TIER_PRIORITY: Record<ICPTier, string> = {
  1: 'highest priority',
  2: 'active pursuit',
  3: 'exploratory',
};

const MATURITY_LABELS: Record<SocialCommerceMaturity, string> = {
  experimenting: 'Experimenting',
  scaling: 'Scaling',
  mature: 'Mature',
  disrupted: 'Disrupted',
};

const HYPOTHESIS_LABELS: Record<HypothesisStatus, string> = {
  testing: 'Testing',
  confirmed: 'Confirmed',
  disproven: 'Disproven',
};

const FIT_LABELS: Record<FitConfidence, string> = {
  high: 'High fit',
  medium: 'Medium fit',
  low: 'Low fit',
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

function StatusPill({ status }: { status: ICPStatus }) {
  return (
    <span className={`${styles.statusPill} ${styles[`status--${status}`]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}

function TierBadge({ tier }: { tier: ICPTier }) {
  return (
    <span className={`${styles.tierBadge} ${styles[`tier--${tier}`]}`}>
      Tier {tier} — {TIER_PRIORITY[tier]}
    </span>
  );
}

/* ── Page ───────────────────────────────────────────────── */

export default async function ICPDetailPage({
  params,
}: {
  params: Promise<{ icpSlug: string }>;
}) {
  const { icpSlug } = await params;
  const icp = getIcpBySlug(icpSlug);
  if (!icp) notFound();

  const mappedPortfolios = getPortfoliosByIcp(icp.slug);
  const relevantInsights = await getInsightsForIcp(icp.slug);

  const citableCount = icp.outcomes?.citableOutcomes?.length ?? 0;

  return (
    <div className={styles.page}>

      {/* ── Breadcrumb ── */}
      <p className={styles.breadcrumb}>
        Knowledge Base ›{' '}
        <Link href="/knowledge-base/client-insight/icps" style={{ color: 'inherit', textDecoration: 'none' }}>
          ICPs
        </Link>{' '}
        › {icp.name}
      </p>

      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <p className={styles.heroEyebrow}>IDEAL CLIENT PROFILE · TIER {icp.tier}</p>
          <h1 className={styles.heroH1}>{icp.name}</h1>
          <p className={styles.heroMeta}>
            {icp.shortCode} · {icp.verticalTags.join(' / ')} · {icp.geography.join(' · ')}
          </p>
        </div>
        <div className={styles.heroRight}>
          <StatusPill status={icp.status} />
          {icp.lastReviewed && (
            <span className={styles.heroReviewed}>
              Reviewed {new Date(icp.lastReviewed).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
          )}
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className={styles.statsStrip}>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{mappedPortfolios.length}</span>
          <span className={styles.statLabel}>Portfolios Mapped</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{citableCount}</span>
          <span className={styles.statLabel}>Citable Outcomes</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{relevantInsights.length}</span>
          <span className={styles.statLabel}>Research Insights</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>Tier {icp.tier}</span>
          <span className={styles.statLabel}>{TIER_PRIORITY[icp.tier]}</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP A · ICP IDENTITY
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP A · ICP IDENTITY" />

      {/* §01 — ICP Profile */}
      <div className={styles.section}>
        <SectionHeader num="01" title="ICP PROFILE" />
        <div className={styles.profileCard}>
          <FieldRow label="IDENTIFIER">{icp.name}</FieldRow>
          <FieldRow label="SHORT CODE">
            <span className={styles.monoCode}>{icp.shortCode}</span>
          </FieldRow>
          <FieldRow label="STATUS"><StatusPill status={icp.status} /></FieldRow>
          <FieldRow label="TIER"><TierBadge tier={icp.tier} /></FieldRow>
          <FieldRow label="VERTICAL TAGS">
            <div className={styles.pillRow}>
              {icp.verticalTags.map(t => <span key={t} className={styles.verticalPill}>{t}</span>)}
            </div>
          </FieldRow>
          <FieldRow label="GEOGRAPHY">
            <div className={styles.pillRow}>
              {icp.geography.map(g => <span key={g} className={styles.geoPill}>{g}</span>)}
            </div>
          </FieldRow>
          <FieldRow label="FIRST DEFINED">
            {icp.firstDefined
              ? new Date(icp.firstDefined).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
              : <Muted />}
          </FieldRow>
          <FieldRow label="LAST REVIEWED">
            {icp.lastReviewed
              ? new Date(icp.lastReviewed).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
              : <Muted />}
          </FieldRow>
        </div>
      </div>

      {/* §02 — Definition Statement */}
      <div className={styles.section}>
        <SectionHeader num="02" title="DEFINITION STATEMENT" subtitle="What makes this ICP distinct — the one sentence that teams can use to qualify or disqualify a prospect in 10 seconds." />
        <div className={styles.definitionBlock}>
          {icp.oneSentenceDefinition
            ? <p className={styles.definitionText}>{icp.oneSentenceDefinition}</p>
            : <p className={styles.fieldMuted}>One-sentence definition not yet captured.</p>
          }
        </div>

        <div className={styles.criteriaGrid}>
          <div>
            <p className={styles.criteriaHeading}>INCLUSION CRITERIA</p>
            {icp.inclusionCriteria && icp.inclusionCriteria.length > 0 ? (
              <ul className={styles.criteriaList}>
                {icp.inclusionCriteria.map((c, i) => (
                  <li key={i} className={styles.criteriaItemIn}>{c}</li>
                ))}
              </ul>
            ) : (
              [0, 1, 2].map(i => (
                <div key={i} className={`${styles.criteriaGhost} ${styles.ghostCard}`}>
                  <span className={styles.ghostDotRed} />
                  <span className={styles.ghostText}>Inclusion criterion not yet captured</span>
                </div>
              ))
            )}
          </div>
          <div>
            <p className={styles.criteriaHeading}>EXCLUSION CRITERIA</p>
            {icp.exclusionCriteria && icp.exclusionCriteria.length > 0 ? (
              <ul className={styles.criteriaList}>
                {icp.exclusionCriteria.map((c, i) => (
                  <li key={i} className={styles.criteriaItemEx}>{c}</li>
                ))}
              </ul>
            ) : (
              [0, 1, 2].map(i => (
                <div key={i} className={`${styles.criteriaGhost} ${styles.ghostCard}`}>
                  <span className={styles.ghostDotGray} />
                  <span className={styles.ghostText}>Exclusion criterion not yet captured</span>
                </div>
              ))
            )}
          </div>
        </div>

        {icp.edgeCases && (
          <div className={styles.edgeCasesBlock}>
            <p className={styles.edgeCasesLabel}>EDGE CASES</p>
            <p className={styles.edgeCasesText}>{icp.edgeCases}</p>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP B · WHO THEY ARE
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP B · WHO THEY ARE" />

      {/* §03 — Company Profile */}
      <div className={styles.section}>
        <SectionHeader num="03" title="COMPANY PROFILE" />
        <div className={styles.profileCard}>
          <FieldRow label="TYPICAL SIZE">
            {icp.companyProfile?.typicalSize ?? <Muted />}
          </FieldRow>
          <FieldRow label="ORG STRUCTURE">
            {icp.companyProfile?.orgStructure ?? <Muted />}
          </FieldRow>
          <FieldRow label="OPERATING MARKETS">
            {icp.companyProfile?.operatingMarkets ?? <Muted />}
          </FieldRow>
          <FieldRow label="SOCIAL COMMERCE MATURITY">
            {icp.companyProfile?.socialCommerceMaturity
              ? <span className={`${styles.maturityPill} ${styles[`maturity--${icp.companyProfile.socialCommerceMaturity}`]}`}>
                  {MATURITY_LABELS[icp.companyProfile.socialCommerceMaturity]}
                </span>
              : <Muted>Not yet classified</Muted>
            }
          </FieldRow>
          <FieldRow label="EXISTING VENDOR FOOTPRINT">
            {icp.companyProfile?.existingVendorFootprint ?? <Muted />}
          </FieldRow>
          <FieldRow label="TECH STACK HINTS">
            {icp.companyProfile?.techStackHints ?? <Muted />}
          </FieldRow>
        </div>
      </div>

      {/* §04 — Business Pressures */}
      <div className={styles.section}>
        <SectionHeader num="04" title="BUSINESS PRESSURES" subtitle="What keeps this ICP up at night — and how it shapes what they buy." />
        <div className={styles.profileCard}>
          <FieldRow label="STRATEGIC PRESSURES">
            {icp.businessPressures?.strategic ?? <Muted />}
          </FieldRow>
          <FieldRow label="OPERATIONAL PRESSURES">
            {icp.businessPressures?.operational ?? <Muted />}
          </FieldRow>
          <FieldRow label="MARKET PRESSURES">
            {icp.businessPressures?.market ?? <Muted />}
          </FieldRow>
          <FieldRow label="DISTINCTIVE TO THIS ICP">
            {icp.businessPressures?.distinctive
              ? <p className={styles.distinctiveText}>{icp.businessPressures.distinctive}</p>
              : <Muted />}
          </FieldRow>
        </div>
      </div>

      {/* §05 — Buyers & Decision Process */}
      <div className={styles.section}>
        <SectionHeader num="05" title="BUYERS & DECISION PROCESS" />
        <div className={styles.profileCard}>
          <FieldRow label="PRIMARY DECISION-MAKER">
            {(() => {
              const primarySlug = icp.decisionProcess?.primaryPersonaSlug;
              const primaryLabel = icp.decisionProcess?.primaryPersonaLabel;
              const primaryPersona = primarySlug ? getPersonaBySlug(primarySlug) : undefined;
              if (primaryPersona) {
                return (
                  <div>
                    <Link
                      href={`/knowledge-base/client-insight/personas/${primaryPersona.slug}`}
                      className={styles.personaLink}
                    >
                      {primaryPersona.name} →
                    </Link>
                    {primaryPersona.snapshot?.oneSentenceDefinition && (
                      <p className={styles.personaExcerpt}>{primaryPersona.snapshot.oneSentenceDefinition}</p>
                    )}
                  </div>
                );
              }
              if (primaryLabel) {
                return (
                  <div>
                    <span className={styles.personaChip}>{primaryLabel}</span>
                    <p className={styles.personaLinkCta}>Link to a persona by setting primaryPersonaSlug in ICP data</p>
                  </div>
                );
              }
              return <Muted />;
            })()}
          </FieldRow>
          <FieldRow label="INFLUENCERS IN PROCESS">
            {icp.decisionProcess?.influencerPersonas && icp.decisionProcess.influencerPersonas.length > 0 ? (
              <div className={styles.influencerList}>
                {icp.decisionProcess.influencerPersonas.map((p, i) => {
                  const linkedPersona = p.slug ? getPersonaBySlug(p.slug) : undefined;
                  return (
                    <div key={i} className={styles.influencerRow}>
                      {linkedPersona ? (
                        <Link
                          href={`/knowledge-base/client-insight/personas/${linkedPersona.slug}`}
                          className={styles.influencerNameLink}
                        >
                          {p.name}
                        </Link>
                      ) : (
                        <span className={styles.influencerName}>{p.name}</span>
                      )}
                      <span className={styles.influencerRole}>{p.role}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              [0, 1, 2].map(i => (
                <div key={i} className={`${styles.influencerRow} ${styles.ghostCard}`}>
                  <span className={styles.ghostText}>Persona name not yet captured</span>
                  <span className={styles.ghostText}>Role not yet captured</span>
                </div>
              ))
            )}
          </FieldRow>
          <FieldRow label="DECISION TIMELINE">
            {icp.decisionProcess?.decisionTimeline ?? <Muted />}
          </FieldRow>
          <FieldRow label="DECISION STYLE">
            {icp.decisionProcess?.decisionStyle ?? <Muted />}
          </FieldRow>
          <FieldRow label="APPROVAL GATES">
            {icp.decisionProcess?.approvalGates && icp.decisionProcess.approvalGates.length > 0 ? (
              <ul className={styles.bulletList}>
                {icp.decisionProcess.approvalGates.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
            ) : (
              [0, 1, 2].map(i => (
                <div key={i} className={`${styles.ghostRow} ${styles.ghostCard}`}>
                  <span className={styles.ghostText}>Approval gate not yet captured</span>
                </div>
              ))
            )}
          </FieldRow>
          <FieldRow label="BUDGET CYCLE">
            {icp.decisionProcess?.budgetCycle ?? <Muted />}
          </FieldRow>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP C · HOW WE WIN THEM
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP C · HOW WE WIN THEM" />

      {/* §06 — Why This ICP Fits Ecomobi */}
      <div className={styles.section}>
        <SectionHeader num="06" title="WHY THIS ICP FITS ECOMOBI" />
        <div className={styles.profileCard}>
          <FieldRow label="ECOMOBI STRENGTHS ALIGNED">
            {icp.whyFits?.strengthsAligned ?? <Muted />}
          </FieldRow>
          <FieldRow label="WHY WE BEAT ALTERNATIVES">
            {icp.whyFits?.whyBeatAlternatives ?? <Muted />}
          </FieldRow>
          <FieldRow label="MARGIN & ECONOMICS">
            {icp.whyFits?.marginEconomics ?? <Muted />}
          </FieldRow>
          <FieldRow label="LIFETIME VALUE POTENTIAL">
            {icp.whyFits?.lifetimeValue ?? <Muted />}
          </FieldRow>
        </div>
      </div>

      {/* §07 — Pitch Solution */}
      <div className={styles.section}>
        <SectionHeader num="07" title="PITCH SOLUTION" subtitle="How we show up in sales — format, stakeholders, objection handling." />
        <div className={styles.profileCard}>
          <FieldRow label="PITCH-PHASE SOLUTION">
            {icp.pitchSolution?.pitchPhaseSolution ?? <Muted />}
          </FieldRow>
          <FieldRow label="PITCH FORMAT">
            {icp.pitchSolution?.pitchFormat ?? <Muted />}
          </FieldRow>
          <FieldRow label="REQUIRED STAKEHOLDERS">
            {icp.pitchSolution?.requiredStakeholders && icp.pitchSolution.requiredStakeholders.length > 0 ? (
              <ul className={styles.bulletList}>
                {icp.pitchSolution.requiredStakeholders.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            ) : (
              [0, 1, 2].map(i => (
                <div key={i} className={`${styles.ghostRow} ${styles.ghostCard}`}>
                  <span className={styles.ghostText}>Stakeholder not yet captured</span>
                </div>
              ))
            )}
          </FieldRow>
        </div>

        <p className={styles.subSectionLabel}>COMMON OBJECTIONS</p>
        {icp.pitchSolution?.commonObjections && icp.pitchSolution.commonObjections.length > 0 ? (
          <div className={styles.objectionList}>
            {icp.pitchSolution.commonObjections.map((o, i) => (
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

        <div className={styles.pitchTwoCol}>
          <div>
            <p className={styles.subSectionLabel}>DIFFERENTIATORS TO LEAD WITH</p>
            {icp.pitchSolution?.differentiatorsToLeadWith && icp.pitchSolution.differentiatorsToLeadWith.length > 0 ? (
              <ol className={styles.numberedList}>
                {icp.pitchSolution.differentiatorsToLeadWith.map((d, i) => (
                  <li key={i}><span className={styles.numberedDot}>{i + 1}</span>{d}</li>
                ))}
              </ol>
            ) : (
              [0, 1, 2].map(i => (
                <div key={i} className={`${styles.ghostRow} ${styles.ghostCard}`}>
                  <span className={styles.ghostDotRed} />
                  <span className={styles.ghostText}>Differentiator not yet captured</span>
                </div>
              ))
            )}
          </div>
          <div>
            <p className={styles.subSectionLabel}>ANTI-PATTERNS</p>
            {icp.pitchSolution?.antiPatterns && icp.pitchSolution.antiPatterns.length > 0 ? (
              <ul className={styles.antiPatternList}>
                {icp.pitchSolution.antiPatterns.map((a, i) => (
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

      {/* §08 — Service Mix */}
      <div className={styles.section}>
        <SectionHeader num="08" title="SERVICE MIX" subtitle="Which services we typically deploy for this ICP and in what order." />
        <div className={styles.profileCard}>
          <FieldRow label="HERO SERVICES">
            {icp.serviceMix?.heroServices && icp.serviceMix.heroServices.length > 0 ? (
              <div className={styles.pillRow}>
                {icp.serviceMix.heroServices.map(p => (
                  <span key={p} className={styles.servicePillHero}>{p}</span>
                ))}
              </div>
            ) : <Muted />}
          </FieldRow>
          <FieldRow label="COMMON ADD-ONS">
            {icp.serviceMix?.commonAddOns && icp.serviceMix.commonAddOns.length > 0 ? (
              <div className={styles.pillRow}>
                {icp.serviceMix.commonAddOns.map(p => (
                  <span key={p} className={styles.servicePillAddon}>{p}</span>
                ))}
              </div>
            ) : <Muted />}
          </FieldRow>
          <FieldRow label="RARELY SOLD">
            {icp.serviceMix?.rarelySold && icp.serviceMix.rarelySold.length > 0 ? (
              <div className={styles.rarelySoldList}>
                {icp.serviceMix.rarelySold.map((r, i) => (
                  <div key={i} className={styles.rarelySoldRow}>
                    <span className={styles.servicePillGray}>{r.pCode}</span>
                    <span className={styles.rarelySoldReason}>{r.whyNot}</span>
                  </div>
                ))}
              </div>
            ) : (
              [0, 1].map(i => (
                <div key={i} className={`${styles.rarelySoldRow} ${styles.ghostCard}`}>
                  <span className={styles.ghostText}>Service</span>
                  <span className={styles.ghostText}>Reason not yet captured</span>
                </div>
              ))
            )}
          </FieldRow>
          <FieldRow label="TYPICAL SEQUENCING">
            {icp.serviceMix?.typicalSequencing ?? <Muted />}
          </FieldRow>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP D · EVIDENCE
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP D · EVIDENCE" />

      {/* §09 — Portfolios Mapped */}
      <div className={styles.section}>
        <SectionHeader
          num="09"
          title="PORTFOLIOS MAPPED TO THIS ICP"
          subtitle="Computed dynamically — to add a portfolio, set its icpSlug field."
        />
        {mappedPortfolios.length > 0 ? (
          <div className={styles.portfolioGrid}>
            {mappedPortfolios.map(p => (
              <Link key={p.slug} href={`/knowledge-base/client-insight/portfolio/${p.slug}`} className={styles.portfolioCard}>
                <div className={styles.portfolioCardTop}>
                  <span className={styles.portfolioInitials}>{p.initials}</span>
                  <div>
                    <p className={styles.portfolioName}>{p.name}</p>
                    <p className={styles.portfolioMeta}>{p.parentCompany} · {p.sizeTierLabel}</p>
                  </div>
                </div>
                {p.totalGmvLabel && (
                  <p className={styles.portfolioGmv}>{p.totalGmvLabel}</p>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.portfolioGrid}>
            {[0, 1, 2].map(i => (
              <div key={i} className={`${styles.portfolioCard} ${styles.ghostCard}`}>
                <div className={styles.portfolioCardTop}>
                  <span className={`${styles.portfolioInitials} ${styles.ghostAvatar}`} />
                  <div>
                    <p className={styles.ghostText}>Portfolio not yet mapped</p>
                    <p className={styles.ghostText}>Set icpSlug on portfolio data</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <Link href="/knowledge-base/client-insight/portfolio" className={styles.viewAllLink}>
          View all in Client Portfolio →
        </Link>
      </div>

      {/* §10 — Outcomes & Proof */}
      <div className={styles.section}>
        <SectionHeader num="10" title="OUTCOMES & PROOF" />

        <p className={styles.subSectionLabel}>HEADLINE METRICS</p>
        {icp.outcomes?.metrics && icp.outcomes.metrics.length > 0 ? (
          <div className={styles.metricsGrid}>
            {icp.outcomes.metrics.map((m, i) => (
              <div key={i} className={styles.metricCard}>
                <span className={styles.metricValue}>{m.value}</span>
                <span className={styles.metricLabel}>{m.label}</span>
                {m.source && <span className={styles.metricSource}>{m.source}</span>}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.metricsGrid}>
            {[0, 1, 2].map(i => (
              <div key={i} className={`${styles.metricCard} ${styles.ghostCard}`}>
                <span className={`${styles.metricValue} ${styles.ghostText}`}>—</span>
                <span className={styles.ghostText}>Metric label not yet captured</span>
              </div>
            ))}
          </div>
        )}

        <p className={styles.subSectionLabel} style={{ marginTop: 24 }}>CITABLE OUTCOMES</p>
        {icp.outcomes?.citableOutcomes && icp.outcomes.citableOutcomes.length > 0 ? (
          <div className={styles.citableList}>
            {icp.outcomes.citableOutcomes.map((o, i) => (
              <div key={i} className={styles.citableCard}>
                <p className={styles.citableHeadline}>{o.headline}</p>
                <p className={styles.citableDesc}>{o.description}</p>
                {o.portfolioSlug && (
                  <Link href={`/knowledge-base/client-insight/portfolio/${o.portfolioSlug}`} className={styles.citableLink}>
                    View portfolio →
                  </Link>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.citableList}>
            {[0, 1, 2].map(i => (
              <div key={i} className={`${styles.citableCard} ${styles.ghostCard}`}>
                <p className={styles.ghostText}>Outcome headline not yet captured</p>
                <p className={styles.ghostText}>Description not yet captured</p>
              </div>
            ))}
          </div>
        )}

        {icp.outcomes?.narrative && (
          <div className={styles.narrativeBlock}>
            <p className={styles.narrativeLabel}>NARRATIVE</p>
            <p className={styles.narrativeText}>{icp.outcomes.narrative}</p>
          </div>
        )}
      </div>

      {/* §11 — Story Capital */}
      <div className={styles.section}>
        <SectionHeader num="11" title="STORY CAPITAL" subtitle="Wins, learning cases, and quotable material for the pitch room." />

        <p className={styles.subSectionLabel}>DEFINING WINS</p>
        {icp.storyCapital?.definingWins && icp.storyCapital.definingWins.length > 0 ? (
          <div className={styles.timeline}>
            {icp.storyCapital.definingWins.map((w, i) => (
              <div key={i} className={styles.timelineRow}>
                <div className={styles.timelineDotRed} />
                <div className={styles.timelineContent}>
                  {w.date && <span className={styles.timelineDate}>{w.date}</span>}
                  <p className={styles.timelineLabel}>{w.label}</p>
                  {w.description && <p className={styles.timelineDesc}>{w.description}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.timeline}>
            {[0, 1, 2].map(i => (
              <div key={i} className={`${styles.timelineRow} ${styles.ghostCard}`}>
                <div className={`${styles.timelineDotRed} ${styles.ghostDot}`} />
                <div className={styles.timelineContent}>
                  <span className={styles.ghostText}>Win not yet captured</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className={styles.subSectionLabel} style={{ marginTop: 24 }}>LEARNING CASES</p>
        {icp.storyCapital?.learningCases && icp.storyCapital.learningCases.length > 0 ? (
          <div className={styles.timeline}>
            {icp.storyCapital.learningCases.map((l, i) => (
              <div key={i} className={styles.timelineRow}>
                <div className={styles.timelineDotAmber} />
                <div className={styles.timelineContent}>
                  {l.date && <span className={styles.timelineDate}>{l.date}</span>}
                  <p className={styles.timelineLabel}>{l.label}</p>
                  {l.description && <p className={styles.timelineDesc}>{l.description}</p>}
                  <div className={styles.takeawayBlock}>
                    <span className={styles.takeawayLabel}>Takeaway</span>
                    <p className={styles.takeawayText}>{l.takeaway}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.timeline}>
            {[0, 1].map(i => (
              <div key={i} className={`${styles.timelineRow} ${styles.ghostCard}`}>
                <div className={`${styles.timelineDotAmber} ${styles.ghostDot}`} />
                <div className={styles.timelineContent}>
                  <span className={styles.ghostText}>Learning case not yet captured</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className={styles.subSectionLabel} style={{ marginTop: 24 }}>QUOTABLE MATERIAL</p>
        {icp.storyCapital?.quotableMaterial && icp.storyCapital.quotableMaterial.length > 0 ? (
          <div className={styles.quoteList}>
            {icp.storyCapital.quotableMaterial.map((q, i) => (
              <div key={i} className={styles.quoteCard}>
                <p className={styles.quoteText}>"{q.quote}"</p>
                <p className={styles.quoteAttribution}>— {q.attribution}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.quoteList}>
            {[0, 1].map(i => (
              <div key={i} className={`${styles.quoteCard} ${styles.ghostCard}`}>
                <p className={styles.ghostText}>Quote not yet captured</p>
                <p className={styles.ghostText}>Attribution not yet captured</p>
              </div>
            ))}
          </div>
        )}

        {icp.storyCapital?.uniqueAngles && (
          <div className={styles.profileCard} style={{ marginTop: 16 }}>
            <FieldRow label="UNIQUE ANGLES">{icp.storyCapital.uniqueAngles}</FieldRow>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP E · HOW WE FIND THEM
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP E · HOW WE FIND THEM" />

      {/* §12 — Sourcing & Targeting */}
      <div className={styles.section}>
        <SectionHeader num="12" title="SOURCING & TARGETING" />
        <div className={styles.profileCard}>
          <FieldRow label="WHERE THEY CLUSTER">
            {icp.sourcing?.whereTheyCluster && icp.sourcing.whereTheyCluster.length > 0 ? (
              <div className={styles.pillRow}>
                {icp.sourcing.whereTheyCluster.map((c, i) => (
                  <span key={i} className={styles.clusterPill}>{c}</span>
                ))}
              </div>
            ) : <Muted />}
          </FieldRow>
          <FieldRow label="SOURCING CHANNELS">
            {icp.sourcing?.sourcingChannels && icp.sourcing.sourcingChannels.length > 0 ? (
              <ul className={styles.bulletList}>
                {icp.sourcing.sourcingChannels.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            ) : <Muted />}
          </FieldRow>
          <FieldRow label="TRIGGER EVENTS">
            {icp.sourcing?.triggerEvents && icp.sourcing.triggerEvents.length > 0 ? (
              <ul className={styles.bulletList}>
                {icp.sourcing.triggerEvents.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            ) : <Muted />}
          </FieldRow>
        </div>

        <p className={styles.subSectionLabel} style={{ marginTop: 20 }}>WATCH LIST</p>
        {icp.sourcing?.watchList && icp.sourcing.watchList.length > 0 ? (
          <div className={styles.watchList}>
            {icp.sourcing.watchList.map((w, i) => (
              <div key={i} className={styles.watchCard}>
                <div className={styles.watchCardTop}>
                  <span className={styles.watchCompany}>{w.companyName}</span>
                  <span className={`${styles.fitPill} ${styles[`fit--${w.fitConfidence}`]}`}>
                    {FIT_LABELS[w.fitConfidence]}
                  </span>
                </div>
                {w.nextAction && <p className={styles.watchAction}>{w.nextAction}</p>}
                <div className={styles.watchMeta}>
                  {w.lastTouchpoint && <span>Last: {w.lastTouchpoint}</span>}
                  {w.owner && <span>Owner: {w.owner}</span>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.watchList}>
            {[0, 1, 2].map(i => (
              <div key={i} className={`${styles.watchCard} ${styles.ghostCard}`}>
                <p className={styles.ghostText}>Company not yet added to watch list</p>
              </div>
            ))}
          </div>
        )}

        {icp.sourcing?.antiTargets && icp.sourcing.antiTargets.length > 0 && (
          <>
            <p className={styles.subSectionLabel} style={{ marginTop: 20 }}>ANTI-TARGETS</p>
            <div className={styles.antiTargetList}>
              {icp.sourcing.antiTargets.map((a, i) => (
                <div key={i} className={styles.antiTargetRow}>
                  <span className={styles.antiTargetName}>{a.companyName}</span>
                  <span className={styles.antiTargetReason}>{a.whyNot}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* §13 — Outreach Patterns */}
      <div className={styles.section}>
        <SectionHeader num="13" title="OUTREACH PATTERNS" />
        <div className={styles.profileCard}>
          <FieldRow label="EFFECTIVE OUTREACH ANGLES">
            {icp.outreach?.effectiveAngles && icp.outreach.effectiveAngles.length > 0 ? (
              <ul className={styles.bulletList}>
                {icp.outreach.effectiveAngles.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            ) : <Muted />}
          </FieldRow>
          <FieldRow label="CHANNEL PREFERENCES">
            {icp.outreach?.channelPreferences ?? <Muted />}
          </FieldRow>
          <FieldRow label="TIMING">
            {icp.outreach?.timing ?? <Muted />}
          </FieldRow>
          <FieldRow label="FAILED PATTERNS">
            {icp.outreach?.failedPatterns && icp.outreach.failedPatterns.length > 0 ? (
              <ul className={styles.antiPatternList}>
                {icp.outreach.failedPatterns.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            ) : <Muted />}
          </FieldRow>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP F · KNOWLEDGE LAYER
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP F · KNOWLEDGE LAYER" />

      {/* §14 — Relevant Research */}
      <div className={styles.section}>
        <SectionHeader num="14" title="RELEVANT RESEARCH FROM THE LIBRARY" subtitle="Insights tagged with this ICP's slug from the Research & Insights library." />
        <RelevantResearchSection
          insights={relevantInsights}
          viewAllHref={`/knowledge-base/research?tab=insights&icps=${icp.slug}`}
          emptyMessage={`No research yet applies to ${icp.name}`}
        />
      </div>

      {/* §15 — Internal Notes & Hypotheses */}
      <div className={styles.section}>
        <SectionHeader num="15" title="INTERNAL NOTES & HYPOTHESES" />

        <p className={styles.subSectionLabel}>WORKING HYPOTHESES</p>
        {icp.notes?.workingHypotheses && icp.notes.workingHypotheses.length > 0 ? (
          <div className={styles.hypothesisList}>
            {icp.notes.workingHypotheses.map((h, i) => (
              <div key={i} className={styles.hypothesisCard}>
                <div className={styles.hypothesisTop}>
                  <p className={styles.hypothesisStatement}>{h.statement}</p>
                  <span className={`${styles.hypothesisPill} ${styles[`hypothesis--${h.status}`]}`}>
                    {HYPOTHESIS_LABELS[h.status]}
                  </span>
                </div>
                {h.date && <p className={styles.hypothesisDate}>{h.date}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.hypothesisList}>
            {[0, 1, 2].map(i => (
              <div key={i} className={`${styles.hypothesisCard} ${styles.ghostCard}`}>
                <p className={styles.ghostText}>Hypothesis not yet captured</p>
              </div>
            ))}
          </div>
        )}

        <p className={styles.subSectionLabel} style={{ marginTop: 20 }}>OPEN QUESTIONS</p>
        {icp.notes?.openQuestions && icp.notes.openQuestions.length > 0 ? (
          <ul className={styles.openQuestionList}>
            {icp.notes.openQuestions.map((q, i) => (
              <li key={i} className={styles.openQuestionItem}>
                <span className={styles.questionMark}>?</span>
                {q}
              </li>
            ))}
          </ul>
        ) : (
          [0, 1, 2].map(i => (
            <div key={i} className={`${styles.ghostRow} ${styles.ghostCard}`}>
              <span className={styles.ghostText}>Open question not yet captured</span>
            </div>
          ))
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP G · ARCHIVE & REFERENCE
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP G · ARCHIVE & REFERENCE" />

      {/* §16 — Reference Index */}
      <div className={styles.section}>
        <SectionHeader num="16" title="REFERENCE INDEX" />
        <div className={styles.profileCard}>
          <FieldRow label="TAG CLUSTERS">
            {icp.referenceIndex?.tagClusters && icp.referenceIndex.tagClusters.length > 0 ? (
              <div className={styles.tagClusterList}>
                {icp.referenceIndex.tagClusters.map((cluster, i) => (
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
            {icp.referenceIndex?.linkedEntities && icp.referenceIndex.linkedEntities.length > 0 ? (
              <div className={styles.pillRow}>
                {icp.referenceIndex.linkedEntities.map((e, i) => (
                  e.slug
                    ? <Link key={i} href={`/knowledge-base/client-insight/portfolio/${e.slug}`} className={styles.entityPill}>
                        {e.name}
                      </Link>
                    : <span key={i} className={styles.entityPillPlain}>{e.name}</span>
                ))}
              </div>
            ) : <Muted>No linked entities yet</Muted>}
          </FieldRow>
          <FieldRow label="AI-READY NOTE">
            {icp.referenceIndex?.aiNote ?? <Muted>AI summary not yet generated</Muted>}
          </FieldRow>
        </div>
      </div>

    </div>
  );
}
