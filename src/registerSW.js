// Service Worker Registrierung
// sw.js wird von vite-plugin-pwa (injectManifest) generiert → dist/sw.js
if ('serviceWorker' in navigator) {
  // Automatisches Reload nach SW-Update: verhindert doppeltes Ausführen
  let refreshing = false
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true
      window.location.reload()
    }
  })

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/einmaleins/sw.js', { scope: '/einmaleins/' })
      .then((reg) => {
        console.log('[PWA] Service Worker registriert:', reg.scope)
      })
      .catch((err) => console.error('[PWA] Service Worker Fehler:', err))
  })
}
