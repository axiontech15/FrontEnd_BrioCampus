import { useEffect, useState } from 'react';
import { Link, navigate } from '../router';
import { useApp } from '../context/AppContext';

export default function Register() {
  const { setUser } = useApp();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    document.body.classList.add('page-register');
    return () => { document.body.classList.remove('page-register'); };
  }, []);

  const handleSubmit = (e) => {
    if (password !== confirm) {
      e.preventDefault();
      setShowError(true);
      return;
    }
    e.preventDefault();
    setUser({ name: firstname + ' ' + lastname, company, email, loggedIn: true });
    navigate('/dashboard');
  };

  return (
    <>
      <div className="register-wrap">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-style-a028662e">
            <img className="brand-logo-full brand-logo-full--auth" src="assets/logo-biocampus.svg" alt="BRIO CAMPUS" />
          </Link>
        </div>

        <div className="auth-card">
          <div className="step-pill">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            Compte entreprise
          </div>
          <h1 className="inline-style-3296f38c">Créer mon compte recruteur</h1>
          <p className="text-secondary mb-6 inline-style-b84c7dfa">Rejoignez 1 200+ entreprises qui authentifient leurs
            talents en toute sérénité.</p>

          <form id="registerForm" onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="firstname" className="form-label">Prénom *</label>
                <input type="text" id="firstname" className="form-control" placeholder="Jean" required
                  value={firstname} onChange={(e) => setFirstname(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="lastname" className="form-label">Nom *</label>
                <input type="text" id="lastname" className="form-control" placeholder="Dupont" required
                  value={lastname} onChange={(e) => setLastname(e.target.value)} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="company" className="form-label">Entreprise *</label>
              <input type="text" id="company" className="form-control" placeholder="Nom de l'entreprise" required
                value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email professionnel *</label>
              <input type="email" id="email" className="form-control" placeholder="nom@entreprise.com" required
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">Téléphone</label>
              <input type="tel" id="phone" className="form-control" placeholder="+243 ..."
                value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label htmlFor="password" className="form-label">Mot de passe *</label>
                <input type="password" id="password" className="form-control" placeholder="••••••••" required
                  minLength="8" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="password_confirm" className="form-label">Confirmation *</label>
                <input type="password" id="password_confirm" className="form-control" placeholder="••••••••"
                  required value={confirm} onChange={(e) => setConfirm(e.target.value)} />
              </div>
            </div>

            <div id="error-msg" className="alert alert-warning inline-style-93b8ea5b" style={{ display: showError ? 'flex' : 'none' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="inline-style-5b214b83">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              <span>Les mots de passe ne correspondent pas.</span>
            </div>

            <div className="form-group mb-6">
              <label className="inline-style-fd11e848">
                <input type="checkbox" required className="inline-style-5066e04f" />
                <span>J'accepte les <Link to="/privacy">Conditions d'utilisation</Link> et la <Link
                  to="/privacy">Politique de confidentialité</Link> de BioCampus.</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary inline-style-cd983272">
              Créer mon compte →
            </button>
          </form>

          <p className="text-center text-secondary mt-6 inline-style-b84c7dfa">
            Déjà un compte ? <Link to="/login" className="inline-style-cc568fe7">Se connecter</Link>
          </p>
        </div>

        <div className="text-center mt-4 inline-style-baa377d7">
          © 2026 BioCampus — <Link to="/privacy" className="inline-style-bd23a28e">Politique de confidentialité</Link>
        </div>
      </div>
    </>
  );
}
