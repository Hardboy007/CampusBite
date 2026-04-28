const CACHE_NAME = 'campusbite-v4';
const CACHE_FILES = [
  '/',
  '/user-selection',
  '/about',
  '/css/about.css',
  '/css/userSelection.css',
  '/js/about.js',
  '/images/logo.png',
  '/images/icon-192.png',
  '/images/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CACHE_FILES))
      .catch(err => console.log('Cache failed:', err))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

