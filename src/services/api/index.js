import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  timeout: 10000
});

export const login = (email, password) => api.post('/auth/login', { email, password }).then(res => res.data);
export const register = (data) => api.post('/auth/register', data).then(res => res.data);
export const getProfile = () => api.get('/auth/me').then(res => res.data);
export const refreshToken = (refreshToken) => api.post('/auth/refresh', { refreshToken }).then(res => res.data);
export const registerFcmToken = (fcm_token) => api.patch('/auth/fcm-token', { fcm_token }).then(res => res.data);

export const setupInterceptors = (getState) => {
  api.interceptors.request.use((config) => {
    const { token } = getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const { refresh } = getState();
          await refresh();
          const { token } = getState();
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        } catch {
          const { logout } = getState();
          logout();
        }
      }
      return Promise.reject(error);
    }
  );
};

export default api;
