import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getAllMarkets,
  getMarketBySlug,
  getArchetypesByMarket,
  getArchetypeCountInNetwork,
  getMarketCountInNetwork,
} from '@/data/creators/helpers';
import styles from './page.module.css';

// ─── Static params ────────────────────────────────────────────

export async function generateStaticParams() {
  return getAllMarkets().map(m => ({ marketSlug: m.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: Promise<{ marketSlug: string }> }
): Promise<Metadata> {
  const { marketSlug } = await params;
  const market = getMarketBySlug(marketSlug);
  if (!market) return { title: 'Market not found' };
  return { title: `${market.name} · Creator Markets` };
}

// ─── Inline mini-components ───────────────────────────────────

function GroupDivider({ label }: { label: string }) {
  return (
    <div className={styles.groupDivider}>
      <span className={styles.groupEyebrow}>{label}</span>
      <div className={styles.groupLine} />
    </div>
  );
}

function SectionHeader({
  num,
  title,
  subtitle,
}: {
  num: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className={styles.sectionHeader}>
      <div className={styles.sectionChip}>{num}</div>
      <div className={styles.sectionTitleStack}>
        <span className={styles.sectionTitle}>{title}</span>
        {subtitle && <span className={styles.sectionSubtitle}>{subtitle}</span>}
      </div>
    </div>
  );
}

function FieldCell({
  label,
  fullWidth,
  children,
}: {
  label: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={[styles.fieldCell, fullWidth ? styles.fieldGridFullWidth : '']
        .join(' ')
        .trim()}
    >
      {label && <span className={styles.fieldLabel}>{label}</span>}
      {children}
    </div>
  );
}

function Muted({ text = 'Not yet captured' }: { text?: string }) {
  return <span className={styles.fieldMuted}>{text}</span>;
}

// ─── Pill class maps ──────────────────────────────────────────

const TIER_PILL_CLASS: Record<string, string> = {
  core: styles.populationTierCore,
  emerging: styles.populationTierEmerging,
  niche: styles.populationTierNiche,
};

const TIER_LABEL: Record<string, string> = {
  core: 'Core',
  emerging: 'Emerging',
  niche: 'Niche',
};

const STATUS_PILL_CLASS: Record<string, string> = {
  active: styles.statusActive,
  proposed: styles.statusProposed,
  sunset: styles.statusSunset,
};

const STATUS_LABEL: Record<string, string> = {
  active: 'Active',
  proposed: 'Proposed',
  sunset: 'Sunset',
};

// ─── Page ─────────────────────────────────────────────────────

export default async function MarketDetailPage({
  params,
}: {
  params: Promise<{ marketSlug: string }>;
}) {
  const { marketSlug } = await params;
  const market = getMarketBySlug(marketSlug);
  if (!market) notFound();

  const archetypesInMarket = getArchetypesByMarket(market.slug);
  const estimatedCount = getMarketCountInNetwork(market.slug);

  return (
    <div className={styles.page}>
      {/* ── Breadcrumb ─────────────────────────────────────── */}
      <p className={styles.breadcrumb}>
        <Link href="/knowledge-base/creators/markets">Markets</Link>
        {' · '}
        {market.name}
      </p>

      {/* ── Hero ───────────────────────────────────────────── */}
      <div className={styles.hero}>
        <div className={styles.heroRow}>
          <div className={styles.heroLeft}>
            <p className={styles.heroEyebrow}>{market.countryCode}</p>
            <h1 className={styles.h1}>{market.name}</h1>
            <p className={styles.heroSubtitle}>{market.oneLiner}</p>
          </div>
          <div className={styles.heroRight}>
            <span
              className={[
                styles.statusPill,
                STATUS_PILL_CLASS[market.status] ?? '',
              ].join(' ')}
            >
              {STATUS_LABEL[market.status] ?? market.status}
            </span>
            {market.lastReviewed && (
              <span className={styles.heroReviewed}>
                Reviewed {market.lastReviewed}
              </span>
            )}
          </div>
        </div>

        {/* Stats strip */}
        <div className={styles.statsStrip}>
          <div className={styles.statCell}>
            <span className={styles.statValue}>{archetypesInMarket.length}</span>
            <span className={styles.statLabel}>Archetypes</span>
            <span className={styles.statSubtitle}>active in this market</span>
          </div>
          <div className={styles.statCell}>
            <span className={styles.statValue}>
              {estimatedCount > 0 ? estimatedCount.toLocaleString() : '—'}
            </span>
            <span className={styles.statLabel}>Est. TAP Creators</span>
            <span className={styles.statSubtitle}>curated estimate</span>
          </div>
          <div className={styles.statCell}>
            <span className={styles.statValue}>{market.countryCode}</span>
            <span className={styles.statLabel}>Country Code</span>
            <span className={styles.statSubtitle}>ISO 3166-1 alpha-2</span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP A · MARKET PROFILE
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="Group A · Market Profile" />

      {/* Section 01 — Market Overview */}
      <div className={styles.section}>
        <SectionHeader
          num="01"
          title="Market Overview"
          subtitle="Identity fields and review metadata"
        />
        <div className={styles.fieldGrid}>
          <FieldCell label="Country Code">
            <span className={styles.fieldValue}>{market.countryCode}</span>
          </FieldCell>
          <FieldCell label="Status">
            <span className={styles.fieldValue}>
              {STATUS_LABEL[market.status] ?? market.status}
            </span>
          </FieldCell>
          <FieldCell label="First Defined">
            <span className={styles.fieldValue}>{market.firstDefined}</span>
          </FieldCell>
          <FieldCell label="Last Reviewed">
            {market.lastReviewed ? (
              <span className={styles.fieldValue}>{market.lastReviewed}</span>
            ) : (
              <Muted />
            )}
          </FieldCell>
          {market.internalNotes && (
            <FieldCell label="Internal Notes" fullWidth>
              <span className={styles.fieldValue}>{market.internalNotes}</span>
            </FieldCell>
          )}
        </div>
      </div>

      {/* Section 02 — Market Thesis */}
      <div className={styles.section}>
        <SectionHeader
          num="02"
          title="Market Thesis"
          subtitle="The one-sentence frame for this market"
        />
        <p className={styles.quoteBody}>{market.oneLiner}</p>
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP B · MACRO CONTEXT
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="Group B · Macro Context" />

      {/* Section 03 — Creator Economy & Platform Behavior */}
      <div className={styles.section}>
        <SectionHeader
          num="03"
          title="Creator Economy & Platform Behavior"
          subtitle="Maturity level, dominant behaviors, and platform dynamics"
        />
        <div className={styles.fieldGrid}>
          <FieldCell label="Creator Economy Maturity" fullWidth>
            {market.macroContext?.creatorEconomyMaturity ? (
              <p className={styles.paragraphBody}>
                {market.macroContext.creatorEconomyMaturity}
              </p>
            ) : (
              <Muted />
            )}
          </FieldCell>
          <FieldCell label="Platform Behavior Notes" fullWidth>
            {market.macroContext?.platformBehaviorNotes ? (
              <p className={styles.paragraphBody}>
                {market.macroContext.platformBehaviorNotes}
              </p>
            ) : (
              <Muted />
            )}
          </FieldCell>
        </div>
      </div>

      {/* Section 04 — Categories & Regulation */}
      <div className={styles.section}>
        <SectionHeader
          num="04"
          title="Categories & Regulation"
          subtitle="Top-performing content categories and regulatory considerations"
        />
        <div className={styles.fieldGrid}>
          <FieldCell label="Top Content Categories" fullWidth>
            {market.macroContext?.topContentCategories ? (
              <p className={styles.paragraphBody}>
                {market.macroContext.topContentCategories}
              </p>
            ) : (
              <Muted />
            )}
          </FieldCell>
          <FieldCell label="Regulation Notes" fullWidth>
            {market.macroContext?.regulationNotes ? (
              <p className={styles.paragraphBody}>
                {market.macroContext.regulationNotes}
              </p>
            ) : (
              <Muted />
            )}
          </FieldCell>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP C · TAP OPERATIONS
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="Group C · TAP Operations" />

      {/* Section 05 — TAP Presence */}
      <div className={styles.section}>
        <SectionHeader
          num="05"
          title="TAP Presence"
          subtitle="Depth and coverage of VinaCapital's TAP network in this market"
        />
        <div className={styles.fieldGrid}>
          <FieldCell label="Presence Level" fullWidth>
            {market.operationalNotes?.tapPresenceLevel ? (
              <p className={styles.paragraphBody}>
                {market.operationalNotes.tapPresenceLevel}
              </p>
            ) : (
              <Muted />
            )}
          </FieldCell>
        </div>
      </div>

      {/* Section 06 — Operational Details */}
      <div className={styles.section}>
        <SectionHeader
          num="06"
          title="Operational Details"
          subtitle="Languages, payment infrastructure, and logistics"
        />
        <div className={styles.fieldGrid}>
          <FieldCell label="Preferred Languages">
            {market.operationalNotes?.preferredLanguages ? (
              <span className={styles.fieldValue}>
                {market.operationalNotes.preferredLanguages}
              </span>
            ) : (
              <Muted />
            )}
          </FieldCell>
          <FieldCell label="Payment Infrastructure">
            {market.operationalNotes?.paymentInfrastructure ? (
              <span className={styles.fieldValue}>
                {market.operationalNotes.paymentInfrastructure}
              </span>
            ) : (
              <Muted />
            )}
          </FieldCell>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP D · ARCHETYPES IN THIS MARKET
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="Group D · Archetypes in This Market" />

      {/* Section 07 — Archetypes Active in This Market */}
      <div className={styles.section}>
        <SectionHeader
          num="07"
          title="Archetypes Active in This Market"
          subtitle="Creator archetypes with presence in this geography"
        />
        {archetypesInMarket.length === 0 ? (
          <div className={styles.ghostCard}>
            No archetypes have been mapped to this market yet. As the team defines creator
            archetypes for this geography, they will appear here automatically.
          </div>
        ) : (
          <div className={styles.archetypeGrid}>
            {archetypesInMarket.map(archetype => {
              const count = getArchetypeCountInNetwork(archetype.slug);
              return (
                <Link
                  key={archetype.slug}
                  href={`/knowledge-base/creators/archetypes/${archetype.slug}`}
                  className={styles.archetypeCard}
                >
                  <div className={styles.archetypeCardHeader}>
                    <span
                      className={[
                        styles.populationTierPill,
                        TIER_PILL_CLASS[archetype.populationTier] ?? '',
                      ].join(' ')}
                    >
                      {TIER_LABEL[archetype.populationTier] ?? archetype.populationTier}
                    </span>
                    {archetype.status !== 'active' && (
                      <span
                        className={[
                          styles.statusPill,
                          STATUS_PILL_CLASS[archetype.status] ?? '',
                        ].join(' ')}
                      >
                        {STATUS_LABEL[archetype.status] ?? archetype.status}
                      </span>
                    )}
                  </div>
                  <p className={styles.archetypeCardTitle}>{archetype.name}</p>
                  <p className={styles.archetypeCardOneLiner}>
                    {archetype.oneSentenceDefinition}
                  </p>
                  <div className={styles.archetypeCardMeta}>
                    <span className={styles.archetypeCardMetaLabel}>
                      Estimated in Network
                    </span>
                    <span className={styles.archetypeCardMetaValue}>
                      {count > 0 ? count.toLocaleString() : '—'}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
