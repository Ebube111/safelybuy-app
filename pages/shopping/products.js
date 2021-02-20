import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Navigation from '../../subviews/header';
import Back from '../../components/Back';
import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';
import wNumb from 'wnumb';

var moneyFormat = wNumb({
  decimal: 0,
  thousand: ',',
  prefix: '₦',
});

const Filter = ({}) => {
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
      1: [false, '1'],
      2: [false, '2'],
      3: [false, '3'],
      4: [false, '4'],
    },
  });

  return (
    <div className='bg-gray-100 p-8 my-8 rounded-lg filter'>
      <h3 className='text-2xl font-medium'>Filter</h3>
      {Object.keys(filterObjects).map((e) => (
        <div key={Math.random()} className='capitalize'>
          <h4 className='text-xl font-medium'>{e}</h4>
          {e === 'price range' ? (
            <div className='py-5'>
              <Nouislider
                range={{ min: filterObjects[e].min, max: filterObjects[e].max }}
                start={[filterObjects[e].minValue, filterObjects[e].maxValue]}
                connect
                step={50}
                instanceRef={slider}
                // tooltips={[
                //   wNumb({ decimal: 0, thousand: ',', prefix: '₦' }),
                //   wNumb({ decimal: 0, thousand: ',', prefix: '₦' }),
                // ]}
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
          ) : (
            Object.entries(filterObjects[e]).map((v) => {
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
                  className='flex justify-between'
                >
                  <span className=''>{v[1][1]}</span>
                  <span className=''>
                    {v[1][0] ? (
                      <svg
                        width='10'
                        height='7'
                        viewBox='0 0 10 7'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M3.85355 5.14645L8.5 0.5L9.20711 1.20711L3.85355 6.56066L1 3.70711L1.70711 3L3.85355 5.14645Z'
                          fill='black'
                          stroke='black'
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
            })
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
        <div className='mx-20'>
          <Back />
          <div className='flex my-8'>
            <div className='w-80 md:w-full'>
              <h2 className='text-4xl md:text-2xl tracking-wide font-bold'>
                Our Products
              </h2>
              <Filter />
            </div>
            <div className=''>Products</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
