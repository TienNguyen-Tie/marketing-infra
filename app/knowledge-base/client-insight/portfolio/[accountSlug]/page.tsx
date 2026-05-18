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
} from '@/data/portfolio/helpers';
import {
  SERVICE_NAMES,
  CATEGORY_LABELS,
  MARKET_POSITION_LABELS,
  COPROMO_TYPE_LABELS,
} from '@/data/portfolio/types';
import type { MarketPosition, CoPromoType } from '@/data/portfolio/types';
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

/* ── Empty states ─────────────────────────────────────────── */

function FieldEmpty() {
  return <span className={styles.fieldEmpty}>Not yet captured</span>;
}

function SectionEmpty({ topic }: { topic: string }) {
  return (
    <div className={styles.sectionEmpty}>
      <span className={`material-icons-round ${styles.sectionEmptyIcon}`}>edit_note</span>
      <p className={styles.sectionEmptyText}>
        This section will populate as the team captures insights about {topic} for this portfolio.
      </p>
    </div>
  );
}

/* ── Group divider ────────────────────────────────────────── */

function GroupDivider({ label }: { label: string }) {
  return (
    <div className={styles.groupDivider}>
      <span className={styles.groupEyebrow}>{label}</span>
      <span className={styles.groupDividerLine} />
    </div>
  );
}

/* ── Section header ───────────────────────────────────────── */

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

