'use strict';

// Naikkan versi cache setiap kali aturan cache atau aset inti berubah.
const CACHE_NAME = 'mybudget-pwa-v23-network-first-20261115';
const CACHE_PREFIX = 'mybudget-pwa-';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon.svg',
  './css/style.css?v=convert-manual-20261115',
  './js/app.js?v=convert-manual-20261115',
  './js/page-shell.js?v=home-grid-3x9-20261107'
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
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

async function networkFirst(request) {
  try {
    // Minta salinan terbaru dari GitHub Pages, bukan salinan HTTP cache browser.
    const response = await fetch(request, { cache: 'no-cache' });
    if (response && response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    throw error;
  }
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const path = url.pathname.toLowerCase();
  const shouldRefreshFromNetwork =
    request.mode === 'navigate' ||
    request.destination === 'document' ||
    request.destination === 'script' ||
    request.destination === 'style' ||
    /\\.(html|css|js|webmanifest)$/.test(path);

  if (shouldRefreshFromNetwork) {
    event.respondWith(
      networkFirst(request).catch(async () => {
        if (request.mode === 'navigate') {
          return (await caches.match('./index.html')) || Response.error();
        }
        return Response.error();
      })
    );
    return;
  }

  // Aset non-kode (misalnya ikon) tetap cache-first agar hemat data dan cepat offline.
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(async response => {
        if (response && response.ok && response.type === 'basic') {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, response.clone());
        }
        return response;
      });
    })
  );
});
