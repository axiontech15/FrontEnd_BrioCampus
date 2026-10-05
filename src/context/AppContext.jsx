import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { INITIAL_DOCUMENTS, INITIAL_PURCHASES, INITIAL_VERIFICATIONS } from '../data/mock';

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
  const [user, setUser] = useState(() => read('bc_user', { name: 'Alexandre Dupont', company: 'Cabinet Kin Talents', email: 'a.dupont@kintalents.cd', loggedIn: false }));
  const [tickets, setTickets] = useState(() => {
    const v = localStorage.getItem('brio_tickets');
    return v ? parseInt(v, 10) : 8;
  });
  const [verifications, setVerifications] = useState(() => read('bc_verifications', INITIAL_VERIFICATIONS));
  const [documents, setDocuments] = useState(() => read('bc_documents', INITIAL_DOCUMENTS));
  const [purchases, setPurchases] = useState(() => read('bc_purchases', INITIAL_PURCHASES));

  useEffect(() => {
    localStorage.setItem('brio_tickets', String(tickets));
  }, [tickets]);
  useEffect(() => {
    localStorage.setItem('bc_verifications', JSON.stringify(verifications));
    localStorage.setItem('bc_documents', JSON.stringify(documents));
    localStorage.setItem('bc_purchases', JSON.stringify(purchases));
    localStorage.setItem('bc_user', JSON.stringify(user));
  }, [verifications, documents, purchases, user]);

  const value = useMemo(
    () => ({ user, setUser, tickets, setTickets, verifications, setVerifications, documents, setDocuments, purchases, setPurchases }),
    [user, tickets, verifications, documents, purchases],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
