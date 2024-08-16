import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContextReducer';
import { useNavigate } from 'react-router-dom';
import { FiTrash2,FiX } from 'react-icons/fi';
import Modal from 'react-modal';

const Cart = () => {
  const { cart, fetchCart, removeFromCart } = useCart();
  const navigate = useNavigate(); 
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    console.log('Fetching cart...');
    fetchCart();
  }, []);

  useEffect(() => {
    console.log('Cart:', cart);
  }, [cart]);

  const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedItem(null);
  };

  if (!cart || cart.length === 0) {
    return <div className="text-center text-gray-600 py-10">Your cart is empty</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-[#EEE9DD] h-screen">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 "> {/* Decreased gap */}
        {cart.map((item) => (
          <div key={item._id} className="bg-white h-96 w-80 shadow-md rounded-lg overflow-hidden mt-4">
            <img 
              src={item.product.productImage} 
              alt={item.product.name} 
              className="w-full h-64 object-cover"
            />
            <div className="p-1">
              <h3 className="text-xl font-semibold text-gray-800">{item.product.name}</h3>
              <p className="text-gray-600">Price: Rs. {item.product.price}</p>
              <button 
                onClick={() => openModal(item)} 
                className="text-[#746262] hover:underline mt-2"
              >
                View Other Details
              </button>
              <div className="flex justify-end mt-4">
                <button 
                  onClick={() => removeFromCart(item._id)} 
                  className="text-red-500 hover:text-red-600"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <p className="text-lg font-semibold">Total: Rs. {totalPrice}</p>          
        <button 
          onClick={() => navigate('/checkout')} 
          className="bg-[#A28D8D] hover:bg-[#8f7b7b] text-white font-bold py-2 px-4 rounded mt-4"
        >
          Checkout
        </button>
      </div>

      {/* Modal for Other Details */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="max-w-lg mx-auto mt-20 bg-white p-6 rounded-lg shadow-lg relative"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
      >
        {selectedItem && (
          <div>
            {/* Cross icon at the top-right corner */}
            <button 
              onClick={closeModal} 
              className="absolute top-3 right-3 text-gray-700 hover:text-gray-900"
            >
              <FiX size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-4">{selectedItem.product.name}</h2>
            <p className="text-gray-600">Size: {selectedItem.size}</p>
            <p className="text-gray-600">Color: {selectedItem.color}</p>
            <p className="text-gray-600">Shoulder Type: {selectedItem.shoulderType}</p>
            <p className="text-gray-600">Pockets: {selectedItem.pockets}</p>
            <p className="text-gray-600">Hem: {selectedItem.hem}</p>
            <p className="text-gray-600">Vents: {selectedItem.vents}</p>
            <p className="text-gray-600">Quantity: {selectedItem.quantity}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Cart;
