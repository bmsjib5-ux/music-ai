// Service worker: ให้แอปเปิดได้แบบออฟไลน์
// เปลี่ยน VERSION ทุกครั้งที่แก้ไฟล์ในรายการ SHELL เพื่อให้เครื่องผู้ใช้โหลดของใหม่
const VERSION = "v1";
const SHELL_CACHE = "shell-" + VERSION;
const FONT_CACHE = "fonts-v1";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(SHELL_CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== SHELL_CACHE && k !== FONT_CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Google Fonts: ใช้ของใน cache ก่อน ถ้าไม่มีค่อยโหลดแล้วเก็บไว้
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(
      caches.open(FONT_CACHE).then(c =>
        c.match(req).then(hit => hit || fetch(req).then(res => { c.put(req, res.clone()); return res; }))
      )
    );
    return;
  }

  if (url.origin !== location.origin) return;

  // หน้าเว็บ: ลองโหลดของใหม่ก่อน ถ้าออฟไลน์ใช้ของใน cache
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then(res => { caches.open(SHELL_CACHE).then(c => c.put("./index.html", res.clone())); return res; })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
