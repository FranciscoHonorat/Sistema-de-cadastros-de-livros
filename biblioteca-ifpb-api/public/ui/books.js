import { listBooks } from '../api/books.js';
import { createLoan } from '../api/loans.js';
import { $, showMessage } from './helpers.js';

export function initBooksUI() {
  const filterBtn = $('#btnFilterBooks');
  const clearBtn = $('#btnClearFilters');
  filterBtn?.addEventListener('click', () => { console.log('[CLICK] Filtrar'); renderBooks(); });
  clearBtn?.addEventListener('click', () => {
    console.log('[CLICK] Limpar filtros');
    $('#filterTitle').value = '';
    $('#filterAuthor').value = '';
    $('#filterCategory').value = '';
    $('#filterStatus').value = '';
    renderBooks();
  });
}

export async function renderBooks() {
  const box = $('#booksList');
  if (!box) return;
  box.textContent = 'Carregando...';

  const filters = {};
  const t = $('#filterTitle')?.value?.trim();
  const a = $('#filterAuthor')?.value?.trim();
  const c = $('#filterCategory')?.value?.trim();
  const s = $('#filterStatus')?.value;
  if (t) filters.title = t;
  if (a) filters.author = a;
  if (c) filters.category = c;
  if (s) filters.status = s;

  try {
    const data = await listBooks(filters);
    box.innerHTML = '';
    if (!data.length) {
      box.textContent = 'Nenhum livro.';
      return;
    }
    data.forEach(b => {
      const row = document.createElement('div');
      row.className = 'book-row';
      row.innerHTML = `<strong>${b.title}</strong> - ${b.author} [${b.status}]`;
      if (b.status === 'Disponível' && localStorage.getItem('token')) {
        const btn = document.createElement('button');
        btn.textContent = 'Alugar';
        btn.onclick = async () => {
          try {
            await createLoan(b.id);
            showMessage('Empréstimo criado', 'success');
            renderBooks();
            document.dispatchEvent(new Event('refreshLoans'));
          } catch(e) { showMessage(e.message, 'error'); }
        };
        row.appendChild(btn);
      }
      box.appendChild(row);
    });
  } catch(e) {
    box.textContent = e.message;
    console.error('[BOOKS] erro', e);
  }
}