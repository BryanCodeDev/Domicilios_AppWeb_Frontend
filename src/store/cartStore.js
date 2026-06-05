import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      businessId: null,
      
      addItem: (product, quantity = 1) => {
        const { items, businessId } = get();
        const newBusinessId = product.negocio_id || product.businessId;
        
        if (businessId && businessId !== newBusinessId) {
          if (!confirm('¿Vaciar el carrito y agregar este producto de otro negocio?')) return;
          set({ items: [], businessId: newBusinessId });
        }
        
        const existingItem = items.find(item => item.id === product.id);
        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
            businessId: newBusinessId || businessId
          });
        } else {
          set({
            items: [...items, { ...product, quantity }],
            businessId: newBusinessId || businessId
          });
        }
      },
      
      removeItem: (productId) => {
        const { items, businessId } = get();
        const newItems = items.filter(item => item.id !== productId);
        set({ items: newItems, businessId: newItems.length === 0 ? null : businessId });
      },
      
      updateQuantity: (productId, quantity) => {
        const { items } = get();
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: items.map(item =>
            item.id === productId ? { ...item, quantity } : item
          )
        });
      },
      
      clearCart: () => set({ items: [], businessId: null }),
      
      total: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
      },
      
      itemCount: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.quantity, 0);
      }
    }),
    { name: 'cart-storage' }
  )
);

export { useCartStore };
