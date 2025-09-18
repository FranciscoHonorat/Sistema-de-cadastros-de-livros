import { request } from './http.js';

export function listMyFines() {
  return request('/fines', { auth: true });
}