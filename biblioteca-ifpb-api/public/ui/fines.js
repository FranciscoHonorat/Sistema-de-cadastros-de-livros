import { listMyFines } from '../api/fines.js';
import { $, showMessage } from './helpers.js';

export async function renderFines() {
  const box = $('#finesList');
  if (!box) return;
  box.textContent = 'Carregando...';
  try {
    const fines = await listMyFines();
    box.innerHTML = '';
    if (!fines.length) {
      box.textContent = 'Sem multas.';
      return;
    }
    fines.forEach(f => {
      const div = document.createElement('div');
      div.className = 'fine-row';
      div.textContent = `#${f.id} - R$ ${Number(f.amount).toFixed(2)} - ${f.status}`;
      box.appendChild(div);
    });
  } catch (e) {
    box.textContent = e.message;
  }
}