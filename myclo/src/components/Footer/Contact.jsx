import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#EEE9DD] flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8B8A2]" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8B8A2]" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8B8A2]" 
              rows="4"
            ></textarea>
          </div>
          <div className="text-center">
            <button 
              type="submit" 
              className="px-6 py-2 bg-[#C8B8A2] text-white rounded-md hover:bg-opacity-80 transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
