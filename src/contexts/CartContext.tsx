import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { CartItem, Product, ProductOption } from '../types';

interface CartState {
  items: CartItem[];
  customerName: string;
  customerComments: string;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number; selectedOption?: ProductOption; customDetails?: string } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'SET_CUSTOMER_NAME'; payload: string }
  | { type: 'SET_CUSTOMER_COMMENTS'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState };

const initialState: CartState = {
  items: [],
  customerName: '',
  customerComments: ''
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        item => item.product.id === action.payload.product.id &&
        item.selectedOption?.id === action.payload.selectedOption?.id
      );

      if (existingIndex > -1) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + action.payload.quantity
        };
        return { ...state, items: newItems };
      }

      return {
        ...state,
        items: [...state.items, {
          product: action.payload.product,
          quantity: action.payload.quantity,
          selectedOption: action.payload.selectedOption,
          customDetails: action.payload.customDetails
        }]
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload)
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        )
      };
    case 'SET_CUSTOMER_NAME':
      return { ...state, customerName: action.payload };
    case 'SET_CUSTOMER_COMMENTS':
      return { ...state, customerComments: action.payload };
    case 'CLEAR_CART':
      return initialState;
    case 'LOAD_CART':
      return action.payload;
    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addItem: (product: Product, quantity: number, selectedOption?: ProductOption, customDetails?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setCustomerName: (name: string) => void;
  setCustomerComments: (comments: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  generateWhatsAppMessage: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'zenkai-cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_CART', payload: parsed });
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addItem = (product: Product, quantity: number, selectedOption?: ProductOption, customDetails?: string) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, selectedOption, customDetails } });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const setCustomerName = (name: string) => {
    dispatch({ type: 'SET_CUSTOMER_NAME', payload: name });
  };

  const setCustomerComments = (comments: string) => {
    dispatch({ type: 'SET_CUSTOMER_COMMENTS', payload: comments });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const total = state.items.reduce((sum, item) => {
    const optionPrice = item.selectedOption?.price || 0;
    return sum + ((item.product.price + optionPrice) * item.quantity);
  }, 0);

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const generateWhatsAppMessage = (): string => {
    if (state.items.length === 0) return '';

    const itemsList = state.items.map((item, index) => {
      const optionText = item.selectedOption ? ` (${item.selectedOption.name})` : '';
      const detailsText = item.customDetails ? ` - ${item.customDetails}` : '';
      return `${index + 1}. ${item.product.name}${optionText} x${item.quantity} - $${((item.product.price + (item.selectedOption?.price || 0)) * item.quantity).toFixed(2)} MXN${detailsText}`;
    }).join('\n');

    const message = `Hola ZENKAI CUSTOMS!\n\nSolicito presupuesto:\n\nNombre: ${state.customerName || 'Cliente'}\n\nProductos:\n${itemsList}\n\nTotal estimado: $${total.toFixed(2)} MXN\n\nComentarios: ${state.customerComments || 'Sin comentarios adicionales'}\n\nGracias!`;

    return encodeURIComponent(message);
  };

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      setCustomerName,
      setCustomerComments,
      clearCart,
      total,
      itemCount,
      generateWhatsAppMessage
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
