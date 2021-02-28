import React from 'react';
import Navigation from 'subviews/header';
import Head from 'next/head';
import Link from 'next/link';
import Footer from 'components/Footer';
import Back from 'components/Back';
import { ArrowRight } from 'svg';
import { shoppingItems } from 'data';
import Button from 'components/Button';
import CartItem from 'components/CartItem';
import OrderDetails from 'subviews/OrderDetails';

const cart = ({ cartItems = shoppingItems.slice(0, 3) }) => {
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
          <div className='flex mb-10 md:mb-4 md:flex-wrap'>
            <div className='w-2/3 mr-8 md:w-full'>
              <h2 className='text-4xl tracking-wider font-bold md:text-2xl'>
                Your Cart
              </h2>
              <div className='mt-8 md:mt-4'>
                {cartItems.map((e) => (
                  <CartItem product={e} quantity={3} />
                ))}
              </div>
              <div className='flex mt-8 md:hidden justify-end leading-none'>
                <Link href='/shopping/delivery'>
                  <a>
                    <Button
                      primary
                      roundedLg
                      icon={<ArrowRight color='white' scale={0.9} />}
                    >
                      <p className='font-medium text-xl'>Proceed to Checkout</p>
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
            <OrderDetails active='delivery' />
            <div className='hidden mt-8 md:flex w-full leading-none'>
              <Link href='/shopping/delivery'>
                <Button
                  full
                  primary
                  roundedLg
                  icon={<ArrowRight color='white' scale={0.9} />}
                >
                  <p className='font-medium text-lg'>Proceed to Checkout</p>
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default cart;
