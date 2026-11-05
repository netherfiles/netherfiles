const CACHE_NAME = "netherfiles-v1";

const APP_FILES = [
  "/netherfiles/",
  "/netherfiles/index.html",
  "/netherfiles/manifest.webmanifest"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
  );

  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});
