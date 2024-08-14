import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Config/axiosConfig';

const FilterComponent = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: [],
    size: [],
    color: [],
    priceRange: [0, 10000],
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/api/category/all');
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFilters((prev) => {
      const updatedFilters = { ...prev };
      if (checked) {
        updatedFilters[name].push(value);
      } else {
        updatedFilters[name] = updatedFilters[name].filter((item) => item !== value);
      }
      return updatedFilters;
    });
  };

  const handlePriceRangeChange = (e) => {
    const [min, max] = e.target.value.split(',').map(Number);
    setFilters((prev) => ({
      ...prev,
      priceRange: [min, max],
    }));
  };

  return (
    <div className="border-2 rounded-lg p-4 font-bold w-60" style={{ borderColor: '#B19A9A', color: '#A28D8D',backgroundColor: '#C8B8A2' }}>
      <h2 className="text-lg font-bold mb-4">Filters</h2>
      <div className="mb-4">
        <h3 className="font-bold mb-2">Category</h3>
        {categories.map((category) => (
          <div key={category._id}>
            <input
              type="checkbox"
              id={category.name}
              name="category"
              value={category._id}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={category.name} className="ml-2">{category.name}</label>
          </div>
        ))}
      </div>
    
    
      <div className="mb-4">
        <h3 className="font-bold mb-2">Price Range</h3>
        <input
          type="range"
          min="0"
          max="10000"
          step="100"
          value={filters.priceRange.join(',')}
          onChange={handlePriceRangeChange}
        />
      </div>
    </div>
  );
};

export default FilterComponent;
