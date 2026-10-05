import { useEffect, useState } from 'react';
import { Link } from '../../router';
import ProfileMenu from './ProfileMenu';
import { useApp } from '../../context/AppContext';
import { UNIVERSITIES } from '../../data/mock';

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export default function Universities() {
  const { tickets } = useApp();
  const [navOpen, setNavOpen] = useState(false);
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [navOpen]);

  const filtered = UNIVERSITIES.filter((u) => {
    const matchQ = `${u.name} ${u.city} ${u.code} ${u.id}`.toLowerCase().includes(q.toLowerCase());
    const matchF = filter === 'all' || (filter === 'active' ? u.status === 'Active' : u.status !== 'Active');
    return matchQ && matchF;
  });

  const totalStudents = UNIVERSITIES.reduce((s, u) => s + u.students, 0);
  const activeCount = UNIVERSITIES.filter((u) => u.status === 'Active').length;

  return (
    <>
      {/* HEADER — identique aux autres modules recruteur, sans sidebar */}
      <header className="inline-style-c70b66f1">
        <Link to="/dashboard" className="inline-style-0dc9c093">
          <div className="inline-style-af5efa97">
            <img className="brand-logo-full" src="assets/logo-biocampus.svg" alt="BRIO CAMPUS" />
          </div>
          <div>
            <div className="inline-style-11f1cc33">BioCampus</div>
            <div className="inline-style-1b6872d7">Espace Recruteur</div>
          </div>
        </Link>
        <nav className="header-nav" id="desktopNav">
          <Link to="/dashboard">Dashboard</Link>
          <ProfileMenu />
        </nav>
        <div className="d-flex align-items-center gap-3">
          <span className="inline-style-c77ce71d">
            <span className="ticket-count-num">{tickets}</span> tickets
          </span>
          <Link to="/" className="inline-style-6eed7d64" title="Déconnexion">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
          </Link>
          <button className={`hamburger${navOpen ? ' open' : ''}`} id="hamburger" onClick={() => setNavOpen((v) => !v)} aria-label="Menu"><span></span><span></span><span></span></button>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div className={`mobile-nav-overlay${navOpen ? ' open' : ''}`} id="mobileNavOverlay" onClick={(e) => { if (e.target === e.currentTarget) setNavOpen(false); }}>
        <div className="mobile-nav-panel">
          <button className="mobile-nav-close" id="mobileNavClose" onClick={() => setNavOpen(false)}>✕</button>
          <div className="inline-style-1bbc7b92">BioCampus</div>
          <Link to="/dashboard" onClick={() => setNavOpen(false)}>Dashboard</Link>
          <Link to="/profile" onClick={() => setNavOpen(false)}>Mon profil</Link>
          <details className="mobile-modules">
            <summary>Modules</summary>
            <div className="mobile-sub">
              <Link to="/verification" onClick={() => setNavOpen(false)}>Vérifier un candidat</Link>
              <Link to="/tickets" onClick={() => setNavOpen(false)}>Tickets</Link>
              <Link to="/downloads" onClick={() => setNavOpen(false)}>Téléchargements</Link>
              <Link to="/history" onClick={() => setNavOpen(false)}>Historique</Link>
              <Link to="/universites" onClick={() => setNavOpen(false)}>Universités</Link>
            </div>
          </details>
          <div className="inline-style-a8b228df">
            <Link to="/" className="inline-style-16eb5b7d" onClick={() => setNavOpen(false)}>Déconnexion</Link>
          </div>
        </div>
      </div>

      <main className="page-wrap">
        {/* Titre page */}
        <div className="d-flex justify-content-between align-items-center mb-6 page-title-row">
          <div>
            <h1 className="inline-style-7b8fff8f">Universités partenaires</h1>
            <p className="text-secondary inline-style-b84c7dfa">
              Registre des établissements interconnectés — source officielle de chaque vérification.
            </p>
          </div>
          <div className="badge badge-blue">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            {UNIVERSITIES.length} établissements
          </div>
        </div>

        {/* Stats */}
        <div className="grid-3 mb-6">
          <div className="card">
            <div className="text-secondary inline-style-c07f2ace">Établissements connectés</div>
            <div className="stat-number">{activeCount} / {UNIVERSITIES.length}</div>
            <p className="text-secondary" style={{ fontSize: 12 }}>Registres interrogeables en temps réel</p>
          </div>
          <div className="card">
            <div className="text-secondary inline-style-c07f2ace">Population étudiante couverte</div>
            <div className="stat-number">{(totalStudents / 1000000).toFixed(2)} M</div>
            <p className="text-secondary" style={{ fontSize: 12 }}>{totalStudents.toLocaleString('fr-FR')} dossiers vérifiables</p>
          </div>
          <div className="card">
            <div className="text-secondary inline-style-c07f2ace">Disponibilité réseau</div>
            <div className="stat-number">99.9%</div>
            <p className="text-secondary" style={{ fontSize: 12 }}>Horodatage certifié RFC 3161</p>
          </div>
        </div>

        {/* Filtres */}
        <div className="d-flex justify-content-between align-items-center mb-4" style={{ flexWrap: 'wrap', gap: 12 }}>
          <div className="filter-tabs">
            <button className={filter === 'all' ? 'filter-tab active' : 'filter-tab'} onClick={() => setFilter('all')}>
              Toutes ({UNIVERSITIES.length})
            </button>
            <button className={filter === 'active' ? 'filter-tab active' : 'filter-tab'} onClick={() => setFilter('active')}>
              Connectées ({activeCount})
            </button>
            <button className={filter === 'pending' ? 'filter-tab active' : 'filter-tab'} onClick={() => setFilter('pending')}>
              En attente ({UNIVERSITIES.length - activeCount})
            </button>
          </div>
          <div className="search-bar" style={{ minWidth: 260 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9aa2b8" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher : nom, ville, code..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Établissement</th>
                <th>Ville</th>
                <th>Code registre</th>
                <th>Étudiants</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div className="avatar" style={{ background: 'var(--bc-blue-soft)', color: 'var(--bc-blue)' }}>
                        {initials(u.name)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700 }}>{u.name}</div>
                        <div className="text-secondary text-mono" style={{ fontSize: 11 }}>{u.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>{u.city}</td>
                  <td><span className="ref-code">{u.code}</span></td>
                  <td>{u.students.toLocaleString('fr-FR')}</td>
                  <td>
                    <span className={u.status === 'Active' ? 'badge badge-verified' : 'badge badge-pending'}>
                      {u.status === 'Active' ? 'Connectée' : 'En attente'}
                    </span>
                  </td>
                  <td>
                    <Link to="/verification" className="action-btn-link">Vérifier →</Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-secondary" style={{ padding: 32 }}>
                    Aucun établissement ne correspond à « {q} ».
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="inline-style-d461d43d mt-4">
          <div className="inline-style-bc737815">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Source : registres officiels des établissements — conforme ESU
          </div>
          <span>Affichage de {filtered.length} sur {UNIVERSITIES.length} universités</span>
        </div>
      </main>
    </>
  );
}
