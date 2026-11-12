const menu = document.querySelector('#menu');
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
