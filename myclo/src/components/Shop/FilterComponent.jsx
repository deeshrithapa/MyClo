import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Config/axiosConfig';

const FilterComponent = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: [],
    size: [],
    color: [],
    priceRange: [500, 5000],
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
    const { name, value } = e.target;
    const newPriceRange = [...filters.priceRange];
    if (name === 'minPrice') {
      newPriceRange[0] = Number(value);
    } else if (name === 'maxPrice') {
      newPriceRange[1] = Number(value);
    }
    setFilters((prev) => ({
      ...prev,
      priceRange: newPriceRange,
    }));
  };

  return (
    <div className="border-2 rounded-lg p-4 font-bold w-60 border-[#B19A9A] text-[#A28D8D] bg-[#C8B8A2]">
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
              className="mr-2"
            />
            <label htmlFor={category.name} className="ml-2">{category.name}</label>
          </div>
        ))}
      </div>
    
      <div className="mb-4">
        <h3 className="font-bold mb-2">Price Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            name="minPrice"
            min="500"
            max="5000"
            step="100"
            value={filters.priceRange[0]}
            onChange={handlePriceRangeChange}
            className="border rounded p-2 w-full"
          />
          <span className="self-center">-</span>
          <input
            type="number"
            name="maxPrice"
            min="500"
            max="5000"
            step="100"
            value={filters.priceRange[1]}
            onChange={handlePriceRangeChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mt-2">
          <span>From: {filters.priceRange[0]}</span> - 
          <span> To: {filters.priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
