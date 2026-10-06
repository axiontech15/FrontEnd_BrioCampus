import { Link } from '../../router';
import PublicHeader from './PublicHeader';
import { UNIVERSITIES, TICKET_PACKS } from '../../data/mock';
import {
  IconBolt, IconClipboard, IconFile, IconLink, IconSearch, IconShield, IconUsers,
} from '../../components/icons';

const FEATURES = [
  {
    icon: <IconSearch />, title: 'Recherche instantanée', desc:
      'Retrouvez un candidat par nom, université ou matricule dans les registres officiels. La recherche est gratuite et ne consomme aucun ticket.',
  },
  {
    icon: <IconShield />, title: 'Vérification certifiée', desc:
      'Interrogation directe du registre de l’établissement, réponse en quelques minutes pour un profil référencé. Le ticket n’est débité qu’à la confirmation.',
  },
  {
    icon: <IconFile />, title: 'Rapport PDF opposable', desc:
      'Attestation d’authenticité avec empreinte SHA-256 et horodatage RFC 3161. Téléchargeable, exportable, conservée 10 ans pour vos audits.',
  },
  {
    icon: <IconBolt />, title: 'Tickets flexibles', desc:
      '1 ticket = 1 vérification certifiée. Validité permanente, sans abonnement caché. Trois packs selon vos volumes de recrutement.',
  },
  {
    icon: <IconUsers />, title: 'Espace multi-utilisateurs', desc:
      'Un solde unique partagé par tous vos recruteurs, avec suivi des consommations et historique exportable pour la comptabilité.',
  },
  {
    icon: <IconLink />, title: 'API & traçabilité', desc:
      'API REST & webhooks pour vos SIRH (Workday, SAP…), journal d’audit inaltérable de chaque requête et infrastructure à 99.9% de disponibilité.',
  },
];

const STEPS = [
  ['1', 'Création du compte', 'Enregistrement rapide de votre entreprise avec validation KYC.'],
  ['2', 'Solde tickets', 'Approvisionnez votre compte selon vos besoins de recrutement.'],
  ['3', 'Choix Établissement', 'Sélectionnez l’université et renseignez les infos du candidat.'],
  ['4', 'Vérification Flash', 'Requête sécurisée traitée en temps réel.'],
  ['5', 'Rapport Final', 'Téléchargement immédiat du certificat officiel PDF.'],
];

