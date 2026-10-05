import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { INITIAL_DOCUMENTS, INITIAL_PURCHASES, INITIAL_VERIFICATIONS, UNIVERSITIES } from '../data/mock';
import { SEED_AUDIT, SEED_COMPTES, SEED_RECRUTEURS, nowStamp } from '../pages/admin/adminData';

const AppContext = createContext(null);

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => read('bc_user', { name: 'Alexandre Dupont', company: 'Cabinet Kin Talents', email: 'a.dupont@kintalents.cd', role: 'recruteur', loggedIn: false }));
  const [tickets, setTickets] = useState(() => {
    const v = localStorage.getItem('brio_tickets');
    return v ? parseInt(v, 10) : 8;
  });
  const [verifications, setVerifications] = useState(() => read('bc_verifications', INITIAL_VERIFICATIONS));
  const [documents, setDocuments] = useState(() => read('bc_documents', INITIAL_DOCUMENTS));
  const [purchases, setPurchases] = useState(() => read('bc_purchases', INITIAL_PURCHASES));

  // État partagé de l'espace admin (persisté, commun aux 7 pages admin)
  const [adminComptes, setAdminComptes] = useState(() => read('bc_admin_comptes', SEED_COMPTES));
  const [adminRecruteurs, setAdminRecruteurs] = useState(() => read('bc_admin_recruteurs', SEED_RECRUTEURS));
  const [adminUnis, setAdminUnis] = useState(() => read('bc_admin_unis', UNIVERSITIES));
  const [adminAudit, setAdminAudit] = useState(() => read('bc_admin_audit', SEED_AUDIT));
  const [adminPurchases, setAdminPurchases] = useState(() => read('bc_admin_purchases', []));

  const logAdmin = useCallback((event, detail, status = 'OK', actor = 'admin@biocampus.cd') => {
    setAdminAudit((a) => [{ date: nowStamp(), actor, event, detail, status }, ...a]);
  }, []);

  useEffect(() => {
    localStorage.setItem('brio_tickets', String(tickets));
  }, [tickets]);
  useEffect(() => {
    localStorage.setItem('bc_verifications', JSON.stringify(verifications));
    localStorage.setItem('bc_documents', JSON.stringify(documents));
    localStorage.setItem('bc_purchases', JSON.stringify(purchases));
    localStorage.setItem('bc_user', JSON.stringify(user));
    localStorage.setItem('bc_admin_comptes', JSON.stringify(adminComptes));
    localStorage.setItem('bc_admin_recruteurs', JSON.stringify(adminRecruteurs));
    localStorage.setItem('bc_admin_unis', JSON.stringify(adminUnis));
    localStorage.setItem('bc_admin_audit', JSON.stringify(adminAudit));
    localStorage.setItem('bc_admin_purchases', JSON.stringify(adminPurchases));
  }, [verifications, documents, purchases, user, adminComptes, adminRecruteurs, adminUnis, adminAudit, adminPurchases]);

  const value = useMemo(
    () => ({
      user, setUser, tickets, setTickets, verifications, setVerifications, documents, setDocuments, purchases, setPurchases,
      adminComptes, setAdminComptes, adminRecruteurs, setAdminRecruteurs, adminUnis, setAdminUnis,
      adminAudit, setAdminAudit, adminPurchases, setAdminPurchases, logAdmin,
    }),
    [user, tickets, verifications, documents, purchases, adminComptes, adminRecruteurs, adminUnis, adminAudit, adminPurchases, logAdmin],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
