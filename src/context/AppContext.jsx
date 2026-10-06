import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { INITIAL_DOCUMENTS, INITIAL_PURCHASES, INITIAL_VERIFICATIONS, UNIVERSITIES } from '../data/mock';
import {
  SEED_AUDIT,
  SEED_CATEGORIES,
  SEED_COMPTES,
  SEED_RH_PROFILES,
  SEED_ROLES,
  nowStamp,
} from '../pages/admin/adminData';
import {
  authApi,
  clearTokens,
  getAccessToken,
  categoriesApi,
  logsApi,
  rolesApi,
  rhApi,
  ticketsApi,
  universitiesApi,
  usersApi,
} from '../services/api';
import { USE_MOCK, mapApiRole } from '../services/config';

const AppContext = createContext(null);

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function normalizeUser(u) {
  if (!u) return u;
  const role = u.role === 'recruteur' ? 'rh' : u.role;
  return { ...u, role };
}

function userFromMe(me) {
  return {
    id: me.id,
    name: `${me.first_name} ${me.last_name}`.trim(),
    company: me.role_name || '',
    email: me.email,
    role: mapApiRole(me.role_name),
    roleName: me.role_name,
    loggedIn: true,
  };
}

export function AppProvider({ children }) {
  const [user, setUserRaw] = useState(() => normalizeUser(read('bc_user', {
    name: 'Alexandre Dupont',
    company: 'Cabinet Kin Talents',
    email: 'a.dupont@kintalents.cd',
    role: 'rh',
    loggedIn: false,
  })));
  const setUser = useCallback((next) => {
    setUserRaw((prev) => normalizeUser(typeof next === 'function' ? next(prev) : next));
  }, []);

  const [sessionReady, setSessionReady] = useState(USE_MOCK);
  const [apiError, setApiError] = useState('');

  const [tickets, setTickets] = useState(() => {
    const v = localStorage.getItem('brio_tickets');
    return v ? parseInt(v, 10) : 8;
  });
  const [verifications, setVerifications] = useState(() => read('bc_verifications', INITIAL_VERIFICATIONS));
  const [documents, setDocuments] = useState(() => read('bc_documents', INITIAL_DOCUMENTS));
  const [purchases, setPurchases] = useState(() => read('bc_purchases', INITIAL_PURCHASES));

  const [adminComptes, setAdminComptes] = useState(() => {
    const raw = read('bc_admin_comptes', SEED_COMPTES);
    return raw.map((c) => (c.role === 'Recruteur' ? { ...c, role: 'RH' } : c));
  });
  const [adminRoles, setAdminRoles] = useState(() => read('bc_admin_roles', SEED_ROLES));
  const [adminCategories, setAdminCategories] = useState(() => read('bc_admin_categories', SEED_CATEGORIES));
  const [adminUnis, setAdminUnis] = useState(() => read('bc_admin_unis', UNIVERSITIES));
  const [adminAudit, setAdminAudit] = useState(() => read('bc_admin_audit', SEED_AUDIT));
  const [rhProfiles, setRhProfiles] = useState(() => read('bc_rh_profiles', SEED_RH_PROFILES));
  const [univProfile, setUnivProfile] = useState(() => read('bc_univ_profile', {
    name: 'Université de Kinshasa',
    code: 'CD-KIN-001',
    city: 'Kinshasa',
    contactEmail: 'registre@unikin.cd',
    phone: '+243 81 000 0000',
  }));
  const [palmares, setPalmares] = useState(() => read('bc_palmares', [
    { matricule: 'KIN-2019-0042', full_name: 'Mwamba Kalala', faculty: 'Droit', diploma_date: '2023-07-15' },
    { matricule: 'KIN-2020-1188', full_name: 'Sarah Ntumba', faculty: 'Économie', diploma_date: '2024-09-20' },
  ]));
  const [univStats, setUnivStats] = useState({ rhConsulted: 12, graduatesTotal: 2 });
  const [profilesViewed, setProfilesViewed] = useState(
    () => verifications.filter((v) => v.status === 'verified').length,
  );

  const logAdmin = useCallback((event, detail, status = 'OK', actor = 'admin@biocampus.cd') => {
    setAdminAudit((a) => [{ date: nowStamp(), actor, event, detail, status, archived: false }, ...a]);
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    setUser((u) => ({ ...u, loggedIn: false }));
  }, [setUser]);

  const syncSessionFromApi = useCallback(async (meInput) => {
    const me = meInput || await authApi.me();
    setUser(userFromMe(me));
    const role = mapApiRole(me.role_name);

    try {
      if (role === 'rh') {
        const [balance, stats, categories] = await Promise.all([
          ticketsApi.balance().catch(() => null),
          rhApi.stats().catch(() => null),
          categoriesApi.list().catch(() => null),
        ]);
        if (balance && typeof balance.remaining_tickets === 'number') {
          setTickets(balance.remaining_tickets);
        }
        if (stats) {
          if (typeof stats.profiles_consulted === 'number') setProfilesViewed(stats.profiles_consulted);
          else if (typeof stats.profiles_viewed === 'number') setProfilesViewed(stats.profiles_viewed);
          if (typeof stats.tickets_remaining === 'number') setTickets(stats.tickets_remaining);
        }
        if (Array.isArray(categories)) {
          setAdminCategories(categories.map((c) => ({
            id: c.id,
            name: c.name,
            description: c.description || '',
            quantity: c.quantity ?? 1,
            status: c.status || 'ACTIVE',
          })));
        }
      }
      if (role === 'admin') {
        const [roles, categories, users, unis, logs] = await Promise.all([
          rolesApi.list().catch(() => null),
          categoriesApi.list().catch(() => null),
          usersApi.list().catch(() => null),
          universitiesApi.list().catch(() => null),
          logsApi.list().catch(() => null),
        ]);
        if (Array.isArray(roles)) {
          setAdminRoles(roles.map((r) => ({
            id: r.id,
            name: r.name,
            description: r.description || '',
            users: r.users_count ?? r.users ?? 0,
          })));
        }
        if (Array.isArray(categories)) {
          setAdminCategories(categories.map((c) => ({
            id: c.id,
            name: c.name,
            description: c.description || '',
            quantity: c.quantity ?? 1,
            status: c.status || 'ACTIVE',
          })));
        }
        if (Array.isArray(users)) {
          setAdminComptes(users.map((u) => ({
            id: u.id,
            name: `${u.first_name} ${u.last_name}`.trim(),
            email: u.email,
            role: u.role_name === 'ADMIN' ? 'Admin' : u.role_name === 'RH' ? 'RH' : u.role_name === 'UNIVERSITY' ? 'Université' : (u.role_name || '—'),
            org: u.university_id ? `Université #${u.university_id}` : '—',
            status: u.status === 'ACTIVE' ? 'Actif' : u.status === 'PENDING' ? 'En attente' : 'Suspendu',
            lastLogin: '—',
          })));
        }
        if (Array.isArray(unis)) {
          setAdminUnis(unis.map((u) => ({
            id: u.id,
            name: u.name,
            city: u.city || u.address || '—',
            code: u.code || String(u.id),
            students: u.students_count ?? u.students ?? 0,
            status: (u.status || 'ACTIVE') === 'ACTIVE' ? 'Active' : 'En attente',
            contactEmail: u.contact_email || null,
          })));
        }
        if (Array.isArray(logs)) {
          setAdminAudit(logs.map((l) => ({
            date: l.created_at || l.date || '—',
            actor: l.user_email || l.actor || '—',
            event: l.action || l.event || '—',
            detail: l.description || l.detail || '',
            status: l.status || 'OK',
            archived: Boolean(l.archived),
          })));
        }
      }
      if (role === 'university') {
        const [profile, stats] = await Promise.all([
          universitiesApi.me().catch(() => null),
          universitiesApi.stats().catch(() => null),
        ]);
        if (profile) {
          setUnivProfile({
            name: profile.name || '',
            code: profile.code || String(profile.id || ''),
            city: profile.city || profile.address || '',
            contactEmail: profile.email || me.email,
            phone: profile.phone || me.phone || '',
          });
        }
        if (stats) {
          setUnivStats({
            rhConsulted: stats.rh_consulted ?? stats.rhConsulted ?? 0,
            graduatesTotal: stats.graduates_total ?? stats.graduatesTotal ?? 0,
          });
        }
      }
    } catch (err) {
      setApiError(err.message || 'Erreur de synchronisation API');
    }
    return me;
  }, [setUser]);

  useEffect(() => {
    if (USE_MOCK) return undefined;
    let cancelled = false;
    (async () => {
      if (!getAccessToken()) {
        if (!cancelled) {
          setUser((u) => ({ ...u, loggedIn: false }));
          setSessionReady(true);
        }
        return;
      }
      try {
        await syncSessionFromApi();
      } catch {
        clearTokens();
        if (!cancelled) setUser((u) => ({ ...u, loggedIn: false }));
      } finally {
        if (!cancelled) setSessionReady(true);
      }
    })();
    return () => { cancelled = true; };
  }, [syncSessionFromApi, setUser]);

  useEffect(() => {
    localStorage.setItem('brio_tickets', String(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('bc_verifications', JSON.stringify(verifications));
    localStorage.setItem('bc_documents', JSON.stringify(documents));
    localStorage.setItem('bc_purchases', JSON.stringify(purchases));
    localStorage.setItem('bc_user', JSON.stringify(user));
    localStorage.setItem('bc_admin_comptes', JSON.stringify(adminComptes));
    localStorage.setItem('bc_admin_roles', JSON.stringify(adminRoles));
    localStorage.setItem('bc_admin_categories', JSON.stringify(adminCategories));
    localStorage.setItem('bc_admin_unis', JSON.stringify(adminUnis));
    localStorage.setItem('bc_admin_audit', JSON.stringify(adminAudit));
    localStorage.setItem('bc_rh_profiles', JSON.stringify(rhProfiles));
    localStorage.setItem('bc_univ_profile', JSON.stringify(univProfile));
    localStorage.setItem('bc_palmares', JSON.stringify(palmares));
  }, [
    verifications, documents, purchases, user, adminComptes, adminRoles,
    adminCategories, adminUnis, adminAudit, rhProfiles, univProfile, palmares,
  ]);

  const value = useMemo(
    () => ({
      user, setUser, tickets, setTickets, verifications, setVerifications,
      documents, setDocuments, purchases, setPurchases, profilesViewed, setProfilesViewed,
      adminComptes, setAdminComptes, adminRoles, setAdminRoles,
      adminCategories, setAdminCategories, adminUnis, setAdminUnis,
      adminAudit, setAdminAudit, logAdmin,
      rhProfiles, setRhProfiles, univProfile, setUnivProfile,
      palmares, setPalmares, univStats, setUnivStats,
      logout, syncSessionFromApi, sessionReady, apiError, useMock: USE_MOCK,
    }),
    [
      user, tickets, verifications, documents, purchases, profilesViewed,
      adminComptes, adminRoles, adminCategories, adminUnis, adminAudit, logAdmin,
      rhProfiles, univProfile, palmares, univStats, setUser,
      logout, syncSessionFromApi, sessionReady, apiError,
    ],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
