import { useEffect, useState } from 'react';
import { Link, navigate } from '../../router';
import { authApi } from '../../services/api';
import { USE_MOCK, formatApiError } from '../../services/config';

export default function OtpVerify() {
  const [email, setEmail] = useState(() => sessionStorage.getItem('bc_reset_email') || '');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.classList.add('page-login');
    return () => { document.body.classList.remove('page-login'); };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!/^\d{6}$/.test(code.trim())) {
      setError('Saisissez le code OTP à 6 chiffres.');
      return;
    }
    if (!USE_MOCK && newPassword.length < 8) {
      setError('Le nouveau mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    setLoading(true);
    try {
      if (!USE_MOCK) {
        await authApi.confirmPasswordReset(email.trim(), code.trim(), newPassword);
      }
      sessionStorage.removeItem('bc_reset_email');
      setDone(true);
    } catch (err) {
      setError(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <Link to="/" className="inline-style-692a06d4">
          <img className="brand-logo-full brand-logo-full--auth" src="assets/logo-biocampus.svg" alt="BRIO CAMPUS" />
        </Link>
        <h2 className="inline-style-f041268b">Vérification<br />par e-mail</h2>
        <p className="inline-style-c1c693ba">Le code OTP confirme votre identité avant de réinitialiser le mot de passe.</p>
      </div>
      <div className="auth-right">
        <div className="mb-6">
          <h1 className="inline-style-2756f0cd">Code OTP</h1>
          <p className="text-secondary inline-style-6c3ca254">
            Entrez le code reçu et choisissez un nouveau mot de passe.
          </p>
        </div>

        {done ? (
          <div className="alert alert-info mb-4">
            <span>
              Mot de passe mis à jour.
              {' '}
              <button type="button" className="action-btn-link" onClick={() => navigate('/login')}>
                Aller à la connexion →
              </button>
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger mb-4" role="alert"><span>{error}</span></div>}
            <div className="form-group">
              <label htmlFor="otp-email" className="form-label">Email</label>
              <input
                id="otp-email"
                type="email"
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="otp" className="form-label">Code à 6 chiffres</label>
              <input
                id="otp"
                className="form-control"
                inputMode="numeric"
                maxLength={6}
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                required
                disabled={loading}
              />
            </div>
            {!USE_MOCK && (
              <div className="form-group">
                <label htmlFor="new-pass" className="form-label">Nouveau mot de passe</label>
                <input
                  id="new-pass"
                  type="password"
                  className="form-control"
                  minLength={8}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            )}
            <button type="submit" className="btn btn-primary inline-style-cd983272" disabled={loading}>
              {loading ? 'Vérification…' : 'Valider →'}
            </button>
          </form>
        )}

        <p className="text-center text-secondary mt-6">
          <Link to="/password-reset">Renvoyer un code</Link>
          {' · '}
          <Link to="/login">Connexion</Link>
          {' · '}
          <Link to="/privacy">Confidentialité</Link>
        </p>
      </div>
    </div>
  );
}
