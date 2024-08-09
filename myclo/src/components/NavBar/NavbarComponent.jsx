import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa';

function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#C8B8A2] shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          {/* Left side links */}
          <div className="flex space-x-4 flex-1">
            <Link to="/shop" className="hidden md:block text-white text-lg font-semibold hover:text-gray-200 transition duration-300">Shop</Link>
            <Link to="/discover" className="hidden md:block text-white text-lg font-semibold hover:text-gray-200 transition duration-300">Discover</Link>
            <Link to="/category" className="hidden md:block text-white text-lg font-semibold hover:text-gray-200 transition duration-300">Category</Link>

          </div>
          
          {/* Center logo */}
          <div className="flex-grow text-center">
            <Link to="/" className="text-4xl text-white font-bold font-serif">MyClo</Link>
          </div>
          
          {/* Right side icons */}
          <div className="hidden md:flex space-x-4 items-center flex-1 justify-end">
            <Link to="/cart" className="text-white text-lg hover:text-gray-200 transition duration-300">
              <FaShoppingCart />
            </Link>
            <Link to="/search" className="text-white text-lg hover:text-gray-200 transition duration-300">
              <FaSearch />
            </Link>
            <Link to="/profile" className="text-white text-lg hover:text-gray-200 transition duration-300">
              <FaUser />
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button" onClick={() => setIsOpen(!isOpen)}>
              <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col items-center bg-[#C8B8A2]">
            <li><Link to="/shop" className="block text-sm px-2 py-4 text-white font-semibold hover:bg-gray-200 transition duration-300">Shop</Link></li>
            <li><Link to="/discover" className="block text-sm px-2 py-4 text-white font-semibold hover:bg-gray-200 transition duration-300">Discover</Link></li>
            <li><Link to="/cart" className="block text-sm px-2 py-4 text-white font-semibold hover:bg-gray-200 transition duration-300">Cart</Link></li>
            <li><Link to="/search" className="block text-sm px-2 py-4 text-white font-semibold hover:bg-gray-200 transition duration-300">Search</Link></li>
            <li><Link to="/profile" className="block text-sm px-2 py-4 text-white font-semibold hover:bg-gray-200 transition duration-300">Profile</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavbarComponent;
