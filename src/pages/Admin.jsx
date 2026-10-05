import { useMemo, useState } from 'react';
import { Link } from '../router';
import { useApp } from '../context/AppContext';
import { INITIAL_PURCHASES, STATUS_BADGE, TICKET_PACKS, UNIVERSITIES } from '../data/mock';

const SECTIONS = [
  { id: 'overview', label: "Vue d'ensemble" },
  { id: 'comptes', label: 'Comptes' },
  { id: 'recruteurs', label: 'abonnements' },
  { id: 'universites', label: 'Universités' },
  { id: 'verifications', label: 'Vérifications' },
  { id: 'tickets', label: 'Tickets' },
  { id: 'audit', label: 'Sécurité' },
];

const ICONS = {
  overview: (<><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></>),
  comptes: (<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>),
  recruteurs: (<><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>),
  universites: (<><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>),
  verifications: (<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>),
  tickets: (<><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" /></>),
  audit: (<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>),
};

const SEED_COMPTES = [
  { id: 1, name: 'Admin BioCampus', email: 'admin@biocampus.cd', role: 'Admin', org: 'BioCampus', status: 'Actif', lastLogin: '05/10/2026 à 08:12' },
  { id: 2, name: 'Alexandre Dupont', email: 'a.dupont@kintalents.cd', role: 'Recruteur', org: 'Cabinet Kin Talents', status: 'Actif', lastLogin: '05/10/2026 à 07:58' },
  { id: 3, name: 'Aline Mbuyi', email: 'a.mbuyi@banque.cd', role: 'Recruteur', org: 'Banque Commerciale', status: 'Actif', lastLogin: '04/10/2026 à 16:40' },
  { id: 4, name: 'Patrick Okito', email: 'p.okito@gombe-talents.cd', role: 'Recruteur', org: 'Gombe Talents', status: 'En attente', lastLogin: '02/10/2026 à 11:05' },
  { id: 5, name: 'Dr. Fatou Diallo', email: 'f.diallo@sante-bkv.cd', role: 'Recruteur', org: 'Santé Bukavu', status: 'Actif', lastLogin: '03/10/2026 à 09:22' },
  { id: 6, name: 'Registre UNIKIN', email: 'registre@unikin.cd', role: 'Université', org: 'Université de Kinshasa', status: 'Actif', lastLogin: '05/10/2026 à 06:30' },
  { id: 7, name: 'Registre UNILU', email: 'registre@unilu.cd', role: 'Université', org: 'Université de Lubumbashi', status: 'Actif', lastLogin: '04/10/2026 à 14:11' },
  { id: 8, name: 'Registre UNIKIS', email: 'registre@unikis.cd', role: 'Université', org: 'Université de Kisangani', status: 'En attente', lastLogin: '—' },
];

const SEED_RECRUTEURS = [
  { id: 1, company: 'Cabinet Kin Talents', contact: 'Alexandre Dupont', email: 'a.dupont@kintalents.cd', tickets: 8, verifs: 12, pack: 'Pack Recruteur', status: 'Actif' },
  { id: 2, company: 'Banque Commerciale', contact: 'Aline Mbuyi', email: 'a.mbuyi@banque.cd', tickets: 45, verifs: 132, pack: 'Pack Entreprise', status: 'Actif' },
  { id: 3, company: 'Gombe Talents', contact: 'Patrick Okito', email: 'p.okito@gombe-talents.cd', tickets: 0, verifs: 3, pack: 'Pack Découverte', status: 'En attente' },
  { id: 4, company: 'Santé Bukavu', contact: 'Dr. Fatou Diallo', email: 'f.diallo@sante-bkv.cd', tickets: 22, verifs: 58, pack: 'Pack Recruteur', status: 'Actif' },
];

const SEED_AUDIT = [
  { date: '05/10/2026 08:12:04 UTC', actor: 'admin@biocampus.cd', event: 'Connexion admin réussie', detail: 'IP 196.168.1.10 • MFA validé', status: 'OK' },
  { date: '05/10/2026 07:58:41 UTC', actor: 'a.dupont@kintalents.cd', event: 'Vérification BC-2026-0483 consultée', detail: 'Université de Kinshasa • hash vérifié', status: 'OK' },
  { date: '04/10/2026 16:40:02 UTC', actor: 'système', event: 'Achat Pack Recruteur (+50 tickets)', detail: 'Banque Commerciale • 199 $ • Payé', status: 'OK' },
  { date: '03/10/2026 22:14:55 UTC', actor: 'système', event: 'Tentative de connexion bloquée', detail: 'registre@unikis.cd • 5 échecs • IP mise en quarantaine', status: 'Alerte' },
];

function nowStamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())} UTC`;
}

export default function Admin() {
  const { verifications, purchases, setUser } = useApp();
  const [section, setSection] = useState('overview');
  const [comptes, setComptes] = useState(SEED_COMPTES);
  const [recruteurs, setRecruteurs] = useState(SEED_RECRUTEURS);
  const [unis, setUnis] = useState(UNIVERSITIES);
  const [extraPurchases, setExtraPurchases] = useState([]);
  const [audit, setAudit] = useState(SEED_AUDIT);
  const [q, setQ] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [verifFilter, setVerifFilter] = useState('all');
  const [sideOpen, setSideOpen] = useState(false);

  // Formulaires
  const [newCompte, setNewCompte] = useState({ name: '', email: '', role: 'Recruteur', org: '' });
  const [newUni, setNewUni] = useState({ name: '', city: '', code: '' });
  const [credit, setCredit] = useState({ id: '', qty: 10 });

  const log = (event, detail, status = 'OK', actor = 'admin@biocampus.cd') =>
    setAudit((a) => [{ date: nowStamp(), actor, event, detail, status }, ...a]);

  const stats = useMemo(() => {
    const actifs = comptes.filter((c) => c.status === 'Actif').length;
    const recruteursActifs = recruteurs.filter((r) => r.status === 'Actif').length;
    const unisActives = unis.filter((u) => u.status === 'Active').length;
    const ticketsCirculation = recruteurs.reduce((s, r) => s + r.tickets, 0);
    return {
      comptes: comptes.length, actifs,
      recruteurs: recruteurs.length, recruteursActifs,
      unis: unis.length, unisActives,
      verifs: verifications.length,
      ticketsCirculation,
      revenus: [...purchases, ...extraPurchases].length * 0 + 248, // base simulée + achats
    };
  }, [comptes, recruteurs, unis, verifications, purchases, extraPurchases]);

  const comptesFiltres = comptes.filter((c) => {
    const okQ = `${c.name} ${c.email} ${c.org}`.toLowerCase().includes(q.toLowerCase());
    const okR = roleFilter === 'all' || c.role === roleFilter;
    return okQ && okR;
  });

  const verifsFiltrees = verifications.filter((v) => {
    const okQ = `${v.candidate} ${v.diploma} ${v.university} ${v.id}`.toLowerCase().includes(q.toLowerCase());
    const okF = verifFilter === 'all' || v.status === verifFilter;
    return okQ && okF;
  });

  // Badges affichés dans la sidebar (compteurs temps réel)
  const pendingRecruteurs = recruteurs.filter((r) => r.status === 'En attente').length;
  const alertCount = audit.filter((a) => a.status === 'Alerte').length;
  const sideBadges = {
    comptes: { text: String(comptes.length) },
    recruteurs: pendingRecruteurs > 0 ? { text: String(pendingRecruteurs), tone: 'warn' } : null,
    universites: { text: `${stats.unisActives}/${stats.unis}` },
    verifications: { text: String(stats.verifs) },
    tickets: { text: String(stats.ticketsCirculation) },
    audit: alertCount > 0 ? { text: String(alertCount), tone: 'alert' } : null,
  };

  const toggleCompte = (id) => {
    setComptes((cs) => cs.map((c) => {
      if (c.id !== id) return c;
      const next = c.status === 'Actif' ? 'Suspendu' : 'Actif';
      log(next === 'Actif' ? 'Compte réactivé' : 'Compte suspendu', `${c.email} • ${c.role}`);
      return { ...c, status: next };
    }));
  };

  const addCompte = (e) => {
    e.preventDefault();
    if (!newCompte.name || !newCompte.email) return;
    setComptes((cs) => [...cs, { id: Date.now(), ...newCompte, status: 'En attente', lastLogin: '—' }]);
    log('Compte créé', `${newCompte.email} • rôle ${newCompte.role}`);
    setNewCompte({ name: '', email: '', role: 'Recruteur', org: '' });
  };

  const toggleRecruteur = (id) => {
    setRecruteurs((rs) => rs.map((r) => {
      if (r.id !== id) return r;
      const next = r.status === 'Actif' ? 'Suspendu' : 'Actif';
      log(next === 'Actif' ? 'Entreprise réactivée' : 'Entreprise suspendue', `${r.company} • ${r.email}`);
      return { ...r, status: next === 'Suspendu' ? 'Suspendu' : r.status === 'En attente' && next === 'Actif' ? 'Actif' : next };
    }));
  };

  const validerRecruteur = (id) => {
    setRecruteurs((rs) => rs.map((r) => (r.id === id ? { ...r, status: 'Actif' } : r)));
    const r = recruteurs.find((x) => x.id === id);
    log('Entreprise validée (KYC)', `${r?.company} • ${r?.email}`);
  };

  const crediter = (e) => {
    e.preventDefault();
    if (!credit.id) return;
    setRecruteurs((rs) => rs.map((r) => (r.id === Number(credit.id) ? { ...r, tickets: r.tickets + Number(credit.qty) } : r)));
    const r = recruteurs.find((x) => x.id === Number(credit.id));
    setExtraPurchases((p) => [{ date: nowStamp().slice(0, 10), desc: `Crédit manuel admin (+${credit.qty}) — ${r?.company}`, qty: `+${credit.qty} tickets`, status: 'Payé' }, ...p]);
    log('Crédit tickets manuel', `${r?.company} • +${credit.qty} tickets`);
  };

  const toggleUni = (id) => {
    setUnis((list) => list.map((u) => {
      if (u.id !== id) return u;
      const next = u.status === 'Active' ? 'En attente' : 'Active';
      log(next === 'Active' ? 'Université connectée' : 'Université suspendue', `${u.name} • ${u.code}`);
      return { ...u, status: next };
    }));
  };

  const addUni = (e) => {
    e.preventDefault();
    if (!newUni.name || !newUni.city) return;
    const id = newUni.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 4) || `U${Date.now() % 1000}`;
    setUnis((list) => [...list, { id, name: newUni.name, city: newUni.city, code: newUni.code || `CD-${newUni.city.slice(0, 3).toUpperCase()}-00${list.length + 1}`, students: 0, status: 'En attente' }]);
    log('Université ajoutée', `${newUni.name} • ${newUni.city}`);
    setNewUni({ name: '', city: '', code: '' });
  };

  const exportAudit = () => {
    const blob = new Blob([JSON.stringify(audit, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'biocampus-audit.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const navBtn = (s) => {
    const badge = sideBadges[s.id];
    return (
      <li key={s.id}>
        <button
          type="button"
          onClick={() => { setSection(s.id); setQ(''); setSideOpen(false); }}
          className={`sa-nav-item${section === s.id ? ' active' : ''}`}
          style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}
        >
          <span className="icon">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {ICONS[s.id]}
            </svg>
          </span>
          <span style={{ flex: 1 }}>{s.label}</span>
          {badge && <span className={`sa-nav-badge${badge.tone ? ` ${badge.tone}` : ''}`}>{badge.text}</span>}
        </button>
      </li>
    );
  };

  return (
    <div className="sa-layout">
      {/* SIDEBAR */}
      <aside className={`sa-sidebar${sideOpen ? ' open' : ''}`}>
        <div className="sa-sidebar-header">
          <Link to="/admin" className="sa-logo" onClick={() => setSideOpen(false)}>
            <img className="brand-logo-full" src="assets/logo-biocampus.svg" alt="BRIO CAMPUS" />
            <div><div className="sa-logo-sub">Administration</div></div>
          </Link>
        </div>
        <div className="sa-role-badge"><span className="dot"></span> SUPER ADMIN / PLATEFORME</div>
        <nav className="sa-nav-section">
          <div className="sa-nav-title">Pilotage</div>
          <ul className="sa-nav-menu">
            {SECTIONS.slice(0, 1).map(navBtn)}
          </ul>
        </nav>
        <nav className="sa-nav-section">
          <div className="sa-nav-title">Gestion</div>
          <ul className="sa-nav-menu">{SECTIONS.slice(1, 4).map(navBtn)}</ul>
        </nav>
        <nav className="sa-nav-section">
          <div className="sa-nav-title">Opérations & Sécurité</div>
          <ul className="sa-nav-menu">{SECTIONS.slice(4).map(navBtn)}</ul>
        </nav>
        <div className="sa-sidebar-footer">
          <div className="sa-profile-card">
            <div className="sa-profile-avatar">A</div>
            <div>
              <div className="sa-profile-name">Admin BioCampus</div>
              <div className="sa-profile-role">Super Administrateur</div>
            </div>
          </div>
        </div>
      </aside>
      <div className={`sa-side-overlay${sideOpen ? ' open' : ''}`} onClick={() => setSideOpen(false)} />

      {/* MAIN */}
      <div className="sa-main">
        <header className="sa-topbar">
          <div className="sa-topbar-left">
            <button type="button" className="sa-side-toggle" aria-label="Menu admin" onClick={() => setSideOpen((v) => !v)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div className="sa-topbar-badge"><strong>Espace Admin</strong> — {SECTIONS.find((s) => s.id === section)?.label}</div>
            <div className="sa-topbar-badge"><span className="dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}></span>Disponibilité 99.99%</div>
          </div>
          <div className="sa-topbar-right">
            <div className="sa-topbar-badge">Alertes sécurité ({audit.filter((a) => a.status === 'Alerte').length})</div>
            <Link to="/" className="sa-icon-btn-danger" title="Déconnexion" aria-label="Déconnexion" onClick={() => setUser((u) => ({ ...u, loggedIn: false }))}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </Link>
          </div>
        </header>

        <main className="sa-content">
          {/* ============ VUE D'ENSEMBLE ============ */}
          {section === 'overview' && (
            <>
              <div className="sa-page-header">
                <div>
                  <div className="sa-breadcrumbs">ADMIN › <span>VUE D&apos;ENSEMBLE</span></div>
                  <h1 className="sa-page-title">Pilotage de la plateforme</h1>
                  <p className="sa-page-desc">Comptes, recruteurs, universités, vérifications et revenus — calculés depuis les données existantes.</p>
                </div>
              </div>
              <div className="sa-stats-row">
                <div className="sa-stat-card"><div className="sa-stat-title">COMPTES ({stats.actifs} ACTIFS)</div><div className="sa-stat-val">{stats.comptes}</div></div>
                <div className="sa-stat-card"><div className="sa-stat-title">RECRUTEURS ACTIFS</div><div className="sa-stat-val">{stats.recruteursActifs} <span className="sa-stat-sub">/ {stats.recruteurs}</span></div></div>
                <div className="sa-stat-card"><div className="sa-stat-title">UNIVERSITÉS CONNECTÉES</div><div className="sa-stat-val">{stats.unisActives} <span className="sa-stat-sub">/ {stats.unis}</span></div></div>
                <div className="sa-stat-card"><div className="sa-stat-title">VÉRIFICATIONS</div><div className="sa-stat-val">{stats.verifs}</div></div>
                <div className="sa-stat-card"><div className="sa-stat-title">TICKETS EN CIRCULATION</div><div className="sa-stat-val">{stats.ticketsCirculation}</div></div>
              </div>
              <div className="sa-table-container">
                <table className="sa-table">
                  <thead><tr><th>DERNIÈRES ACTIVITÉS</th><th>ACTEUR</th><th>DÉTAIL</th><th>STATUT</th></tr></thead>
                  <tbody>
                    {audit.slice(0, 5).map((a, i) => (
                      <tr key={i}><td>{a.date}</td><td>{a.actor}</td><td>{a.event} — {a.detail}</td><td><span className="sa-status-badge" style={a.status === 'Alerte' ? { background: '#fde4e1', color: '#d92d20' } : {}}>{a.status}</span></td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ============ COMPTES ============ */}
          {section === 'comptes' && (
            <>
              <div className="sa-page-header">
                <div>
                  <div className="sa-breadcrumbs">ADMIN › <span>COMPTES</span></div>
                  <h1 className="sa-page-title">Gestion des comptes</h1>
                  <p className="sa-page-desc">Admins, recruteurs et comptes registres universitaires.</p>
                </div>
              </div>
              <div className="card mb-6">
                <h4 className="mb-4">＋ Créer un compte</h4>
                <form onSubmit={addCompte} className="d-flex gap-4" style={{ flexWrap: 'wrap' }}>
                  <input className="form-control" style={{ maxWidth: 200 }} placeholder="Nom complet" value={newCompte.name} onChange={(e) => setNewCompte({ ...newCompte, name: e.target.value })} required />
                  <input className="form-control" style={{ maxWidth: 240 }} placeholder="Email" type="email" value={newCompte.email} onChange={(e) => setNewCompte({ ...newCompte, email: e.target.value })} required />
                  <input className="form-control" style={{ maxWidth: 220 }} placeholder="Organisation" value={newCompte.org} onChange={(e) => setNewCompte({ ...newCompte, org: e.target.value })} />
                  <select className="form-control" style={{ maxWidth: 160 }} value={newCompte.role} onChange={(e) => setNewCompte({ ...newCompte, role: e.target.value })}>
                    <option>Recruteur</option><option>Université</option><option>Admin</option>
                  </select>
                  <button className="btn btn-primary btn-sm" type="submit">Créer</button>
                </form>
              </div>
              <div className="sa-filters mb-4 d-flex gap-4" style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                <div className="search-bar" style={{ minWidth: 240 }}>
                  <input placeholder="Rechercher nom, email, organisation..." value={q} onChange={(e) => setQ(e.target.value)} />
                </div>
                <select className="form-control" style={{ maxWidth: 180 }} value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                  <option value="all">Tous les rôles</option><option>Admin</option><option>Recruteur</option><option>Université</option>
                </select>
              </div>
              <div className="sa-table-container">
                <table className="sa-table">
                  <thead><tr><th>COMPTE</th><th>RÔLE</th><th>ORGANISATION</th><th>DERNIÈRE CONNEXION</th><th>STATUT</th><th>ACTIONS</th></tr></thead>
                  <tbody>
                    {comptesFiltres.map((c) => (
                      <tr key={c.id}>
                        <td><div style={{ fontWeight: 700 }}>{c.name}</div><div className="text-secondary" style={{ fontSize: 12 }}>{c.email}</div></td>
                        <td><span className="badge badge-blue">{c.role}</span></td>
                        <td>{c.org}</td><td>{c.lastLogin}</td>
                        <td><span className={`badge ${c.status === 'Actif' ? 'badge-verified' : c.status === 'En attente' ? 'badge-pending' : 'badge-failed'}`}>{c.status}</span></td>
                        <td><button className="btn btn-secondary btn-sm" onClick={() => toggleCompte(c.id)}>{c.status === 'Actif' ? 'Suspendre' : 'Activer'}</button></td>
                      </tr>
                    ))}
                    {comptesFiltres.length === 0 && <tr><td colSpan="6" className="text-center text-secondary" style={{ padding: 24 }}>Aucun compte trouvé.</td></tr>}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ============ RECRUTEURS ============ */}
          {section === 'recruteurs' && (
            <>
              <div className="sa-page-header">
                <div>
                  <div className="sa-breadcrumbs">ADMIN › <span>RECRUTEURS</span></div>
                  <h1 className="sa-page-title">abonnements</h1>
                  <p className="sa-page-desc">Validation KYC, soldes tickets et suivi des vérifications.</p>
                </div>
              </div>
              <div className="card mb-6">
                <h4 className="mb-4">⚡ Créditer des tickets (geste admin)</h4>
                <form onSubmit={crediter} className="d-flex gap-4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <select className="form-control" style={{ maxWidth: 260 }} value={credit.id} onChange={(e) => setCredit({ ...credit, id: e.target.value })} required>
                    <option value="">Choisir une entreprise...</option>
                    {recruteurs.map((r) => <option key={r.id} value={r.id}>{r.company} ({r.tickets} tickets)</option>)}
                  </select>
                  <input className="form-control" style={{ maxWidth: 140 }} type="number" min="1" max="500" value={credit.qty} onChange={(e) => setCredit({ ...credit, qty: e.target.value })} />
                  <button className="btn btn-primary btn-sm" type="submit">Créditer</button>
                </form>
              </div>
              <div className="sa-table-container">
                <table className="sa-table">
                  <thead><tr><th>ENTREPRISE</th><th>CONTACT</th><th>TICKETS</th><th>VÉRIFS</th><th>PACK</th><th>STATUT</th><th>ACTIONS</th></tr></thead>
                  <tbody>
                    {recruteurs.map((r) => (
                      <tr key={r.id}>
                        <td><div style={{ fontWeight: 700 }}>{r.company}</div></td>
                        <td><div>{r.contact}</div><div className="text-secondary" style={{ fontSize: 12 }}>{r.email}</div></td>
                        <td><strong>{r.tickets}</strong></td><td>{r.verifs}</td><td>{r.pack}</td>
                        <td><span className={`badge ${r.status === 'Actif' ? 'badge-verified' : r.status === 'En attente' ? 'badge-pending' : 'badge-failed'}`}>{r.status}</span></td>
                        <td>
                          <div className="d-flex gap-2" style={{ display: 'flex', gap: 8 }}>
                            {r.status === 'En attente' && <button className="btn btn-primary btn-sm" onClick={() => validerRecruteur(r.id)}>Valider KYC</button>}
                            <button className="btn btn-secondary btn-sm" onClick={() => toggleRecruteur(r.id)}>{r.status === 'Actif' ? 'Suspendre' : 'Activer'}</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ============ UNIVERSITÉS ============ */}
          {section === 'universites' && (
            <>
              <div className="sa-page-header">
                <div>
                  <div className="sa-breadcrumbs">ADMIN › <span>UNIVERSITÉS</span></div>
                  <h1 className="sa-page-title">Registre des universités</h1>
                  <p className="sa-page-desc">Connexion des registres officiels — même source que l&apos;espace recruteur.</p>
                </div>
                <div className="sa-actions"><Link to="/universites" className="sa-btn sa-btn-outline">Voir côté recruteur →</Link></div>
              </div>
              <div className="card mb-6">
                <h4 className="mb-4">＋ Ajouter un établissement</h4>
                <form onSubmit={addUni} className="d-flex gap-4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <input className="form-control" style={{ maxWidth: 260 }} placeholder="Nom de l'établissement" value={newUni.name} onChange={(e) => setNewUni({ ...newUni, name: e.target.value })} required />
                  <input className="form-control" style={{ maxWidth: 180 }} placeholder="Ville" value={newUni.city} onChange={(e) => setNewUni({ ...newUni, city: e.target.value })} required />
                  <input className="form-control" style={{ maxWidth: 180 }} placeholder="Code (auto si vide)" value={newUni.code} onChange={(e) => setNewUni({ ...newUni, code: e.target.value })} />
                  <button className="btn btn-primary btn-sm" type="submit">Ajouter</button>
                </form>
              </div>
              <div className="sa-table-container">
                <table className="sa-table">
                  <thead><tr><th>ÉTABLISSEMENT</th><th>VILLE</th><th>CODE</th><th>ÉTUDIANTS</th><th>STATUT</th><th>ACTIONS</th></tr></thead>
                  <tbody>
                    {unis.map((u) => (
                      <tr key={u.id}>
                        <td><div style={{ fontWeight: 700 }}>{u.name}</div><div className="text-secondary text-mono" style={{ fontSize: 11 }}>{u.id}</div></td>
                        <td>{u.city}</td><td><span className="ref-code">{u.code}</span></td>
                        <td>{u.students.toLocaleString('fr-FR')}</td>
                        <td><span className={`badge ${u.status === 'Active' ? 'badge-verified' : 'badge-pending'}`}>{u.status === 'Active' ? 'Connectée' : 'En attente'}</span></td>
                        <td><button className="btn btn-secondary btn-sm" onClick={() => toggleUni(u.id)}>{u.status === 'Active' ? 'Suspendre' : 'Connecter'}</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ============ VÉRIFICATIONS ============ */}
          {section === 'verifications' && (
            <>
              <div className="sa-page-header">
                <div>
                  <div className="sa-breadcrumbs">ADMIN › <span>VÉRIFICATIONS</span></div>
                  <h1 className="sa-page-title">Toutes les vérifications</h1>
                  <p className="sa-page-desc">Supervision globale des dossiers (données partagées avec l&apos;espace recruteur).</p>
                </div>
              </div>
              <div className="sa-filters mb-4" style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                <div className="search-bar" style={{ minWidth: 240 }}>
                  <input placeholder="Candidat, diplôme, ID..." value={q} onChange={(e) => setQ(e.target.value)} />
                </div>
                <select className="form-control" style={{ maxWidth: 200 }} value={verifFilter} onChange={(e) => setVerifFilter(e.target.value)}>
                  <option value="all">Tous statuts</option>
                  <option value="verified">Certifié conforme</option>
                  <option value="pending">En cours</option>
                  <option value="incomplete">Incomplet</option>
                  <option value="failed">Non vérifié</option>
                </select>
              </div>
              <div className="sa-table-container">
                <table className="sa-table">
                  <thead><tr><th>RÉF</th><th>CANDIDAT</th><th>DIPLÔME</th><th>UNIVERSITÉ</th><th>DATE</th><th>STATUT</th></tr></thead>
                  <tbody>
                    {verifsFiltrees.map((v) => (
                      <tr key={v.id}>
                        <td><span className="ref-code">{v.id}</span></td>
                        <td><div style={{ fontWeight: 700 }}>{v.candidate}</div><div className="text-secondary" style={{ fontSize: 12 }}>{v.email}</div></td>
                        <td><div>{v.diploma}</div><div className="text-secondary" style={{ fontSize: 12 }}>{v.detail}</div></td>
                        <td>{v.university}</td><td>{v.date}</td>
                        <td><span className={`badge ${STATUS_BADGE[v.status]}`}>{v.statusLabel}</span></td>
                      </tr>
                    ))}
                    {verifsFiltrees.length === 0 && <tr><td colSpan="6" className="text-center text-secondary" style={{ padding: 24 }}>Aucune vérification.</td></tr>}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ============ TICKETS ============ */}
          {section === 'tickets' && (
            <>
              <div className="sa-page-header">
                <div>
                  <div className="sa-breadcrumbs">ADMIN › <span>TICKETS</span></div>
                  <h1 className="sa-page-title">Tickets & Transactions</h1>
                  <p className="sa-page-desc">Catalogue des packs et historique des achats (1 ticket = 1 vérification).</p>
                </div>
              </div>
              <div className="grid-3 mb-6">
                {TICKET_PACKS.map((p) => (
                  <div className="card text-center" key={p.id}>
                    {p.popular && <span className="badge badge-pending mb-4">Le plus choisi</span>}
                    <h4>{p.name}</h4>
                    <div className="stat-number">{p.price} <small style={{ fontSize: 13 }}>/ {p.count}</small></div>
                    <p className="text-secondary" style={{ fontSize: 12 }}>{p.desc}</p>
                  </div>
                ))}
              </div>
              <div className="sa-table-container">
                <table className="sa-table">
                  <thead><tr><th>DATE</th><th>DESCRIPTION</th><th>QUANTITÉ</th><th>STATUT</th></tr></thead>
                  <tbody>
                    {[...extraPurchases, ...purchases, ...INITIAL_PURCHASES.filter((pp) => !purchases.some((x) => x.date === pp.date && x.desc === pp.desc))].map((p, i) => (
                      <tr key={i}><td>{p.date}</td><td>{p.desc}</td><td>{p.qty}</td><td><span className="badge badge-verified">{p.status}</span></td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ============ AUDIT ============ */}
          {section === 'audit' && (
            <>
              <div className="sa-page-header">
                <div>
                  <div className="sa-breadcrumbs">ADMIN › <span>SÉCURITÉ</span></div>
                  <h1 className="sa-page-title">Journal d&apos;audit</h1>
                  <p className="sa-page-desc">Traçabilité immuable — chaque action admin ci-dessus y est consignée.</p>
                </div>
                <div className="sa-actions" style={{ display: 'flex', gap: 8 }}>
                  <button className="sa-btn sa-btn-outline" onClick={exportAudit}>Exporter (JSON)</button>
                  <Link to="/audit-logs" className="sa-btn sa-btn-primary">Vue détaillée →</Link>
                </div>
              </div>
              <div className="sa-stats-row">
                <div className="sa-stat-card"><div className="sa-stat-title">ÉVÉNEMENTS</div><div className="sa-stat-val">{audit.length}</div></div>
                <div className="sa-stat-card"><div className="sa-stat-title">ALERTES</div><div className="sa-stat-val" style={{ color: '#d92d20' }}>{audit.filter((a) => a.status === 'Alerte').length}</div></div>
              </div>
              <div className="sa-table-container">
                <table className="sa-table">
                  <thead><tr><th>DATE & HEURE (UTC)</th><th>ACTEUR</th><th>ÉVÉNEMENT</th><th>DÉTAIL</th><th>STATUT</th></tr></thead>
                  <tbody>
                    {audit.map((a, i) => (
                      <tr key={i}><td>{a.date}</td><td>{a.actor}</td><td>{a.event}</td><td>{a.detail}</td>
                        <td><span className="sa-status-badge" style={a.status === 'Alerte' ? { background: '#fde4e1', color: '#d92d20' } : {}}>{a.status}</span></td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
