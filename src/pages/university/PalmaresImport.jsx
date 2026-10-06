import { useState } from 'react';
import UniversityLayout from './UniversityLayout';
import { useApp } from '../../context/AppContext';
import { universitiesApi } from '../../services/api';
import { USE_MOCK, formatApiError } from '../../services/config';

const REQUIRED = ['matricule', 'full_name', 'faculty', 'diploma_date'];

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return { rows: [], errors: ['Fichier vide ou sans données.'] };
  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
  const missing = REQUIRED.filter((h) => !headers.includes(h));
  if (missing.length) {
    return { rows: [], errors: [`Colonnes manquantes : ${missing.join(', ')}`] };
  }
  const rows = [];
  const errors = [];
  const seen = new Set();
  for (let i = 1; i < lines.length; i += 1) {
    const cols = lines[i].split(',').map((c) => c.trim());
    const row = Object.fromEntries(headers.map((h, idx) => [h, cols[idx] || '']));
    const lineNo = i + 1;
    if (!row.matricule || !row.full_name || !row.faculty || !row.diploma_date) {
      errors.push(`Ligne ${lineNo} : champs obligatoires incomplets.`);
      continue;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(row.diploma_date)) {
      errors.push(`Ligne ${lineNo} : diploma_date doit être YYYY-MM-DD.`);
      continue;
    }
    if (seen.has(row.matricule)) {
      errors.push(`Ligne ${lineNo} : doublon matricule ${row.matricule}.`);
      continue;
    }
    seen.add(row.matricule);
    rows.push({
      matricule: row.matricule,
      full_name: row.full_name,
      faculty: row.faculty,
      diploma_date: row.diploma_date,
    });
  }
  return { rows, errors };
}

export default function PalmaresImport() {
  const { palmares, setPalmares } = useApp();
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setLoading(true);
    try {
      if (!USE_MOCK) {
        const result = await universitiesApi.importPalmares(file);
        setReport({
          imported: result.imported ?? result.created ?? 0,
          errors: result.errors || result.details || [],
        });
        if (Array.isArray(result.rows)) {
          setPalmares((list) => {
            const existing = new Set(list.map((p) => p.matricule));
            return [...list, ...result.rows.filter((r) => !existing.has(r.matricule))];
          });
        }
      } else {
        const text = await file.text();
        const { rows, errors } = parseCsv(text);
        const existing = new Set(palmares.map((p) => p.matricule));
        const fresh = rows.filter((r) => !existing.has(r.matricule));
        const dupExisting = rows.length - fresh.length;
        if (dupExisting) errors.push(`${dupExisting} ligne(s) déjà présentes dans le registre.`);
        setPalmares((list) => [...list, ...fresh]);
        setReport({ imported: fresh.length, errors });
      }
    } catch (err) {
      setError(formatApiError(err));
    } finally {
      setLoading(false);
      e.target.value = '';
    }
  };

  return (
    <UniversityLayout>
      <div className="sa-page-header">
        <div>
          <div className="sa-breadcrumbs">UNIVERSITÉ › <span>PALMARÈS</span></div>
          <h1 className="sa-page-title">Import du palmarès</h1>
          <p className="sa-page-desc">
            CSV requis : matricule, full_name, faculty, diploma_date (YYYY-MM-DD)
            {!USE_MOCK && ' — endpoint /api/universities/palmares/import'}.
          </p>
        </div>
      </div>

      {error && <div className="alert alert-danger mb-4" role="alert"><span>{error}</span></div>}

      <div className="card mb-6">
        <label className="form-label" htmlFor="csv">Fichier CSV</label>
        <input id="csv" type="file" accept=".csv,text/csv" className="form-control" onChange={onFile} disabled={loading} />
      </div>

      {report && (
        <div className="alert alert-info mb-4">
          <span>
            {report.imported} ligne(s) importée(s).
            {Array.isArray(report.errors) && report.errors.length > 0 && (
              <>
                <br />
                <strong>Détails :</strong>
                <ul style={{ margin: '8px 0 0', paddingLeft: 18 }}>
                  {report.errors.map((err) => <li key={String(err)}>{typeof err === 'string' ? err : JSON.stringify(err)}</li>)}
                </ul>
              </>
            )}
          </span>
        </div>
      )}

      <div className="sa-table-container">
        <table className="sa-table">
          <thead>
            <tr><th>MATRICULE</th><th>NOM COMPLET</th><th>FACULTÉ</th><th>DATE DIPLÔME</th></tr>
          </thead>
          <tbody>
            {palmares.map((p) => (
              <tr key={p.matricule}>
                <td><span className="ref-code">{p.matricule}</span></td>
                <td>{p.full_name}</td>
                <td>{p.faculty}</td>
                <td>{p.diploma_date}</td>
              </tr>
            ))}
            {palmares.length === 0 && (
              <tr><td colSpan="4" className="text-center text-secondary" style={{ padding: 24 }}>Aucun diplômé importé.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </UniversityLayout>
  );
}
