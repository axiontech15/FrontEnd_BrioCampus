import { useState } from 'react';
import { Link, useHashRoute } from '../../router';
import { useApp } from '../../context/AppContext';

const SECTIONS = [
  { to: '/university', label: 'Profil' },
  { to: '/university/palmares', label: 'Import palmarès' },
  { to: '/university/stats', label: 'Statistiques' },
];

export default function UniversityLayout({ children }) {
  const path = useHashRoute();
  const { logout, univProfile } = useApp();
  const [sideOpen, setSideOpen] = useState(false);
  const current = SECTIONS.find((s) => s.to === path) ?? SECTIONS[0];

  return (
    <div className="sa-layout">
      <aside className={`sa-sidebar${sideOpen ? ' open' : ''}`}>
        <div className="sa-sidebar-header">
          <Link to="/university" className="sa-logo" onClick={() => setSideOpen(false)}>
            <img className="brand-logo-full" src="assets/logo-biocampus.svg" alt="BRIO CAMPUS" />
            <div><div className="sa-logo-sub">Espace Université</div></div>
          </Link>
        </div>
        <div className="sa-role-badge"><span className="dot"></span> UNIVERSITÉ</div>
        <nav className="sa-nav-section">
          <div className="sa-nav-title">Registre</div>
          <ul className="sa-nav-menu">
            {SECTIONS.map((s) => (
              <li key={s.to}>
                <Link
                  to={s.to}
                  onClick={() => setSideOpen(false)}
                  className={`sa-nav-item${path === s.to ? ' active' : ''}`}
                >
                  <span style={{ flex: 1 }}>{s.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="sa-sidebar-footer">
          <div className="sa-profile-card">
            <div className="sa-profile-avatar">U</div>
            <div>
              <div className="sa-profile-name">{univProfile.name}</div>
              <div className="sa-profile-role">{univProfile.code}</div>
            </div>
          </div>
        </div>
      </aside>
      <div className={`sa-side-overlay${sideOpen ? ' open' : ''}`} onClick={() => setSideOpen(false)} />

      <div className="sa-main">
        <header className="sa-topbar">
          <div className="sa-topbar-left">
            <button type="button" className="sa-side-toggle" aria-label="Menu" onClick={() => setSideOpen((v) => !v)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div className="sa-topbar-badge"><strong>Université</strong> — {current.label}</div>
          </div>
          <div className="sa-topbar-right">
            <Link
              to="/login"
              className="sa-icon-btn-danger"
              title="Déconnexion"
              onClick={() => logout()}
            >
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
