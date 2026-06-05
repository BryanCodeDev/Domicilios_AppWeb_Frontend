import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  timeout: 10000
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const login = (email, password) => api.post('/auth/login', { email, password }).then(res => res.data);
export const register = (data) => api.post('/auth/register', data).then(res => res.data);
export const getProfile = () => api.get('/auth/me').then(res => res.data);
export const refreshToken = (refreshToken) => api.post('/auth/refresh', { refreshToken }).then(res => res.data);
export const registerFcmToken = (fcm_token) => api.patch('/auth/fcm-token', { fcm_token }).then(res => res.data);

export const setupInterceptors = (getState) => {
  api.interceptors.request.use((config) => {
    const state = getState();
    const token = state?.token;
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = 'Bearer ' + token;
              return api(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const state = getState();
          if (state?.refresh) {
            await state.refresh();
            const newToken = getState()?.token;
            processQueue(null, newToken);
            if (newToken) {
              originalRequest.headers.Authorization = 'Bearer ' + newToken;
              return api(originalRequest);
            }
          }
        } catch (err) {
          processQueue(err, null);
          const state = getState();
          state?.logout && state.logout();
        } finally {
          isRefreshing = false;
        }
      }
      return Promise.reject(error);
    }
  );
};

export default api;
