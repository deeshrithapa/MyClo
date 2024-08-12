import React, { createContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [role, setRole] = useState('user'); // The default role is 'user'

  const addToCart = (product) => {
    if (role !== 'user') {
      alert('Only users can add items to the cart');
      return; // Prevent admin from adding items to the cart
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item._id === product._id);
      if (existingProduct) {
        return prevCart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(product => product._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product._id === productId ? { ...product, quantity: Math.max(1, quantity) } : product
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, role, setRole }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
