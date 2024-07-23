import React from 'react';
import { Link } from 'react-router-dom';

const FooterComponent = () => {
  return (
    <footer className="bg-[#C8B8A2] text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo or Store Name */}
        <div className="text-2xl font-bold mb-4 ml-28 md:mb-0">
          MyClo
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row md:space-x-6 mb-4 ml-96  md:mb-0">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/shop" className="hover:text-gray-400">Shop</Link>
          <Link to="/about" className="hover:text-gray-400">About Us</Link>
          <Link to="/contact" className="hover:text-gray-400">Contact</Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-400">
            <i className="fab fa-facebook-f"></i> {/* FontAwesome icon */}
          </a>
          <a href="#" className="hover:text-gray-400">
            <i className="fab fa-twitter"></i> {/* FontAwesome icon */}
          </a>
          <a href="#" className="hover:text-gray-400">
            <i className="fab fa-instagram"></i> {/* FontAwesome icon */}
          </a>
        </div>
      </div>

     
    </footer>
  );
};

export default FooterComponent;
