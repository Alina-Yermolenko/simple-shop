import './ProductItem.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../types/types';

interface ProductItemProps {
  product: Product;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const {
    title,
    vendor,
    tags,
    published,
    url,
    image_src,
    price,
    subscription_discount,
    subscription,
  } = product;
  const [imageLoaded, setImageLoaded] = useState(true);

  const handleImageLoad = () => {
    setImageLoaded(true); 
  };

  const handleImageError = () => {
    setImageLoaded(false);
  };

  return (
    <li className="product">
      {published ?
        <>
          <h1 className="product__title">
            <Link to={url}>{title}</Link>
          </h1>
          <div className="product__data">
            
            <div className="product__image">
            {imageLoaded ? (
               <img src={image_src} alt='img' onLoad={handleImageLoad}
               onError={handleImageError}  className='image'/>
            ) : (
              <div className='image'>Failed to Load Image</div>
            )}
             
            </div>
            <p className="product__vendor">Vendor: {vendor}</p>
            <p className="product__tags">#{tags.join(' #')}</p>
            <p className="product__price">Price: ${price}</p>
            {subscription && <p className="product__subscription-discount">
              Subscription Discount: {subscription_discount}%
            </p>}
          </div>
        </>
        : <div>Not published yet, comming soon...</div>
      }
    </li>
  );
};
