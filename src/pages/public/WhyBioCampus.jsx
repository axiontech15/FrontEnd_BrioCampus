import { Link } from '../../router';
import PublicHeader from './PublicHeader';
import { IconAlert, IconBolt } from '../../components/icons';
import { UNIVERSITIES, TICKET_PACKS } from '../../data/mock';

export default function WhyBioCampus() {
  return (
    <>
      <PublicHeader />

      <main>
        {/* HERO */}
        <div className="privacy-hero">
          <div className="container">
            <div className="inline-style-672761eb" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.12)', padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
              <span className="badge-dot"></span> Enjeux &amp; Bénéfices
            </div>
            <h1 style={{ color: '#fff', fontSize: 40, margin: '16px 0 12px' }}>Pourquoi 82% des DRH auditent désormais leurs recrutements clés ?</h1>
            <p style={{ color: 'rgba(255,255,255,.75)', fontSize: 16, maxWidth: 720, lineHeight: 1.7 }}>
              La prolifération de fausses déclarations et de faux diplômes constitue un risque majeur pour les
              entreprises. BioCampus connecte vos équipes RH aux registres officiels des universités congolaises
              pour décider en toute confiance.
            </p>
            <div className="d-flex gap-4 mt-6" style={{ flexWrap: 'wrap' }}>
              <Link to="/login" className="btn btn-primary">Se connecter</Link>
              <Link to="/verification" className="btn btn-secondary">Voir une vérification</Link>
            </div>
            <div className="hero-stats" style={{ borderTop: '1px solid rgba(255,255,255,.15)', marginTop: 32 }}>
              <div className="stat-item">
                <h4 style={{ color: '#fff' }}>140+</h4>
                <p style={{ color: 'rgba(255,255,255,.6)' }}>Établissements interconnectés</p>
              </div>
              <div className="stat-item">
                <h4 style={{ color: '#fff' }}>2.4M</h4>
                <p style={{ color: 'rgba(255,255,255,.6)' }}>Dossiers vérifiables</p>
              </div>
              <div className="stat-item">
                <h4 style={{ color: '#fff' }}>1 200+</h4>
                <p style={{ color: 'rgba(255,255,255,.6)' }}>DRH &amp; cabinets déjà équipés</p>
              </div>
              <div className="stat-item">
                <h4 style={{ color: 'var(--bc-gold)' }}>0%</h4>
                <p style={{ color: 'rgba(255,255,255,.6)' }}>Risque d&apos;erreur / Faux profils</p>
              </div>
            </div>
          </div>
        </div>

        {/* LE PROBLÈME */}
        <section className="section-padding" style={{ background: 'var(--bc-surface)' }}>
          <div className="container grid-2 align-items-center">
            <div>
              <div className="section-label">Le constat</div>
              <h2 className="section-title">Un CV sur cinq contient une anomalie académique</h2>
              <p className="section-subtitle">
                Diplômes non obtenus, années d&apos;obtention modifiées, établissements inexistants :
                la vérification manuelle prend des semaines et expose votre marque employeur.
              </p>
              <div className="card card-light-blue mb-4">
                <h4 className="mb-2"><IconAlert size={15} style={{ marginRight: 8, verticalAlign: '-2px' }} />Sans BioCampus</h4>
                <ul style={{ paddingLeft: 20, color: 'var(--bc-slate)', fontSize: 14, lineHeight: 1.8 }}>
                  <li>2 à 6 semaines d&apos;échanges courrier / téléphone avec les scolarités</li>
                  <li>Aucune preuve opposable en cas d&apos;audit (Banque, Santé, ONG)</li>
                  <li>Risque réputationnel et financier en cas de recrutement frauduleux</li>
                </ul>
              </div>
              <div className="card" style={{ borderColor: 'var(--bc-verified)' }}>
                <h4 className="mb-2" style={{ color: 'var(--bc-verified-text)' }}>✓ Avec BioCampus</h4>
                <ul style={{ paddingLeft: 20, color: 'var(--bc-slate)', fontSize: 14, lineHeight: 1.8 }}>
                  <li>Réponse certifiée <strong>en quelques minutes</strong> pour un profil référencé</li>
                  <li>Rapport PDF officiel + empreinte cryptographique + horodatage</li>
                  <li>Traçabilité immuable exigée par l&apos;ESU et vos auditeurs</li>
                </ul>
              </div>
            </div>
            <div>
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
                  <div className="inline-style-c2d9d944">Candidat certifié — Réf. BC-2026-0483</div>
                  <h3 className="inline-style-337124d3">Mwamba Kalala</h3>
                  <div className="grid-2 gap-4 mb-4">
                    <div>
                      <div className="inline-style-04900fef">Diplôme obtenu</div>
                      <div className="inline-style-b2c1b7ca">Licence Droit</div>
                    </div>
                    <div>
                      <div className="inline-style-04900fef">Statut Académique</div>
                      <div className="inline-style-320b5347">Régulier (Promotion 2024)</div>
                    </div>
                  </div>
                  <table className="data-table">
                    <thead><tr><th>Critère</th><th>Manuel</th><th>BioCampus</th></tr></thead>
                    <tbody>
                      <tr><td>Délai moyen</td><td>3 semaines</td><td>~ 4 minutes</td></tr>
                      <tr><td>Preuve auditable</td><td>Non</td><td>PDF + hash + horodatage RFC 3161</td></tr>
                      <tr><td>Source</td><td>Déclarative</td><td>Registre officiel de l&apos;établissement</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="inline-style-5efee4e5">
                  <div className="inline-style-cebe43d4">✓</div>
                  <div className="inline-style-345895de">DIPLÔME AUTHENTIQUE <br /><span className="inline-style-7be4de97">Garantie académique BioCampus certifiée</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 BÉNÉFICES */}
        <section className="section-padding container">
          <div className="text-center mb-8">
            <div className="section-label">Enjeux &amp; Bénéfices</div>
            <h2 className="section-title">Trois raisons de certifier chaque recrutement clé</h2>
            <p className="section-subtitle" style={{ maxWidth: 640, margin: '0 auto' }}>
              Pensé pour les DRH, cabinets de recrutement et directions conformité opérant en RDC.
            </p>
          </div>
          <div className="grid-3">
            <div className="card card-light-blue">
              <div className="icon-circle" style={{ background: '#fff' }}>!</div>
              <h3 className="mb-2" style={{ fontSize: 16 }}>0 Risque Réputationnel</h3>
              <p className="text-secondary" style={{ fontSize: 13 }}>Évitez les scandales liés aux profils frauduleux. Protégez la marque employeur et la crédibilité de votre structure en prouvant l&apos;authenticité de chaque profil.</p>
            </div>
            <div className="card card-light-blue">
              <div className="icon-circle" style={{ background: '#fff' }}><IconBolt /></div>
              <h3 className="mb-2" style={{ fontSize: 16 }}>Gain de temps massif</h3>
              <p className="text-secondary" style={{ fontSize: 13 }}>Passez de plusieurs semaines à quelques minutes pour un profil référencé. Accélérez votre Time-to-Hire et sécurisez vos viviers de talents.</p>
            </div>
            <div className="card card-light-blue">
              <div className="icon-circle" style={{ background: '#fff' }}>✓</div>
              <h3 className="mb-2" style={{ fontSize: 16 }}>Conformité et Audits RH</h3>
              <p className="text-secondary" style={{ fontSize: 13 }}>Répondez aux exigences de vos clients, auditeurs et régulateurs sectoriels (Banque, Santé, Éducation) avec un rapport officiel exportable.</p>
            </div>
          </div>
        </section>

        {/* CHIFFRES + UNIVERSITÉS */}
        <section className="section-padding" style={{ background: 'var(--bc-surface)' }}>
          <div className="container">
            <div className="d-flex justify-content-between align-items-end mb-8" style={{ flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div className="section-label">Registre national</div>
                <h2 className="section-title">Un réseau académique en pleine croissance</h2>
              </div>
              <Link to="/login" className="btn btn-secondary btn-sm">Accéder à la plateforme →</Link>
            </div>
            <div className="grid-4 mb-6">
              <div className="card text-center"><div className="stat-number">{UNIVERSITIES.length * 10}+</div><p className="text-secondary" style={{ fontSize: 12 }}>Établissements interconnectés</p></div>
              <div className="card text-center"><div className="stat-number">2.4M</div><p className="text-secondary" style={{ fontSize: 12 }}>Dossiers vérifiables</p></div>
              <div className="card text-center"><div className="stat-number">99.9%</div><p className="text-secondary" style={{ fontSize: 12 }}>Disponibilité infrastructure</p></div>
              <div className="card text-center"><div className="stat-number">5 min</div><p className="text-secondary" style={{ fontSize: 12 }}>Vérification médiane</p></div>
            </div>
            <div className="table-container">
              <table className="table">
                <thead><tr><th>Établissement</th><th>Ville</th><th>Code</th><th>Étudiants</th><th>Statut</th></tr></thead>
                <tbody>
                  {UNIVERSITIES.slice(0, 5).map(u => (
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
          </div>
        </section>

        {/* 5 ÉTAPES */}
        <section className="section-padding container">
          <div className="text-center mb-8">
            <div className="section-label">Parcours employeur simplifié</div>
            <h2 className="section-title">Comment certifier un candidat en 5 étapes</h2>
          </div>
          <div className="step-container">
            {[
              ['1', 'Création du compte', 'Enregistrement rapide de votre entreprise avec validation KYC.'],
              ['2', 'Solde tickets', 'Approvisionnez votre compte selon vos besoins de recrutement.'],
              ['3', 'Choix Établissement', 'Sélectionnez l’université et renseignez les infos du candidat.'],
              ['4', 'Vérification Flash', 'Requête sécurisée traitée en temps réel.'],
              ['5', 'Rapport Final', 'Téléchargement immédiat du certificat officiel PDF.'],
            ].map(([n, t, d]) => (
              <div className="step-item" key={n}>
                <div className="step-number">{n}</div>
                <h4 style={{ fontSize: 14, marginBottom: 4 }}>{t}</h4>
                <p className="text-secondary" style={{ fontSize: 11 }}>{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TICKETS */}
        <section className="container section-padding">
          <div className="cta-banner d-flex justify-content-between align-items-center" style={{ flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ color: 'var(--bc-slate)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Modèle de facturation transparent</div>
              <h2 style={{ color: '#fff', fontSize: 28 }}>1 Ticket = 1 Vérification certifiée</h2>
              <p style={{ color: 'var(--bc-slate)', fontSize: 14, maxWidth: 560 }}>Aucun abonnement caché. Le ticket ne se consomme qu&apos;en cas de résultat vérifié. Tickets à validité permanente, solde mutualisé multi-utilisateurs.</p>
            </div>
            <Link to="/tickets" className="btn btn-primary">Voir les packs</Link>
          </div>
          <div className="grid-3 mt-6">
            {TICKET_PACKS.map(p => (
              <div className="card card-light-blue text-center" key={p.id}>
                {p.popular && <span className="badge badge-pending mb-4">Le plus choisi</span>}
                <h4 className="mb-2">{p.name}</h4>
                <div className="stat-number mb-2">{p.price} <small style={{ fontSize: 13 }}>/ {p.count} tickets</small></div>
                <p className="text-secondary" style={{ fontSize: 12 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TÉMOIGNAGES */}
        <section className="section-padding" style={{ background: 'var(--bc-surface)' }}>
          <div className="container">
            <div className="text-center mb-8">
              <div className="section-label">Ils recrutent avec BioCampus</div>
              <h2 className="section-title">La confiance des DRH de Kinshasa à Lubumbashi</h2>
            </div>
            <div className="grid-3">
              {[
                ['Aline Mbuyi', 'DRH — Banque commerciale, Kinshasa', '« Nous avons réduit notre Time-to-Hire de 3 semaines à 48h sur les profils juniors. Le rapport PDF fait foi devant notre conformité. »'],
                ['Patrick Okito', 'Cabinet de recrutement, Gombe', '« Le solde multi-utilisateurs a changé notre façon de travailler : 6 consultants vérifient en parallèle, sans friction comptable. »'],
                ['Dr. Fatou Diallo', 'Directrice Talent — Santé, Bukavu', '« Pour les soignants, l’erreur n’est pas une option. La source établissement directe nous donne une garantie totale. »'],
              ].map(([name, role, quote]) => (
                <div className="card" key={name}>
                  <div className="badge badge-verified mb-4">✓ Vérifié</div>
                  <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{quote}</p>
                  <div className="d-flex align-items-center gap-3">
                    <div className="avatar" style={{ background: 'var(--bc-blue-soft)', color: 'var(--bc-blue)' }}>{name.split(' ').map(w => w[0]).join('')}</div>
                    <div><div style={{ fontWeight: 700, fontSize: 13 }}>{name}</div><div className="text-secondary" style={{ fontSize: 12 }}>{role}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="container section-padding">
          <div className="cta-banner text-center" style={{ padding: 48 }}>
            <div style={{ color: 'var(--bc-gold)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Vos futurs recrutements sécurisés</div>
            <h2 style={{ color: '#fff', fontSize: 32, margin: '12px 0' }}>Prêt à sécuriser vos<br />recrutements académiques ?</h2>
            <p style={{ color: 'rgba(255,255,255,.7)', maxWidth: 560, margin: '0 auto 24px' }}>Rejoignez plus de 1 200 DRH, cabinets et entreprises qui authentifient leurs talents en toute sérénité.</p>
            <div className="d-flex justify-content-center gap-4" style={{ flexWrap: 'wrap' }}>
              <Link to="/login" className="btn btn-primary">Se connecter</Link>
              <Link to="/securite" className="btn btn-secondary">Découvrir notre sécurité</Link>
            </div>
            <div className="d-flex justify-content-center gap-6 mt-6" style={{ color: 'rgba(255,255,255,.6)', fontSize: 12, flexWrap: 'wrap' }}>
              <span>✓ Création gratuite</span><span>✓ Sans engagement</span><span>✓ Support 24/7</span>
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
