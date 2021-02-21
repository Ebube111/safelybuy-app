import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Navigation from 'subviews/header';
import Footer from 'components/Footer';
import Back from 'components/Back';
import { shoppingItems } from 'data';

import Head from 'next/head';

const ProductDetail = ({}) => {
  const [favourite, setFavourite] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const [product] = shoppingItems.filter((e) => e.id === id);

  if (!product) return null;
  const { name, src, price, rating } = product;

  return (
    <div>
      <Head>
        <title>Safelybuy - Shopping</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='relative pb-48 flex flex-col min-h-screen md:pb-72'>
        <Navigation />
        <div className='pt-28 my-8 mx-20'>
          <Back />
          <div className='flex'>
            <div className='w-1/2 md:w-full'>
              <div className='relative h-96 w-9/12'>
                <Image
                  className='rounded-lg object-cover'
                  src={src || '/image/yusuf.png'}
                  layout='fill'
                />
                <svg
                  className='absolute cursor-pointer top-6 right-6'
                  onClick={() => setFavourite(!favourite)}
                  width='40'
                  height='40'
                  viewBox='0 0 40 40'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect width='40' height='40' rx='4' fill='white' />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M20.9195 12.2467C21.811 11.8104 22.5886 11.6667 23.795 11.6667C26.8823 11.6795 29.1673 14.2832 29.1673 17.5999C29.1673 20.1315 27.7558 22.5769 25.1266 24.9416C23.7466 26.1828 21.9845 27.4111 20.7226 28.0646L20.0007 28.4384L19.2787 28.0646C18.0168 27.4111 16.2547 26.1828 14.8747 24.9416C12.2455 22.5769 10.834 20.1315 10.834 17.5999C10.834 14.2477 13.0977 11.6667 16.2128 11.6667C17.3759 11.6667 18.1934 11.824 19.1022 12.2735C19.4185 12.4299 19.7158 12.6156 19.9923 12.8298C20.2799 12.6028 20.5895 12.4083 20.9195 12.2467Z'
                    fill={`${favourite ? 'red' : 'white'}`}
                    stroke='red'
                  />
                </svg>
              </div>
            </div>
            <div className='w-1/2 md:w-full'>
              <p className='font-medium text-gray-400'>{name.split(' ')[0]}</p>
              <h1 className='font-bold text-3xl'>{name}</h1>
              <span className='inline-flex items-center text-gray-500'>
                {new Array(Number(parseInt(rating))).fill('star').map((e) => (
                  <svg
                    key={Math.random()}
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='inline-block'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M7.99958 12.7532L3.19559 15.2788L4.11307 9.92949L0.226562 6.14108L5.59759 5.36063L7.99958 0.493652L10.4016 5.36063L15.7726 6.14108L11.8861 9.92949L12.8036 15.2788L7.99958 12.7532Z'
                      fill='#F2C94C'
                    />
                  </svg>
                ))}
                {new Array(5 - Number(parseInt(rating)))
                  .fill('star')
                  .map((e) => (
                    <svg
                      key={Math.random()}
                      className='opacity-30 inline-block'
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M7.99958 12.7532L3.19559 15.2788L4.11307 9.92949L0.226562 6.14108L5.59759 5.36063L7.99958 0.493652L10.4016 5.36063L15.7726 6.14108L11.8861 9.92949L12.8036 15.2788L7.99958 12.7532Z'
                        fill='#F2C94C'
                      />
                    </svg>
                  ))}{' '}
                <span className='inline-block ml-3'>
                  {rating} ({parseInt(Math.random() * 200)} reviews)
                </span>
              </span>
              <div className='text-3xl my-6 font-bold text-purple-500 md:text-sm'>
                &#8358;{price.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ProductDetail;
