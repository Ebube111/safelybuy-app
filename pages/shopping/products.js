import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Navigation from '../../subviews/header';
import Back from '../../components/Back';
import Footer from '../../components/Footer';
import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';
import wNumb from 'wnumb';
import { shoppingItems } from '../../data';
import Product from '../../components/Product';

const Filter = () => {
  const slider = useRef();
  const [filterObjects, setFilterObjects] = useState({
    category: {
      'phone-accessories': [false, 'Phone and Accessories'],
      'tablet-accessories': [false, 'iPad, Tablet and Accessories'],
      'laptop-accessories': [false, 'Phone and Accessories'],
      others: [false, 'Other Gadgets'],
    },
    'sub - category': {
      phone: [false, 'Phone'],
      accessories: [false, 'Accessories'],
    },
    condition: {
      new: [false, 'New'],
      used: [false, 'Used'],
    },
    brand: {
      apple: [false, 'Apple'],
      samsung: [false, 'Samsung'],
      lenovo: [false, 'Lenovo'],
      Xaomi: [false, 'Xaomi'],
    },
    'price range': {
      min: 0,
      max: 3000000,
      minValue: 100000,
      maxValue: 1000000,
    },
    'product rating': {
      4: [false, '4'],
      3: [false, '3'],
      2: [false, '2'],
      1: [false, '1'],
    },
  });

  return (
    <div className='bg-gray-100 h-3/5 p-8 my-8 rounded-lg filter overflow-y-auto'>
      <h3 className='text-2xl pb-5 font-medium'>Filter</h3>
      {Object.keys(filterObjects).map((e) => (
        <div key={Math.random()} className='capitalize py-4'>
          <h4 className='text-xl pb-4 font-medium'>{e}</h4>
          {e === 'price range' ? (
            <div className='pt-6 border-b pb-8 border-gray-300'>
              <Nouislider
                range={{ min: filterObjects[e].min, max: filterObjects[e].max }}
                start={[filterObjects[e].minValue, filterObjects[e].maxValue]}
                connect
                step={50}
                instanceRef={slider}
                tooltips={[
                  wNumb({ decimal: 0, thousand: ',', prefix: '₦' }),
                  wNumb({ decimal: 0, thousand: ',', prefix: '₦' }),
                ]}
                onChange={(...args) => {
                  setFilterObjects({
                    ...filterObjects,
                    [e]: {
                      ...filterObjects[e],
                      minValue: args[0][0],
                      maxValue: args[0][1],
                    },
                  });
                }}
              />
              <div className='text-gray-600 flex justify-between text-xs py-4'>
                <p className=''>
                  {new Intl.NumberFormat('en-NG', {
                    style: 'currency',
                    currency: 'NGN',
                  }).format(parseInt(filterObjects[e].minValue))}
                </p>
                <p className=''>
                  {new Intl.NumberFormat('en-NG', {
                    style: 'currency',
                    currency: 'NGN',
                  }).format(parseInt(filterObjects[e].maxValue))}
                </p>
              </div>
            </div>
          ) : e !== 'product rating' ? (
            <div className='border-b pb-8 border-gray-300'>
              {Object.entries(filterObjects[e]).map((v) => {
                return (
                  <div
                    onClick={() =>
                      setFilterObjects({
                        ...filterObjects,
                        [e]: {
                          ...filterObjects[e],
                          [v[0]]: [!v[1][0], v[1][1]],
                        },
                      })
                    }
                    key={Math.random()}
                    className='flex py-1 font-medium cursor-pointer justify-between items-center'
                  >
                    <span className=''>{v[1][1]}</span>
                    <span className=''>
                      {v[1][0] ? (
                        <svg
                          width='12'
                          height='12'
                          viewBox='0 0 10 7'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M3.85355 5.14645L8.5 0.5L9.20711 1.20711L3.85355 6.56066L1 3.70711L1.70711 3L3.85355 5.14645Z'
                            fill='rgb(139, 92, 246)'
                            stroke='rgb(139, 92, 246)'
                            strokeWidth='0.5'
                          />
                        </svg>
                      ) : (
                        <svg
                          width='12'
                          height='12'
                          viewBox='0 0 12 12'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M6.5 5.5H11V6.5H6.5V11H5.5V6.5H1V5.5H5.5V1H6.5V5.5Z'
                            fill='black'
                            stroke='black'
                            strokeWidth='0.5'
                          />
                        </svg>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className='flex flex-col-reverse'>
              {Object.entries(filterObjects[e]).map((v) => {
                return (
                  <div
                    onClick={() =>
                      setFilterObjects({
                        ...filterObjects,
                        [e]: {
                          ...{
                            4: [false, '4'],
                            3: [false, '3'],
                            2: [false, '2'],
                            1: [false, '1'],
                          },
                          [v[0]]: [true, v[1][1]],
                        },
                      })
                    }
                    key={Math.random()}
                    className='flex py-1 font-medium cursor-pointer items-center'
                  >
                    <div className='inline-block w-5 h-5 mr-4 shadow-inner border border-gray-400 rounded-full'>
                      {v[1][0] && (
                        <div className='inline-block m-px w-4 h-4 shadow-inner border-2 bg-purple-500 border-purple-300 rounded-full'></div>
                      )}
                    </div>
                    {new Array(Number(v[1][1])).fill('star').map((e) => (
                      <svg
                        key={Math.random()}
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
                    ))}
                    {new Array(5 - Number(v[1][1])).fill('star').map((e) => (
                      <svg
                        className='opacity-30'
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fill-rule='evenodd'
                          clipRule='evenodd'
                          d='M7.99958 12.7532L3.19559 15.2788L4.11307 9.92949L0.226562 6.14108L5.59759 5.36063L7.99958 0.493652L10.4016 5.36063L15.7726 6.14108L11.8861 9.92949L12.8036 15.2788L7.99958 12.7532Z'
                          fill='#F2C94C'
                        />
                      </svg>
                    ))}
                    <span className='lowercase inline-block pl-3 font-light text-gray-500'>
                      and above
                    </span>
                  </div>
                );
              })}{' '}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Products = () => {
  return (
    <div>
      <Head>
        <title>Safelybuy - Products</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='relative pb-48 flex flex-col min-h-screen md:pb-72'>
        <Navigation />
        <div className='mx-20 pt-32 md:mx-0'>
          <div className='flex relative my-2'>
            <div className='w-72 md:mx-0 md:px-6 h-screen fixed z-10 bg-white md:w-full'>
              <Back />
              <h2 className='text-4xl md:text-2xl tracking-wide flex justify-between font-bold'>
                <span className=''> Our Products</span>
                <svg
                  width='40'
                  height='40'
                  viewBox='0 0 40 40'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='hidden md:inline-block'
                >
                  <circle cx='20' cy='20' r='20' fill='#8661FF' />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M13.332 16.2505L17.9987 21.5839V27.2954L21.9987 25.7954V21.5839L26.6654 16.2505V14.6667C26.6654 13.9303 26.0684 13.3334 25.332 13.3334H14.6654C13.929 13.3334 13.332 13.9303 13.332 14.6667V16.2505ZM25.3326 14.6667V15.7496L20.6659 21.0829V24.8714L19.3326 25.3714V21.0829L14.6659 15.7496V14.6667H25.3326Z'
                    fill='#DADADA'
                  />
                </svg>
              </h2>
              <Filter />
            </div>
            <div className='ml-80 md:mx-6 md:ml-4 flex flex-wrap justify-between'>
              {shoppingItems.map((e) => (
                <div className='mb-4 ml-4' key={Math.random()}>
                  <Product
                    img={e.src}
                    title={e.name}
                    rating={e.rating}
                    price={e.price}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Products;
