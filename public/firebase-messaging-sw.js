importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

let messaging;

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'INIT_FIREBASE') {
    firebase.initializeApp(event.data.config);
    messaging = firebase.messaging();
  }
});

self.addEventListener('push', (event) => {
  let payload;
  try {
    payload = event.data.json();
  } catch {
    payload = { notification: { title: 'Hadith', body: event.data.text() } };
  }

  const title = payload.notification?.title 
  const options = {
    body: payload.notification?.body || '',
    icon: '/app-icon.jpg',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes(url) && 'focus' in client) return client.focus();
      }
      return clients.openWindow(url);
    })
  );
});