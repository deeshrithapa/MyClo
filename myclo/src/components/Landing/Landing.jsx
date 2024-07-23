import React from 'react';
import image from '../../Img/first.jpg';
import image1 from '../../Img/color.jpg';
import image2 from '../../Img/customize.jpg';
import image3 from '../../Img/size.jpg';

const Landing = () => {
  return (
    <>
      <div className="relative h-[calc(100vh-4rem)]">
        <img
          src={image}
          alt="Fashion"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 p-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">MyClo</h1>
          <button className="bg-[#AC9582] text-white border-2 border-white rounded-full p-3 flex items-center justify-center">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="bg-white py-8 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <img
              src={image1}
              alt="Image 1"
              className="object-cover w-full h-40 md:h-72"
            />
            <div className="flex items-center justify-center bg-gray-400 text-black text-sm sm:text-lg md:text-xl font-bold p-4 h-48 md:h-72">Customizable</div>
            <img
              src={image2}
              alt="Image 2"
              className="object-cover w-full h-48 md:h-72"
            />
            <div className="flex items-center justify-center bg-slate-500 text-white text-sm sm:text-lg md:text-xl font-bold p-4 h-48 md:h-72">Design Selection</div>
            <img
              src={image3}
              alt="Image 3"
              className="object-cover w-full h-48 md:h-72"
            />
            <div className="flex items-center justify-center bg-zinc-500 text-white text-sm sm:text-lg md:text-xl font-bold p-4 h-48 md:h-72">Personalization</div>
          </div>
        </div>
      </div>     
    </>
  );
};

export default Landing;
