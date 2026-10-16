import { Link } from '../../router';

export default function Login() {
  return (
    <main className="auth-wrapper">
      <section className="auth-left" aria-labelledby="auth-brand-title">
        <Link to="/" className="auth-brand" aria-label="BioCampus, accueil">
          <img className="brand-logo-full brand-logo-full--auth" src="assets/logo-biocampus.svg" alt="" />
        </Link>
        <p className="auth-eyebrow">Espace de démonstration</p>
        <h1 id="auth-brand-title" className="auth-promise">Les parcours du campus, réunis.</h1>
        <p className="auth-description">
          Explorez les interfaces RH, administration et université à partir de données d&apos;exemple.
        </p>
        <p className="auth-footnote">BioCampus · Brio Consult · Kinshasa, RDC</p>
      </section>

      <section className="auth-right" aria-labelledby="auth-title">
        <p className="landing-eyebrow">Bienvenue</p>
        <h2 id="auth-title">Accéder à la démo</h2>
        <p className="text-secondary auth-description">
          Cette interface est une template front-end. Les champs ci-dessous sont présentés à titre visuel.
        </p>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Adresse e-mail</label>
          <input className="form-control" id="email" type="email" autoComplete="email" placeholder="nom@organisation.cd" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">Mot de passe</label>
          <input className="form-control" id="password" type="password" autoComplete="current-password" placeholder="••••••••" />
        </div>

        <nav className="auth-demo-links" aria-label="Espaces de démonstration">
          <Link to="/dashboard" className="btn btn-primary">Ouvrir l&apos;espace RH</Link>
          <Link to="/admin" className="btn btn-secondary">Ouvrir l&apos;administration</Link>
          <Link to="/university" className="btn btn-secondary">Ouvrir l&apos;espace université</Link>
        </nav>

        <p className="auth-back-link"><Link to="/">Retour à l&apos;accueil</Link></p>
      </section>
    </main>
  );
}