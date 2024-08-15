import { useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContextReducer'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';

export const useCardComponent = () => {
  const { addToCart } = useCart();
  const [toastMessage, setToastMessage] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantities, setQuantities] = useState({});
  const [showCustomization, setShowCustomization] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [customizationSelections, setCustomizationSelections] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const isLoggedIn = !!localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const filteredProducts = (products) => 
    products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleSizeChange = (productId, size) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = { ...prevOptions, [productId]: { ...prevOptions[productId], size } };
      return newOptions;
    });
  };

  const handleColorChange = (productId, color) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = { ...prevOptions, [productId]: { ...prevOptions[productId], color } };
      return newOptions;
    });
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const handleAddToCart = (product) => {
    if (isLoggedIn) {
      if (role === 'user') {
        const selectedSize = selectedOptions[product._id]?.size;
        const selectedColor = selectedOptions[product._id]?.color;
        const selectedQuantity = quantities[product._id] || 1;

        if (selectedSize && selectedColor) {
          addToCart(product._id, selectedQuantity, selectedSize, selectedColor);
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
    setCurrentProduct(product);
    setShowCustomization(true);
    setCustomizationSelections({});
  };

  const handleCloseCustomization = () => {
    setShowCustomization(false);
    setCurrentProduct(null);
  };

  const handleCustomizationChange = (optionType, value) => {
    setCustomizationSelections((prevSelections) => ({
      ...prevSelections,
      [optionType]: value,
    }));
  };

  const handleSaveCustomization = async () => {
    if (isLoggedIn) {
      const token = localStorage.getItem('token');

      try {
        await axios.post(
          'http://localhost:5000/api/cart/add',
          {
            product: currentProduct._id,
            quantity: 1,
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

  return {
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
  };
};
