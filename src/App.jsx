import { AppProvider } from './context/AppContext';
import { Link, useHashRoute } from './router';
import Landing from './pages/public/Landing';
import Login from './pages/public/Login';
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

function Shell() {
  const path = useHashRoute();
  switch (path) {
    case '/': return <Landing />;
    case '/login': return <Login />;
    case '/privacy': return <Privacy />;
    case '/pourquoi': return <WhyBioCampus />;
    case '/securite': return <Security />;
    case '/fonctionnalites': return <Features />;

    case '/dashboard': return <Dashboard />;
    case '/verification': return <Verification />;
    case '/tickets': return <Tickets />;
    case '/history': return <History />;
    case '/profile': return <Profile />;
    case '/profiles': return <Profiles />;

    case '/admin': return <AdminOverview />;
    case '/admin/comptes': return <AdminComptes />;
    case '/admin/roles': return <AdminRoles />;
    case '/admin/categories': return <AdminCategories />;
    case '/admin/universites': return <AdminUniversites />;
    case '/admin/audit': return <AdminAudit />;

    case '/university': return <UniversityProfile />;
    case '/university/palmares': return <PalmaresImport />;
    case '/university/stats': return <UniversityStats />;

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
