import { useEffect, useState } from 'react';
import { Link, navigate } from '../../router';
import { authApi } from '../../services/api';
import { USE_MOCK, formatApiError } from '../../services/config';

export default function PasswordReset() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.classList.add('page-login');
    return () => { document.body.classList.remove('page-login'); };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (!USE_MOCK) {
        await authApi.requestPasswordReset(email.trim());
      }
      sessionStorage.setItem('bc_reset_email', email.trim());
      setSent(true);
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
        <h2 className="inline-style-f041268b">Réinitialiser<br />votre mot de passe</h2>
        <p className="inline-style-c1c693ba">Un code OTP sera envoyé à votre adresse e-mail professionnelle.</p>
      </div>
      <div className="auth-right">
        <div className="mb-6">
          <h1 className="inline-style-2756f0cd">Mot de passe oublié</h1>
          <p className="text-secondary inline-style-6c3ca254">Indiquez l&apos;e-mail associé à votre compte BioCampus.</p>
        </div>

        {error && <div className="alert alert-danger mb-4" role="alert"><span>{error}</span></div>}

        {sent ? (
          <div className="alert alert-info mb-4">
            <span>
              Si un compte existe pour <strong>{email}</strong>, un code OTP a été envoyé.
              {' '}
              <button type="button" className="action-btn-link" onClick={() => navigate('/otp')}>
                Continuer vers la vérification OTP →
              </button>
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="reset-email" className="form-label">Email professionnel</label>
              <input
                id="reset-email"
                type="email"
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@entreprise.com"
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn btn-primary inline-style-cd983272" disabled={loading}>
              {loading ? 'Envoi…' : 'Envoyer le code OTP →'}
            </button>
          </form>
        )}

        <p className="text-center text-secondary mt-6">
          <Link to="/login">Retour à la connexion</Link>
          {' · '}
          <Link to="/privacy">Confidentialité</Link>
        </p>
      </div>
    </div>
  );
}
