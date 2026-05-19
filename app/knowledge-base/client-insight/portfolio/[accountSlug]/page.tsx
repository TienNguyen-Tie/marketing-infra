import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PORTFOLIO_ACCOUNTS } from '@/data/portfolio/accounts';
import {
  getAccountBySlug,
  getProjectsByBrand,
  getAccountSummaryStats,
  getSiblingPortfolios,
  getDisplayName,
  getFullDisplayName,
  getBrandSlug,
} from '@/data/portfolio/helpers';
import { getIcpBySlug } from '@/data/icps/helpers';
import {
  SERVICE_NAMES,
  CATEGORY_LABELS,
  MARKET_POSITION_LABELS,
  COPROMO_TYPE_LABELS,
} from '@/data/portfolio/types';
import type { MarketPosition, CoPromoType } from '@/data/portfolio/types';
import { getInsightsForPortfolio } from '@/lib/research/helpers';
import RelevantResearchSection from '@/components/research/RelevantResearchSection';
import styles from '../../portfolio.module.css';

export async function generateStaticParams() {
  return PORTFOLIO_ACCOUNTS.map(a => ({ accountSlug: a.slug }));
}

const MARKET_POS_CLASS: Record<MarketPosition, string> = {
  leader: styles.mktPosLeader,
  challenger: styles.mktPosChallenger,
  niche: styles.mktPosNiche,
  emerging: styles.mktPosEmerging,
};

const COPROMO_CLASS: Record<CoPromoType, string> = {
  event: styles.cpEvent,
  platform: styles.cpPlatform,
  'co-content': styles.cpCoContent,
  'industry-presence': styles.cpIndustry,
};

const COPROMO_ICON: Record<CoPromoType, string> = {
  event: 'event',
  platform: 'rocket_launch',
  'co-content': 'edit_note',
  'industry-presence': 'emoji_events',
};

function contactInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : parts[0].slice(0, 2).toUpperCase();
}

