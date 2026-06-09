import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

let firebaseApp = null;
let messagingInstance = null;

export const initFirebase = () => {
  if (firebaseApp) return firebaseApp;
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  if (!apiKey) {
    console.warn('Firebase: VITE_FIREBASE_API_KEY not configured');
    return null;
  }
  const config = {
    apiKey,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  };
  firebaseApp = initializeApp(config);
  messagingInstance = getMessaging(firebaseApp);
  return firebaseApp;
};

export const requestPermission = async () => {
  if (!messagingInstance) initFirebase();
  if (!messagingInstance) return null;
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return null;
  const token = await getToken(messagingInstance, { vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY });
  return token;
};

export const onForegroundMessage = (callback) => {
  if (!messagingInstance) initFirebase();
  if (!messagingInstance) return () => {};
  return onMessage(messagingInstance, callback);
};

export default firebaseApp;
