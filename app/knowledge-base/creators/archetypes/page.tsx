import type { Metadata } from 'next';
import { getAllArchetypes, getCreatorStats } from '@/data/creators/helpers';
import Hero from './_components/Hero';
import StatsStrip from './_components/StatsStrip';
import FilterRow from './_components/FilterRow';
import ArchetypeGrid from './_components/ArchetypeGrid';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Creator Archetypes — VinaCapital Knowledge Base',
};

type SearchParams = { tier?: string };

export default async function ArchetypeListingPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const activeTier = (params.tier as string) || 'all';

  const archetypes = getAllArchetypes();
  const stats = getCreatorStats();

  return (
    <div className={styles.page}>
      <Hero />
      <StatsStrip stats={stats} />
      <FilterRow activeTier={activeTier} />
      <ArchetypeGrid archetypes={archetypes} activeTier={activeTier} />
    </div>
  );
}
