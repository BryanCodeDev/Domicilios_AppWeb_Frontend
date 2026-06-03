import api from './index.js';

export const getBusinesses = (categoria) => api.get('/businesses', { params: { categoria } }).then(res => res.data);
export const getBusinessById = (id) => api.get(`/businesses/${id}`).then(res => res.data);
export const getUserBusiness = () => api.get('/business/me').then(res => res.data);
export const createBusiness = (data) => api.post('/business', data).then(res => res.data);
export const updateBusiness = (data) => api.put('/business', data).then(res => res.data);