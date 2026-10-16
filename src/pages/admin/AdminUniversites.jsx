import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useApp } from '../../context/AppContext';

const emptyForm = {
  name: '',
  city: '',
  code: '',
  email: '',
};

export default function AdminUniversites() {
  const { adminUnis, setAdminUnis, logAdmin } = useApp();
  const [newUni, setNewUni] = useState(emptyForm);

  const toggleUni = (u) => {
    const nextActive = u.status !== 'Active';
    setAdminUnis((list) => list.map((x) => (
      x.id === u.id ? { ...x, status: nextActive ? 'Active' : 'En attente' } : x
    )));
    logAdmin(nextActive ? 'Université connectée' : 'Université suspendue', `${u.name} • ${u.code || u.id}`);
  };

  const removeUni = (u) => {
    setAdminUnis((list) => list.filter((x) => x.id !== u.id));
    logAdmin('Université supprimée', `${u.name} • ${u.code || u.id}`);
  };

  const addUni = (e) => {
    e.preventDefault();
    if (!newUni.name || !newUni.city) return;
    const id = newUni.name.split(' ').map((word) => word[0]).join('').toUpperCase().slice(0, 4) || `U${Date.now() % 1000}`;
    setAdminUnis((list) => [...list, {
      id,
      name: newUni.name,
      city: newUni.city,
      code: newUni.code || `CD-${newUni.city.slice(0, 3).toUpperCase()}-00${adminUnis.length + 1}`,
      students: 0,
      status: 'En attente',
      contactEmail: newUni.email,
    }]);
    logAdmin('Université créée', `${newUni.name} • ${newUni.email || 'sans contact'}`);
    setNewUni(emptyForm);
  };

  return (
    <AdminLayout>
      <div className="sa-page-header">
        <div>
          <div className="sa-breadcrumbs">ADMIN › <span>UNIVERSITÉS</span></div>
          <h1 className="sa-page-title">Registre des universités</h1>
          <p className="sa-page-desc">
            Ajoutez un établissement à la liste de démonstration.
          </p>
        </div>
      </div>

      <div className="card mb-6">
        <h4 className="mb-4">＋ Ajouter un établissement</h4>
        <form onSubmit={addUni} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input className="form-control" style={{ maxWidth: 260 }} placeholder="Nom de l'établissement" value={newUni.name} onChange={(e) => setNewUni({ ...newUni, name: e.target.value })} required />
            <input className="form-control" style={{ maxWidth: 180 }} placeholder="Ville / adresse" value={newUni.city} onChange={(e) => setNewUni({ ...newUni, city: e.target.value })} required />
            <input className="form-control" style={{ maxWidth: 180 }} placeholder="Code (auto si vide)" value={newUni.code} onChange={(e) => setNewUni({ ...newUni, code: e.target.value })} />
          </div>
          <input className="form-control" style={{ maxWidth: 260 }} type="email" placeholder="Email de contact" value={newUni.email} onChange={(e) => setNewUni({ ...newUni, email: e.target.value })} />
          <div>
            <button className="btn btn-primary btn-sm" type="submit">Ajouter</button>
          </div>
        </form>
      </div>

      <div className="sa-table-container">
        <table className="sa-table">
          <thead>
            <tr><th>ÉTABLISSEMENT</th><th>VILLE</th><th>COMPTE</th><th>ÉTUDIANTS</th><th>STATUT</th><th>ACTIONS</th></tr>
          </thead>
          <tbody>
            {adminUnis.map((u) => (
              <tr key={u.id}>
                <td>
                  <div style={{ fontWeight: 700 }}>{u.name}</div>
                  <div className="text-secondary text-mono" style={{ fontSize: 11 }}>{u.code || u.id}</div>
                </td>
                <td>{u.city}</td>
                <td>{u.contactEmail || u.contact_email || '—'}</td>
                <td>{Number(u.students || 0).toLocaleString('fr-FR')}</td>
                <td>
                  <span className={`badge ${u.status === 'Active' ? 'badge-verified' : 'badge-pending'}`}>
                    {u.status === 'Active' ? 'Connectée' : 'En attente'}
                  </span>
                </td>
                <td style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => toggleUni(u)}>
                    {u.status === 'Active' ? 'Suspendre' : 'Connecter'}
                  </button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => removeUni(u)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
