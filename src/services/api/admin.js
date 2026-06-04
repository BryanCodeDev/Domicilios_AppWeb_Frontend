import api from './index.js';

export const getDashboardStats = () => api.get('/admin/dashboard/stats').then(res => res.data);
export const getAllUsers = () => api.get('/admin/users').then(res => res.data);
export const getAllBusinesses = () => api.get('/admin/businesses').then(res => res.data);
export const getReports = () => api.get('/admin/reports').then(res => res.data);
export const getAllOrders = () => api.get('/admin/orders').then(res => res.data);