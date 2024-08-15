import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_CART':
      return { ...state, items: action.payload.items, cartId: action.payload.cartId };
    case 'ADD_TO_CART':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
      };
    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};


export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], cartId: null });

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token || !userId) {
      toast.error('User not authenticated');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/cart/${userId}`, {
        headers: { Authorization: token },
      });
      dispatch({ type: 'FETCH_CART', payload: { items: response.data.cart.items, cartId: response.data.cart.cartId } });
      toast.success('Cart loaded successfully');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to load cart');
    }
  };

  const addToCart = async (productId, quantity, size, color, shoulderType, pockets, hem, vents) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('User not authenticated');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/cart/add', {
        product: productId,
        quantity,
        size,
        color,
        shoulderType,
        pockets,
        hem,
        vents,
      }, {
        headers: { Authorization: token }
      });

      dispatch({ type: 'ADD_TO_CART', payload: response.data.cartItem });
      toast.success('Added to cart successfully');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const removeFromCart = async (itemId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('User not authenticated');
      return;
    }

    try {
      await axios.delete('http://localhost:5000/api/cart/remove', {
        headers: { Authorization: token },
        data: { itemId }
      });

      dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to remove item from cart');
    }
  };

  const updateCartItem = async (itemId, quantity, size, color, shoulderType, pockets, hem, vents) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('User not authenticated');
      return;
    }

    try {
      const response = await axios.patch(`http://localhost:5000/api/cart/update/${itemId}`, {
        quantity, size, color, shoulderType, pockets, hem, vents
      }, {
        headers: { Authorization: token }
      });
      dispatch({ type: 'UPDATE_CART_ITEM', payload: response.data.cartItem });
      toast.success('Cart item updated');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to update cart item');
    }
  };

  return (
    <CartContext.Provider value={{ cart: state.items, cartId: state.cartId, addToCart,clearCart, fetchCart, removeFromCart, updateCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
