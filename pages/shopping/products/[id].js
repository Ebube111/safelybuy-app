import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Navigation from 'subviews/header';
import Footer from 'components/Footer';
import Back from 'components/Back';
import { shoppingItems } from 'data';
import { Facebook, Twitter } from 'svg';

import Head from 'next/head';
import Button from 'components/Button';

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
            <div className='w-1/2 mr-6 flex md:w-full'>
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
              <div className='flex w-3/12 flex-col h-96 overflow-auto ml-4'>
                <div className='flex w-20 m-auto justify-between items-center leading-none'>
                  <span className='bg-purple-100 border py-1 text-purple-600 font-medium rounded-md px-2 border-puple-300'>
                    &lt;
                  </span>
                  <span className='bg-purple-100 border py-1 text-purple-600 font-medium rounded-md px-2 border-puple-300'>
                    &gt;
                  </span>
                </div>
                <div className='flex-auto mt-1 mx-6'>
                  <div className='w-full my-2 aspect-w-1 aspect-h-1 h-8 bg-gray-200 rounded-lg'></div>
                  <div className='w-full my-2 aspect-w-1 aspect-h-1 h-8 bg-gray-200 rounded-lg'></div>
                  <div className='w-full my-2 aspect-w-1 aspect-h-1 h-8 bg-gray-200 rounded-lg'></div>
                  <div className='w-full my-2 aspect-w-1 aspect-h-1 h-8 bg-gray-200 rounded-lg'></div>
                </div>
              </div>
            </div>
            <div className='w-1/2 ml-6 md:w-full'>
              <p className='font-medium text-gray-400'>{name.split(' ')[0]}</p>
              <h1 className='font-bold text-4xl'>{name}</h1>
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
              <div className='font-medium pt-2'>Variation: White </div>
              <div className='text-3xl mt-3 mb-6 font-bold text-purple-500 md:text-sm'>
                &#8358;{price.toLocaleString()}
              </div>
              <div className='flex flex-col items-start'>
                <div className='flex mb-12 items-end'>
                  <div className='flex-col w-24'>
                    <span className='font-medium mb-2 inline-block'>
                      Quantity
                    </span>
                    <div className='flex justify-between items-center leading-none'>
                      <span className='bg-purple-100 border py-1 text-purple-600 font-medium rounded-md px-2 border-puple-300'>
                        -
                      </span>
                      <span className='font-bold'>1</span>
                      <span className='bg-purple-100 border py-1 text-purple-600 font-medium rounded-md px-2 border-puple-300'>
                        +
                      </span>
                    </div>
                  </div>
                  <div className='w-48 ml-8'>
                    <Button
                      full
                      primary
                      roundedLg
                      icon={
                        <svg
                          width='14'
                          height='14'
                          viewBox='0 0 14 14'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M3.04815 1.66836C2.92975 1.66811 2.81561 1.68151 2.70716 1.70698C2.55848 1.37929 2.36209 1.0853 2.13872 0.861929C1.75961 0.482814 1.16169 0.333334 0.333984 0.333334V1.66667C0.839616 1.66667 1.13058 1.73941 1.19591 1.80474C1.44789 2.05672 1.66732 2.56871 1.66732 3L1.67402 3.09428L2.32726 7.66701C1.23422 7.72372 0.387449 8.57255 0.334803 9.63363L0.333984 10.3333C0.398532 11.4293 1.24249 12.2724 2.29614 12.3323L2.44749 12.3325C2.72181 13.1097 3.46286 13.6667 4.33398 13.6667C5.2048 13.6667 5.94562 13.1101 6.22018 12.3333H7.78112C8.05568 13.1101 8.7965 13.6667 9.66732 13.6667C10.7719 13.6667 11.6673 12.7712 11.6673 11.6667C11.6673 10.5621 10.7719 9.66667 9.66732 9.66667C8.7965 9.66667 8.05568 10.2232 7.78112 11H6.22018C5.94562 10.2232 5.2048 9.66667 4.33398 9.66667C3.46317 9.66667 2.72235 10.2232 2.44779 11H2.33398C1.99399 10.9796 1.68901 10.6749 1.66612 10.2934L1.66732 9.66667C1.68529 9.32088 1.98819 9.01798 2.36702 8.99918L3.68311 8.99951L3.69265 9H10.4119L10.5103 8.96878C11.0158 8.80838 11.4204 8.42775 11.612 7.93502L11.6822 7.79601L11.9104 7.34392C12.1465 6.87595 12.3826 6.40717 12.6126 5.9492C13.1761 4.82738 13.5305 4.11444 13.609 3.93937C14.012 3.0403 13.1956 2.34831 12.3611 2.33357L3.04815 1.66836ZM10.1803 7.66667H3.74257C3.69976 7.65477 3.66714 7.61851 3.66075 7.57335L3.00749 3.00049L12.2629 3.66328C12.101 3.99355 11.8066 4.58344 11.4212 5.35073L11.4115 5.36995C11.1915 5.80791 10.9557 6.27604 10.72 6.74338L10.4921 7.1949L10.4057 7.36589L10.3732 7.44148C10.3383 7.5385 10.2692 7.61824 10.1803 7.66667ZM9.66732 12.3333C10.0355 12.3333 10.334 12.0349 10.334 11.6667C10.334 11.2985 10.0355 11 9.66732 11C9.29913 11 9.00065 11.2985 9.00065 11.6667C9.00065 12.0349 9.29913 12.3333 9.66732 12.3333ZM5.00065 11.6667C5.00065 12.0349 4.70217 12.3333 4.33398 12.3333C3.96579 12.3333 3.66732 12.0349 3.66732 11.6667C3.66732 11.2985 3.96579 11 4.33398 11C4.70217 11 5.00065 11.2985 5.00065 11.6667Z'
                            fill='white'
                          />
                        </svg>
                      }
                    >
                      <span className='font-medium'>Add to cart</span>
                    </Button>
                  </div>
                </div>
                <div className='flex items-end'>
                  <div className='flex-col w-24'>
                    <span className='font-medium text-gray-500 mb-2 inline-block'>
                      Share Product
                    </span>
                    <div className='flex justify-between items-center leading-none'>
                      {<Facebook />}
                      {<Twitter />}
                    </div>
                  </div>
                  <div className='flex w-48 ml-8'>
                    <Button full secondary roundedLg>
                      <span className='font-medium'>Message Seller</span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="">Hello</div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ProductDetail;
