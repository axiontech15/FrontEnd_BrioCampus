import UniversityLayout from './UniversityLayout';
import { useApp } from '../../context/AppContext';

export default function UniversityStats() {
  const { palmares, univStats } = useApp();
  const graduates = Math.max(univStats.graduatesTotal, palmares.length);

  return (
    <UniversityLayout>
      <div className="sa-page-header">
        <div>
          <div className="sa-breadcrumbs">UNIVERSITÉ › <span>STATISTIQUES</span></div>
          <h1 className="sa-page-title">Statistiques</h1>
          <p className="sa-page-desc">Consultation du palmarès par les RH et volume de diplômés.</p>
        </div>
      </div>

      <div className="sa-stats-row">
        <div className="sa-stat-card">
          <div className="sa-stat-title">RH AYANT CONSULTÉ LE PALMARÈS</div>
          <div className="sa-stat-val">{univStats.rhConsulted}</div>
        </div>
        <div className="sa-stat-card">
          <div className="sa-stat-title">ÉTUDIANTS DIPLÔMÉS</div>
          <div className="sa-stat-val">{graduates}</div>
        </div>
      </div>
    </UniversityLayout>
  );
}
