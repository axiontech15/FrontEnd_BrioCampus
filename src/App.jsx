import { AppProvider, useApp } from './context/AppContext';
import { Link, useHashRoute } from './router';
import Landing from './pages/public/Landing';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Dashboard from './pages/recruiter/Dashboard';
import Verification from './pages/recruiter/Verification';
import Tickets from './pages/recruiter/Tickets';
import Downloads from './pages/recruiter/Downloads';
import History from './pages/recruiter/History';
import Profile from './pages/recruiter/Profile';
import Universities from './pages/recruiter/Universities';
import Privacy from './pages/public/Privacy';
import AuditLogs from './pages/admin/AuditLogs';
import WhyBioCampus from './pages/public/WhyBioCampus';
import Security from './pages/public/Security';
import AdminOverview from './pages/admin/AdminOverview';
import AdminComptes from './pages/admin/AdminComptes';
import AdminRecruteurs from './pages/admin/AdminRecruteurs';
import AdminUniversites from './pages/admin/AdminUniversites';
import AdminVerifications from './pages/admin/AdminVerifications';
import AdminTickets from './pages/admin/AdminTickets';
import AdminAudit from './pages/admin/AdminAudit';

function NotFound() {
  return (
    <main className="page-wrap text-center">
      <h1>404 — Page introuvable</h1>
      <p className="text-secondary mb-6">La page demandée n&apos;existe pas.</p>
      <Link to="/" className="btn btn-primary">Retour à l&apos;accueil</Link>
    </main>
  );
}

function RequireAdmin({ children }) {
  const { user } = useApp();
  if (!user?.loggedIn || user.role !== 'admin') {
    return (
      <main className="page-wrap text-center">
        <h1>Accès restreint</h1>
        <p className="text-secondary mb-6">L&apos;espace admin nécessite une connexion avec un compte administrateur.</p>
        <Link to="/login" className="btn btn-primary">Se connecter comme admin</Link>
      </main>
    );
  }
  return children;
}

function Shell() {
  const path = useHashRoute();
  switch (path) {
    case '/': return <Landing />;
    case '/login': return <Login />;
    case '/register': return <Register />;
    case '/dashboard': return <Dashboard />;
    case '/verification': return <Verification />;
    case '/tickets': return <Tickets />;
    case '/downloads': return <Downloads />;
    case '/history': return <History />;
    case '/profile': return <Profile />;
    case '/universites': return <Universities />;
    case '/privacy': return <Privacy />;
    case '/audit-logs': return <AuditLogs />;
    case '/pourquoi': return <WhyBioCampus />;
    case '/securite': return <Security />;
    case '/admin': return <RequireAdmin><AdminOverview /></RequireAdmin>;
    case '/admin/comptes': return <RequireAdmin><AdminComptes /></RequireAdmin>;
    case '/admin/recruteurs': return <RequireAdmin><AdminRecruteurs /></RequireAdmin>;
    case '/admin/universites': return <RequireAdmin><AdminUniversites /></RequireAdmin>;
    case '/admin/verifications': return <RequireAdmin><AdminVerifications /></RequireAdmin>;
    case '/admin/tickets': return <RequireAdmin><AdminTickets /></RequireAdmin>;
    case '/admin/audit': return <RequireAdmin><AdminAudit /></RequireAdmin>;
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
