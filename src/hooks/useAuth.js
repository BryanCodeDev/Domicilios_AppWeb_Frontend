import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useSocketStore } from '../store/socketStore';

const useAuth = () => {
  const { login, register, logout, user, token, isAuthenticated } = useAuthStore();
  const { connect, disconnect } = useSocketStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      connect(user.id, user.rol);
    }
    return () => disconnect();
  }, [isAuthenticated, user, connect, disconnect]);

  return { user, token, isAuthenticated, login, register, logout };
};

export { useAuth };