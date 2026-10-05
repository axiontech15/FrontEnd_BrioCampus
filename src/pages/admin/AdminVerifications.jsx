import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useApp } from '../../context/AppContext';
import { STATUS_BADGE } from '../../data/mock';

export default function AdminVerifications() {
  const { verifications } = useApp();
  const [q, setQ] = useState('');
  const [verifFilter, setVerifFilter] = useState('all');

  const verifsFiltrees = verifications.filter((v) => {
    const okQ = `${v.candidate} ${v.diploma} ${v.university} ${v.id}`.toLowerCase().includes(q.toLowerCase());
    const okF = verifFilter === 'all' || v.status === verifFilter;
    return okQ && okF;
  });

  return (
    <AdminLayout>
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
    </AdminLayout>
  );
}
