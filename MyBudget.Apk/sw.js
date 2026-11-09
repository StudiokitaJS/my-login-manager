'use strict';

const CACHE_NAME = 'mybudget-pwa-v12';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon.svg',
  './css/style.css?v=unified-backup-memo-20261109',
  './js/app.js?v=unified-backup-memo-20261109',
  './js/page-shell.js?v=home-grid-3x9-20261107',
  './pages/beranda/index.html?v=home-grid-3x9-20261107',
  './pages/rekening/index.html?v=home-grid-3x9-20261107',
  './pages/tambah-rekening/index.html?v=home-grid-3x9-20261107',
  './pages/laporan-bulanan/index.html?v=home-grid-3x9-20261107',
  './pages/sallary/index.html?v=home-grid-3x9-20261107',
  './pages/setting/index.html?v=home-grid-3x9-20261107',
  './pages/about/index.html?v=home-grid-3x9-20261107',
  './pages/my-ip/index.html?v=home-grid-3x9-20261107',
  './pages/budget-bulanan/index.html?v=category-chart-20261108',
  './pages/mymemo/index.html?v=memo-report-widths-20261109',
  './pages/setting/index.html?v=unified-backup-20261109'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => (await caches.match(request)) || (await caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response && response.ok && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
