import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useApp } from '../../context/AppContext';

export default function AdminComptes() {
  const { adminComptes, setAdminComptes, logAdmin } = useApp();
  const [q, setQ] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [newCompte, setNewCompte] = useState({ name: '', email: '', role: 'Recruteur', org: '' });

  const comptesFiltres = adminComptes.filter((c) => {
    const okQ = `${c.name} ${c.email} ${c.org}`.toLowerCase().includes(q.toLowerCase());
    const okR = roleFilter === 'all' || c.role === roleFilter;
    return okQ && okR;
  });

  const toggleCompte = (id) => {
    setAdminComptes((cs) => cs.map((c) => {
      if (c.id !== id) return c;
      const next = c.status === 'Actif' ? 'Suspendu' : 'Actif';
      logAdmin(next === 'Actif' ? 'Compte réactivé' : 'Compte suspendu', `${c.email} • ${c.role}`);
      return { ...c, status: next };
    }));
  };

  const addCompte = (e) => {
    e.preventDefault();
    if (!newCompte.name || !newCompte.email) return;
    setAdminComptes((cs) => [...cs, { id: Date.now(), ...newCompte, status: 'En attente', lastLogin: '—' }]);
    logAdmin('Compte créé', `${newCompte.email} • rôle ${newCompte.role}`);
    setNewCompte({ name: '', email: '', role: 'Recruteur', org: '' });
  };

  return (
    <AdminLayout>
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
    </AdminLayout>
  );
}
