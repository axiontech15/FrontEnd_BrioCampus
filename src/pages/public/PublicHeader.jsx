import { useEffect, useState } from 'react';
import { Link, useHashRoute } from '../../router';

const NAV = [
  { to: '/', label: 'Accueil' },
  { to: '/fonctionnalites', label: 'Fonctionnalités' },
  { to: '/pourquoi', label: 'Pourquoi nous' },
  { to: '/securite', label: 'Sécurité' },
  { to: '/privacy', label: 'Confidentialité' },
];

export default function PublicHeader() {
  const path = useHashRoute();
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [navOpen]);

  useEffect(() => { setNavOpen(false); }, [path]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`public-header${scrolled ? ' is-scrolled' : ''}${path === '/' ? ' on-hero' : ''}`}>
        <div className="public-header-inner">
          <Link to="/" className="public-brand" aria-label="BioCampus — Accueil">
            <span className="public-brand-text">
              <span className="public-brand-name">BioCampus</span>
              <span className="public-brand-sub">Démo interactive</span>
            </span>
          </Link>

          <nav className="header-nav public-nav" aria-label="Navigation principale">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} className={path === item.to ? 'active' : ''} aria-current={path === item.to ? 'page' : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions-desktop public-header-actions">
            <Link to="/login" className="btn btn-primary">Accéder à la démo</Link>
          </div>

          <button
            type="button"
            className={`hamburger${navOpen ? ' open' : ''}`}
            onClick={() => setNavOpen((v) => !v)}
            aria-label={navOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-controls="mobile-menu"
            aria-expanded={navOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div
        className={`mobile-nav-overlay${navOpen ? ' open' : ''}`}
        onClick={(e) => { if (!e.target.closest('.mobile-nav-panel')) setNavOpen(false); }}
      >
        <nav className="mobile-nav-panel" id="mobile-menu" aria-label="Navigation mobile">
          <button type="button" className="mobile-nav-close" onClick={() => setNavOpen(false)} aria-label="Fermer">✕</button>
          <div className="public-brand-name" style={{ marginBottom: 16 }}>BioCampus</div>
          {NAV.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setNavOpen(false)}>
              {item.label}
            </Link>
          ))}
          <hr className="inline-style-d2a02b96" />
          <Link to="/login" className="btn btn-primary" onClick={() => setNavOpen(false)}>Accéder à la démo</Link>
        </nav>
      </div>
    </>
  );
}
