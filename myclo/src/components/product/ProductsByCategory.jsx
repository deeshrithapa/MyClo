import React, { useEffect, useState } from "react";
import axiosInstance from "../../Config/axiosConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import styles
import { useNavigate } from 'react-router-dom';

const ProductsByCategory = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGroupedProducts, setFilteredGroupedProducts] = useState({});
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/api/category/all");
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/api/products/all");
      const products = response.data || [];
      setProducts(products);

      // Group products by category
      const grouped = products.reduce((acc, product) => {
        const categoryId = product.category._id; // Assuming product.category is an object
        if (!acc[categoryId]) {
          acc[categoryId] = [];
        }
        acc[categoryId].push(product);
        return acc;
      }, {});

      setGroupedProducts(grouped);
      setFilteredGroupedProducts(grouped);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search query
    const filtered = Object.keys(groupedProducts).reduce((acc, categoryId) => {
      const filteredProducts = groupedProducts[categoryId].filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredProducts.length > 0) {
        acc[categoryId] = filteredProducts;
      }
      return acc;
    }, {});

    setFilteredGroupedProducts(filtered);
  }, [searchQuery, groupedProducts]);

  return (
    <div className="container mx-auto p-8 min-h-screen" style={{ backgroundColor: '#EEE9DD' }}>
      <ToastContainer />
      
      {/* Search Input Field */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category._id} className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
            <div className="overflow-hidden" style={{ maxHeight: "600px" }}>
              {filteredGroupedProducts[category._id] && filteredGroupedProducts[category._id].length > 0 ? (
                <Carousel
                  showThumbs={false}
                  infiniteLoop
                  autoPlay
                  emulateTouch
                  showStatus={false}
                  showArrows={true}
                  centerMode
                  centerSlidePercentage={20}
                  swipeable
                  className="carousel-container"
                >
                  {filteredGroupedProducts[category._id].map((product) => (
                    <div
                      key={product._id}
                      className="relative max-w-sm rounded-lg overflow-hidden shadow-lg bg-white mx-2" // Add margin here
                    >
                      {/* Product Image */}
                      <div className="relative group">
                        <img
                          className="w-full h-80 object-cover rounded"
                          src={product.productImage}
                          alt={product.name}
                        />
                        {/* Overlay */}
                        <div
                          className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-lg"
                          style={{
                            height: '100%', // Match height of the image
                            width: '100%'  // Match width of the image
                          }}
                        >
                          <div className="text-xl font-bold mb-2">{product.name}</div>
                          <button
                            onClick={() => navigate(`/product/${product._id}`)}
                            className="bg-[#A28D8D] text-white px-4 py-2 rounded text-xs hover:bg-[#8f7b7b] transition"
                          >
                            View Product
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              ) : (
                <div className="p-4 text-gray-500">No products available in this category</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsByCategory;
