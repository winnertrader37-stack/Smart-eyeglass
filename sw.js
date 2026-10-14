const CACHE_NAME = "naol-smart-glasses-v1";

const FILES = [
    "./",
    "./index.html",
    "./manifest.json"
];

self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES);
        })
    );

    self.skipWaiting();

});

self.addEventListener("activate", event => {

    event.waitUntil(
        self.clients.claim()
    );

});

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(
        caches.match(event.request).then(cached => {

            if (cached) {
                return cached;
            }

            return fetch(event.request);

        })
    );

});
