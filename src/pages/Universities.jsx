import { Link } from '../router';

export default function Universities() {
  return (
    <>
      <div className="sa-layout">
        {/* SIDEBAR */}
        <aside className="sa-sidebar">
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

          <div className="sa-infra-box">
            <div className="sa-infra-box-title">INFRASTRUCTUR <span className="sa-infra-status"></span></div>
            <div className="sa-infra-box-val inline-style-62f828ea">
              Cluster HSM Souverain <span className="inline-style-619bf8c0">FR-PAR-01</span>
            </div>
          </div>

          <nav className="sa-nav-section">
            <div className="sa-nav-title">VUE GLOBALE</div>
            <ul className="sa-nav-menu">
              <li>
                <Link to="/dashboard" className="sa-nav-item">
                  <span className="icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </svg>
                  </span>
                  Dashboard
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="sa-nav-section">
            <div className="sa-nav-title">ÉCOSYSTÈME</div>
            <ul className="sa-nav-menu">
              <li>
                <Link to="/universites" className="sa-nav-item active">
                  <span className="icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </span>
                  Université
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="sa-nav-item">
                  <span className="icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </span>
                  Entreprises
                </Link>
              </li>
              <li>
                <Link to="/profile" className="sa-nav-item">
                  <span className="icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </span>
                  Utilisateurs globaux
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="sa-nav-section">
            <div className="sa-nav-title">OPÉRATIONS & SÉCURITÉ</div>
            <ul className="sa-nav-menu">
              <li>
                <Link to="/verification" className="sa-nav-item">
                  <span className="icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  Vérifications
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="sa-nav-item">
                  <span className="icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </span>
                  Documents & Parchemins
                </Link>
              </li>
              <li>
                <Link to="/audit-logs" className="sa-nav-item">
                  <span className="icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </span>
                  Audit Logs & Sécurité
                </Link>
              </li>
              <li>
                <Link to="/profile" className="sa-nav-item">
                  <span className="icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2">
                      <circle cx="12" cy="12" r="3" />
                      <path
                        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  </span>
                  Paramètres Système
                </Link>
              </li>
            </ul>
          </nav>

          <div className="sa-sidebar-footer">
            <div className="sa-root-node">
              <div><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" className="inline-style-fcbdd4a7">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg> Noeud Racine Certifié</div>
              <div className="inline-style-0440e0d5">SHA256: 9b2d...f4e0</div>
            </div>
            <Link to="/" className="sa-logout">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Déconnexion sécurisée
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </Link>
          </div>
        </aside>

        {/* MAIN */}
        <div className="sa-main">
          {/* TOPBAR */}
          <header className="sa-topbar">
            <div className="sa-topbar-left">
              <div className="sa-topbar-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path
                    d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <strong>Réseau Académique National</strong>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              <div className="sa-topbar-badge inline-style-ea918e80">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                Recherche globale
              </div>
            </div>

            <div className="sa-topbar-right">
              <div className="sa-topbar-badge inline-style-c5be5534">
                <span className="dot inline-style-ce66cd84"></span>
                Disponibilité 99.99%
              </div>

              <div className="sa-topbar-badge inline-style-c5be5534">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                Alertes sécurité (0)
              </div>

              <div className="sa-user-profile">
                <div>
                  <div className="sa-user-name">Alexandre V.</div>
                  <div className="sa-user-role">Super Administrateur National</div>
                </div>
                <div className="sa-avatar">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <main className="sa-content">
            <div className="sa-page-header">
              <div>
                <div className="sa-breadcrumbs">ÉCOSYSTÈME › <span>UNIVERSITÉS</span></div>
                <h1 className="sa-page-title">Universités accréditées</h1>
                <p className="sa-page-desc">Registre national des établissements partenaires et gestion des accès
                  d'authentification souveraine.</p>
              </div>
              <div className="sa-actions">
                <button className="sa-btn sa-btn-outline">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Exporter
                </button>
                <button className="sa-btn sa-btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Ajouter une université
                </button>
              </div>
            </div>

            {/* STATS */}
            <div className="sa-stats-row">
              <div className="sa-stat-card">
                <div className="sa-stat-title">TOTAL ÉTABLISSEMENTS</div>
                <div className="sa-stat-val">
                  84
                  <span className="sa-stat-sub">100% couverture</span>
                </div>
              </div>
              <div className="sa-stat-card">
                <div className="sa-stat-title">CLÉS ACTIVES EIDAS QES</div>
                <div className="sa-stat-val inline-style-75432040">
                  81
                  <span className="inline-style-926daf24">/ 84 conformes</span>
                </div>
              </div>
              <div className="sa-stat-card">
                <div className="sa-stat-title">POPULATION ÉTUDIANTE</div>
                <div className="sa-stat-val">
                  2,41 M
                  <span className="sa-stat-sub">+8.2% cette année</span>
                </div>
              </div>
            </div>

            {/* FILTERS */}
            <div className="sa-filters">
              <div className="sa-search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--sa-text-muted)"
                  strokeWidth="2" className="inline-style-c52f934d">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input type="text" placeholder="Rechercher un établissement, une ville, un RNE..." />
              </div>
              <select className="sa-select">
                <option>Toutes les régions</option>
              </select>
              <select className="sa-select">
                <option>Tous les statuts</option>
              </select>
            </div>

            {/* TABLE */}
            <div className="sa-table-container">
              <table className="sa-table">
                <thead>
                  <tr>
                    <th>ÉTABLISSEMENT</th>
                    <th>VILLE</th>
                    <th>CONTACT PRINCIPAL</th>
                    <th>ÉTUDIANTS</th>
                    <th>STATUT</th>
                    <th className="inline-style-08a0ed40">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="sa-uni-cell">
                        <div className="sa-uni-icon">UPS</div>
                        <div>
                          <div className="sa-uni-name">Université Paris-Saclay</div>
                          <div className="sa-uni-id">0912384Z</div>
                        </div>
                      </div>
                    </td>
                    <td>Gif-sur-Yvette (IDF)</td>
                    <td>
                      <div className="inline-style-a5d2baa1">Dr. Marianne Dupont</div>
                      <div className="inline-style-2bb5bb8f">m.dupont@universite-paris-saclay.fr</div>
                    </td>
                    <td>48 200</td>
                    <td><span className="sa-status-badge">Active</span></td>
                    <td className="inline-style-08a0ed40"><button className="inline-style-602bb819"><svg width="20"
                      height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2">
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg></button></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="sa-uni-cell">
                        <div className="sa-uni-icon">SU</div>
                        <div>
                          <div className="sa-uni-name">Sorbonne Université</div>
                          <div className="sa-uni-id">0755890V</div>
                        </div>
                      </div>
                    </td>
                    <td>Paris 5e (IDF)</td>
                    <td>
                      <div className="inline-style-a5d2baa1">Pr. Jean-Luc Martinez</div>
                      <div className="inline-style-2bb5bb8f">jl.martinez@sorbonne-universite.fr</div>
                    </td>
                    <td>55 400</td>
                    <td><span className="sa-status-badge">Active</span></td>
                    <td className="inline-style-08a0ed40"><button className="inline-style-602bb819"><svg width="20"
                      height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2">
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg></button></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="sa-uni-cell">
                        <div className="sa-uni-icon">UCBL</div>
                        <div>
                          <div className="sa-uni-name">Univ. Lyon 1 Claude Bernard</div>
                          <div className="sa-uni-id">0691774E</div>
                        </div>
                      </div>
                    </td>
                    <td>Villeurbanne (ARA)</td>
                    <td>
                      <div className="inline-style-a5d2baa1">Dr. Hélène Vasseur</div>
                      <div className="inline-style-2bb5bb8f">helene.vasseur@univ-lyon1.fr</div>
                    </td>
                    <td>46 100</td>
                    <td><span className="sa-status-badge">Active</span></td>
                    <td className="inline-style-08a0ed40"><button className="inline-style-602bb819"><svg width="20"
                      height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2">
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg></button></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="sa-uni-cell">
                        <div className="sa-uni-icon">CS</div>
                        <div>
                          <div className="sa-uni-name">CentraleSupélec</div>
                          <div className="sa-uni-id">0910626B</div>
                        </div>
                      </div>
                    </td>
                    <td>Saclay (IDF)</td>
                    <td>
                      <div className="inline-style-a5d2baa1">M. Romain Cheru</div>
                      <div className="inline-style-2bb5bb8f">romain.cheru@centralesupelec.fr</div>
                    </td>
                    <td>5 300</td>
                    <td><span className="sa-status-badge">Active</span></td>
                    <td className="inline-style-08a0ed40"><button className="inline-style-602bb819"><svg width="20"
                      height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2">
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg></button></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="sa-uni-cell">
                        <div className="sa-uni-icon">AMU</div>
                        <div>
                          <div className="sa-uni-name">Aix-Marseille Université</div>
                          <div className="sa-uni-id">0134009M</div>
                        </div>
                      </div>
                    </td>
                    <td>Marseille (PACA)</td>
                    <td>
                      <div className="inline-style-a5d2baa1">Pr. Thomas Albi</div>
                      <div className="inline-style-2bb5bb8f">thomas.albi@univ-amu.fr</div>
                    </td>
                    <td>80 000</td>
                    <td><span className="sa-status-badge">Active</span></td>
                    <td className="inline-style-08a0ed40"><button className="inline-style-602bb819"><svg width="20"
                      height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2">
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg></button></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="sa-uni-cell">
                        <div className="sa-uni-icon">UB</div>
                        <div>
                          <div className="sa-uni-name">Université de Bordeaux</div>
                          <div className="sa-uni-id">0333298F</div>
                        </div>
                      </div>
                    </td>
                    <td>Bordeaux (NA)</td>
                    <td>
                      <div className="inline-style-a5d2baa1">Dr. Sarah Leroy</div>
                      <div className="inline-style-2bb5bb8f">sarah.leroy@u-bordeaux.fr</div>
                    </td>
                    <td>52 000</td>
                    <td><span className="sa-status-badge pending">En attente</span></td>
                    <td className="inline-style-08a0ed40"><button className="inline-style-602bb819"><svg width="20"
                      height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2">
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg></button></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="sa-uni-cell">
                        <div className="sa-uni-icon">IPP</div>
                        <div>
                          <div className="sa-uni-name">Institut Polytechnique de Paris</div>
                          <div className="sa-uni-id">0912390F</div>
                        </div>
                      </div>
                    </td>
                    <td>Palaiseau (IDF)</td>
                    <td>
                      <div className="inline-style-a5d2baa1">Pr. Éric Vaneck</div>
                      <div className="inline-style-2bb5bb8f">eric.vaneck@ip-paris.fr</div>
                    </td>
                    <td>10 500</td>
                    <td><span className="sa-status-badge">Active</span></td>
                    <td className="inline-style-08a0ed40"><button className="inline-style-602bb819"><svg width="20"
                      height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2">
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg></button></td>
                  </tr>
                </tbody>
              </table>

              <div className="sa-pagination">
                <div className="inline-style-7f8dc05e">
                  Lignes par page
                  <select className="sa-select inline-style-e74080c9">
                    <option>10</option>
                  </select>
                  Affichage 1 à 7 sur 84 universités
                </div>

                <div className="inline-style-6d65b2a7">
                  Page 1 sur 9
                  <div className="sa-page-controls">
                    <Link to="/universites" className="sa-page-btn"><svg width="14" height="14"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="19" y1="12" x2="5" y2="12" />
                      <polyline points="12 19 5 12 12 5" />
                    </svg></Link>
                    <Link to="/universites" className="sa-page-btn active">1</Link>
                    <Link to="/universites" className="sa-page-btn">2</Link>
                    <Link to="/universites" className="sa-page-btn">3</Link>
                    <span className="inline-style-fc346cac">..</span>
                    <Link to="/universites" className="sa-page-btn">9</Link>
                    <Link to="/universites" className="sa-page-btn"><svg width="14" height="14"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg></Link>
                  </div>
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>
    </>
  );
}
