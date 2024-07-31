import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import hangImage from '../../Img/hang.jpg';
import sizeImage from '../../Img/suit4.jpg';
import customizeImage from '../../Img/suit3.jpg';
import colorImage from '../../Img/suit1.jpg';
import firstImage from '../../Img/suit2.jpg';
import boxImage from '../../Img/box.jpg';
import saleImage from '../../Img/sale.jpg';
import sizeNewImage from '../../Img/suit5.jpg';
import saleNewImage from '../../Img/suit6.jpg';
import colorNewImage from '../../Img/suit7.jpg';

const WelcomeComponent = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: '20px',
  };

  return (
    <div className="bg-beige min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl w-full bg-beige border-4 p-4 rounded-md shadow-lg" style={{ borderColor: '#C8B8A2', height: '85vh' }}>
        <div className="flex justify-center">
          <img
            src={hangImage}
            alt="Monochrome Blossoms"
            className="object-cover rounded-md w-full"
          />
        </div>
        <div className="flex flex-col justify-center text-center md:text-left p-4">
          <h2 className="text-sm text-gray-500 uppercase">High Summer 2024</h2>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">Monochrome Blossoms</h1>
          <p className="text-gray-700 mt-4">
            Elevate your summer wardrobe with elegant, monochromatic floral designs from MyCla.
          </p>
          <button
            className="mt-6 px-6 py-3 text-white rounded-full shadow-lg hover:bg-opacity-90 transition"
            style={{ backgroundColor: '#B19A9A' }}
          >
            Shop Now
          </button>
        </div>
      </div>
      <div className="bg-[#B19A9A] text-white mt-10 p-6 rounded-md shadow-lg w-full">
        <h2 className="text-center text-2xl font-bold mb-4">Sneak Peak to our Collections</h2>
        <div className="w-full">
          <Slider {...settings}>
            <div className="px-2">
              <img src={sizeImage} alt="Size" className="object-cover rounded-md w-full" style={{ height: '300px', width: '100%' }} />
            </div>
            <div className="px-2">
              <img src={customizeImage} alt="Customize" className="object-cover rounded-md w-full" style={{ height: '300px', width: '100%' }} />
            </div>
            <div className="px-2">
              <img src={colorImage} alt="Color" className="object-cover rounded-md w-full" style={{ height: '300px', width: '100%' }} />
            </div>
            <div className="px-2">
              <img src={firstImage} alt="First" className="object-cover rounded-md w-full" style={{ height: '300px', width: '100%' }} />
            </div>
            <div className="px-2">
              <img src={sizeNewImage} alt="Size New" className="object-cover rounded-md w-full" style={{ height: '300px', width: '100%' }} />
            </div>
            <div className="px-2">
              <img src={saleNewImage} alt="Sale New" className="object-cover rounded-md w-full" style={{ height: '300px', width: '100%' }} />
            </div>
            <div className="px-2">
              <img src={colorNewImage} alt="Color New" className="object-cover rounded-md w-full" style={{ height: '300px', width: '100%' }} />
            </div>
          </Slider>
        </div>
      </div>
      <div className="w-full h-[50vh] bg-cover bg-center mt-10 rounded-md shadow-lg relative" style={{ backgroundImage: `url(${boxImage})` }}>
        <div className="absolute inset-y-0 right-0 flex items-center justify-center p-6 w-full md:w-1/2 text-[#B19A9A]">
          <p className="text-center text-4xl font-bold">
            Create your own style. Let it be unique for yourself and yet identifiable for others.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl w-full bg-beige p-4 mt-10 rounded-md shadow-lg" style={{ height: '40vh' }}> {/* Decreased height */}
        <div className="flex flex-col justify-center text-center md:text-left p-4 text-center">
          <h1 className="text-3xl font-bold" style={{ color: '#635353' }}>SUMMER SALE!</h1>
          <p className="mt-4" style={{ color: '#B19A9A' }}>
            Elevate your wardrobe with MyClo's custom clothing during our Summer Sale!
          </p>
          <button
            className="mt-6 px-6 py-3 text-white rounded-full shadow-lg hover:bg-opacity-90 transition"
            style={{ backgroundColor: '#B19A9A' }}
          >
            Shop Now
          </button>
        </div>
        <div className="flex justify-center items-center">
          <img
            src={saleImage}
            alt="Summer Sale"
            className="object-contain rounded-md max-h-[260px] w-full" 
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeComponent;
