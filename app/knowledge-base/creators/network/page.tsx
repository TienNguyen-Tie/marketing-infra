import type { Metadata } from 'next';
import { getTapNetworkOverview } from '@/data/creators/helpers';
import Hero from './_components/Hero';
import HeadlineCounts from './_components/HeadlineCounts';
import DistributionByArchetype from './_components/DistributionByArchetype';
import DistributionByMarket from './_components/DistributionByMarket';
import DistributionByAudienceSize from './_components/DistributionByAudienceSize';
import ObservationsBlock from './_components/ObservationsBlock';
import NotableCreators from './_components/NotableCreators';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'TAP Network Overview — VinaCapital Knowledge Base',
};

export default async function NetworkOverviewPage() {
  const overview = getTapNetworkOverview();
  return (
    <div className={styles.page}>
      <Hero overview={overview} />
      <HeadlineCounts overview={overview} />
      <DistributionByArchetype overview={overview} />
      <DistributionByMarket overview={overview} />
      <DistributionByAudienceSize overview={overview} />
      <ObservationsBlock overview={overview} />
      <NotableCreators overview={overview} />
    </div>
  );
}
