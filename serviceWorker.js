const staticDevCoffee = "dev-coffee-site-v1";
const assets = [
  "/",
  "/manifest.json",
  "/index.html",
  "/css/page_auth.css",
  "/js/auth.js",
  "/js/animations.js",
  "/img/background.jpeg",
  "/img/background2.jpeg",
  "/pages/index.html",
  "/pages/question_1.html",
  "/pages/question_2.html",
  "/pages/question_3.html",
  "/pages/question_4.html",
  "/pages/defeat.mp3",
  "/pages/victory.mp3",
  "/pages/css/questions.css",
  "/pages/js/app.js",
  "/pages/js/question_1.js",
  "/pages/js/question_2.js",
  "/pages/js/question_3.js",
  "/pages/js/question_4.js",
  "/pages/img/background.jpeg",
  "/pages/img/background2.jpeg",
  "/pages/img/background3.jpeg",
  "/pages/img/endGame.gif",
  "/pages/img/endGame2.gif",
  "/pages/img/prize.gif"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
