import React from 'react';
import Image from 'next/image';

const SellerDetail = ({ name, image, percentReview }) => {
  return (
    <div className='flex py-6 md:py-3 items-center'>
      <div className='relative w-36 h-36 md:h-20 md:w-20'>
        <Image
          className='rounded-full object-cover'
          layout='fill'
          src={image || ''}
        />
      </div>
      <div className='pl-6 md:pl-2'>
        <h4 className='text-xl md:text-base font-medium'>{name}</h4>
        <p className='text-gray-500 md:text-sm'>{percentReview}% Seller reviews</p>
      </div>
    </div>
  );
};

export default SellerDetail;
