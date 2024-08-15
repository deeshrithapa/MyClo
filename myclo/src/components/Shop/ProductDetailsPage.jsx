import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContextReducer'; // Adjust the import path

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showCustomization, setShowCustomization] = useState(false);
  const [customizations, setCustomizations] = useState({
    shoulderType: '',
    pockets: '',
    hem: '',
    vents: '',
  });
  const [showPopup, setShowPopup] = useState(false);

  const { addToCart } = useCart(); // Destructure the addToCart function from the context

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    addToCart(
      productId,
      quantity,
      selectedSize,
      selectedColor,
      customizations.shoulderType,
      customizations.pockets,
      customizations.hem,
      customizations.vents
    );

    // Show the "Added to Cart" pop-up
    setShowPopup(true);

    // Hide the pop-up after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const handleCustomizationChange = (optionType, value) => {
    setCustomizations((prev) => ({ ...prev, [optionType]: value }));
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-beige p-6 flex flex-col items-center">
      <div className="bg-white p-6 rounded-md shadow-lg border-2" style={{ borderColor: '#C8B8A2', maxWidth: '1200px', width: '100%' }}>
        <div className="flex flex-col md:flex-row mb-6">
          <div className="flex-1 mb-4 md:mb-0 md:mr-4">
            <img
              src={product.productImage}
              alt={product.name}
              className="w-full h-fit object-cover rounded-md"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <h1 className="text-3xl font-bold flex-1">{product.name}</h1>
              <p className="text-2xl font-bold">{`Rs.${product.price}`}</p>
            </div>
            <p className="text-lg mb-4">{product.description}</p>
            <div className="grid gap-4 mb-6">
              {/* Size Selector */}
              <div className="grid gap-2">
                <label className="text-base font-semibold">Size</label>
                <div className="flex gap-2">
                  {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`border rounded-md px-3 py-2 ${
                        selectedSize === size ? 'bg-gray-300' : ''
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div className="grid gap-2">
                <label className="text-base font-semibold">Color</label>
                <div className="flex gap-2">
                  {['black', 'gray', 'brown', 'white', 'red', 'green', 'beige', 'lightblue'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`border rounded-md px-3 py-2 ${
                        selectedColor === color ? 'border-1 border-black-500' : ''
                      }`}
                      style={{
                        backgroundColor: color,
                        boxShadow: selectedColor === color ? '0 0 10px rgba(0, 0, 0, 0.5)' : 'none',
                      }}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="grid gap-2">
                <label className="text-base font-semibold">Quantity</label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="border rounded-md p-2"
                >
                  {[1, 2, 3, 4, 5].map((qty) => (
                    <option key={qty} value={qty}>
                      {qty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Customization Section */}
              <div className="mt-6">
                <h3
                  className="text-xl font-semibold mb-4 cursor-pointer"
                  onClick={() => setShowCustomization(!showCustomization)}
                >
                  Customization Options {showCustomization ? '▲' : '▼'}
                </h3>
                {showCustomization && (
                  <div>
                    <div className="mb-4">
                      <label className="block text-base font-semibold mb-2">Shoulder Type</label>
                      <select
                        value={customizations.shoulderType}
                        onChange={(e) => handleCustomizationChange('shoulderType', e.target.value)}
                        className="border rounded-md p-2 w-full"
                      >
                        <option value="">Select shoulder type</option>
                        <option value="regular">Regular</option>
                        <option value="raglan">Raglan</option>
                        <option value="drop">Drop</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-base font-semibold mb-2">Pockets</label>
                      <select
                        value={customizations.pockets}
                        onChange={(e) => handleCustomizationChange('pockets', e.target.value)}
                        className="border rounded-md p-2 w-full"
                      >
                        <option value="">Select pockets</option>
                        <option value="none">None</option>
                        <option value="two">Two</option>
                        <option value="four">Four</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-base font-semibold mb-2">Hem</label>
                      <select
                        value={customizations.hem}
                        onChange={(e) => handleCustomizationChange('hem', e.target.value)}
                        className="border rounded-md p-2 w-full"
                      >
                        <option value="">Select hem</option>
                        <option value="straight">Straight</option>
                        <option value="curved">Curved</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-base font-semibold mb-2">Vents</label>
                      <select
                        value={customizations.vents}
                        onChange={(e) => handleCustomizationChange('vents', e.target.value)}
                        className="border rounded-md p-2 w-full"
                      >
                        <option value="">Select vents</option>
                        <option value="none">None</option>
                        <option value="center">Center</option>
                        <option value="side">Side</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="bg-[#A28D8D]  hover:bg-[#8f7b7b] text-white font-bold py-2 px-4 rounded-md"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <PopupMessage message="Added to Cart" visible={showPopup} />
    </div>
  );
};

const PopupMessage = ({ message, visible }) => {
  return visible ? (
    <div className="fixed top-0 right-0 mt-4 mr-4 bg-green-500 text-white p-2 rounded shadow">
      {message}
    </div>
  ) : null;
};

export default ProductDetailsPage;
