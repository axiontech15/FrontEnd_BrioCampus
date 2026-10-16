import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useApp } from '../../context/AppContext';

export default function AdminRoles() {
  const { adminRoles, setAdminRoles, logAdmin } = useApp();
  const [form, setForm] = useState({ name: '', description: '' });
  const [editId, setEditId] = useState(null);

  const save = (e) => {
    e.preventDefault();
    const name = form.name.trim().toUpperCase();
    if (!name) return;
    if (editId) {
      setAdminRoles((list) => list.map((r) => (r.id === editId ? { ...r, name, description: form.description } : r)));
      logAdmin('Rôle modifié', name);
    } else {
      if (adminRoles.some((r) => r.name === name)) return;
      setAdminRoles((list) => [...list, { id: Date.now(), name, description: form.description, users: 0 }]);
      logAdmin('Rôle créé', name);
    }
    setEditId(null);
    setForm({ name: '', description: '' });
  };

  const startEdit = (r) => {
    setEditId(r.id);
    setForm({ name: r.name, description: r.description || '' });
  };

  const remove = (r) => {
    if (r.users > 0) return;
    setAdminRoles((list) => list.filter((x) => x.id !== r.id));
    logAdmin('Rôle supprimé', r.name);
  };

  return (
    <AdminLayout>
      <div className="sa-page-header">
        <div>
          <div className="sa-breadcrumbs">ADMIN › <span>RÔLES</span></div>
          <h1 className="sa-page-title">Gestion des rôles</h1>
          <p className="sa-page-desc">
            Créer, consulter, modifier et supprimer les rôles de démonstration.
          </p>
        </div>
      </div>

      <div className="card mb-6">
        <h4 className="mb-4">{editId ? 'Modifier le rôle' : '＋ Créer un rôle'}</h4>
        <form onSubmit={save} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input
            className="form-control"
            style={{ maxWidth: 200 }}
            placeholder="Nom (ex. RH)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="form-control"
            style={{ maxWidth: 360 }}
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button className="btn btn-primary btn-sm" type="submit">
            {editId ? 'Enregistrer' : 'Créer'}
          </button>
          {editId && (
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setEditId(null); setForm({ name: '', description: '' }); }}>
              Annuler
            </button>
          )}
        </form>
      </div>

      <div className="sa-table-container">
        <table className="sa-table">
          <thead>
            <tr><th>RÔLE</th><th>DESCRIPTION</th><th>UTILISATEURS</th><th>ACTIONS</th></tr>
          </thead>
          <tbody>
            {adminRoles.map((r) => (
              <tr key={r.id}>
                <td><span className="badge badge-blue">{r.name}</span></td>
                <td>{r.description || '—'}</td>
                <td>{r.users ?? '—'}</td>
                <td style={{ display: 'flex', gap: 8 }}>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => startEdit(r)}>Modifier</button>
                  <button type="button" className="btn btn-secondary btn-sm" disabled={r.users > 0} onClick={() => remove(r)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {adminRoles.length === 0 && (
              <tr><td colSpan="4" className="text-center text-secondary" style={{ padding: 24 }}>Aucun rôle.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
