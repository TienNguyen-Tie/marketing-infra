import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PORTFOLIO_ACCOUNTS } from '@/data/portfolio/accounts';
import {
  getAccountBySlug,
  getBrandBySlug,
  getBrandSlug,
  getProjectsByBrand,
  getDisplayName,
  getFullDisplayName,
} from '@/data/portfolio/helpers';
import { SERVICE_NAMES } from '@/data/portfolio/types';
import type { Brand, BrandStatus, ProductStatus } from '@/data/portfolio/types';
import { getInsightsForBrand } from '@/lib/research/helpers';
import RelevantResearchSection from '@/components/research/RelevantResearchSection';
import pStyles from '../../../../portfolio.module.css';
import styles from './brand.module.css';

export async function generateStaticParams() {
  return PORTFOLIO_ACCOUNTS.flatMap(account =>
    account.brands.map(brand => ({
      accountSlug: account.slug,
      brandSlug: getBrandSlug(brand),
    })),
  );
}

/* ── Colour maps ──────────────────────────────────────────── */

const BRAND_STATUS_CLASS: Record<BrandStatus, string> = {
  active:   styles['brandStatus--active'],
  prospect: styles['brandStatus--prospect'],
  pitched:  styles['brandStatus--pitched'],
  lapsed:   styles['brandStatus--lapsed'],
  paused:   styles['brandStatus--paused'],
};

const PRODUCT_STATUS_CLASS: Record<ProductStatus, string> = {
  hero:       styles['productStatus--hero'],
  active:     styles['productStatus--active'],
  upcoming:   styles['productStatus--upcoming'],
  considered: styles['productStatus--considered'],
  sunset:     styles['productStatus--sunset'],
};

/* ── Initials helpers ─────────────────────────────────────── */

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : parts[0].slice(0, 2).toUpperCase();
}

/* ── Shared UI primitives ─────────────────────────────────── */

function FieldMuted() {
  return <span className={pStyles.fieldMuted}>Not yet captured</span>;
}

