let filesToCache = [
    'index.html',
    'main.js',
    'styles.css',
    'images/abelbeetle.jpg',
    'images/taguaparque.png',
    'images/vibrar.jpg',
    'images/zebra.jpg',
    'images/icone-01.png',
    'images/icone-02.png',
    'images/icone-03.png',
    'images/cp-500.png',
    'images/ios-desktop.png',
    'images/android-desktop.png',
    'images/favicon.png',
    'images/logo.png',
    'https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&lang=en',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://code.getmdl.io/1.3.0/material.blue_grey-teal.min.css',
    'https://code.getmdl.io/1.3.0/material.min.js',
    'https://code.jquery.com/jquery-3.2.1.min.js',
    'js/battery.js',
    'js/connection.js',
    'js/mic.js',
    'js/online.js',
    'js/vibrate.js',
    'js/payment.js',
    'js/local-notification.js',
    'js/fullscreen.js',
    'js/device-memory.js',
    'js/device-orientation.js',
    'js/screen-orientation.js',
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

