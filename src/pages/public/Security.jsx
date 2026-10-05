import { useState } from 'react';
import { Link } from '../../router';

const MEASURES = [
  ['🔒', 'Chiffrement AES-256', 'Toutes les données en transit et au repos sont chiffrées. Clés gérées via HSM souverain, rotation régulière.'],
  ['🌐', 'TLS 1.3 / SSL 2048 bits', 'Protocole standard pour chaque connexion. Aucune donnée ne transite en clair entre vous, BioCampus et les universités.'],
  ['👤', 'Authentification MFA', 'Multi-facteurs disponible pour les comptes recruteurs et obligatoire pour les rôles sensibles / super-admin.'],
  ['⏱️', 'Horodatage RFC 3161', 'Chaque rapport de vérification est horodaté par une autorité certifiée : preuve d’intégrité opposable.'],
  ['📜', 'Audit Logs inaltérables', 'Journal append-only de chaque requête, réponse et action. Consultable depuis Espace Audit & Traçabilité.'],
  ['🛡️', 'Tests d’intrusion réguliers', 'Pentests et audits par tiers indépendants, ségrégation stricte prod / test / dev, revue de code continue.'],
  ['💾', 'PCA & Sauvegardes chiffrées', 'Plan de continuité d’activité, sauvegardes quotidiennes chiffrées, restauration testée, uptime 99.9%.'],
  ['🚫', 'Anti-DDoS & WAF', 'Protection périmétrique, filtrage applicatif, limitation de débit et supervision SOC 24/7.'],
];

const ARCHI = [
  ['SSL / TLS 2048', 'Connexion sécurisée de bout en bout.'],
  ['API REST & Webhooks', 'Intégration SIRH facilitée (Workday, SAP…).'],
  ['Audit Logs & Traçabilité', 'Empreinte cryptographique par vérification.'],
  ['Protection Anti-DDoS', 'Disponibilité permanente des requêtes.'],
];

