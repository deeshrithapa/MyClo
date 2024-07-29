import React from 'react';
import mission1 from '../../Img/mission.jpg';  // Update with the correct path
import mission2 from '../../Img/missoin2.jpg'; // Update with the correct path

const Mission = () => {
  return (
    <div className="min-h-screen bg-beige p-6 flex flex-col items-center">
      <div className="bg-white p-6 rounded-md shadow-lg border-2" style={{ borderColor: '#C8B8A2', maxWidth: '1200px', width: '100%' }}>
        <div className="flex flex-col md:flex-row mb-6">
          <div className="flex-1 mb-4 md:mb-0 md:mr-4">
            <img src={mission1} alt="Mission Image 1" className="w-full rounded-md object-cover" />
          </div>
          <div className="flex-1 text-center flex flex-col justify-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              We aim to inspire and empower women by offering bold and chic fashion choices that reflect individuality and confidence. Our mission is to provide high-quality, customizable clothing that fits perfectly and aligns with each woman's unique style preferences.
            </p>
          </div>
          <div className="flex-1 mb-4 md:mb-0 md:ml-4">
            <img src={mission2} alt="Mission Image 2" className="w-full rounded-md object-cover" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="flex flex-col items-center">
            <img src={mission1} alt="Natural" className="h-12 w-12 mb-2 rounded-full object-cover" />
            <h3 className="text-lg font-semibold">Natural</h3>
            <p className="text-gray-700 mt-2 text-center">
              Our products are made from natural materials, ensuring comfort and sustainability.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img src={mission1} alt="Sustainable" className="h-12 w-12 mb-2 rounded-full object-cover" />
            <h3 className="text-lg font-semibold">Sustainable</h3>
            <p className="text-gray-700 mt-2 text-center">
              We are committed to sustainable practices, minimizing our environmental footprint.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img src={mission1} alt="Locally Sourced" className="h-12 w-12 mb-2 rounded-full object-cover" />
            <h3 className="text-lg font-semibold">Locally Sourced</h3>
            <p className="text-gray-700 mt-2 text-center">
              We support local communities by sourcing materials and labor locally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
