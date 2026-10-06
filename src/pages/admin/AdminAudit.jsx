import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useApp } from '../../context/AppContext';
import { logsApi } from '../../services/api';
import { USE_MOCK, formatApiError } from '../../services/config';

export default function AdminAudit() {
  const { adminAudit, setAdminAudit, logAdmin, syncSessionFromApi } = useApp();
  const [error, setError] = useState('');
  const active = adminAudit.filter((a) => !a.archived);
  const archived = adminAudit.filter((a) => a.archived);
  const alertCount = active.filter((a) => a.status === 'Alerte').length;

  const exportAudit = () => {
    const blob = new Blob([JSON.stringify(adminAudit, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'briocampus-journaux.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const archiveOld = async () => {
    setError('');
    try {
      if (!USE_MOCK) {
        await logsApi.archive();
        await syncSessionFromApi();
      } else {
        setAdminAudit((list) => list.map((a) => ({ ...a, archived: true })));
      }
      logAdmin('Archivage des journaux', `${active.length} entrée(s) archivée(s)`);
    } catch (err) {
      setError(formatApiError(err));
    }
  };

  const purgeArchived = async () => {
    setError('');
    const n = archived.length;
    try {
      if (!USE_MOCK) {
        await logsApi.purge();
        await syncSessionFromApi();
      } else {
        setAdminAudit((list) => list.filter((a) => !a.archived));
      }
      logAdmin('Purge des journaux archivés', `${n} entrée(s) supprimée(s)`);
    } catch (err) {
      setError(formatApiError(err));
    }
  };

  return (
    <AdminLayout>
      <div className="sa-page-header">
        <div>
          <div className="sa-breadcrumbs">ADMIN › <span>JOURNAUX</span></div>
          <h1 className="sa-page-title">Journaux d&apos;activité</h1>
          <p className="sa-page-desc">Consulter, archiver, puis purger les anciens journaux selon la règle de conservation.</p>
        </div>
        <div className="sa-actions" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" className="sa-btn sa-btn-outline" onClick={exportAudit}>Exporter (JSON)</button>
          <button type="button" className="sa-btn sa-btn-outline" onClick={archiveOld} disabled={active.length === 0}>
            Archiver
          </button>
          <button type="button" className="sa-btn sa-btn-primary" onClick={purgeArchived} disabled={archived.length === 0}>
            Purger archives ({archived.length})
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger mb-4" role="alert"><span>{error}</span></div>}

      <div className="sa-stats-row">
        <div className="sa-stat-card"><div className="sa-stat-title">ACTIFS</div><div className="sa-stat-val">{active.length}</div></div>
        <div className="sa-stat-card"><div className="sa-stat-title">ARCHIVÉS</div><div className="sa-stat-val">{archived.length}</div></div>
        <div className="sa-stat-card"><div className="sa-stat-title">ALERTES</div><div className="sa-stat-val" style={{ color: '#d92d20' }}>{alertCount}</div></div>
      </div>

      <div className="sa-table-container">
        <table className="sa-table">
          <thead>
            <tr><th>DATE & HEURE (UTC)</th><th>ACTEUR</th><th>ÉVÉNEMENT</th><th>DÉTAIL</th><th>STATUT</th><th>ÉTAT</th></tr>
          </thead>
          <tbody>
            {adminAudit.map((a, i) => (
              <tr key={i}>
                <td>{a.date}</td>
                <td>{a.actor}</td>
                <td>{a.event}</td>
                <td>{a.detail}</td>
                <td>
                  <span className="sa-status-badge" style={a.status === 'Alerte' ? { background: '#fde4e1', color: '#d92d20' } : {}}>
                    {a.status}
                  </span>
                </td>
                <td>{a.archived ? 'Archivé' : 'Actif'}</td>
              </tr>
            ))}
            {adminAudit.length === 0 && (
              <tr><td colSpan="6" className="text-center text-secondary" style={{ padding: 24 }}>Aucun journal.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
