import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PORTFOLIO_ACCOUNTS } from '@/data/portfolio/accounts';
import {
  getAccountBySlug,
  getProjectsByBrand,
  getAccountSummaryStats,
  getSiblingPortfolios,
  getDisplayName,
} from '@/data/portfolio/helpers';
import { SERVICE_NAMES, CATEGORY_LABELS } from '@/data/portfolio/types';
import styles from '../../portfolio.module.css';

export async function generateStaticParams() {
  return PORTFOLIO_ACCOUNTS.map(a => ({ accountSlug: a.slug }));
}

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

  function contactInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  }

  return (
    <div className={styles.accountPage}>
      <p className={styles.breadcrumb}>
        Knowledge Base ›{' '}
        <Link href="/knowledge-base/client-insight/portfolio" style={{ color: 'inherit', textDecoration: 'none' }}>
          Client Portfolio
        </Link>{' '}
        › {account.parentCompany}
        {!account.isGeneralCategory && <> › {account.categoryName}</>}
      </p>

      {/* Hero */}
      <div className={styles.accountHero}>
        <div className={styles.accountHeroInitials}>{account.initials}</div>
        <div className={styles.accountHeroInfo}>
          <div className={styles.accountHeroParentRow}>
            <span className={styles.accountHeroParent}>{account.parentCompany}</span>
            {!account.isGeneralCategory && (
              <>
                <span className={styles.accountHeroParentSep}>›</span>
                <span className={styles.accountHeroCatPill}>{account.categoryName}</span>
              </>
            )}
          </div>
          <h1 className={styles.accountHeroName}>{getDisplayName(account)}</h1>
          <p className={styles.accountHeroMeta}>
            <span>{account.sizeTierLabel}</span>
            <span>{CATEGORY_LABELS[account.category]}</span>
            <span>{account.market}</span>
            {account.parentEntity && <span>{account.parentEntity}</span>}
            <span>Since {account.engagedSince}</span>
          </p>
        </div>
        <span className={styles.accountHeroBadge}>
          <span className={`material-icons-round ${styles.accountHeroBadgeIcon}`}>lock</span>
          {account.version}
        </span>
      </div>

      {/* Sibling portfolios callout */}
      {siblings.length > 0 && (
        <div className={styles.siblingStrip}>
          <span className={styles.siblingSLabel}>Other {account.parentCompany} portfolios</span>
          {siblings.map(s => (
            <Link
              key={s.slug}
              href={`/knowledge-base/client-insight/portfolio/${s.slug}`}
              className={styles.siblingChip}
            >
              {getDisplayName(s)}
              <span className={`material-icons-round ${styles.siblingChipArrow}`}>arrow_forward</span>
            </Link>
          ))}
        </div>
      )}

      {/* Stats strip */}
      <div className={styles.accountStats}>
        <div className={styles.accountStatItem}>
          <span className={styles.accountStatNum}>{stats.totalProjects}</span>
          <span className={styles.accountStatLabel}>Projects</span>
        </div>
        <div className={styles.accountStatItem}>
          <span className={styles.accountStatNum}>{stats.fullCases}</span>
          <span className={styles.accountStatLabel}>Full cases</span>
        </div>
        <div className={styles.accountStatItem}>
          <span className={styles.accountStatNum}>{stats.adhocCount}</span>
          <span className={styles.accountStatLabel}>Adhoc logs</span>
        </div>
        <div className={styles.accountStatItem}>
          <span className={styles.accountStatNum}>{stats.brandCount}</span>
          <span className={styles.accountStatLabel}>Brands</span>
        </div>
        <div className={styles.accountStatItem}>
          <span className={styles.accountStatNum}>{stats.patternsTotal}</span>
          <span className={styles.accountStatLabel}>Patterns</span>
        </div>
        {account.totalGmvLabel && (
          <div className={styles.accountStatItem}>
            <span className={styles.accountStatNum}>{account.totalGmvLabel}</span>
            <span className={styles.accountStatLabel}>Total GMV</span>
          </div>
        )}
      </div>

      {/* Sections 01 + 02 — Account Profile / ICP & Persona Match */}
      <div className={styles.ctxTwoCol}>

        {/* Left — 01 Account Profile */}
        <div>
          <div className={styles.secHeader}>
            <span className={styles.secNum}>01</span>
            Account Profile
          </div>
          <div className={styles.icpBlock}>
            <div className={styles.icpRow}>
              <span className={styles.icpLabel}>{account.icpLabel}</span>
              {account.icpVerified && <span className={styles.icpVerifiedBadge}>Verified</span>}
            </div>
            <p className={styles.icpRationale}>{account.icpRationale}</p>
          </div>
        </div>

        {/* Right — 02 ICP & Persona Match */}
        <div>
          <div className={styles.secHeader}>
            <span className={styles.secNum}>02</span>
            ICP &amp; Persona Match
          </div>
          <div className={styles.icpBlock}>
            <p className={styles.personasSubLabel}>
              Decision-makers · {account.keyContacts.length} persona{account.keyContacts.length !== 1 ? 's' : ''} matched
            </p>
            {account.keyContacts.length === 0 ? (
              <p className={styles.noPersonasNote}>No personas matched yet</p>
            ) : (
              account.keyContacts.map((c, i) => (
                <div key={i} className={styles.contactRow}>
                  <span className={styles.contactAvatar}>{contactInitials(c.name)}</span>
                  <div className={styles.crInfo}>
                    <p className={styles.crName}>
                      {c.name}
                      {c.isPrimary && <span className={styles.crPrimaryBadge}>Primary</span>}
                    </p>
                    <p className={styles.crRole}>{c.role}</p>
                  </div>
                  <span className={styles.personaPill}>{c.personaLabel}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Section 03 — Brand Portfolio */}
      <div className={styles.sectionBlock}>
        <div className={styles.secHeader}>
          <span className={styles.secNum}>03</span>
          Brand Portfolio
        </div>
        <div className={styles.brandPortfolioGrid}>
          {account.brands.map(brand => {
            const bProjects = projectsByBrand[brand.id] ?? [];
            const bFullCases = bProjects.filter(p => p.type === 'full-case').length;
            return (
              <div key={brand.id} className={styles.brandPortfolioCard}>
                <div className={styles.bpcHead}>
                  <span className={styles.bpcName}>{brand.name}</span>
                  <span className={`${styles.bpcStatusPill} ${styles[`bpcStatus--${brand.status}`]}`}>
                    {brand.status}
                  </span>
                </div>
                {brand.subCategory && (
                  <p className={styles.bpcSub}>{brand.subCategory}</p>
                )}
                {brand.targetConsumer && (
                  <p className={styles.bpcMeta}>{brand.targetConsumer}</p>
                )}
                {brand.contractedServices && brand.contractedServices.length > 0 && (
                  <div className={styles.bpcServices}>
                    {brand.contractedServices.map(s => (
                      <span key={s} className={styles.bpcServicePill}>{s}</span>
                    ))}
                  </div>
                )}
                <p className={styles.bpcStat}>
                  {bProjects.length} project{bProjects.length !== 1 ? 's' : ''} · {bFullCases} full case{bFullCases !== 1 ? 's' : ''}
                </p>
                {brand.gmvLabel && (
                  <p className={styles.bpcGmv}>{brand.gmvLabel}</p>
                )}
                {brand.pitchSolution && (
                  <p className={styles.bpcPitch}>{brand.pitchSolution}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 04 — The Brief */}
      {account.accountBrief && (
        <div className={styles.sectionBlock}>
          <div className={styles.secHeader}>
            <span className={styles.secNum}>04</span>
            The Brief
          </div>
          <div className={styles.briefTwoCol}>
            {account.accountBrief.goals.length > 0 && (
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
            )}
            {account.accountBrief.painPoints.length > 0 && (
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
            )}
          </div>
        </div>
      )}

      {/* Section 05 — Our Solution */}
      {account.accountSolution && (
        <div className={styles.sectionBlock}>
          <div className={styles.secHeader}>
            <span className={styles.secNum}>05</span>
            Our Solution
          </div>
          <div className={styles.solutionBlock}>
            <div className={styles.solutionServicesRow}>
              {Array.from(new Set(account.projects.flatMap(p => p.services))).sort().map(s => (
                <span key={s} className={styles.solutionPill}>{s} — {SERVICE_NAMES[s]}</span>
              ))}
            </div>
            <p className={styles.solutionOverview}>{account.accountSolution.servicesOverview}</p>
            <p className={styles.solutionReasoning}>{account.accountSolution.reasoning}</p>
          </div>
        </div>
      )}

      {/* Section 06 — Outcomes & Proof */}
      {account.accountOutcomes && (
        <div className={styles.sectionBlock}>
          <div className={styles.secHeader}>
            <span className={styles.secNum}>06</span>
            Outcomes &amp; Proof
          </div>
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
        </div>
      )}

      {/* Section 07 — Account Patterns */}
      {account.accountPatterns.length > 0 && (
        <div className={styles.sectionBlock}>
          <div className={styles.secHeader}>
            <span className={styles.secNum}>07</span>
            Account Pattern Library
          </div>
          <div className={styles.apGrid}>
            {account.accountPatterns.map((pat, i) => (
              <div key={pat.id} className={styles.apCard}>
                <p className={styles.apEyebrow}>
                  <span className={`material-icons-round ${styles.apIcon}`}>merge</span>
                  Account Pattern · {i + 1}
                </p>
                <p className={styles.apTitle}>{pat.title}</p>
                <p className={styles.apInsight}>{pat.insight}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 08 — Reference Index */}
      {(account.tagClusters.length > 0 || account.linkedEntities.length > 0) && (
        <div className={styles.sectionBlock}>
          <div className={styles.secHeader}>
            <span className={styles.secNum}>08</span>
            Reference Index
          </div>
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

      {/* Section 09 — Projects */}
      <div className={styles.sectionBlock}>
        <div className={styles.secHeader}>
          <span className={styles.secNum}>09</span>
          Projects
        </div>
        {account.brands.map(brand => {
          const projects = projectsByBrand[brand.id] ?? [];
          if (!projects.length) return null;
          const gridCols = 3;
          const slotsInRow = projects.length % gridCols;
          const showAddCard = slotsInRow !== 0 || projects.length === 0;
          return (
            <div key={brand.id} className={styles.brandGroup}>
              <div className={styles.brandDivider}>
                <span className={styles.brandDividerName}>{brand.name}</span>
                <span className={styles.brandDividerLine} />
              </div>
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
            </div>
          );
        })}
      </div>

      {/* Phase 2 stubs */}
      <div className={styles.phaseStubStrip}>
        <div className={styles.phaseStubCard}>
          <p className={styles.phaseStubLabel}>Phase 2</p>
          <p className={styles.phaseStubTitle}>Account health score — pending</p>
        </div>
        <div className={styles.phaseStubCard}>
          <p className={styles.phaseStubLabel}>Phase 2</p>
          <p className={styles.phaseStubTitle}>Expansion opportunity map — pending</p>
        </div>
      </div>
    </div>
  );
}
