import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useApp } from '../../context/AppContext';

const emptyForm = { name: '', description: '', quantity: 10 };

export default function AdminCategories() {
  const { adminCategories, setAdminCategories, logAdmin } = useApp();
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const save = (e) => {
    e.preventDefault();
    const name = form.name.trim().toUpperCase();
    const quantity = Math.max(1, parseInt(form.quantity, 10) || 1);
    if (!name) return;
    if (editId) {
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
  };

  const startEdit = (c) => {
    setEditId(c.id);
    setForm({ name: c.name, description: c.description || '', quantity: c.quantity ?? 1 });
  };

  const toggle = (c) => {
    const status = c.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    setAdminCategories((list) => list.map((x) => (x.id === c.id ? { ...x, status } : x)));
    logAdmin(status === 'ACTIVE' ? 'Catégorie activée' : 'Catégorie désactivée', c.name);
  };

  const remove = (c) => {
    setAdminCategories((list) => list.filter((x) => x.id !== c.id));
    logAdmin('Catégorie supprimée', c.name);
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
            />
          </div>
          <button className="btn btn-primary btn-sm" type="submit">
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