function creatorInitials(name: string): string {
  return name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

/* ── Empty states ─────────────────────────────────────────────── */

function FieldEmpty() {
  return <span className={styles.fieldEmpty}>Not yet captured</span>;
}

function FieldMuted() {
  return <span className={styles.fieldMuted}>Not yet captured</span>;
}

/* ── Group divider ────────────────────────────────────────────── */

function GroupDivider({ label }: { label: string }) {
  return (
    <div className={styles.groupDivider}>
      <span className={styles.groupEyebrow}>{label}</span>
      <span className={styles.groupDividerLine} />
    </div>
  );
}

/* ── Section header ───────────────────────────────────────────── */

function SectionHeader({ num, title, subtitle }: { num: string; title: string; subtitle?: string }) {
  return (
    <div className={styles.dossSectionHeader}>
      <span className={styles.dossSectionNum}>{num}</span>
      <div className={styles.dossSectionTitles}>
        <span className={styles.dossSectionTitle}>{title}</span>
        {subtitle && <span className={styles.dossSectionSubtitle}>{subtitle}</span>}
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────── */

export default async function AccountPage({
  params,
}: {
  params: Promise<{ accountSlug: string }>;
}) {
  const { accountSlug } = await params;
  const account = getAccountBySlug(accountSlug);
  if (!account) notFound();

  const stats = getAccountSummaryStats(account);
  const projectsByBrand = getProjectsByBrand(account);
  const siblings = getSiblingPortfolios(account);
  const displayName = getDisplayName(account);
  const fullDisplayName = getFullDisplayName(account);
  const relevantInsights = await getInsightsForPortfolio(accountSlug);
  const icp = account.icpSlug ? getIcpBySlug(account.icpSlug) : undefined;

  return (
    <div className={styles.dossPage}>

      {/* ── Breadcrumb ── */}
      <p className={styles.breadcrumb}>
        Knowledge Base ›{' '}
        <Link href="/knowledge-base/client-insight/portfolio" style={{ color: 'inherit', textDecoration: 'none' }}>
          Client Portfolio
        </Link>{' '}
        › {fullDisplayName}
      </p>

      {/* ── Hero ── */}
      <div className={styles.dossHero}>
        <div className={styles.dossHeroLeft}>
          <p className={styles.dossHeroEyebrow}>
            PORTFOLIO · {account.parentCompany}
            {!account.isGeneralCategory && ` · ${account.categoryName}`}
          </p>
          <h1 className={styles.dossHeroH1}>{displayName}</h1>
          <p className={styles.dossHeroMeta}>
            {account.industry} · {account.market} · {account.sizeTierLabel} · Since {account.engagedSince}
          </p>
        </div>
        <div className={styles.dossHeroRight}>
          <span className={styles.dossCatBadge}>{account.isGeneralCategory ? CATEGORY_LABELS[account.category] : account.categoryName}</span>
          <span className={styles.dossLockBadge}>
            <span className={`material-icons-round ${styles.dossLockBadgeIcon}`}>lock</span>
            {account.version}
          </span>
        </div>
      </div>

      {/* ── Sibling portfolios ── */}
      {siblings.length > 0 && (
        <div className={styles.siblingStrip}>
          <span className={styles.siblingSLabel}>Other {account.parentCompany} portfolios</span>
          {siblings.map(s => (
            <Link key={s.slug} href={`/knowledge-base/client-insight/portfolio/${s.slug}`} className={styles.siblingChip}>
              {getDisplayName(s)}
              <span className={`material-icons-round ${styles.siblingChipArrow}`}>arrow_forward</span>
            </Link>
          ))}
        </div>
      )}

      {/* ── Stats strip ── */}
      <div className={styles.dossStats}>
        <div className={styles.dossStatItem}>
          <span className={styles.dossStatNum}>{stats.brandCount}</span>
          <span className={styles.dossStatLabel}>Brands</span>
        </div>
        <div className={styles.dossStatItem}>
          <span className={styles.dossStatNum}>{stats.totalProjects}</span>
          <span className={styles.dossStatLabel}>Projects</span>
        </div>
        <div className={styles.dossStatItem}>
          <span className={styles.dossStatNum}>{stats.fullCases}</span>
          <span className={styles.dossStatLabel}>Full Cases</span>
        </div>
        <div className={styles.dossStatItem}>
          <span className={styles.dossStatNum}>{stats.adhocCount}</span>
          <span className={styles.dossStatLabel}>Adhoc Logs</span>
        </div>
        {account.totalGmvLabel && (
          <div className={styles.dossStatItem}>
            <span className={styles.dossStatNum}>{account.totalGmvLabel}</span>
            <span className={styles.dossStatLabel}>GMV / Result</span>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP A · PORTFOLIO IDENTITY
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP A · PORTFOLIO IDENTITY" />

      {/* §01 · Portfolio Profile — Pattern A (always-visible grid) */}
      <div className={styles.dossSection}>
        <SectionHeader num="01" title="PORTFOLIO PROFILE" />
        <div className={styles.profileGrid}>
          {[
            ['PARENT', account.parentCompany],
            ['CATEGORY', account.isGeneralCategory ? 'General — single-brand portfolio' : account.categoryName],
            ['INDUSTRY', account.industry],
            ['MARKET', account.market],
            ['SIZE TIER', account.sizeTierLabel],
            ['ENGAGED SINCE', account.engagedSince],
            ['PRIMARY BU', account.primaryBU.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())],
            ['ICP', account.icpLabel],
          ].map(([label, val]) => (
            <div key={label} className={styles.profileRow}>
              <span className={styles.profileLabel}>{label}</span>
              <span className={styles.profileValue}>{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* §02 · Brand Portfolio — Pattern A (always-visible cards) */}
      <div className={styles.dossSection}>
        <SectionHeader
          num="02"
          title="BRAND PORTFOLIO"
          subtitle={`Brands within this ${account.isGeneralCategory ? 'portfolio' : account.categoryName + ' portfolio'} — positioning, target consumer, and engagement status per brand.`}
        />
        <div className={styles.brandPortfolioGrid}>
          {account.brands.map(brand => {
            const bProjects = projectsByBrand[brand.id] ?? [];
            const bFull = bProjects.filter(p => p.type === 'full-case').length;
            return (
              <div key={brand.id} className={styles.brandPortfolioCard}>
                <div className={styles.bpcHead}>
                  <span className={styles.bpcName}>{brand.name}</span>
                  <span className={`${styles.bpcStatusPill} ${styles[`bpcStatus--${brand.status}`]}`}>
                    {brand.status}
                  </span>
                </div>
                {brand.subCategory ? (
                  <p className={styles.bpcSub}>{brand.subCategory}</p>
                ) : null}
                <div className={styles.bpcRows}>
                  <div className={styles.bpcRow}>
                    <span className={styles.bpcRowLabel}>TARGET CONSUMER</span>
                    <span className={styles.bpcRowVal}>{brand.targetConsumer ?? <FieldEmpty />}</span>
                  </div>
                  <div className={styles.bpcRow}>
                    <span className={styles.bpcRowLabel}>BRAND CONTACT</span>
                    <span className={styles.bpcRowVal}>{brand.brandManager ?? <FieldEmpty />}</span>
                  </div>
                  <div className={styles.bpcRow}>
                    <span className={styles.bpcRowLabel}>PITCH SOLUTION</span>
                    <span className={styles.bpcRowVal}>{brand.pitchSolution ?? <FieldEmpty />}</span>
                  </div>
                </div>
                {brand.contractedServices && brand.contractedServices.length > 0 ? (
                  <div className={styles.bpcServices}>
                    {brand.contractedServices.map(s => (
                      <span key={s} className={styles.bpcServicePill}>{s}</span>
                    ))}
                  </div>
                ) : (
                  <p className={styles.bpcServicesMuted}>No contracted services yet</p>
                )}
                <p className={styles.bpcStat}>
                  {bProjects.length} project{bProjects.length !== 1 ? 's' : ''} · {bFull} full case{bFull !== 1 ? 's' : ''}
                  {brand.gmvLabel ? ` · ${brand.gmvLabel}` : ''}
                </p>
                <Link
                  href={`/knowledge-base/client-insight/portfolio/${account.slug}/brand/${getBrandSlug(brand)}`}
                  className={styles.viewBrandLink}
                >
                  View brand
                  <span className={`material-icons-round ${styles.viewBrandArrow}`}>arrow_forward</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* §03 · ICP & Persona Match
           Pattern B (ghost contacts) + icpRationale consolidated here from §01 */}
      <div className={styles.dossSection}>
        <SectionHeader
          num="03"
          title="ICP & PERSONA MATCH"
          subtitle="Decision-makers matched to internal personas."
        />
        <div className={styles.icpContactList}>
          {account.keyContacts.length > 0 ? (
            account.keyContacts.map((c, i) => (
              <div key={i} className={styles.contactRow}>
                <span className={styles.contactAvatar}>{contactInitials(c.name)}</span>
                <div className={styles.crInfo}>
                  <p className={styles.crName}>
                    {c.name}
                    {c.isPrimary && <span className={styles.crPrimaryBadge}>PRIMARY</span>}
                  </p>
                  <p className={styles.crRole}>{c.role}</p>
                </div>
                {c.personaSlug ? (
                  <Link
                    href={`/knowledge-base/client-insight/personas/${c.personaSlug}`}
                    className={styles.personaPillLink}
                  >
                    {c.personaLabel ?? c.personaSlug}
                  </Link>
                ) : c.personaLabel ? (
                  <span className={styles.personaPill}>{c.personaLabel}</span>
                ) : null}
              </div>
            ))
          ) : (
            [0, 1, 2].map(i => (
              <div key={i} className={`${styles.contactRow} ${styles.ghostRow}`}>
                <span className={`${styles.contactAvatar} ${styles.ghostAvatar}`} />
                <div className={styles.crInfo}>
                  <p className={`${styles.crName} ${styles.ghostText}`}>Not yet captured</p>
                  <p className={`${styles.crRole} ${styles.ghostText}`}>—</p>
                </div>
                <span className={`${styles.personaPill} ${styles.ghostPill}`}>—</span>
              </div>
            ))
          )}
        </div>
        <div className={styles.icpRow}>
          <span className={styles.icpRowLabel}>ICP CLASSIFICATION</span>
          {icp ? (
            <Link
              href={`/knowledge-base/client-insight/icps/${icp.slug}`}
              className={styles.icpLink}
            >
              {icp.name} →
            </Link>
          ) : account.icpSlug ? (
            <span className={styles.icpLinkMuted}>{account.icpSlug}</span>
          ) : (
            <span className={styles.icpLinkMuted}>Not yet classified — add icpSlug to portfolio data</span>
          )}
        </div>
        {account.icpRationale && (
          <p className={styles.profileRationale} style={{ marginTop: 12 }}>{account.icpRationale}</p>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP B · THEIR MARKET & AUDIENCE
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP B · THEIR MARKET & AUDIENCE" />

      {/* §04 · Category & Market Intelligence — Pattern A (always render cmiCard) */}
      <div className={styles.dossSection}>
        <SectionHeader
          num="04"
          title="CATEGORY & MARKET INTELLIGENCE"
          subtitle="What we know about the category this portfolio operates in — for content, SEO/AIO positioning, and PR angles."
        />
        <div className={styles.cmiCard}>
          <div className={styles.cmiGrid}>
            <div className={styles.cmiRow}>
              <span className={styles.cmiLabel}>CATEGORY SIZE</span>
              <span className={styles.cmiVal}>
                {account.categoryMarketIntelligence?.categorySize ?? <FieldMuted />}
              </span>
            </div>
            <div className={styles.cmiRow}>
              <span className={styles.cmiLabel}>CATEGORY GROWTH</span>
              <span className={styles.cmiVal}>
                {account.categoryMarketIntelligence?.categoryGrowth ?? <FieldMuted />}
              </span>
            </div>
            <div className={styles.cmiRow}>
              <span className={styles.cmiLabel}>MARKET POSITION</span>
              <span className={styles.cmiVal}>
                {account.categoryMarketIntelligence?.marketPosition ? (
                  <span className={`${styles.mktPosPill} ${MARKET_POS_CLASS[account.categoryMarketIntelligence.marketPosition]}`}>
                    {MARKET_POSITION_LABELS[account.categoryMarketIntelligence.marketPosition]}
                  </span>
                ) : <FieldMuted />}
              </span>
            </div>
            <div className={styles.cmiRow}>
              <span className={styles.cmiLabel}>KEY COMPETITORS</span>
              <span className={styles.cmiVal}>
                {account.categoryMarketIntelligence?.keyCompetitors?.length ? (
                  <span className={styles.competitorPills}>
                    {account.categoryMarketIntelligence.keyCompetitors.map(c => (
                      <span key={c} className={styles.competitorPill}>{c}</span>
                    ))}
                  </span>
                ) : <FieldMuted />}
              </span>
            </div>
          </div>
          {account.categoryMarketIntelligence?.marketDynamicsNotes && (
            <div className={styles.cmiNotes}>
              <p className={styles.cmiNotesText}>{account.categoryMarketIntelligence.marketDynamicsNotes}</p>
            </div>
          )}
        </div>
      </div>

      {/* §05 · Audience & Consumer Insights — Pattern A (always render audienceCard) */}
      <div className={styles.dossSection}>
        <SectionHeader
          num="05"
          title="AUDIENCE & CONSUMER INSIGHTS"
          subtitle="Who the brands serve — essential for creator matching and content angle decisions."
        />
        <div className={styles.audienceCard}>
          {[
            ['DEMOGRAPHICS', account.audienceInsights?.demographics],
            ['PSYCHOGRAPHICS', account.audienceInsights?.psychographics],
            ['PURCHASE BEHAVIOR', account.audienceInsights?.purchaseBehavior],
            ['CHANNEL PREFERENCES', account.audienceInsights?.channelPreferences],
          ].map(([label, text]) => (
            <div key={label} className={styles.audienceBlock}>
              <p className={styles.audienceBlockLabel}>{label}</p>
              <p className={styles.audienceBlockBody}>{text ?? <FieldMuted />}</p>
            </div>
          ))}
          {account.audienceInsights?.notes && (
            <div className={styles.audienceNotes}>
              <p className={styles.audienceNotesText}>{account.audienceInsights.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP C · THE ENGAGEMENT
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP C · THE ENGAGEMENT" />

      {/* §06 · The Brief — Pattern B (ghost rows when goals/painPoints absent) */}
      <div className={styles.dossSection}>
        <SectionHeader
          num="06"
          title="THE BRIEF"
          subtitle="Category-level goals and pain points."
        />
        <div className={styles.briefTwoCol}>
          <div className={styles.twoColBlock}>
            <p className={styles.sectionTitle}>Goals</p>
            <div className={styles.listCard}>
              {account.accountBrief?.goals.length ? (
                account.accountBrief.goals.map((g, i) => (
                  <div key={i} className={styles.listItem}>
                    <span className={styles.goalDot} />
                    {g}
                  </div>
                ))
              ) : (
                [0, 1, 2].map(i => (
                  <div key={i} className={`${styles.listItem} ${styles.ghostRow}`}>
                    <span className={`${styles.goalDot} ${styles.ghostDot}`} />
                    <span className={styles.ghostText}>Not yet captured</span>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className={styles.twoColBlock}>
            <p className={styles.sectionTitle}>Pain Points</p>
            <div className={styles.listCard}>
              {account.accountBrief?.painPoints.length ? (
                account.accountBrief.painPoints.map((pt, i) => (
                  <div key={i} className={styles.listItem}>
                    <span className={styles.painDot} />
                    {pt}
                  </div>
                ))
              ) : (
                [0, 1, 2].map(i => (
                  <div key={i} className={`${styles.listItem} ${styles.ghostRow}`}>
                    <span className={`${styles.painDot} ${styles.ghostDot}`} />
                    <span className={styles.ghostText}>Not yet captured</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* §07 · Our Solution — Pattern A (always render solutionBlock) */}
      <div className={styles.dossSection}>
        <SectionHeader
          num="07"
          title="OUR SOLUTION"
          subtitle="How we serve this category across brands."
        />
        <div className={styles.solutionBlock}>
          <div className={styles.solutionServicesRow}>
            {(() => {
              const services = Array.from(new Set(account.projects.flatMap(p => p.services))).sort();
              return services.length > 0 ? (
                services.map(s => (
                  <span key={s} className={styles.solutionPill}>{s} — {SERVICE_NAMES[s]}</span>
                ))
              ) : (
                <FieldMuted />
              );
            })()}
          </div>
          <p className={styles.solutionOverview}>
            {account.accountSolution?.servicesOverview ?? <FieldMuted />}
          </p>
          {account.accountSolution?.reasoning && (
            <p className={styles.solutionReasoning}>{account.accountSolution.reasoning}</p>
          )}
        </div>
      </div>

      {/* §08 · Outcomes & Proof
           Pattern B (3 ghost metric cards) + Pattern A (narrative) */}
      <div className={styles.dossSection}>
        <SectionHeader
          num="08"
          title="OUTCOMES & PROOF"
          subtitle="Category-level results — citable proof for marketing content and PR."
        />
        <div className={styles.metricsStrip}>
          {account.accountOutcomes?.metrics.length ? (
            account.accountOutcomes.metrics.map((m, i) => (
              <div key={i} className={styles.metricCard}>
                <p className={styles.metricValue}>{m.value}</p>
                <p className={styles.metricLabel}>{m.label}</p>
                <p className={styles.metricSource}>{m.source}</p>
              </div>
            ))
          ) : (
            [0, 1, 2].map(i => (
              <div key={i} className={`${styles.metricCard} ${styles.ghostCard}`}>
                <p className={`${styles.metricValue} ${styles.ghostText}`}>—</p>
                <p className={`${styles.metricLabel} ${styles.ghostText}`}>Not yet captured</p>
                <p className={`${styles.metricSource} ${styles.ghostText}`}>—</p>
              </div>
            ))
          )}
        </div>
        {account.accountOutcomes?.narrative ? (
          <div className={styles.outcomesNarrativeCard}>
            <span className={`material-icons-round ${styles.outcomesNarrativeIcon}`}>auto_awesome</span>
            <p className={styles.outcomesNarrativeText}>{account.accountOutcomes.narrative}</p>
          </div>
        ) : (
          <p className={styles.fieldMuted}>Portfolio narrative not yet captured.</p>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP D · STORY CAPITAL
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP D · STORY CAPITAL" />

      {/* §09 · Story Capital
           Pattern A for narrative/quotable/angles + Pattern B for moments (2 ghost items) */}
      <div className={styles.dossSection}>
        <SectionHeader
          num="09"
          title="STORY CAPITAL"
          subtitle="Narrative material for content, PR, and case studies — what's worth telling about working with this portfolio."
        />
        <div className={styles.storyCard}>
          <div className={styles.storyBlock}>
            <p className={styles.storyBlockLabel}>DEFINING NARRATIVE</p>
            {account.storyCapital?.definingNarrative ? (
              <p className={styles.storyBlockBody}>{account.storyCapital.definingNarrative}</p>
            ) : <FieldMuted />}
          </div>

          <div className={styles.storyBlock}>
            <p className={styles.storyBlockLabel}>STORY-WORTHY MOMENTS</p>
            {account.storyCapital?.storyWorthyMoments?.length ? (
              <div className={styles.storyTimeline}>
                {account.storyCapital.storyWorthyMoments.map((m, i) => (
                  <div key={i} className={styles.storyTimelineItem}>
                    <span className={styles.storyTimelineDot} />
                    <div className={styles.storyTimelineContent}>
                      {m.date && <span className={styles.storyTimelineDate}>{m.date}</span>}
                      <span className={styles.storyTimelineLabel}>{m.label}</span>
                      {m.description && <p className={styles.storyTimelineDesc}>{m.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.storyTimeline}>
                {[0, 1].map(i => (
                  <div key={i} className={`${styles.storyTimelineItem} ${styles.ghostRow}`}>
                    <span className={`${styles.storyTimelineDot} ${styles.ghostDot}`} />
                    <div className={styles.storyTimelineContent}>
                      <span className={`${styles.storyTimelineLabel} ${styles.ghostText}`}>Not yet captured</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.storyBlock}>
            <p className={styles.storyBlockLabel}>QUOTABLE MATERIAL</p>
            {account.storyCapital?.quotableMaterial ? (
              <p className={styles.storyBlockBody}>{account.storyCapital.quotableMaterial}</p>
            ) : <FieldMuted />}
          </div>

          <div className={styles.storyBlock}>
            <p className={styles.storyBlockLabel}>UNIQUE ANGLES</p>
            {account.storyCapital?.uniqueAngles ? (
              <p className={styles.storyBlockBody}>{account.storyCapital.uniqueAngles}</p>
            ) : <FieldMuted />}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP E · CREATOR STRATEGY
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP E · CREATOR STRATEGY" />

      {/* §10 · Creator Match & Top Performers
           Pattern A for profile fields + Pattern B for topPerformers (3 ghost cards) */}
      <div className={styles.dossSection}>
        <SectionHeader
          num="10"
          title="CREATOR MATCH & TOP PERFORMERS"
          subtitle="What kind of creators succeed here, and the proven top performers — backbone for creator acquisition and nurturing."
        />
        <div className={styles.creatorCard}>
          <div className={styles.creatorProfileTop}>
            {[
              ['CREATOR PROFILE', account.creatorStrategy?.creatorProfile],
              ['AUDIENCE MATCH', account.creatorStrategy?.audienceMatch],
              ['CONTENT STYLE NEEDS', account.creatorStrategy?.contentStyleNeeds],
            ].map(([label, text]) => (
              <div key={label} className={styles.creatorProfileBlock}>
                <p className={styles.creatorProfileLabel}>{label}</p>
                <p className={styles.creatorProfileBody}>{text ?? <FieldMuted />}</p>
              </div>
            ))}
          </div>

          <div className={styles.topPerformersSection}>
            <p className={styles.topPerformersLabel}>TOP PERFORMERS</p>
            <div className={styles.topPerformerGrid}>
              {account.creatorStrategy?.topPerformers?.length ? (
                account.creatorStrategy.topPerformers.map((tp, i) => (
                  <div key={i} className={styles.topPerformerCard}>
                    <div className={styles.tpAvatar}>{creatorInitials(tp.name)}</div>
                    <div className={styles.tpInfo}>
                      <p className={styles.tpName}>{tp.name}</p>
                      {tp.handle && <p className={styles.tpHandle}>{tp.handle}</p>}
                      {tp.notes && <p className={styles.tpNotes}>{tp.notes}</p>}
                    </div>
                  </div>
                ))
              ) : (
                [0, 1, 2].map(i => (
                  <div key={i} className={`${styles.topPerformerCard} ${styles.ghostCard}`}>
                    <div className={`${styles.tpAvatar} ${styles.ghostAvatar}`} />
                    <div className={styles.tpInfo}>
                      <p className={`${styles.tpName} ${styles.ghostText}`}>Not yet captured</p>
                      <p className={`${styles.tpHandle} ${styles.ghostText}`}>—</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {account.creatorStrategy?.notes && (
            <div className={styles.creatorNotes}>
              <p className={styles.creatorNotesText}>{account.creatorStrategy.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP F · MARKETING PLAYBOOK
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP F · MARKETING PLAYBOOK" />

      {/* §11 · Content Angles That Work — Pattern B (3 ghost cards when absent) */}
      <div className={styles.dossSection}>
        <SectionHeader
          num="11"
          title="CONTENT ANGLES THAT WORK"
          subtitle="Content angles, positioning, and story arcs that resonate with this portfolio's audience — proven by past work."
        />
        <div className={styles.anglesList}>
          {account.contentAngles?.length ? (
            account.contentAngles.map(ca => (
              <div key={ca.id} className={styles.angleCard}>
                <p className={styles.angleTitle}>{ca.angle}</p>
                <p className={styles.angleWhy}>{ca.why}</p>
                {ca.exampleProject && (
                  <p className={styles.angleRef}>Reference: {ca.exampleProject}</p>
                )}
              </div>
            ))
          ) : (
            [0, 1, 2].map(i => (
              <div key={i} className={`${styles.angleCard} ${styles.ghostCard}`}>
                <p className={`${styles.angleTitle} ${styles.ghostText}`}>Not yet captured</p>
                <p className={`${styles.angleWhy} ${styles.ghostText}`}>Content angle and supporting rationale will appear here as patterns emerge.</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* §12 · Co-promotion Opportunities — Pattern B (3 ghost rows when absent) */}
      <div className={styles.dossSection}>
        <SectionHeader
          num="12"
          title="CO-PROMOTION OPPORTUNITIES"
          subtitle="Joint marketing moments — events, platforms, and co-content opportunities to activate."
        />
        <div className={styles.coPromoList}>
          {account.coPromotionOpportunities?.length ? (
            account.coPromotionOpportunities.map(cp => (
              <div key={cp.id} className={styles.coPromoRow}>
                <div className={`${styles.coPromoTypePill} ${COPROMO_CLASS[cp.type]}`}>
                  <span className={`material-icons-round ${styles.coPromoTypeIcon}`}>{COPROMO_ICON[cp.type]}</span>
                  {COPROMO_TYPE_LABELS[cp.type]}
                </div>
                <div className={styles.coPromoCenter}>
                  <p className={styles.coPromoTitle}>{cp.title}</p>
                  {cp.description && <p className={styles.coPromoDesc}>{cp.description}</p>}
                </div>
                {cp.timing && (
                  <span className={styles.coPromoTiming}>{cp.timing}</span>
                )}
              </div>
            ))
          ) : (
            [0, 1, 2].map(i => (
              <div key={i} className={`${styles.coPromoRow} ${styles.ghostCard}`}>
                <div className={`${styles.coPromoTypePill} ${styles.ghostPill}`}>—</div>
                <div className={styles.coPromoCenter}>
                  <p className={`${styles.coPromoTitle} ${styles.ghostText}`}>Not yet captured</p>
                  <p className={`${styles.coPromoDesc} ${styles.ghostText}`}>Co-promotion opportunity will be recorded here.</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP G · ARCHIVE & REFERENCE
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP G · ARCHIVE & REFERENCE" />

      {/* §13 · Projects — Pattern B (1 ghost project card per brand when no projects) */}
      <div className={styles.dossSection}>
        <SectionHeader
          num="13"
          title="PROJECTS"
          subtitle="All projects grouped by brand within this portfolio."
        />
        {account.brands.map(brand => {
          const projects = projectsByBrand[brand.id] ?? [];
          if (brand !== account.brands[0] && !projects.length) return null;
          const gridCols = 3;
          const slotsInRow = projects.length % gridCols;
          const showAddCard = projects.length > 0 && slotsInRow !== 0;
          return (
            <div key={brand.id} className={styles.brandGroup}>
              <div className={styles.brandDivider}>
                <Link
                  href={`/knowledge-base/client-insight/portfolio/${account.slug}/brand/${getBrandSlug(brand)}`}
                  className={styles.brandDividerNameLink}
                >
                  {brand.name}
                </Link>
                {brand.gmvLabel && (
                  <span className={styles.brandDividerGmv}>{brand.gmvLabel}</span>
                )}
                <span className={styles.brandDividerLine} />
              </div>
              <div className={styles.projectsGrid}>
                {projects.length === 0 ? (
                  <div className={`${styles.pjCard} ${styles.ghostCard}`}>
                    <div className={styles.pjCardHead}>
                      <div className={`${styles.pjIconBox} ${styles.ghostIconBox}`} />
                      <div className={styles.pjCardMeta}>
                        <span className={`${styles.pjBadge} ${styles.ghostText}`}>—</span>
                        <p className={`${styles.pjName} ${styles.ghostText}`}>No projects logged yet</p>
                        <p className={`${styles.pjPeriod} ${styles.ghostText}`}>—</p>
                      </div>
                    </div>
                    <p className={`${styles.pjOutcome} ${styles.ghostText}`}>Projects will appear here as they are logged for this brand.</p>
                    <p className={`${styles.pjServices} ${styles.ghostText}`}>—</p>
                  </div>
                ) : (
                  <>
                    {projects.map(p => {
                      const isFull = p.type === 'full-case';
                      return (
                        <Link
                          key={p.slug}
                          href={`/knowledge-base/client-insight/portfolio/${account.slug}/${p.slug}`}
                          className={`${styles.pjCard} ${!isFull ? styles.pjCardAdhoc : ''}`}
                        >
                          <div className={styles.pjCardHead}>
                            <div className={`${styles.pjIconBox} ${isFull ? styles.pjIconBoxFull : styles.pjIconBoxAdhoc}`}>
                              <span className={`material-icons-round ${styles.pjIcon} ${isFull ? styles.pjIconFull : styles.pjIconAdhoc}`}>
                                {isFull ? 'menu_book' : 'bolt'}
                              </span>
                            </div>
                            <div className={styles.pjCardMeta}>
                              <span className={`${styles.pjBadge} ${isFull ? styles.pjBadgeFull : styles.pjBadgeAdhoc}`}>
                                {isFull ? 'Full case' : 'Adhoc'}
                              </span>
                              <p className={styles.pjName}>{p.name}</p>
                              <p className={styles.pjPeriod}>{p.period}</p>
                            </div>
                          </div>
                          <p className={styles.pjOutcome}>{p.outcomeHeadline}</p>
                          <p className={styles.pjServices}>
                            {p.services.join(' + ')}
                            {isFull && p.type === 'full-case' && p.patterns.length > 0 && (
                              <> · {p.patterns.length} pattern{p.patterns.length !== 1 ? 's' : ''}</>
                            )}
                          </p>
                        </Link>
                      );
                    })}
                    {showAddCard && (
                      <div className={styles.addProjectCard}>
                        <span className={`material-icons-round ${styles.addProjectIcon}`}>add</span>
                        <span className={styles.addProjectText}>Add project</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* §14 · Reference Index — always renders (Pattern A) */}
      <div className={styles.dossSection}>
        <SectionHeader num="14" title="REFERENCE INDEX" />
        {account.tagClusters.length > 0 ? (
          <div className={styles.tagClustersGrid} style={{ marginBottom: account.linkedEntities.length > 0 ? '16px' : undefined }}>
            {account.tagClusters.map((cl, i) => (
              <div key={i} className={styles.tagClusterCard}>
                <p className={styles.tagClusterLabel}>{cl.label}</p>
                <div className={styles.tagPills}>
                  {cl.tags.map((tag, j) => (
                    <span key={j} className={styles.tagPill}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.fieldMuted}>Tag clusters not yet captured.</p>
        )}
        {account.linkedEntities.length > 0 && (
          <div className={styles.linkedGrid}>
            {account.linkedEntities.map((e, i) => (
              <span key={i} className={styles.linkedChip}>
                <span className={styles.linkedKind}>{e.kind}</span>
                {e.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP H · RESEARCH FROM THE LIBRARY
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP H · RESEARCH FROM THE LIBRARY" />

      {/* §15 · Relevant Research */}
      <div className={styles.dossSection}>
        <SectionHeader
          num="15"
          title="RELEVANT RESEARCH"
          subtitle={`Insights from the research library that apply to this portfolio. Tagged via the applicability field on each insight.`}
        />
        <RelevantResearchSection
          insights={relevantInsights}
          entityType="portfolio"
          entitySlug={accountSlug}
          entityName={displayName}
        />
      </div>

    </div>
  );
}
