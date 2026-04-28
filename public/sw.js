// Cache name - version number (update karne ke liye)
const CACHE_NAME = 'campusbite-v3';

// Files jo cache karni hain (offline me kaam aayengi)
const urlsToCache = [
  '/',
  '/user-selection',
  '/menu',
  '/about',
  '/css/output.css',
  '/css/about.css',
  '/css/userSelection.css',
  '/js/menu.js',
  '/js/about.js',
  '/images/logo.png',
  '/images/icon-192.png',
  '/images/icon-512.png'
];

// ========== INSTALL EVENT ==========
// Jab service worker PEHLI BAAR install ho
self.addEventListener('install', (event) => {
  console.log('✅ Service Worker: Installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)     //cache storage kholo
      .then((cache) => {
        console.log('📦 Service Worker: Caching files');
        return cache.addAll(urlsToCache);       // Saari files cache karo
      })
      .catch((err) => console.log('❌ Cache failed:', err))
  );
  // Force activate immediately
  self.skipWaiting();
})

// ========== ACTIVATE EVENT ==========
// Jab service worker ACTIVATE ho (purane cache clean karne ke liye)
self.addEventListener('activate', (event) => {
  console.log('🔄 Service Worker: Activated');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          // Purane cache versions delete karo
          if (cache !== CACHE_NAME) {
            console.log('🗑️ Service Worker: Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );

  // Take control immediately
  return self.clients.claim();
});

// ========== FETCH EVENT ==========
// Jab bhi koi file/page request ho
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  if (!url.protocol.startsWith('http')) return;
  if (req.method !== 'GET') return;

  // ✅ JS files → NETWORK FIRST
  if (url.pathname.endsWith('.js')) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.status === 200) {
            const resClone = res.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(req, resClone);
            });
          }
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // ✅ baaki sab → CACHE FIRST (as it is)
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;

      return fetch(req).then((res) => {
        if (url.origin === location.origin && res.status === 200) {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, resClone);
          });
        }
        return res;
      });
    })
  );
});