export default function Features() {
  return (
    <>
      <PublicHeader />

      <main>
        {/* HERO */}
        <div className="privacy-hero">
          <div className="container">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.12)', padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
              <IconBolt size={13} /> Fonctionnalités
            </div>
            <h1 style={{ color: '#fff', fontSize: 40, margin: '16px 0 12px' }}>Tout ce qu&apos;il faut pour certifier un diplôme</h1>
            <p style={{ color: 'rgba(255,255,255,.75)', fontSize: 16, maxWidth: 720, lineHeight: 1.7 }}>
              De la recherche gratuite au rapport opposable : BioCampus outille chaque étape du contrôle
              académique, pour les recruteurs comme pour les directions conformité.
            </p>
            <div className="d-flex gap-4 mt-6" style={{ flexWrap: 'wrap' }}>
              <Link to="/login" className="btn btn-primary">Se connecter</Link>
              <Link to="/verification" className="btn btn-secondary">Lancer une vérification</Link>
            </div>
            <div className="hero-stats" style={{ borderTop: '1px solid rgba(255,255,255,.15)', marginTop: 32 }}>
              <div className="stat-item"><h4 style={{ color: '#fff' }}>140+</h4><p style={{ color: 'rgba(255,255,255,.6)' }}>Établissements interconnectés</p></div>
              <div className="stat-item"><h4 style={{ color: '#fff' }}>2.4M</h4><p style={{ color: 'rgba(255,255,255,.6)' }}>Dossiers vérifiables</p></div>
              <div className="stat-item"><h4 style={{ color: '#fff' }}>~5 min</h4><p style={{ color: 'rgba(255,255,255,.6)' }}>Vérification médiane</p></div>
              <div className="stat-item"><h4 style={{ color: 'var(--bc-gold)' }}>10 ans</h4><p style={{ color: 'rgba(255,255,255,.6)' }}>Conservation probatoire</p></div>
            </div>
          </div>
        </div>

        {/* FONCTIONNALITÉS CŒUR */}
        <section className="section-padding" style={{ background: 'var(--bc-surface)' }}>
          <div className="container">
            <div className="section-label">Plateforme</div>
            <h2 className="section-title">Six fonctionnalités, zéro friction</h2>
            <p className="section-subtitle" style={{ maxWidth: 640 }}>Chaque module répond à un besoin concret des équipes RH, cabinet de recrutement et conformité.</p>
            <div className="grid-3">
              {FEATURES.map((f) => (
                <div className="card" key={f.title}>
                  <div className="icon-circle">{f.icon}</div>
                  <h3 className="mb-2" style={{ fontSize: 17 }}>{f.title}</h3>
                  <p className="text-secondary" style={{ fontSize: 13, lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5 ÉTAPES */}
        <section className="section-padding container">
          <div className="text-center mb-8">
            <div className="section-label">Parcours employeur simplifié</div>
            <h2 className="section-title">Certifier un candidat en 5 étapes</h2>
          </div>
          <div className="step-container">
            {STEPS.map(([n, t, d]) => (
              <div className="step-item" key={n}>
                <div className="step-number">{n}</div>
                <h4 style={{ fontSize: 14, marginBottom: 4 }}>{t}</h4>
                <p className="text-secondary" style={{ fontSize: 11 }}>{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PACKS */}
        <section className="section-padding" style={{ background: 'var(--bc-surface)' }}>
          <div className="container">
            <div className="d-flex justify-content-between align-items-end mb-8" style={{ flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div className="section-label">Tarification transparente</div>
                <h2 className="section-title">1 Ticket = 1 Vérification certifiée</h2>
              </div>
              <Link to="/tickets" className="btn btn-secondary btn-sm">Acheter des tickets →</Link>
            </div>
            <div className="grid-3">
              {TICKET_PACKS.map((p) => (
                <div className="card card-light-blue text-center" key={p.id}>
                  {p.popular && <span className="badge badge-pending mb-4">Le plus choisi</span>}
                  <h4 className="mb-2">{p.name}</h4>
                  <div className="stat-number mb-2">{p.price} <small style={{ fontSize: 13 }}>/ {p.count} tickets</small></div>
                  <p className="text-secondary" style={{ fontSize: 12 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REGISTRE */}
        <section className="section-padding container">
          <div className="d-flex justify-content-between align-items-end mb-8" style={{ flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="section-label">Registre national</div>
              <h2 className="section-title">Des sources officielles, pas des copies</h2>
              <p className="section-subtitle" style={{ maxWidth: 560 }}>Chaque vérification interroge le registre de l’établissement — aucune base intermédiaire.</p>
            </div>
            <Link to="/login" className="btn btn-secondary btn-sm">Accéder à la plateforme →</Link>
          </div>
          <div className="table-container">
            <table className="table">
              <thead><tr><th>Établissement</th><th>Ville</th><th>Code</th><th>Étudiants</th><th>Statut</th></tr></thead>
              <tbody>
                {UNIVERSITIES.slice(0, 5).map((u) => (
                  <tr key={u.id}>
                    <td><strong>{u.name}</strong></td>
                    <td>{u.city}</td>
                    <td className="text-mono">{u.code}</td>
                    <td>{u.students.toLocaleString('fr-FR')}</td>
                    <td><span className={`badge ${u.status === 'Active' ? 'badge-verified' : 'badge-pending'}`}>{u.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="alert alert-info mt-6">
            <IconClipboard size={15} style={{ flexShrink: 0, marginTop: 2 }} />
            <span>Chaque réponse est scellée : empreinte SHA-256, horodatage RFC 3161 et journal d’audit inaltérable consultable à tout moment.</span>
          </div>
        </section>

        {/* CTA */}
        <section className="container section-padding">
          <div className="cta-banner text-center" style={{ padding: 48 }}>
            <div style={{ color: 'var(--bc-gold)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Sans engagement</div>
            <h2 style={{ color: '#fff', fontSize: 32, margin: '12px 0' }}>Essayez la vérification<br />en quelques minutes</h2>
            <p style={{ color: 'rgba(255,255,255,.7)', maxWidth: 560, margin: '0 auto 24px' }}>Créez votre compte, créditez vos premiers tickets et lancez votre premier contrôle académique.</p>
            <div className="d-flex justify-content-center gap-4" style={{ flexWrap: 'wrap' }}>
              <Link to="/login" className="btn btn-primary">Se connecter</Link>
              <Link to="/pourquoi" className="btn btn-secondary">Pourquoi BioCampus ?</Link>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ background: '#fff', borderTop: '1px solid var(--bc-border)', padding: '32px 0' }}>
        <div className="container d-flex justify-content-between align-items-center" style={{ flexWrap: 'wrap', gap: 12 }}>
          <div className="text-secondary" style={{ fontSize: 12 }}>© 2026 BioCampus — Une solution Brio Consult. Tous droits réservés.</div>
          <div className="d-flex gap-6" style={{ fontSize: 12 }}>
            <Link to="/">Accueil</Link><Link to="/securite">Sécurité</Link><Link to="/privacy">Confidentialité</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
