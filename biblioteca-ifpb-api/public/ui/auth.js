import { login, logout } from '../api/auth.js';
import { $, $$, decodeJwt, showMessage } from './helpers.js';

export function initAuthUI({ onAuthChange }) {
  const btnLogin = $('#btnLogin');
  const btnLogout = $('#btnLogout');
  const modal = $('#loginModal');
  const close = $('#closeLogin');
  const form = $('#loginForm');

  btnLogin?.addEventListener('click', () => { console.log('Login click'); modal.style.display='block'; });
  close?.addEventListener('click', () => { modal.style.display='none'; });

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const email = $('#loginEmail').value;
    const password = $('#loginPassword').value;
    try {
      await login(email, password);
      modal.style.display='none';
      showMessage('Login efetuado', 'success');
      onAuthChange();
    } catch(err) {
      showMessage(err.message, 'error');
      console.error('Login error', err);
    }
  });

  btnLogout?.addEventListener('click', () => {
    logout();
    showMessage('Sessão encerrada', 'info');
    onAuthChange();
  });
}

export function renderAuthState() {
  const token = localStorage.getItem('token');
  const payload = token ? decodeJwt(token) : null;
  const isAuth = !!token;
  const role = payload?.role;
  const userInfo = $('#userInfo');

  $$('[data-auth="true"]').forEach(el => el.style.display = isAuth ? '' : 'none');
  $$('[data-auth="false"]').forEach(el => el.style.display = isAuth ? 'none' : '');
  const adminBtn = $('#navAdmin');
  if (adminBtn) adminBtn.style.display = isAuth && role === 'admin' ? '' : 'none';

  if (userInfo) userInfo.textContent = isAuth ? (payload?.name || payload?.email || 'Usuário') + ` (${role || 'user'})` : '';

  // Se não autenticado garante seções protegidas escondidas
  if (!isAuth) {
    const secLoans = $('#secLoans');
    const secFines = $('#secFines');
    const secAdmin = $('#secAdmin');
    if (secLoans) secLoans.style.display='none';
    if (secFines) secFines.style.display='none';
    if (secAdmin) secAdmin.style.display='none';
  }
}