/** API base URL — FastAPI prefix `/api`. Override with VITE_API_BASE_URL. */
export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8080/api'
).replace(/\/$/, '');

/** When true, login/pages keep local mock data instead of calling the API. */
export const USE_MOCK = String(import.meta.env.VITE_USE_MOCK || 'false').toLowerCase() === 'true';

/** Map API role names (ADMIN / RH / UNIVERSITY) → frontend route roles. */
export function mapApiRole(roleName) {
  const key = String(roleName || '').toUpperCase();
  if (key === 'ADMIN') return 'admin';
  if (key === 'RH') return 'rh';
  if (key === 'UNIVERSITY') return 'university';
  return 'rh';
}

export function homeForRole(role) {
  if (role === 'admin') return '/admin';
  if (role === 'university') return '/university';
  return '/dashboard';
}

export function formatApiError(err) {
  if (!err) return 'Erreur inconnue';
  const detail = err.detail ?? err.message;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) {
    return detail.map((d) => d.msg || JSON.stringify(d)).join(' · ');
  }
  return String(detail);
}
