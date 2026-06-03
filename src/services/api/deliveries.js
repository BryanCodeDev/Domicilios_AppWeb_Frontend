import api from './index.js';

export const updateLocation = (lat, lng) => api.post('/deliveries/location', { lat, lng }).then(res => res.data);
export const acceptDelivery = (orderId) => api.post('/deliveries/accept', { orderId }).then(res => res.data);
export const updateDeliveryStatus = (orderId, estado) => api.patch(`/deliveries/${orderId}/status`, { estado }).then(res => res.data);
export const getActiveDelivery = () => api.get('/deliveries/active').then(res => res.data);