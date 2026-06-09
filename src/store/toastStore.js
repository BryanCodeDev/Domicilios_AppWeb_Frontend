import { create } from 'zustand';

const useToastStore = create((set, get) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Date.now() + Math.random();
    const newToast = { id, duration: 4000, ...toast };
    get().toasts.push(newToast);
    set({ toasts: [...get().toasts] });
    setTimeout(() => get().removeToast(id), newToast.duration);
  },
  removeToast: (id) => {
    set({ toasts: get().toasts.filter(t => t.id !== id) });
  }
}));

export { useToastStore };

