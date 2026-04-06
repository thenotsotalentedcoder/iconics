const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function getToken() {
  return localStorage.getItem('admin_token');
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = { ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

// ── Public endpoints ──────────────────────────────────────────────────────────
export const api = {
  getSpeakers: () => request('/api/public/speakers'),
  getWorkshops: () => request('/api/public/workshops'),
  getDates: () => request('/api/public/dates'),
  getTracks: () => request('/api/public/tracks'),

  // ── Admin auth ──────────────────────────────────────────────────────────────
  adminLogin: (secret) =>
    request('/api/admin/login', { method: 'POST', body: JSON.stringify({ secret }) }),

  // ── Admin speakers ──────────────────────────────────────────────────────────
  adminGetSpeakers: () => request('/api/admin/speakers'),
  adminCreateSpeaker: (formData) =>
    request('/api/admin/speakers', { method: 'POST', body: formData }),
  adminUpdateSpeaker: (id, formData) =>
    request(`/api/admin/speakers/${id}`, { method: 'PUT', body: formData }),
  adminDeleteSpeaker: (id) =>
    request(`/api/admin/speakers/${id}`, { method: 'DELETE' }),

  // ── Admin workshops ─────────────────────────────────────────────────────────
  adminGetWorkshops: () => request('/api/admin/workshops'),
  adminCreateWorkshop: (formData) =>
    request('/api/admin/workshops', { method: 'POST', body: formData }),
  adminUpdateWorkshop: (id, formData) =>
    request(`/api/admin/workshops/${id}`, { method: 'PUT', body: formData }),
  adminDeleteWorkshop: (id) =>
    request(`/api/admin/workshops/${id}`, { method: 'DELETE' }),

  // Sessions
  adminCreateSession: (workshopId, formData) =>
    request(`/api/admin/workshops/${workshopId}/sessions`, { method: 'POST', body: formData }),
  adminUpdateSession: (workshopId, sessionId, formData) =>
    request(`/api/admin/workshops/${workshopId}/sessions/${sessionId}`, { method: 'PUT', body: formData }),
  adminDeleteSession: (workshopId, sessionId) =>
    request(`/api/admin/workshops/${workshopId}/sessions/${sessionId}`, { method: 'DELETE' }),

  // ── Admin dates ─────────────────────────────────────────────────────────────
  adminGetDates: () => request('/api/admin/dates'),
  adminCreateDate: (body) =>
    request('/api/admin/dates', { method: 'POST', body: JSON.stringify(body) }),
  adminUpdateDate: (id, body) =>
    request(`/api/admin/dates/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  adminDeleteDate: (id) =>
    request(`/api/admin/dates/${id}`, { method: 'DELETE' }),

  // ── Admin tracks ────────────────────────────────────────────────────────────
  adminGetTracks: () => request('/api/admin/tracks'),
  adminCreateTrack: (body) =>
    request('/api/admin/tracks', { method: 'POST', body: JSON.stringify(body) }),
  adminUpdateTrack: (id, body) =>
    request(`/api/admin/tracks/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  adminDeleteTrack: (id) =>
    request(`/api/admin/tracks/${id}`, { method: 'DELETE' }),
  adminAddTopic: (trackId, body) =>
    request(`/api/admin/tracks/${trackId}/topics`, { method: 'POST', body: JSON.stringify(body) }),
  adminUpdateTopic: (trackId, topicId, body) =>
    request(`/api/admin/tracks/${trackId}/topics/${topicId}`, { method: 'PUT', body: JSON.stringify(body) }),
  adminDeleteTopic: (trackId, topicId) =>
    request(`/api/admin/tracks/${trackId}/topics/${topicId}`, { method: 'DELETE' }),

  // ── Admin registrations ─────────────────────────────────────────────────────
  adminGetWorkshopRegs: () => request('/api/admin/registrations/workshop'),
  adminGetParticipantRegs: () => request('/api/admin/registrations/participant'),
  adminGetPaperRegs: () => request('/api/admin/registrations/paper'),

  adminExportWorkshopRegs: () => `${BASE}/api/admin/registrations/workshop/export`,
  adminExportParticipantRegs: () => `${BASE}/api/admin/registrations/participant/export`,
  adminExportPaperRegs: () => `${BASE}/api/admin/registrations/paper/export`,
};
