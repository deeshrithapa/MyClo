import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContextReducer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const { cart, cartId, clearCart } = useCart();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '' });
  const [shippingAddress, setShippingAddress] = useState({ address: '', city: '', state: '', zip: '', country: '' });
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiryMonth: '', expiryYear: '', cvc: '' });
  const [errors, setErrors] = useState({ contact: false, address: false });

  useEffect(() => {
    const calculatedTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    setTotal(calculatedTotal);
  }, [cart]);

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found, please log in again.');
      }
  
      const response = await axios.post('http://localhost:5000/api/orders/place-order', {
        cartId,
        contactInfo,
        shippingAddress,
        paymentMethod: 'cash'
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Updated header to include Bearer prefix
        }
      });
  
      console.log('Order placed response:', response.data);
      setShowPaymentPopup(false);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error('Error placing order:', error.response ? error.response.data : error.message);
      alert('There was an error placing your order. Please try again.');
    }
  };

  const handleCompletePurchase = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found, please log in again.');
      }
      await axios.post('http://localhost:5000/api/orders/complete-purchase', {
        cartId,
        contactInfo,
        shippingAddress,
        cardDetails
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Updated header to include Bearer prefix
        }
      });
      setShowPaymentPopup(false);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error('Error completing purchase:', error);
      alert('There was an error completing your purchase. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('contact')) {
      setContactInfo(prev => ({ ...prev, [name.split('_')[1]]: value }));
    } else if (name.startsWith('address')) {
      setShippingAddress(prev => ({ ...prev, [name.split('_')[1]]: value }));
    } else if (name.startsWith('cardDetails')) {
      setCardDetails(prev => ({ ...prev, [name.split('_')[1]]: value }));
    }
  };

  const closePopup = () => {
    setShowPaymentPopup(false);
  };

  return (
    <div className="container bg-[#EEE9DD]  h-screen mx-auto p-4 flex flex-col md:flex-row">
      <div className="flex-1 md:mr-4">
        <h2 className="text-[#947373] text-2xl font-bold mb-4">Checkout</h2>
        <form className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-[#947373] text-xl font-bold mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input 
                type="text" 
                name="contact_name" 
                placeholder="Name" 
                className="p-2 border rounded w-full" 
                onChange={handleInputChange}
              />
              {errors.contact && !contactInfo.name && (
                <p className="text-red-500 text-sm absolute -bottom-6 left-0">Required</p>
              )}
            </div>
            <div className="relative">
              <input 
                type="email" 
                name="contact_email" 
                placeholder="Email" 
                className="p-2 border rounded w-full" 
                onChange={handleInputChange}
              />
              {errors.contact && !contactInfo.email && (
                <p className="text-red-500 text-sm absolute -bottom-6 left-0">Required</p>
              )}
            </div>
          </div>
          <div className="relative mt-4">
            <input 
              type="text" 
              name="contact_phone" 
              placeholder="Phone Number" 
              className="p-2 border rounded w-full" 
              onChange={handleInputChange}
            />
            {errors.contact && !contactInfo.phone && (
              <p className="text-red-500 text-sm absolute -bottom-6 left-0">Required</p>
            )}
          </div>
          <h3 className="text-[#947373] text-xl font-bold mt-4 mb-4">Shipping Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input 
                type="text" 
                name="address_address" 
                placeholder="Address" 
                className="p-2 border rounded w-full" 
                onChange={handleInputChange}
              />
              {errors.address && !shippingAddress.address && (
                <p className="text-red-500 text-sm absolute -bottom-6 left-0">Required</p>
              )}
            </div>
            <div className="relative">
              <input 
                type="text" 
                name="address_city" 
                placeholder="City" 
                className="p-2 border rounded w-full" 
                onChange={handleInputChange}
              />
              {errors.address && !shippingAddress.city && (
                <p className="text-red-500 text-sm absolute -bottom-6 left-0">Required</p>
              )}
            </div>
          </div>
          <h3 className="text-[#947373] text-xl font-bold mt-4 mb-4">Payment Method</h3>
          <div className="flex gap-4">
            <button 
              type="button" 
              className="flex-1 border rounded-lg p-2 flex items-center justify-center"
              onClick={() => setShowPaymentPopup(true)}
            >
              <input type="radio" name="payment" id="card" className="mr-2" />
              <label htmlFor="card">Card</label>
            </button>
            <button 
              type="button" 
              className="flex-1 border rounded-lg p-2 flex items-center justify-center"
              disabled
            >
              <input type="radio" name="payment" id="cash" className="mr-2" />
              <label htmlFor="cash">Cash</label>
            </button>
          </div>
          <button 
            type="button"
            onClick={handlePlaceOrder} 
            className="bg-[#A28D8D] text-white font-bold py-2 px-4 rounded mt-4 block w-full"
          >
            Place Order
          </button>
        </form>
      </div>
      <div className="w-full md:w-1/3">
        <h3 className="text-[#947373] text-xl font-bold mb-4">Order Summary</h3>
        <div className="bg-white shadow-md rounded-lg p-4">
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between mb-4">
              <div className="flex items-center">
                <img src={item.product.productImage} alt={item.product.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                <div>
                  <h4 className="font-bold">{item.product.name}</h4>
                  <p>{item.quantity} x ${item.product.price.toFixed(2)}</p>
                </div>
              </div>
              <p className="font-bold">${(item.quantity * item.product.price).toFixed(2)}</p>
            </div>
          ))}
          <div className="flex justify-between border-t pt-4">
            <p className="text-[#947373] font-bold">Subtotal</p>
            <p className="font-bold">${total.toFixed(2)}</p>
          </div>
          <div className="flex justify-between border-t pt-4">
            <p className="text-[#947373] font-bold">Total</p>
            <p className="font-bold">${total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Payment Popup Modal */}
      {showPaymentPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h3 className="text-[#947373] text-xl font-bold mb-4">Payment</h3>
            <input 
              type="text" 
              placeholder="Card Number" 
              className="w-full p-2 border rounded mb-4" 
              onChange={handleInputChange}
              name="cardDetails_cardNumber"
            />
            <h4 className="text-[#947373] text-lg font-semibold mb-2">Expiry Date</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <select className="p-2 border rounded" name="cardDetails_expiryMonth" onChange={handleInputChange}>
                <option value="">MM</option>
                {[...Array(12).keys()].map((month) => (
                  <option key={month + 1} value={month + 1}>{String(month + 1).padStart(2, '0')}</option>
                ))}
              </select>
              <select className="p-2 border rounded" name="cardDetails_expiryYear" onChange={handleInputChange}>
                <option value="">YY</option>
                {[...Array(10).keys()].map((year) => (
                  <option key={year + 2024} value={year + 2024}>{year + 2024}</option>
                ))}
              </select>
            </div>
            <h4 className="text-[#947373] text-lg font-semibold mb-2">CVC</h4>
            <input 
              type="text" 
              placeholder="CVC" 
              className="w-full p-2 border rounded mb-4" 
              onChange={handleInputChange}
              name="cardDetails_cvc"
            />
            <button 
              className="bg-[#A28D8D] text-white font-bold py-2 px-4 rounded w-full"
              onClick={handleCompletePurchase}
            >
              Complete Purchase
            </button>
            <button 
              className="mt-4 text-gray-600 hover:text-gray-900 underline"
              onClick={closePopup}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex flex-col justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 text-center">
            <h3 className="text-xl font-bold mb-4">Order Successful!</h3>
            <p className="mb-4">Thank you for your purchase. Your order has been successfully placed.</p>
            <button 
              className="bg-[#A28D8D] text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                clearCart(); // Clear the cart
                navigate('/shop'); // Redirect to shop page
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
