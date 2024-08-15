import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customizations, setCustomizations] = useState({
    shoulderType: '',
    pockets: '',
    hem: '',
    vents: '',
  });

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

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('User not authenticated');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/cart/add',
        {
          product: productId,
          quantity,
          size: selectedSize,
          color: selectedColor,
          ...customizations,
        },
        {
          headers: { Authorization: token },
        }
      );
      console.log('Added to cart successfully');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
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
              className="w-full h-96 object-cover rounded-md"
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
                <label htmlFor="size" className="text-base font-semibold">Size</label>
                <select
                  id="size"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="border rounded-md p-2"
                >
                  {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color Selector */}
              <div className="grid gap-2">
                <label htmlFor="color" className="text-base font-semibold">Color</label>
                <select
                  id="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="border rounded-md p-2"
                >
                  {['black', 'gray', 'brown', 'white', 'red', 'green', 'beige', 'lightblue'].map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity Selector */}
              <div className="grid gap-2">
                <label htmlFor="quantity" className="text-base font-semibold">Quantity</label>
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
                <h3 className="text-xl font-semibold mb-4">Customization Options</h3>

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
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-[#A28D8D] text-white px-4 py-2 rounded text-xs hover:bg-[#8f7b7b] transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
