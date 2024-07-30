import React from 'react';

const FilterComponent = () => {
  return (
    <div className="border-2 rounded-lg p-4" style={{ borderColor: '#EEE9DD', color: '#635353' }}>
      <h2 className="text-lg font-bold mb-4">Filters</h2>
      <div className="mb-4">
        <h3 className="font-bold mb-2">Category</h3>
        <div>
          <input type="checkbox" id="tops" name="category" value="tops" />
          <label htmlFor="tops" className="ml-2">Tops</label>
        </div>
        <div>
          <input type="checkbox" id="bottoms" name="category" value="bottoms" />
          <label htmlFor="bottoms" className="ml-2">Bottoms</label>
        </div>
        <div>
          <input type="checkbox" id="dresses" name="category" value="dresses" />
          <label htmlFor="dresses" className="ml-2">Dresses</label>
        </div>
        <div>
          <input type="checkbox" id="outerwear" name="category" value="outerwear" />
          <label htmlFor="outerwear" className="ml-2">Outerwear</label>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-bold mb-2">Size</h3>
        <div>
          <input type="checkbox" id="small" name="size" value="small" />
          <label htmlFor="small" className="ml-2">S</label>
        </div>
        <div>
          <input type="checkbox" id="medium" name="size" value="medium" />
          <label htmlFor="medium" className="ml-2">M</label>
        </div>
        <div>
          <input type="checkbox" id="large" name="size" value="large" />
          <label htmlFor="large" className="ml-2">L</label>
        </div>
        <div>
          <input type="checkbox" id="xlarge" name="size" value="xlarge" />
          <label htmlFor="xlarge" className="ml-2">XL</label>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-bold mb-2">Color</h3>
        <div>
          <input type="checkbox" id="black" name="color" value="black" />
          <label htmlFor="black" className="ml-2">Black</label>
        </div>
        <div>
          <input type="checkbox" id="blue" name="color" value="blue" />
          <label htmlFor="blue" className="ml-2">Blue</label>
        </div>
        <div>
          <input type="checkbox" id="pink" name="color" value="pink" />
          <label htmlFor="pink" className="ml-2">Pink</label>
        </div>
        <div>
          <input type="checkbox" id="brown" name="color" value="brown" />
          <label htmlFor="brown" className="ml-2">Brown</label>
        </div>
      </div>
      <div>
        <h3 className="font-bold mb-2">Price Range</h3>
        {/* Price Range Input Components */}
      </div>
    </div>
  );
};

export default FilterComponent;
