import { listMyLoans, returnLoan } from '../api/loans.js';
import { $, showMessage } from './helpers.js';

export function initLoansUI() {
  document.addEventListener('refreshLoans', renderLoans);
}

export async function renderLoans() {
  const box = $('#loansList');
  if (!box) return;
  box.textContent = 'Carregando...';
  try {
    const loans = await listMyLoans();
    box.innerHTML = '';
    if (!loans.length) {
      box.textContent = 'Sem empréstimos.';
      return;
    }
    loans.forEach(l => {
      const div = document.createElement('div');
      const late = new Date() > new Date(l.dueDate) && l.status !== 'Returned';
      div.className = 'loan-row';
      div.innerHTML = `
        <strong>${l.book?.title || '(Livro)'}</strong>
        - Vence: ${new Date(l.dueDate).toLocaleDateString()}
        - Status: ${l.status} ${late ? '<span class="late">ATRASADO</span>' : ''}
      `;
      if (l.status !== 'Returned') {
        const btn = document.createElement('button');
        btn.textContent = 'Devolver';
        btn.onclick = async () => {
          try {
            const result = await returnLoan(l.id);
            showMessage('Devolvido' + (result?.fine ? ' (Multa gerada)' : ''), 'success');
            renderLoans();
            document.dispatchEvent(new Event('refreshBooks'));
          } catch (e) {
            showMessage(e.message, 'error');
          }
        };
        div.appendChild(btn);
      }
      box.appendChild(div);
    });
  } catch (e) {
    box.textContent = e.message;
  }
}