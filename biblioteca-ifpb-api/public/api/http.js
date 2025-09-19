const ORIGIN = (typeof window !== 'undefined') ? window.location.origin : 'http://localhost:3000';
const API_BASE = ORIGIN + '/api';

function getToken() { return localStorage.getItem('token'); }

export async function request(path, { method='GET', body, auth=false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const t = getToken();
    if (t) headers.Authorization = `Bearer ${t}`;
  }
  let res;
  try {
    res = await fetch(API_BASE + path, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });
  } catch (netErr) {
    console.error('[HTTP] Falha de rede', netErr);
    throw new Error('Falha de rede: não foi possível conectar ao servidor');
  }
  let data = null;
  try { data = await res.json(); } catch {}
  if (!res.ok) {
    if (res.status === 401) localStorage.removeItem('token');
    throw new Error(data?.message || data?.error || `Erro ao buscar livros: ${res.statusText || res.status}`);
  }
  return data;
}