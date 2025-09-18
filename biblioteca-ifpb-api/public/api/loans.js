import { request } from './http.js';

export function createLoan(bookId, loanPeriodDays=30) {
  return request('/loans', { method: 'POST', body: { bookId, loanPeriodDays }, auth: true });
}

export function listMyLoans(status) {
  const qs = status ? `?status=${encodeURIComponent(status)}` : '';
  return request('/loans' + qs, { auth: true });
}

export function returnLoan(id) {
  return request(`/loans/${id}/return`, { method: 'PATCH', auth: true });
}