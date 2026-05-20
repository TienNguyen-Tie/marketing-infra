'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../page.module.css';

const TIERS = [
  { value: 'all', label: 'All' },
  { value: 'core', label: 'Core' },
  { value: 'emerging', label: 'Emerging' },
  { value: 'niche', label: 'Niche' },
] as const;

export default function FilterRow({ activeTier }: { activeTier: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setTier(tier: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (tier === 'all') {
      params.delete('tier');
    } else {
      params.set('tier', tier);
    }
    const qs = params.toString();
    router.push(`/knowledge-base/creators/archetypes${qs ? '?' + qs : ''}`);
  }

  return (
    <div className={styles.filterRow}>
      {TIERS.map(({ value, label }) => (
        <button
          key={value}
          className={`${styles.filterChip}${activeTier === value ? ' ' + styles.filterChipActive : ''}`}
          onClick={() => setTier(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
