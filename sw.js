// Service Worker Wamarket - Réseau d'abord, cache en secours
const CACHE = 'wamarket-sw-v1';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { self.clients.claim(); });
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).then(r => {
      if (e.request.method==='GET' && r.status===200) {
        const c = r.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, c));
      }
      return r;
    }).catch(() => caches.match(e.request))
  );
});
