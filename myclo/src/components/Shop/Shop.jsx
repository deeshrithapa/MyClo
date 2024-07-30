import React from 'react';
import FilterComponent from '../Shop/FilterComponent';
import CardComponent from '../Shop/CardComponent';
import suit3 from '../../Img/size.jpg';
import suit4 from '../../Img/cutom.jpg';
import mission from '../../Img/mission.jpg';

const productData = [
    {
      imgUrl: suit3,
      title: 'Casual T-Shirt',
      description: 'A  stylish t-shirt',
      price: 'Rs.1200'
    },
    {
        imgUrl: mission,
        title: 'Skinny Jeans',
      description: 'Slim-fit denim jeans',
      price: 'Rs.1200'
    },
    {
        imgUrl: suit4,
        title: 'Floral Dress',
      description: 'A feminine and flowy dress',
      price: 'Rs.1200'
    },
    {
        imgUrl: mission,
        title: 'Leather Jacket',
      description: 'A stylish and durable jacket',
      price: 'Rs.1200'
    },
    {
        imgUrl: mission,
        title: 'Sneakers',
      description: 'Comfortable sneakers',
      price: 'Rs.1200'
    },
    {
        imgUrl: suit4,
        title: 'Sunglasses',
      description: ' protective sunglasses',
      price: 'Rs.1200'
    },
    {
        imgUrl: suit3,
        title: 'Watch',
      description: 'Elegant and functional watch',
      price: 'Rs.1200'
    },
    {
        imgUrl: suit4,
        title: 'Hat',
      description: 'Casual and cool hat',
      price: 'Rs.1200'
    },
  ];
  
  const Shop = () => {
    return (
      <div className="flex p-4">
        <div className="w-1/4 p-4">
          <FilterComponent />
        </div>
        <div className="w-3/4 p-4">
          <CardComponent data={productData} />
        </div>
      </div>
    );
  };
  
  export default Shop;