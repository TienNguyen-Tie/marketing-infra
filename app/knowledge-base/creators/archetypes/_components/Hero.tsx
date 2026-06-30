import styles from '../page.module.css';

export default function Hero() {
  return (
    <header className={styles.hero}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <a href="/knowledge-base">Knowledge Base</a>
        {' › '}
        <a href="/knowledge-base/creators">Creators</a>
        {' › '}
        <span>Archetypes</span>
      </nav>
      <h1 className={styles.h1}>Creator Archetypes</h1>
      <p className={styles.subtitle}>
        Recognized types of TAP creators VinaCapital acquires, nurtures, and activates. Each archetype
        behaves consistently enough to be planned for as one group — different content style,
        different audience trust patterns, different acquisition channels, different commercial
        behavior.
      </p>
    </header>
  );
}
