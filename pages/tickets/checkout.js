import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { ContextUser } from 'context';
import { fetchUser } from 'actions/auth';
import { ArrowRight, AngleRight } from 'svg';
import Navigation from 'subviews/header';
import Button from 'components/Button';
import Footer from 'components/Footer';
import TicketCard from 'components/TicketCard';
import Back from 'components/Back';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion';

const TicketItem = ({ type, price, quantity }) => (
  <div className='flex justify-between w-full py-2'>
    <span className='text-gray-700 font-medium'>{type}</span>
    <div className='flex'>
      <span className='font-bold'>&#8358;{price.toLocaleString()}</span>
      <span className='font-bold'>&nbsp; x {quantity}</span>
    </div>
  </div>
);

export default function Home() {
  const router = useRouter();
  const [state, dispatch] = useContext(ContextUser);
  const [subTotal, setSubTotal] = useState(
    [
      {
        type: 'Table for 3 (three)',
        price: 45500,
        quantity: 1,
      },
      { type: 'Regular', price: 4500, quantity: 2 },
    ].reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
  );

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
          {/* <h1 className='text-center  my-8 mx-20 font-medium text-5xl tracking-wider md:mx-6 md:hidden'>
            <span className='uppercase font-bold'>Tickets</span> from{' '}
            <span className='font-bold'>Safelybuy</span>
            <sup className='inline-block text-base font-bold -top-6'>TM</sup>
          </h1> */}
          <div className='my-20 pt-20 mt-20 md:my-8 mx-20 md:mx-6 flex md:flex-wrap items-start'>
            <div className='relative w-7/12 md:w-full mr-6 md:mr-0'>
              <Back />
              <h1 className='text-4xl font-bold md:hidden'>Checkout</h1>
              <Accordion className='my-10' allowZeroExpanded>
                <AccordionItem className='border-purple-100 border rounded-2xl px-10 py-6'>
                  <AccordionItemHeading>
                    <AccordionItemButton className='focus:outline-none flex justify-between items-center'>
                      <span className='font-bold text-xl tracking-wide'>
                        Delivery Details
                      </span>
                      <AccordionItemState>
                        {({ expanded }) =>
                          expanded ? (
                            <AngleRight
                              color='rgba(124, 58, 237, 1)'
                              scale={2}
                              className='align-baseline transform rotate-90 inline-block'
                            />
                          ) : (
                            <AngleRight
                              color='rgba(124, 58, 237, 1)'
                              scale={2}
                            />
                          )
                        }
                      </AccordionItemState>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel className='mt-6'>
                    <input
                      type='radio'
                      id='mobile'
                      name='delivery-method'
                      value='mobile'
                    />
                    <label className='ml-1' htmlFor='male'>
                      Mobile - Free
                    </label>
                    <div className='inline-block mx-4'></div>
                    <input
                      type='radio'
                      id='email'
                      name='delivery-method'
                      value='email'
                    />
                    <label className='ml-1' htmlFor='female'>
                      Send to email
                    </label>
                    {/* <p>
                      Use your phone as your ticket in. Locate your tickets in
                      your account - or in your app. N.B: When you select
                      mobile, your tickets will not be emailed to you or
                      available for print.
                    </p> */}
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem className='border-purple-100 border rounded-2xl px-10 py-6 mt-8'>
                  <AccordionItemHeading>
                    <AccordionItemButton className='focus:outline-none flex justify-between items-center'>
                      <span className='font-bold text-xl tracking-wide'>
                        Payment Card
                      </span>
                      <AccordionItemState>
                        {({ expanded }) =>
                          expanded ? (
                            <AngleRight
                              color='rgba(124, 58, 237, 1)'
                              scale={2}
                              className='align-baseline transform rotate-90 inline-block'
                            />
                          ) : (
                            <AngleRight
                              color='rgba(124, 58, 237, 1)'
                              scale={2}
                            />
                          )
                        }
                      </AccordionItemState>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel className='mt-6'>
                    <p>Construction ongoing</p>
                  </AccordionItemPanel>
                </AccordionItem>
              </Accordion>
            </div>
            <div className='w-5/12 md:w-full ml-6 md:ml-0 shadow-2xl rounded-2xl'>
              <div className='relative h-96'>
                <Image
                  className='object-cover rounded-t-2xl'
                  src='/images/image6.jpeg'
                  layout='fill'
                />
                <div className='absolute bottom-0 p-8 pt-24 md:p-6 md:pb-6 md:pt-6 text-overlay w-full text-white bg-gradient-to-t from-black rounded-t-2xl'>
                  <h2 className='text-3xl font-medium md:text-2xl'>
                    Rema’s Beamer live-in concert
                  </h2>
                  <small className='text-base md:text-sm'>
                    23 Dec 2020, The Muson Center Lagos
                  </small>
                </div>
              </div>
              <div className='p-10'>
                <h3 className='font-bold text-2xl'>Order Summary</h3>
                <div className='my-6'>
                  {[
                    { type: 'Table for 3 (three)', price: 45500, quantity: 1 },
                    { type: 'Regular', price: 4500, quantity: 2 },
                  ].map((e) => (
                    <TicketItem
                      key={Math.random()}
                      type={e.type}
                      price={e.price}
                      quantity={e.quantity}
                    />
                  ))}
                </div>
                <div className=''>
                  <h4 className='font-bold text-xl'>Fees</h4>
                  <div className='flex justify-between my-3'>
                    <span className=''>Subtotal</span>
                    <span className='font-medium'>
                      &#8358;
                      {subTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className='flex justify-between my-3'>
                    <span className=''>Service Charge</span>
                    <span className='font-medium'>
                      &#8358;
                      {(subTotal * 0.01).toLocaleString()}
                    </span>
                  </div>
                  <hr className='my-4 border-purple-100'/>
                  <div className='flex justify-between my-3 text-xl font-bold'>
                    <span className=''>Total fee</span>
                    <span className=''>
                      &#8358;
                      {(subTotal + subTotal * 0.01).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
