import { useEffect } from 'react';
import { requestPermission, onForegroundMessage } from '../utils/firebase';
import { registerFcmToken } from '../services/api/index';
import { useToastStore } from '../store/toastStore';

export const usePushNotifications = () => {
  useEffect(() => {
    const setup = async () => {
      try {
        const token = await requestPermission();
        if (token) {
          await registerFcmToken(token);
          useToastStore.getState().addToast({ type: 'success', message: 'Notificaciones activadas' });
        }
      } catch (err) {
        console.error('FCM setup error:', err);
      }
    };
    setup();

    onForegroundMessage((payload) => {
      useToastStore.getState().addToast({ type: 'info', message: payload.notification?.title || 'Nueva notificacion' });
    });
  }, []);
};

