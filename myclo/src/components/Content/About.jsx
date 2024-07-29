import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import about1 from '../../Img/about1.jpg';
import about2 from '../../Img/about2.jpg';
import quoteImage from '../../Img/say.jpg';

const AboutComponent = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      // Scroll to top when component is mounted
      window.scrollTo(0, 0);
    }, []);
  
    const handleLearnMoreClick = () => {
      navigate('/mission');
    };
    const handleDiscoverMoreClick = () => {
        navigate('/vision');
    };

  return (
    <div className="bg-beige min-h-screen p-6">
      {/* Header Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
        <p className="text-sm text-gray-500 mt-2">Home &gt; About Us</p>
      </div>

      {/* Collage Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="flex justify-center items-center">
          <img src={about1} alt="About Us" className="object-cover rounded-md w-full h-80" />
        </div>
        <div className="bg-white p-6 rounded-md shadow-lg flex flex-col justify-center h-80" style={{ borderColor: '#C8B8A2', borderWidth: '2px' }}>
          <h2 className="text-sm text-gray-500 uppercase">Our Mission</h2>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">MyClo is Here to Make Women Bold & Chic</h1>
          <p className="text-gray-700 mt-4">
            In today’s fashion industry, personalization and customization are becoming increasingly important.
              Traditional 
             retail often fails to meet these needs. MyClo aims to fill this gap by
              offering a user-friendly platform for custom clothing design.
               By providing options for various sizes,
                MyClo ensures that all customers can find apparel that not only fits their
                 body but also matches their individual style preferences.
          </p>
          <button onClick={handleLearnMoreClick} className="mt-6 px-6 py-3 text-white rounded-full shadow-lg bg-[#B19A9A] hover:bg-[#a17d7d] transition">
            Learn More
          </button>
        </div>
        <div className="bg-white p-6 rounded-md shadow-lg flex flex-col justify-center h-80" style={{ borderColor: '#C8B8A2', borderWidth: '2px' }}>
          <h2 className="text-sm text-gray-500 uppercase">Our Vision</h2>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">Radiate Confidence with Our Chic and Fashion-Forward Apparel Collection</h1>
          <p className="text-gray-700 mt-4">
            MyClo is dedicated to empowering individuals to express their unique style through custom-designed clothing. Our vision is to create a platform where fashion meets individuality, offering high-quality, personalized apparel that caters to diverse body types and style preferences.
          </p>
          <button onClick={handleDiscoverMoreClick} className="mt-6 px-6 py-3 text-white rounded-full shadow-lg bg-[#B19A9A] hover:bg-[#a17d7d] transition">
                        Discover More
                    </button>
        </div>
        <div className="flex justify-center items-center">
          <img src={about2} alt="Our Vision" className="object-cover rounded-md w-full h-80" />
        </div>
      </div>

      {/* Quote Section */}
      <div className="text-center py-12" style={{ backgroundColor: '#B19A9A' }}>
        <p className="text-xl italic text-white">
          "Style Redefined: MyClo receives rave reviews for its curated fashions, blending trends and comfort, a wardrobe revelation."
        </p>
      </div>

      {/* What They Say About Us Section */}
      <div className="max-w-5xl mx-auto my-12">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">What They Say About Us</h2>
        <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-md shadow-lg">
          <img src={quoteImage} alt="Customer Review" className="object-cover rounded-md w-48 h-64 mb-6 md:mb-0 md:mr-6" />
          <div>
            <h3 className="text-xl font-bold text-gray-800">Adoration for Trendy Elegance</h3>
            <p className="text-gray-700 mt-4">
              "I absolutely adore the seasonal dress collection from MyClo. The designs are both trendy and elegant, making it easy to find the perfect outfit for any occasion."
            </p>
            <p className="mt-4 text-gray-800 font-bold">- Emily</p>
            <p className="text-sm text-gray-500">New York City</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
