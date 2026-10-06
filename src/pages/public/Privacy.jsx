import { Link } from '../../router';
import PublicHeader from './PublicHeader';
import PrivacyPolicy from '../../components/PrivacyPolicy';

export default function Privacy() {
  return (
    <>
      <PublicHeader />

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
            BioCampus s&apos;engage à protéger les données personnelles de ses utilisateurs conformément au Règlement
            Général sur la Protection des Données (RGPD) et aux lois applicables en République Démocratique du
            Congo.
          </p>
          <div className="inline-style-5d12f256">
            <strong className="inline-style-ba76c5db">Dernière mise à jour :</strong> 6 octobre 2026 — Version 2.2
          </div>
        </div>
      </div>

      <PrivacyPolicy />

      <footer className="inline-style-876f00a3">
        <div className="inline-style-3c714a2d">
          <div className="d-flex justify-content-between align-items-center inline-style-6ce7da3a">
            <div className="inline-style-25a74abc">© 2026 BioCampus — Une solution Brio Consult. Tous droits réservés.</div>
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
