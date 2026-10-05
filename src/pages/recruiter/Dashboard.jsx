import { useEffect, useState } from 'react';
import { Link } from '../../router';
import ProfileMenu from './ProfileMenu';
import { useApp } from '../../context/AppContext';

export default function Dashboard() {
  const { tickets } = useApp();
  const [navOpen, setNavOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');
  const [showTable, setShowTable] = useState(true);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    els.forEach(el => { el.style.opacity = '0'; });
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('animate-fade-in-up');
          en.target.style.opacity = '1';
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [navOpen]);

  const showRow = (status, search) =>
    (filter === 'all' || status === filter) && search.includes(q.toLowerCase());

  return (
    <>
      {/* ============ TOP BAR ============ */}
      <header className="db-topbar">
        <div className="d-flex align-items-center gap-6">
          <Link to="/dashboard" className="db-logo">
            <img className="brand-logo-full" src="assets/logo-biocampus.svg" alt="BRIO CAMPUS" />
            <div>
              <div className="db-logo-sub">Espace Recruteur</div>
            </div>
          </Link>

          <div className="db-security-badge">
            <div className="dot"></div>
            Réseau eIDAS Sécurisé
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="db-topbar-nav" id="desktopNav">
          <Link to="/dashboard" className="active">Dashboard</Link>
          <ProfileMenu />
        </nav>

        <div className="db-topbar-right">
          <Link to="/tickets" className="db-tickets-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a4 4 0 00-8 0v2" />
            </svg>
            <span><span className="ticket-count-num">{tickets}</span> tickets disponibles</span>
          </Link>

          <Link to="/verification" className="db-verify-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            Vérifier un candidat
          </Link>

          <Link to="/profile" className="db-avatar" title="Mon profil">A</Link>

          <Link to="/" className="db-logout-btn" title="Déconnexion">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
          </Link>

          {/* Hamburger (mobile) */}
          <button className={`hamburger${navOpen ? ' open' : ''}`} id="hamburger" aria-label="Menu" onClick={() => setNavOpen((v) => !v)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav-overlay${navOpen ? ' open' : ''}`} id="mobileNavOverlay" onClick={(e) => { if (e.target === e.currentTarget) setNavOpen(false); }}>
        <div className="mobile-nav-panel">
          <button className="mobile-nav-close" id="mobileNavClose" onClick={() => setNavOpen(false)}>✕</button>
          <div className="inline-style-09edb925">
            <div className="inline-style-4f55aa45">BioCampus</div>
            <div className="inline-style-65b7efb1">Espace Recruteur</div>
          </div>
          <Link to="/dashboard" className="active" onClick={() => setNavOpen(false)}>Dashboard</Link>
          <Link to="/profile" onClick={() => setNavOpen(false)}>Mon profil</Link>
          <details className="mobile-modules">
            <summary>Modules</summary>
            <div className="mobile-sub">
              <Link to="/verification" onClick={() => setNavOpen(false)}>Vérifier un candidat</Link>
              <Link to="/tickets" onClick={() => setNavOpen(false)}>Tickets</Link>
              <Link to="/downloads" onClick={() => setNavOpen(false)}>Téléchargements</Link>
              <Link to="/history" onClick={() => setNavOpen(false)}>Historique</Link>
              <Link to="/universites" onClick={() => setNavOpen(false)}>Universités</Link>
            </div>
          </details>
          <div className="inline-style-b376803d">
            <Link to="/" className="inline-style-50ce3aec" onClick={() => setNavOpen(false)}>Déconnexion</Link>
          </div>
        </div>
      </div>

      {/* ============ MAIN ============ */}
      <main className="inline-style-3e1a66e1">

        {/* ---- HERO BANNER ---- */}
        <div className="db-hero">
          <div className="inline-style-2b79920e">
            <div className="db-hero-label">
              <span className="dot"></span>
              Réseau National Inter-Universitaire Connecté • 100% Souverain
            </div>
            <h2>Bonjour, Alexandre</h2>
            <p>Prêt à sécuriser un nouveau recrutement ? Lancez une vérification instantanée auprès des registres
              universitaires officiels.</p>
          </div>

          <div className="db-hero-right">
            <div className="label">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="inline-style-5b38f352">
                <circle cx="12" cy="12" r="3" />
                <path
                  d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
              SOLDE ACTIF
            </div>
            <div className="count"><span className="ticket-count-num">{tickets}</span> vérifications prêtes à l&apos;emploi</div>
            <div className="sublabel">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Horodatage certifié RFC 3161
            </div>
          </div>
        </div>

        {/* ---- ACTION CARDS ---- */}
        <div className="db-cards-strip reveal">
          {/* Card 1: Vérifier */}
          <div className="db-action-card">
            <div className="card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <div>
              <h3>Vérifier un candidat</h3>
              <p>Interrogez en direct les universités et écoles partenaires pour authentifier diplômes et
                parcours.</p>
            </div>
            <Link to="/verification" className="btn btn-primary inline-style-8588e44d">
              Lancer une vérification →
            </Link>
          </div>

          {/* Card 2: Tickets */}
          <div className="db-action-card inline-style-4cb8ceeb">
            <div className="card-active-badge">Actif</div>
            <div className="card-icon inline-style-3063e775">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a4 4 0 00-8 0v2" />
              </svg>
            </div>
            <div>
              <h3>Tickets disponibles</h3>
              <div className="ticket-highlight ticket-count-num inline-style-49bda04d">{tickets}</div>
              <small className="inline-style-b3b75445">tickets</small>
              <p className="inline-style-ff6eee77">1 ticket = 1 vérification certifiée sans expiration dans le réseau
                souverain.</p>
            </div>
            <Link to="/tickets" className="btn btn-secondary inline-style-8588e44d">
              Gérer mes tickets ☰
            </Link>
          </div>

          {/* Card 3: Téléchargements */}
          <div className="db-action-card">
            <div className="card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <polyline points="9 15 12 18 15 15" />
              </svg>
            </div>
            <div>
              <h3>Téléchargements &amp; Rapports</h3>
              <p>Accédez aux attestations d&apos;authenticité horodatées et rapports d&apos;audit au format PDF sécurisé.
              </p>
            </div>
            <Link to="/downloads" className="btn btn-secondary inline-style-8588e44d">
              Consulter les documents ↓
            </Link>
          </div>
        </div>

        {/* ---- HISTORY TABLE ---- */}
        <div className="reveal inline-style-1c43eea3">
          <div className="db-history-header">
            <div>
              <div className="d-flex align-items-center gap-2">
                <span className="db-history-title">Historique récent des vérifications</span>
                <span className="db-history-count">4 dossiers</span>
              </div>
              <div className="db-history-sub">Dernières interrogations des registres d&apos;État et universités habilitées.
              </div>
            </div>

            <div className="db-history-filters">
              {/* Filter tabs */}
              <div className="d-flex align-items-center gap-1 inline-style-407bbb32">
                <button className={filter === 'all' ? 'db-filter-btn active' : 'db-filter-btn'} onClick={() => setFilter('all')}>Tous (4)</button>
                <button className={filter === 'conforme' ? 'db-filter-btn active' : 'db-filter-btn'} onClick={() => setFilter('conforme')}>Certifiés conformes
                  (3)</button>
                <button className={filter === 'encours' ? 'db-filter-btn active' : 'db-filter-btn'} onClick={() => setFilter('encours')}>En cours (1)</button>
                <button className={filter === 'anomalie' ? 'db-filter-btn active' : 'db-filter-btn'} onClick={() => setFilter('anomalie')}>Anomalies (0)</button>
              </div>

              {/* Search */}
              <div className="search-bar inline-style-bd1c064d">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9aa2b8" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input type="text" placeholder="Candidat, diplôme, ID..." id="tableSearch"
                  onInput={(e) => setQ(e.target.value)} />
              </div>

              {/* Simulate empty */}
              <button className="action-btn-link"
                onClick={() => setShowTable(false)}>
                ↩ Simuler état vide
              </button>
            </div>
          </div>

          <div className="db-table-wrap" style={{ display: showTable ? '' : 'none' }}>
            <div className="inline-style-77c8140b">
              <table className="db-table" id="historyTable">
                <thead>
                  <tr>
                    <th>Candidat</th>
                    <th>Diplôme &amp; Parcours</th>
                    <th>Établissement Émetteur</th>
                    <th>Date d&apos;audit</th>
                    <th>Statut Légal</th>
                    <th>Identifiant Registre</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="tableBody">
                  {/* Row 1 */}
                  <tr data-status="conforme"
                    data-search="alexandre de courcelles master ingénierie paris-saclay"
                    style={{ display: showRow('conforme', 'alexandre de courcelles master ingénierie paris-saclay') ? '' : 'none' }}>
                    <td>
                      <div className="candidate-cell">
                        <div className="candidate-avatar inline-style-e15bdb10">AC</div>
                        <div>
                          <div className="candidate-name">Alexandre de Courcelles</div>
                          <div className="candidate-email">alexandre.decourcelles@mail.fr</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="diploma-title">Master Ingénierie des Systèmes</div>
                      <div className="diploma-detail">Grade Master (Bac+5)</div>
                      <div className="diploma-detail">• RNCP34120</div>
                    </td>
                    <td>
                      <div className="etab-cell">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2">
                          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        Université Paris-Saclay
                      </div>
                    </td>
                    <td>
                      <div className="date-cell">14 Mai 2024</div>
                      <div className="date-time">10:42</div>
                    </td>
                    <td><span className="statut-conforme">Certifié Conforme</span></td>
                    <td><span className="ref-code">BC-2024-8891</span></td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Link to="/downloads" className="action-btn-link">Voir le détail</Link>
                        <button className="btn-icon" data-tooltip="Copier la référence"
                          onClick={() => navigator.clipboard.writeText('BC-2024-8891')}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" />
                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr data-status="conforme" data-search="sophie marchand master finance dauphine"
                    style={{ display: showRow('conforme', 'sophie marchand master finance dauphine') ? '' : 'none' }}>
                    <td>
                      <div className="candidate-cell">
                        <div className="candidate-avatar inline-style-6d0f57a6">SM</div>
                        <div>
                          <div className="candidate-name">Sophie Marchand</div>
                          <div className="candidate-email">sophie.m@outlook.com</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="diploma-title">Master Finance d&apos;Entreprise</div>
                      <div className="diploma-detail">Mention Très Bien</div>
                      <div className="diploma-detail">• RNCP31682</div>
                    </td>
                    <td>
                      <div className="etab-cell">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2">
                          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        Dauphine – PSL
                      </div>
                    </td>
                    <td>
                      <div className="date-cell">12 Mai 2024</div>
                      <div className="date-time">16:15</div>
                    </td>
                    <td><span className="statut-conforme">Certifié Conforme</span></td>
                    <td><span className="ref-code">BC-2024-8742</span></td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Link to="/downloads" className="action-btn-link">Voir le détail</Link>
                        <button className="btn-icon" data-tooltip="Copier"
                          onClick={() => navigator.clipboard.writeText('BC-2024-8742')}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" />
                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 3 (en cours) */}
                  <tr data-status="encours"
                    data-search="thomas lemoine ingénieur informatique centralesupelec"
                    style={{ display: showRow('encours', 'thomas lemoine ingénieur informatique centralesupelec') ? '' : 'none' }}>
                    <td>
                      <div className="candidate-cell">
                        <div className="candidate-avatar inline-style-cda29cc8">TL</div>
                        <div>
                          <div className="candidate-name">Thomas Lemoine</div>
                          <div className="candidate-email">thomas.lemoine@centralo.org</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="diploma-title">Diplôme d&apos;Ingénieur Informatique</div>
                      <div className="diploma-detail">Commission des Titres d&apos;Ingénieur (CTI)</div>
                    </td>
                    <td>
                      <div className="etab-cell">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2">
                          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        CentraleSupélec
                      </div>
                    </td>
                    <td>
                      <div className="date-cell inline-style-278f5568">Aujourd&apos;hui</div>
                      <div className="date-time">09:18</div>
                    </td>
                    <td><span className="statut-encours">Vérification en cours</span></td>
                    <td><span className="ref-code">BC-2024-8930</span></td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Link to="/history" className="action-btn-follow">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          Suivre l&apos;état
                        </Link>
                      </div>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr data-status="conforme" data-search="camille bertrand licence droit panthéon-assas"
                    style={{ display: showRow('conforme', 'camille bertrand licence droit panthéon-assas') ? '' : 'none' }}>
                    <td>
                      <div className="candidate-cell">
                        <div className="candidate-avatar inline-style-57093abb">CB</div>
                        <div>
                          <div className="candidate-name">Camille Bertrand</div>
                          <div className="candidate-email">camille.bertrand@juridique.fr</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="diploma-title">Licence Droit &amp; Sciences Politiques</div>
                      <div className="diploma-detail">Niveau 6 (Bac+3)</div>
                      <div className="diploma-detail">• Parcours Droit Public</div>
                    </td>
                    <td>
                      <div className="etab-cell">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2">
                          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        Université Panthéon-Assas
                      </div>
                    </td>
                    <td>
                      <div className="date-cell">02 Mai 2024</div>
                      <div className="date-time">11:30</div>
                    </td>
                    <td><span className="statut-conforme">Certifié Conforme</span></td>
                    <td><span className="ref-code">BC-2024-8511</span></td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Link to="/downloads" className="action-btn-link">Voir le détail</Link>
                        <button className="btn-icon" data-tooltip="Copier"
                          onClick={() => navigator.clipboard.writeText('BC-2024-8511')}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" />
                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table footer */}
            <div className="inline-style-d461d43d">
              <div className="inline-style-bc737815">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Conforme au cadre d&apos;interopérabilité académique de l&apos;Enseignement Supérieur (MESR)
              </div>
              <span>Affichage de 4 sur 4 vérifications</span>
            </div>
          </div>

          {/* Empty state */}
          <div className="empty-state card text-center" style={{ display: showTable ? '' : 'block' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--bc-border)" strokeWidth="1.5"
              className="inline-style-d0220dc3">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <p className="text-secondary mb-4">Aucune vérification pour l&apos;instant.</p>
            <Link to="/verification" className="btn btn-primary">Lancer ma première vérification</Link>
          </div>
        </div>

        {/* ---- DB FOOTER BAR ---- */}
        <div className="db-footer-bar">
          <div className="db-footer-left">
            <div className="status-dot"></div>
            <strong>Réseau Académique National :</strong>&nbsp;Opérationnel
            &nbsp;•&nbsp; Conformité eIDAS &amp; RGPD UE 2016/679
            &nbsp;•&nbsp; Horodatage Certifié RFC 3161
          </div>
          <div className="db-footer-right">
            <Link to="/">Mentions légales</Link>
            <Link to="/">Sécurité &amp; Registres</Link>
            <span>v2.4-eIDAS</span>
          </div>
        </div>
      </main>
    </>
  );
}
