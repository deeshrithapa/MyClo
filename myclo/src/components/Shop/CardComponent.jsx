import React, { useState, useContext } from 'react';
import ToastNotification from '../notification/ToastNotification'; // Adjust path as needed
import CartContext from '../context/CartContext'; // Adjust path as needed

const CardComponent = (props) => {
  const { addToCart } = useContext(CartContext);
  const [toastMessage, setToastMessage] = useState('');

  const handleAddToCart = (product) => {
    addToCart(product); // Add full product details to the cart
    setToastMessage('Added to cart successfully!'); // Show toast message
    setTimeout(() => setToastMessage(''), 3000); // Hide toast after 3 seconds
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" style={{ backgroundColor: '#EEE9DD'}}>
        {props.data.map((product) => (
          <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white" key={product._id}>
            <img
              className="w-full h-64 object-cover p-5 bg-cover rounded"
              src={product.productImage}
              alt={product.name}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-[#635353]">{product.name}</div>
              <p className="text-gray-700 text-base">{product.description}</p>
              <p className="text-gray-900 font-bold">Rs.{product.price}</p>
            </div>
            <div className="px-6 py-4 text-left">
              <button
                className="bg-[#B19A9A] text-white px-5 py-2 text-center hover:bg-[#a17d7d] transition"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastNotification message={toastMessage} onClose={() => setToastMessage('')} />
    </>
  );
};

export default CardComponent;
