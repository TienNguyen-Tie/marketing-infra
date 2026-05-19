import Link from 'next/link';
import { getAllPersonas, getAllPersonaStats } from '@/data/personas/helpers';
import { getIcpBySlug } from '@/data/icps/helpers';
import type { Persona, PersonaType, SeniorityLevel } from '@/data/personas/types';
import { getDraftsForKind } from '@/lib/drafts/helpers';
import PersonaListingClient from '@/components/drafts/PersonaListingClient';
import styles from './personas.module.css';

const PERSONA_TYPE_LABELS: Record<PersonaType, string> = {
  champion: 'Champion',
  influencer: 'Influencer',
  blocker: 'Blocker',
  gatekeeper: 'Gatekeeper',
  mixed: 'Mixed',
};

const SENIORITY_LABELS: Record<SeniorityLevel, string> = {
  operator: 'Operator',
  manager: 'Manager',
  director: 'Director',
  executive: 'Executive',
};

function PersonaCard({ persona }: { persona: Persona }) {
  const icpSlugs = persona.icpVariations?.map(v => v.icpSlug) ?? [];
  const visibleIcpSlugs = icpSlugs.slice(0, 3);
  const overflowCount = icpSlugs.length - 3;

  return (
    <div className={styles.personaCard}>
      <div className={styles.cardTopRow}>
        <div className={styles.cardAvatarGroup}>
          <span className={styles.cardAvatar}>{persona.shortCode}</span>
          <div>
            <p className={styles.cardName}>{persona.name}</p>
            <span className={styles.cardShortCode}>{persona.shortCode}</span>
          </div>
        </div>
        <span className={`${styles.typePill} ${styles[`type--${persona.personaType}`]}`}>
          {PERSONA_TYPE_LABELS[persona.personaType]}
        </span>
      </div>

      <div className={styles.cardSubRow}>
        <span className={`${styles.seniorityPill} ${styles[`seniority--${persona.seniorityLevel}`]}`}>
          {SENIORITY_LABELS[persona.seniorityLevel]}
        </span>
        <span className={styles.cardTitleCount}>{persona.typicalJobTitles.length} typical titles</span>
      </div>

      {persona.snapshot?.oneSentenceDefinition ? (
        <p className={styles.cardDefinition}>{persona.snapshot.oneSentenceDefinition}</p>
      ) : (
        <p className={`${styles.cardDefinition} ${styles.muted}`}>Definition not yet captured.</p>
      )}

      <div className={styles.cardIcpPills}>
        {visibleIcpSlugs.map(slug => {
          const icp = getIcpBySlug(slug);
          return icp ? (
            <Link
              key={slug}
              href={`/knowledge-base/client-insight/icps/${slug}`}
              className={styles.icpPill}
            >
              {icp.name.split(' ')[0]}…
            </Link>
          ) : (
            <span key={slug} className={styles.icpPill}>{slug}</span>
          );
        })}
        {overflowCount > 0 && (
          <span className={styles.icpPillOverflow}>+{overflowCount}</span>
        )}
        {icpSlugs.length === 0 && (
          <span className={`${styles.icpPill} ${styles.muted}`}>No ICP linked yet</span>
        )}
      </div>

      <div className={styles.cardFooter}>
        <Link href={`/knowledge-base/client-insight/personas/${persona.slug}`} className={styles.viewLink}>
          View persona →
        </Link>
      </div>
    </div>
  );
}

export default async function PersonasPage() {
  const allPersonas = getAllPersonas();
  const stats = getAllPersonaStats();
  const personaDrafts = await getDraftsForKind('persona');

  const personaGrid = allPersonas.length === 0 ? (
    <div className={styles.emptyState}>
      <p className={styles.emptyTitle}>No personas defined yet</p>
      <p className={styles.emptyBody}>
        Personas describe role archetypes — the types of people inside companies who champion,
        evaluate, block, or approve deals. Add them to{' '}
        <code>data/personas/personas.ts</code> following the type definition.
      </p>
    </div>
  ) : (
    <div className={styles.personaGrid}>
      {allPersonas.map(persona => (
        <PersonaCard key={persona.slug} persona={persona} />
      ))}
    </div>
  );

  return (
    <div className={styles.page}>
      <p className={styles.breadcrumb}>
        Knowledge Base ›{' '}
        <Link href="/knowledge-base/client-insight" style={{ color: 'inherit', textDecoration: 'none' }}>
          Client Insight
        </Link>{' '}
        › Decision-maker Personas
      </p>

      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <h1 className={styles.heroH1}>Decision-maker Personas</h1>
          <p className={styles.heroSubtitle}>
            Personas describe the <em>people</em> inside companies — their pressures, decision styles,
            and communication preferences. They complement ICPs (which describe the company types).
            Every deal lives at the intersection: a specific company × specific person × specific moment.
            Sharp personas make the people side legible.
          </p>
        </div>
      </div>

      <div className={styles.statsStrip}>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{stats.totalPersonas}</span>
          <span className={styles.statLabel}>Personas Defined</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{stats.primaryDeciders}</span>
          <span className={styles.statLabel}>Primary Deciders</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{stats.championCandidates}</span>
          <span className={styles.statLabel}>Champion Candidates</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNum}>{stats.gatekeepers}</span>
          <span className={styles.statLabel}>Gatekeepers</span>
        </div>
      </div>

      <PersonaListingClient
        personaDrafts={personaDrafts}
        addBtnClassName={styles.addPersonaBtn}
      >
        {personaGrid}
      </PersonaListingClient>
    </div>
  );
}
