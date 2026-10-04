// PWA and Offline Management

export function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('[Cogniva] Service Worker registered:', reg.scope);
        })
        .catch((err) => {
          console.warn('[Cogniva] Service Worker registration failed:', err);
        });
    });
  }
}
