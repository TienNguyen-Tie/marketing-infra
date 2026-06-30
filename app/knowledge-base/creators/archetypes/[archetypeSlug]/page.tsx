import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllArchetypes,
  getArchetypeBySlug,
  getArchetypeCountInNetwork,
  getMarketBySlug,
  POPULATION_TIER_LABELS,
  CONTENT_FORMAT_LABELS,
  AUDIENCE_SIZE_BAND_LABELS,
} from '@/data/creators/helpers';
import type { CreatorArchetype, CreatorMarket } from '@/data/creators/types';
import styles from './page.module.css';

/* ── Static params + metadata ───────────────────────────── */

export async function generateStaticParams() {
  return getAllArchetypes().map(a => ({ archetypeSlug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ archetypeSlug: string }>;
}): Promise<Metadata> {
  const { archetypeSlug } = await params;
  const a = getArchetypeBySlug(archetypeSlug);
  if (!a) return { title: 'Archetype not found' };
  return {
    title: `${a.name} — Creator Archetypes — VinaCapital`,
    description: a.oneSentenceDefinition,
  };
}

/* ── Mini-components ─────────────────────────────────────── */

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
      <span className={styles.sectionChip}>{num}</span>
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
    <div className={`${styles.fieldCell}${fullWidth ? ' ' + styles.fieldGridFullWidth : ''}`}>
      <span className={styles.fieldLabel}>{label}</span>
      {children}
    </div>
  );
}

function Muted({ text = 'Not yet captured' }: { text?: string }) {
  return <span className={styles.fieldMuted}>{text}</span>;
}

const TIER_PILL_CLASS: Record<string, string> = {
  core: styles.populationTierCore,
  emerging: styles.populationTierEmerging,
  niche: styles.populationTierNiche,
};

const ACQUISITION_PILL_CLASS: Record<string, string> = {
  established: styles.acquisitionEstablished,
  accessible: styles.acquisitionAccessible,
  effortful: styles.acquisitionEffortful,
  hard: styles.acquisitionHard,
};

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ── Ghost rows for empty lists ──────────────────────────── */

function GhostRows({ count, message }: { count: number; message: string }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.ghostRow}>{message}</div>
      ))}
    </>
  );
}

/* ── Page ────────────────────────────────────────────────── */

