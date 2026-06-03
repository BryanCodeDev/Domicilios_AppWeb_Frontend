import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login, register, refreshToken as apiRefreshToken, setupInterceptors } from '../services/api/index.js';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await login(email, password);
          set({
            user: response.user,
            token: response.token,
            refreshToken: response.refreshToken,
            isAuthenticated: true,
            isLoading: false
          });
          return response;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (data) => {
        set({ isLoading: true });
        try {
          const response = await register(data);
          set({
            user: response.user,
            token: response.token,
            refreshToken: response.refreshToken,
            isAuthenticated: true,
            isLoading: false
          });
          return response;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false
        });
      },

      refresh: async () => {
        const { refreshToken } = get();
        if (!refreshToken) return;
        try {
          const response = await apiRefreshToken(refreshToken);
          set({ token: response.token });
        } catch (error) {
          get().logout();
          throw error;
        }
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);

setupInterceptors(() => useAuthStore.getState());

export { useAuthStore };
