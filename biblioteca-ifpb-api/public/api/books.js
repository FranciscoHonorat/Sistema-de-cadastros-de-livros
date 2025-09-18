import { request } from './http.js';

export function listBooks(filters={}) {
  const qs = new URLSearchParams(filters).toString();
  return request('/books' + (qs ? '?' + qs : ''));
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