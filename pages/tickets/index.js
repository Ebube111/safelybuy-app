import { useContext, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { ContextUser } from 'context';
import { fetchUser } from 'actions/auth';
import Navigation from 'subviews/header';
import TicketBanner from 'subviews/TicketBanner';
import Button from 'components/Button';
import Footer from 'components/Footer';
import TicketCard from 'components/TicketCard';

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

          {/* Banner */}
          <div className='relative'>
            <TicketBanner />
            <div className='absolute md:static w-full -bottom-24 z-10 md:z-1 flex justify-center'>
              <div className='rounded-2xl shadow-2xl w-8/12 md:w-full py-6 px-16 md:px-5 md:mx-6 font-base m-auto flex bg-white md:flex-wrap'>
                <div className='w-5/12 md:w-full mr-12 md:mr-0'>
                  <label className='block text-sm' htmlFor='tickets-cat-select'>
                    Categories
                  </label>

                  <select
                    className='w-full capitalize focus:outline-none my-4 font-medium pb-2 border-b-2 border-black'
                    name='tickets-cats'
                    id='tickets-cat-select'
                  >
                    <option value=''>All Categories</option>
                    <option value='concert'>concert</option>
                    <option value='workshop'>workshop</option>
                    <option value='seminar'>seminar</option>
                    <option value='lecture'>lecture</option>
                  </select>
                </div>
                <div className='w-7/12 md:w-full'>
                  <label className='block text-sm' htmlFor='tickets-search'>
                    Search
                  </label>
                  <div className='relative'>
                    <input
                      className='w-full focus:outline-none my-4 font-medium pb-2 border-b-2 border-black'
                      name='tickets-search'
                      id='tickets-search-input'
                      placeholder='Type to search for an event'
                    />
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 14 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='absolute right-0 bottom-6'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M5.66634 11.0007C2.72082 11.0007 0.333008 8.61284 0.333008 5.66732C0.333008 2.7218 2.72082 0.333984 5.66634 0.333984C8.61186 0.333984 10.9997 2.7218 10.9997 5.66732C10.9997 6.89979 10.5816 8.03462 9.87958 8.93775L13.4711 12.5292L12.5282 13.472L8.93677 9.88056C8.03365 10.5826 6.89882 11.0007 5.66634 11.0007ZM9.66634 5.66732C9.66634 7.87646 7.87548 9.66732 5.66634 9.66732C3.4572 9.66732 1.66634 7.87646 1.66634 5.66732C1.66634 3.45818 3.4572 1.66732 5.66634 1.66732C7.87548 1.66732 9.66634 3.45818 9.66634 5.66732Z'
                        fill='black'
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* section tabs  */}
          <div className='my-20 mt-40 md:my-8 mx-20 md:mx-6'>
            <h2 className='text-4xl font-bold md:text-2xl'>Events just for you</h2>
            <div className='flex mt-12 md:mt-6 -ml-12 md:-ml-4 flex-wrap'>
              <div className='h-96 md:h-48 relative flex-grow flex-shrink-0 w-2/4 md:w-2/3 ml-12 md:ml-4 mb-12 bg-yellow-500 rounded-2xl md:rounded-lg'>
                .
                <Image
                  className='object-cover rounded-2xl md:rounded-lg'
                  src='/images/burna.jpeg'
                  layout='fill'
                />
                <div className='absolute h-96 md:h-48 bottom-0 p-16 pt-16 pr-10 md:p-6 md:pb-6 md:pt-6 leading-2 md:leading-none text-overlay w-6/12 md:w-8/12 text-white bg-gradient-to-r from-black rounded-xl md:rounded-lg'>
                  <h2 className='text-3xl tracking-wide md:tracking-normal md:text-xl font-bold'>
                    Burna Boy Live Concert
                  </h2>
                  <div className='my-6 md:my-2'>29 Sept 2020, Onikan Phase 2 Lagos</div>
                  <Link href='/tickets/search'>
                    <a className='leading-none'>
                      <Button primary roundedFull>
                        <p className='font-medium text-lg md:text-base'>
                          See Tickets
                        </p>
                      </Button>
                    </a>
                  </Link>
                </div>
              </div>
              {[
                {
                  text: 'Fireboy’s Apollo live-in concert',
                  venue: 'The Muson Center Lagos',
                  month: 'Sept',
                  date: '29',
                },
                {
                  text: 'Fireboy’s Apollo live-in concert',
                  venue: 'The Muson Center Lagos',
                  month: 'Sept',
                  date: '29',
                },
                {
                  text: 'Fireboy’s Apollo live-in concert',
                  venue: 'The Muson Center Lagos',
                  month: 'Sept',
                  date: '29',
                },
                {
                  text: 'Fireboy’s Apollo live-in concert',
                  venue: 'The Muson Center Lagos',
                  month: 'Sept',
                  date: '29',
                },
              ].map((e) => (
                <TicketCard
                  key={Math.random()}
                  text={e.text}
                  venue={e.venue}
                  month={e.month}
                  date={e.date}
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
