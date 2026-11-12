const menu = document.querySelector('#menu');
// Progressive enhancement: original image links still work without JavaScript.
(() => {
  if (typeof HTMLDialogElement === 'undefined') return;
  const dialog = document.createElement('dialog');
  dialog.className = 'photo-viewer';
  dialog.setAttribute('aria-label', 'Project photo viewer');
  dialog.innerHTML = '<div class="viewer-top"><p id="photo-title"></p><button type="button" aria-label="Close photo viewer">×</button></div><img class="viewer-image" alt=""><div class="viewer-controls"><button type="button" aria-label="Previous photo">←</button><span class="viewer-count" aria-live="polite"></span><button type="button" aria-label="Next photo">→</button></div>';
  document.body.append(dialog);
  const image = dialog.querySelector('img');
  const [close, previous, next] = dialog.querySelectorAll('button');
  let photos = [], position = 0, origin;
  function render() {
    const link = photos[position];
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    dialog.querySelector('#photo-title').textContent = image.alt;
    dialog.querySelector('.viewer-count').textContent = `${position + 1} / ${photos.length}`;
    previous.disabled = next.disabled = photos.length < 2;
  }
  function move(delta) { position = (position + delta + photos.length) % photos.length; render(); }
  document.addEventListener('click', event => {
    const link = event.target.closest?.('[data-gallery-photo]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    origin = link;
    photos = [...link.closest('.project-photos').querySelectorAll('[data-gallery-photo]')];
    position = photos.indexOf(link);
    render(); dialog.showModal(); document.body.classList.add('gallery-open'); close.focus();
  });
  close.addEventListener('click', () => dialog.close());
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { document.body.classList.remove('gallery-open'); origin?.focus(); });
})();
// Measures call-link clicks, not connected or completed telephone calls.
(() => {
  if (window.assemblyBeesCallTrackingInstalled) return;
  window.assemblyBeesCallTrackingInstalled = true;
  let lastClick = -Infinity;
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href^="tel:"]');
    if (!link || event.defaultPrevented) return;
    const now = Date.now();
    if (now - lastClick < 1500) return;
    lastClick = now;
    if (typeof window.gtag !== 'function') return;
    try {
      window.gtag('event', 'conversion', {
        send_to: 'AW-18299353488/pVJ4CO6Z2dccEJDz55VE',
        transport_type: 'beacon'
      });
    } catch (_) {
      // Tracking must never prevent the phone link from working.
    }
    // Keep the native tel: action, even if Google is blocked or unavailable.
  });
})();
const nav = document.querySelector('header nav');
if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    }
  });
}
