import api from './index.js';

export const createPaymentPreference = (order_id) => api.post('/payments/preference', { order_id }).then(res => res.data);