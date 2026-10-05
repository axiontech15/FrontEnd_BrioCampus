import AdminLayout from './AdminLayout';
import { useApp } from '../../context/AppContext';
import { INITIAL_PURCHASES, TICKET_PACKS } from '../../data/mock';

export default function AdminTickets() {
  const { purchases, adminPurchases } = useApp();
  const allPurchases = [
    ...adminPurchases,
    ...purchases,
    ...INITIAL_PURCHASES.filter((pp) => !purchases.some((x) => x.date === pp.date && x.desc === pp.desc)),
  ];

  return (
    <AdminLayout>
      <div className="sa-page-header">
        <div>
          <div className="sa-breadcrumbs">ADMIN › <span>TICKETS</span></div>
          <h1 className="sa-page-title">Tickets</h1>
          <p className="sa-page-desc">Catalogue des packs et historique des achats (1 ticket = 1 vérification).</p>
        </div>
      </div>
      <div className="grid-3 mb-6">
        {TICKET_PACKS.map((p) => (
          <div className="card text-center" key={p.id}>
            {p.popular && <span className="badge badge-pending mb-4">Le plus choisi</span>}
            <h4>{p.name}</h4>
            <div className="stat-number">{p.price} <small style={{ fontSize: 13 }}>/ {p.count}</small></div>
            <p className="text-secondary" style={{ fontSize: 12 }}>{p.desc}</p>
          </div>
        ))}
      </div>
      <div className="sa-table-container">
        <table className="sa-table">
          <thead><tr><th>DATE</th><th>DESCRIPTION</th><th>QUANTITÉ</th><th>STATUT</th></tr></thead>
          <tbody>
            {allPurchases.map((p, i) => (
              <tr key={i}><td>{p.date}</td><td>{p.desc}</td><td>{p.qty}</td><td><span className="badge badge-verified">{p.status}</span></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
