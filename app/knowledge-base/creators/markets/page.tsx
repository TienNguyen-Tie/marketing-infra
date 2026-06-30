import type { Metadata } from 'next';
import { getAllMarkets } from '@/data/creators/helpers';
import Hero from './_components/Hero';
import MarketGrid from './_components/MarketGrid';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Creator Markets — VinaCapital Knowledge Base',
};

export default async function MarketListingPage() {
  const markets = getAllMarkets();
  return (
    <div className={styles.page}>
      <Hero />
      <MarketGrid markets={markets} />
    </div>
  );
}
