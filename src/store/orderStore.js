import { create } from 'zustand';
import { getMyOrders, createOrder, getOrder } from '../services/api/orders';

const useOrderStore = create((set) => ({
  orders: [],
  activeOrder: null,
  isLoading: false,

  fetchMyOrders: async (estado) => {
    set({ isLoading: true });
    try {
      const orders = await getMyOrders(estado);
      set({ orders, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchOrder: async (id) => {
    set({ isLoading: true });
    try {
      const order = await getOrder(id);
      set({ activeOrder: order, isLoading: false });
      return order;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  placeOrder: async (orderData) => {
    set({ isLoading: true });
    try {
      const order = await createOrder(orderData);
      set((state) => ({ orders: [order, ...state.orders], isLoading: false }));
      return order;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  clearOrders: () => set({ orders: [], activeOrder: null })
}));

export { useOrderStore };