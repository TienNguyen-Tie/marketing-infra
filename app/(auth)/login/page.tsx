'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setError('Invalid email or password. Please try again.');
      } else {
        router.push('/');
        router.refresh();
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.shell}>
      {/* ── Left panel ── */}
      <div className={styles.left}>
        <div className={styles.wordmark}>
          <span className={styles.wordmarkName}>VinaCapital</span>
          <span className={styles.wordmarkSub}>Marketing Infrastructure</span>
        </div>

        <div className={styles.formArea}>
          <h1 className={styles.heading}>Sign in</h1>
          <p className={styles.subtext}>Internal tool — VinaCapital team only</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className={styles.input}
                placeholder="you@vinacapital.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className={styles.input}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            {error && <div className={styles.errorCard}>{error}</div>}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading && <span className={styles.spinner} />}
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className={styles.footer}>Having trouble? Contact your admin.</p>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className={styles.right}>
        <div className={styles.rightDecorA} />
        <div className={styles.rightDecorB} />
        <div className={styles.rightContent}>
          <p className={styles.rightTagline}>
            One source of truth for every campaign, every client, every creator.
          </p>
          <p className={styles.rightMeta}>VinaCapital Marketing Infrastructure · 2026</p>
        </div>
      </div>
    </div>
  );
}
