import React from 'react';
import './tailwind.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavBar/NavbarComponent';
import Landing from './components/Landing/Landing';
import FooterComponent from './components/Footer/FooterComponent';
import WelcomeComponent from './components/Welcome/WelcomeComponent';
import Registration from './components/User/Registration';
import Login from './components/User/Login';
import Contact from './components/Footer/Contact';
import AboutComponent from './components/Content/About';
import Mission from './components/Content/Mission';
import Vision from './components/Content/Vision';
import Shop from './components/Shop/Shop';
import DiscoverPage from './components/Content/DiscoverPage';
import CategoryComponent from './components/category/CategoryComponent';
import AddProductComponent from './components/product/AddProductComponent';
import CartComponent from './components/cart/CartComponent';
import { CartProvider } from './components/context/CartContext'; // Ensure correct path
import { AuthProvider } from './components/context/AuthContext'; // Ensure correct path
import { RoleProvider } from './components/context/RoleContext'; // Ensure correct path

function App() {
  return (
    <AuthProvider> {/* Ensure AuthProvider is correctly set up */}
      <RoleProvider> {/* Ensure RoleProvider is correctly set up */}
        <CartProvider> {/* Ensure CartProvider is correctly set up */}
          <Router>
            <NavbarComponent />
            <div className="flex flex-col min-h-screen">
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<WelcomeComponent />} />
                  <Route path="/profile" element={<Registration />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/about" element={<AboutComponent />} />
                  <Route path="/category" element={<CategoryComponent />} />
                  <Route path="/product" element={<AddProductComponent />} />
                  <Route path="/landing" element={<Landing />} />
                  <Route path="/mission" element={<Mission />} />
                  <Route path="/vision" element={<Vision />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/discover" element={<DiscoverPage />} />
                  <Route path="/cart" element={<CartComponent />} />
                </Routes>
              </main>
              <FooterComponent />
            </div>
          </Router>
        </CartProvider>
      </RoleProvider>
    </AuthProvider>
  );
}

export default App;
