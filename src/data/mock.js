export const UNIVERSITIES = [
  { id: 'UNIKIN', name: 'Université de Kinshasa', city: 'Kinshasa', code: 'CD-KIN-001', students: 68000, status: 'Active' },
  { id: 'UPC', name: 'Université Protestante au Congo', city: 'Kinshasa', code: 'CD-KIN-002', students: 12400, status: 'Active' },
  { id: 'ISC', name: 'Institut Supérieur de Commerce', city: 'Kinshasa', code: 'CD-KIN-003', students: 9800, status: 'Active' },
  { id: 'UNILU', name: 'Université de Lubumbashi', city: 'Lubumbashi', code: 'CD-LBU-001', students: 32000, status: 'Active' },
  { id: 'UOB', name: 'Université Officielle de Bukavu', city: 'Bukavu', code: 'CD-BKV-001', students: 18500, status: 'Active' },
  { id: 'UNIKIS', name: 'Université de Kisangani', city: 'Kisangani', code: 'CD-KIS-001', students: 15000, status: 'En attente' },
  { id: 'UCC', name: 'Université Catholique du Congo', city: 'Kinshasa', code: 'CD-KIN-004', students: 7600, status: 'Active' },
  { id: 'ISTA', name: 'ISTA Kinshasa', city: 'Kinshasa', code: 'CD-KIN-005', students: 5200, status: 'Active' },
];

export const INITIAL_VERIFICATIONS = [
  {
    id: 'BC-2026-0483', candidate: 'Mwamba Kalala', email: 'm.kalala@mail.cd',
    diploma: 'Licence Droit', detail: 'Niveau 6 (Bac+3)', university: 'Université de Kinshasa',
    date: '12/03/2026 à 14:30', status: 'verified', statusLabel: 'Certifié conforme',
  },
  {
    id: 'BC-2026-0491', candidate: 'Sarah Ntumba', email: 's.ntumba@outlook.com',
    diploma: 'Master Management', detail: 'Mention Bien', university: 'Université Protestante au Congo',
    date: '14/03/2026 à 09:15', status: 'pending', statusLabel: 'En cours (3/4)',
  },
  {
    id: 'BC-2026-0502', candidate: 'Joseph Ilunga', email: 'j.ilunga@mail.cd',
    diploma: 'BTS Commerce', detail: 'Dossier incomplet', university: 'Institut Supérieur de Commerce',
    date: '15/03/2026 à 16:45', status: 'incomplete', statusLabel: 'Incomplet',
  },
  {
    id: 'BC-2026-0210', candidate: 'Paul Kabongo', email: 'p.kabongo@mail.cd',
    diploma: 'Licence Sciences', detail: 'Non retrouvé au registre', university: 'Université de Lubumbashi',
    date: '10/02/2026 à 11:20', status: 'failed', statusLabel: 'Non vérifié',
  },
  {
    id: 'BC-2024-8891', candidate: 'Alexandre de Courcelles', email: 'alexandre.decourcelles@mail.fr',
    diploma: 'Master Ingénierie des Systèmes', detail: 'Grade Master (Bac+5) • RNCP34120',
    university: 'Université Paris-Saclay', date: '14 Mai 2024 à 10:42', status: 'verified', statusLabel: 'Certifié Conforme',
  },
];

export const INITIAL_DOCUMENTS = [
  { id: 'BC-2026-0483', title: 'Attestation — Mwamba Kalala', meta: 'Université de Kinshasa • 12/03/2026 • Réf. BC-2026-0483', status: 'verified' },
  { id: 'BC-2024-8891', title: 'Attestation — Alexandre de Courcelles', meta: 'Université Paris-Saclay • 14/05/2024 • Réf. BC-2024-8891', status: 'verified' },
  { id: 'BC-2024-8511', title: 'Attestation — Camille Bertrand', meta: 'Université Panthéon-Assas • 02/05/2024 • Réf. BC-2024-8511', status: 'verified' },
  { id: 'BC-2024-8930', title: 'Attestation — Thomas Lemoine', meta: 'CentraleSupélec • En cours... • Réf. BC-2024-8930', status: 'pending' },
];

export const TICKET_PACKS = [
  { id: 'decouverte', name: 'Pack Découverte', desc: 'Idéal pour tester la plateforme', count: 10, price: '49 $', popular: false },
  { id: 'recruteur', name: 'Pack Recruteur', desc: 'Pour les équipes RH actives', count: 50, price: '199 $', popular: true },
  { id: 'entreprise', name: 'Pack Entreprise', desc: 'Pour les grands volumes de recrutement', count: 200, price: '649 $', popular: false },
];

export const INITIAL_PURCHASES = [
  { date: '01/03/2026', desc: 'Pack Recruteur', qty: '+50 tickets', status: 'Payé' },
  { date: '15/01/2026', desc: 'Pack Découverte', qty: '+10 tickets', status: 'Payé' },
];

export const STATUS_BADGE = {
  verified: 'badge-verified',
  pending: 'badge-pending',
  failed: 'badge-failed',
  incomplete: 'badge-incomplete',
};

