import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Link } from '../../router';
import { useApp } from '../../context/AppContext';

export default function AdminUniversites() {
  const { adminUnis, setAdminUnis, logAdmin } = useApp();
  const [newUni, setNewUni] = useState({ name: '', city: '', code: '' });

  const toggleUni = (id) => {
    setAdminUnis((list) => list.map((u) => {
      if (u.id !== id) return u;
      const next = u.status === 'Active' ? 'En attente' : 'Active';
      logAdmin(next === 'Active' ? 'Université connectée' : 'Université suspendue', `${u.name} • ${u.code}`);
      return { ...u, status: next };
    }));
  };

  const addUni = (e) => {
    e.preventDefault();
    if (!newUni.name || !newUni.city) return;
    const id = newUni.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 4) || `U${Date.now() % 1000}`;
    setAdminUnis((list) => [...list, { id, name: newUni.name, city: newUni.city, code: newUni.code || `CD-${newUni.city.slice(0, 3).toUpperCase()}-00${list.length + 1}`, students: 0, status: 'En attente' }]);
    logAdmin('Université ajoutée', `${newUni.name} • ${newUni.city}`);
    setNewUni({ name: '', city: '', code: '' });
  };

  return (
    <AdminLayout>
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
            {adminUnis.map((u) => (
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
    </AdminLayout>
  );
}
