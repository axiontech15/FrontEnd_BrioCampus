import { useEffect, useState } from 'react';
import { Link, navigate } from '../../router';
import ProfileMenu from './ProfileMenu';
import { useApp } from '../../context/AppContext';

export default function Profile() {
  const { tickets } = useApp();
  const [navOpen, setNavOpen] = useState(false);
  const [savedEntreprise, setSavedEntreprise] = useState(false);
  const [savedProfil, setSavedProfil] = useState(false);

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

  const saveSection = (e, section) => {
    e.preventDefault();
    if (section === 'Entreprise') {
      setSavedEntreprise(true);
      setTimeout(() => {
        setSavedEntreprise(false);
      }, 2000);
    } else {
      setSavedProfil(true);
      setTimeout(() => {
        setSavedProfil(false);
      }, 2000);
    }
  };

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
          <ProfileMenu />
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
          <Link to="/profile" className="active" onClick={() => setNavOpen(false)}>Mon profil</Link>
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
          <div className="inline-style-a8b228df"><Link to="/" className="inline-style-16eb5b7d" onClick={() => setNavOpen(false)}>Déconnexion</Link></div>
        </div>
      </div>

      <main className="page-wrap">
        {/* Profile hero */}
        <div className="card mb-6 reveal inline-style-71652b00">
          <div className="d-flex align-items-center gap-6 inline-style-407bbb32">
            <div className="profile-avatar-big">A</div>
            <div>
              <div className="inline-style-b53cc9e5">Compte recruteur</div>
              <div className="inline-style-b7a4c5c9">Alexandre Dupont</div>
              <div className="inline-style-8418396e">Cabinet Kin Talents • Ressources Humaines</div>
            </div>
            <div className="inline-style-e4441897">
              <div className="inline-style-8d7a56c5">
                <div className="inline-style-7c0af424">Solde tickets</div>
                <div className="inline-style-258df309 ticket-count-num">{tickets}</div>
                <Link to="/tickets" className="inline-style-699ef631">Recharger →</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Grille Entreprise + Infos personnelles */}
        <div className="grid-2 profile-grid">

          {/* Entreprise */}
          <div className="card reveal">
            <h3 className="mb-6 inline-style-8df3df7d">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="inline-style-15fffdce">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Informations de l'entreprise
            </h3>
            <form onSubmit={(e) => saveSection(e, 'Entreprise')}>
              <div className="form-group">
                <label className="form-label">Nom de l'entreprise</label>
                <input type="text" className="form-control" defaultValue="Cabinet Kin Talents" />
              </div>
              <div className="form-group">
                <label className="form-label">RCCM / ID National</label>
                <input type="text" className="form-control" defaultValue="CD/KIN/RCCM/14-B-XXXX" />
              </div>
              <div className="form-group">
                <label className="form-label">Secteur d'activité</label>
                <input type="text" className="form-control" defaultValue="Ressources Humaines & Recrutement" />
              </div>
              <div className="form-group">
                <label className="form-label">Pays</label>
                <select className="form-control" defaultValue="République Démocratique du Congo">
                  <option>République Démocratique du Congo</option>
                  <option>Congo-Brazzaville</option>
                  <option>Rwanda</option>
                  <option>Burundi</option>
                </select>
              </div>
              <button type="submit" className="btn btn-secondary" style={savedEntreprise ? { background: 'var(--bc-verified)', borderColor: 'var(--bc-verified)', color: '#fff' } : undefined}>
                {savedEntreprise ? '✓ Sauvegardé !' : (<><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2">
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                  Sauvegarder</>)}
              </button>
            </form>
          </div>

          {/* Infos personnelles */}
          <div className="card reveal">
            <h3 className="mb-6 inline-style-8df3df7d">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="inline-style-15fffdce">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Informations personnelles
            </h3>
            <form onSubmit={(e) => saveSection(e, 'Profil')}>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Prénom</label>
                  <input type="text" className="form-control" defaultValue="Alexandre" />
                </div>
                <div className="form-group">
                  <label className="form-label">Nom</label>
                  <input type="text" className="form-control" defaultValue="Dupont" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email professionnel</label>
                <input type="email" className="form-control" defaultValue="a.dupont@kintalents.cd" />
              </div>
              <div className="form-group">
                <label className="form-label">Téléphone</label>
                <input type="tel" className="form-control" defaultValue="+243 81 000 0000" />
              </div>

              <hr className="divider" />

              <h4 className="mb-4 inline-style-1b3c5755">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" className="inline-style-fcbdd4a7">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                Sécurité du compte
              </h4>
              <div className="form-group">
                <label className="form-label">Nouveau mot de passe</label>
                <input type="password" className="form-control" placeholder="Laisser vide pour ne pas changer" />
              </div>
              <div className="form-group">
                <label className="form-label">Confirmer le mot de passe</label>
                <input type="password" className="form-control" placeholder="••••••••" />
              </div>

              <button type="submit" className="btn btn-primary" style={savedProfil ? { background: 'var(--bc-verified)', borderColor: 'var(--bc-verified)', color: '#fff' } : undefined}>
                {savedProfil ? '✓ Sauvegardé !' : (<><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                  Enregistrer les modifications</>)}
              </button>
            </form>
          </div>
        </div>

        {/* Danger zone */}
        <div className="card mt-6 reveal inline-style-c6a6c136">
          <h3 className="mb-2 inline-style-f2b35e30">Zone sensible</h3>
          <p className="text-secondary mb-4 inline-style-b84c7dfa">Ces actions sont irréversibles. Agissez avec
            précaution.</p>
          <div className="d-flex gap-3 inline-style-407bbb32">
            <Link to="/" className="btn btn-danger-outline btn-sm" onClick={() => navigate('/')}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
              Se déconnecter
            </Link>
            <button className="btn btn-danger-outline btn-sm"
              onClick={() => alert('Demande de suppression envoyée (simulation)')}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
              </svg>
              Supprimer le compte
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
