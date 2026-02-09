importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
   apiKey: "AIzaSyCc388LBUATWmQTmSp1n9_AeMnPIbA-_YY",
  authDomain: "qr-hadees-app.firebaseapp.com",
  projectId: "qr-hadees-app",
  storageBucket: "qr-hadees-app.firebasestorage.app",
  messagingSenderId: "369752517986",
  appId: "1:369752517986:web:66e91a72aa33a42495903b",
  measurementId: "G-KBXMZL34JM"
});

const messaging = firebase.messaging();

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