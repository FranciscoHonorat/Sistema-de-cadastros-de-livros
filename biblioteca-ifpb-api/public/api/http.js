const API_BASE = 'http://localhost:3000/api';

function getToken() { return localStorage.getItem('token'); }

export async function request(path, { method='GET', body, auth=false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const t = getToken();
    if (t) headers.Authorization = `Bearer ${t}`;
  }
  const res = await fetch(API_BASE + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });
  let data = null;
  try { data = await res.json(); } catch {}
  if (!res.ok) {
    if (res.status === 401) localStorage.removeItem('token');
    throw new Error(data?.message || data?.error || `Erro ${res.status}`);
  }
  return data;
}