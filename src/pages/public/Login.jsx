import { useEffect, useState } from 'react';
import { Link, navigate } from '../../router';
import { useApp } from '../../context/AppContext';
import { USERS } from '../../data/mock';
import { authApi, setTokens, clearTokens } from '../../services/api';
import { USE_MOCK, formatApiError, homeForRole, mapApiRole } from '../../services/config';

export default function Login() {
  const { setUser, syncSessionFromApi } = useApp();
  const [email, setEmail] = useState(USE_MOCK ? 'a.dupont@kintalents.cd' : 'admin@briocampus.cd');
  const [password, setPassword] = useState(USE_MOCK ? 'password' : 'Admin123!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.classList.add('page-login');
    return () => { document.body.classList.remove('page-login'); };
  }, []);

  const fillDemo = (role) => {
    if (USE_MOCK) {
      const u = USERS.find((x) => x.role === role);
      if (u) { setEmail(u.email); setPassword(u.password); setError(''); }
      return;
    }
    const demos = {
      admin: { email: 'admin@briocampus.cd', password: 'Admin123!' },
      rh: { email: 'a.dupont@kintalents.cd', password: 'password' },
      university: { email: 'registre@unikin.cd', password: 'univ123' },
    };
    const d = demos[role];
    if (d) { setEmail(d.email); setPassword(d.password); setError(''); }
  };

  const loginMock = () => {
    const found = USERS.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!found || found.password !== password) {
      setError('Email ou mot de passe incorrect.');
      return;
    }
    setUser({ name: found.name, company: found.company, email: found.email, role: found.role, loggedIn: true });
    navigate(homeForRole(found.role));
  };

  const loginApi = async () => {
    setLoading(true);
    try {
      clearTokens();
      const tokens = await authApi.login(email.trim(), password);
      setTokens(tokens);
      const me = await authApi.me();
      const role = mapApiRole(me.role_name);
      const session = {
        id: me.id,
        name: `${me.first_name} ${me.last_name}`.trim(),
        company: me.role_name || '',
        email: me.email,
        role,
        roleName: me.role_name,
        loggedIn: true,
      };
      setUser(session);
      if (syncSessionFromApi) await syncSessionFromApi(me);
      navigate(homeForRole(role));
    } catch (err) {
      clearTokens();
      setError(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (USE_MOCK) loginMock();
    else loginApi();
  };

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-left">
          <Link to="/" className="inline-style-692a06d4">
            <img className="brand-logo-full brand-logo-full--auth" src="assets/logo-biocampus.svg" alt="BRIO CAMPUS" />
          </Link>

          <h2 className="inline-style-f041268b">Vérifiez. Certifiez.<br />Recrutez en confiance.</h2>
          <p className="inline-style-c1c693ba">
            La plateforme de référence pour l&apos;authentification des diplômes auprès des universités officielles.
          </p>

          <div className="inline-style-38d802f0">
            <p className="inline-style-d0fd401d">© 2026 BioCampus — Une solution Brio Consult</p>
          </div>
        </div>

        <div className="auth-right">
          <div className="mb-6">
            <h1 className="inline-style-2756f0cd">Bienvenue</h1>
            <p className="text-secondary inline-style-6c3ca254">
              Connectez-vous à votre espace Admin, RH ou Université.
              {!USE_MOCK && <><br /><small>API : FastAPI · localhost:5173 ↔ :8080</small></>}
            </p>
          </div>

          {error && (
            <div className="alert alert-danger mb-4" role="alert">
              <span>{error}</span>
            </div>
          )}

          <form id="loginForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email professionnel</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="nom@entreprise.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Mot de passe</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-6">
              <label className="inline-style-a39c9f76">
                <input type="checkbox" defaultChecked className="inline-style-1423a33a" />
                Se souvenir de moi
              </label>
              <Link to="/password-reset" className="inline-style-b84c7dfa">Mot de passe oublié ?</Link>
            </div>

            <button type="submit" className="btn btn-primary inline-style-cd983272" disabled={loading}>
              {loading ? 'Connexion…' : 'Se connecter →'}
            </button>
          </form>

          <hr className="divider" />

          <div className="alert alert-info mb-4">
            <span>
              <strong>Comptes démo</strong> — pré-remplir :<br />
              <button type="button" className="action-btn-link mt-2" onClick={() => fillDemo('admin')}>
                Admin {USE_MOCK ? ': admin@biocampus.cd' : ': admin@briocampus.cd'}
              </button><br />
              <button type="button" className="action-btn-link mt-2" onClick={() => fillDemo('rh')}>
                RH : a.dupont@kintalents.cd
              </button><br />
              <button type="button" className="action-btn-link mt-2" onClick={() => fillDemo('university')}>
                Université : registre@unikin.cd
              </button>
              {!USE_MOCK && (
                <>
                  <br />
                  <small className="text-secondary">
                    Seul l&apos;admin seedé existe par défaut côté API — créez RH/Université via l&apos;admin.
                  </small>
                </>
              )}
            </span>
          </div>

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
