import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContextReducer'; // Adjust path as needed
import ToastNotification from '../notification/ToastNotification';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';




const CardComponent = (props) => {
  const { addToCart } = useCart(); // Use the hook here
  const [toastMessage, setToastMessage] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantities, setQuantities] = useState({});
  const [showCustomization, setShowCustomization] = useState(false); // State for handling modal visibility
  const [currentProduct, setCurrentProduct] = useState(null); // To track which product is being customized
  const [customizationSelections, setCustomizationSelections] = useState({}); // State for customization options

  const isLoggedIn = !!localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate(); 

  const handleSizeChange = (productId, size) => {
    setSelectedOptions(prevOptions => {
      const newOptions = { ...prevOptions, [productId]: { ...prevOptions[productId], size } };
      return newOptions;
    });
  };

  const handleColorChange = (productId, color) => {
    setSelectedOptions(prevOptions => {
      const newOptions = { ...prevOptions, [productId]: { ...prevOptions[productId], color } };
      return newOptions;
    });
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: quantity
    }));
  };

  const handleAddToCart = (product) => {
    if (isLoggedIn) {
      if (role === 'user') {
        const selectedSize = selectedOptions[product._id]?.size;
        const selectedColor = selectedOptions[product._id]?.color;
        const selectedQuantity = quantities[product._id] || 1; // Default to 1 if not selected

        if (selectedSize && selectedColor) {
          addToCart(product._id, selectedQuantity, selectedSize, selectedColor); // Add item to cart with quantity
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

  const handleCustomizeClick = (product) => {
    setCurrentProduct(product); // Set the current product to be customized
    setShowCustomization(true); // Show the customization modal
    setCustomizationSelections({}); // Reset customization selections
  };

  const handleCloseCustomization = () => {
    setShowCustomization(false); // Close the customization modal
    setCurrentProduct(null); // Reset the current product
  };

  const handleCustomizationChange = (optionType, value) => {
    setCustomizationSelections(prevSelections => ({
      ...prevSelections,
      [optionType]: value
    }));
  };

  const handleSaveCustomization = async () => {
    if (isLoggedIn) {
      const token = localStorage.getItem('token');
  
      try {
        const response = await axios.post(
          'http://localhost:5000/api/cart/add', // Use the correct endpoint here
          {
            product: currentProduct._id,
            quantity: 1, // Adjust if needed
            size: selectedOptions[currentProduct._id]?.size,
            color: selectedOptions[currentProduct._id]?.color,
            shoulderType: customizationSelections.shoulder,
            pockets: customizationSelections.pockets,
            hem: customizationSelections.hem,
            vents: customizationSelections.vents,
          },
          {
            headers: { Authorization: token },
          }
        );
  
        setToastMessage('Customization saved successfully!');
        handleCloseCustomization();
        navigate('/cart');
      } catch (error) {
        console.error('Error saving customization:', error);
        setToastMessage('Failed to save customization.');
      }
  
      setTimeout(() => setToastMessage(''), 3000);
    } else {
      setToastMessage('You need to log in to save customizations.');
      setTimeout(() => setToastMessage(''), 3000);
    }
  };
  
  
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" style={{ backgroundColor: '#EEE9DD' }}>
        {props.data.map((product) => (
          <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white" key={product._id}>
            {/* Product Image */}
            <img
              className="w-full h-64 object-cover p-5 bg-cover rounded"
              src={product.productImage}
              alt={product.name}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-[#635353]">{product.name}</div>
              <p className="text-gray-700 text-base">{product.description}</p>

              {/* Calculate total price based on quantity */}
              <p className="text-gray-900 font-bold">
                Rs.{product.price * (quantities[product._id] || 1)}
              </p>

              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Size:</label>
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
                <label className="block text-gray-700 text-sm font-bold mb-2">Color:</label>
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

              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Quantity:</label>
                <select
                  value={quantities[product._id] || 1}
                  onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
                  className="border rounded px-4 py-2"
                >
                  {[1, 2, 3, 4, 5].map(qty => (
                    <option key={qty} value={qty}>{qty}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="px-6 py-4 flex gap-4 text-left">
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
              <button
                className="px-5 py-2 text-center bg-gray-500 text-white font-bold hover:bg-gray-600 transition"
                onClick={() => handleCustomizeClick(product)}
              >
                Customize
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <ToastNotification message={toastMessage} onClose={() => setToastMessage('')} />

      {/* Customization Modal */}
      {showCustomization && currentProduct && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        onClick={handleCloseCustomization}
      >
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </button>
      <h2 className="text-2xl font-bold mb-4">Customize {currentProduct.name}</h2>
      {/* Customization Options */}
      <div className="mb-4">
        <label className="block text-gray-700">Shoulder Type:</label>
        <div className="flex flex-wrap gap-2">
          {['Standard', 'Roped', 'Soft'].map(shoulder => (
            <button
              key={shoulder}
              onClick={() => handleCustomizationChange('shoulder', shoulder)}
              className={`p-2 border rounded ${
                customizationSelections.shoulder === shoulder ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
              }`}
            >
              {shoulder}
            </button>
          ))}
        </div>
      </div>

      {/* Pockets */}
      <div className="mb-4">
        <label className="block text-gray-700">Pockets:</label>
        <div className="flex flex-wrap gap-2">
          {['Patch Pocket', 'Pocket Flaps'].map(pocket => (
            <button
              key={pocket}
              onClick={() => handleCustomizationChange('pockets', pocket)}
              className={`p-2 border rounded ${
                customizationSelections.pockets === pocket ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
              }`}
            >
              {pocket}
            </button>
          ))}
        </div>
      </div>

      {/* Hem */}
      <div className="mb-4">
        <label className="block text-gray-700">Hem:</label>
        <div className="flex flex-wrap gap-2">
          {['Cuff', 'Blind Hem'].map(hem => (
            <button
              key={hem}
              onClick={() => handleCustomizationChange('hem', hem)}
              className={`p-2 border rounded ${
                customizationSelections.hem === hem ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
              }`}
            >
              {hem}
            </button>
          ))}
        </div>
      </div>

      {/* Vents */}
      <div className="mb-4">
        <label className="block text-gray-700">Vents:</label>
        <div className="flex flex-wrap gap-2">
          {['One', 'Two', 'None'].map(vent => (
            <button
              key={vent}
              onClick={() => handleCustomizationChange('vents', vent)}
              className={`p-2 border rounded ${
                customizationSelections.vents === vent ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
              }`}
            >
              {vent}
            </button>
          ))}
        </div>
      </div>

      <button 
        className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 mt-4"
        onClick={handleSaveCustomization}
      >
        Save Customization 
      </button>
    </div>
  </div>
)}

    </>
  );
};

export default CardComponent;
