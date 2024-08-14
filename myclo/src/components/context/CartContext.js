// import React, { createContext, useContext, useReducer, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const CartContext = createContext();

// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_CART':
//       return { ...state, items: action.payload };
//     // Other cases remain the same
//     default:
//       return state;
//   }
// };

// export const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(cartReducer, { items: [] });

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.error('No token found, please log in.');
//       return;
//     }

//     try {
//       const response = await axios.get('http://localhost:5000/api/cart/', {
//         headers: { Authorization: token },
//       });
//       dispatch({ type: 'FETCH_CART', payload: response.data.cart.items });
//     } catch (error) {
//       console.error('Error fetching cart:', error.response?.data?.msg || error.message);
//     }
//   };

//   return (
//     <CartContext.Provider value={{ cart: state.items }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
