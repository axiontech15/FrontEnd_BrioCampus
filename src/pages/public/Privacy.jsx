import { useState } from 'react';
import { Link } from '../../router';
import {
  IconBan, IconBox, IconEdit, IconFlag, IconList, IconPause, IconRefresh, IconSearch, IconTrash,
} from '../../components/icons';

export default function Privacy() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <>
      {/* HEADER */}
      <header className="inline-style-c70b66f1">
        <Link to="/" className="inline-style-0dc9c093">
          <div className="inline-style-af5efa97">
            <img className="brand-logo-full" src="assets/logo-biocampus.svg" alt="BRIO CAMPUS" />
          </div>
          <div>
            <div className="inline-style-11f1cc33">BioCampus</div>
            <div className="inline-style-1b6872d7">Espace Recruteur</div>
          </div>
        </Link>
        <nav className="header-nav" id="desktopNav">
          <Link to="/">Accueil</Link>
          <Link to="/login">Connexion</Link>
          <Link to="/register" className="btn btn-primary btn-sm">Créer un compte</Link>
        </nav>
        <button className={navOpen ? 'hamburger open' : 'hamburger'} id="hamburger" onClick={() => setNavOpen(!navOpen)}><span></span><span></span><span></span></button>
      </header>

      {/* Mobile Overlay */}
      <div className={navOpen ? 'mobile-nav-overlay open' : 'mobile-nav-overlay'} id="mobileNavOverlay" onClick={(e) => { if (!e.target.closest('.mobile-nav-panel')) setNavOpen(false); }}>
        <div className="mobile-nav-panel">
          <button className="mobile-nav-close" id="mobileNavClose" onClick={() => setNavOpen(false)}>✕</button>
          <Link to="/" onClick={() => setNavOpen(false)}>Accueil</Link>
          <Link to="/login" onClick={() => setNavOpen(false)}>Connexion</Link>
          <Link to="/register" onClick={() => setNavOpen(false)}>Créer un compte</Link>
        </div>
      </div>

      {/* HERO */}
      <div className="privacy-hero">
        <div className="inline-style-be5d09fa">
          <div className="inline-style-672761eb">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Légal & Conformité
          </div>
          <h1 className="inline-style-4ea998b7">Politique de confidentialité</h1>
          <p className="inline-style-9b302965">
            BioCampus s'engage à protéger les données personnelles de ses utilisateurs conformément au Règlement
            Général sur la Protection des Données (RGPD) et aux lois applicables en République Démocratique du
            Congo.
          </p>
          <div className="inline-style-5d12f256">
            <strong className="inline-style-ba76c5db">Dernière mise à jour :</strong> 25 septembre 2026 — Version 2.1
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="privacy-content">

        {/* Table des matières */}
        <div className="toc-box">
          <h4><IconList size={14} style={{ marginRight: 8, verticalAlign: '-2px' }} />Table des matières</h4>
          <ol>
            <li><a href="#responsable">Responsable du traitement</a></li>
            <li><a href="#donnees">Données collectées</a></li>
            <li><a href="#finalites">Finalités du traitement</a></li>
            <li><a href="#bases">Bases légales</a></li>
            <li><a href="#conservation">Durée de conservation</a></li>
            <li><a href="#droits">Vos droits</a></li>
            <li><a href="#securite">Sécurité des données</a></li>
            <li><a href="#tiers">Partage avec des tiers</a></li>
            <li><a href="#cookies">Cookies et traceurs</a></li>
            <li><a href="#contact">Contact DPO</a></li>
          </ol>
        </div>

        {/* Section 1 */}
        <h2 id="responsable">1. Responsable du traitement</h2>
        <p>
          BioCampus est une plateforme éditée par <strong>Brio Consult SARL</strong>, société à responsabilité limitée
          immatriculée en République Démocratique du Congo sous le numéro RCCM CD/KIN/RCCM/26-B-0001.
        </p>
        <p>
          <strong>Siège social :</strong> Avenue de la Victoire, Commune de Gombe, Kinshasa, RDC<br />
          <strong>Email :</strong> <a href="mailto:dpo@BioCampus.cd">dpo@BioCampus.cd</a><br />
          <strong>Téléphone :</strong> +243 81 000 0000
        </p>

        {/* Section 2 */}
        <h2 id="donnees">2. Données collectées</h2>
        <p>Dans le cadre de l'utilisation de la plateforme BioCampus, nous collectons les catégories de données
          suivantes :</p>

        <table className="data-table">
          <thead>
            <tr>
              <th>Catégorie</th>
              <th>Données concernées</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Données d'identification (recruteur)</td>
              <td>Nom, prénom, email professionnel, téléphone, entreprise, RCCM</td>
              <td>Saisie lors de l'inscription</td>
            </tr>
            <tr>
              <td>Données de candidats vérifiés</td>
              <td>Nom, prénom, matricule, établissement, diplôme, année d'obtention</td>
              <td>Saisie par le recruteur + registres universitaires</td>
            </tr>
            <tr>
              <td>Données de connexion</td>
              <td>Adresse IP, horodatage, navigateur, système d'exploitation</td>
              <td>Automatique lors de la connexion</td>
            </tr>
            <tr>
              <td>Données transactionnelles</td>
              <td>Historique d'achat de tickets, montants, dates</td>
              <td>Lors des achats en ligne</td>
            </tr>
            <tr>
              <td>Données de vérification</td>
              <td>Requêtes envoyées, réponses reçues, horodatage certifié RFC 3161</td>
              <td>Automatique lors des vérifications</td>
            </tr>
          </tbody>
        </table>

        {/* Section 3 */}
        <h2 id="finalites">3. Finalités du traitement</h2>
        <p>Les données collectées sont traitées pour les finalités suivantes :</p>
        <ul>
          <li><strong>Fourniture du service :</strong> permettre aux recruteurs d'interroger les registres académiques
            officiels.</li>
          <li><strong>Gestion des comptes :</strong> création, authentification, sécurisation des comptes
            utilisateurs.</li>
          <li><strong>Gestion commerciale :</strong> facturation, gestion des tickets et abonnements.</li>
          <li><strong>Sécurité et traçabilité :</strong> journalisation des actions pour prévenir les abus et garantir
            l'intégrité des vérifications.</li>
          <li><strong>Obligations légales :</strong> conformité avec les réglementations fiscales et les autorités
            compétentes.</li>
          <li><strong>Amélioration du service :</strong> analyse agrégée et anonymisée pour optimiser la plateforme.
          </li>
          <li><strong>Communication :</strong> envoi d'informations relatives au compte, aux mises à jour et aux
            alertes de sécurité.</li>
        </ul>

        {/* Section 4 */}
        <h2 id="bases">4. Bases légales du traitement</h2>
        <p>Chaque traitement repose sur l'une des bases légales suivantes conformément à l'article 6 du RGPD :</p>
        <ul>
          <li><strong>Exécution du contrat (art. 6.1.b) :</strong> pour la fourniture du service de vérification
            académique.</li>
          <li><strong>Obligation légale (art. 6.1.c) :</strong> pour la conservation des factures et obligations
            fiscales.</li>
          <li><strong>Intérêt légitime (art. 6.1.f) :</strong> pour la sécurité de la plateforme, la prévention des
            fraudes et les analyses de performance.</li>
          <li><strong>Consentement (art. 6.1.a) :</strong> pour les communications marketing optionnelles et les
            cookies non essentiels.</li>
        </ul>

        {/* Section 5 */}
        <h2 id="conservation">5. Durée de conservation</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Type de données</th>
              <th>Durée de conservation</th>
              <th>Justification</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Données de compte</td>
              <td>Durée de la relation contractuelle + 3 ans</td>
              <td>Prescription légale</td>
            </tr>
            <tr>
              <td>Rapports de vérification</td>
              <td>10 ans</td>
              <td>Valeur probatoire des documents académiques</td>
            </tr>
            <tr>
              <td>Données transactionnelles</td>
              <td>10 ans</td>
              <td>Obligations comptables et fiscales</td>
            </tr>
            <tr>
              <td>Logs de connexion</td>
              <td>12 mois</td>
              <td>Sécurité et détection des intrusions</td>
            </tr>
            <tr>
              <td>Cookies de préférence</td>
              <td>13 mois maximum</td>
              <td>Recommandation CNIL</td>
            </tr>
          </tbody>
        </table>

        {/* Section 6 */}
        <h2 id="droits">6. Vos droits</h2>
        <p>Conformément au RGPD et à la législation congolaise applicable, vous disposez des droits suivants sur vos
          données personnelles :</p>

        <div className="rights-grid">
          <div className="right-card">
            <h4><IconSearch size={14} style={{ marginRight: 8, verticalAlign: '-2px' }} />Droit d'accès</h4>
            <p>Vous pouvez demander une copie de toutes les données vous concernant que nous traitons.</p>
          </div>
          <div className="right-card">
            <h4><IconEdit size={14} style={{ marginRight: 8, verticalAlign: '-2px' }} />Droit de rectification</h4>
            <p>Vous pouvez demander la correction de toute donnée inexacte ou incomplète.</p>
          </div>
          <div className="right-card">
            <h4><IconTrash size={14} style={{ marginRight: 8, verticalAlign: '-2px' }} />Droit à l'effacement</h4>
            <p>Vous pouvez demander la suppression de vos données (sous réserve des obligations légales de
              conservation).</p>
          </div>
          <div className="right-card">
            <h4><IconPause size={14} style={{ marginRight: 8, verticalAlign: '-2px' }} />Droit à la limitation</h4>
            <p>Vous pouvez demander la limitation du traitement dans certaines circonstances.</p>
          </div>
          <div className="right-card">
            <h4><IconBox size={14} style={{ marginRight: 8, verticalAlign: '-2px' }} />Droit à la portabilité</h4>
            <p>Vous pouvez recevoir vos données dans un format structuré et lisible par machine.</p>
          </div>
          <div className="right-card">
            <h4><IconBan size={14} style={{ marginRight: 8, verticalAlign: '-2px' }} />Droit d'opposition</h4>
            <p>Vous pouvez vous opposer au traitement fondé sur l'intérêt légitime ou à des fins de prospection.</p>
          </div>
          <div className="right-card">
            <h4><IconRefresh size={14} style={{ marginRight: 8, verticalAlign: '-2px' }} />Droit de retrait du consentement</h4>
            <p>Vous pouvez retirer votre consentement à tout moment pour les traitements qui en sont fondés.</p>
          </div>
          <div className="right-card">
            <h4><IconFlag size={14} style={{ marginRight: 8, verticalAlign: '-2px' }} />Droit de réclamation</h4>
            <p>Vous pouvez introduire une réclamation auprès de l'autorité de protection des données compétente.</p>
          </div>
        </div>

        <p>Pour exercer ces droits, contactez notre Délégué à la Protection des Données (DPO) à l'adresse <a
          href="mailto:dpo@BioCampus.cd">dpo@BioCampus.cd</a>. Nous nous engageons à répondre dans un délai d'un
          mois.</p>

        {/* Section 7 */}
        <h2 id="securite">7. Sécurité des données</h2>
        <p>BioCampus met en œuvre des mesures techniques et organisationnelles appropriées pour garantir la sécurité de
          vos données :</p>
        <ul>
          <li><strong>Chiffrement AES-256</strong> de toutes les données en transit et au repos.</li>
          <li><strong>Protocole TLS 1.3</strong> pour toutes les communications réseau.</li>
          <li><strong>Authentification multi-facteurs (MFA)</strong> disponible pour les comptes recruteurs.</li>
          <li><strong>Horodatage certifié RFC 3161</strong> pour garantir l'intégrité des rapports de vérification.
          </li>
          <li><strong>Journalisation inaltérable</strong> (Audit Logs) de toutes les actions sur la plateforme.</li>
          <li><strong>Tests de pénétration</strong> et audits de sécurité réguliers par des tiers indépendants.</li>
          <li><strong>Ségrégation des environnements</strong> (production, test, développement) strictement isolés.
          </li>
          <li><strong>Plan de continuité d'activité (PCA)</strong> avec sauvegardes chiffrées quotidiennes.</li>
        </ul>
        <p>En cas de violation de données susceptible d'engendrer un risque pour vos droits et libertés, BioCampus
          s'engage à vous en notifier dans les 72 heures conformément à l'article 33 du RGPD.</p>

        {/* Section 8 */}
        <h2 id="tiers">8. Partage avec des tiers</h2>
        <p>BioCampus ne vend jamais vos données personnelles. Nous pouvons partager vos données uniquement dans les cas
          suivants :</p>
        <ul>
          <li><strong>Universités partenaires :</strong> pour effectuer les vérifications demandées (données du
            candidat uniquement, selon protocole sécurisé).</li>
          <li><strong>Prestataires de paiement :</strong> pour le traitement des transactions (les données bancaires
            ne transitent pas par nos serveurs).</li>
          <li><strong>Hébergeurs certifiés :</strong> infrastructure cloud conforme ISO 27001, avec données stockées
            en Union Africaine / Union Européenne.</li>
          <li><strong>Autorités compétentes :</strong> uniquement sur réquisition judiciaire légalement valide.</li>
        </ul>
        <p>Tout sous-traitant est lié par un contrat de traitement des données conforme au RGPD (DPA) avant tout accès
          aux données.</p>

        {/* Section 9 */}
        <h2 id="cookies">9. Cookies et traceurs</h2>
        <p>BioCampus utilise des cookies pour assurer le bon fonctionnement de la plateforme. Vous pouvez gérer vos
          préférences via notre bandeau de cookies lors de votre première visite.</p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Type de cookie</th>
              <th>Finalité</th>
              <th>Durée</th>
              <th>Consentement requis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Essentiels (session)</td>
              <td>Maintien de la session, sécurité CSRF</td>
              <td>Session</td>
              <td>Non (nécessaires)</td>
            </tr>
            <tr>
              <td>Préférences</td>
              <td>Mémorisation des réglages utilisateur</td>
              <td>13 mois</td>
              <td>Oui</td>
            </tr>
            <tr>
              <td>Analytiques</td>
              <td>Mesure d'audience (données anonymisées)</td>
              <td>13 mois</td>
              <td>Oui</td>
            </tr>
          </tbody>
        </table>

        {/* Section 10 */}
        <h2 id="contact">10. Contact — Délégué à la Protection des Données (DPO)</h2>
        <div className="card inline-style-87c3e47e">
          <div className="d-flex align-items-start gap-4">
            <div className="inline-style-01f076a1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <div className="inline-style-e5a9f5cb">Délégué à la Protection des Données</div>
              <div className="inline-style-46e13544">
                <strong>Email :</strong> <a href="mailto:dpo@BioCampus.cd">dpo@BioCampus.cd</a><br />
                <strong>Adresse postale :</strong> Brio Consult SARL — DPO, Avenue de la Victoire, Commune de
                Gombe, Kinshasa, RDC<br />
                <strong>Délai de réponse :</strong> 30 jours ouvrés maximum
              </div>
            </div>
          </div>
        </div>

        <div className="alert alert-info mt-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="inline-style-5b214b83">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>Cette politique de confidentialité peut être mise à jour pour refléter les évolutions légales ou de
            nos services. La date de dernière mise à jour est toujours indiquée en haut de ce document. Toute
            modification substantielle vous sera notifiée par email.</span>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="inline-style-876f00a3">
        <div className="inline-style-3c714a2d">
          <div className="d-flex justify-content-between align-items-center inline-style-6ce7da3a">
            <div className="inline-style-25a74abc">© 2026 BioCampus — Une solution Brio Consult. Tous droits réservés.
            </div>
            <div className="d-flex gap-6 inline-style-9bd93d36">
              <Link to="/" className="inline-style-dd519fa2">Accueil</Link>
              <Link to="/privacy" className="inline-style-dd519fa2">Confidentialité</Link>
              <Link to="/login" className="inline-style-dd519fa2">Connexion</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
