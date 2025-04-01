import { create } from 'zustand';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create((set) => ({
    cart: [],
    addToCart: (item) => set((state) => {
      const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return {
          cart: state.cart.map(cartItem =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      }
      return { cart: [...state.cart, item] };
    }),
    updateQuantity: (itemId, quantity) => set((state) => {
      if (quantity <= 0) {
        return { cart: state.cart.filter(item => item.id !== itemId) };  // Remove item if quantity is 0
      }
      return {
        cart: state.cart.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        ),
      };
    }),
    clearCart: () => set({ cart: [] }),  // Clears the cart
  }));