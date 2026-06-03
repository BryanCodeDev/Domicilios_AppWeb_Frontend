import { useEffect, useState, useRef } from 'react';
import { useSocketStore } from '../store/socketStore';

const useLocation = (orderId) => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const watchIdRef = useRef(null);
  const { sendRiderLocation } = useSocketStore();

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    const onSuccess = (pos) => {
      const { latitude, longitude } = pos.coords;
      setPosition({ lat: latitude, lng: longitude });
      if (orderId) {
        sendRiderLocation(orderId, latitude, longitude);
      }
    };

    const onError = (err) => {
      setError(err.message);
    };

    watchIdRef.current = navigator.geolocation.watchPosition(
      onSuccess,
      onError,
      { enableHighAccuracy: true, maximumAge: 30000, timeout: 10000 }
    );

    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [orderId, sendRiderLocation]);

  return { position, error };
};

export { useLocation };