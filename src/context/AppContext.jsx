import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { INITIAL_DOCUMENTS, INITIAL_PURCHASES, INITIAL_VERIFICATIONS, UNIVERSITIES } from '../data/mock';
import {
  SEED_AUDIT,
  SEED_CATEGORIES,
  SEED_COMPTES,
  SEED_RH_PROFILES,
  SEED_ROLES,
  nowStamp,
} from '../pages/admin/adminData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [tickets, setTickets] = useState(8);
  const [verifications, setVerifications] = useState(INITIAL_VERIFICATIONS);
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [purchases, setPurchases] = useState(INITIAL_PURCHASES);
  const [adminComptes, setAdminComptes] = useState(SEED_COMPTES);
  const [adminRoles, setAdminRoles] = useState(SEED_ROLES);
  const [adminCategories, setAdminCategories] = useState(SEED_CATEGORIES);
  const [adminUnis, setAdminUnis] = useState(UNIVERSITIES);
  const [adminAudit, setAdminAudit] = useState(SEED_AUDIT);
  const [rhProfiles, setRhProfiles] = useState(SEED_RH_PROFILES);
  const [univProfile, setUnivProfile] = useState({
    name: 'Université de Kinshasa',
    code: 'CD-KIN-001',
    city: 'Kinshasa',
    contactEmail: 'registre@unikin.cd',
    phone: '+243 81 000 0000',
  });
  const [palmares, setPalmares] = useState([
    { matricule: 'KIN-2019-0042', full_name: 'Mwamba Kalala', faculty: 'Droit', diploma_date: '2023-07-15' },
    { matricule: 'KIN-2020-1188', full_name: 'Sarah Ntumba', faculty: 'Économie', diploma_date: '2024-09-20' },
  ]);
  const [univStats, setUnivStats] = useState({ rhConsulted: 12, graduatesTotal: 2 });
  const [profilesViewed, setProfilesViewed] = useState(
    INITIAL_VERIFICATIONS.filter((v) => v.status === 'verified').length,
  );

  const logAdmin = useCallback((event, detail, status = 'OK', actor = 'admin@biocampus.cd') => {
    setAdminAudit((entries) => [{ date: nowStamp(), actor, event, detail, status, archived: false }, ...entries]);
  }, []);

  const value = useMemo(
    () => ({
      tickets, setTickets, verifications, setVerifications,
      documents, setDocuments, purchases, setPurchases, profilesViewed, setProfilesViewed,
      adminComptes, setAdminComptes, adminRoles, setAdminRoles,
      adminCategories, setAdminCategories, adminUnis, setAdminUnis,
      adminAudit, setAdminAudit, logAdmin,
      rhProfiles, setRhProfiles, univProfile, setUnivProfile,
      palmares, setPalmares, univStats, setUnivStats,
      
    }),
    [
      tickets, verifications, documents, purchases, profilesViewed,
      adminComptes, adminRoles, adminCategories, adminUnis, adminAudit, logAdmin,
      rhProfiles, univProfile, palmares, univStats,
    ],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
