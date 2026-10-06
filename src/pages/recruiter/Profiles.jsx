import { useEffect, useState } from 'react';
import { Link } from '../../router';
import ProfileMenu from './ProfileMenu';
import { useApp } from '../../context/AppContext';

export default function Profiles() {
  const { rhProfiles, setRhProfiles, tickets } = useApp();
  const [navOpen, setNavOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', title: '' });

  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [navOpen]);

  const add = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setRhProfiles((list) => [...list, { id: Date.now(), ...form, status: 'Actif' }]);
    setForm({ name: '', email: '', title: '' });
  };

  const toggle = (id) => {
    setRhProfiles((list) => list.map((p) => {
      if (p.id !== id) return p;
      return { ...p, status: p.status === 'Actif' ? 'Suspendu' : 'Actif' };
    }));
  };

  const remove = (id) => setRhProfiles((list) => list.filter((p) => p.id !== id));

  return (
    <>
      <header className="db-topbar">
        <div className="d-flex align-items-center gap-6">
          <Link to="/dashboard" className="db-logo">
            <img className="brand-logo-full" src="assets/logo-biocampus.svg" alt="BRIO CAMPUS" />
            <div><div className="db-logo-sub">Espace RH</div></div>
          </Link>
        </div>
        <nav className="db-topbar-nav">
          <Link to="/dashboard">Dashboard</Link>
          <ProfileMenu />
        </nav>
        <div className="db-topbar-right">
          <Link to="/tickets" className="db-tickets-pill">
            <span><span className="ticket-count-num">{tickets}</span> tickets</span>
          </Link>
          <Link to="/login" className="sa-icon-btn-danger" title="Déconnexion">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
          </Link>
          <button className={`hamburger${navOpen ? ' open' : ''}`} aria-label="Menu" onClick={() => setNavOpen((v) => !v)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      <div className={`mobile-nav-overlay${navOpen ? ' open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setNavOpen(false); }}>
        <div className="mobile-nav-panel">
          <button className="mobile-nav-close" onClick={() => setNavOpen(false)}>✕</button>
          <Link to="/dashboard" onClick={() => setNavOpen(false)}>Dashboard</Link>
          <Link to="/verification" onClick={() => setNavOpen(false)}>Recherche diplômé</Link>
          <Link to="/tickets" onClick={() => setNavOpen(false)}>Tickets</Link>
          <Link to="/history" onClick={() => setNavOpen(false)}>Historique</Link>
          <Link to="/profiles" onClick={() => setNavOpen(false)}>Profils équipe</Link>
          <Link to="/profile" onClick={() => setNavOpen(false)}>Mon compte</Link>
        </div>
      </div>

      <main className="page-wrap">
        <h1 className="mb-2">Profils utilisateurs</h1>
        <p className="text-secondary mb-6">Créer, consulter, modifier et supprimer les profils de l&apos;équipe RH.</p>

        <div className="card mb-6">
          <h4 className="mb-4">＋ Ajouter un profil</h4>
          <form onSubmit={add} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input className="form-control" style={{ maxWidth: 200 }} placeholder="Nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input className="form-control" style={{ maxWidth: 240 }} type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <input className="form-control" style={{ maxWidth: 200 }} placeholder="Fonction" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <button className="btn btn-primary btn-sm" type="submit">Créer</button>
          </form>
        </div>

        <div className="sa-table-container">
          <table className="sa-table">
            <thead>
              <tr><th>NOM</th><th>EMAIL</th><th>FONCTION</th><th>STATUT</th><th>ACTIONS</th></tr>
            </thead>
            <tbody>
              {rhProfiles.map((p) => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 700 }}>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.title}</td>
                  <td>
                    <span className={`badge ${p.status === 'Actif' ? 'badge-verified' : 'badge-failed'}`}>{p.status}</span>
                  </td>
                  <td style={{ display: 'flex', gap: 8 }}>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => toggle(p.id)}>
                      {p.status === 'Actif' ? 'Suspendre' : 'Activer'}
                    </button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => remove(p.id)}>Supprimer</button>
                  </td>
                </tr>
              ))}
              {rhProfiles.length === 0 && (
                <tr><td colSpan="5" className="text-center text-secondary" style={{ padding: 24 }}>Aucun profil.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