export default async function ArchetypeDetailPage({
  params,
}: {
  params: Promise<{ archetypeSlug: string }>;
}) {
  const { archetypeSlug } = await params;
  const archetype = getArchetypeBySlug(archetypeSlug);
  if (!archetype) notFound();

  const a = archetype;
  const estimatedCount = getArchetypeCountInNetwork(a.slug);
  const activeMarkets = a.marketsActive
    .map(slug => getMarketBySlug(slug))
    .filter((m): m is NonNullable<typeof m> => m !== undefined);

  return (
    <article className={styles.page}>
      {/* ── Breadcrumb ────────────────────────────────────── */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <a href="/knowledge-base">Knowledge Base</a>
        {' › '}
        <a href="/knowledge-base/creators/archetypes">Archetypes</a>
        {' › '}
        <span>{a.name}</span>
      </nav>

      {/* ── Hero ──────────────────────────────────────────── */}
      <div className={styles.hero}>
        <div className={styles.heroRow}>
          <div className={styles.heroLeft}>
            <p className={styles.heroEyebrow}>
              Creator Archetype · {POPULATION_TIER_LABELS[a.populationTier]}
            </p>
            <h1 className={styles.h1}>{a.name}</h1>
            <p className={styles.heroSubtitle}>{a.oneSentenceDefinition}</p>
          </div>
          <div className={styles.heroRight}>
            {a.status !== 'active' && (
              <span className={`${styles.statusPill} ${a.status === 'proposed' ? styles.statusProposed : styles.statusSunset}`}>
                {a.status === 'proposed' ? 'Proposed · Pending Verification' : 'Sunset'}
              </span>
            )}
            <span className={styles.heroReviewed}>
              Last reviewed: {a.lastReviewed ?? 'Not yet reviewed'}
            </span>
            <a href="/knowledge-base/creators/archetypes" className={styles.heroLink}>
              View all archetypes →
            </a>
          </div>
        </div>
      </div>

      {/* ── Stats strip ───────────────────────────────────── */}
      <div className={styles.statsStrip}>
        <div className={styles.statCell}>
          <span className={styles.statValue}>{estimatedCount.toLocaleString()}</span>
          <span className={styles.statLabel}>Active in TAP Network</span>
          <span className={styles.statSubtitle}>estimated, from network snapshot</span>
        </div>
        <div className={styles.statCell}>
          <span className={styles.statValue}>{a.marketsActive.length}</span>
          <span className={styles.statLabel}>Markets Active</span>
        </div>
        <div className={styles.statCell}>
          <span className={styles.statValue}>{a.typicalContentFormats.length}</span>
          <span className={styles.statLabel}>Content Formats</span>
        </div>
        <div className={styles.statCell}>
          <span className={styles.statValue}>{POPULATION_TIER_LABELS[a.populationTier]}</span>
          <span className={styles.statLabel}>Population Tier</span>
        </div>
      </div>

      {/* ── Group A · Identity ────────────────────────────── */}
      <GroupDivider label="Group A · Identity" />

      {/* Section 01 */}
      <div className={styles.section}>
        <SectionHeader num="01" title="Archetype Profile" subtitle="Identity at a glance" />
        <div className={styles.fieldGrid}>
          <FieldCell label="Name">
            <span className={styles.fieldValue}>{a.name}</span>
          </FieldCell>
          <FieldCell label="Short Code">
            {a.shortCode
              ? <span className={styles.fieldValue}>{a.shortCode}</span>
              : <Muted />}
          </FieldCell>
          <FieldCell label="Population Tier">
            <span className={`${styles.populationTierPill} ${TIER_PILL_CLASS[a.populationTier] ?? ''}`}>
              {POPULATION_TIER_LABELS[a.populationTier]}
            </span>
          </FieldCell>
          <FieldCell label="Status">
            <span className={`${styles.statusPill} ${a.status === 'active' ? styles.statusActive : a.status === 'proposed' ? styles.statusProposed : styles.statusSunset}`}>
              {capitalize(a.status)}
            </span>
          </FieldCell>
          <FieldCell label="Content Formats">
            {a.typicalContentFormats.length > 0 ? (
              <div className={styles.pillRow}>
                {a.typicalContentFormats.map(f => (
                  <span key={f} className={styles.smallPill}>{CONTENT_FORMAT_LABELS[f]}</span>
                ))}
              </div>
            ) : <Muted />}
          </FieldCell>
          <FieldCell label="Markets Active">
            {a.marketsActive.length > 0 ? (
              <div className={styles.pillRow}>
                {a.marketsActive.map(slug => (
                  <a key={slug} href={`/knowledge-base/creators/markets/${slug}`} className={styles.smallPillLink}>
                    {slug.toUpperCase()}
                  </a>
                ))}
              </div>
            ) : <Muted />}
          </FieldCell>
          <FieldCell label="First Defined">
            <span className={styles.fieldValue}>{a.firstDefined}</span>
          </FieldCell>
          <FieldCell label="Last Reviewed">
            {a.lastReviewed
              ? <span className={styles.fieldValue}>{a.lastReviewed}</span>
              : <Muted />}
          </FieldCell>
          <FieldCell label="Internal Notes" fullWidth>
            {a.internalNotes
              ? <span className={styles.fieldValue}>{a.internalNotes}</span>
              : <Muted />}
          </FieldCell>
        </div>
      </div>

      {/* Section 02 */}
      <div className={styles.section}>
        <SectionHeader num="02" title="Definition & Recognition" subtitle="What makes a creator fit this archetype" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <p className={styles.quoteBody}>{a.oneSentenceDefinition}</p>
          </div>
          <div>
            <p className={styles.fieldLabel} style={{ marginBottom: 8 }}>Recognition Cues</p>
            {a.recognitionCues
              ? <p className={styles.paragraphBody}>{a.recognitionCues}</p>
              : <Muted />}
          </div>
        </div>
      </div>

      {/* ── Group B · How They Operate ────────────────────── */}
      <GroupDivider label="Group B · How They Operate" />

      {/* Section 03 */}
      <div className={styles.section}>
        <SectionHeader num="03" title="Content & Behavior" subtitle="What they produce and how" />
        <div className={styles.fieldGrid}>
          <FieldCell label="Primary Content Format">
            {a.contentAndBehavior?.primaryContentFormat
              ? <span className={styles.fieldValue}>{a.contentAndBehavior.primaryContentFormat}</span>
              : <Muted />}
          </FieldCell>
          <FieldCell label="Posting Cadence">
            {a.contentAndBehavior?.postingCadence
              ? <span className={styles.fieldValue}>{a.contentAndBehavior.postingCadence}</span>
              : <Muted />}
          </FieldCell>
          <FieldCell label="Content Themes" fullWidth>
            {a.contentAndBehavior?.contentThemes
              ? <span className={styles.fieldValue}>{a.contentAndBehavior.contentThemes}</span>
              : <Muted />}
          </FieldCell>
          <FieldCell label="Livestream Comfort" fullWidth>
            {a.contentAndBehavior?.livestreamComfort
              ? <span className={styles.fieldValue}>{a.contentAndBehavior.livestreamComfort}</span>
              : <Muted />}
          </FieldCell>
        </div>
      </div>

      {/* Section 04 */}
      <div className={styles.section}>
        <SectionHeader num="04" title="Audience Profile" subtitle="Who follows them and why" />
        <div className={styles.fieldGrid}>
          <FieldCell label="Audience Size Bands">
            {(a.audienceProfile?.audienceSizeBands ?? []).length > 0 ? (
              <div>
                <div className={styles.pillRow}>
                  {a.audienceProfile!.audienceSizeBands!.map(b => (
                    <span key={b} className={styles.smallPill}>{AUDIENCE_SIZE_BAND_LABELS[b]}</span>
                  ))}
                </div>
                {a.audienceProfile?.audienceSizeNotes && (
                  <p className={styles.audienceSizeNote}>{a.audienceProfile.audienceSizeNotes}</p>
                )}
              </div>
            ) : <Muted text="Audience size pattern not yet captured" />}
          </FieldCell>
          <FieldCell label="Audience Demographics">
            {a.audienceProfile?.audienceDemographics
              ? <span className={styles.fieldValue}>{a.audienceProfile.audienceDemographics}</span>
              : <Muted />}
          </FieldCell>
          <FieldCell label="Audience Purchase Intent" fullWidth>
            {a.audienceProfile?.audiencePurchaseIntent
              ? <span className={styles.fieldValue}>{a.audienceProfile.audiencePurchaseIntent}</span>
              : <Muted />}
          </FieldCell>
          <FieldCell label="What Earns Their Trust" fullWidth>
            {a.audienceProfile?.whatEarnsAudienceTrust
              ? <span className={styles.fieldValue}>{a.audienceProfile.whatEarnsAudienceTrust}</span>
              : <Muted />}
          </FieldCell>
        </div>
      </div>

      {/* Section 05 */}
      <div className={styles.section}>
        <SectionHeader num="05" title="Commercial Behavior" subtitle="How they monetize and what they value commercially" />
        <div className={styles.fieldGrid}>
          <FieldCell label="Typical GMV Band">
            {a.commercialBehavior?.typicalGmvBand
              ? <span className={styles.fieldValue}>{a.commercialBehavior.typicalGmvBand}</span>
              : <Muted />}
          </FieldCell>
          <FieldCell label="Typical Content Win-Rate">
            {a.commercialBehavior?.typicalContentWinRate
              ? <span className={styles.fieldValue}>{a.commercialBehavior.typicalContentWinRate}</span>
              : <Muted />}
          </FieldCell>
          <FieldCell label="Commission Preferences" fullWidth>
            {a.commercialBehavior?.commissionPreferences
              ? <span className={styles.fieldValue}>{a.commercialBehavior.commissionPreferences}</span>
              : <Muted />}
          </FieldCell>
          <FieldCell label="Price Sensitivity" fullWidth>
            {a.commercialBehavior?.priceSensitivity
              ? <span className={styles.fieldValue}>{a.commercialBehavior.priceSensitivity}</span>
              : <Muted />}
          </FieldCell>
          <FieldCell label="Sample Expectations" fullWidth>
            {a.commercialBehavior?.sampleExpectations
              ? <span className={styles.fieldValue}>{a.commercialBehavior.sampleExpectations}</span>
              : <Muted />}
          </FieldCell>
        </div>
      </div>

      {/* ── Group C · Acquisition & Nurturing ────────────── */}
      <GroupDivider label="Group C · Acquisition & Nurturing" />

      {/* Section 06 */}
      <div className={styles.section}>
        <SectionHeader num="06" title="Acquisition Patterns" subtitle="How we recruit creators of this archetype" />

        {/* Pattern A — top fields */}
        <div className={`${styles.fieldGrid} ${styles.acquisitionTopBlock}`}>
          <FieldCell label="Acquisition Difficulty">
            {a.acquisitionPatterns?.acquisitionDifficulty ? (
              <span className={`${styles.acquisitionPill} ${ACQUISITION_PILL_CLASS[a.acquisitionPatterns.acquisitionDifficulty] ?? ''}`}>
                {capitalize(a.acquisitionPatterns.acquisitionDifficulty)}
              </span>
            ) : <Muted />}
          </FieldCell>
          <FieldCell label=""> {/* spacer */}
            <span />
          </FieldCell>
          <FieldCell label="Where They Cluster" fullWidth>
            {a.acquisitionPatterns?.whereTheyCluster
              ? <span className={styles.fieldValue}>{a.acquisitionPatterns.whereTheyCluster}</span>
              : <Muted />}
          </FieldCell>
        </div>

        {/* Pattern B — lists */}
        <p className={styles.listSubHeader}>Sourcing Channels That Work</p>
        {(a.acquisitionPatterns?.sourcingChannelsThatWork ?? []).length > 0 ? (
          <ul className={styles.bulletList}>
            {a.acquisitionPatterns!.sourcingChannelsThatWork!.map((item, i) => (
              <li key={i} className={styles.bulletItem}>
                <span className={styles.bulletDot} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <GhostRows count={3} message="Sourcing channel not yet captured" />
        )}

        <p className={styles.listSubHeader}>Outreach Hooks That Land</p>
        {(a.acquisitionPatterns?.outreachHooksThatLand ?? []).length > 0 ? (
          <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {a.acquisitionPatterns!.outreachHooksThatLand!.map((item, i) => (
              <li key={i} className={styles.numberedItem}>
                <span className={styles.numberedMarker}>{i + 1}</span>
                <span className={styles.numberedText}>{item}</span>
              </li>
            ))}
          </ol>
        ) : (
          <GhostRows count={3} message="Outreach hook not yet captured" />
        )}

        <p className={styles.listSubHeader}>Anti-Patterns</p>
        {(a.acquisitionPatterns?.antiPatterns ?? []).length > 0 ? (
          <ul className={styles.bulletList}>
            {a.acquisitionPatterns!.antiPatterns!.map((item, i) => (
              <li key={i} className={styles.antiPatternItem}>
                <span className={styles.antiPatternMarker}>×</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <GhostRows count={2} message="Anti-pattern not yet captured" />
        )}
      </div>

      {/* Section 07 */}
      <div className={styles.section}>
        <SectionHeader num="07" title="Nurturing & Retention" subtitle="What keeps them active, what causes drop-off" />
        <div className={styles.fieldGrid}>
          <FieldCell label="What Keeps Them Active" fullWidth>
            {a.nurturingAndRetention?.whatKeepsThemActive
              ? <span className={styles.fieldValue}>{a.nurturingAndRetention.whatKeepsThemActive}</span>
              : <Muted />}
          </FieldCell>
          <FieldCell label="Common Drop-Off Reasons" fullWidth>
            {a.nurturingAndRetention?.commonDropOffReasons
              ? <span className={styles.fieldValue}>{a.nurturingAndRetention.commonDropOffReasons}</span>
              : <Muted />}
          </FieldCell>
          <FieldCell label="What Makes Top Performers" fullWidth>
            {a.nurturingAndRetention?.whatMakesTopPerformers
              ? <span className={styles.fieldValue}>{a.nurturingAndRetention.whatMakesTopPerformers}</span>
              : <Muted />}
          </FieldCell>
          <FieldCell label="Deal-Breakers" fullWidth>
            {a.nurturingAndRetention?.dealBreakers
              ? <span className={styles.fieldValue}>{a.nurturingAndRetention.dealBreakers}</span>
              : <Muted />}
          </FieldCell>
        </div>
      </div>

      {/* ── Group D · Market Variations ───────────────────── */}
      <GroupDivider label="Group D · Market Variations" />

      {/* Section 08 */}
      <div className={styles.section}>
        <SectionHeader
          num="08"
          title="Market Variations"
          subtitle="How this archetype manifests across VN, PH, ID. Same archetype, different local realities."
        />
        {activeMarkets.length === 0 ? (
          <div className={styles.ghostCard}>No markets active for this archetype.</div>
        ) : (
          <div className={styles.marketVariationGrid}>
            {activeMarkets.map(market => {
              const variation = (a.marketVariations ?? []).find(v => v.marketSlug === market.slug);
              if (variation) {
                return (
                  <div key={market.slug} className={styles.marketVariationCard}>
                    <div className={styles.marketVariationHeader}>
                      <div className={styles.marketVariationLeft}>
                        <span className={styles.marketVariationCode}>{market.countryCode}</span>
                        <span className={styles.marketVariationName}>{market.name}</span>
                      </div>
                      <a
                        href={`/knowledge-base/creators/markets/${market.slug}`}
                        className={styles.marketVariationLink}
                      >
                        View market →
                      </a>
                    </div>
                    <p className={styles.marketVariationBody}>{variation.variationNote}</p>
                  </div>
                );
              }
              return (
                <div key={market.slug} className={styles.ghostMarketCard}>
                  <div className={styles.ghostMarketHeader}>
                    <span className={styles.ghostMarketCode}>{market.countryCode}</span>
                    <span className={styles.ghostMarketName}>{market.name}</span>
                  </div>
                  <p className={styles.ghostMarketText}>{market.name} variation not yet captured</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Group E · Notes & Evolution ───────────────────── */}
      <GroupDivider label="Group E · Notes & Evolution" />

      {/* Section 09 */}
      <div className={styles.section}>
        <SectionHeader
          num="09"
          title="Working Hypotheses"
          subtitle="Things the team is currently investigating about this archetype"
        />
        {(a.workingHypotheses ?? []).length > 0 ? (
          a.workingHypotheses!.map((h, i) => (
            <div key={i} className={styles.hypothesisRow}>
              <span
                className={`${styles.hypothesisDot} ${
                  h.status === 'active'
                    ? styles.hypothesisDotActive
                    : h.status === 'validated'
                    ? styles.hypothesisDotValidated
                    : styles.hypothesisDotDisproven
                }`}
              />
              <div className={styles.hypothesisBody}>
                <p className={styles.hypothesisStatement}>{h.statement}</p>
                <p className={styles.hypothesisFooter}>
                  Status: {capitalize(h.status)} · Recorded: {h.date ?? 'No date'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <GhostRows count={3} message="No working hypotheses recorded yet." />
        )}
      </div>

      {/* Section 10 */}
      <div className={styles.section}>
        <SectionHeader
          num="10"
          title="Open Questions"
          subtitle="Things we don't yet know about this archetype"
        />
        {(a.openQuestions ?? []).length > 0 ? (
          <div>
            {a.openQuestions!.map((q, i) => (
              <div key={i} className={styles.questionRow}>
                <span className={styles.questionMarker}>?</span>
                <span className={styles.questionText}>{q}</span>
              </div>
            ))}
          </div>
        ) : (
          <GhostRows count={2} message="No open questions recorded yet." />
        )}
      </div>
    </article>
  );
}
