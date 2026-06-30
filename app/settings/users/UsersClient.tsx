'use client';

import { useState } from 'react';
import styles from './users.module.css';

type Role = 'ADMIN' | 'EDITOR' | 'VIEWER';

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
}

interface Props {
  initialUsers: UserRow[];
  currentUserId: string;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : (parts[0] ?? 'U').slice(0, 2).toUpperCase();
}

function avatarCls(role: Role) {
  return role === 'ADMIN' ? styles.avatarAdmin : role === 'EDITOR' ? styles.avatarEditor : styles.avatarViewer;
}

function roleBadgeCls(role: Role) {
  return role === 'ADMIN' ? styles.roleBadgeAdmin : role === 'EDITOR' ? styles.roleBadgeEditor : styles.roleBadgeViewer;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function UsersClient({ initialUsers, currentUserId }: Props) {
  const [users, setUsers] = useState<UserRow[]>(initialUsers);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<Role>('VIEWER');
  const [creating, setCreating] = useState(false);
  const [createResult, setCreateResult] = useState<{ ok: boolean; text: string; pw?: string } | null>(null);

  const totalAdmins = users.filter(u => u.role === 'ADMIN').length;
  const totalEditors = users.filter(u => u.role === 'EDITOR').length;
  const totalViewers = users.filter(u => u.role === 'VIEWER').length;

  async function handleCreate() {
    if (!inviteName.trim() || !inviteEmail.trim()) return;
    setCreating(true);
    setCreateResult(null);
    try {
      const res = await fetch('/api/settings/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: inviteName.trim(), email: inviteEmail.trim(), role: inviteRole }),
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(prev => [...prev, { ...data.user, createdAt: data.user.createdAt }]);
        setCreateResult({ ok: true, text: `User created.`, pw: data.temporaryPassword });
        setInviteName(''); setInviteEmail(''); setInviteRole('VIEWER');
      } else {
        setCreateResult({ ok: false, text: data.error ?? 'Failed to create user.' });
      }
    } catch {
      setCreateResult({ ok: false, text: 'Network error.' });
    } finally {
      setCreating(false);
    }
  }

  async function handleRoleChange(userId: string, newRole: Role) {
    const res = await fetch(`/api/settings/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    });
    if (res.ok) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    }
  }

  async function handleToggleActive(userId: string, current: boolean) {
    const res = await fetch(`/api/settings/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !current }),
    });
    if (res.ok) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, isActive: !current } : u));
    }
  }

  return (
    <div className={styles.page}>
      <p className={styles.breadcrumb}>Settings › User Management</p>

      <div className={styles.headerRow}>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>User Management</h1>
          <p className={styles.pageSubtitle}>Manage who has access to this tool.</p>
        </div>
        <button className={styles.btnPrimary} onClick={() => { setShowInvite(v => !v); setCreateResult(null); }}>
          {showInvite ? 'Cancel' : '+ Invite user'}
        </button>
      </div>

      {/* Stats */}
      <div className={styles.statsRow}>
        <span className={styles.statChip}><strong>{users.length}</strong> total users</span>
        <span className={styles.statChip}><strong>{totalAdmins}</strong> admin{totalAdmins !== 1 ? 's' : ''}</span>
        <span className={styles.statChip}><strong>{totalEditors}</strong> editor{totalEditors !== 1 ? 's' : ''}</span>
        <span className={styles.statChip}><strong>{totalViewers}</strong> viewer{totalViewers !== 1 ? 's' : ''}</span>
      </div>

      {/* Invite form */}
      {showInvite && (
        <div className={styles.inviteCard}>
          <p className={styles.inviteTitle}>New user</p>
          <div className={styles.inviteRow}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Full name</label>
              <input className={styles.input} value={inviteName} onChange={e => setInviteName(e.target.value)} placeholder="Nguyen Van A" />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Email</label>
              <input type="email" className={styles.input} value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} placeholder="user@vinacapital.com" />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Role</label>
              <select className={styles.select} value={inviteRole} onChange={e => setInviteRole(e.target.value as Role)}>
                <option value="ADMIN">Admin</option>
                <option value="EDITOR">Editor</option>
                <option value="VIEWER">Viewer</option>
              </select>
            </div>
            <button className={styles.btnInvite} onClick={handleCreate} disabled={creating || !inviteName.trim() || !inviteEmail.trim()}>
              {creating ? 'Creating…' : 'Create user'}
            </button>
          </div>
          {createResult && (
            createResult.ok ? (
              <div className={styles.inviteSuccess}>
                {createResult.text} Share this temporary password:
                <span className={styles.inviteSuccessPw}>{createResult.pw}</span>
                {' '}— the user should change it immediately.
              </div>
            ) : (
              <p className={styles.errorMsg}>{createResult.text}</p>
            )
          )}
        </div>
      )}

      {/* Users table */}
      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Role</th>
              <th className={styles.th}>Joined</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className={styles.tr}>
                <td className={styles.td}>
                  <div className={styles.userCell}>
                    <div className={`${styles.avatar} ${avatarCls(u.role)}`}>{initials(u.name)}</div>
                    <div>
                      <p className={styles.userName}>
                        {u.name}
                        {!u.isActive && <span className={styles.inactivePill}>Inactive</span>}
                      </p>
                      <p className={styles.userEmail}>{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className={styles.td}>
                  <span className={`${styles.roleBadge} ${roleBadgeCls(u.role)}`}>{u.role}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.joinedDate}>{formatDate(u.createdAt)}</span>
                </td>
                <td className={styles.td}>
                  <div className={styles.actionsCell}>
                    <select
                      className={styles.roleSelect}
                      value={u.role}
                      onChange={e => handleRoleChange(u.id, e.target.value as Role)}
                    >
                      <option value="ADMIN">Admin</option>
                      <option value="EDITOR">Editor</option>
                      <option value="VIEWER">Viewer</option>
                    </select>
                    <button
                      className={styles.deactivateBtn}
                      disabled={u.id === currentUserId}
                      onClick={() => handleToggleActive(u.id, u.isActive)}
                      title={u.id === currentUserId ? 'Cannot deactivate yourself' : undefined}
                    >
                      {u.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
