import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useApp } from '../../context/AppContext';

export default function AdminRecruteurs() {
  const { adminRecruteurs, setAdminRecruteurs, setAdminPurchases, logAdmin } = useApp();
  const [credit, setCredit] = useState({ id: '', qty: 10 });

  const toggleRecruteur = (id) => {
    setAdminRecruteurs((rs) => rs.map((r) => {
      if (r.id !== id) return r;
      const next = r.status === 'Actif' ? 'Suspendu' : 'Actif';
      logAdmin(next === 'Actif' ? 'Entreprise réactivée' : 'Entreprise suspendue', `${r.company} • ${r.email}`);
      return { ...r, status: next === 'Suspendu' ? 'Suspendu' : r.status === 'En attente' && next === 'Actif' ? 'Actif' : next };
    }));
  };

  const validerRecruteur = (id) => {
    setAdminRecruteurs((rs) => rs.map((r) => (r.id === id ? { ...r, status: 'Actif' } : r)));
    const r = adminRecruteurs.find((x) => x.id === id);
    logAdmin('Entreprise validée (KYC)', `${r?.company} • ${r?.email}`);
  };

  const crediter = (e) => {
    e.preventDefault();
    if (!credit.id) return;
    setAdminRecruteurs((rs) => rs.map((r) => (r.id === Number(credit.id) ? { ...r, tickets: r.tickets + Number(credit.qty) } : r)));
    const r = adminRecruteurs.find((x) => x.id === Number(credit.id));
    setAdminPurchases((p) => [{ date: new Date().toLocaleDateString('fr-FR'), desc: `Crédit manuel admin (+${credit.qty}) — ${r?.company}`, qty: `+${credit.qty} tickets`, status: 'Payé' }, ...p]);
    logAdmin('Crédit tickets manuel', `${r?.company} • +${credit.qty} tickets`);
  };

  return (
    <AdminLayout>
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
            {adminRecruteurs.map((r) => <option key={r.id} value={r.id}>{r.company} ({r.tickets} tickets)</option>)}
          </select>
          <input className="form-control" style={{ maxWidth: 140 }} type="number" min="1" max="500" value={credit.qty} onChange={(e) => setCredit({ ...credit, qty: e.target.value })} />
          <button className="btn btn-primary btn-sm" type="submit">Créditer</button>
        </form>
      </div>
      <div className="sa-table-container">
        <table className="sa-table">
          <thead><tr><th>ENTREPRISE</th><th>CONTACT</th><th>TICKETS</th><th>VÉRIFS</th><th>PACK</th><th>STATUT</th><th>ACTIONS</th></tr></thead>
          <tbody>
            {adminRecruteurs.map((r) => (
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
    </AdminLayout>
  );
}
