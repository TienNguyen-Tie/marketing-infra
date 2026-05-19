'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import type { Session } from 'next-auth';

/* ── TYPES ─────────────────────────────────────────────────── */

type FlyoutLeaf = { label: string; href: string };

type NavLeaf = { kind: 'leaf'; label: string; href: string; icon?: string };
type NavFlyout = { kind: 'flyout'; label: string; href: string; items: FlyoutLeaf[] };
type NavBranch = { kind: 'branch'; label: string; href: string; children: Array<NavLeaf | NavFlyout> };

type NavItem = NavLeaf | NavFlyout | NavBranch;
type FlyoutState = { item: NavFlyout; y: number } | null;

/* ── NAV TREE ───────────────────────────────────────────────── */

const navTree: NavItem[] = [
  {
    kind: 'branch',
    label: 'Knowledge Base',
    href: '/knowledge-base',
    children: [
      {
        kind: 'flyout',
        label: 'Brand System & Assets',
        href: '/knowledge-base/brand-system',
        items: [
          { label: 'Brand Foundation', href: '/knowledge-base/brand-system/brand-foundation' },
          { label: 'Design Guidelines', href: '/knowledge-base/brand-system/design-guidelines' },
          { label: 'Copywriting Guidelines', href: '/knowledge-base/brand-system/copywriting' },
        ],
      },
      {
        kind: 'flyout',
        label: 'Client Insight',
        href: '/knowledge-base/client-insight',
        items: [
          { label: 'Client Portfolio', href: '/knowledge-base/client-insight/portfolio' },
          { label: 'ICPs', href: '/knowledge-base/client-insight/icps' },
          { label: 'Decision-maker Personas', href: '/knowledge-base/client-insight/personas' },
        ],
      },
      {
        kind: 'leaf',
        label: 'Research & Insights',
        href: '/knowledge-base/research',
      },
      {
        kind: 'flyout',
        label: 'Creator Insight',
        href: '/knowledge-base/creator-insight',
        items: [
          { label: 'Creator ICPs', href: '/knowledge-base/creator-insight/icps' },
          { label: 'Creator Personas', href: '/knowledge-base/creator-insight/personas' },
          { label: 'Network Overview', href: '/knowledge-base/creator-insight/network' },
        ],
      },
      {
        kind: 'flyout',
        label: 'Services',
        href: '/knowledge-base/services',
        items: [
          { label: 'P1 — Livestream Commerce', href: '/knowledge-base/services/p1-livestream-commerce' },
          { label: 'P2 — UGC & Content Production', href: '/knowledge-base/services/p2-ugc-content' },
          { label: 'P3 — TikTok Shop Partner', href: '/knowledge-base/services/p3-tiktok-shop-partner' },
          { label: 'P4 — Performance Media', href: '/knowledge-base/services/p4-performance-media' },
          { label: 'P5 — Affiliate & Creator Network', href: '/knowledge-base/services/p5-affiliate-creator-network' },
          { label: 'P6 — Technology & Data Platform', href: '/knowledge-base/services/p6-technology-platform' },
          { label: 'P7 — Service Seven', href: '/knowledge-base/services/p7-service-seven' },
          { label: 'Cross-sell Map', href: '/knowledge-base/services/cross-sell-map' },
        ],
      },
    ],
  },
  {
    kind: 'branch',
    label: 'Current Projects',
    href: '/current-projects',
    children: [
      { kind: 'leaf', label: 'Focused Services', href: '/current-projects/focused-services' },
      { kind: 'leaf', label: 'Focused Clients', href: '/current-projects/focused-clients' },
    ],
  },
  {
    kind: 'branch',
    label: 'Planning Tools',
    href: '/planning-tools',
    children: [
      { kind: 'leaf', label: 'Campaign Planning', href: '/planning-tools/campaign-planning' },
      { kind: 'leaf', label: 'Content Production', href: '/planning-tools/content-production' },
      { kind: 'leaf', label: 'Design Templates', href: '/planning-tools/design-templates' },
      { kind: 'leaf', label: 'Review & Validation', href: '/planning-tools/review-validation' },
    ],
  },
  {
    kind: 'branch',
    label: 'Team Performance',
    href: '/team-performance',
    children: [
      { kind: 'leaf', label: 'Member Performance', href: '/team-performance/member-performance' },
      { kind: 'leaf', label: 'Campaign Results', href: '/team-performance/campaign-results' },
      { kind: 'leaf', label: 'Insight Extraction', href: '/team-performance/insight-extraction' },
    ],
  },
  {
    kind: 'branch',
    label: 'Backlog & Requests',
    href: '/backlog',
    children: [
      { kind: 'leaf', label: 'Incoming Requests', href: '/backlog/incoming-requests' },
      { kind: 'leaf', label: 'Active Work', href: '/backlog/active-work' },
      { kind: 'leaf', label: 'Routing & Prioritization', href: '/backlog/routing-prioritization' },
    ],
  },
];

const settingsTree: NavItem[] = [
  { kind: 'leaf', label: 'User Management',    href: '/settings/users'             },
  { kind: 'leaf', label: 'Vision Suggestions', href: '/settings/suggestions'       },
  { kind: 'leaf', label: 'Research Queries',   href: '/settings/research-queries'  },
];

/* ── HELPERS ────────────────────────────────────────────────── */

function nameInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : (parts[0] ?? 'U').slice(0, 2).toUpperCase();
}

/* ── COMPONENT ──────────────────────────────────────────────── */

