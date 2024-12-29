const CACHE_NAME = 'los-santos-radio-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.json',
    '/assets/audio/los_santos_rock.mp3',
    '/assets/audio/non_stop_pop.mp3',
    '/assets/audio/west_coast_classics.mp3',
    '/assets/images/rock_radio_icon.png',
    '/assets/images/non_stop_pop_icon.png',
    '/assets/images/west_coast_classics_icon.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
