import styles from './StubPage.module.css';

interface Props {
  breadcrumb: string;
  title: string;
  description?: string;
  phase: 'phase-1' | 'phase-2' | 'phase-3';
  phaseLabel: string;
}

const PHASE_COLOR: Record<Props['phase'], string> = {
  'phase-1': '#D71920',
  'phase-2': '#F59E0B',
  'phase-3': '#3B82F6',
};

export default function StubPage({ breadcrumb, title, description, phase, phaseLabel }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.breadcrumb}>{breadcrumb}</p>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>

      <div className={styles.banner}>
        <span className={`material-icons-round ${styles.icon}`}>auto_awesome</span>
        <p className={styles.bannerHeading}>Page in development</p>
        <p className={styles.bannerPhase} style={{ color: PHASE_COLOR[phase] }}>
          {phaseLabel}
        </p>
        <p className={styles.bannerBody}>
          This page will be populated as part of the Marketing Infrastructure rollout. See the sitemap for full context.
        </p>
      </div>
    </div>
  );
}
