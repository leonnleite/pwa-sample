let filesToCache = [
    'index.html',
    'main.js',
    'styles.css',
    'images/taguatinga-shopping.jpg',
    'images/shopping.jpg',
    'images/bg_xlg.jpg',
    'images/bg_lg.jpg',
    'images/bg_md.jpg',
    'images/qr-code.jpg',
    'images/abelbeetle.jpg',
    'images/taguaparque.png',
    'images/vibrar.jpg',
    'images/zebra.jpg',
    'images/icone-01.png',
    'images/icone-02.png',
    'images/icone-03.png',
    'https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&lang=en',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://code.getmdl.io/1.3.0/material.grey-orange.min.css',
    'js/battery.js',
    'js/connection.js',
    'js/mic.js',
    'js/online.js',
    'js/vibrate.js',
    'js/payment.js',
    'js/local-notification.js',
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open('phpeste-v1')
            .then(function(cache) {
                return cache.addAll(filesToCache);
            })
    );
});


self.addEventListener('fetch', event => {
    console.log('fetch');
    console.log(event.request);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    )
});

