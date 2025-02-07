const CACHE_NAME = 'v3';
const urlsToCache = [
    '/',
    'index.html',
    'styles/index.css',
    'scripts/script.js',
    '/assets/Favicon/favicon_io/android-chrome-192x192.png',
    '/assets/Favicon/favicon_io/android-chrome-512x512.png'
];

self.addEventListener('activate', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache); // Delete old caches
                    }
                })
            );
        })
    );
});

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});


self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});