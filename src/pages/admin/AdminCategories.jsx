import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useApp } from '../../context/AppContext';
import { categoriesApi } from '../../services/api';
import { USE_MOCK, formatApiError } from '../../services/config';

const emptyForm = { name: '', description: '', quantity: 10 };

export default function AdminCategories() {
  const { adminCategories, setAdminCategories, logAdmin, syncSessionFromApi } = useApp();
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const save = async (e) => {
    e.preventDefault();
    const name = form.name.trim().toUpperCase();
    const quantity = Math.max(1, parseInt(form.quantity, 10) || 1);
    if (!name) return;
    setError('');
    setLoading(true);
    try {
      if (!USE_MOCK) {
        const body = { name, description: form.description || null, quantity };
        if (editId) {
          await categoriesApi.update(editId, body);
          logAdmin('Catégorie modifiée', `${name} • qty ${quantity}`);
        } else {
          await categoriesApi.create(body);
          logAdmin('Catégorie créée', `${name} • qty ${quantity}`);
        }
        await syncSessionFromApi();
      } else if (editId) {
        setAdminCategories((list) => list.map((c) => (
          c.id === editId ? { ...c, name, description: form.description, quantity } : c
        )));
        logAdmin('Catégorie modifiée', `${name} • qty ${quantity}`);
      } else {
        setAdminCategories((list) => [...list, {
          id: Date.now(), name, description: form.description, quantity, status: 'ACTIVE',
        }]);
        logAdmin('Catégorie créée', `${name} • qty ${quantity}`);
      }
      setEditId(null);
      setForm(emptyForm);
    } catch (err) {
      setError(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (c) => {
    setEditId(c.id);
    setForm({ name: c.name, description: c.description || '', quantity: c.quantity ?? 1 });
  };

  const toggle = async (c) => {
    setError('');
    const status = c.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    try {
      if (!USE_MOCK) {
        await categoriesApi.update(c.id, { status });
        await syncSessionFromApi();
      } else {
        setAdminCategories((list) => list.map((x) => (x.id === c.id ? { ...x, status } : x)));
      }
      logAdmin(status === 'ACTIVE' ? 'Catégorie activée' : 'Catégorie désactivée', c.name);
    } catch (err) {
      setError(formatApiError(err));
    }
  };

  const remove = async (c) => {
    setError('');
    try {
      if (!USE_MOCK) {
        await categoriesApi.remove(c.id);
        await syncSessionFromApi();
      } else {
        setAdminCategories((list) => list.filter((x) => x.id !== c.id));
      }
      logAdmin('Catégorie supprimée', c.name);
    } catch (err) {
      setError(formatApiError(err));
    }
  };

  return (
    <AdminLayout>
      <div className="sa-page-header">
        <div>
          <div className="sa-breadcrumbs">ADMIN › <span>CATÉGORIES</span></div>
          <h1 className="sa-page-title">Catégories de tickets</h1>
          <p className="sa-page-desc">
            Chaque catégorie définit un pack : nom + quantité de tickets attribués à l&apos;achat.
          </p>
        </div>
      </div>

      {error && <div className="alert alert-danger mb-4" role="alert"><span>{error}</span></div>}

      <div className="card mb-6">
        <h4 className="mb-4">{editId ? 'Modifier la catégorie' : '＋ Créer une catégorie'}</h4>
        <form onSubmit={save} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <label className="form-label" htmlFor="cat-name">Nom</label>
            <input
              id="cat-name"
              className="form-control"
              style={{ maxWidth: 200 }}
              placeholder="ex. RECHERCHE"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="cat-qty">Quantité</label>
            <input
              id="cat-qty"
              type="number"
              min={1}
              className="form-control"
              style={{ maxWidth: 120 }}
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              required
              disabled={loading}
            />
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label className="form-label" htmlFor="cat-desc">Description</label>
            <input
              id="cat-desc"
              className="form-control"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              disabled={loading}
            />
          </div>
          <button className="btn btn-primary btn-sm" type="submit" disabled={loading}>
            {editId ? 'Enregistrer' : 'Créer'}
          </button>
          {editId && (
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setEditId(null); setForm(emptyForm); }}>
              Annuler
            </button>
          )}
        </form>
      </div>

      <div className="sa-table-container">
        <table className="sa-table">
          <thead>
            <tr><th>CATÉGORIE</th><th>QUANTITÉ</th><th>DESCRIPTION</th><th>STATUT</th><th>ACTIONS</th></tr>
          </thead>
          <tbody>
            {adminCategories.map((c) => (
              <tr key={c.id}>
                <td><span className="ref-code">{c.name}</span></td>
                <td><strong>{c.quantity ?? 1}</strong> tickets</td>
                <td>{c.description || '—'}</td>
                <td>
                  <span className={`badge ${c.status === 'ACTIVE' ? 'badge-verified' : 'badge-pending'}`}>
                    {c.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => startEdit(c)}>Modifier</button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => toggle(c)}>
                    {c.status === 'ACTIVE' ? 'Désactiver' : 'Activer'}
                  </button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => remove(c)}>Supprimer</button>
                </td>
              </tr>
            ))}
            {adminCategories.length === 0 && (
              <tr><td colSpan="5" className="text-center text-secondary" style={{ padding: 24 }}>Aucune catégorie.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
