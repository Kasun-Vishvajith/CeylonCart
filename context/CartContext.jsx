'use client';

import { createContext, useContext, useEffect, useReducer } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'ceyloncart_cart';

function cartReducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload;

    case 'ADD_TO_CART': {
      const { product, qty } = action.payload;
      const existing = state.find((item) => item.productId === product.id);
      if (existing) {
        return state.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [
        ...state,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: qty,
        },
      ];
    }

    case 'REMOVE_FROM_CART':
      return state.filter((item) => item.productId !== action.payload);

    case 'UPDATE_QUANTITY':
      return state.map((item) =>
        item.productId === action.payload.productId
          ? { ...item, quantity: Math.max(1, action.payload.qty) }
          : item
      );

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        dispatch({ type: 'HYDRATE', payload: JSON.parse(stored) });
      }
    } catch {
      // localStorage unavailable (SSR guard)
    }
  }, []);

  // Persist to localStorage on every cart change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const addToCart = (product, qty = 1) =>
    dispatch({ type: 'ADD_TO_CART', payload: { product, qty } });

  const removeFromCart = (productId) =>
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });

  const updateQuantity = (productId, qty) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, qty } });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
