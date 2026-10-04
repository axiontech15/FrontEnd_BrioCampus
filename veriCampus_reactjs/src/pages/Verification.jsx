import { useEffect, useState } from 'react';
import { Link } from '../router';
import { useApp } from '../context/AppContext';

export default function Verification() {
  const { tickets, setTickets } = useApp();
  const [navOpen, setNavOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [navOpen]);

  const goToStep = (n) => setStep(n);

  const selectCandidate = (name, etab, fac, mat) => {
    setSelected({ name, etab, fac, mat });
    setStep(3);
  };

  const confirmVerification = () => {
    setTickets((t) => Math.max(0, t - 1));
    setStep(4);
  };

  const dotClass = (n) => (n < step ? 'step-dot done' : n === step ? 'step-dot active' : 'step-dot');
  const itemClass = (n) => (n < step ? 'step-item done' : n === step ? 'step-item active' : 'step-item');

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
          <Link to="/verification" className="active">Vérifier</Link>
          <Link to="/tickets">Tickets</Link>
          <Link to="/downloads">Téléchargements</Link>
          <Link to="/history">Historique</Link>
          <Link to="/profile">Mon profil</Link>
        </nav>
        <div className="d-flex align-items-center gap-3">
          <span className="inline-style-c77ce71d">
            <span className="ticket-count-num">{tickets}</span> tickets
          </span>
          <Link to="/" className="inline-style-6eed7d64" title="Déconnexion">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
          </Link>
          <button className={`hamburger${navOpen ? ' open' : ''}`} id="hamburger" onClick={() => setNavOpen((v) => !v)}><span></span><span></span><span></span></button>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div className={`mobile-nav-overlay${navOpen ? ' open' : ''}`} id="mobileNavOverlay" onClick={(e) => { if (e.target === e.currentTarget) setNavOpen(false); }}>
        <div className="mobile-nav-panel">
          <button className="mobile-nav-close" id="mobileNavClose" onClick={() => setNavOpen(false)}>✕</button>
          <div className="inline-style-3330f1d9">BioCampus</div>
          <Link to="/dashboard" onClick={() => setNavOpen(false)}>Dashboard</Link>
          <Link to="/verification" className="active" onClick={() => setNavOpen(false)}>Vérifier un candidat</Link>
          <Link to="/tickets" onClick={() => setNavOpen(false)}>Tickets</Link>
          <Link to="/downloads" onClick={() => setNavOpen(false)}>Téléchargements</Link>
          <Link to="/history" onClick={() => setNavOpen(false)}>Historique</Link>
          <Link to="/profile" onClick={() => setNavOpen(false)}>Mon profil</Link>
          <div className="inline-style-a8b228df">
            <Link to="/" className="inline-style-16eb5b7d" onClick={() => setNavOpen(false)}>Déconnexion</Link>
          </div>
        </div>
      </div>

      <main className="page-wrap">
        {/* Page title */}
        <div className="d-flex justify-content-between align-items-center mb-6 page-title-row">
          <div>
            <h1 className="inline-style-7b8fff8f">Vérifier un candidat</h1>
            <p className="text-secondary inline-style-b84c7dfa">Interrogez les registres universitaires officiels en
              temps réel.</p>
          </div>
          <div className="badge badge-blue inline-style-265b0484">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a4 4 0 00-8 0v2" />
            </svg>
            <span className="ticket-count-num">{tickets}</span> tickets disponibles
          </div>
        </div>

        {/* Step indicator */}
        <div className="inline-style-e8d373c7" id="stepIndicator">
          <div className={itemClass(1)} id="step-item-1">
            <div className={dotClass(1)} id="step-dot-1">{1 < step ? '✓' : '1'}</div>
            <div className="step-label">Recherche</div>
          </div>
          <div className={'step-line' + (1 < step ? ' done' : '')} id="step-line-1"></div>
          <div className={itemClass(2)} id="step-item-2">
            <div className={dotClass(2)} id="step-dot-2">{2 < step ? '✓' : '2'}</div>
            <div className="step-label">Résultats</div>
          </div>
          <div className={'step-line' + (2 < step ? ' done' : '')} id="step-line-2"></div>
          <div className={itemClass(3)} id="step-item-3">
            <div className={dotClass(3)} id="step-dot-3">{3 < step ? '✓' : '3'}</div>
            <div className="step-label">Confirmation</div>
          </div>
          <div className={'step-line' + (3 < step ? ' done' : '')} id="step-line-3"></div>
          <div className={itemClass(4)} id="step-item-4">
            <div className={dotClass(4)} id="step-dot-4">{4 < step ? '✓' : '4'}</div>
            <div className="step-label">Résultat</div>
          </div>
        </div>

        <div className="card inline-style-c423fb7d">

          {/* STEP 1: SEARCH */}
          <div id="searchForm" style={{ display: step === 1 ? 'block' : 'none' }}>
            <div className="alert alert-info mb-6 inline-style-6381de5d">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="inline-style-5b214b83">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>La <strong>recherche est gratuite</strong> et ne consomme pas de ticket. Le ticket n&apos;est
                utilisé qu&apos;à la confirmation.</span>
            </div>

            <form id="veriForm" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
              <div className="grid-2">
                <div className="form-group">
                  <label htmlFor="searchNom" className="form-label">Nom du candidat *</label>
                  <input type="text" id="searchNom" className="form-control" placeholder="Ex: Dupont" required />
                </div>
                <div className="form-group">
                  <label htmlFor="searchPrenom" className="form-label">Prénom (Optionnel)</label>
                  <input type="text" id="searchPrenom" className="form-control" placeholder="Ex: Jean" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="searchUniv" className="form-label">Université / Établissement *</label>
                <select id="searchUniv" className="form-control" required>
                  <option value="">Sélectionner une université...</option>
                  <option value="UNIKIN">Université de Kinshasa</option>
                  <option value="UPC">Université Protestante au Congo</option>
                  <option value="ISC">Institut Supérieur de Commerce</option>
                  <option value="UNIKIN-MED">Faculté de Médecine — UNIKIN</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="searchMatricule" className="form-label">Matricule (Optionnel)</label>
                <input type="text" id="searchMatricule" className="form-control"
                  placeholder="Ex: 2021-UNIKIN-04831" />
              </div>
              <div className="d-flex justify-content-between align-items-center mt-6">
                <Link to="/dashboard" className="btn btn-secondary">← Annuler</Link>
                <button type="submit" className="btn btn-primary">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  Rechercher le candidat
                </button>
              </div>
            </form>
          </div>

          {/* STEP 2: RESULTS */}
          <div id="searchResults" className="inline-style-93b8ea5b" style={{ display: step === 2 ? 'block' : 'none' }}>
            <h3 className="mb-2 inline-style-e2151554">Résultats de la recherche</h3>
            <p className="text-secondary mb-6">Plusieurs candidats correspondent. Sélectionnez le bon profil.</p>

            <div className="grid-2 mb-6">
              <div className="card card-interactive inline-style-b0554076"
                onClick={() => selectCandidate('Jean Dupont', 'Université de Kinshasa', 'Faculté des Sciences', 'XXX-4831')}>
                <div className="inline-style-3e287928">
                  <div className="avatar inline-style-75ae2969">JD</div>
                  <span className="badge badge-blue">Sélectionner</span>
                </div>
                <h4 className="inline-style-ccc42bed">Jean Dupont</h4>
                <p className="text-secondary mb-2 inline-style-9bd93d36">Université de Kinshasa</p>
                <div className="inline-style-b84c7dfa">
                  <div>Faculté des Sciences</div>
                  <div className="text-mono mt-2 text-secondary inline-style-9bd93d36">Matricule : XXX-4831</div>
                </div>
              </div>

              <div className="card card-interactive"
                onClick={() => selectCandidate('Jean Dupont', 'Université de Kinshasa', 'Faculté de Droit', 'XXX-1928')}>
                <div className="inline-style-3e287928">
                  <div className="avatar inline-style-1062f51b">JD</div>
                  <span className="badge badge-incomplete">Sélectionner</span>
                </div>
                <h4 className="inline-style-ccc42bed">Jean Dupont</h4>
                <p className="text-secondary mb-2 inline-style-9bd93d36">Université de Kinshasa</p>
                <div className="inline-style-b84c7dfa">
                  <div>Faculté de Droit</div>
                  <div className="text-mono mt-2 text-secondary inline-style-9bd93d36">Matricule : XXX-1928</div>
                </div>
              </div>
            </div>

            <button type="button" className="btn btn-secondary" onClick={() => goToStep(1)}>← Nouvelle recherche</button>
          </div>

          {/* STEP 3: CONFIRMATION */}
          <div id="confirmationStep" className="inline-style-93b8ea5b" style={{ display: step === 3 ? 'block' : 'none' }}>
            <h3 className="mb-2 inline-style-8d9baaa0">Confirmer la vérification</h3>

            <div className="alert alert-warning mb-6">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="inline-style-5b214b83">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span>Cette vérification utilisera <strong>1 ticket</strong> sur votre solde actuel. Action
                irréversible.</span>
            </div>

            <div className="mb-6 inline-style-618a27c2">
              <h4 className="mb-4 inline-style-736caf54">Profil sélectionné</h4>
              <div className="grid-2">
                <div>
                  <div className="text-secondary inline-style-c07f2ace">Candidat</div>
                  <div className="inline-style-00bd52c4" id="confName">{selected ? selected.name : 'Jean Dupont'}</div>
                </div>
                <div>
                  <div className="text-secondary inline-style-c07f2ace">Établissement</div>
                  <div className="inline-style-a5d2baa1" id="confEtab">{selected ? selected.etab : 'Université de Kinshasa'}</div>
                </div>
                <div className="mt-4">
                  <div className="text-secondary inline-style-c07f2ace">Faculté</div>
                  <div className="inline-style-a5d2baa1" id="confFac">{selected ? selected.fac : 'Faculté des Sciences'}</div>
                </div>
                <div className="mt-4">
                  <div className="text-secondary inline-style-c07f2ace">Matricule</div>
                  <div className="text-mono inline-style-a5d2baa1" id="confMat">{selected ? selected.mat : 'XXX-4831'}</div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <button type="button" className="btn btn-secondary" onClick={() => goToStep(2)}>← Retour aux
                résultats</button>
              <button type="button" className="btn btn-primary" onClick={() => confirmVerification()}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Confirmer la vérification
              </button>
            </div>
          </div>

          {/* STEP 4: RESULT */}
          <div id="resultStep" className="inline-style-93b8ea5b" style={{ display: step === 4 ? 'block' : 'none' }}>
            <div className="text-center mb-6">
              <div className="inline-style-7bdf0e57">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--bc-verified)"
                  strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="badge badge-verified inline-style-fb3b5cc8">
                ✓ DIPLÔME VÉRIFIÉ
              </span>
              <h2 className="mb-2">Le diplôme a été confirmé</h2>
              <p className="text-secondary">L&apos;établissement a authentifié le diplôme. Le rapport certifié est prêt au
                téléchargement.</p>
            </div>

            <div className="mb-6 inline-style-67555ed6">
              <div className="inline-style-44f0ae66">
                <h4 className="inline-style-dd7e2806">Licence en économie · 2021</h4>
                <span className="text-mono text-secondary inline-style-9bd93d36">BC-2026-0483-KIN</span>
              </div>
              <div className="inline-style-042b49dd">
                <div className="grid-2">
                  <div className="mb-4">
                    <div className="text-secondary inline-style-643a7cf5">Candidat</div>
                    <div className="inline-style-a5d2baa1" id="resName">{selected ? selected.name : 'Jean Dupont'}</div>
                  </div>
                  <div className="mb-4">
                    <div className="text-secondary inline-style-643a7cf5">Établissement</div>
                    <div className="inline-style-a5d2baa1" id="resEtab">{selected ? selected.etab : 'Université de Kinshasa'}</div>
                  </div>
                  <div>
                    <div className="text-secondary inline-style-643a7cf5">Matricule</div>
                    <div className="text-mono inline-style-a5d2baa1" id="resMat">{selected ? selected.mat : 'XXX-4831'}</div>
                  </div>
                  <div>
                    <div className="text-secondary inline-style-643a7cf5">Date de vérification</div>
                    <div className="inline-style-a5d2baa1">Aujourd&apos;hui</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center gap-4">
              <Link to="/dashboard" className="btn btn-secondary">← Retour au dashboard</Link>
              <Link to="/downloads" className="btn btn-primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Télécharger le rapport PDF
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
