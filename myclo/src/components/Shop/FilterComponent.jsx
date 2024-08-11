import React, { useState, useEffect } from 'react';

const FilterComponent = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: [],
    size: [],
    color: [],
    priceRange: [0, 10000], // Example price range, adjust as needed
  });

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
        {['tops', 'bottoms', 'dresses', 'outerwear'].map((category) => (
          <div key={category}>
            <input
              type="checkbox"
              id={category}
              name="category"
              value={category}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={category} className="ml-2">{category.charAt(0).toUpperCase() + category.slice(1)}</label>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h3 className="font-bold mb-2">Size</h3>
        {['small', 'medium', 'large', 'xlarge'].map((size) => (
          <div key={size}>
            <input
              type="checkbox"
              id={size}
              name="size"
              value={size}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={size} className="ml-2">{size.toUpperCase()}</label>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h3 className="font-bold mb-2">Color</h3>
        {['black', 'blue', 'pink', 'brown'].map((color) => (
          <div key={color}>
            <input
              type="checkbox"
              id={color}
              name="color"
              value={color}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={color} className="ml-2">{color.charAt(0).toUpperCase() + color.slice(1)}</label>
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
