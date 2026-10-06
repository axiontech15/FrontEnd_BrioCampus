import { AppProvider, useApp } from './context/AppContext';
import { Link, useHashRoute } from './router';
import Landing from './pages/public/Landing';
import Login from './pages/public/Login';
import PasswordReset from './pages/public/PasswordReset';
import OtpVerify from './pages/public/OtpVerify';
import Dashboard from './pages/recruiter/Dashboard';
import Verification from './pages/recruiter/Verification';
import Tickets from './pages/recruiter/Tickets';
import History from './pages/recruiter/History';
import Profile from './pages/recruiter/Profile';
import Profiles from './pages/recruiter/Profiles';
import Privacy from './pages/public/Privacy';
import WhyBioCampus from './pages/public/WhyBioCampus';
import Security from './pages/public/Security';
import Features from './pages/public/Features';
import AdminOverview from './pages/admin/AdminOverview';
import AdminComptes from './pages/admin/AdminComptes';
import AdminRoles from './pages/admin/AdminRoles';
import AdminCategories from './pages/admin/AdminCategories';
import AdminUniversites from './pages/admin/AdminUniversites';
import AdminAudit from './pages/admin/AdminAudit';
import UniversityProfile from './pages/university/UniversityProfile';
import PalmaresImport from './pages/university/PalmaresImport';
import UniversityStats from './pages/university/UniversityStats';

function NotFound() {
  return (
    <main className="page-wrap text-center">
      <h1>404 — Page introuvable</h1>
      <p className="text-secondary mb-6">La page demandée n&apos;existe pas.</p>
      <Link to="/" className="btn btn-primary">Retour à l&apos;accueil</Link>
    </main>
  );
}

function AccessDenied({ message }) {
  return (
    <main className="page-wrap text-center">
      <h1>Accès restreint</h1>
      <p className="text-secondary mb-6">{message}</p>
      <Link to="/login" className="btn btn-primary">Se connecter</Link>
    </main>
  );
}

function RequireAdmin({ children }) {
  const { user } = useApp();
  if (!user?.loggedIn || user.role !== 'admin') {
    return <AccessDenied message="L'espace admin nécessite un compte administrateur." />;
  }
  return children;
}

function RequireRH({ children }) {
  const { user } = useApp();
  if (!user?.loggedIn || user.role !== 'rh') {
    return <AccessDenied message="L'espace RH nécessite une connexion avec un compte ressources humaines." />;
  }
  return children;
}

function RequireUniversity({ children }) {
  const { user } = useApp();
  if (!user?.loggedIn || user.role !== 'university') {
    return <AccessDenied message="L'espace université nécessite un compte registre universitaire." />;
  }
  return children;
}

function Shell() {
  const path = useHashRoute();
  switch (path) {
    case '/': return <Landing />;
    case '/login': return <Login />;
    case '/password-reset': return <PasswordReset />;
    case '/otp': return <OtpVerify />;
    case '/privacy': return <Privacy />;
    case '/pourquoi': return <WhyBioCampus />;
    case '/securite': return <Security />;
    case '/fonctionnalites': return <Features />;

    case '/dashboard': return <RequireRH><Dashboard /></RequireRH>;
    case '/verification': return <RequireRH><Verification /></RequireRH>;
    case '/tickets': return <RequireRH><Tickets /></RequireRH>;
    case '/history': return <RequireRH><History /></RequireRH>;
    case '/profile': return <RequireRH><Profile /></RequireRH>;
    case '/profiles': return <RequireRH><Profiles /></RequireRH>;

    case '/admin': return <RequireAdmin><AdminOverview /></RequireAdmin>;
    case '/admin/comptes': return <RequireAdmin><AdminComptes /></RequireAdmin>;
    case '/admin/roles': return <RequireAdmin><AdminRoles /></RequireAdmin>;
    case '/admin/categories': return <RequireAdmin><AdminCategories /></RequireAdmin>;
    case '/admin/universites': return <RequireAdmin><AdminUniversites /></RequireAdmin>;
    case '/admin/audit': return <RequireAdmin><AdminAudit /></RequireAdmin>;

    case '/university': return <RequireUniversity><UniversityProfile /></RequireUniversity>;
    case '/university/palmares': return <RequireUniversity><PalmaresImport /></RequireUniversity>;
    case '/university/stats': return <RequireUniversity><UniversityStats /></RequireUniversity>;

    default: return <NotFound />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
