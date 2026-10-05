import { useEffect, useRef, useState } from 'react';
import { Link, useHashRoute } from '../../router';

const MODULES = [
  { to: '/verification', label: 'Vérifier un candidat' },
  { to: '/tickets', label: 'Tickets' },
  { to: '/downloads', label: 'Téléchargements' },
  { to: '/history', label: 'Historique' },
  { to: '/universites', label: 'Universités' },
];

export default function ProfileMenu() {
  const path = useHashRoute();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => { setOpen(false); }, [path]);

  return (
    <div className="nav-dropdown" ref={ref}>
      <Link to="/profile" className={path === '/profile' ? 'active' : ''}>Mon profil</Link>
      <button
        type="button"
        className="nav-drop-chevron"
        aria-expanded={open}
        aria-label="Afficher les modules"
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="nav-drop-menu" role="menu">
          <div className="nav-drop-title">Modules</div>
          {MODULES.map((m) => (
            <Link
              key={m.to}
              to={m.to}
              className={path === m.to ? 'nav-drop-link active' : 'nav-drop-link'}
              onClick={() => setOpen(false)}
            >
              {m.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
