import { useContext, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Slider from 'react-slick';
import { ContextUser } from '../context';
import { fetchUser } from '../actions/auth';
import Button from '../components/Button';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import User from '../components/User';
import { useComponentVisible } from '../hooks';
import {
  Cart,
  HambugerSkewed,
  SearchIcon,
  AngleRight,
  DeliveryIcon,
  Tickets,
  Phones,
} from '../svg';

const TitleTab = ({ text, color, colorShade, img }) => {
  const router = useRouter();
  const bgColor = `bg-gradient-to-tr from-${color}-${colorShade} to-${color}-${
    colorShade - 200
  }`;
  return (
    <div
      onClick={() => {
        router.push({
          pathname: '/products',
          query: { category: text.toLowerCase().replace(' ', '-') },
        });
      }}
      className={`${bgColor} relative cursor-pointer px-4 h-28 w-48 shadow-2xl rounded-3xl`}
    >
      <div
        className={`rounded-2xl bg-${color}-100 h-32 w-40 transform -translate-y-1/2`}
      >
        <Image className='rounded-2xl' src={img} alt={text} layout='fill' />
      </div>
      <h3
        style={{ width: 'calc(100% - 32px)' }}
        className='absolute bottom-2 flex items-center justify-between text-white font-medium'
      >
        <span className=''>{text}</span>
        <AngleRight color='white' scale={1.5} />
      </h3>
    </div>
  );
};

const SectionalTab = ({ text, icon, color, url }) => {
  return (
    <Link href={`/${url}`}>
      <a>
        <div
          className={`flex border-2 items-center p-3 border-${color}-200 w-52 rounded-md hover:shadow-inner`}
        >
          <div className={`bg-${color}-100 p-1 mr-4 rounded-md`}>
            <div className={`bg-${color}-200 p-2 rounded-md`}>{icon}</div>
          </div>
          <div className='leading-none'>
            <h4 className='uppercase tracking-widest font-bold text-sm'>
              {text}
            </h4>
            <small className='text-xs font-medium'>from Safelybuy</small>
          </div>
        </div>
      </a>
    </Link>
  );
};

const Product = ({ title, img, price, rating }) => {
  return (
    <div className='w-48'>
      <div className='relative h-48 w-48'>
        <Image className='rounded-lg object-cover' src={img} layout='fill' />
      </div>
      <div className='py-4 px-3'>
        <p className='font-medium'>{title}</p>
        <div className='flex justify-between'>
          <span className='text-lg font-bold text-purple-600'>&#8358;{price.toLocaleString()}</span>
          <span className='flex items-center rating text-xs'>
            <svg
              width='12'
              height='12'
              className='inline-block mr-1'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M5.99968 10.0649L2.39669 11.9591L3.0848 7.94712L0.169922 5.10581L4.19819 4.52047L5.99968 0.870239L7.80118 4.52047L11.8294 5.10581L8.91457 7.94712L9.60268 11.9591L5.99968 10.0649Z'
                fill='#F2C94C'
              />
            </svg>
            {rating} rating
          </span>
        </div>
      </div>
    </div>
  );
};

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={
        className + ' bg-purple-100 justify-center items-center rounded-sm'
      }
      style={{ ...style, display: 'flex' }}
      onClick={onClick}
    >
      <AngleRight
        scale={1}
        className='align-baseline inline-block'
        color='#8661FF'
      />
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={
        className + ' bg-purple-100 justify-center items-center rounded-sm'
      }
      style={{ ...style, display: 'flex' }}
      onClick={onClick}
    >
      <AngleRight
        scale={1}
        className='align-baseline transform rotate-180 inline-block'
        color='#8661FF'
      />
    </div>
  );
}

const settings = {
  dots: true,
  infinite: true,
  slidesToScroll: 1,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 3000,
  pauseOnHover: true,
};

