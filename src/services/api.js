import { API_BASE_URL, formatApiError } from './config';
import { navigate } from '../router';

const ACCESS_KEY = 'bc_access_token';
const REFRESH_KEY = 'bc_refresh_token';

export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

export function setTokens({ access_token, refresh_token }) {
  if (access_token) localStorage.setItem(ACCESS_KEY, access_token);
  if (refresh_token) localStorage.setItem(REFRESH_KEY, refresh_token);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

export class ApiError extends Error {
  constructor(status, detail, body) {
    super(formatApiError({ detail }));
    this.name = 'ApiError';
    this.status = status;
    this.detail = detail;
    this.body = body;
  }
}

let refreshPromise = null;

async function refreshAccessToken() {
  const refresh_token = getRefreshToken();
  if (!refresh_token) throw new ApiError(401, 'Session expirée');

  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ refresh_token }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    clearTokens();
    throw new ApiError(res.status, body.detail || 'Refresh failed', body);
  }
  setTokens(body);
  return body.access_token;
}

/**
 * Low-level fetch against FastAPI.
 * @param {string} path - path under /api (e.g. '/auth/login')
 * @param {{ method?: string, body?: unknown, auth?: boolean, headers?: Record<string,string>, retry?: boolean }} options
 */
export async function api(path, options = {}) {
  const {
    method = 'GET',
    body,
    auth = true,
    headers: extraHeaders = {},
    retry = true,
  } = options;

  const headers = {
    Accept: 'application/json',
    ...extraHeaders,
  };

  let payload = body;
  if (body !== undefined && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }

  if (auth) {
    const token = getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`, {
    method,
    headers,
    body: payload,
  });

  if (res.status === 401 && auth && retry) {
    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => { refreshPromise = null; });
      }
      await refreshPromise;
      return api(path, { ...options, retry: false });
    } catch {
      clearTokens();
      navigate('/login');
      throw new ApiError(401, 'Session expirée — reconnectez-vous');
    }
  }

  if (res.status === 204) return null;

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(res.status, data.detail || res.statusText, data);
  }
  return data;
}

export const authApi = {
  login: (email, password) => api('/auth/login', {
    method: 'POST',
    auth: false,
    body: { email, password },
  }),
  me: () => api('/auth/me'),
  updateMe: (body) => api('/auth/me', { method: 'PUT', body }),
  requestPasswordReset: (email) => api('/auth/password-reset/request', {
    method: 'POST',
    auth: false,
    body: { email },
  }),
  confirmPasswordReset: (email, code, new_password) => api('/auth/password-reset/confirm', {
    method: 'POST',
    auth: false,
    body: { email, code, new_password },
  }),
  sendOtp: (email) => api('/auth/otp/send', {
    method: 'POST',
    auth: false,
    body: { email },
  }),
  verifyOtp: (email, code) => api('/auth/otp/verify', {
    method: 'POST',
    auth: false,
    body: { email, code },
  }),
};

export const rolesApi = {
  list: () => api('/roles'),
  create: (body) => api('/roles', { method: 'POST', body }),
  update: (id, body) => api(`/roles/${id}`, { method: 'PUT', body }),
  remove: (id) => api(`/roles/${id}`, { method: 'DELETE' }),
};

export const usersApi = {
  list: () => api('/users'),
  create: (body) => api('/users', { method: 'POST', body }),
  update: (id, body) => api(`/users/${id}`, { method: 'PUT', body }),
  remove: (id) => api(`/users/${id}`, { method: 'DELETE' }),
  createProfile: (body) => api('/users/profiles', { method: 'POST', body }),
  updateProfile: (id, body) => api(`/users/profiles/${id}`, { method: 'PUT', body }),
  removeProfile: (id) => api(`/users/profiles/${id}`, { method: 'DELETE' }),
};

export const categoriesApi = {
  list: () => api('/categories'),
  create: (body) => api('/categories', { method: 'POST', body }),
  update: (id, body) => api(`/categories/${id}`, { method: 'PUT', body }),
  remove: (id) => api(`/categories/${id}`, { method: 'DELETE' }),
};

export const universitiesApi = {
  list: () => api('/universities'),
  me: () => api('/universities/me'),
  updateMe: (body) => api('/universities/me', { method: 'PUT', body }),
  create: (body) => api('/universities', { method: 'POST', body }),
  update: (id, body) => api(`/universities/${id}`, { method: 'PUT', body }),
  remove: (id) => api(`/universities/${id}`, { method: 'DELETE' }),
  stats: () => api('/universities/stats'),
  importPalmares: (file) => {
    const fd = new FormData();
    fd.append('file', file);
    return api('/universities/palmares/import', { method: 'POST', body: fd });
  },
};

export const ticketsApi = {
  list: () => api('/tickets'),
  balance: () => api('/tickets/balance'),
  purchase: (body) => api('/tickets/purchase', { method: 'POST', body }),
};

export const rhApi = {
  search: (body) => api('/rh/search', { method: 'POST', body }),
  stats: () => api('/rh/stats'),
};

export const logsApi = {
  list: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return api(`/logs${q ? `?${q}` : ''}`);
  },
  archive: () => api('/logs/archive', { method: 'POST' }),
  purge: () => api('/logs/purge', { method: 'DELETE' }),
};
