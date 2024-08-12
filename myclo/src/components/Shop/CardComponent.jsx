import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import ToastNotification from '../notification/ToastNotification';

const CardComponent = (props) => {
  const { addToCart } = useCart();
  const [toastMessage, setToastMessage] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({});

  // Determine if the user is logged in and get their role
  const isLoggedIn = !!localStorage.getItem('token');
  const role = localStorage.getItem('role'); // Retrieve role from localStorage

  const handleSizeChange = (productId, size) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [productId]: { ...prevOptions[productId], size }
    }));
  };

  const handleColorChange = (productId, color) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [productId]: { ...prevOptions[productId], color }
    }));
  };

  const handleAddToCart = (product) => {
    if (isLoggedIn) {
      if (role === 'user') {
        const selectedSize = selectedOptions[product._id]?.size;
        const selectedColor = selectedOptions[product._id]?.color;

        if (selectedSize && selectedColor) {
          addToCart(product._id, 1, selectedSize, selectedColor);
          setToastMessage('Added to cart successfully!');
        } else {
          setToastMessage('Please select a size and color.');
        }
      } else {
        setToastMessage('You do not have permission to add items to the cart.');
      }
    } else {
      setToastMessage('You need to log in to add items to the cart.');
    }
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" style={{ backgroundColor: '#EEE9DD' }}>
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

              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Size:
                </label>
                <div className="flex flex-wrap gap-2">
                  {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(product._id, size)}
                      className={`px-4 py-2 border rounded-full text-sm font-semibold ${
                        selectedOptions[product._id]?.size === size ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Color:
                </label>
                <div className="flex gap-2">
                  {['red', 'green', 'blue', 'yellow'].map(color => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(product._id, color)}
                      className={`w-10 h-10 rounded-full border ${
                        selectedOptions[product._id]?.color === color ? 'border-black' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 text-left">
              <button
                className={`px-5 py-2 text-center transition ${
                  isLoggedIn
                    ? role === 'user'
                      ? 'bg-[#B19A9A] text-white hover:bg-[#a17d7d]'
                      : 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gray-400 text-white cursor-not-allowed'
                }`}
                onClick={() => handleAddToCart(product)}
                disabled={!isLoggedIn || role !== 'user'}
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