const settingsRecommended = {
  dots: true,
  infinite: true,
  slidesToShow: 6,
  autoplay: true,
  slidesToScroll: 3,
  pauseOnHover: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

export default function Home() {
  const [state, dispatch] = useContext(ContextUser);
  useEffect(() => {
    if (state.user.firstname) return;
    fetchUser(dispatch);
  }, [dispatch, state.user.firstname]);
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
      <div className='relative pb-48 flex flex-col min-h-screen'>
        {/* navigation */}
        <nav className='flex items-center mx-20 tracking-wide justify-between my-12 md:mx-6 md:my-3'>
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
            {state.user.firstname && (
              <Button primaryOutline roundedLg>
                Become a seller
              </Button>
            )}
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
        <h1 className='text-center my-8 mx-20 font-medium text-5xl tracking-wider'>
          <span className='uppercase font-bold'>Shopping</span> from{' '}
          <span className='font-bold'>Safelybuy</span>
        </h1>
        {/* banner  */}
        <div id='main-banner' className='mx-20 flex h-96'>
          <div className='banner w-7/12'>
            <Slider {...settings}>
              <div className='h-96 w-full bg-purple-500 rounded-2xl'>
                <div className='flex h-96 w-full items-center justify-center'>
                  <h1 className='m-auto text-4xl text-white font-bold'>
                    Banner 1
                  </h1>
                </div>
              </div>
              <div className='h-96 w-full bg-blue-500 rounded-2xl'>
                <div className='flex h-96 w-full items-center justify-center'>
                  <h1 className='m-auto text-4xl text-white font-bold'>
                    Banner 2
                  </h1>
                </div>
              </div>
              <div className='h-96 w-full bg-yellow-500 rounded-2xl'>
                <div className='flex h-96 w-full items-center justify-center'>
                  <h1 className='m-auto text-4xl text-white font-bold'>
                    Banner 3
                  </h1>
                </div>
              </div>
              <div className='flex h-96 w-full bg-green-500 rounded-2xl'>
                <div className='flex h-96 w-full items-center justify-center'>
                  <h1 className='m-auto text-4xl text-white font-bold'>
                    Banner 4
                  </h1>
                </div>
              </div>
            </Slider>
          </div>
          <div className='categories mt-16 flex flex-col justify-between w-5/12 px-6'>
            <div className='flex justify-around'>
              <TitleTab
                text='Apple Phones'
                color='gray'
                colorShade='900'
                img='/images/iphone.png'
              />
              <TitleTab
                text='Samsung Phones'
                color='blue'
                colorShade='400'
                img='/images/samsung.png'
              />
            </div>
            <div className='flex justify-around'>
              <TitleTab
                text='Laptops'
                color='orange'
                colorShade='400'
                img='/images/laptop.png'
              />
              <TitleTab
                text='Game Consoles'
                color='green'
                colorShade='500'
                img='/images/game-connsole.png'
              />
            </div>
          </div>
        </div>
        {/* section tabs  */}
        <div className='flex my-20 mx-20 justify-around'>
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
        <div className='mx-20 mb-10'>
          <h3 className='text-2xl mb-8 font-bold'>Recommended Picks</h3>
          <div className='recommended-carousels mx-10'>
            <Slider {...settingsRecommended}>
              {[
                { src: '/images/airpod.png', name: 'Airpods' },
                { src: '/images/android.png', name: 'Phones' },
                { src: '/images/iwatch.png', name: 'Apple Watches' },
                { src: '/images/iphone11.png', name: 'Apple Phones' },
                { src: '/images/ps5.png', name: 'PlayStations' },
                { src: '/images/xbox.png', name: 'X-boxes' },
                { src: '/images/samsung.png', name: 'Samsung Phones' },
                { src: '/images/laptop.png', name: 'Laptops' },
                { src: '/images/iphone.png', name: 'iPhones' },
              ].map((e) => (
                <div className='h-48'>
                  <div className='h-40 m-auto relative w-36 rounded-lg bg-gray-100'>
                    <Image
                      className='rounded-lg object-cover'
                      src={e.src}
                      layout='fill'
                    />
                  </div>
                  <p className='font-medium mt-2 text-center'>{e.name}</p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        {/* banners  */}
        <div className='bg-gray-100 p-2 flex h-80 m-20 rounded-md'>
          <div className='h-full text-3xl font-bold flex justify-center items-center w-1/2 bg-violet-400 rounded-md ml-1'>
            Banner 2
          </div>
          <div className='h-full text-3xl font-bold flex justify-center items-center w-1/2 bg-violet-400 rounded-md ml-1'>
            Banner 3
          </div>
        </div>
        {/* our products */}
        <div className='m-20'>
          <h2 className='text-4xl mb-8 font-bold'>Our Products</h2>
          <div className='flex justify-between'>
            {[
              {
                src: '/images/samsung-tab.png',
                name: 'Samsung Galaxy Tab A 10.1',
                rating: 3.5,
                price: 63000
              },
              {
                src: '/images/iPad.png',
                name: 'Apple iPad Air 2 - 128GB - Cellular + Wifi Gray',
                rating: 4.7,
                price: 187000
              },
              {
                src: '/images/iphone-x.png',
                name: 'iPhone XMax - 128GB',
                rating: 4.5,
                price: 350000
              },
              {
                src: '/images/airpod2.png',
                name: 'Apple Earpod 5.0',
                rating: 4.5,
                price: 119000
              },
              {
                src: '/images/android2.png',
                name: 'Xaomi Pocophone f1 - 8GB RAM 128GB ROM',
                rating: 3.8,
                price: 129000
              },
            ].map((e) => (
              <Product
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
