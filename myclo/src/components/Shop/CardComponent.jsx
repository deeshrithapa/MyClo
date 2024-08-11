import React from 'react';

const CardComponent = (props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {props.data.map((product) => (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white" key={product._id}>
          <img
            className="w-full h-64 object-cover p-5 bg-cover rounded"
            src={product.productImage}
            alt={product.name}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-[#635353]">{product.name}</div>
            <p className="text-gray-700 text-base">{product.description}</p>
            <p className="text-gray-900 font-bold">${product.price}</p>
          </div>
          <div className="px-6 py-4 text-left">
            <button className="bg-[#B19A9A] text-white px-5 py-2 text-center hover:bg-[#a17d7d] transition">Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardComponent;
