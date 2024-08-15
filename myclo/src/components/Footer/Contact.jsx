import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    contactNumber: '',
    email: '',
    questions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      await axios.post('http://localhost:5000/api/contact/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Message sent successfully!');
      setFormData({
        firstName: '',
        contactNumber: '',
        email: '',
        questions: ''
      });
    } catch (error) {
      console.error(error);
      alert('Failed to send message');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EEE9DD] to-[#E3E3E3] flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-md shadow-md max-w-4xl w-full flex">
        <div className="flex-1 flex items-center justify-center">
          <FaEnvelope className="text-brown-600" size={200} style={{ color: '#C8B8A2' }} />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[#8B4513] mb-6 text-center">HAVE SOME QUESTIONS?</h2>
          <form className="space-y-4 w-full" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-[#8B4513] mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8B8A2]" 
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-[#8B4513] mb-1">Contact Number</label>
                <input 
                  type="text" 
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8B8A2]" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#8B4513] mb-1">What's your email?</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8B8A2]" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#8B4513] mb-1">Your questions...</label>
              <textarea 
                name="questions"
                value={formData.questions}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8B8A2]" 
                rows="4"
              ></textarea>
            </div>
            <div className="text-center">
              <button 
                type="submit" 
                className="px-6 py-2 bg-gradient-to-r from-[#C8B8A2] to-[#8B7D6B] text-white rounded-md hover:bg-opacity-80 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
