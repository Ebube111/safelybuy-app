import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Product = ({ id, title, img, price, rating, condition }) => {
  return (
    <Link href={`/shopping/products/${id}`}>
      <div className='relative w-48 cursor-pointer md:w-36'>
        <div className='relative h-48 w-48 md:w-36 md:h-36'>
          <Image
            className='rounded-lg object-cover'
            src={img || '/img/no-image.png'}
            layout='fill'
          />
        </div>
        <div className='py-4 px-3'>
          <p className='font-medium md:text-xs'>{title}</p>
          <div className='flex justify-between'>
            <span className='text-xl font-bold text-purple-500 md:text-sm'>
              &#8358;{price.toLocaleString()}
            </span>
            <span className='flex items-center rating text-xs'>
              <svg
                width='12'
                height='12'
                className='inline-block mr-1'
                viewBox='0 0 12 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M5.99968 10.0649L2.39669 11.9591L3.0848 7.94712L0.169922 5.10581L4.19819 4.52047L5.99968 0.870239L7.80118 4.52047L11.8294 5.10581L8.91457 7.94712L9.60268 11.9591L5.99968 10.0649Z'
                  fill='#F2C94C'
                />
              </svg>
              {rating} <span className='md:hidden'></span>
            </span>
          </div>
          <p
            className={
              condition !== 'new'
                ? 'inline-block absolute top-2 w-10 h-10 left-2 text-sm rounded-full px-2 pt-2 text-white bg-green-600'
                : 'inline-block absolute top-2 w-8 h-8 left-2 text-sm rounded-full px-1 pt-1 text-white bg-red-600'
            }
          >
            {condition}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Product;
