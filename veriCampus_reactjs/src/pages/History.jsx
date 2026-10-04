import { useEffect, useState } from 'react';
import { Link, navigate } from '../router';
import { useApp } from '../context/AppContext';

export default function History() {
  const { tickets } = useApp();
  const [navOpen, setNavOpen] = useState(false);

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

  return (
    <>
      {/* HEADER */}
      <header className="inline-style-c70b66f1">
        <Link to="/dashboard" className="inline-style-0dc9c093">
          <div className="inline-style-af5efa97">
            <img className="brand-logo-full" src="assets/logo-biocampus.svg" alt="BRIO CAMPUS" />
          </div>
          <div>
            <div className="inline-style-11f1cc33">BioCampus</div>
            <div className="inline-style-1b6872d7">Espace Recruteur</div>
          </div>
        </Link>
        <nav className="header-nav" id="desktopNav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/verification">Vérifier</Link>
          <Link to="/tickets">Tickets</Link>
          <Link to="/downloads">Téléchargements</Link>
          <Link to="/history" className="active">Historique</Link>
          <Link to="/profile">Mon profil</Link>
        </nav>
        <div className="d-flex align-items-center gap-3">
          <span className="inline-style-c77ce71d"><span className="ticket-count-num">{tickets}</span> tickets</span>
          <Link to="/" className="inline-style-6eed7d64" title="Déconnexion">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
          </Link>
          <button className={navOpen ? 'hamburger open' : 'hamburger'} id="hamburger" onClick={() => setNavOpen(o => !o)}><span></span><span></span><span></span></button>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div className={navOpen ? 'mobile-nav-overlay open' : 'mobile-nav-overlay'} id="mobileNavOverlay" onClick={(e) => { if (!e.target.closest('.mobile-nav-panel')) setNavOpen(false); }}>
        <div className="mobile-nav-panel">
          <button className="mobile-nav-close" id="mobileNavClose" onClick={() => setNavOpen(false)}>✕</button>
          <div className="inline-style-1bbc7b92">BioCampus</div>
          <Link to="/dashboard" onClick={() => setNavOpen(false)}>Dashboard</Link>
          <Link to="/verification" onClick={() => setNavOpen(false)}>Vérifier un candidat</Link>
          <Link to="/tickets" onClick={() => setNavOpen(false)}>Tickets</Link>
          <Link to="/downloads" onClick={() => setNavOpen(false)}>Téléchargements</Link>
          <Link to="/history" className="active" onClick={() => setNavOpen(false)}>Historique</Link>
          <Link to="/profile" onClick={() => setNavOpen(false)}>Mon profil</Link>
          <div className="inline-style-a8b228df"><Link to="/" className="inline-style-16eb5b7d" onClick={() => setNavOpen(false)}>Déconnexion</Link></div>
        </div>
      </div>

      <main className="page-wrap">
        <div className="d-flex justify-content-between align-items-center mb-6 page-title-row">
          <div>
            <h1 className="inline-style-7b8fff8f">Historique des vérifications</h1>
            <p className="text-secondary inline-style-b84c7dfa">Toutes les interrogations des registres d'État et
              universités habilitées.</p>
          </div>
          <button className="btn btn-secondary" onClick={() => alert('Export CSV en cours... (simulation)')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Exporter CSV
          </button>
        </div>

        {/* Filtres */}
        <div className="card mb-6 reveal inline-style-536df1fe">
          <div className="d-flex align-items-center gap-4 inline-style-407bbb32">
            <div className="search-bar inline-style-6a1ff245">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9aa2b8" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input type="text" placeholder="Rechercher un candidat, ID, université..." />
            </div>
            <select className="form-control inline-style-ef1e5d82">
              <option value="">Tous les statuts</option>
              <option value="verified">Certifié conforme</option>
              <option value="pending">En cours</option>
              <option value="failed">Non vérifié</option>
              <option value="incomplete">Incomplet</option>
            </select>
            <select className="form-control inline-style-194f87c8">
              <option value="">Toutes les dates</option>
              <option value="today">Aujourd'hui</option>
              <option value="week">7 derniers jours</option>
              <option value="month">Ce mois</option>
            </select>
            <button className="btn btn-primary">Filtrer</button>
          </div>
        </div>

        {/* Table */}
        <div className="table-container reveal">
          <table className="table">
            <thead>
              <tr>
                <th>Candidat</th>
                <th>Université</th>
                <th>Diplôme</th>
                <th>Date &amp; Heure</th>
                <th>Réf. BioCampus</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Candidat" className="inline-style-a5d2baa1">Mwamba Kalala</td>
                <td data-label="Université" className="text-secondary">Université de Kinshasa</td>
                <td data-label="Diplôme" className="text-secondary">Licence Droit</td>
                <td data-label="Date" className="text-secondary">12/03/2026 à 14:30</td>
                <td data-label="Référence"><span className="text-mono inline-style-8672d510">BC-2026-0483</span>
                </td>
                <td data-label="Statut"><span className="badge badge-verified">Certifié conforme</span></td>
                <td data-label="Action"><Link to="/downloads" className="action-btn-link">Télécharger</Link></td>
              </tr>
              <tr>
                <td data-label="Candidat" className="inline-style-a5d2baa1">Sarah Ntumba</td>
                <td data-label="Université" className="text-secondary">Université Protestante au Congo</td>
                <td data-label="Diplôme" className="text-secondary">Master Management</td>
                <td data-label="Date" className="text-secondary">14/03/2026 à 09:15</td>
                <td data-label="Référence"><span className="text-mono inline-style-8672d510">BC-2026-0491</span>
                </td>
                <td data-label="Statut"><span className="badge badge-pending">En cours (3/4)</span></td>
                <td data-label="Action"><Link to="/verification" className="action-btn-link">Suivre</Link></td>
              </tr>
              <tr>
                <td data-label="Candidat" className="inline-style-a5d2baa1">Joseph Ilunga</td>
                <td data-label="Université" className="text-secondary">Institut Supérieur de Commerce</td>
                <td data-label="Diplôme" className="text-secondary">BTS Commerce</td>
                <td data-label="Date" className="text-secondary">15/03/2026 à 16:45</td>
                <td data-label="Référence"><span className="text-mono inline-style-8672d510">BC-2026-0502</span>
                </td>
                <td data-label="Statut"><span className="badge badge-incomplete">Incomplet</span></td>
                <td data-label="Action"><Link to="/verification" className="action-btn-link">Compléter</Link></td>
              </tr>
              <tr>
                <td data-label="Candidat" className="inline-style-a5d2baa1">Paul Kabongo</td>
                <td data-label="Université" className="text-secondary">Université de Lubumbashi</td>
                <td data-label="Diplôme" className="text-secondary">Licence Sciences</td>
                <td data-label="Date" className="text-secondary">10/02/2026 à 11:20</td>
                <td data-label="Référence"><span className="text-mono inline-style-8672d510">BC-2026-0210</span>
                </td>
                <td data-label="Statut"><span className="badge badge-failed">Non vérifié</span></td>
                <td data-label="Action"><Link to="/downloads" className="action-btn-link">Voir motif</Link></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-6 inline-style-b3b75445">
          <span>Affichage de 4 résultats</span>
          <div className="d-flex gap-2">
            <button className="btn btn-secondary btn-sm" disabled>← Précédent</button>
            <button className="btn btn-primary btn-sm">1</button>
            <button className="btn btn-secondary btn-sm">2</button>
            <button className="btn btn-secondary btn-sm">Suivant →</button>
          </div>
        </div>
      </main>
    </>
  );
}
