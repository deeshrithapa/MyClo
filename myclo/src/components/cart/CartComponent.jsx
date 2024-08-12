import React, { useContext } from 'react';
import CartContext from '../context/CartContext'; // Adjust path as needed

const CartComponent = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  return (
    <div className="p-4" style={{ backgroundColor: '#EEE9DD' }}>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((product) => (
              <li key={product._id} className="border-b py-4 flex items-center justify-between">
                <div className="flex">
                  <img src={product.productImage} alt={product.name} className="w-32 h-32 object-cover mr-4" />
                  <div>
                    <div className="font-bold">{product.name}</div>
                    <p>{product.description}</p>
                    <p>Price: Rs.{product.price}</p>
                    <p>Size: {product.size || 'N/A'}</p> {/* Display Size */}
                    <p>Color: {product.color || 'N/A'}</p> {/* Display Color */}
                    <p>Category: {product.category?.name || 'N/A'}</p>
                    <div className="flex items-center mt-2">
                      <button
                        className="bg-gray-200 px-2 py-1 mr-2"
                        onClick={() => updateQuantity(product._id, product.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        className="bg-gray-200 px-2 py-1 ml-2"
                        onClick={() => updateQuantity(product._id, product.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className="font-bold mt-2">Total: Rs.{product.price * product.quantity}</p>
                  </div>
                </div>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  onClick={() => removeFromCart(product._id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-4">
            <p className="text-xl font-bold">Total: Rs.{calculateTotal()}</p>
            <button className="bg-black text-white px-6 py-3 rounded">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartComponent;
