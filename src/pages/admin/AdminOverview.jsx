import { useMemo } from 'react';
import AdminLayout from './AdminLayout';
import { useApp } from '../../context/AppContext';

export default function AdminOverview() {
  const { adminComptes, adminUnis, adminRoles, adminCategories, adminAudit } = useApp();

  const stats = useMemo(() => ({
    comptes: adminComptes.length,
    actifs: adminComptes.filter((c) => c.status === 'Actif').length,
    rh: adminComptes.filter((c) => c.role === 'RH').length,
    unis: adminUnis.length,
    unisActives: adminUnis.filter((u) => u.status === 'Active').length,
    roles: adminRoles.length,
    categories: adminCategories.filter((c) => c.status === 'ACTIVE').length,
  }), [adminComptes, adminUnis, adminRoles, adminCategories]);

  return (
    <AdminLayout>
      <div className="sa-page-header">
        <div>
          <div className="sa-breadcrumbs">ADMIN › <span>VUE D&apos;ENSEMBLE</span></div>
          <h1 className="sa-page-title">Pilotage de la plateforme</h1>
          <p className="sa-page-desc">Utilisateurs, rôles, catégories, universités et journaux.</p>
        </div>
      </div>
      <div className="sa-stats-row">
        <div className="sa-stat-card"><div className="sa-stat-title">UTILISATEURS ({stats.actifs} ACTIFS)</div><div className="sa-stat-val">{stats.comptes}</div></div>
        <div className="sa-stat-card"><div className="sa-stat-title">COMPTES RH</div><div className="sa-stat-val">{stats.rh}</div></div>
        <div className="sa-stat-card"><div className="sa-stat-title">UNIVERSITÉS</div><div className="sa-stat-val">{stats.unisActives} <span className="sa-stat-sub">/ {stats.unis}</span></div></div>
        <div className="sa-stat-card"><div className="sa-stat-title">RÔLES</div><div className="sa-stat-val">{stats.roles}</div></div>
        <div className="sa-stat-card"><div className="sa-stat-title">CATÉGORIES ACTIVES</div><div className="sa-stat-val">{stats.categories}</div></div>
      </div>
      <div className="sa-table-container">
        <table className="sa-table">
          <thead><tr><th>DERNIÈRES ACTIVITÉS</th><th>ACTEUR</th><th>DÉTAIL</th><th>STATUT</th></tr></thead>
          <tbody>
            {adminAudit.filter((a) => !a.archived).slice(0, 5).map((a, i) => (
              <tr key={i}>
                <td>{a.date}</td>
                <td>{a.actor}</td>
                <td>{a.event} — {a.detail}</td>
                <td><span className="sa-status-badge" style={a.status === 'Alerte' ? { background: '#fde4e1', color: '#d92d20' } : {}}>{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
