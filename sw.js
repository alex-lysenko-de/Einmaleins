// Service Worker – Einmaleins PWA
// Strategie: Network-first mit Cache-Fallback für alle eigenen Assets.
// Kein statisches PRECACHE_URLS – Vite generiert gehashte Dateinamen,
// die wir hier zur Build-Zeit nicht kennen können.

const CACHE_VERSION = 'v1'
const CACHE_NAME = `einmaleins-${CACHE_VERSION}`

// Nur diese wenigen stabilen URLs beim Install vorab laden (App Shell)
const SHELL_URLS = [
  '/einmaleins/',
  '/einmaleins/index.html',
  '/einmaleins/manifest.json',
]

// ── Install: App Shell precachen ────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL_URLS))
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

// ── Fetch: Stale-While-Revalidate für alle eigenen Requests ─────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event

  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  // Vite-Assets haben Hash im Dateinamen → Cache-first (unveränderlich)
  const isHashedAsset = url.pathname.includes('/assets/')

  if (isHashedAsset) {
    // Cache-first: einmal gecacht, nie wieder laden
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
