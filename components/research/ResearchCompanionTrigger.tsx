'use client';

import { useState } from 'react';
import ResearchCompanion from './ResearchCompanion';
import styles from './ResearchCompanion.module.css';

export default function ResearchCompanionTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={styles.trigger}
        onClick={() => setOpen(true)}
        aria-label="Open Research Companion"
      >
        <span className={styles.triggerDot} />
        <span className="material-icons-round" style={{ fontSize: 16 }}>query_stats</span>
        Research Companion
      </button>

      <ResearchCompanion open={open} onClose={() => setOpen(false)} />
    </>
  );
}
