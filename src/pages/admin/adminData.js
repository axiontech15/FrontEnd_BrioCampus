// Données et configuration partagées de l'espace admin (sans JSX)

export const ADMIN_SECTIONS = [
  { id: 'overview', label: "Vue d'ensemble", to: '/admin', crumb: "VUE D'ENSEMBLE" },
  { id: 'comptes', label: 'Comptes', to: '/admin/comptes', crumb: 'COMPTES' },
  { id: 'recruteurs', label: 'abonnements', to: '/admin/recruteurs', crumb: 'RECRUTEURS' },
  { id: 'universites', label: 'Universités', to: '/admin/universites', crumb: 'UNIVERSITÉS' },
  { id: 'verifications', label: 'Vérifications', to: '/admin/verifications', crumb: 'VÉRIFICATIONS' },
  { id: 'tickets', label: 'Tickets', to: '/admin/tickets', crumb: 'TICKETS' },
  { id: 'audit', label: 'Sécurité', to: '/admin/audit', crumb: 'AUDIT & SÉCURITÉ' },
];

export const SEED_COMPTES = [
  { id: 1, name: 'Admin BioCampus', email: 'admin@biocampus.cd', role: 'Admin', org: 'BioCampus', status: 'Actif', lastLogin: '05/10/2026 à 08:12' },
  { id: 2, name: 'Alexandre Dupont', email: 'a.dupont@kintalents.cd', role: 'Recruteur', org: 'Cabinet Kin Talents', status: 'Actif', lastLogin: '05/10/2026 à 07:58' },
  { id: 3, name: 'Aline Mbuyi', email: 'a.mbuyi@banque.cd', role: 'Recruteur', org: 'Banque Commerciale', status: 'Actif', lastLogin: '04/10/2026 à 16:40' },
  { id: 4, name: 'Patrick Okito', email: 'p.okito@gombe-talents.cd', role: 'Recruteur', org: 'Gombe Talents', status: 'En attente', lastLogin: '02/10/2026 à 11:05' },
  { id: 5, name: 'Dr. Fatou Diallo', email: 'f.diallo@sante-bkv.cd', role: 'Recruteur', org: 'Santé Bukavu', status: 'Actif', lastLogin: '03/10/2026 à 09:22' },
  { id: 6, name: 'Registre UNIKIN', email: 'registre@unikin.cd', role: 'Université', org: 'Université de Kinshasa', status: 'Actif', lastLogin: '05/10/2026 à 06:30' },
  { id: 7, name: 'Registre UNILU', email: 'registre@unilu.cd', role: 'Université', org: 'Université de Lubumbashi', status: 'Actif', lastLogin: '04/10/2026 à 14:11' },
  { id: 8, name: 'Registre UNIKIS', email: 'registre@unikis.cd', role: 'Université', org: 'Université de Kisangani', status: 'En attente', lastLogin: '—' },
];

export const SEED_RECRUTEURS = [
  { id: 1, company: 'Cabinet Kin Talents', contact: 'Alexandre Dupont', email: 'a.dupont@kintalents.cd', tickets: 8, verifs: 12, pack: 'Pack Recruteur', status: 'Actif' },
  { id: 2, company: 'Banque Commerciale', contact: 'Aline Mbuyi', email: 'a.mbuyi@banque.cd', tickets: 45, verifs: 132, pack: 'Pack Entreprise', status: 'Actif' },
  { id: 3, company: 'Gombe Talents', contact: 'Patrick Okito', email: 'p.okito@gombe-talents.cd', tickets: 0, verifs: 3, pack: 'Pack Découverte', status: 'En attente' },
  { id: 4, company: 'Santé Bukavu', contact: 'Dr. Fatou Diallo', email: 'f.diallo@sante-bkv.cd', tickets: 22, verifs: 58, pack: 'Pack Recruteur', status: 'Actif' },
];

export const SEED_AUDIT = [
  { date: '05/10/2026 08:12:04 UTC', actor: 'admin@biocampus.cd', event: 'Connexion admin réussie', detail: 'IP 196.168.1.10 • MFA validé', status: 'OK' },
  { date: '05/10/2026 07:58:41 UTC', actor: 'a.dupont@kintalents.cd', event: 'Vérification BC-2026-0483 consultée', detail: 'Université de Kinshasa • hash vérifié', status: 'OK' },
  { date: '04/10/2026 16:40:02 UTC', actor: 'système', event: 'Achat Pack Recruteur (+50 tickets)', detail: 'Banque Commerciale • 199 $ • Payé', status: 'OK' },
  { date: '03/10/2026 22:14:55 UTC', actor: 'système', event: 'Tentative de connexion bloquée', detail: 'registre@unikis.cd • 5 échecs • IP mise en quarantaine', status: 'Alerte' },
];

export function nowStamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())} UTC`;
}
