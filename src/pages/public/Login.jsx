import { useEffect, useState } from 'react';
import { Link, navigate } from '../../router';
import { useApp } from '../../context/AppContext';
import { USERS } from '../../data/mock';

export default function Login() {
  const { setUser } = useApp();
  const [email, setEmail] = useState('alexandre@kintalents.cd');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.classList.add('page-login');
    return () => { document.body.classList.remove('page-login'); };
  }, []);

  const fillDemo = (role) => {
    const u = USERS.find((x) => x.role === role);
    if (u) { setEmail(u.email); setPassword(u.password); setError(''); }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const found = USERS.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!found || found.password !== password) {
      setError('Email ou mot de passe incorrect.');
      return;
    }
    setUser({ name: found.name, company: found.company, email: found.email, role: found.role, loggedIn: true });
    navigate(found.role === 'admin' ? '/admin' : '/dashboard');
  };

  return (
    <>
      <div className="auth-wrapper">
        {/* Left panel */}
        <div className="auth-left">
          <Link to="/" className="inline-style-692a06d4">
            <img className="brand-logo-full brand-logo-full--auth" src="assets/logo-biocampus.svg" alt="BRIO CAMPUS" />
          </Link>

          <h2 className="inline-style-f041268b">Vérifiez. Certifiez.<br />Recrutez en confiance.</h2>
          <p className="inline-style-c1c693ba">La plateforme de référence pour l'authentification des diplômes auprès des
            universités officielles.</p>

          <div className="auth-stat">
            <div className="auth-stat-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <div className="inline-style-271b0f96">140+ établissements</div>
              <div className="inline-style-df67c055">interconnectés en temps réel</div>
            </div>
          </div>

          <div className="auth-stat">
            <div className="auth-stat-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <div className="inline-style-271b0f96">2,4M de dossiers</div>
              <div className="inline-style-df67c055">vérifiables instantanément</div>
            </div>
          </div>

          <div className="inline-style-38d802f0">
            <p className="inline-style-d0fd401d">© 2026 BioCampus — Une solution Brio Consult</p>
          </div>
        </div>

        {/* Right panel (form) */}
        <div className="auth-right">
          <div className="mb-6">
            <h1 className="inline-style-2756f0cd">Bienvenue</h1>
            <p className="text-secondary inline-style-6c3ca254">Connectez-vous à votre espace recruteur ou admin.</p>
          </div>

          {error && (
            <div className="alert alert-danger mb-4" role="alert">
              <span>{error}</span>
            </div>
          )}

          <form id="loginForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email professionnel</label>
              <input type="email" id="email" className="form-control" placeholder="nom@entreprise.com" required
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Mot de passe</label>
              <input type="password" id="password" className="form-control" placeholder="••••••••" required
                value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-6">
              <label className="inline-style-a39c9f76">
                <input type="checkbox" defaultChecked className="inline-style-1423a33a" />
                Se souvenir de moi
              </label>
              <Link to="/privacy" className="inline-style-b84c7dfa">Mot de passe oublié ?</Link>
            </div>

            <button type="submit" className="btn btn-primary inline-style-cd983272">
              Se connecter →
            </button>
          </form>

          <hr className="divider" />

          <div className="alert alert-info mb-4">
            <span>
              <strong>Comptes démo</strong> — cliquez pour pré-remplir :<br />
              <button type="button" className="action-btn-link mt-2" onClick={() => fillDemo('recruteur')}>
                Recruteur : a.dupont@kintalents.cd / password
              </button><br />
              <button type="button" className="action-btn-link mt-2" onClick={() => fillDemo('admin')}>
                Admin : admin@biocampus.cd / admin123
              </button>
            </span>
          </div>

          <p className="text-center text-secondary inline-style-b84c7dfa">
            Pas encore de compte ?
            <Link to="/register" className="inline-style-cc568fe7">Créer un compte entreprise</Link>
          </p>

          <div className="d-flex justify-content-center gap-4 mt-4 inline-style-7ebfadc5">
            <Link to="/privacy" className="inline-style-af4fa33e">Politique de confidentialité</Link>
            <span>•</span>
            <Link to="/" className="inline-style-af4fa33e">Retour au site</Link>
          </div>
        </div>
      </div>
    </>
  );
}
