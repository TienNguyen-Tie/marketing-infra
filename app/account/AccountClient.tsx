'use client';

import { useState } from 'react';
import styles from './account.module.css';
import ApiKeySection from './ApiKeySection';

interface Props {
  userId: string;
  initialName: string;
  email: string;
  role: string;
  isAdmin: boolean;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : (parts[0] ?? 'U').slice(0, 2).toUpperCase();
}

function RoleBadge({ role }: { role: string }) {
  const cls =
    role === 'ADMIN' ? styles.roleBadgeAdmin
    : role === 'EDITOR' ? styles.roleBadgeEditor
    : styles.roleBadgeViewer;
  return <span className={`${styles.roleBadge} ${cls}`}>{role}</span>;
}

export default function AccountClient({ userId: _userId, initialName, email, role, isAdmin }: Props) {
  const [name, setName] = useState(initialName);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [savingPw, setSavingPw] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function handleProfileSave() {
    setSavingProfile(true);
    setProfileMsg(null);
    try {
      const res = await fetch('/api/account/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (res.ok) {
        setProfileMsg({ ok: true, text: 'Profile updated.' });
      } else {
        setProfileMsg({ ok: false, text: data.error ?? 'Failed to save.' });
      }
    } catch {
      setProfileMsg({ ok: false, text: 'Network error.' });
    } finally {
      setSavingProfile(false);
    }
  }

  async function handlePasswordSave() {
    if (newPw !== confirmPw) { setPwMsg({ ok: false, text: 'Passwords do not match.' }); return; }
    if (newPw.length < 8) { setPwMsg({ ok: false, text: 'Password must be at least 8 characters.' }); return; }
    setSavingPw(true);
    setPwMsg(null);
    try {
      const res = await fetch('/api/account/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: curPw, newPassword: newPw }),
      });
      const data = await res.json();
      if (res.ok) {
        setPwMsg({ ok: true, text: 'Password updated successfully.' });
        setCurPw(''); setNewPw(''); setConfirmPw('');
      } else {
        setPwMsg({ ok: false, text: data.error ?? 'Failed to update password.' });
      }
    } catch {
      setPwMsg({ ok: false, text: 'Network error.' });
    } finally {
      setSavingPw(false);
    }
  }

  return (
    <div className={styles.page}>
      <p className={styles.breadcrumb}>Account Settings</p>

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Account Settings</h1>
        <p className={styles.pageSubtitle}>Manage your profile and integration settings.</p>
      </div>

      {/* ── Your Profile ── */}
      <div className={styles.section}>
        <p className={styles.sectionTitle}>Your Profile</p>
        <div className={styles.card}>
          <div className={styles.profileRow}>
            <div className={styles.avatar}>{initials(name || email)}</div>
            <div className={styles.profileInfo}>
              <p className={styles.profileEmail}>{email}</p>
            </div>
            <RoleBadge role={role} />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="profile-name">Display name</label>
            <input
              id="profile-name"
              type="text"
              className={styles.input}
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Email</label>
            <input type="email" className={styles.input} value={email} disabled />
          </div>

          <div className={styles.btnRow}>
            <button className={styles.btnPrimary} onClick={handleProfileSave} disabled={savingProfile}>
              {savingProfile && <span className={styles.spinner} />}
              Save changes
            </button>
            {profileMsg && (
              <span className={profileMsg.ok ? styles.successMsg : styles.errorMsg}>
                {profileMsg.text}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Security ── */}
      <div className={styles.section}>
        <p className={styles.sectionTitle}>Security</p>
        <div className={styles.card}>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="cur-pw">Current password</label>
            <input
              id="cur-pw"
              type="password"
              className={styles.input}
              value={curPw}
              onChange={e => setCurPw(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="new-pw">New password</label>
            <input
              id="new-pw"
              type="password"
              className={styles.input}
              value={newPw}
              onChange={e => setNewPw(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="confirm-pw">Confirm new password</label>
            <input
              id="confirm-pw"
              type="password"
              className={styles.input}
              value={confirmPw}
              onChange={e => setConfirmPw(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className={styles.btnRow}>
            <button
              className={styles.btnPrimary}
              onClick={handlePasswordSave}
              disabled={savingPw || !curPw || !newPw || !confirmPw}
            >
              {savingPw && <span className={styles.spinner} />}
              Update password
            </button>
            {pwMsg && (
              <span className={pwMsg.ok ? styles.successMsg : styles.errorMsg}>
                {pwMsg.text}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── AI Integration (admin only) ── */}
      {isAdmin && (
        <div className={styles.section}>
          <p className={styles.sectionTitle}>AI Integration</p>
          <div className={styles.card}>
            <ApiKeySection />
          </div>
        </div>
      )}

      {/* ── Danger Zone ── */}
      <div className={styles.section}>
        <p className={styles.sectionTitle}>Danger Zone</p>
        <div className={styles.dangerCard}>
          <div>
            <p className={styles.dangerCardLabel}>Sign out</p>
            <p className={styles.dangerCardDesc}>Authentication is currently disabled for this app.</p>
          </div>
          <button
            className={styles.btnDanger}
            onClick={() => { window.location.href = '/'; }}
          >
            Back to app
          </button>
        </div>
      </div>
    </div>
  );
}
