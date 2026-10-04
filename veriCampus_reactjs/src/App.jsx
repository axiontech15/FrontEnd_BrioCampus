import { AppProvider } from './context/AppContext';
import { Link, useHashRoute } from './router';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Verification from './pages/Verification';
import Tickets from './pages/Tickets';
import Downloads from './pages/Downloads';
import History from './pages/History';
import Profile from './pages/Profile';
import Universities from './pages/Universities';
import Privacy from './pages/Privacy';
import AuditLogs from './pages/AuditLogs';

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
