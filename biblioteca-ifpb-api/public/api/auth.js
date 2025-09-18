import { request } from './http.js';

export async function login(email, password) {
    const data = await request('/auth/login', {
        method: 'POST',
        body: { email, password }
    });
    localStorage.setItem('token', data.token);
    return data;
}

export function logout() {
    localStorage.removeItem('token');
}

export function getToken() {
    return localStorage.getItem('token');
}

export function getUserPayload() {
    const token = getToken();
    if (!token) return null;
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
        return null;
    }
}