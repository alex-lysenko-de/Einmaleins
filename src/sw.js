// Service Worker – Einmaleins PWA
// vite-plugin-pwa (injectManifest) ersetzt self.__WB_MANIFEST beim Build
// durch eine Liste aller Vite-Assets mit gehashten Dateinamen.

const CACHE_VERSION = 'v1'
const CACHE_NAME = `einmaleins-${CACHE_VERSION}`

// Stabiler App Shell (zur Build-Zeit bekannte URLs)
const SHELL_URLS = [
  '/einmaleins/',
  '/einmaleins/index.html',
  '/einmaleins/manifest.json',
]

// Alle Vite-Assets (JS, CSS, Icons usw.) – vom Plugin beim Build injiziert
// Im Dev-Modus leer, kein Precaching nötig
const PRECACHE_URLS = (self.__WB_MANIFEST || []).map((entry) => entry.url)

// ── Install: App Shell + alle Vite-Assets precachen ─────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll([...SHELL_URLS, ...PRECACHE_URLS]))
      .then(() => self.skipWaiting())
  )
})

// ── Activate: alte Caches löschen ───────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith('einmaleins-') && key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  )
})

// ── Fetch: Cache-first für Assets, Network-first für Shell ──────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event

  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  // Vite-Assets haben Hash im Dateinamen → Cache-first (unveränderlich)
  const isHashedAsset = url.pathname.includes('/assets/')

  if (isHashedAsset) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const clone = response.clone()
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
            }
            return response
          })
      )
    )
  } else {
    // Network-first mit Cache-Fallback (für index.html, manifest, icons)
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          }
          return response
        })
        .catch(() => caches.match(request))
    )
  }
})
