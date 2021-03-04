import React, { useState } from 'react';
import Navigation from 'subviews/header';
import Head from 'next/head';
import Link from 'next/link';
import Footer from 'components/Footer';
import Back from 'components/Back';
import { ArrowRight } from 'svg';
import { addressItemsData } from 'data';

const cart = () => {
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
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default cart;
