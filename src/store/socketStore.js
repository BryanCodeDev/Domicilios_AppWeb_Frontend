import { io } from 'socket.io-client';
import { create } from 'zustand';

const useSocketStore = create((set, get) => ({
  socket: null,
  isConnected: false,
  riderLocation: null,

  connect: (userId, userRole) => {
    const socket = io(import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:5000', {
      path: '/tracking',
      transports: ['websocket'],
      query: { userId, userRole }
    });

    socket.on('connect', () => {
      set({ isConnected: true, socket });
    });

    socket.on('disconnect', () => {
      set({ isConnected: false });
    });

    socket.on('rider_location_updated', (data) => {
      set({ riderLocation: { lat: data.lat, lng: data.lng, orderId: data.orderId } });
    });

    socket.on('order_update', () => {});
    socket.on('new_order', () => {});
    socket.on('new_delivery_assigned', () => {});

    set({ socket, isConnected: true });
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('rider_location_updated');
      socket.off('order_update');
      socket.off('new_order');
      socket.off('new_delivery_assigned');
      socket.disconnect();
    }
    set({ socket: null, isConnected: false, riderLocation: null });
  },

  joinOrder: (orderId) => {
    const { socket } = get();
    if (socket) socket.emit('join_order', orderId);
  },

  joinBusiness: (businessId) => {
    const { socket } = get();
    if (socket) socket.emit('join_business', businessId);
  },

  joinRider: (riderId) => {
    const { socket } = get();
    if (socket) socket.emit('join_rider', riderId);
  },

  sendRiderLocation: (orderId, lat, lng) => {
    const { socket } = get();
    if (socket) socket.emit('rider_location', { orderId, lat, lng });
  }
}));

export { useSocketStore };
