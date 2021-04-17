import React, { useState } from 'react';
import Navigation from 'subviews/header';
import Head from 'next/head';
import Link from 'next/link';
import Footer from 'components/Footer';
import Back from 'components/Back';
import { ArrowRight } from 'svg';
import { addressItemsData } from 'data';
import Button from 'components/Button';
import AddressItem from 'components/AddressItem';
import OrderDetails from 'subviews/OrderDetails';

let remaining = null;

const cart = ({ addressItems = remaining || addressItemsData }) => {
  const forceUpdate = React.useReducer(() => ({}))[1];
  const [deliveryType, setDeliveryType] = useState({
    fedex: false,
    dhl: false,
  });
  const selectAddress = (e, id) =>
    addressItems.forEach((e, i) => {
      if (e.id === id) {
        addressItems[i].selected = true;
      } else addressItems[i].selected = false;
      forceUpdate();
    });

  const removeAddress = (e, id) => {
    remaining = addressItems.filter((e) => e.id !== id);
    addressItems = remaining;
    e.stopPropagation();
    forceUpdate();
  };

  return (
    <div>
      <Head>
        <title>Safelybuy - Shopping</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='relative pb-48 flex flex-col min-h-screen md:pb-80'>
        <Navigation />
        <div className='pt-28 my-8 mx-20 md:mx-6'>
          <Back />
          <div className='flex mb-10 md:mb-4 md:flex-wrap items-start'>
            <div className='w-2/3 mr-8 md:w-full'>
              <h2 className='text-4xl tracking-wider font-bold md:text-2xl'>
                Delivery Details
              </h2>
              <h4 className='my-4 text-xl font-medium'>
                Select or add an address
              </h4>
              <div className='flex flex-wrap mt-8 md:mt-4'>
                <Link href='/shopping/address'>
                  <div
                    style={{ minHeight: '10rem' }}
                    className='flex flex-col border-2 cursor-pointer border-dashed w-80 mx-8 md:mx-3 items-center justify-center rounded-xl mb-8 order-first'
                  >
                    <svg
                      width='55'
                      height='55'
                      viewBox='0 0 55 55'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='mb-3'
                    >
                      <circle
                        opacity='0.1'
                        cx='27.5'
                        cy='27.5'
                        r='27.5'
                        fill='#8661FF'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M28.6029 36.8572L28 37.3836L27.3971 36.8572C22.327 32.4301 19.75 28.5645 19.75 25.1667C19.75 20.3548 23.5056 16.9167 28 16.9167C32.4944 16.9167 36.25 20.3548 36.25 25.1667C36.25 28.5645 33.673 32.4301 28.6029 36.8572ZM21.5833 25.1667C21.5833 27.7785 23.6977 31.0641 28 34.9415C32.3023 31.0641 34.4167 27.7785 34.4167 25.1667C34.4167 21.4052 31.5162 18.75 28 18.75C24.4838 18.75 21.5833 21.4052 21.5833 25.1667ZM27.0833 21.5V24.25H24.3333V26.0833H27.0833V28.8333H28.9167V26.0833H31.6667V24.25H28.9167V21.5H27.0833Z'
                        fill='#8661FF'
                      />
                    </svg>
                    Add a new address
                  </div>
                </Link>
                {addressItems.map((e) => (
                  <AddressItem
                    key={Math.random()}
                    address={e.address}
                    name={e.name}
                    phone={e.phone}
                    selected={e.selected}
                    id={e.id}
                    selectAddress={selectAddress}
                    removeAddress={removeAddress}
                  />
                ))}
              </div>
            </div>
            <OrderDetails active='delivery' />
          </div>
          {/* <div className='md:hidden'>
            <h4 className='my-4 text-xl font-medium'>Select delivery type</h4>
            <div className='flex items-center'>
              <div
                onClick={() =>
                  setDeliveryType({
                    ...deliveryType,
                    fedex: true,
                    dhl: false,
                  })
                }
                className='inline-block cursor-pointer w-5 h-5 mr-3 shadow-inner border border-gray-400 rounded-full'
              >
                {deliveryType.fedex && (
                  <div className='inline-block m-px w-4 h-4 shadow-inner border-2 bg-purple-500 border-purple-300 rounded-full'></div>
                )}
              </div>{' '}
              Delivery with Fedex
              <div
                onClick={() =>
                  setDeliveryType({
                    ...deliveryType,
                    fedex: false,
                    dhl: true,
                  })
                }
                className='ml-8 inline-block cursor-pointer w-5 h-5 mr-3 shadow-inner border border-gray-400 rounded-full'
              >
                {deliveryType.dhl && (
                  <div className='inline-block m-px w-4 h-4 shadow-inner border-2 bg-purple-500 border-purple-300 rounded-full'></div>
                )}
              </div>{' '}
              Delivery with DHL
            </div>
          </div> */}
          <div className='mt-8 mr-8 w-2/3 md:w-full flex justify-end md:justify-center leading-none'>
            <Link href='/shopping/payment'>
              <a>
                <Button
                  primary
                  roundedLg
                  icon={<ArrowRight color='white' scale={0.9} />}
                >
                  <p className='font-medium text-lg'>Proceed to Checkout</p>
                </Button>
              </a>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default cart;
