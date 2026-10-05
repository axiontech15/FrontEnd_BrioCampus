import { useEffect, useState } from 'react';
import { Link, useHashRoute } from '../../router';

const NAV = [
  { to: '/', label: 'Accueil' },
  { to: '/fonctionnalites', label: 'Fonctionnalités' },
  { to: '/pourquoi', label: 'Pourquoi BioCampus' },
  { to: '/securite', label: 'Sécurité' },
  { to: '/privacy', label: 'Légal' },
];

// Header unique de l'espace public (accueil, fonctionnalités,
// pourquoi, sécurité, légal). Login/Register gardent leur mise en
// page d'authentification plein écran, sans header.
export default function PublicHeader() {
  const path = useHashRoute();
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [navOpen]);

  useEffect(() => { setNavOpen(false); }, [path]);

  return (
    <>
      <header className="inline-style-90a91e09">
        <Link to="/" className="inline-style-0dc9c093">
          <div className="inline-style-f2f527b7">
            <img className="brand-logo-full" src="assets/logo-biocampus.svg" alt="BRIO CAMPUS" />
          </div>
          <div>
            <div className="inline-style-c921babc">BioCampus</div>
            <div className="inline-style-1b282f55">Vérification Académique</div>
          </div>
        </Link>
        <nav className="header-nav" id="desktopNav">
          {NAV.map((item) => (
            <Link key={item.to} to={item.to} className={path === item.to ? 'active' : ''}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="d-flex align-items-center gap-4 header-actions-desktop">
          <Link to="/login" className="inline-style-10d016c9">Connexion</Link>
          <Link to="/register" className="btn btn-primary inline-style-aef0d252">Créer un compte →</Link>
        </div>
        <button id="hamburger" className={`hamburger${navOpen ? ' open' : ''}`} onClick={() => setNavOpen((v) => !v)} aria-label="Menu"><span></span><span></span><span></span></button>
      </header>

      <div id="mobileNavOverlay" className={`mobile-nav-overlay${navOpen ? ' open' : ''}`} onClick={(e) => { if (!e.target.closest('.mobile-nav-panel')) setNavOpen(false); }}>
        <div className="mobile-nav-panel">
          <button className="mobile-nav-close" id="mobileNavClose" onClick={() => setNavOpen(false)}>✕</button>
          <div className="inline-style-e079e06f">
            <div className="inline-style-5a10b7c8">BioCampus</div>
          </div>
          {NAV.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setNavOpen(false)}>
              {item.to === '/privacy' ? 'Politique de confidentialité' : item.label}
            </Link>
          ))}
          <hr className="inline-style-d2a02b96" />
          <Link to="/login" onClick={() => setNavOpen(false)}>Se connecter</Link>
          <Link to="/register" className="inline-style-e437daab" onClick={() => setNavOpen(false)}>Créer un compte</Link>
        </div>
      </div>
    </>
  );
}