/* ── Main component ───────────────────────────────────────── */

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

      {/* 01 · Portfolio Profile */}
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
        {account.icpRationale && (
          <p className={styles.profileRationale}>{account.icpRationale}</p>
        )}
      </div>

      {/* 02 · Brand Portfolio */}
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
              </div>
            );
          })}
        </div>
      </div>

      {/* 03 · ICP & Persona Match */}
      <div className={styles.dossSection}>
        <SectionHeader
          num="03"
          title="ICP & PERSONA MATCH"
          subtitle="Decision-makers matched to internal personas."
        />
        {account.keyContacts.length === 0 ? (
          <SectionEmpty topic="key contacts and persona matches" />
        ) : (
          <div className={styles.icpContactList}>
            {account.keyContacts.map((c, i) => (
              <div key={i} className={styles.contactRow}>
                <span className={styles.contactAvatar}>{contactInitials(c.name)}</span>
                <div className={styles.crInfo}>
                  <p className={styles.crName}>
                    {c.name}
                    {c.isPrimary && <span className={styles.crPrimaryBadge}>PRIMARY</span>}
                  </p>
                  <p className={styles.crRole}>{c.role}</p>
                </div>
                {c.personaLabel && (
                  <span className={styles.personaPill}>{c.personaLabel}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP B · THEIR MARKET & AUDIENCE
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP B · THEIR MARKET & AUDIENCE" />

      {/* 04 · Category & Market Intelligence */}
      <div className={styles.dossSection}>
        <SectionHeader
          num="04"
          title="CATEGORY & MARKET INTELLIGENCE"
          subtitle="What we know about the category this portfolio operates in — for content, SEO/AIO positioning, and PR angles."
        />
        {!account.categoryMarketIntelligence ? (
          <SectionEmpty topic="market intelligence and competitive landscape" />
        ) : (
          <div className={styles.cmiCard}>
            <div className={styles.cmiGrid}>
              <div className={styles.cmiRow}>
                <span className={styles.cmiLabel}>CATEGORY SIZE</span>
                <span className={styles.cmiVal}>{account.categoryMarketIntelligence.categorySize ?? <FieldEmpty />}</span>
              </div>
              <div className={styles.cmiRow}>
                <span className={styles.cmiLabel}>CATEGORY GROWTH</span>
                <span className={styles.cmiVal}>{account.categoryMarketIntelligence.categoryGrowth ?? <FieldEmpty />}</span>
              </div>
              <div className={styles.cmiRow}>
                <span className={styles.cmiLabel}>MARKET POSITION</span>
                <span className={styles.cmiVal}>
                  {account.categoryMarketIntelligence.marketPosition ? (
                    <span className={`${styles.mktPosPill} ${MARKET_POS_CLASS[account.categoryMarketIntelligence.marketPosition]}`}>
                      {MARKET_POSITION_LABELS[account.categoryMarketIntelligence.marketPosition]}
                    </span>
                  ) : <FieldEmpty />}
                </span>
              </div>
              <div className={styles.cmiRow}>
                <span className={styles.cmiLabel}>KEY COMPETITORS</span>
                <span className={styles.cmiVal}>
                  {account.categoryMarketIntelligence.keyCompetitors?.length ? (
                    <span className={styles.competitorPills}>
                      {account.categoryMarketIntelligence.keyCompetitors.map(c => (
                        <span key={c} className={styles.competitorPill}>{c}</span>
                      ))}
                    </span>
                  ) : <FieldEmpty />}
                </span>
              </div>
            </div>
            {account.categoryMarketIntelligence.marketDynamicsNotes && (
              <div className={styles.cmiNotes}>
                <p className={styles.cmiNotesText}>{account.categoryMarketIntelligence.marketDynamicsNotes}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 05 · Audience & Consumer Insights */}
      <div className={styles.dossSection}>
        <SectionHeader
          num="05"
          title="AUDIENCE & CONSUMER INSIGHTS"
          subtitle="Who the brands serve — essential for creator matching and content angle decisions."
        />
        {!account.audienceInsights ? (
          <SectionEmpty topic="audience demographics, psychographics, and purchase behavior" />
        ) : (
          <div className={styles.audienceCard}>
            {[
              ['DEMOGRAPHICS', account.audienceInsights.demographics],
              ['PSYCHOGRAPHICS', account.audienceInsights.psychographics],
              ['PURCHASE BEHAVIOR', account.audienceInsights.purchaseBehavior],
              ['CHANNEL PREFERENCES', account.audienceInsights.channelPreferences],
            ].map(([label, text]) => (
              <div key={label} className={styles.audienceBlock}>
                <p className={styles.audienceBlockLabel}>{label}</p>
                <p className={styles.audienceBlockBody}>{text ?? <FieldEmpty />}</p>
              </div>
            ))}
            {account.audienceInsights.notes && (
              <div className={styles.audienceNotes}>
                <p className={styles.audienceNotesText}>{account.audienceInsights.notes}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP C · THE ENGAGEMENT
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP C · THE ENGAGEMENT" />

      {/* 06 · The Brief */}
      <div className={styles.dossSection}>
        <SectionHeader
          num="06"
          title="THE BRIEF"
          subtitle="Category-level goals and pain points."
        />
        {!account.accountBrief ? (
          <SectionEmpty topic="client goals and pain points at the portfolio level" />
        ) : (
          <div className={styles.briefTwoCol}>
            <div className={styles.twoColBlock}>
              <p className={styles.sectionTitle}>Goals</p>
              <div className={styles.listCard}>
                {account.accountBrief.goals.map((g, i) => (
                  <div key={i} className={styles.listItem}>
                    <span className={styles.goalDot} />
                    {g}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.twoColBlock}>
              <p className={styles.sectionTitle}>Pain Points</p>
              <div className={styles.listCard}>
                {account.accountBrief.painPoints.map((pt, i) => (
                  <div key={i} className={styles.listItem}>
                    <span className={styles.painDot} />
                    {pt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 07 · Our Solution */}
      <div className={styles.dossSection}>
        <SectionHeader
          num="07"
          title="OUR SOLUTION"
          subtitle="How we serve this category across brands."
        />
        {!account.accountSolution ? (
          <SectionEmpty topic="our solution and service strategy for this portfolio" />
        ) : (
          <div className={styles.solutionBlock}>
            <div className={styles.solutionServicesRow}>
              {Array.from(new Set(account.projects.flatMap(p => p.services))).sort().map(s => (
                <span key={s} className={styles.solutionPill}>{s} — {SERVICE_NAMES[s]}</span>
              ))}
            </div>
            <p className={styles.solutionOverview}>{account.accountSolution.servicesOverview}</p>
            <p className={styles.solutionReasoning}>{account.accountSolution.reasoning}</p>
          </div>
        )}
      </div>

      {/* 08 · Outcomes & Proof */}
      <div className={styles.dossSection}>
        <SectionHeader
          num="08"
          title="OUTCOMES & PROOF"
          subtitle="Category-level results — citable proof for marketing content and PR."
        />
        {!account.accountOutcomes ? (
          <SectionEmpty topic="portfolio-level outcomes and proof points" />
        ) : (
          <>
            {account.accountOutcomes.metrics.length > 0 && (
              <div className={styles.metricsStrip}>
                {account.accountOutcomes.metrics.map((m, i) => (
                  <div key={i} className={styles.metricCard}>
                    <p className={styles.metricValue}>{m.value}</p>
                    <p className={styles.metricLabel}>{m.label}</p>
                    <p className={styles.metricSource}>{m.source}</p>
                  </div>
                ))}
              </div>
            )}
            {account.accountOutcomes.narrative && (
              <div className={styles.outcomesNarrativeCard}>
                <span className={`material-icons-round ${styles.outcomesNarrativeIcon}`}>auto_awesome</span>
                <p className={styles.outcomesNarrativeText}>{account.accountOutcomes.narrative}</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP D · STORY CAPITAL
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP D · STORY CAPITAL" />

      {/* 09 · Story Capital */}
      <div className={styles.dossSection}>
        <SectionHeader
          num="09"
          title="STORY CAPITAL"
          subtitle="Narrative material for content, PR, and case studies — what's worth telling about working with this portfolio."
        />
        {!account.storyCapital ? (
          <SectionEmpty topic="defining narrative, story-worthy moments, and quotable material" />
        ) : (
          <div className={styles.storyCard}>
            <div className={styles.storyBlock}>
              <p className={styles.storyBlockLabel}>DEFINING NARRATIVE</p>
              {account.storyCapital.definingNarrative ? (
                <p className={styles.storyBlockBody}>{account.storyCapital.definingNarrative}</p>
              ) : <FieldEmpty />}
            </div>

            <div className={styles.storyBlock}>
              <p className={styles.storyBlockLabel}>STORY-WORTHY MOMENTS</p>
              {account.storyCapital.storyWorthyMoments?.length ? (
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
              ) : <FieldEmpty />}
            </div>

            <div className={styles.storyBlock}>
              <p className={styles.storyBlockLabel}>QUOTABLE MATERIAL</p>
              {account.storyCapital.quotableMaterial ? (
                <p className={styles.storyBlockBody}>{account.storyCapital.quotableMaterial}</p>
              ) : <FieldEmpty />}
            </div>

            <div className={styles.storyBlock}>
              <p className={styles.storyBlockLabel}>UNIQUE ANGLES</p>
              {account.storyCapital.uniqueAngles ? (
                <p className={styles.storyBlockBody}>{account.storyCapital.uniqueAngles}</p>
              ) : <FieldEmpty />}
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP E · CREATOR STRATEGY
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP E · CREATOR STRATEGY" />

      {/* 10 · Creator Match & Top Performers */}
      <div className={styles.dossSection}>
        <SectionHeader
          num="10"
          title="CREATOR MATCH & TOP PERFORMERS"
          subtitle="What kind of creators succeed here, and the proven top performers — backbone for creator acquisition and nurturing."
        />
        {!account.creatorStrategy ? (
          <SectionEmpty topic="creator profile, audience match, and top performers" />
        ) : (
          <div className={styles.creatorCard}>
            <div className={styles.creatorProfileTop}>
              {[
                ['CREATOR PROFILE', account.creatorStrategy.creatorProfile],
                ['AUDIENCE MATCH', account.creatorStrategy.audienceMatch],
                ['CONTENT STYLE NEEDS', account.creatorStrategy.contentStyleNeeds],
              ].map(([label, text]) => (
                <div key={label} className={styles.creatorProfileBlock}>
                  <p className={styles.creatorProfileLabel}>{label}</p>
                  <p className={styles.creatorProfileBody}>{text ?? <FieldEmpty />}</p>
                </div>
              ))}
            </div>

            <div className={styles.topPerformersSection}>
              <p className={styles.topPerformersLabel}>TOP PERFORMERS</p>
              {account.creatorStrategy.topPerformers?.length ? (
                <div className={styles.topPerformerGrid}>
                  {account.creatorStrategy.topPerformers.map((tp, i) => (
                    <div key={i} className={styles.topPerformerCard}>
                      <div className={styles.tpAvatar}>{creatorInitials(tp.name)}</div>
                      <div className={styles.tpInfo}>
                        <p className={styles.tpName}>{tp.name}</p>
                        {tp.handle && <p className={styles.tpHandle}>{tp.handle}</p>}
                        {tp.notes && <p className={styles.tpNotes}>{tp.notes}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.topPerformersMuted}>
                  No top performers captured yet — feed creators here as patterns emerge from completed projects.
                </p>
              )}
            </div>

            {account.creatorStrategy.notes && (
              <div className={styles.creatorNotes}>
                <p className={styles.creatorNotesText}>{account.creatorStrategy.notes}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP F · MARKETING PLAYBOOK
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP F · MARKETING PLAYBOOK" />

      {/* 11 · Content Angles That Work */}
      <div className={styles.dossSection}>
        <SectionHeader
          num="11"
          title="CONTENT ANGLES THAT WORK"
          subtitle="Content angles, positioning, and story arcs that resonate with this portfolio's audience — proven by past work."
        />
        {!account.contentAngles?.length ? (
          <SectionEmpty topic="content angles and proven messaging frameworks" />
        ) : (
          <div className={styles.anglesList}>
            {account.contentAngles.map(ca => (
              <div key={ca.id} className={styles.angleCard}>
                <p className={styles.angleTitle}>{ca.angle}</p>
                <p className={styles.angleWhy}>{ca.why}</p>
                {ca.exampleProject && (
                  <p className={styles.angleRef}>Reference: {ca.exampleProject}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 12 · Co-promotion Opportunities */}
      <div className={styles.dossSection}>
        <SectionHeader
          num="12"
          title="CO-PROMOTION OPPORTUNITIES"
          subtitle="Joint marketing moments — events, platforms, and co-content opportunities to activate."
        />
        {!account.coPromotionOpportunities?.length ? (
          <SectionEmpty topic="joint marketing events and co-promotion opportunities" />
        ) : (
          <div className={styles.coPromoList}>
            {account.coPromotionOpportunities.map(cp => (
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
            ))}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP G · ARCHIVE & REFERENCE
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP G · ARCHIVE & REFERENCE" />

      {/* 13 · Projects */}
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
          const showAddCard = slotsInRow !== 0 || projects.length === 0;
          return (
            <div key={brand.id} className={styles.brandGroup}>
              <div className={styles.brandDivider}>
                <span className={styles.brandDividerName}>{brand.name}</span>
                {brand.gmvLabel && (
                  <span className={styles.brandDividerGmv}>{brand.gmvLabel}</span>
                )}
                <span className={styles.brandDividerLine} />
              </div>
              {projects.length === 0 ? (
                <p className={styles.brandNoProjects}>No projects yet for {brand.name}</p>
              ) : (
                <div className={styles.projectsGrid}>
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
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 14 · Reference Index */}
      {(account.tagClusters.length > 0 || account.linkedEntities.length > 0) && (
        <div className={styles.dossSection}>
          <SectionHeader num="14" title="REFERENCE INDEX" />
          {account.tagClusters.length > 0 && (
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
      )}

    </div>
  );
}
