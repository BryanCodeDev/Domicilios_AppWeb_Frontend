import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '../../store/cartStore';

describe('cartStore', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], businessId: null });
  });

  it('addItem adds product to cart', () => {
    const product = { id: 1, nombre: 'Pizza', precio: 20000 };
    useCartStore.getState().addItem(product);
    const { items } = useCartStore.getState();
    expect(items.length).toBe(1);
    expect(items[0].id).toBe(1);
  });

  it('removeItem removes product from cart', () => {
    const product = { id: 1, nombre: 'Pizza', precio: 20000 };
    useCartStore.getState().addItem(product);
    useCartStore.getState().removeItem(1);
    expect(useCartStore.getState().items.length).toBe(0);
  });

  it('clearCart empties the cart', () => {
    const product = { id: 1, nombre: 'Pizza', precio: 20000 };
    useCartStore.getState().addItem(product);
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items.length).toBe(0);
  });

  it('total calculates correctly', () => {
    const p1 = { id: 1, nombre: 'Pizza', precio: 20000, quantity: 2 };
    const p2 = { id: 2, nombre: 'Bebida', precio: 5000, quantity: 1 };
    useCartStore.setState({ items: [p1, p2] });
    expect(useCartStore.getState().total()).toBe(45000);
  });
});

