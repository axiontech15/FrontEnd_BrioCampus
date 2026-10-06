import { useState } from 'react';
import UniversityLayout from './UniversityLayout';
import { useApp } from '../../context/AppContext';

export default function UniversityProfile() {
  const { univProfile, setUnivProfile } = useApp();
  const [form, setForm] = useState(univProfile);
  const [saved, setSaved] = useState(false);

  const onChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setUnivProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <UniversityLayout>
      <div className="sa-page-header">
        <div>
          <div className="sa-breadcrumbs">UNIVERSITÉ › <span>PROFIL</span></div>
          <h1 className="sa-page-title">Profil de l&apos;université</h1>
          <p className="sa-page-desc">Mettre à jour les informations visibles sur la plateforme.</p>
        </div>
      </div>

      {saved && (
        <div className="alert alert-info mb-4"><span>Profil enregistré.</span></div>
      )}

      <form className="card" onSubmit={submit} style={{ maxWidth: 560 }}>
        <div className="form-group">
          <label className="form-label" htmlFor="univ-name">Nom de l&apos;établissement</label>
          <input id="univ-name" className="form-control" value={form.name} onChange={onChange('name')} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="univ-code">Code</label>
          <input id="univ-code" className="form-control" value={form.code} onChange={onChange('code')} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="univ-city">Ville</label>
          <input id="univ-city" className="form-control" value={form.city} onChange={onChange('city')} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="univ-email">Email de contact</label>
          <input id="univ-email" type="email" className="form-control" value={form.contactEmail} onChange={onChange('contactEmail')} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="univ-phone">Téléphone</label>
          <input id="univ-phone" className="form-control" value={form.phone} onChange={onChange('phone')} />
        </div>
        <button type="submit" className="btn btn-primary">Enregistrer</button>
      </form>
    </UniversityLayout>
  );
}
