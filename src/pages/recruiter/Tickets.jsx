import { useEffect, useState } from 'react';
import { Link, navigate } from '../../router';
import ProfileMenu from './ProfileMenu';
import { useApp } from '../../context/AppContext';

export default function Tickets() {
  const { tickets, setTickets } = useApp();
  const [navOpen, setNavOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

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

  const selectPack = (count, name) => {
    setSelectedPack({ count, name });
  };

  const simulatePurchase = () => {
    if (!selectedPack) {
      alert('Veuillez sélectionner un pack.');
      return;
    }
    setTickets(t => t + selectedPack.count);
    setShowSuccess(true);
    setSelectedPack(null);
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
          <Link to="/login" className="sa-icon-btn-danger" title="Déconnexion">
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
          <div className="inline-style-3330f1d9">BioCampus</div>
          <Link to="/dashboard" onClick={() => setNavOpen(false)}>Dashboard</Link>
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
          <div className="inline-style-a8b228df"><Link to="/login" className="inline-style-16eb5b7d" onClick={() => setNavOpen(false)}>Déconnexion</Link></div>
        </div>
      </div>

      <main className="page-wrap">
        <div className="page-title-row d-flex justify-content-between align-items-center mb-6">
          <div>
            <h1 className="inline-style-7b8fff8f">Mes tickets</h1>
            <p className="text-secondary inline-style-b84c7dfa">Gérez votre solde et approvisionnez votre compte.</p>
          </div>
        </div>

        {/* Solde + Achat */}
        <div className="grid-2 mb-8 tickets-grid">
          {/* Solde */}
          <div className="card text-center inline-style-992cab8a">
            <div className="inline-style-1b84af02">Solde actuel</div>
            <div className="inline-style-b0eaa4e4 ticket-count-num">{tickets}</div>
            <div className="inline-style-57a6c42e">tickets disponibles</div>
            <div className="inline-style-de20e9ef">
              <strong className="inline-style-b5927153">1 ticket = 1 vérification certifiée</strong><br />
              <span className="inline-style-643a7cf5">Validité permanente • Sans expiration</span>
            </div>
          </div>

          {/* Achat */}
          <div className="card">
            <h3 className="mb-2 inline-style-e2151554">Acheter des tickets</h3>
            <p className="text-secondary mb-6 inline-style-b84c7dfa">Choisissez un pack adapté à vos besoins de
              recrutement.</p>

            <div className="d-flex flex-column gap-3 mb-6">
              <div className={selectedPack && selectedPack.name === 'Pack Découverte' ? 'pack-card selected' : 'pack-card'} onClick={() => selectPack(10, 'Pack Découverte')}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="inline-style-00bd52c4">Pack Découverte</div>
                    <div className="text-secondary inline-style-9bd93d36">Idéal pour tester la plateforme</div>
                  </div>
                  <div className="inline-style-08a0ed40">
                    <div className="inline-style-ed40432b">10</div>
                    <div className="inline-style-7ebfadc5">tickets</div>
                  </div>
                </div>
              </div>

              <div className={selectedPack && selectedPack.name === 'Pack Recruteur' ? 'pack-card inline-style-4cb8ceeb selected' : 'pack-card inline-style-4cb8ceeb'} onClick={() => selectPack(50, 'Pack Recruteur')}>
                <span className="pack-popular">Plus populaire</span>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="inline-style-00bd52c4">Pack Recruteur</div>
                    <div className="text-secondary inline-style-9bd93d36">Pour les équipes RH actives</div>
                  </div>
                  <div className="inline-style-08a0ed40">
                    <div className="inline-style-ed40432b">50</div>
                    <div className="inline-style-7ebfadc5">tickets</div>
                  </div>
                </div>
              </div>

              <div className={selectedPack && selectedPack.name === 'Pack Entreprise' ? 'pack-card selected' : 'pack-card'} onClick={() => selectPack(200, 'Pack Entreprise')}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="inline-style-00bd52c4">Pack Entreprise</div>
                    <div className="text-secondary inline-style-9bd93d36">Pour les grands volumes de recrutement
                    </div>
                  </div>
                  <div className="inline-style-08a0ed40">
                    <div className="inline-style-ed40432b">200</div>
                    <div className="inline-style-7ebfadc5">tickets</div>
                  </div>
                </div>
              </div>
            </div>

            <button type="button" className="btn btn-primary inline-style-8588e44d" id="buyBtn"
              onClick={simulatePurchase}>
              {selectedPack ? `Acheter — ${selectedPack.name} (${selectedPack.count} tickets)` : (<><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a4 4 0 00-8 0v2" />
              </svg>
                Procéder au paiement</>)}
            </button>

            <div id="successMsg" className="alert alert-success mt-4 inline-style-93b8ea5b" style={{ display: showSuccess ? 'flex' : 'none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="inline-style-5b214b83">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Tickets ajoutés avec succès à votre compte ! (Simulation)</span>
            </div>
          </div>
        </div>

        {/* Historique */}
        <div className="card reveal">
          <h3 className="mb-4 inline-style-8df3df7d">Historique des achats</h3>
          <div className="inline-style-77c8140b">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Quantité</th>
                  <th>Statut</th>
                  <th>Facture</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Date" className="text-secondary">01/03/2026</td>
                  <td data-label="Description" className="inline-style-a5d2baa1">Pack Recruteur</td>
                  <td data-label="Quantité" className="text-mono inline-style-a07ec474">+50 tickets</td>
                  <td data-label="Statut"><span className="badge badge-verified">Payé</span></td>
                  <td data-label="Facture"><Link to="/downloads"
                    className="action-btn-link inline-style-9bd93d36">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    PDF
                  </Link></td>
                </tr>
                <tr>
                  <td data-label="Date" className="text-secondary">15/01/2026</td>
                  <td data-label="Description" className="inline-style-a5d2baa1">Pack Découverte</td>
                  <td data-label="Quantité" className="text-mono inline-style-a07ec474">+10 tickets</td>
                  <td data-label="Statut"><span className="badge badge-verified">Payé</span></td>
                  <td data-label="Facture"><Link to="/downloads"
                    className="action-btn-link inline-style-9bd93d36">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    PDF
                  </Link></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
