import styles from '../page.module.css';

export default function Hero() {
  return (
    <header className={styles.hero}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <a href="/knowledge-base">Knowledge Base</a>
        {' › '}
        <a href="/knowledge-base/creators">Creators</a>
        {' › '}
        <span>Markets</span>
      </nav>
      <h1 className={styles.h1}>Creator Markets</h1>
      <p className={styles.subtitle}>
        Three markets the TAP Creator network spans: Vietnam, Philippines, and Indonesia. Macro
        context per market — creator economy maturity, platform behavior, operational notes. The
        same Archetype manifests differently in each market.
      </p>
    </header>
  );
}
