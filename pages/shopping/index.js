import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from 'subviews/header';
import Footer from 'components/Footer';
import Product from 'components/Product';
import SectionalTab from 'components/SectionalTab';
import { DeliveryIcon, Tickets, Phones } from 'svg';
import RecommendedSection from 'subviews/RecommendedSection';
import MainBanner from 'subviews/MainBanner';
import { baseUrl } from 'api';

export default function Shopping({ items, main, second, third, recommended }) {
  return (
    <div>
      <Head>
        <title>Safelybuy - Shopping</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='relative pb-48 flex flex-col min-h-screen md:pb-72'>
        <Navigation />
        {/* title  */}
        <div style={{ maxWidth: '1280px' }} className='container'>
          <h1 className='text-center pt-28 my-8 mx-20 font-medium text-5xl tracking-wider md:mx-6 md:hidden'>
            <span className='uppercase font-bold'>Shopping</span> from{' '}
            <span className='font-bold'>Safelybuy</span>
            <sup className='inline-block text-base font-bold -top-6'>TM</sup>
          </h1>
          <MainBanner main={main} />
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
            <h3 className='text-2xl mb-8 font-bold md:mx-6'>
              Recommended Picks
            </h3>
            <RecommendedSection recommended={recommended} />
          </div>
          {/* banners  */}
          <div className='bg-gray-100 md:bg-white p-2 flex h-80 md:h-28 m-20 md:my-8 rounded-md md:mx-6'>
            <div className='h-full relative flex justify-center items-center w-1/2 bg-violet-400 rounded-md ml-1'>
              {second.image ? (
                <Image
                  className='rounded-md object-cover'
                  src={second.image}
                  layout='fill'
                />
              ) : (
                <h2 className='text-3xl md:text-lg font-bold  md:text-white'>
                  {second.text}
                </h2>
              )}
            </div>
            <div className='h-full flex justify-center items-center w-1/2 bg-violet-400 rounded-md ml-1'>
              {third.image ? (
                <Image
                  className='rounded-md object-cover'
                  src={third.image}
                  layout='fill'
                />
              ) : (
                <h2 className='text-3xl md:text-lg font-bold  md:text-white'>
                  {third.text}
                </h2>
              )}
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
              {items.map((e) => (
                <Product
                  id={e.id}
                  key={Math.random()}
                  img={e.main_image}
                  title={e.title}
                  rating={e.rating_num}
                  price={e.price}
                />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(baseUrl + '/api/v1/shopping');
  const data = await res.json();

  const { items, main, second, third, recommended } = data;

  return {
    props: {
      items,
      main,
      second,
      third,
      recommended,
    },
  };
}
