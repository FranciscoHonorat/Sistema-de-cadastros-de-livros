import { listBooks, createBook, deleteBook, updateBookStatus } from '../api/books.js';
import { $, showMessage } from './helpers.js';

export function initAdminUI() {
  const form = $('#formCreateBook');
  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    if (payload.version) payload.version = Number(payload.version);
    try {
      await createBook(payload);
      showMessage('Livro criado', 'success');
      form.reset();
      renderAdminBooks();
    } catch (e) {
      showMessage(e.message, 'error');
    }
  });
}

export async function renderAdminBooks() {
  const box = $('#adminBooksList');
  if (!box) return;
  box.textContent = 'Carregando...';
  try {
    const books = await listBooks();
    box.innerHTML = '';
    books.forEach(b => {
      const row = document.createElement('div');
      row.className = 'admin-book-row';
      row.innerHTML = `
        <strong>${b.title}</strong> - ${b.author} [${b.status}]
        <select data-status>
          <option value="">(status)</option>
          <option value="Disponível">Disponível</option>
          <option value="Emprestado">Emprestado</option>
          <option value="Indisponível">Indisponível</option>
        </select>
      `;
      const sel = row.querySelector('select');
      sel.addEventListener('change', async () => {
        if (!sel.value) return;
        try {
          await updateBookStatus(b.id, sel.value);
          showMessage('Status atualizado', 'success');
          renderAdminBooks();
        } catch (e) {
          showMessage(e.message, 'error');
        }
      });
      const del = document.createElement('button');
      del.textContent = 'Excluir';
      del.onclick = async () => {
        if (!confirm('Confirmar exclusão?')) return;
        try {
          await deleteBook(b.id);
          showMessage('Livro removido', 'success');
          renderAdminBooks();
        } catch (e) {
          showMessage(e.message, 'error');
        }
      };
      row.appendChild(del);
      box.appendChild(row);
    });
  } catch (e) {
    box.textContent = e.message;
  }
}