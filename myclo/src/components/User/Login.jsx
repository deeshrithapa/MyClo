import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import {useDispatch} from "react-redux";
import loginImage from '../../Img/first.jpg'; // Adjust the path as needed
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for button disabling
  const navigate = useNavigate();

  useEffect(() => {
    const img = new Image();
    img.src = loginImage;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${loginImage})`;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log(response.data);

      // Assuming response.data contains the token
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Store the JWT token
        navigate('/'); // Redirect to the home page after successful login
      } else {
        setError('Login failed, please try again.');
      }
    } catch (error) {
      setError(error.response?.data?.msg || 'An error occurred');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: `url(${loginImage})` }}
    >
      <div className="bg-[#C8B8A2] bg-opacity-75 p-10 rounded shadow-md max-w-md w-full">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="mb-2 text-white">Email:</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-3 bg-[#C8B8A2] text-white border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300" 
              required // Ensure input is required
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
              required // Ensure input is required
            />
          </div>
          <div className="text-center mt-8">
            <button 
              type="submit" 
              className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors"
              disabled={isSubmitting} // Disable button while submitting
            >
              {isSubmitting ? 'Logging in...' : 'Login'} // Change text when submitting
            </button>
          </div>
          {error && <div className="text-center text-red-500 mt-4">{error}</div>}
          <div className="text-center mt-4">
            <p className="text-white">
              Don't have an account? <a href="/profile" className="text-black hover:underline">Sign up now</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;


