import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useApp } from '../../context/AppContext';
import { universitiesApi } from '../../services/api';
import { USE_MOCK, formatApiError } from '../../services/config';

const emptyForm = {
  name: '',
  city: '',
  code: '',
  email: '',
  password: '',
  first_name: '',
  last_name: '',
};

export default function AdminUniversites() {
  const { adminUnis, setAdminUnis, logAdmin, syncSessionFromApi } = useApp();
  const [newUni, setNewUni] = useState(emptyForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleUni = async (u) => {
    setError('');
    const nextActive = u.status !== 'Active';
    try {
      if (!USE_MOCK) {
        await universitiesApi.update(u.id, { status: nextActive ? 'ACTIVE' : 'INACTIVE' });
        await syncSessionFromApi();
      } else {
        setAdminUnis((list) => list.map((x) => (
          x.id === u.id ? { ...x, status: nextActive ? 'Active' : 'En attente' } : x
        )));
      }
      logAdmin(nextActive ? 'Université connectée' : 'Université suspendue', `${u.name} • ${u.code || u.id}`);
    } catch (err) {
      setError(formatApiError(err));
    }
  };

  const removeUni = async (u) => {
    setError('');
    try {
      if (!USE_MOCK) {
        await universitiesApi.remove(u.id);
        await syncSessionFromApi();
      } else {
        setAdminUnis((list) => list.filter((x) => x.id !== u.id));
      }
      logAdmin('Université supprimée', `${u.name} • ${u.code || u.id}`);
    } catch (err) {
      setError(formatApiError(err));
    }
  };

  const addUni = async (e) => {
    e.preventDefault();
    if (!newUni.name || !newUni.city || !newUni.email || !newUni.password) return;
    if (newUni.password.length < 8) {
      setError('Le mot de passe du compte université doit contenir au moins 8 caractères.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      if (!USE_MOCK) {
        await universitiesApi.create({
          name: newUni.name.trim(),
          address: newUni.city.trim(),
          status: 'ACTIVE',
          email: newUni.email.trim(),
          password: newUni.password,
          first_name: newUni.first_name.trim() || 'Registre',
          last_name: newUni.last_name.trim() || newUni.name.trim().slice(0, 40),
        });
        await syncSessionFromApi();
      } else {
        const id = newUni.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 4) || `U${Date.now() % 1000}`;
        setAdminUnis((list) => [...list, {
          id,
          name: newUni.name,
          city: newUni.city,
          code: newUni.code || `CD-${newUni.city.slice(0, 3).toUpperCase()}-00${list.length + 1}`,
          students: 0,
          status: 'En attente',
          contactEmail: newUni.email,
        }]);
      }
      logAdmin('Université + compte créés', `${newUni.name} • ${newUni.email}`);
      setNewUni(emptyForm);
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
          <div className="sa-breadcrumbs">ADMIN › <span>UNIVERSITÉS</span></div>
          <h1 className="sa-page-title">Registre des universités</h1>
          <p className="sa-page-desc">
            Créer un établissement crée aussi un compte utilisateur (email + mot de passe) lié à cette université.
          </p>
        </div>
      </div>

      {error && <div className="alert alert-danger mb-4" role="alert"><span>{error}</span></div>}

      <div className="card mb-6">
        <h4 className="mb-4">＋ Ajouter un établissement + compte</h4>
        <form onSubmit={addUni} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input className="form-control" style={{ maxWidth: 260 }} placeholder="Nom de l'établissement" value={newUni.name} onChange={(e) => setNewUni({ ...newUni, name: e.target.value })} required disabled={loading} />
            <input className="form-control" style={{ maxWidth: 180 }} placeholder="Ville / adresse" value={newUni.city} onChange={(e) => setNewUni({ ...newUni, city: e.target.value })} required disabled={loading} />
            {USE_MOCK && (
              <input className="form-control" style={{ maxWidth: 180 }} placeholder="Code (auto si vide)" value={newUni.code} onChange={(e) => setNewUni({ ...newUni, code: e.target.value })} disabled={loading} />
            )}
          </div>
          <div>
            <div className="text-secondary mb-2" style={{ fontSize: 13, fontWeight: 600 }}>Compte de connexion (rôle Université)</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <input className="form-control" style={{ maxWidth: 160 }} placeholder="Prénom" value={newUni.first_name} onChange={(e) => setNewUni({ ...newUni, first_name: e.target.value })} disabled={loading} />
              <input className="form-control" style={{ maxWidth: 160 }} placeholder="Nom" value={newUni.last_name} onChange={(e) => setNewUni({ ...newUni, last_name: e.target.value })} disabled={loading} />
              <input className="form-control" style={{ maxWidth: 240 }} type="email" placeholder="Email de connexion" value={newUni.email} onChange={(e) => setNewUni({ ...newUni, email: e.target.value })} required disabled={loading} />
              <input className="form-control" style={{ maxWidth: 200 }} type="password" placeholder="Mot de passe (min. 8)" value={newUni.password} onChange={(e) => setNewUni({ ...newUni, password: e.target.value })} required minLength={8} disabled={loading} />
            </div>
          </div>
          <div>
            <button className="btn btn-primary btn-sm" type="submit" disabled={loading}>
              {loading ? 'Création…' : 'Créer université + compte'}
            </button>
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
