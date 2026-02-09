// importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// let messaging;
// self.addEventListener('message', (event) => {
//   if (event.data && event.data.type === 'INIT_FIREBASE') {
//     firebase.initializeApp(event.data.config);
//     messaging = firebase.messaging();
//   }
// });

// self.addEventListener('push', (event) => {
//   let payload;
//   try {
//     payload = event.data.json();
//   } catch {
//     payload = { notification: { title: 'Hadith', body: event.data.text() } };
//   }

//   const title = payload.notification?.title 
//   const options = {
//     body: payload.notification?.body || '',
//     icon: '/app-icon.jpg',
//   };

//   event.waitUntil(self.registration.showNotification(title, options));
// });

// self.addEventListener('notificationclick', (event) => {
//   event.notification.close();
//   const url = event.notification.data?.url || '/';

//   event.waitUntil(
//     clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
//       for (const client of clientList) {
//         if (client.url.includes(url) && 'focus' in client) return client.focus();
//       }
//       return clients.openWindow(url);
//     })
//   );
// });

// messaging.onBackgroundMessage((payload) => {
//   self.registration.showNotification(payload.notification.title, {
//     body: payload.notification.body,
//     icon: "/icon.png",
//   });
// });
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
});

const messaging = firebase.messaging();

// Background push notification handler
self.addEventListener('push', (event) => {
  let payload;
  try {
    payload = event.data.json();
  } catch {
    payload = { notification: { title: 'Hadith', body: event.data.text() } };
  }

  const title = payload.notification?.title || 'Hadith';
  const options = {
    body: payload.notification?.body || '',
    icon: '/app-icon.jpg',
    data: payload.data // optional, for click actions
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click handler
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