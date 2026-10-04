import { useEffect, useState } from 'react';
import { Link, navigate } from '../router';
import { useApp } from '../context/AppContext';

export default function Downloads() {
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
          <Link to="/downloads" className="active">Téléchargements</Link>
          <Link to="/history">Historique</Link>
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
          <Link to="/downloads" className="active" onClick={() => setNavOpen(false)}>Téléchargements</Link>
          <Link to="/history" onClick={() => setNavOpen(false)}>Historique</Link>
          <Link to="/profile" onClick={() => setNavOpen(false)}>Mon profil</Link>
          <div className="inline-style-a8b228df"><Link to="/" className="inline-style-16eb5b7d" onClick={() => setNavOpen(false)}>Déconnexion</Link></div>
        </div>
      </div>

      <main className="page-wrap">
        <div className="d-flex justify-content-between align-items-center mb-6 page-title-row">
          <div>
            <h1 className="inline-style-7b8fff8f">Téléchargements &amp; Rapports</h1>
            <p className="text-secondary inline-style-b84c7dfa">Attestations d'authenticité horodatées et rapports
              d'audit PDF sécurisés.</p>
          </div>
          <button className="btn btn-secondary" onClick={() => alert('Export ZIP en cours... (simulation)')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Tout télécharger (ZIP)
          </button>
        </div>

        {/* Stats rapides */}
        <div className="grid-3 mb-8 reveal">
          <div className="card text-center">
            <div className="inline-style-bbe61c9d">3</div>
            <div className="inline-style-b3b75445">Documents certifiés</div>
          </div>
          <div className="card text-center">
            <div className="inline-style-a963c066">1</div>
            <div className="inline-style-b3b75445">En cours de génération</div>
          </div>
          <div className="card text-center">
            <div className="inline-style-055c5b40">4</div>
            <div className="inline-style-b3b75445">Total vérifications</div>
          </div>
        </div>

        {/* Documents list */}
        <div className="card reveal inline-style-042b49dd">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="inline-style-dd7e2806">Documents disponibles</h3>
            <div className="search-bar inline-style-019128fe">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9aa2b8" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input type="text" placeholder="Rechercher un document..." />
            </div>
          </div>

          {/* Doc items */}
          <div className="doc-card">
            <div className="doc-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div className="inline-style-c896c465">
              <div className="inline-style-3705c3ad">Attestation — Mwamba Kalala</div>
              <div className="inline-style-4e8e3733">Université de Kinshasa • 12/03/2026 • Réf. BC-2026-0483</div>
            </div>
            <span className="badge badge-verified">Certifié</span>
            <button className="btn btn-primary btn-sm" onClick={() => alert('Téléchargement PDF (simulation)')}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              PDF
            </button>
          </div>

          <div className="doc-card">
            <div className="doc-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div className="inline-style-c896c465">
              <div className="inline-style-3705c3ad">Attestation — Alexandre de Courcelles</div>
              <div className="inline-style-4e8e3733">Université Paris-Saclay • 14/05/2024 • Réf. BC-2024-8891</div>
            </div>
            <span className="badge badge-verified">Certifié</span>
            <button className="btn btn-primary btn-sm" onClick={() => alert('Téléchargement PDF (simulation)')}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              PDF
            </button>
          </div>

          <div className="doc-card">
            <div className="doc-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div className="inline-style-c896c465">
              <div className="inline-style-3705c3ad">Attestation — Camille Bertrand</div>
              <div className="inline-style-4e8e3733">Université Panthéon-Assas • 02/05/2024 • Réf. BC-2024-8511</div>
            </div>
            <span className="badge badge-verified">Certifié</span>
            <button className="btn btn-primary btn-sm" onClick={() => alert('Téléchargement PDF (simulation)')}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              PDF
            </button>
          </div>

          <div className="doc-card inline-style-090c37ca">
            <div className="doc-icon inline-style-5d2eecf5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="inline-style-a0981a68">
                <path d="M21 12a9 9 0 11-6.219-8.56" />
              </svg>
            </div>
            <div className="inline-style-c896c465">
              <div className="inline-style-3705c3ad">Attestation — Thomas Lemoine</div>
              <div className="inline-style-4e8e3733">CentraleSupélec • En cours... • Réf. BC-2024-8930</div>
            </div>
            <span className="badge badge-pending">En cours</span>
            <button className="btn btn-secondary btn-sm" disabled>En attente</button>
          </div>
        </div>
      </main>
    </>
  );
}