function GroupDivider({ label }: { label: string }) {
  return (
    <div className={pStyles.groupDivider}>
      <span className={pStyles.groupEyebrow}>{label}</span>
      <span className={pStyles.groupDividerLine} />
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
    <div className={pStyles.dossSectionHeader}>
      <span className={pStyles.dossSectionNum}>{num}</span>
      <div className={pStyles.dossSectionTitles}>
        <span className={pStyles.dossSectionTitle}>{title}</span>
        {subtitle && <span className={pStyles.dossSectionSubtitle}>{subtitle}</span>}
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────── */

export default async function BrandPage({
  params,
}: {
  params: Promise<{ accountSlug: string; brandSlug: string }>;
}) {
  const { accountSlug, brandSlug } = await params;
  const account = getAccountBySlug(accountSlug);
  if (!account) notFound();

  const brand = getBrandBySlug(accountSlug, brandSlug) as Brand | undefined;
  if (!brand) notFound();

  const allProjectsByBrand = getProjectsByBrand(account);
  const brandProjects = allProjectsByBrand[brand.id] ?? [];
  const displayName = getDisplayName(account);
  const fullDisplayName = getFullDisplayName(account);

  const productCount = brand.products?.length ?? 0;
  const creatorCount = brand.brandTopCreators?.length ?? 0;
  const relevantInsights = await getInsightsForBrand(getBrandSlug(brand));

  return (
    <div className={styles.brandPage}>

      {/* ── Breadcrumb ── */}
      <p className={pStyles.breadcrumb}>
        Knowledge Base ›{' '}
        <Link
          href="/knowledge-base/client-insight/portfolio"
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          Client Portfolio
        </Link>{' '}
        ›{' '}
        <Link
          href={`/knowledge-base/client-insight/portfolio/${account.slug}`}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          {fullDisplayName}
        </Link>{' '}
        › {brand.name}
      </p>

      {/* ── Hero ── */}
      <div className={styles.brandHero}>
        <div className={styles.brandHeroLeft}>
          <p className={styles.brandHeroEyebrow}>
            BRAND · {displayName}
          </p>
          <h1 className={styles.brandHeroH1}>{brand.name}</h1>
          <p className={styles.brandHeroMeta}>
            {brand.subCategory ?? 'Sub-category not captured'} · {brand.targetConsumer ?? 'Audience not captured'}
          </p>
        </div>
        <div className={styles.brandHeroRight}>
          <span className={`${styles.brandHeroStatusPill} ${BRAND_STATUS_CLASS[brand.status]}`}>
            {brand.status}
          </span>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className={styles.brandStats}>
        <div className={styles.brandStatItem}>
          <span className={styles.brandStatNum}>{productCount > 0 ? productCount : '—'}</span>
          <span className={styles.brandStatLabel}>Products</span>
        </div>
        <div className={styles.brandStatItem}>
          <span className={styles.brandStatNum}>{brandProjects.length > 0 ? brandProjects.length : '—'}</span>
          <span className={styles.brandStatLabel}>Projects</span>
        </div>
        <div className={styles.brandStatItem}>
          <span className={styles.brandStatNum}>{creatorCount > 0 ? creatorCount : '—'}</span>
          <span className={styles.brandStatLabel}>Top Creators</span>
        </div>
        <div className={styles.brandStatItem}>
          <span className={styles.brandStatNum}>{brand.gmvLabel ?? '—'}</span>
          <span className={styles.brandStatLabel}>GMV</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP A · BRAND IDENTITY
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP A · BRAND IDENTITY" />

      {/* §01 · Brand Profile — Pattern A */}
      <div className={pStyles.dossSection}>
        <SectionHeader num="01" title="BRAND PROFILE" />
        <div className={pStyles.profileGrid}>
          {[
            ['BRAND NAME', brand.name],
            ['SUB-CATEGORY', brand.subCategory],
            ['PARENT PORTFOLIO', null],
            ['BRAND CONTACT', brand.brandManager],
            ['GMV', brand.gmvLabel],
          ].map(([label]) => {
            let value: React.ReactNode;
            if (label === 'PARENT PORTFOLIO') {
              value = (
                <Link
                  href={`/knowledge-base/client-insight/portfolio/${account.slug}`}
                  style={{ color: 'var(--red)', textDecoration: 'none', fontWeight: 500 }}
                >
                  {fullDisplayName}
                </Link>
              );
            } else if (label === 'SUB-CATEGORY') {
              value = brand.subCategory ?? <FieldMuted />;
            } else if (label === 'BRAND CONTACT') {
              value = brand.brandManager ?? <FieldMuted />;
            } else if (label === 'GMV') {
              value = brand.gmvLabel ?? <FieldMuted />;
            } else {
              value = brand.name;
            }
            return (
              <div key={String(label)} className={pStyles.profileRow}>
                <span className={pStyles.profileLabel}>{label}</span>
                <span className={pStyles.profileValue}>{value}</span>
              </div>
            );
          })}
          <div className={pStyles.profileRow}>
            <span className={pStyles.profileLabel}>STATUS</span>
            <span className={pStyles.profileValue}>
              <span
                className={`${pStyles.bpcStatusPill} ${pStyles[`bpcStatus--${brand.status}`]}`}
              >
                {brand.status}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* §02 · Brand Positioning & Voice — Pattern A */}
      <div className={pStyles.dossSection}>
        <SectionHeader num="02" title="BRAND POSITIONING & VOICE" />
        <div className={styles.posVoiceCard}>
          <div className={styles.posVoiceBlock}>
            <p className={styles.posVoiceLabel}>POSITIONING STATEMENT</p>
            <p className={styles.posVoiceBody}>{brand.positioning ?? <FieldMuted />}</p>
          </div>
          <div className={styles.posVoiceBlock}>
            <p className={styles.posVoiceLabel}>VOICE & TONE</p>
            <p className={styles.posVoiceBody}>{brand.voiceTone ?? <FieldMuted />}</p>
          </div>
          <div className={styles.posVoiceBlock}>
            <p className={styles.posVoiceLabel}>MESSAGING PILLARS</p>
            {brand.messagingPillars?.length ? (
              <div className={styles.pillarsList}>
                {brand.messagingPillars.map((pillar, i) => (
                  <div key={i} className={styles.pillarItem}>
                    <span className={styles.pillarNum}>{i + 1}</span>
                    <span className={styles.pillarText}>{pillar}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.pillarsList}>
                {[0, 1, 2].map(i => (
                  <div key={i} className={`${styles.pillarItem} ${pStyles.ghostRow}`}>
                    <span className={`${styles.ghostPillarNum}`} />
                    <span className={`${styles.pillarText} ${pStyles.ghostText}`}>
                      Messaging pillar not yet captured
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* §03 · Brand Audience — Pattern A */}
      <div className={pStyles.dossSection}>
        <SectionHeader
          num="03"
          title="BRAND AUDIENCE"
          subtitle={`Who ${brand.name} serves — essential for creator matching and content decisions.`}
        />
        <div className={pStyles.audienceCard}>
          {[
            ['DEMOGRAPHICS', brand.brandAudience?.demographics],
            ['PSYCHOGRAPHICS', brand.brandAudience?.psychographics],
            ['CHANNEL PREFERENCES', brand.brandAudience?.channelPreferences],
          ].map(([label, text]) => (
            <div key={label} className={pStyles.audienceBlock}>
              <p className={pStyles.audienceBlockLabel}>{label}</p>
              <p className={pStyles.audienceBlockBody}>{text ?? <FieldMuted />}</p>
            </div>
          ))}
          {brand.brandAudience?.notes && (
            <div className={pStyles.audienceNotes}>
              <p className={pStyles.audienceNotesText}>{brand.brandAudience.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP B · PRODUCT PORTFOLIO
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP B · PRODUCT PORTFOLIO" />

      {/* §04 · Products We Work With — Pattern B */}
      <div className={pStyles.dossSection}>
        <SectionHeader
          num="04"
          title="PRODUCTS WE WORK WITH"
          subtitle={`Products in active scope or being considered for ${brand.name}.`}
        />
        <div className={styles.productsGrid}>
          {brand.products?.length ? (
            brand.products.map(product => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productCardHead}>
                  <p className={styles.productName}>{product.name}</p>
                  <span className={`${styles.productStatusPill} ${PRODUCT_STATUS_CLASS[product.status]}`}>
                    {product.status}
                  </span>
                </div>
                <p className={styles.productSubLine}>
                  {product.productLine ?? '—'} · {product.categoryType ?? '—'}
                </p>
                <div className={styles.productFields}>
                  <div className={styles.productField}>
                    <span className={styles.productFieldLabel}>MARKETING ROLE</span>
                    <span className={styles.productFieldVal}>
                      {product.marketingRole ? (
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            color: '#535353',
                            background: 'var(--gray-50)',
                            border: '0.5px solid var(--gray-200)',
                            borderRadius: 4,
                            padding: '2px 7px',
                          }}
                        >
                          {product.marketingRole}
                        </span>
                      ) : (
                        <FieldMuted />
                      )}
                    </span>
                  </div>
                  <div className={styles.productField}>
                    <span className={styles.productFieldLabel}>TARGET SUB-AUDIENCE</span>
                    <span className={styles.productFieldVal}>
                      {product.targetSubAudience ?? <FieldMuted />}
                    </span>
                  </div>
                  <div className={styles.productField}>
                    <span className={styles.productFieldLabel}>KEY POSITIONING</span>
                    <span className={styles.productFieldVal}>
                      {product.positioning ?? <FieldMuted />}
                    </span>
                  </div>
                  <div className={styles.productField}>
                    <span className={styles.productFieldLabel}>SERVICES DEPLOYED</span>
                    <span className={styles.productFieldVal}>
                      {product.servicesDeployed?.length ? (
                        <span className={styles.productServicePills}>
                          {product.servicesDeployed.map(s => (
                            <span key={s} className={styles.productServicePill}>{s}</span>
                          ))}
                        </span>
                      ) : (
                        <FieldMuted />
                      )}
                    </span>
                  </div>
                </div>
                {product.performanceHighlight && (
                  <div className={styles.productFooter}>
                    <p className={styles.productPerf}>{product.performanceHighlight}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            [0, 1, 2].map(i => (
              <div key={i} className={`${styles.productCard} ${pStyles.ghostCard}`}>
                <div className={styles.productCardHead}>
                  <p className={`${styles.productName} ${pStyles.ghostText}`}>Product name not yet captured</p>
                  <span className={`${styles.productStatusPill} ${pStyles.ghostPill}`}>STATUS</span>
                </div>
                <p className={`${styles.productSubLine} ${pStyles.ghostText}`}>Line — Category not yet captured</p>
                <div className={styles.productFields}>
                  {['MARKETING ROLE', 'TARGET SUB-AUDIENCE', 'KEY POSITIONING', 'SERVICES DEPLOYED'].map(label => (
                    <div key={label} className={styles.productField}>
                      <span className={styles.productFieldLabel}>{label}</span>
                      <span className={`${styles.productFieldVal} ${pStyles.ghostText}`}>Not yet captured</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP C · MARKETING FOR THIS BRAND
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP C · MARKETING FOR THIS BRAND" />

      {/* §05 · Pitch & Services — Pattern A */}
      <div className={pStyles.dossSection}>
        <SectionHeader num="05" title="PITCH & SERVICES" />
        <div className={styles.pitchServicesCard}>
          <div className={styles.pitchServicesRow}>
            <span className={styles.pitchServicesLabel}>PITCH SOLUTION</span>
            <span className={styles.pitchServicesVal}>
              {brand.pitchSolution ?? <FieldMuted />}
            </span>
          </div>
          <div className={styles.pitchServicesRow}>
            <span className={styles.pitchServicesLabel}>CONTRACTED SERVICES</span>
            <span className={styles.pitchServicesVal}>
              {brand.contractedServices?.length ? (
                <span className={styles.contractedPills}>
                  {brand.contractedServices.map(s => (
                    <span key={s} className={styles.contractedPill}>
                      {s} — {SERVICE_NAMES[s]}
                    </span>
                  ))}
                </span>
              ) : (
                <FieldMuted />
              )}
            </span>
          </div>
        </div>
      </div>

      {/* §06 · Outcomes & Proof — Pattern B (metrics) + Pattern A (narrative) */}
      <div className={pStyles.dossSection}>
        <SectionHeader
          num="06"
          title="OUTCOMES & PROOF"
          subtitle={`Citable results for ${brand.name} — proof for marketing content and PR.`}
        />
        <div className={pStyles.metricsStrip}>
          {brand.brandOutcomes?.metrics?.length ? (
            brand.brandOutcomes.metrics.map((m, i) => (
              <div key={i} className={pStyles.metricCard}>
                <p className={pStyles.metricValue}>{m.value}</p>
                <p className={pStyles.metricLabel}>{m.label}</p>
                <p className={pStyles.metricSource}>{m.source ?? ''}</p>
              </div>
            ))
          ) : (
            [0, 1, 2].map(i => (
              <div key={i} className={`${pStyles.metricCard} ${pStyles.ghostCard}`}>
                <p className={`${pStyles.metricValue} ${pStyles.ghostText}`}>—</p>
                <p className={`${pStyles.metricLabel} ${pStyles.ghostText}`}>Not yet captured</p>
                <p className={`${pStyles.metricSource} ${pStyles.ghostText}`}>—</p>
              </div>
            ))
          )}
        </div>
        {brand.brandOutcomes?.narrative ? (
          <div className={pStyles.outcomesNarrativeCard}>
            <span className={`material-icons-round ${pStyles.outcomesNarrativeIcon}`}>
              auto_awesome
            </span>
            <p className={pStyles.outcomesNarrativeText}>{brand.brandOutcomes.narrative}</p>
          </div>
        ) : (
          <p className={pStyles.fieldMuted}>Brand narrative not yet captured.</p>
        )}
      </div>

      {/* §07 · Story Capital — Pattern A + Pattern B (moments) */}
      <div className={pStyles.dossSection}>
        <SectionHeader
          num="07"
          title="STORY CAPITAL"
          subtitle={`Narrative material for content, PR, and case studies about ${brand.name}.`}
        />
        <div className={pStyles.storyCard}>
          <div className={pStyles.storyBlock}>
            <p className={pStyles.storyBlockLabel}>DEFINING NARRATIVE</p>
            {brand.brandStoryCapital?.definingNarrative ? (
              <p className={pStyles.storyBlockBody}>{brand.brandStoryCapital.definingNarrative}</p>
            ) : (
              <FieldMuted />
            )}
          </div>

          <div className={pStyles.storyBlock}>
            <p className={pStyles.storyBlockLabel}>STORY-WORTHY MOMENTS</p>
            {brand.brandStoryCapital?.storyWorthyMoments?.length ? (
              <div className={pStyles.storyTimeline}>
                {brand.brandStoryCapital.storyWorthyMoments.map((m, i) => (
                  <div key={i} className={pStyles.storyTimelineItem}>
                    <span className={pStyles.storyTimelineDot} />
                    <div className={pStyles.storyTimelineContent}>
                      {m.date && <span className={pStyles.storyTimelineDate}>{m.date}</span>}
                      <span className={pStyles.storyTimelineLabel}>{m.label}</span>
                      {m.description && (
                        <p className={pStyles.storyTimelineDesc}>{m.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={pStyles.storyTimeline}>
                {[0, 1].map(i => (
                  <div key={i} className={`${pStyles.storyTimelineItem} ${pStyles.ghostRow}`}>
                    <span className={`${pStyles.storyTimelineDot} ${pStyles.ghostDot}`} />
                    <div className={pStyles.storyTimelineContent}>
                      <span className={`${pStyles.storyTimelineLabel} ${pStyles.ghostText}`}>
                        Not yet captured
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={pStyles.storyBlock}>
            <p className={pStyles.storyBlockLabel}>QUOTABLE MATERIAL</p>
            {brand.brandStoryCapital?.quotableMaterial ? (
              <p className={pStyles.storyBlockBody}>{brand.brandStoryCapital.quotableMaterial}</p>
            ) : (
              <FieldMuted />
            )}
          </div>

          <div className={pStyles.storyBlock}>
            <p className={pStyles.storyBlockLabel}>UNIQUE ANGLES</p>
            {brand.brandStoryCapital?.uniqueAngles ? (
              <p className={pStyles.storyBlockBody}>{brand.brandStoryCapital.uniqueAngles}</p>
            ) : (
              <FieldMuted />
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP D · CREATORS & CONTENT
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP D · CREATORS & CONTENT" />

      {/* §08 · Brand-Specific Top Creators — Pattern B */}
      <div className={pStyles.dossSection}>
        <SectionHeader
          num="08"
          title="BRAND-SPECIFIC TOP CREATORS"
          subtitle={`Creators with proven performance specifically for ${brand.name}.`}
        />
        <div className={styles.brandCreatorGrid}>
          {brand.brandTopCreators?.length ? (
            brand.brandTopCreators.map((creator, i) => (
              <div key={i} className={styles.brandCreatorCard}>
                <div className={styles.brandCreatorTop}>
                  <div className={styles.brandCreatorAvatar}>{initials(creator.name)}</div>
                  <div className={styles.brandCreatorInfo}>
                    <p className={styles.brandCreatorName}>{creator.name}</p>
                    {creator.handle && (
                      <p className={styles.brandCreatorHandle}>{creator.handle}</p>
                    )}
                  </div>
                </div>
                {creator.audienceMatch && (
                  <div>
                    <p className={styles.brandCreatorAudienceLabel}>AUDIENCE MATCH</p>
                    <p className={styles.brandCreatorAudienceVal}>{creator.audienceMatch}</p>
                  </div>
                )}
                {creator.notes && (
                  <p className={styles.brandCreatorNotes}>{creator.notes}</p>
                )}
              </div>
            ))
          ) : (
            [0, 1, 2].map(i => (
              <div key={i} className={`${styles.brandCreatorCard} ${pStyles.ghostCard}`}>
                <div className={styles.brandCreatorTop}>
                  <div className={`${styles.brandCreatorAvatar} ${pStyles.ghostAvatar}`} />
                  <div className={styles.brandCreatorInfo}>
                    <p className={`${styles.brandCreatorName} ${pStyles.ghostText}`}>
                      Not yet captured
                    </p>
                    <p className={`${styles.brandCreatorHandle} ${pStyles.ghostText}`}>—</p>
                  </div>
                </div>
                <div>
                  <p className={styles.brandCreatorAudienceLabel}>AUDIENCE MATCH</p>
                  <p className={`${styles.brandCreatorAudienceVal} ${pStyles.ghostText}`}>
                    Not yet captured
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* §09 · Content Angles That Work for This Brand — Pattern B */}
      <div className={pStyles.dossSection}>
        <SectionHeader
          num="09"
          title="CONTENT ANGLES THAT WORK"
          subtitle={`Content angles proven for ${brand.name} specifically — not the broader category, this brand.`}
        />
        <div className={pStyles.anglesList}>
          {brand.brandContentAngles?.length ? (
            brand.brandContentAngles.map(ca => (
              <div key={ca.id} className={pStyles.angleCard}>
                <p className={pStyles.angleTitle}>{ca.angle}</p>
                <p className={pStyles.angleWhy}>{ca.why}</p>
                {ca.exampleProject && (
                  <p className={pStyles.angleRef}>Reference: {ca.exampleProject}</p>
                )}
              </div>
            ))
          ) : (
            [0, 1, 2].map(i => (
              <div key={i} className={`${pStyles.angleCard} ${pStyles.ghostCard}`}>
                <p className={`${pStyles.angleTitle} ${pStyles.ghostText}`}>Not yet captured</p>
                <p className={`${pStyles.angleWhy} ${pStyles.ghostText}`}>
                  Content angle and supporting rationale will appear here as patterns emerge.
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP E · ARCHIVE & REFERENCE
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP E · ARCHIVE & REFERENCE" />

      {/* §10 · Projects — Pattern B */}
      <div className={pStyles.dossSection}>
        <SectionHeader
          num="10"
          title="PROJECTS"
          subtitle={`Projects run for ${brand.name}.`}
        />
        <div className={pStyles.projectsGrid}>
          {brandProjects.length > 0 ? (
            <>
              {brandProjects.map(p => {
                const isFull = p.type === 'full-case';
                return (
                  <Link
                    key={p.slug}
                    href={`/knowledge-base/client-insight/portfolio/${account.slug}/${p.slug}`}
                    className={`${pStyles.pjCard} ${!isFull ? pStyles.pjCardAdhoc : ''}`}
                  >
                    <div className={pStyles.pjCardHead}>
                      <div
                        className={`${pStyles.pjIconBox} ${isFull ? pStyles.pjIconBoxFull : pStyles.pjIconBoxAdhoc}`}
                      >
                        <span
                          className={`material-icons-round ${pStyles.pjIcon} ${isFull ? pStyles.pjIconFull : pStyles.pjIconAdhoc}`}
                        >
                          {isFull ? 'menu_book' : 'bolt'}
                        </span>
                      </div>
                      <div className={pStyles.pjCardMeta}>
                        <span
                          className={`${pStyles.pjBadge} ${isFull ? pStyles.pjBadgeFull : pStyles.pjBadgeAdhoc}`}
                        >
                          {isFull ? 'Full case' : 'Adhoc'}
                        </span>
                        <p className={pStyles.pjName}>{p.name}</p>
                        <p className={pStyles.pjPeriod}>{p.period}</p>
                      </div>
                    </div>
                    <p className={pStyles.pjOutcome}>{p.outcomeHeadline}</p>
                    <p className={pStyles.pjServices}>
                      {p.services.join(' + ')}
                      {isFull &&
                        p.type === 'full-case' &&
                        p.patterns.length > 0 && (
                          <>
                            {' '}
                            · {p.patterns.length} pattern
                            {p.patterns.length !== 1 ? 's' : ''}
                          </>
                        )}
                    </p>
                  </Link>
                );
              })}
              {brandProjects.length % 3 !== 0 && (
                <div className={pStyles.addProjectCard}>
                  <span className={`material-icons-round ${pStyles.addProjectIcon}`}>add</span>
                  <span className={pStyles.addProjectText}>Add project</span>
                </div>
              )}
            </>
          ) : (
            <div className={`${pStyles.pjCard} ${pStyles.ghostCard}`}>
              <div className={pStyles.pjCardHead}>
                <div className={`${pStyles.pjIconBox} ${pStyles.ghostIconBox}`} />
                <div className={pStyles.pjCardMeta}>
                  <span className={`${pStyles.pjBadge} ${pStyles.ghostText}`}>—</span>
                  <p className={`${pStyles.pjName} ${pStyles.ghostText}`}>No projects logged yet</p>
                  <p className={`${pStyles.pjPeriod} ${pStyles.ghostText}`}>—</p>
                </div>
              </div>
              <p className={`${pStyles.pjOutcome} ${pStyles.ghostText}`}>
                Projects will appear here once logged for this brand.
              </p>
              <p className={`${pStyles.pjServices} ${pStyles.ghostText}`}>—</p>
            </div>
          )}
        </div>
      </div>

      {/* §11 · Reference Index — Pattern A */}
      <div className={pStyles.dossSection}>
        <SectionHeader num="11" title="REFERENCE INDEX" />

        {brand.brandReferenceIndex?.tagClusters?.length ? (
          <div
            className={pStyles.tagClustersGrid}
            style={{
              marginBottom:
                brand.brandReferenceIndex?.linkedEntities?.length ||
                brand.brandReferenceIndex?.aiNote
                  ? '16px'
                  : undefined,
            }}
          >
            {brand.brandReferenceIndex.tagClusters.map((cl, i) => (
              <div key={i} className={pStyles.tagClusterCard}>
                <p className={pStyles.tagClusterLabel}>{cl.name}</p>
                <div className={pStyles.tagPills}>
                  {cl.tags.map((tag, j) => (
                    <span key={j} className={pStyles.tagPill}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={pStyles.fieldMuted} style={{ marginBottom: 12 }}>Tag clusters not yet captured.</p>
        )}

        {brand.brandReferenceIndex?.linkedEntities?.length ? (
          <div className={pStyles.linkedGrid} style={{ marginBottom: brand.brandReferenceIndex?.aiNote ? '16px' : undefined }}>
            {brand.brandReferenceIndex.linkedEntities.map((e, i) => (
              <span key={i} className={pStyles.linkedChip}>
                <span className={pStyles.linkedKind}>{e.type}</span>
                {e.name}
              </span>
            ))}
          </div>
        ) : null}

        <div
          style={{
            background: 'var(--gray-50)',
            border: '0.5px solid var(--gray-200)',
            borderRadius: 6,
            padding: '12px 14px',
            marginTop: 8,
          }}
        >
          <p
            style={{
              fontSize: 9,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              color: 'var(--gray-400)',
              marginBottom: 6,
            }}
          >
            AI-READY NOTE
          </p>
          <p style={{ fontSize: 12.5, color: '#353535', lineHeight: 1.65 }}>
            {brand.brandReferenceIndex?.aiNote ?? <span className={pStyles.fieldMuted}>AI summary not yet generated</span>}
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          GROUP F · RESEARCH FROM THE LIBRARY
      ══════════════════════════════════════════════════════ */}
      <GroupDivider label="GROUP F · RESEARCH FROM THE LIBRARY" />

      {/* §12 · Relevant Research */}
      <div className={pStyles.dossSection}>
        <SectionHeader
          num="12"
          title="RELEVANT RESEARCH"
          subtitle={`Insights from the research library that apply to this brand. Tagged via the applicability field on each insight.`}
        />
        <RelevantResearchSection
          insights={relevantInsights}
          entityType="brand"
          entitySlug={getBrandSlug(brand)}
          entityName={brand.name}
        />
      </div>

    </div>
  );
}
