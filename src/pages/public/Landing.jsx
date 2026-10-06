import { useEffect } from 'react';
import { Link } from '../../router';
import PublicHeader from './PublicHeader';
import { IconLock, IconShield, IconUsers } from '../../components/icons';

export default function Landing() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    els.forEach((el) => { el.style.opacity = '0'; });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('animate-fade-in-up');
          en.target.style.opacity = '1';
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <PublicHeader />

      <main className="landing">
        {/* HERO — brand + one message + CTAs + full-bleed visual */}
        <section className="landing-hero" aria-labelledby="landing-hero-title">
          <div className="landing-hero-bg" aria-hidden="true" />
          <div className="landing-hero-inner container">
            <p className="landing-brand-mark">BioCampus</p>
            <h1 id="landing-hero-title" className="landing-hero-title">
              La vérification des diplômes,<br />
              <span>à portée de main.</span>
            </h1>
            <p className="landing-hero-lead">
              Connectez les ressources humaines aux registres officiels des universités congolaises —
              pour recruter en confiance.
            </p>
            <div className="landing-hero-cta">
              <Link to="/login" className="btn btn-primary">Se connecter</Link>
              <Link to="/fonctionnalites" className="btn btn-secondary landing-btn-ghost">Voir les fonctionnalités</Link>
            </div>
          </div>
        </section>

        {/* ORIENTATION — comme les parcours MyENA */}
        <section className="landing-section" aria-labelledby="landing-paths-title">
          <div className="container">
            <p className="landing-eyebrow">Orientation</p>
            <h2 id="landing-paths-title" className="landing-h2">Choisissez votre espace</h2>
            <p className="landing-lead">
              BioCampus accompagne chaque acteur de la chaîne de confiance académique.
            </p>
            <div className="landing-paths reveal">
              <article className="landing-path">
                <p className="landing-path-kicker">Ressources humaines</p>
                <h3 className="landing-path-title">Recherchez.<br />Certifiez.</h3>
                <p className="landing-path-text">
                  Achetez des tickets, interrogez les registres et consultez les profils diplômés en quelques minutes.
                </p>
                <Link to="/login" className="landing-path-link">Accéder à l&apos;espace RH →</Link>
              </article>
              <article className="landing-path landing-path-alt">
                <p className="landing-path-kicker">Université</p>
                <h3 className="landing-path-title">Publiez.<br />Protégez.</h3>
                <p className="landing-path-text">
                  Mettez à jour votre profil, importez le palmarès et suivez les consultations des RH partenaires.
                </p>
                <Link to="/login" className="landing-path-link">Accéder à l&apos;espace Université →</Link>
              </article>
            </div>
          </div>
        </section>

        {/* POURQUOI — une section, un job */}
        <section className="landing-section landing-section-tint" aria-labelledby="landing-why-title">
          <div className="container">
            <p className="landing-eyebrow">Pourquoi BioCampus</p>
            <h2 id="landing-why-title" className="landing-h2">Une expérience de confiance conçue pour la RDC</h2>
            <p className="landing-lead">
              Source universitaire directe, traçabilité et conformité — inspirées des plateformes institutionnelles
              comme le <a href="https://campus.ena.gouv.cd/" target="_blank" rel="noreferrer">Campus Virtuel MyENA</a>.
            </p>
            <ul className="landing-why-grid reveal">
              <li>
                <IconShield size={22} />
                <h3>Source établissement</h3>
                <p>Les données viennent des registres universitaires, pas d&apos;une base intermédiaire.</p>
              </li>
              <li>
                <IconLock size={22} />
                <h3>Traçabilité</h3>
                <p>Chaque recherche laisse une empreinte consultable pour les audits RH et conformité.</p>
              </li>
              <li>
                <IconUsers size={22} />
                <h3>Espaces dédiés</h3>
                <p>Admin, RH et Université : des parcours clairs, des droits précis, zéro ambiguïté.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* COMMENT ÇA MARCHE */}
        <section className="landing-section" aria-labelledby="landing-steps-title">
          <div className="container">
            <p className="landing-eyebrow">Parcours</p>
            <h2 id="landing-steps-title" className="landing-h2">Certifier un profil en trois temps</h2>
            <ol className="landing-steps reveal">
              <li>
                <span className="landing-step-num">1</span>
                <div>
                  <h3>Connexion</h3>
                  <p>L&apos;administrateur crée votre compte RH ou Université.</p>
                </div>
              </li>
              <li>
                <span className="landing-step-num">2</span>
                <div>
                  <h3>Tickets</h3>
                  <p>Choisissez une catégorie : la quantité du pack est définie par l&apos;admin.</p>
                </div>
              </li>
              <li>
                <span className="landing-step-num">3</span>
                <div>
                  <h3>Recherche</h3>
                  <p>Interrogez le palmarès ; un ticket est consommé uniquement si un profil est trouvé.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* CITATION */}
        <section className="landing-quote" aria-label="Citation">
          <div className="container reveal">
            <blockquote>
              <p>
                « Vérifier un diplôme, c&apos;est protéger l&apos;employeur, l&apos;université et le candidat —
                une même chaîne de confiance. »
              </p>
              <footer>— BioCampus, une solution Brio Consult</footer>
            </blockquote>
          </div>
        </section>

        {/* CONTACT */}
        <section className="landing-section landing-contact" aria-labelledby="landing-contact-title">
          <div className="container landing-contact-grid">
            <div>
              <p className="landing-eyebrow">Contact</p>
              <h2 id="landing-contact-title" className="landing-h2">Parlons de vos besoins</h2>
              <p className="landing-lead">
                Une question sur l&apos;intégration, les tickets ou le palmarès ? Notre équipe vous répond.
              </p>
              <ul className="landing-contact-list">
                <li><strong>Adresse</strong> — Kinshasa / Gombe, RDC</li>
                <li><strong>Email</strong> — <a href="mailto:dpo@BioCampus.cd">dpo@BioCampus.cd</a></li>
                <li><strong>Légal</strong> — <Link to="/privacy">Politique de confidentialité</Link></li>
              </ul>
            </div>
            <div className="landing-contact-cta reveal">
              <h3>Prêt à sécuriser vos recrutements ?</h3>
              <p>Connectez-vous à votre espace ou découvrez la sécurité de la plateforme.</p>
              <div className="landing-hero-cta">
                <Link to="/login" className="btn btn-primary">Se connecter</Link>
                <Link to="/securite" className="btn btn-secondary">Sécurité</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="container landing-footer-grid">
          <div>
            <Link to="/" className="landing-footer-brand">
              <img className="brand-logo-full" src="assets/logo-biocampus.svg" alt="" />
              <span>BioCampus</span>
            </Link>
            <p>Vérification académique auprès des universités de la République Démocratique du Congo.</p>
          </div>
          <nav aria-label="Pied de page">
            <h2 className="landing-footer-heading">Plateforme</h2>
            <Link to="/fonctionnalites">Fonctionnalités</Link>
            <Link to="/pourquoi">Pourquoi BioCampus</Link>
            <Link to="/securite">Sécurité</Link>
            <Link to="/login">Connexion</Link>
          </nav>
          <nav aria-label="Liens légaux">
            <h2 className="landing-footer-heading">Légal</h2>
            <Link to="/privacy">Confidentialité</Link>
            <Link to="/privacy">Conditions</Link>
            <a href="mailto:dpo@BioCampus.cd">Contact DPO</a>
          </nav>
        </div>
        <div className="container landing-footer-bar">
          <span>© 2026 BioCampus — Brio Consult. Tous droits réservés.</span>
          <span>Kinshasa, RDC</span>
        </div>
      </footer>
    </>
  );
}