export default function Security() {
  const [navOpen, setNavOpen] = useState(false);

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
          <Link to="/pourquoi">Pourquoi BioCampus</Link>
          <Link to="/securite">Sécurité</Link>
          <Link to="/universites">Universités</Link>
          <Link to="/privacy">Légal</Link>
        </nav>
        <div className="d-flex align-items-center gap-4 header-actions-desktop">
          <Link to="/login" className="inline-style-10d016c9">Connexion</Link>
          <Link to="/register" className="btn btn-primary inline-style-aef0d252">Créer un compte →</Link>
        </div>
        <button className={`hamburger${navOpen ? ' open' : ''}`} onClick={() => setNavOpen(v => !v)} aria-label="Menu"><span></span><span></span><span></span></button>
      </header>

      <div className={`mobile-nav-overlay${navOpen ? ' open' : ''}`} onClick={(e) => { if (!e.target.closest('.mobile-nav-panel')) setNavOpen(false); }}>
        <div className="mobile-nav-panel">
          <button className="mobile-nav-close" onClick={() => setNavOpen(false)}>✕</button>
          <div className="inline-style-e079e06f"><div className="inline-style-5a10b7c8">BioCampus</div></div>
          <Link to="/" onClick={() => setNavOpen(false)}>Accueil</Link>
          <Link to="/pourquoi" onClick={() => setNavOpen(false)}>Pourquoi BioCampus</Link>
          <Link to="/securite" onClick={() => setNavOpen(false)}>Sécurité</Link>
          <Link to="/privacy" onClick={() => setNavOpen(false)}>Légal</Link>
          <hr className="inline-style-d2a02b96" />
          <Link to="/login" onClick={() => setNavOpen(false)}>Se connecter</Link>
          <Link to="/register" className="inline-style-e437daab" onClick={() => setNavOpen(false)}>Créer un compte</Link>
        </div>
      </div>

      <main>
        {/* HERO */}
        <div className="privacy-hero">
          <div className="container">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.12)', padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
              🛡️ Tech Stack &amp; Sécurité
            </div>
            <h1 style={{ color: '#fff', fontSize: 40, margin: '16px 0 12px' }}>Une architecture certifiée au service des exigences publiques et privées</h1>
            <p style={{ color: 'rgba(255,255,255,.75)', fontSize: 16, maxWidth: 720, lineHeight: 1.7 }}>
              BioCampus garantit un niveau de sécurité aligné sur les standards de conformité et
              l&apos;interopérabilité des systèmes d&apos;information (ESU). Source établissement directe,
              traçabilité immuable, confidentialité absolue du candidat.
            </p>
            <div className="d-flex gap-4 mt-6" style={{ flexWrap: 'wrap' }}>
              <Link to="/audit-logs" className="btn btn-primary">Voir l&apos;audit &amp; traçabilité</Link>
              <Link to="/privacy" className="btn btn-secondary">Politique de confidentialité</Link>
            </div>
            <div className="d-flex gap-4 mt-6" style={{ flexWrap: 'wrap' }}>
              <span className="badge badge-verified">✓ AES-256 bout en bout</span>
              <span className="badge badge-verified">✓ TLS 1.3</span>
              <span className="badge badge-verified">✓ 99.9% Uptime</span>
              <span className="badge badge-verified">✓ ISO 27001</span>
            </div>
          </div>
        </div>

        {/* 3 PILIERS */}
        <section className="section-padding" style={{ background: 'var(--bc-surface)' }}>
          <div className="container">
            <div className="section-label">Garantie de confiance majeure</div>
            <h2 className="section-title">Les standards de rigueur institutionnelle</h2>
            <p className="section-subtitle" style={{ maxWidth: 640 }}>La plateforme obéit aux plus hauts standards de confidentialité, d&apos;audits et aux directives de l&apos;ESU en matière de documentation numérique.</p>
            <div className="grid-3">
              <div className="card">
                <div className="icon-circle">🏛️</div>
                <h3 className="mb-2" style={{ fontSize: 18 }}>Source Établissement</h3>
                <p className="text-secondary" style={{ fontSize: 14 }}>Les informations proviennent directement des universités. Aucune base intermédiaire : chaque réponse est signée par le registre officiel.</p>
              </div>
              <div className="card">
                <div className="icon-circle">🔗</div>
                <h3 className="mb-2" style={{ fontSize: 18 }}>Traçabilité immuable</h3>
                <p className="text-secondary" style={{ fontSize: 14 }}>Chaque vérification laisse une empreinte cryptographique (hash SHA-256 + horodatage RFC 3161) garantissant l&apos;intégrité de la réponse.</p>
              </div>
              <div className="card">
                <div className="icon-circle">📄</div>
                <h3 className="mb-2" style={{ fontSize: 18 }}>Conformité RGPD &amp; Sécurité</h3>
                <p className="text-secondary" style={{ fontSize: 14 }}>Architecture selon les standards internationaux. Finalités limitées, minimisation des données, DPO joignable à dpo@BioCampus.cd.</p>
              </div>
            </div>
          </div>
        </section>

        {/* MESURES DÉTAILLÉES */}
        <section className="section-padding container">
          <div className="text-center mb-8">
            <div className="section-label">Défense en profondeur</div>
            <h2 className="section-title">8 mesures techniques et organisationnelles</h2>
            <p className="section-subtitle" style={{ maxWidth: 640, margin: '0 auto' }}>Le même socle que celui décrit dans notre politique de confidentialité — appliqué à chaque requête.</p>
          </div>
          <div className="grid-4">
            {MEASURES.map(([icon, title, desc]) => (
              <div className="card" key={title}>
                <div className="icon-circle">{icon}</div>
                <h4 style={{ fontSize: 14, marginBottom: 8 }}>{title}</h4>
                <p className="text-secondary" style={{ fontSize: 12, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FLUX SÉCURISÉ */}
        <section className="section-padding" style={{ background: 'var(--bc-surface)' }}>
          <div className="container grid-2 align-items-center">
            <div>
              <div className="section-label">Circuit d&apos;une vérification</div>
              <h2 className="section-title">De votre recherche au rapport opposable</h2>
              <div className="step-container" style={{ flexDirection: 'column', marginTop: 24 }}>
                {[
                  ['1', 'Saisie recruteur chiffrée', 'Nom, matricule, établissement — transmis en TLS 1.3, jamais stocké en clair.'],
                  ['2', 'Requête signée vers l’université', 'Protocole sécurisé université-partenaire, authentification mutuelle.'],
                  ['3', 'Réponse registre + hash', 'Le registre retourne le statut + empreinte SHA-256 de la réponse.'],
                  ['4', 'Horodatage & archivage', 'Scellé RFC 3161, journal inaltérable, PDF téléchargeable 10 ans.'],
                ].map(([n, t, d]) => (
                  <div className="step-item" key={n} style={{ display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'flex-start', textAlign: 'left' }}>
                    <div className="step-number" style={{ flexShrink: 0 }}>{n}</div>
                    <div><h4 style={{ fontSize: 14 }}>{t}</h4><p className="text-secondary" style={{ fontSize: 12 }}>{d}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="grid-2 gap-4">
                {ARCHI.map(([t, d]) => (
                  <div className="card text-center" key={t}>
                    <div style={{ fontWeight: 800, color: 'var(--bc-blue)', fontSize: 14, marginBottom: 8 }}>{t}</div>
                    <p className="text-secondary" style={{ fontSize: 12 }}>{d}</p>
                  </div>
                ))}
              </div>
              <div className="alert alert-info mt-6">
                <span>En cas de violation susceptible d&apos;engendrer un risque, BioCampus notifie les personnes concernées sous 72h (art. 33 RGPD) et consigne l&apos;incident dans les Audit Logs.</span>
              </div>
              <div className="card mt-4">
                <h4 style={{ fontSize: 14, marginBottom: 8 }}>🔁 Conservation probatoire</h4>
                <table className="data-table" style={{ marginBottom: 0 }}>
                  <thead><tr><th>Données</th><th>Durée</th></tr></thead>
                  <tbody>
                    <tr><td>Rapports de vérification</td><td>10 ans (valeur probatoire)</td></tr>
                    <tr><td>Transactions / factures</td><td>10 ans (obligations fiscales)</td></tr>
                    <tr><td>Logs de connexion</td><td>12 mois (sécurité)</td></tr>
                    <tr><td>Compte recruteur</td><td>Relation contractuelle + 3 ans</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* PARTAGE & DPO */}
        <section className="section-padding container">
          <div className="grid-2">
            <div className="card">
              <h3 className="mb-4" style={{ fontSize: 18 }}>🤝 Partage strictement encadré</h3>
              <ul style={{ paddingLeft: 20, color: 'var(--bc-slate)', fontSize: 14, lineHeight: 1.9 }}>
                <li><strong>Universités partenaires :</strong> données candidat uniquement, protocole sécurisé.</li>
                <li><strong>Paiement :</strong> données bancaires ne transitent jamais par nos serveurs.</li>
                <li><strong>Hébergeurs certifiés ISO 27001</strong>, données en Afrique / UE.</li>
                <li><strong>Autorités :</strong> uniquement sur réquisition judiciaire valide.</li>
              </ul>
              <p className="text-secondary mt-4" style={{ fontSize: 12 }}>Jamais de revente. Tout sous-traitant signe un DPA conforme RGPD.</p>
            </div>
            <div className="card" style={{ background: 'var(--bc-ink)', color: '#fff', border: 'none' }}>
              <h3 className="mb-2" style={{ color: '#fff', fontSize: 18 }}>📬 Contacter le DPO</h3>
              <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 14, marginBottom: 16 }}>Brio Consult SARL — Avenue de la Victoire, Gombe, Kinshasa<br />Réponse sous 30 jours ouvrés maximum.</p>
              <div className="d-flex gap-4" style={{ flexWrap: 'wrap' }}>
                <a href="mailto:dpo@BioCampus.cd" className="btn btn-primary btn-sm">dpo@BioCampus.cd</a>
                <Link to="/privacy" className="btn btn-secondary btn-sm">Lire la politique complète</Link>
              </div>
              <div className="mt-6 d-flex gap-4" style={{ flexWrap: 'wrap' }}>
                <span className="badge badge-verified">✓ MFA disponible</span>
                <span className="badge badge-verified">✓ CSRF &amp; XSS durcis</span>
                <span className="badge badge-verified">✓ PCA testé</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container section-padding">
          <div className="cta-banner text-center" style={{ padding: 48 }}>
            <div style={{ color: 'var(--bc-gold)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Conformité &amp; sérénité</div>
            <h2 style={{ color: '#fff', fontSize: 32, margin: '12px 0' }}>Vérifiez vite.<br />Prouvez toujours.</h2>
            <p style={{ color: 'rgba(255,255,255,.7)', maxWidth: 560, margin: '0 auto 24px' }}>Chaque rapport BioCampus est une preuve : source officielle, hash inviolable, horodatage certifié.</p>
            <div className="d-flex justify-content-center gap-4" style={{ flexWrap: 'wrap' }}>
              <Link to="/register" className="btn btn-primary">Créer un compte entreprise</Link>
              <Link to="/pourquoi" className="btn btn-secondary">Pourquoi BioCampus ?</Link>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ background: '#fff', borderTop: '1px solid var(--bc-border)', padding: '32px 0' }}>
        <div className="container d-flex justify-content-between align-items-center" style={{ flexWrap: 'wrap', gap: 12 }}>
          <div className="text-secondary" style={{ fontSize: 12 }}>© 2026 BioCampus — Une solution Brio Consult. Tous droits réservés.</div>
          <div className="d-flex gap-6" style={{ fontSize: 12 }}>
            <Link to="/">Accueil</Link><Link to="/pourquoi">Pourquoi BioCampus</Link><Link to="/privacy">Confidentialité</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
