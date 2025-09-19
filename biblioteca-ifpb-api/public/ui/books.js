import { listBooks } from '../api/books.js';
import { $, showMessage } from './helpers.js';

export function initBooksUI() {
  $('#btnFilterBooks')?.addEventListener('click', () => renderBooks());
  $('#btnClearFilters')?.addEventListener('click', () => {
    $('#filterTitle').value = '';
    $('#filterAuthor').value = '';
    $('#filterCategory').value = '';
    $('#filterStatus').value = '';
    renderBooks();
  });
}

function getFilters() {
  const filters = {
    title: $('#filterTitle')?.value || '',
    author: $('#filterAuthor')?.value || '',
    category: $('#filterCategory')?.value || '',
    status: $('#filterStatus')?.value || ''
  };
  // ADICIONE ESTE CONSOLE.LOG
  console.log('[UI] Filtros lidos do formulário:', filters);
  return filters;
}

export async function renderBooks() {
  const box = $('#booksList');
  if (!box) return;
  box.textContent = 'Carregando...';
  try {
    const data = await listBooks(getFilters());
    box.innerHTML = '';
    if (!Array.isArray(data) || data.length === 0) {
      box.textContent = 'Nenhum livro foi encontrado.';
      return;
    }
    data.forEach(b => {
      const row = document.createElement('div');
      row.className = 'book-row';
      row.innerHTML = `<strong>${b.title}</strong> — ${b.author} [${b.status}]`;
      box.appendChild(row);
    });
  } catch (e) {
    console.error('[BOOKS] erro', e);
    showMessage(e.message, 'error');
    box.textContent = 'Falha ao carregar livros.';
  }
}