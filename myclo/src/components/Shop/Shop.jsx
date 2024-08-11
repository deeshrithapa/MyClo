import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Config/axiosConfig';
import FilterComponent from './FilterComponent'; // Adjust the import path as needed
import CardComponent from './CardComponent'; // Adjust the import path as needed

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    size: [],
    color: [],
    priceRange: [0, 10000],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/api/products/all');
        setProducts(response.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      const filtered = products.filter((product) => {
        const withinPriceRange =
          product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
        const matchesCategory = filters.category.length === 0 || filters.category.includes(product.category._id);
        const matchesSize = filters.size.length === 0 || product.sizes.some(size => filters.size.includes(size._id));
        const matchesColor = filters.color.length === 0 || product.colors.some(color => filters.color.includes(color._id));

        return withinPriceRange && matchesCategory && matchesSize && matchesColor;
      });
      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [products, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex p-4" style={{ backgroundColor: '#EEE9DD'}}>
      <div className="w-1/4 p-4">
        <FilterComponent onFilterChange={handleFilterChange} />
      </div>
      <div className="w-3/4 p-4">
        <CardComponent data={filteredProducts} />
      </div>
    </div>
  );
};

export default Shop;
