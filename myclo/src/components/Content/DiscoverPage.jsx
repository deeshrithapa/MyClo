import React from 'react';
import Slider from 'react-slick';
import image1 from '../../Img/suit1.jpg';
import image2 from '../../Img/suit2.jpg';
import image3 from '../../Img/suit3.jpg';
import image4 from '../../Img/suit4.jpg';
import image5 from '../../Img/suit5.jpg';

const DiscoverPage = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: '0px',
    arrows: false, // Optional: Hide arrows if not needed
  };

  return (
    <div className="min-h-screen bg-beige p-6 flex flex-col items-center">
      <style>
        {`
          .slick-slide img {
            width: 100%;
            height: 430px; /* Adjust the height as needed */
            object-fit: cover;
            transform: scale(0.9);
            transition: transform 0.5s ease;
          }
          
          .slick-center img {
            transform: scale(1.1);
            transition: transform 0.5s ease;
          }
        `}
      </style>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">EXPRESSIVE</h2>
        <h3 className="text-2xl text-gray-800 mb-2">TIMELESS ELEGANT</h3>
      </div>
      <div className="w-full max-w-6xl">
        <Slider {...settings}>
          <div className="px-2">
            <img src={image1} alt="Fashion 1" className="rounded-md object-cover" />
          </div>
          <div className="px-2">
            <img src={image2} alt="Fashion 2" className="rounded-md object-cover" />
          </div>
          <div className="px-2">
            <img src={image3} alt="Fashion 3" className="rounded-md object-cover" />
          </div>
          <div className="px-2">
            <img src={image4} alt="Fashion 4" className="rounded-md object-cover" />
          </div>
          <div className="px-2">
            <img src={image5} alt="Fashion 5" className="rounded-md object-cover" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default DiscoverPage;
