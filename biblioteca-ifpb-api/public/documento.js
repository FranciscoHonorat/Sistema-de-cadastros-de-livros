console.log('[INIT] documento.js carregado');

import { initAdminUI, renderAdminBooks } from './ui/admin.js';
import { initAuthUI, renderAuthState } from './ui/auth.js';
import { initBooksUI, renderBooks } from './ui/books.js';
import { renderFines } from './ui/fines.js';
import { $, toggle } from './ui/helpers.js';
import { initLoansUI, renderLoans } from './ui/loans.js';

window.addEventListener('error', (e) => {
  console.error('[GLOBAL ERROR]', e.message, e.filename, e.lineno);
});

function showSection(id) {
  const sections = ['secBooks','secLoans','secFines','secAdmin'];
  sections.forEach(s => toggle($('#'+s), s === id));
  console.log('[NAV] seção ativa:', id);
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('[DOM] pronto');

  initAuthUI({
    onAuthChange: () => {
      console.log('[AUTH] changed');
      renderAuthState();
      renderBooks();
      renderLoans();
      renderFines();
      renderAdminBooks();
    }
  });

  initBooksUI();
  initLoansUI();
  initAdminUI();

  // Listeners de navegação
  $('#navBooks')?.addEventListener('click', () => {
    console.log('[CLICK] Livros');
    showSection('secBooks');
    renderBooks();
  });
  $('#navLoans')?.addEventListener('click', () => {
    console.log('[CLICK] Empréstimos');
    showSection('secLoans');
    renderLoans();
  });
  $('#navFines')?.addEventListener('click', () => {
    console.log('[CLICK] Multas');
    showSection('secFines');
    renderFines();
  });
  $('#navAdmin')?.addEventListener('click', () => {
    console.log('[CLICK] Admin');
    showSection('secAdmin');
    renderAdminBooks();
  });

  // Eventos globais
  document.addEventListener('refreshBooks', renderBooks);
  document.addEventListener('refreshLoans', renderLoans);

  // Primeira render
  showSection('secBooks'); // Exibir livros inicialmente
  renderAuthState();
  renderBooks();
});