import { useMemo } from 'react';
import AdminLayout from './AdminLayout';
import { useApp } from '../../context/AppContext';

export default function AdminOverview() {
  const { adminComptes, adminRecruteurs, adminUnis, verifications, adminAudit } = useApp();

  const stats = useMemo(() => ({
    comptes: adminComptes.length,
    actifs: adminComptes.filter((c) => c.status === 'Actif').length,
    recruteurs: adminRecruteurs.length,
    recruteursActifs: adminRecruteurs.filter((r) => r.status === 'Actif').length,
    unis: adminUnis.length,
    unisActives: adminUnis.filter((u) => u.status === 'Active').length,
    verifs: verifications.length,
    ticketsCirculation: adminRecruteurs.reduce((s, r) => s + r.tickets, 0),
  }), [adminComptes, adminRecruteurs, adminUnis, verifications]);

  return (
    <AdminLayout>
      <div className="sa-page-header">
        <div>
          <div className="sa-breadcrumbs">ADMIN › <span>VUE D&apos;ENSEMBLE</span></div>
          <h1 className="sa-page-title">Pilotage de la plateforme</h1>
          <p className="sa-page-desc">Comptes, recruteurs, universités, vérifications et revenus — calculés depuis les données existantes.</p>
        </div>
      </div>
      <div className="sa-stats-row">
        <div className="sa-stat-card"><div className="sa-stat-title">COMPTES ({stats.actifs} ACTIFS)</div><div className="sa-stat-val">{stats.comptes}</div></div>
        <div className="sa-stat-card"><div className="sa-stat-title">RECRUTEURS ACTIFS</div><div className="sa-stat-val">{stats.recruteursActifs} <span className="sa-stat-sub">/ {stats.recruteurs}</span></div></div>
        <div className="sa-stat-card"><div className="sa-stat-title">UNIVERSITÉS CONNECTÉES</div><div className="sa-stat-val">{stats.unisActives} <span className="sa-stat-sub">/ {stats.unis}</span></div></div>
        <div className="sa-stat-card"><div className="sa-stat-title">VÉRIFICATIONS</div><div className="sa-stat-val">{stats.verifs}</div></div>
        <div className="sa-stat-card"><div className="sa-stat-title">TICKETS EN CIRCULATION</div><div className="sa-stat-val">{stats.ticketsCirculation}</div></div>
      </div>
      <div className="sa-table-container">
        <table className="sa-table">
          <thead><tr><th>DERNIÈRES ACTIVITÉS</th><th>ACTEUR</th><th>DÉTAIL</th><th>STATUT</th></tr></thead>
          <tbody>
            {adminAudit.slice(0, 5).map((a, i) => (
              <tr key={i}><td>{a.date}</td><td>{a.actor}</td><td>{a.event} — {a.detail}</td><td><span className="sa-status-badge" style={a.status === 'Alerte' ? { background: '#fde4e1', color: '#d92d20' } : {}}>{a.status}</span></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
