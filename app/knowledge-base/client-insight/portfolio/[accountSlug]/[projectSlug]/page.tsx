import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PORTFOLIO_ACCOUNTS } from '@/data/portfolio/accounts';
import { getAccountBySlug, getProjectBySlug } from '@/data/portfolio/helpers';
import { SERVICE_NAMES } from '@/data/portfolio/types';
import styles from '../../../portfolio.module.css';

export async function generateStaticParams() {
  return PORTFOLIO_ACCOUNTS.flatMap(a =>
    a.projects.map(p => ({ accountSlug: a.slug, projectSlug: p.slug }))
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ accountSlug: string; projectSlug: string }>;
}) {
  const { accountSlug, projectSlug } = await params;
  const account = getAccountBySlug(accountSlug);
  if (!account) notFound();

  const project = getProjectBySlug(account, projectSlug);
  if (!project) notFound();

  const brand = account.brands.find(b => b.id === project.brandSlug);

  if (project.type === 'adhoc') {
    return (
      <div className={styles.adhocPage}>
        <p className={styles.breadcrumb}>
          Knowledge Base ›{' '}
          <Link href="/knowledge-base/client-insight/portfolio" style={{ color: 'inherit', textDecoration: 'none' }}>
            Client Portfolio
          </Link>{' '}
          ›{' '}
          <Link href={`/knowledge-base/client-insight/portfolio/${account.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {account.name}
          </Link>{' '}
          › {project.name}
        </p>

        <div>
          <p className={styles.adhocHeroType}>
            <span className={`material-icons-round ${styles.adhocHeroTypeIcon}`}>bolt</span>
            Adhoc log
          </p>
          <h1 className={styles.adhocHeroName}>{project.name}</h1>
          <p className={styles.adhocHeroMeta}>
            <span>{account.name}</span>
            {brand && <span>{brand.name}</span>}
            <span>{project.period}</span>
            <span>{project.services.join(' + ')}</span>
          </p>
        </div>

        <div className={styles.adhocNoteBlock}>
          <p className={styles.adhocNoteLabel}>Brief</p>
          <p className={styles.adhocNoteText}>{project.briefNote}</p>
        </div>

        <div className={styles.adhocNoteBlock}>
          <p className={styles.adhocNoteLabel}>Outcome</p>
          <p className={styles.adhocNoteText}>{project.outcomeNote}</p>
        </div>

        <div className={styles.adhocPromoStrip}>
          <p className={styles.adhocPromoText}>
            This is an adhoc log — lightweight capture only. To promote to a full case study with
            patterns, goals, and reference tags, coordinate with your account lead.
          </p>
        </div>
      </div>
    );
  }

  /* ── Full case ──────────────────────────────────────────────── */
  const p = project;

  return (
    <div className={styles.projectPage}>
      <p className={styles.breadcrumb}>
        Knowledge Base ›{' '}
        <Link href="/knowledge-base/client-insight/portfolio" style={{ color: 'inherit', textDecoration: 'none' }}>
          Client Portfolio
        </Link>{' '}
        ›{' '}
        <Link href={`/knowledge-base/client-insight/portfolio/${account.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
          {account.name}
        </Link>{' '}
        › {p.name}
      </p>

      {/* Hero */}
      <div className={styles.projectHero}>
        <p className={styles.projectHeroType}>
          <span className={`material-icons-round ${styles.projectHeroTypeIcon}`}>menu_book</span>
          Full case · {account.name}{brand ? ` · ${brand.name}` : ''}
        </p>
        <h1 className={styles.projectHeroName}>{p.name}</h1>
        <p className={styles.projectHeroMeta}>
          <span>{p.period}</span>
          <span>{p.services.join(' + ')}</span>
          <span>Locked {p.version}</span>
          <span>Verified {p.lastVerified}</span>
        </p>
        <p className={styles.projectHeroOutcome}>{p.outcomeHeadline}</p>
      </div>

      {/* Metrics strip */}
      {p.outcomeMetrics.length > 0 && (
        <div className={styles.metricsStrip}>
          {p.outcomeMetrics.map((m, i) => (
            <div key={i} className={styles.metricCard}>
              <p className={styles.metricValue}>{m.value}</p>
              <p className={styles.metricLabel}>{m.label}</p>
              <p className={styles.metricSource}>{m.source}</p>
            </div>
          ))}
        </div>
      )}

      {/* Section 01 — Project Objective */}
      {p.projectObjective && (
        <div className={styles.sectionBlock}>
          <div className={styles.secHeader}>
            <span className={styles.secNum}>01</span>
            Project Objective
          </div>
          <div className={styles.objectiveCard}>
            <p className={styles.objectiveText}>{p.projectObjective}</p>
          </div>
        </div>
      )}

      {/* Section 02 — Concept & Approach */}
      {(p.concept || p.contentStrategy) && (
        <div className={styles.sectionBlock}>
          <div className={styles.secHeader}>
            <span className={styles.secNum}>02</span>
            Concept &amp; Approach
          </div>
          <div className={styles.conceptTwoCol}>
            {p.concept && (
              <div className={styles.conceptBlock}>
                <p className={styles.conceptSubLabel}>Concept</p>
                <p className={styles.conceptText}>{p.concept}</p>
              </div>
            )}
            {p.contentStrategy && (
              <div className={styles.conceptBlock}>
                <p className={styles.conceptSubLabel}>Content Strategy</p>
                <p className={styles.conceptText}>{p.contentStrategy}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Section 03 — Timeline */}
      {p.timeline && p.timeline.length > 0 && (
        <div className={styles.sectionBlock}>
          <div className={styles.secHeader}>
            <span className={styles.secNum}>03</span>
            Timeline
          </div>
          <div className={styles.timelineList}>
            {p.timeline.map((t, i) => (
              <div key={i} className={styles.timelineRow}>
                <span className={styles.timelineDate}>{t.date}</span>
                <span className={styles.timelineDot} />
                <span className={styles.timelineMilestone}>{t.milestone}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 04 — Audience */}
      {(p.targetAudience || p.audienceReached) && (
        <div className={styles.sectionBlock}>
          <div className={styles.secHeader}>
            <span className={styles.secNum}>04</span>
            Audience
          </div>
          <div className={styles.conceptTwoCol}>
            {p.targetAudience && (
              <div className={styles.conceptBlock}>
                <p className={styles.conceptSubLabel}>Target Audience</p>
                <p className={styles.conceptText}>{p.targetAudience}</p>
              </div>
            )}
            {p.audienceReached && (
              <div className={styles.conceptBlock}>
                <p className={styles.conceptSubLabel}>Audience Reached</p>
                <p className={styles.conceptText}>{p.audienceReached}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Section 05 — Performance Results */}
      {p.kpis && p.kpis.length > 0 && (
        <div className={styles.sectionBlock}>
          <div className={styles.secHeader}>
            <span className={styles.secNum}>05</span>
            Performance Results
          </div>
          <table className={styles.kpiTable}>
            <thead>
              <tr>
                <th className={styles.kpiTh}>KPI</th>
                <th className={styles.kpiTh}>Target</th>
                <th className={styles.kpiTh}>Achieved</th>
                <th className={styles.kpiTh}>Status</th>
              </tr>
            </thead>
            <tbody>
              {p.kpis.map((k, i) => (
                <tr key={i} className={styles.kpiRow}>
                  <td className={styles.kpiTd}>{k.name}</td>
                  <td className={styles.kpiTd}>{k.target}</td>
                  <td className={styles.kpiTd} style={{ fontWeight: 600 }}>{k.achieved}</td>
                  <td className={styles.kpiTd}>
                    <span className={k.met ? styles.kpiPillMet : styles.kpiPillMiss}>
                      {k.met ? 'Met' : 'Missed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Section 06 — Project Patterns */}
      {p.patterns.length > 0 && (
        <div className={styles.sectionBlock}>
          <div className={styles.secHeader}>
            <span className={styles.secNum}>06</span>
            Pattern Library
          </div>
          <div className={styles.patternGrid}>
            {p.patterns.map((pat, i) => (
              <div key={pat.id} className={styles.patternCard}>
                <p className={styles.patternEyebrow}>Pattern · {String(i + 1).padStart(2, '0')}</p>
                <p className={styles.patternTitle}>{pat.title}</p>
                <p className={styles.patternApplies}>Applies to: {pat.appliesTo}</p>
                <p className={styles.patternInsight}>{pat.insight}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 07 — Reference Index */}
      {(p.tagClusters.length > 0 || p.linkedEntities.length > 0) && (
        <div className={styles.sectionBlock}>
          <div className={styles.secHeader}>
            <span className={styles.secNum}>07</span>
            Reference Index
          </div>
          {p.tagClusters.length > 0 && (
            <div className={styles.tagClustersGrid} style={{ marginBottom: p.linkedEntities.length > 0 ? '20px' : undefined }}>
              {p.tagClusters.map((cl, i) => (
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
          {p.linkedEntities.length > 0 && (
            <div className={styles.linkedGrid}>
              {p.linkedEntities.map((e, i) => (
                <span key={i} className={styles.linkedChip}>
                  <span className={styles.linkedKind}>{e.kind}</span>
                  {e.label}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Narrative outcomes (awards / recognition) */}
      {p.narrativeOutcomes.length > 0 && (
        <div className={styles.sectionBlock}>
          <div className={styles.narrativeOutcomes}>
            {p.narrativeOutcomes.map((n, i) => (
              <div key={i} className={styles.narrativeChip}>
                <span className={`material-icons-round ${styles.narrativeChipIcon}`}>
                  {n.type === 'award' ? 'emoji_events' : n.type === 'recognition' ? 'auto_awesome' : 'menu_book'}
                </span>
                {n.text}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Phase 2 stub */}
      <div className={styles.phaseStubStrip}>
        <div className={styles.phaseStubCard}>
          <p className={styles.phaseStubLabel}>Phase 2</p>
          <p className={styles.phaseStubTitle}>ROI calculator — pending</p>
        </div>
        <div className={styles.phaseStubCard}>
          <p className={styles.phaseStubLabel}>Phase 2</p>
          <p className={styles.phaseStubTitle}>Replication checklist — pending</p>
        </div>
      </div>
    </div>
  );
}
