import AdminLayout from './AdminLayout';
import { Link } from '../../router';
import { useApp } from '../../context/AppContext';

export default function AdminAudit() {
  const { adminAudit } = useApp();
  const alertCount = adminAudit.filter((a) => a.status === 'Alerte').length;

  const exportAudit = () => {
    const blob = new Blob([JSON.stringify(adminAudit, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'biocampus-audit.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="sa-page-header">
        <div>
          <div className="sa-breadcrumbs">ADMIN › <span>SÉCURITÉ</span></div>
          <h1 className="sa-page-title">Journal d&apos;audit</h1>
          <p className="sa-page-desc">Traçabilité immuable — chaque action admin ci-dessus y est consignée.</p>
        </div>
        <div className="sa-actions" style={{ display: 'flex', gap: 8 }}>
          <button className="sa-btn sa-btn-outline" onClick={exportAudit}>Exporter (JSON)</button>
          <Link to="/audit-logs" className="sa-btn sa-btn-primary">Vue détaillée →</Link>
        </div>
      </div>
      <div className="sa-stats-row">
        <div className="sa-stat-card"><div className="sa-stat-title">ÉVÉNEMENTS</div><div className="sa-stat-val">{adminAudit.length}</div></div>
        <div className="sa-stat-card"><div className="sa-stat-title">ALERTES</div><div className="sa-stat-val" style={{ color: '#d92d20' }}>{alertCount}</div></div>
      </div>
      <div className="sa-table-container">
        <table className="sa-table">
          <thead><tr><th>DATE & HEURE (UTC)</th><th>ACTEUR</th><th>ÉVÉNEMENT</th><th>DÉTAIL</th><th>STATUT</th></tr></thead>
          <tbody>
            {adminAudit.map((a, i) => (
              <tr key={i}><td>{a.date}</td><td>{a.actor}</td><td>{a.event}</td><td>{a.detail}</td>
                <td><span className="sa-status-badge" style={a.status === 'Alerte' ? { background: '#fde4e1', color: '#d92d20' } : {}}>{a.status}</span></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
