import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '../../Img/first.jpg'; // Adjust the path as needed

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    email: '',
    address: '',
    contactNumber: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform registration logic here
    // After successful registration, redirect to login
    navigate('/login');
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: `url(${loginImage})` }}
    >
      <div className="bg-[#C8B8A2] bg-opacity-75 p-10 rounded shadow-md max-w-4xl w-full">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Create New Account</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-2 text-white">Full Name:</label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="px-4 py-3 bg-[#C8B8A2] text-white border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300" 
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-white">Address:</label>
              <input 
                type="text" 
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="px-4 py-3 bg-[#C8B8A2] text-white border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300" 
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-white">Date Of Birth:</label>
              <input 
                type="date" 
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="px-4 py-3 bg-[#C8B8A2] text-white border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300" 
                style={{ colorScheme: 'dark' }} // This will change the calendar icon to white
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-white">Contact Number:</label>
              <input 
                type="tel" 
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="px-4 py-3 bg-[#C8B8A2] text-white border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300" 
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-white">Email:</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-3 bg-[#C8B8A2] text-white border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300" 
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-white">Password:</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="px-4 py-3 bg-[#C8B8A2] text-white border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300" 
              />
            </div>
          </div>
          <div className="text-center mt-8">
            <button 
              type="submit" 
              className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
              Join Now
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-white">
              Already have an account? <a href="/login" className="text-black hover:underline">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
