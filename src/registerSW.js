// Service Worker Registrierung
// sw.js liegt in /public/ → Vite kopiert ihn unverändert nach /dist/
// → er ist erreichbar unter /einmaleins/sw.js (passend zum base-Pfad)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/einmaleins/sw.js', { scope: '/einmaleins/' })
      .then((reg) => {
        console.log('[PWA] Service Worker registriert:', reg.scope)

        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing
          newWorker?.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('[PWA] Neue Version verfügbar – beim nächsten Laden aktiv.')
            }
          })
        })
      })
      .catch((err) => console.error('[PWA] Service Worker Fehler:', err))
  })
}
