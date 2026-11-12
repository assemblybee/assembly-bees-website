const m=document.querySelector('#menu'),n=document.querySelector('nav');m.onclick=()=>n.classList.toggle('open');n.querySelectorAll('a').forEach(a=>a.onclick=()=>n.classList.remove('open'));document.querySelector('#year').textContent=new Date().getFullYear();
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
