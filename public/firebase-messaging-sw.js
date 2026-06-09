importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

self.firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  messagingSenderId: '',
  appId: ''
};

firebase.initializeApp(self.firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title || 'Notificación';
  const notificationOptions = {
    body: payload.notification.body || '',
    icon: '/favicon.svg',
    badge: '/favicon.svg'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
