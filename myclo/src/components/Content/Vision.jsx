import React from 'react';
import suit2 from '../../Img/material.jpg';
import suit3 from '../../Img/size.jpg';
import suit4 from '../../Img/cutom.jpg';
import mission from '../../Img/mission.jpg';

const Vision = () => {
  return (
    <div className="bg-beige min-h-screen p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative">
          <img src={suit2} alt="Face" className="w-full h-60 object-cover rounded-md" />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h2 className="text-white text-2xl font-bold">MATERIAL</h2>
          
          </div>
        </div>
        <div className="relative">
          <img src={suit3} alt="Body" className="w-full h-60 object-cover rounded-md" />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h2 className="text-white text-2xl font-bold">SIZE</h2>
            
          </div>
        </div>
        <div className="relative">
          <img src={suit4} alt="Hair" className="w-full h-60 object-cover rounded-md" />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h2 className="text-white text-2xl font-bold">CUSTOM</h2>
           
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex justify-center items-center">
          <img src={mission} alt="Information" className="object-cover rounded-md w-full h-80" />
        </div>
        <div className="bg-white p-6 rounded-md shadow-lg" style={{ borderColor: '#C8B8A2', borderWidth: '2px' }}>
          <h2 className="text-sm text-gray-500 uppercase">Our Vision</h2>
          <p className="text-gray-700 mt-4">
          At our core, we envision a world where creativity and quality blend seamlessly. Our vision is to inspire and empower individuals through 
          our meticulously designed clothing and accessories.  We strive to set new standards in fashion by combining timeless elegance with modern trends, ensuring that each piece not only meets but
           exceeds our customers' expectations.Our commitment goes beyond just creating beautiful products; we are dedicated to making a 
           positive impact on the community and the environment. By prioritizing sustainable practices and ethical sourcing, we aim to 
           contribute to a better future while delivering exceptional value and style to our customers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Vision;
