/* POSKO SONIK - service worker: jaringan dulu, cadangan dari cache saat offline.
   Hanya GET satu-asal (halaman, skrip, logo). Panggilan ke server (POST / Apps Script) tidak pernah di-cache. */
var NAMA = 'posko-v1';
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== NAMA; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(r).then(function (res) {
      if (res && res.ok) { var c = res.clone(); caches.open(NAMA).then(function (ca) { ca.put(r, c); }); }
      return res;
    }).catch(function () { return caches.match(r, { ignoreSearch: true }); })
  );
});
