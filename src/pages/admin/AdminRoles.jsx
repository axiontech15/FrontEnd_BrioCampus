import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useApp } from '../../context/AppContext';
import { rolesApi } from '../../services/api';
import { USE_MOCK, formatApiError } from '../../services/config';

export default function AdminRoles() {
  const { adminRoles, setAdminRoles, logAdmin, syncSessionFromApi } = useApp();
  const [form, setForm] = useState({ name: '', description: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const save = async (e) => {
    e.preventDefault();
    const name = form.name.trim().toUpperCase();
    if (!name) return;
    setError('');
    setLoading(true);
    try {
      if (!USE_MOCK) {
        if (editId) {
          await rolesApi.update(editId, { name });
          logAdmin('Rôle modifié', name);
        } else {
          await rolesApi.create({ name });
          logAdmin('Rôle créé', name);
        }
        await syncSessionFromApi();
      } else if (editId) {
        setAdminRoles((list) => list.map((r) => (r.id === editId ? { ...r, name, description: form.description } : r)));
        logAdmin('Rôle modifié', name);
      } else {
        if (adminRoles.some((r) => r.name === name)) return;
        setAdminRoles((list) => [...list, { id: Date.now(), name, description: form.description, users: 0 }]);
        logAdmin('Rôle créé', name);
      }
      setEditId(null);
      setForm({ name: '', description: '' });
    } catch (err) {
      setError(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (r) => {
    setEditId(r.id);
    setForm({ name: r.name, description: r.description || '' });
  };

  const remove = async (r) => {
    if (r.users > 0) return;
    setError('');
    setLoading(true);
    try {
      if (!USE_MOCK) {
        await rolesApi.remove(r.id);
        await syncSessionFromApi();
      } else {
        setAdminRoles((list) => list.filter((x) => x.id !== r.id));
      }
      logAdmin('Rôle supprimé', r.name);
    } catch (err) {
      setError(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="sa-page-header">
        <div>
          <div className="sa-breadcrumbs">ADMIN › <span>RÔLES</span></div>
          <h1 className="sa-page-title">Gestion des rôles</h1>
          <p className="sa-page-desc">
            Créer, consulter, modifier et supprimer les rôles
            {!USE_MOCK && ' (synchronisé avec FastAPI /api/roles)'}.
          </p>
        </div>
      </div>

      {error && <div className="alert alert-danger mb-4" role="alert"><span>{error}</span></div>}

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
            disabled={loading}
          />
          {USE_MOCK && (
            <input
              className="form-control"
              style={{ maxWidth: 360 }}
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          )}
          <button className="btn btn-primary btn-sm" type="submit" disabled={loading}>
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
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => startEdit(r)} disabled={loading}>Modifier</button>
                  <button type="button" className="btn btn-secondary btn-sm" disabled={loading || (r.users > 0)} onClick={() => remove(r)}>
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
