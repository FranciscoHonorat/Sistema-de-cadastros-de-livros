import { request } from './http.js';

export function listBooks(filters = {}) {
  const params = new URLSearchParams();
  const add = (k, v) => {
    if (v == null) return;
    const s = String(v).trim();
    if (s !== '') params.set(k, s);
  };
  add('title', filters.title);
  add('author', filters.author);
  add('category', filters.category);
  add('status', filters.status);

  const qs = params.toString();
  // CONFIRME QUE ESTE CONSOLE.LOG EXISTE
  console.log('[API] Montando requisição para:', '/books' + (qs ? `?${qs}` : ''));
  return request('/books' + (qs ? `?${qs}` : ''));
}

export function createBook(payload) {
  return request('/books', { method: 'POST', body: payload, auth: true });
}

export function deleteBook(id) {
  return request(`/books/${id}`, { method: 'DELETE', auth: true });
}

export function updateBookStatus(id, status) {
  return request(`/books/${id}/status`, { method: 'PATCH', body: { status }, auth: true });
}