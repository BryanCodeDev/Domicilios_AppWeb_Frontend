import api from './index.js';

export const createOrder = (data) => api.post('/orders', data).then(res => res.data);
export const getMyOrders = (estado) => api.get('/orders/me', { params: { estado } }).then(res => res.data);
export const getOrder = (id) => api.get(`/orders/${id}`).then(res => res.data);
export const acceptOrderByBusiness = (orderId) => api.patch(`/orders/${orderId}/accept`).then(res => res.data);
export const getBusinessOrders = (estado) => api.get('/orders/business/me', { params: { estado } }).then(res => res.data);
export const getRiderOrders = (estado) => api.get('/orders/rider/me', { params: { estado } }).then(res => res.data);