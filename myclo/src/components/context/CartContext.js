import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    fetchCart();
    // Retrieve role from localStorage
    setUserRole(localStorage.getItem('role'));
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, please log in.');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCart(response.data.cart.items);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId, quantity, size, color) => {
    if (userRole !== 'user') {
      console.error('Only users can add items to the cart.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, please log in.');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/cart/add', { productId, quantity, size, color }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Cart updated:', response.data.cart);
      fetchCart(); // Refresh the cart after adding an item
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartContext;
