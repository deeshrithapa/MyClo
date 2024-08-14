import React, { useEffect } from 'react';
import { useCart } from '../context/CartContextReducer';

const Cart = () => {
  const { cart, fetchCart, removeFromCart } = useCart();

  useEffect(() => {
    console.log('Fetching cart...');
    fetchCart();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Debugging output
  useEffect(() => {
    console.log('Cart:', cart);
  }, [cart]);

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (!cart || cart.length === 0) {
    return <div className="text-center text-gray-600 py-10">Your cart is empty</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {cart.map((item) => (
          <div key={item._id} className="p-4 border-b border-gray-200 flex flex-col md:flex-row items-start md:items-center">
            <div className="flex-shrink-0">
              <img 
                src={item.product.productImage} 
                alt={item.product.name} 
                className="w-24 h-24 object-cover rounded-md"
              />
            </div>
            <div className="flex-1 md:ml-6">
              <h3 className="text-xl font-semibold text-gray-800">{item.product.name}</h3>
              <p className="text-gray-600">Price: Rs. {item.product.price}</p>
              <p className="text-gray-600">Size: {item.size}</p>
              <p className="text-gray-600">Color: {item.color}</p>
              <p className="text-gray-600">Shoulder Type: {item.shoulderType}</p>
              <p className="text-gray-600">Pockets: {item.pockets}</p>
              <p className="text-gray-600">Hem: {item.hem}</p>
              <p className="text-gray-600">Vents: {item.vents}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6">
              <button 
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="p-4 text-right">
          <p className="text-lg font-semibold">Total: Rs. {totalPrice}</p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
