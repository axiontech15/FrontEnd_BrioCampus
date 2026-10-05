import { useEffect, useState } from 'react';
import { Link } from '../../router';
import { IconBolt, IconFile, IconLock, IconShield, IconSliders, IconUsers } from '../../components/icons';

export default function Landing() {
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
          <a href="#fonctionnalites">Fonctionnalités</a>
          <Link to="/pourquoi">Pourquoi BioCampus</Link>
          <Link to="/securite">Sécurité</Link>
          <Link to="/privacy">Légal</Link>
        </nav>
        <div className="d-flex align-items-center gap-4 header-actions-desktop">
          <Link to="/login" className="inline-style-10d016c9">Connexion</Link>
          <Link to="/register" className="btn btn-primary inline-style-aef0d252">Créer un compte →</Link>
        </div>
        <button id="hamburger" className={`hamburger${navOpen ? ' open' : ''}`} onClick={() => setNavOpen(v => !v)} aria-label="Menu"><span></span><span></span><span></span></button>
      </header>

      {/* Mobile Nav Overlay */}
      <div id="mobileNavOverlay" className={`mobile-nav-overlay${navOpen ? ' open' : ''}`} onClick={(e) => { if (!e.target.closest('.mobile-nav-panel')) setNavOpen(false); }}>
        <div className="mobile-nav-panel">
          <button className="mobile-nav-close" id="mobileNavClose" onClick={() => setNavOpen(false)}>✕</button>
          <div className="inline-style-e079e06f">
            <div className="inline-style-5a10b7c8">BioCampus</div>
          </div>
          <a href="#fonctionnalites" onClick={() => setNavOpen(false)}>Fonctionnalités</a>
          <Link to="/pourquoi" onClick={() => setNavOpen(false)}>Pourquoi BioCampus</Link>
          <Link to="/securite" onClick={() => setNavOpen(false)}>Sécurité</Link>
          <Link to="/privacy" onClick={() => setNavOpen(false)}>Politique de confidentialité</Link>
          <hr className="inline-style-d2a02b96" />
          <Link to="/login" onClick={() => setNavOpen(false)}>Se connecter</Link>
          <Link to="/register" className="inline-style-e437daab" onClick={() => setNavOpen(false)}>Créer un compte</Link>
        </div>
      </div>

      <main>
        {/* Hero Section */}
        <section className="container hero-section">
          <div>
            <div className="badge badge-pending mb-4 inline-style-ae969c75">
              NOUVEAU - VÉRIFICATION ACADÉMIQUE EN RDC
            </div>
            <h1 className="hero-title">Vérifiez les parcours académiques. <br /><span>Décidez en toute confiance.</span>
            </h1>
            <p className="mt-4 inline-style-fcc76b43">
              La plateforme numérique de référence qui connecte instantanément les directions des ressources
              humaines aux registres officiels des universités et grandes écoles congolaises.
            </p>
            <div className="d-flex align-items-center gap-4 mb-6">
              <span className="inline-style-65b7efb1">✓ Support API et Multi-utilisateurs</span>
              <span className="inline-style-65b7efb1">✓ Conformité académique RDC 2026</span>
            </div>
            <div className="d-flex gap-4">
              <Link to="/register" className="btn btn-primary">Créer un compte entreprise</Link>
              <Link to="/privacy" className="btn btn-secondary">Contacter notre équipe</Link>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <h4>140+</h4>
                <p>Établissements interconnectés</p>
              </div>
              <div className="stat-item">
                <h4 className="inline-style-2afea5a0">0%</h4>
                <p>Risque d'erreur / Faux profils</p>
              </div>
              <div className="stat-item">
                <h4>2.4M</h4>
                <p>Dossiers vérifiables</p>
              </div>
            </div>
          </div>

          {/* Mockup Illustration (Right side) */}
          <div className="inline-style-d85c4e64">
            <div className="inline-style-7727d4d1"></div>
            <div className="mock-card">
              <div className="inline-style-ef61fdc7">
                <div className="d-flex align-items-center gap-2">
                  <div className="inline-style-319bdd24"></div>
                  <div>
                    <div className="inline-style-0222a1c6">Université de Kinshasa</div>
                    <div className="inline-style-b23b161c">République Démocratique du Congo</div>
                  </div>
                </div>
                <span className="badge badge-verified inline-style-49f06467">Identité confirmée</span>
              </div>
              <div className="inline-style-29b69da1">
                <div className="inline-style-c2d9d944">Candidat certifié - 09-02-2026</div>
                <h3 className="inline-style-337124d3">Alexandre de Courcelles</h3>

                <div className="grid-2 gap-4 mb-4">
                  <div>
                    <div className="inline-style-04900fef">Diplôme obtenu</div>
                    <div className="inline-style-b2c1b7ca">Master Ingénierie des Systèmes</div>
                  </div>
                  <div>
                    <div className="inline-style-04900fef">Statut Académique</div>
                    <div className="inline-style-320b5347">Régulier (Promotion 2024)</div>
                  </div>
                </div>
              </div>
              <div className="inline-style-5efee4e5">
                <div className="inline-style-cebe43d4">✓</div>
                <div className="inline-style-345895de">DIPLÔME AUTHENTIQUE <br /><span
                  className="inline-style-7be4de97">Garantie académique BioCampus certifiée</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1 : Standards */}
        <section className="section-padding bg-light inline-style-8a2b5265">
          <div className="container">
            <div className="d-flex justify-content-between align-items-end mb-8">
              <div>
                <div className="inline-style-8feec6a6">GARANTIE DE CONFIANCE MAJEURE</div>
                <h2 className="section-title">Les standards de rigueur institutionnelle</h2>
              </div>
              <p className="inline-style-eb826235">La plateforme obéit aux plus hauts standards de confidentialité,
                d'audits et aux directives de l'ESU en matière de documentation numérique.</p>
            </div>

            <div className="grid-3">
              <div className="card">
                <div className="icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="mb-2 inline-style-768e1f23">Source Établissement</h3>
                <p className="text-secondary inline-style-267f6d50">Les informations proviennent directement des
                  universités. Aucune base de données intermédiaire n'est utilisée.</p>
              </div>
              <div className="card">
                <div className="icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>
                <h3 className="mb-2 inline-style-768e1f23">Traçabilité immuable</h3>
                <p className="text-secondary inline-style-267f6d50">Chaque vérification laisse une empreinte
                  cryptographique garantissant l'intégrité de la réponse.</p>
              </div>
              <div className="card">
                <div className="icon-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                    <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
                  </svg>
                </div>
                <h3 className="mb-2 inline-style-768e1f23">Conformité RGPD & Sécurité</h3>
                <p className="text-secondary inline-style-267f6d50">Architecture développée selon les standards
                  internationaux garantissant la protection des données personnelles.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 : Pourquoi 82% */}
        <section className="section-padding inline-style-8a2b5265">
          <div className="container text-center mb-8">
            <div className="inline-style-8feec6a6">ENJEUX & BÉNÉFICES</div>
            <h2 className="section-title">Pourquoi 82% des DRH auditent désormais<br />leurs recrutements clés ?</h2>
            <p className="section-subtitle inline-style-772440ee">La prolifération de fausses déclarations et de faux
              diplômes constitue un risque majeur pour les entreprises dans un marché mondialisé.</p>
          </div>
          <div className="container grid-3">
            <div className="card card-light-blue">
              <div className="icon-circle inline-style-e9c49365">!</div>
              <h3 className="mb-2 inline-style-beab5831">0 Risque Réputationnel</h3>
              <p className="text-secondary inline-style-76674537">Évitez les scandales liés aux recrutements de
                profils frauduleux. Protégez la marque employeur et la crédibilité de votre structure en vous
                assurant de l'authenticité des profils.</p>
            </div>
            <div className="card card-light-blue">
              <div className="icon-circle inline-style-e9c49365"><IconBolt /></div>
              <h3 className="mb-2 inline-style-beab5831">Gain de temps massif</h3>
              <p className="text-secondary inline-style-76674537">Les vérifications traditionnelles prenaient des
                semaines. BioCampus réduit ce délai à quelques minutes pour un profil référencé, accélérant
                considérablement votre Time-to-Hire.</p>
            </div>
            <div className="card card-light-blue">
              <div className="icon-circle inline-style-e9c49365">✓</div>
              <h3 className="mb-2 inline-style-beab5831">Conformité et Audits RH</h3>
              <p className="text-secondary inline-style-76674537">Répondez aux exigences de vos clients, auditeurs et
                régulateurs sectoriels (Banque, Santé, etc.) en prouvant la qualification exacte de vos
                collaborateurs.</p>
            </div>
          </div>
        </section>

        {/* Section 3 : 5 étapes */}
        <section className="section-padding inline-style-8a2b5265">
          <div className="container text-center mb-8">
            <div className="inline-style-8feec6a6">PARCOURS EMPLOYEUR SIMPLIFIÉ</div>
            <h2 className="section-title">Comment certifier un candidat en 5 étapes</h2>
          </div>

          <div className="container">
            <div className="step-container">
              <div className="step-item">
                <div className="step-number">1</div>
                <h4 className="inline-style-0b4e3c25">Création du compte</h4>
                <p className="text-secondary inline-style-6ec70819">Enregistrement rapide de votre entreprise avec
                  validation KYC.</p>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <h4 className="inline-style-0b4e3c25">Solde tickets</h4>
                <p className="text-secondary inline-style-6ec70819">Approvisionnez votre compte selon vos besoins de
                  recrutement.</p>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <h4 className="inline-style-0b4e3c25">Choix Établissement</h4>
                <p className="text-secondary inline-style-6ec70819">Sélectionnez l'université et renseignez les
                  informations du candidat.</p>
              </div>
              <div className="step-item">
                <div className="step-number">4</div>
                <h4 className="inline-style-0b4e3c25">Vérification Flash</h4>
                <p className="text-secondary inline-style-6ec70819">Lancement de la requête sécurisée et traitement
                  en temps réel.</p>
              </div>
              <div className="step-item">
                <div className="step-number">5</div>
                <h4 className="inline-style-0b4e3c25">Rapport Final</h4>
                <p className="text-secondary inline-style-6ec70819">Téléchargement immédiat du certificat académique
                  officiel PDF.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 : Tickets Banner */}
        <section className="container section-padding">
          <div className="cta-banner d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-6">
              <div className="inline-style-497ae0cb">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>
              <div>
                <div className="inline-style-fcee7e6d">MODÈLE DE FACTURATION TRANSPARENT</div>
                <h2 className="inline-style-f15f0089">1 Ticket = 1 Vérification certifiée</h2>
                <p className="inline-style-d6244e0f">Aucun frais d'abonnement caché, aucun engagement obligatoire.
                  Le ticket déclenche la requête sécurisée, et ne se consomme qu'en cas de résultat vérifié.
                </p>
              </div>
            </div>
            <div>
              <Link to="/register" className="btn btn-primary">Créer un compte & Créditer</Link>
            </div>
          </div>

          <div className="grid-3 mt-6">
            <div className="card card-light-blue text-center">
              <div className="icon-circle mx-auto">∞</div>
              <h4 className="mb-2">Validité Permanente</h4>
              <p className="text-secondary inline-style-345895de">Vos tickets achetés n'expirent jamais. Utilisez-les
                selon le rythme de vos campagnes de recrutement sans aucune pression.</p>
            </div>
            <div className="card card-light-blue text-center">
              <div className="icon-circle mx-auto"><IconUsers /></div>
              <h4 className="mb-2">Partage Multi-utilisateurs</h4>
              <p className="text-secondary inline-style-345895de">Un solde unique pour l'entreprise, accessible par
                l'ensemble de vos recruteurs. Gérez les accès depuis l'espace admin.</p>
            </div>
            <div className="card card-light-blue text-center">
              <div className="icon-circle mx-auto"><IconFile /></div>
              <h4 className="mb-2">Rapports & Export Comptable</h4>
              <p className="text-secondary inline-style-345895de">Suivi détaillé et facturation automatique pour
                l'administration de vos flux RH. Historique des vérifications exportable.</p>
            </div>
          </div>
        </section>

        {/* Section 6 : Architecture */}
        <section className="section-padding inline-style-8a2b5265">
          <div className="container grid-2 align-items-center">
            <div>
              <div className="inline-style-8feec6a6">TECH STACK & SÉCURITÉ</div>
              <h2 className="section-title">Une architecture certifiée au service des exigences publiques et privées
              </h2>
              <p className="text-secondary mb-6">BioCampus garantit un niveau de sécurité aligné sur les standards de
                conformité et l'interopérabilité des systèmes d'informations (ESU).</p>

              <div className="d-flex align-items-start gap-4 mb-4">
                <div className="icon-circle inline-style-a8d6d90c"><IconLock size={16} /></div>
                <div>
                  <h4 className="inline-style-267f6d50">Chiffrement AES-256 de bout en bout</h4>
                  <p className="text-secondary inline-style-345895de">Chaque donnée transitant sur la plateforme
                    est chiffrée à l'aide des clés de haute sécurité.</p>
                </div>
              </div>
              <div className="d-flex align-items-start gap-4 mb-4">
                <div className="icon-circle inline-style-a8d6d90c"><IconShield size={16} /></div>
                <div>
                  <h4 className="inline-style-267f6d50">Normes de confidentialité des données</h4>
                  <p className="text-secondary inline-style-345895de">Système conforme aux principes
                    internationaux de la protection des données. Confidentialité absolue du candidat.</p>
                </div>
              </div>
              <div className="d-flex align-items-start gap-4">
                <div className="icon-circle inline-style-a8d6d90c"><IconSliders size={16} /></div>
                <div>
                  <h4 className="inline-style-267f6d50">Infrastructure Serveurs 99.9% Uptime</h4>
                  <p className="text-secondary inline-style-345895de">Serveurs scalables et redondants pour une
                    disponibilité permanente et des requêtes instantanées.</p>
                </div>
              </div>
            </div>

            <div className="grid-2 gap-4">
              <div className="card inline-style-fde10b21">
                <div className="inline-style-00822cbe">SSL / TLS 2048</div>
                <p className="text-secondary inline-style-2522cdad">Protocole de sécurité standard pour une
                  connexion sécurisée.</p>
              </div>
              <div className="card inline-style-fde10b21">
                <div className="inline-style-00822cbe">API REST & Webhooks</div>
                <p className="text-secondary inline-style-2522cdad">Intégration facilitée avec vos SIRH (Workday,
                  SAP...).</p>
              </div>
              <div className="card inline-style-fde10b21">
                <div className="inline-style-00822cbe">Audit Logs & Traçabilité</div>
                <p className="text-secondary inline-style-2522cdad">Journal inaltérable des requêtes de
                  vérification.</p>
              </div>
              <div className="card inline-style-fde10b21">
                <div className="inline-style-00822cbe">Protection Anti-DDoS</div>
                <p className="text-secondary inline-style-2522cdad">Sécurisation des serveurs contre les attaques
                  par déni de service.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="container section-padding">
          <div className="cta-banner text-center inline-style-d10a0641">
            <div className="inline-style-cde4a524">VOS FUTURS RECRUTEMENTS SÉCURISÉS</div>
            <h2 className="inline-style-12a6065b">Prêt à sécuriser vos<br />recrutements académiques ?</h2>
            <p className="inline-style-74587a05">
              Rejoignez plus de 1 200 directions des ressources humaines, cabinets de recrutement et entreprises
              qui authentifient leurs talents en toute sérénité.
            </p>
            <div className="d-flex justify-content-center gap-4">
              <Link to="/register" className="btn btn-primary inline-style-beab5831">Créer un compte entreprise</Link>
              <Link to="/privacy" className="btn btn-secondary inline-style-454fce16">Contacter les ventes
                B2B</Link>
            </div>
            <div className="d-flex justify-content-center gap-6 mt-6 inline-style-3fd32023">
              <span>✓ Création de compte gratuite</span>
              <span>✓ Sans engagement de durée</span>
              <span>✓ Support client 24/7</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="inline-style-cc73412d">
        <div className="container">
          <div className="grid-3 mb-8">
            <div>
              <div className="logo mb-4">
                <Link to="/" className="inline-style-34f5c764">
                  <img className="brand-logo-full" src="assets/logo-biocampus.svg" alt="BRIO CAMPUS" />
                </Link>
              </div>
              <p className="inline-style-4709e0ec">
                Plateforme professionnelle pour la vérification académique et l'authentification des diplômes
                auprès des universités de la RDC.
              </p>
            </div>
            <div className="grid-2">
              <div className="footer-links">
                <h4 className="inline-style-ca8751ba">Plateforme</h4>
                <Link to="/verification">Vérifier un candidat</Link>
                <Link to="/tickets">Acheter des tickets</Link>
                <Link to="/privacy">API Entreprise</Link>
                <Link to="/universites">Espace Universitaire</Link>
              </div>
              <div className="footer-links">
                <h4 className="inline-style-ca8751ba">Légal & Support</h4>
                <Link to="/privacy">Mentions légales</Link>
                <Link to="/privacy">Politique de confidentialité</Link>
                <Link to="/privacy">Conditions générales</Link>
                <Link to="/privacy">Centre d'aide</Link>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center inline-style-09eee8ac">
            <div>© 2026 BrioCampus. Une solution Brio Consult. Tous droits réservés.</div>
            <div>Fait avec rigueur à Kinshasa, RDC</div>
          </div>
        </div>
      </footer>
    </>
  );
}
