import React from 'react';
import { useCardComponent } from './useCardComponent'; // Adjust the path as needed
import { Link } from 'react-router-dom';
import ToastNotification from '../notification/ToastNotification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCartPlus } from '@fortawesome/free-solid-svg-icons'; // Import faCartPlus

const CardComponent = (props) => {
  const {
    toastMessage,
    selectedOptions,
    quantities,
    showCustomization,
    currentProduct,
    customizationSelections,
    searchQuery,
    filteredProducts,
    handleSizeChange,
    handleColorChange,
    handleQuantityChange,
    handleAddToCart,
    handleCustomizeClick,
    handleCloseCustomization,
    handleCustomizationChange,
    handleSaveCustomization,
    setSearchQuery,
    setToastMessage,
  } = useCardComponent();

  return (
    <>
    <div className='mr-40'>    
      {/* Search Input */}
      <div className="mb-4 ">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full text-xs"
        />
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        style={{ backgroundColor: '#EEE9DD' }}
      >
        {filteredProducts(props.data).map((product) => (
          <div
            className="relative max-w-sm rounded-lg overflow-hidden shadow-lg bg-white"
            key={product._id}
          >
            {/* Product Image */}
            <div className="relative group">
              <img
                className="w-full h-72 object-cover p-5 bg-cover rounded"
                src={product.productImage}
                alt={product.name}
              />
              {/* Overlay */}
              <Link
                to={`/product/${product._id}`}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-lg font-bold"
                style={{
                  height: '86%', // Adjust the height as needed
                  width: '85%',  // Adjust the width as needed
                  top: '28%',    // Center vertically
                  left: '28%',   // Center horizontally
                  transform: 'translate(-25%, -25%)', // Center properly
                }}
              >
                View Product
              </Link>
            </div>

            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="font-bold text-xl text-[#635353]">
                    {product.name}
                  </div>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="text-[#A28D8D] hover:text-[#8f7b7b] transition"
                >
                  <FontAwesomeIcon icon={faCartPlus} size="lg" />
                </button>
              </div>

              <p className="text-gray-700 text-base">{product.description}</p>

              <p className="text-gray-900 font-bold">
                Rs.{product.price * (quantities[product._id] || 1)}
              </p>

              <div className="mt-4">
                {/* Size and Quantity Section in a Row */}
                <div className="flex gap-2 items-center mb-2">
                  {/* Size */}
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">
                      Size:
                    </label>
                    <select
                      value={selectedOptions[product._id]?.size || ''}
                      onChange={(e) => handleSizeChange(product._id, e.target.value)}
                      className="border rounded px-2 py-1 text-xs"
                    >
                      {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-gray-700 text-xs font-bold mb-1">
                      Quantity:
                    </label>
                    <select
                      value={quantities[product._id] || 1}
                      onChange={(e) =>
                        handleQuantityChange(product._id, parseInt(e.target.value))
                      }
                      className="border rounded px-2 py-1 text-xs"
                    >
                      {[1, 2, 3, 4, 5].map((qty) => (
                        <option key={qty} value={qty}>
                          {qty}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Color Section */}
                <div>
                  <label className="block text-gray-700 text-xs font-bold mb-1">
                    Color:
                  </label>
                  <div className="flex gap-1">
                    {['black', 'gray', 'brown', 'white', 'red', 'green', 'beige', 'lightblue'].map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorChange(product._id, color)}
                        className={`w-4 h-5 border ${
                          selectedOptions[product._id]?.color === color
                            ? 'border-black'
                            : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleCustomizeClick(product)}
                  className="bg-[#A28D8D] text-white px-4 py-2 rounded text-xs hover:bg-[#8f7b7b] transition"
                >
                  Customize
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {toastMessage && (
        <ToastNotification message={toastMessage} onClose={() => setToastMessage('')} />
      )}

      {/* Customization Modal */}
      {showCustomization && currentProduct && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2"
              onClick={handleCloseCustomization}
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>

            <h3 className="text-xl font-semibold mb-4">
              Customize {currentProduct.name}
            </h3>

            <div className="mb-4">
              <label className="block text-gray-700 text-xs font-bold mb-2">
                Shoulder Type:
              </label>
              <select
                value={customizationSelections.shoulder || ''}
                onChange={(e) =>
                  handleCustomizationChange('shoulder', e.target.value)
                }
                className="border rounded px-4 py-2 w-full text-xs"
              >
                <option value="">Select shoulder type</option>
                <option value="regular">Regular</option>
                <option value="raglan">Raglan</option>
                <option value="drop">Drop</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-xs font-bold mb-2">
                Pockets:
              </label>
              <select
                value={customizationSelections.pockets || ''}
                onChange={(e) => handleCustomizationChange('pockets', e.target.value)}
                className="border rounded px-4 py-2 w-full text-xs"
              >
                <option value="">Select pockets</option>
                <option value="none">None</option>
                <option value="two">Two</option>
                <option value="four">Four</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-xs font-bold mb-2">
                Hem:
              </label>
              <select
                value={customizationSelections.hem || ''}
                onChange={(e) => handleCustomizationChange('hem', e.target.value)}
                className="border rounded px-4 py-2 w-full text-xs"
              >
                <option value="">Select hem</option>
                <option value="straight">Straight</option>
                <option value="curved">Curved</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-xs font-bold mb-2">
                Vents:
              </label>
              <select
                value={customizationSelections.vents || ''}
                onChange={(e) => handleCustomizationChange('vents', e.target.value)}
                className="border rounded px-4 py-2 w-full text-xs"
              >
                <option value="">Select vents</option>
                <option value="none">None</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
              </select>
            </div>

            <button
              onClick={handleSaveCustomization}
              className="bg-[#A28D8D] text-white px-4 py-2 rounded text-xs hover:bg-[#8f7b7b] transition"
            >
              Save Customization
            </button>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default CardComponent;
