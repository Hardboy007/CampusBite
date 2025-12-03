// Cache name - version number (update karne ke liye)
const CACHE_NAME = 'campusbite-v1';

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
  event.respondWith(
    caches.match(event.request)  // Pehle cache me dekho
      .then((response) => {
        // Cache me mila? Return karo!
        if (response) {
          console.log('💾 Serving from cache:', event.request.url);
          return response;
        }
        
        // Cache me nahi? Network se fetch karo
        console.log('🌐 Fetching from network:', event.request.url);
        return fetch(event.request)
          .then((response) => {
            // Response cache me bhi save kar lo (future ke liye)
            if (response && response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseClone);
                });
            }
            return response;
          });
      })
      .catch(() => {
        // Offline hai aur cache me bhi nahi? Fallback
        console.log('❌ Offline and not cached');
        return caches.match('/');  // Homepage dikha do
      })
  );
});