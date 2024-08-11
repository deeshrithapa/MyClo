import React, { useContext } from 'react';
import CartContext from '../context/CartContext'; // Adjust path as needed

const CartComponent = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div className="p-4" style={{ backgroundColor: '#EEE9DD'}}>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((product) => (
            <li key={product._id} className="border-b py-2 flex items-center justify-between">
              <div>
                <div className="font-bold">{product.name}</div>
                <p>Price: Rs.{product.price}</p>
                <p>Description: {product.description}</p>
                <p>Category: {product.category?.name}</p>
                <p>Size: {product.size?.name}</p>
                <p>Color: {product.color?.name}</p>
                <img src={product.productImage} alt={product.name} className="w-32 h-32 object-cover mt-2" />
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
      )}
    </div>
  );
};

export default CartComponent;
