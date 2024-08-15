import React, { useState } from 'react';

const ProductCard = ({ product }) => {
  const [showCustomization, setShowCustomization] = useState(false);

  const handleCustomizeClick = () => {
    setShowCustomization(true);
  };

  const handleCloseCustomization = () => {
    setShowCustomization(false);
  };

  return (
    <div className="product-card">
      {/* Other product details */}

      <div className="actions"> 
        <button className="add-to-cart-btn">Add to Cart</button>
        <button className="customize-btn" onClick={handleCustomizeClick}>Customize</button>
      </div>

      {showCustomization && (
        <div className="customization-modal">
          <div className="customization-content">
            <h2>Customize Your Suit</h2>
            {/* Your customization form fields */}
            <button onClick={handleCloseCustomization}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;