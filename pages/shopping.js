import { useContext, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ContextUser } from '../context';
import { fetchUser } from '../actions/auth';
import Navigation from '../subviews/header';
import Footer from '../components/Footer';
import Product from '../components/Product';
import SectionalTab from '../components/SectionalTab';
import { DeliveryIcon, Tickets, Phones } from '../svg';
import RecommendedSection from '../subviews/RecommendedSection';
import MainBanner from '../subviews/MainBanner';

export default function Home() {
  const [state, dispatch] = useContext(ContextUser);

  useEffect(() => {
    if (state.error) return;
    if (state.user.firstname) return;
    // fetchUser(dispatch);
  }, [dispatch, state.user.firstname]);
  return (
    <div>
      <Head>
        <title>Safelybuy - Shopping</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='relative pb-48 flex flex-col min-h-screen md:pb-72'>
        <Navigation />
        {/* title  */}
        <h1 className='text-center pt-28 my-8 mx-20 font-medium text-5xl tracking-wider md:mx-6 md:hidden'>
          <span className='uppercase font-bold'>Shopping</span> from{' '}
          <span className='font-bold'>Safelybuy</span>
          <sup className='inline-block text-base font-bold -top-6'>TM</sup>
        </h1>
        <MainBanner />
        {/* section tabs  */}
        <div className='flex my-20 md:my-8 mx-20 justify-around flex-wrap md:mx-6'>
          <SectionalTab
            text='sell a phone'
            color='blue'
            icon={<Phones scale={0.8} color='rgb(59, 130, 246)' />}
            url='sell-phone'
          />
          <SectionalTab
            text='delivery'
            color='green'
            icon={<DeliveryIcon color='rgba(16, 185, 129, 1)' scale={0.6} />}
            url='delivery'
          />
          <SectionalTab
            text='tickets'
            color='purple'
            icon={<Tickets scale={0.6} />}
            url='tickets'
          />
        </div>
        {/* recomended carousels  */}
        <div className='mx-20 mb-10 md:mx-1'>
          <h3 className='text-2xl mb-8 font-bold md:mx-6'>Recommended Picks</h3>
          <RecommendedSection />
        </div>
        {/* banners  */}
        <div className='bg-gray-100 md:bg-white p-2 flex h-80 md:h-28 m-20 md:my-8 rounded-md md:mx-6'>
          <div className='h-full text-3xl md:text-lg font-bold flex justify-center md:text-white items-center w-1/2 bg-violet-400 rounded-md ml-1'>
            Banner 2
          </div>
          <div className='h-full text-3xl md:text-lg font-bold flex justify-center md:text-white items-center w-1/2 bg-violet-400 rounded-md ml-1'>
            Banner 3
          </div>
        </div>
        {/* our products */}
        <div className='m-20 md:mt-8 md:mx-6'>
          <h2 className='text-4xl md:text-2xl mb-8 font-bold'>
            <Link href='/shopping/products'>
              <a>Our Products</a>
            </Link>
          </h2>
          <div className='flex flex-wrap justify-between md:justify-around'>
            {[
              {
                src: '/images/samsung-tab.png',
                name: 'Samsung Galaxy Tab A 10.1',
                rating: 3.5,
                price: 63000,
              },
              {
                src: '/images/iPad.png',
                name: 'Apple iPad Air 2 - 128GB - Cellular + Wifi Gray',
                rating: 4.7,
                price: 187000,
              },
              {
                src: '/images/iphone-x.png',
                name: 'iPhone XMax - 128GB',
                rating: 4.5,
                price: 350000,
              },
              {
                src: '/images/airpod2.png',
                name: 'Apple Earpod 5.0',
                rating: 4.5,
                price: 119000,
              },
              {
                src: '/images/android2.png',
                name: 'Xaomi Pocophone f1 - 8GB RAM 128GB ROM',
                rating: 3.8,
                price: 129000,
              },
            ].map((e) => (
              <Product
                key={Math.random()}
                img={e.src}
                title={e.name}
                rating={e.rating}
                price={e.price}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
