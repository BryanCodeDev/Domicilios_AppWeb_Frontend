import { io } from 'socket.io-client';
import { create } from 'zustand';

const useSocketStore = create((set, get) => ({
  socket: null,
  isConnected: false,
  riderLocation: null,
  callbacks: {},

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

    socket.on('order:update', (data) => {
      const callback = get().callbacks.onOrderUpdate;
      if (callback) callback(data);
    });

    socket.on('rider:location', (data) => {
      set({ riderLocation: { lat: data.lat, lng: data.lng, orderId: data.orderId } });
      const callback = get().callbacks.onRiderLocation;
      if (callback) callback(data);
    });

    socket.on('order:new', (data) => {
      const callback = get().callbacks.onNewOrder;
      if (callback) callback(data);
    });

    socket.on('rider:assigned', (data) => {
      const callback = get().callbacks.onRiderAssigned;
      if (callback) callback(data);
    });

    set({ socket, isConnected: true });
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
    }
    set({ socket: null, isConnected: false, riderLocation: null, callbacks: {} });
  },

  joinOrderRoom: (orderId) => {
    const { socket } = get();
    if (socket) socket.emit('join:order', orderId);
  },

  joinBusinessRoom: (businessId) => {
    const { socket } = get();
    if (socket) socket.emit('join:business', businessId);
  },

  joinRiderRoom: (riderId) => {
    const { socket } = get();
    if (socket) socket.emit('join:rider', riderId);
  },

  listenOrderUpdates: (callback) => {
    set(state => ({ callbacks: { ...state.callbacks, onOrderUpdate: callback } }));
  },

  listenRiderLocation: (callback) => {
    set(state => ({ callbacks: { ...state.callbacks, onRiderLocation: callback } }));
  },

  listenNewOrders: (callback) => {
    set(state => ({ callbacks: { ...state.callbacks, onNewOrder: callback } }));
  },

  listenRiderAssigned: (callback) => {
    set(state => ({ callbacks: { ...state.callbacks, onRiderAssigned: callback } }));
  },

  emitLocation: (data) => {
    const { socket } = get();
    if (socket) socket.emit('rider:location', data);
  }
}));

export { useSocketStore };
