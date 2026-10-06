// Données et configuration partagées de l'espace admin (sans JSX)

export const ADMIN_SECTIONS = [
  { id: 'overview', label: "Vue d'ensemble", to: '/admin', crumb: "VUE D'ENSEMBLE" },
  { id: 'comptes', label: 'Utilisateurs', to: '/admin/comptes', crumb: 'UTILISATEURS' },
  { id: 'roles', label: 'Rôles', to: '/admin/roles', crumb: 'RÔLES' },
  { id: 'categories', label: 'Catégories', to: '/admin/categories', crumb: 'CATÉGORIES' },
  { id: 'universites', label: 'Universités', to: '/admin/universites', crumb: 'UNIVERSITÉS' },
  { id: 'audit', label: 'Journaux', to: '/admin/audit', crumb: 'JOURNAUX' },
];

export const SEED_COMPTES = [
  { id: 1, name: 'Admin BioCampus', email: 'admin@biocampus.cd', role: 'Admin', org: 'BioCampus', status: 'Actif', lastLogin: '05/10/2026 à 08:12' },
  { id: 2, name: 'Alexandre Dupont', email: 'a.dupont@kintalents.cd', role: 'RH', org: 'Cabinet Kin Talents', status: 'Actif', lastLogin: '05/10/2026 à 07:58' },
  { id: 3, name: 'Aline Mbuyi', email: 'a.mbuyi@banque.cd', role: 'RH', org: 'Banque Commerciale', status: 'Actif', lastLogin: '04/10/2026 à 16:40' },
  { id: 4, name: 'Patrick Okito', email: 'p.okito@gombe-talents.cd', role: 'RH', org: 'Gombe Talents', status: 'En attente', lastLogin: '02/10/2026 à 11:05' },
  { id: 5, name: 'Dr. Fatou Diallo', email: 'f.diallo@sante-bkv.cd', role: 'RH', org: 'Santé Bukavu', status: 'Actif', lastLogin: '03/10/2026 à 09:22' },
  { id: 6, name: 'Registre UNIKIN', email: 'registre@unikin.cd', role: 'Université', org: 'Université de Kinshasa', status: 'Actif', lastLogin: '05/10/2026 à 06:30' },
  { id: 7, name: 'Registre UNILU', email: 'registre@unilu.cd', role: 'Université', org: 'Université de Lubumbashi', status: 'Actif', lastLogin: '04/10/2026 à 14:11' },
  { id: 8, name: 'Registre UNIKIS', email: 'registre@unikis.cd', role: 'Université', org: 'Université de Kisangani', status: 'En attente', lastLogin: '—' },
];

export const SEED_ROLES = [
  { id: 1, name: 'ADMIN', description: 'Administration complète de la plateforme', users: 1 },
  { id: 2, name: 'RH', description: 'Recherche de diplômés et gestion des tickets', users: 4 },
  { id: 3, name: 'UNIVERSITY', description: 'Profil université et import du palmarès', users: 3 },
  { id: 4, name: 'USER', description: 'Compte de base sans droits métier', users: 0 },
];

export const SEED_CATEGORIES = [
  { id: 1, name: 'RECHERCHE', description: 'Tickets de recherche de diplômés', quantity: 10, status: 'ACTIVE' },
  { id: 2, name: 'AUDIT', description: 'Tickets réservés aux audits RH', quantity: 50, status: 'ACTIVE' },
];

export const SEED_AUDIT = [
  { date: '05/10/2026 08:12:04 UTC', actor: 'admin@biocampus.cd', event: 'Connexion admin réussie', detail: 'IP 196.168.1.10 • MFA validé', status: 'OK', archived: false },
  { date: '05/10/2026 07:58:41 UTC', actor: 'a.dupont@kintalents.cd', event: 'Recherche diplômé BC-2026-0483', detail: 'Université de Kinshasa • profil trouvé', status: 'OK', archived: false },
  { date: '04/10/2026 16:40:02 UTC', actor: 'système', event: 'Achat tickets recherche (+50)', detail: 'Banque Commerciale • 199 $ • Payé', status: 'OK', archived: false },
  { date: '03/10/2026 22:14:55 UTC', actor: 'système', event: 'Tentative de connexion bloquée', detail: 'registre@unikis.cd • 5 échecs • IP mise en quarantaine', status: 'Alerte', archived: false },
];

export const SEED_RH_PROFILES = [
  { id: 1, name: 'Alexandre Dupont', email: 'a.dupont@kintalents.cd', title: 'Responsable RH', status: 'Actif' },
  { id: 2, name: 'Marie Kabila', email: 'm.kabila@kintalents.cd', title: 'Chargée de recrutement', status: 'Actif' },
  { id: 3, name: 'Jean Mbala', email: 'j.mbala@kintalents.cd', title: 'Assistant RH', status: 'Suspendu' },
];

export function nowStamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())} UTC`;
}
