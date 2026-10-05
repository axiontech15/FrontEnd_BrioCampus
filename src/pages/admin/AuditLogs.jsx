import { Link } from '../../router';

export default function AuditLogs() {
  return (
    <>
      <div className="sa-layout">
        {/* SIDEBAR */}
        <aside className="sa-sidebar">
          {/* Contenu identique à universites.html */}
          <div className="sa-sidebar-header">
            <Link to="/universites" className="sa-logo">
              <img className="brand-logo-full" src="assets/logo-biocampus.svg" alt="BRIO CAMPUS" />
              <div>
                <div className="sa-logo-sub">PLATEFORME NATIONALE</div>
              </div>
            </Link>
          </div>

          <div className="sa-role-badge">
            <span className="dot"></span> SUPER ADMIN / PLATEFORME
          </div>

          <nav className="sa-nav-section">
            <div className="sa-nav-title">OPÉRATIONS & SÉCURITÉ</div>
            <ul className="sa-nav-menu">
              <li><Link to="/audit-logs" className="sa-nav-item active">Audit Logs & Sécurité</Link></li>
            </ul>
          </nav>
        </aside>

        {/* MAIN */}
        <div className="sa-main">
          <header className="sa-topbar">
            <div className="sa-topbar-left">
              <strong>Journal d'Audit</strong>
            </div>
          </header>

          <main className="sa-content">
            <div className="sa-page-header">
              <div>
                <div className="sa-breadcrumbs">OPÉRATIONS & SÉCURITÉ › <span>JOURNAL D'AUDIT</span></div>
                <h1 className="sa-page-title">Journal d'Audit & Événements de Sécurité</h1>
                <p className="sa-page-desc">Traçabilité immuable et horodatée de toutes les transactions, signatures
                  HSM...</p>
              </div>
              <div className="sa-actions">
                <button className="sa-btn sa-btn-outline">Exporter les logs (JSON / Syslog RFC 5424)</button>
                <button className="sa-btn sa-btn-primary">Vérifier l'intégrité de la chaîne</button>
              </div>
            </div>

            {/* CONTENU DE LA PAGE AUDIT LOGS ICI (basé sur super-admin.css) */}
            <div className="sa-stats-row">
              <div className="sa-stat-card">
                <div className="sa-stat-title">ÉVÉNEMENTS (24H)</div>
                <div className="sa-stat-val">248 192</div>
              </div>
              <div className="sa-stat-card">
                <div className="sa-stat-title">SIGNATURES HSM</div>
                <div className="sa-stat-val">42 810</div>
              </div>
              <div className="sa-stat-card">
                <div className="sa-stat-title">INCIDENTS SÉCURITÉ</div>
                <div className="sa-stat-val inline-style-b9ac8062">3</div>
              </div>
            </div>

            <div className="sa-table-container">
              <table className="sa-table">
                <thead>
                  <tr>
                    <th>DATE & HEURE (UTC)</th>
                    <th>STATUT</th>
                    <th>OPÉRATEUR</th>
                    <th>ÉVÉNEMENT</th>
                    <th>DÉTAILS & RESSOURCE</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Les données d'audit viendront ici */}
                  <tr>
                    <td colSpan="5" className="inline-style-b6691002">Données d'audit à charger...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
