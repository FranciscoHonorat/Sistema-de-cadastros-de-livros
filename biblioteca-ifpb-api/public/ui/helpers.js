export const $  = (sel, root=document) => root.querySelector(sel);
export const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

export function showMessage(msg, type='info') {
  const box = $('#feedback');
  if (!box) return;
  box.className = `feedback ${type}`;
  box.textContent = msg;
  clearTimeout(box._t);
  box._t = setTimeout(() => {
    box.textContent = '';
    box.className = 'feedback';
  }, 4000);
}

export function toggle(el, show=true) {
  if (!el) return;
  el.style.display = show ? '' : 'none';
}

function _decode(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch { return null; }
}

export function decodeJWT(token) { return _decode(token); }
export function decodeJwt(token) { return _decode(token); }