export default function Sidebar({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(['/knowledge-base']));
  const [flyout, setFlyout] = useState<FlyoutState>(null);
  const flyoutRef = useRef<HTMLDivElement>(null);

  const isAdmin = (session?.user as { role?: string } | undefined)?.role === 'ADMIN';

  // Close flyout when clicking outside
  useEffect(() => {
    if (!flyout) return;
    function handleMouseDown(e: MouseEvent) {
      const target = e.target as Element;
      if (!flyoutRef.current?.contains(target) && !target.closest?.('[data-flyout-trigger]')) {
        setFlyout(null);
      }
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [flyout]);

  // Close flyout on route change
  useEffect(() => { setFlyout(null); }, [pathname]);

  function toggle(href: string) {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(href)) next.delete(href);
      else next.add(href);
      return next;
    });
  }

  function openFlyout(item: NavFlyout, e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setFlyout(prev => prev?.item.href === item.href ? null : { item, y: rect.top });
  }

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + '/');
  }

  function renderItem(item: NavItem, depth: number): React.ReactNode {
    const active = isActive(item.href);

    if (item.kind === 'leaf') {
      const cls = depth === 0 ? 'nav-top' : depth === 1 ? 'nav-section' : 'nav-leaf';
      return (
        <Link
          key={item.href}
          href={item.href}
          className={`nav-item ${cls}${active ? ' nav-item--active' : ''}`}
          style={item.icon ? { display: 'flex', alignItems: 'center', gap: 8 } : undefined}
        >
          {item.icon && (
            <span className="material-icons-round" style={{ fontSize: 16, opacity: 0.75 }}>
              {item.icon}
            </span>
          )}
          {item.label}
        </Link>
      );
    }

    if (item.kind === 'flyout') {
      const cls = depth === 0 ? 'nav-top' : depth === 1 ? 'nav-section' : 'nav-leaf';
      const isFlyoutOpen = flyout?.item.href === item.href;
      return (
        <div key={item.href}>
          <button
            data-flyout-trigger={item.href}
            className={`nav-item nav-item--branch ${cls}${active ? ' nav-item--active' : ''}`}
            onClick={(e) => openFlyout(item, e)}
          >
            <span>{item.label}</span>
            <span className="nav-arrow-flyout" style={{ opacity: isFlyoutOpen ? 1 : 0.7 }}>›</span>
          </button>
        </div>
      );
    }

    // NavBranch — inline expand
    const cls = depth === 0 ? 'nav-top' : depth === 1 ? 'nav-section' : 'nav-leaf';
    const open = expanded.has(item.href);
    return (
      <div key={item.href}>
        <button
          className={`nav-item nav-item--branch ${cls}${active ? ' nav-item--active' : ''}`}
          onClick={() => toggle(item.href)}
        >
          <span>{item.label}</span>
          <span className={`nav-chevron${open ? ' nav-chevron--open' : ''}`}>▸</span>
        </button>
        <div className={`nav-children${open ? ' nav-children--open' : ''}`}>
          {item.children.map(child => renderItem(child, depth + 1))}
        </div>
      </div>
    );
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <Link href="/" className="sidebar__logo-link">
          <img src="/LOGO_am-ban-2.png" alt="Ecomobi" className="sidebar__logo-img" />
          {/* Fallback — drop logo.svg or logo.png into /public to replace:
          <span className="sidebar__logo-mark">E</span>
          <span className="sidebar__logo-text">Ecomobi</span> */}
        </Link>
      </div>
      <nav className="sidebar__nav">
        {navTree.map(item => renderItem(item, 0))}

        {/* Settings — admin only */}
        {isAdmin && (
          <div style={{ marginTop: 8 }}>
            <div style={{
              fontSize: 9,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              padding: '8px 14px 4px',
            }}>
              Settings
            </div>
            {settingsTree.map(item => renderItem(item, 0))}
          </div>
        )}
      </nav>

      {flyout && (
        <div
          ref={flyoutRef}
          className="nav-flyout"
          style={{ top: flyout.y }}
        >
          {flyout.item.items.map(leaf => (
            <Link
              key={leaf.href}
              href={leaf.href}
              className={`nav-flyout__link${isActive(leaf.href) ? ' nav-flyout__link--active' : ''}`}
              onClick={() => setFlyout(null)}
            >
              {leaf.label}
            </Link>
          ))}
        </div>
      )}

      {/* ── User bar ── */}
      {session?.user && (
        <div style={{
          borderTop: '0.5px solid rgba(255,255,255,0.12)',
          padding: '10px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginTop: 'auto',
        }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            fontWeight: 700,
            color: 'white',
            flexShrink: 0,
          }}>
            {nameInitials(session.user.name ?? session.user.email ?? 'U')}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontSize: 12,
              fontWeight: 500,
              color: 'white',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              lineHeight: 1.2,
            }}>
              {session.user.name ?? session.user.email}
            </p>
            <p style={{
              fontSize: 9,
              color: 'rgba(255,255,255,0.6)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginTop: 1,
            }}>
              {(session.user as { role?: string }).role ?? 'VIEWER'}
            </p>
          </div>
          <Link
            href="/account"
            style={{
              color: 'rgba(255,255,255,0.6)',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.15s',
              flexShrink: 0,
            }}
            title="Account settings"
          >
            <span className="material-icons-round" style={{ fontSize: 18 }}>settings</span>
          </Link>
        </div>
      )}
    </aside>
  );
}
