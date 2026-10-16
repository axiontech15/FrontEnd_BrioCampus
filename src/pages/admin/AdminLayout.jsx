import { useState } from 'react';
import { Link, useHashRoute } from '../../router';
import { useApp } from '../../context/AppContext';
import { ADMIN_SECTIONS } from './adminData';

const ICONS = {
  overview: (<><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></>),
  comptes: (<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>),
  roles: (<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>),
  categories: (<><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" /></>),
  universites: (<><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>),
  audit: (<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></>),
};

const GROUPS = [
  { title: 'Pilotage', ids: ['overview'] },
  { title: 'Gestion', ids: ['comptes', 'roles', 'categories', 'universites'] },
  { title: 'Sécurité', ids: ['audit'] },
];

export default function AdminLayout({ children }) {
  const path = useHashRoute();
  const { adminComptes, adminUnis, adminRoles, adminCategories, adminAudit } = useApp();
  const [sideOpen, setSideOpen] = useState(false);

  const current = ADMIN_SECTIONS.find((s) => s.to === path) ?? ADMIN_SECTIONS[0];
  const alertCount = adminAudit.filter((a) => a.status === 'Alerte' && !a.archived).length;
  const unisActives = adminUnis.filter((u) => u.status === 'Active').length;

  const badges = {
    comptes: { text: String(adminComptes.length) },
    roles: { text: String(adminRoles.length) },
    categories: { text: String(adminCategories.length) },
    universites: { text: `${unisActives}/${adminUnis.length}` },
    audit: alertCount > 0 ? { text: String(alertCount), tone: 'alert' } : null,
  };

  const navLink = (s) => {
    const badge = badges[s.id];
    return (
      <li key={s.id}>
        <Link
          to={s.to}
          onClick={() => setSideOpen(false)}
          className={`sa-nav-item${current.id === s.id ? ' active' : ''}`}
        >
          <span className="icon">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {ICONS[s.id]}
            </svg>
          </span>
          <span style={{ flex: 1 }}>{s.label}</span>
          {badge && <span className={`sa-nav-badge${badge.tone ? ` ${badge.tone}` : ''}`}>{badge.text}</span>}
        </Link>
      </li>
    );
  };

  return (
    <div className="sa-layout">
      <aside className={`sa-sidebar${sideOpen ? ' open' : ''}`}>
        <div className="sa-sidebar-header">
          <Link to="/admin" className="sa-logo" onClick={() => setSideOpen(false)}>
            <img className="brand-logo-full" src="assets/logo-biocampus.svg" alt="BRIO CAMPUS" />
            <div><div className="sa-logo-sub">Administration</div></div>
          </Link>
        </div>
        <div className="sa-role-badge"><span className="dot"></span> ADMINISTRATEUR</div>
        {GROUPS.map((g) => (
          <nav className="sa-nav-section" key={g.title}>
            <div className="sa-nav-title">{g.title}</div>
            <ul className="sa-nav-menu">
              {ADMIN_SECTIONS.filter((s) => g.ids.includes(s.id)).map(navLink)}
            </ul>
          </nav>
        ))}
        <div className="sa-sidebar-footer">
          <div className="sa-profile-card">
            <div className="sa-profile-avatar">A</div>
            <div>
              <div className="sa-profile-name">Admin BioCampus</div>
              <div className="sa-profile-role">Administrateur</div>
            </div>
          </div>
        </div>
      </aside>
      <div className={`sa-side-overlay${sideOpen ? ' open' : ''}`} onClick={() => setSideOpen(false)} />

      <div className="sa-main">
        <header className="sa-topbar">
          <div className="sa-topbar-left">
            <button type="button" className="sa-side-toggle" aria-label="Menu admin" onClick={() => setSideOpen((v) => !v)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div className="sa-topbar-badge"><strong>Espace Admin</strong> — {current.label}</div>
          </div>
          <div className="sa-topbar-right">
            <div className="sa-topbar-badge">Alertes ({alertCount})</div>
            <Link to="/login" className="sa-icon-btn-danger" title="Retour à l'entrée de démonstration" aria-label="Retour à l'entrée de démonstration">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </Link>
          </div>
        </header>

        <main className="sa-content">{children}</main>
      </div>
    </div>
  );
}
