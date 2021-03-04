import { useContext, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ContextUser } from 'context';
import { fetchUser } from 'actions/auth';
import SectionalTab from 'components/SectionalTab';
import { DeliveryIcon, Tickets, Phones, ArrowRight } from 'svg';
import Navigation from 'subviews/header';
import Button from 'components/Button';
import Footer from 'components/Footer';

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
        <title>Safelybuy - Tickets</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='relative pb-48 flex flex-col min-h-screen md:pb-80'>
        <Navigation
          text='Transact with no regret'
          color='black'
          noSearch
          notification
        />
        {/* title  */}
        <div style={{ maxWidth: '1280px' }} className='container'>
          <h1 className='text-center pt-28 my-8 mx-20 font-medium text-5xl tracking-wider md:mx-6 md:hidden'>
            <span className='uppercase font-bold'>Tickets</span> from{' '}
            <span className='font-bold'>Safelybuy</span>
            <sup className='inline-block text-base font-bold -top-6'>TM</sup>
          </h1>
          <div className='relative h-96 md:h-auto mt-16 flex mx-20 md:mx-8 md:mt-24 md:flex-col'>
            <div className='w-7/12 md:w-full h-full flex flex-col justify-around p-8 pr-40 md:p-6 md:pb-12 md:pr-6 text-white rounded-l-xl md:rounded-none md:rounded-t-lg bg-purple-600'>
              <h2 className='text-5xl md:text-2xl font-bold'>
                Affordable and easy delivery
                <p className='text-xl md:text-base text-gray-300 font-normal pt-6'>
                  Nationwide Delivery covering all states and cities in Nigeria
                  for as low as &nbsp;&#8358;1,650
                </p>
              </h2>
              <Link href='/delivery'>
                <a className='leading-none mt-8'>
                  <Button
                    primary
                    roundedLg
                    icon={<ArrowRight color='white' scale={0.9} />}
                  >
                    <p className='font-medium text-lg md:text-base'>
                      Get Started
                    </p>
                  </Button>
                </a>
              </Link>
            </div>
            <div className='w-5/12 md:w-full h-full rounded-r-xl md:rounded-none md:rounded-b-lg bg-green-500'></div>
          </div>

          {/* section tabs  */}
          <div className='flex my-20 md:my-8 mx-20 justify-around flex-wrap md:mx-6'>
            <SectionalTab
              text='shopping'
              color='lime'
              icon={<DeliveryIcon color='rgba(16, 185, 129, 1)' scale={0.6} />}
              url='shopping'
            />
            <SectionalTab
              text='sell a phone'
              color='blue'
              icon={<Phones scale={0.8} color='rgb(59, 130, 246)' />}
              url='sell-phone'
            />
            <SectionalTab
              text='tickets'
              color='purple'
              icon={<Tickets scale={0.6} />}
              url='tickets'
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
