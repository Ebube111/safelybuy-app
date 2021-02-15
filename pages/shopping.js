import Head from 'next/head';
import Link from 'next/link';
import Slider from 'react-slick';
import Button from '../components/Button';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import User from '../components/User';
import SpotlightCard from '../components/SpotlightCard';
import { useComponentVisible } from '../hooks';
import { Cart, HambugerSkewed, SearchIcon } from '../svg';

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  const {
    ref: userRef,
    isComponentVisible: userIsVisible,
    setIsComponentVisible: setUserIsVisible,
  } = useComponentVisible(false);
  return (
    <div>
      <Head>
        <title>Safelybuy - Shopping</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='relative flex flex-col min-h-screen mx-20'>
        {/* navigation */}
        <nav className='flex items-center tracking-wide justify-between my-12 md:mx-6 md:my-3'>
          <div className='flex'>
            <Logo
              color='purple'
              text={
                <div className='flex items-center'>
                  <HambugerSkewed />
                  <p className='capitalize font-bold tracking-widest ml-3 text-lg text-black'>
                    All Categories
                  </p>
                </div>
              }
            />
            <div className='relative md:hidden ml-10'>
              <input
                className='w-72 md:w-full bg-gray-100 focus:outline-none px-12 py-2 rounded-full'
                type='search'
                placeholder='Search iphones, laptops...'
              />
              <span className='absolute top-3 left-4'>
                <SearchIcon />
              </span>
            </div>
          </div>
          <div className='flex'>
            <Button primaryOutline roundedLg>
              Become a seller
            </Button>
            <User
              userRef={userRef}
              setUserIsVisible={setUserIsVisible}
              userIsVisible={userIsVisible}
            />
            <div className='bg-green-500 cursor-pointer px-4 py-3 rounded-md shadow-lg relative transform hover:shadow-2xl hover:-translate-y-0.5 active:shadow:sm active:translate-y-0 focus:outline-none'>
              <Cart />
              <div className='absolute bg-red-500 rounded-full px-2 py-1 text-xs -right-2 -top-2 text-white '>
                2
              </div>
            </div>
          </div>
        </nav>
        {/* title  */}
        <h1 className='text-center my-8 font-medium text-5xl tracking-wider'>
          <span className='uppercase font-bold'>Shopping</span> from{' '}
          <span className='font-bold'>Safelybuy</span>
        </h1>
        {/* banner  */}
        <div className='container flex h-96'>
          <div className='banner w-7/12'>
            <Slider {...settings}>
              <div className='h-96 w-full bg-purple-500'>
                <div className='flex h-96 w-full items-center justify-center'>
                  <h1 className='m-auto text-4xl text-white font-bold'>Banner 1</h1>
                </div>
              </div>
              <div className='h-96 w-full bg-blue-500'>
                <div className='flex h-96 w-full items-center justify-center'>
                  <h1 className='m-auto text-4xl text-white font-bold'>Banner 2</h1>
                </div>
              </div>
              <div className='h-96 w-full bg-yellow-500'>
                <div className='flex h-96 w-full items-center justify-center'>
                  <h1 className='m-auto text-4xl text-white font-bold'>Banner 3</h1>
                </div>
              </div>
              <div className='flex h-96 w-full bg-green-500'>
                <div className='flex h-96 w-full items-center justify-center'>
                  <h1 className='m-auto text-4xl text-white font-bold'>Banner 4</h1>
                </div>
              </div>
            </Slider>
          </div>
          <div className='categories w-5/12'>Hello</div>
        </div>
        section tabs recomended carousels banners products
        <Footer />
      </div>
    </div>
  );
}
