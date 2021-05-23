import React, { useState, useEffect, useContext, memo } from 'react';
import { usePaystackPayment } from 'react-paystack';
import Navigation from 'subviews/header';
import Head from 'next/head';
import Link from 'next/link';
import Footer from 'components/Footer';
import Back from 'components/Back';
import { ArrowRight } from 'svg';
import Button from 'components/Button';
import Container from 'components/Container';
import { ContextUser } from 'context';
import OrderDetails from 'subviews/OrderDetails';
import PrivateRoute from 'auth/PrivateRoute';
import AddressContext from 'context/Address';

const config = {
  reference: new Date().getTime(),
  email: 'user@example.com',
  amount: 20000,
  publicKey: 'pk_test_3682fa02f532290ce60a0bfef61274298ac9eec9',
};

// you can call this function anything
const onSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);
};

// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log('closed');
};

const Payment = () => {
  const { deliveryPrice, selectedAddress, total } = useContext(AddressContext);
  const [{ user }] = useContext(ContextUser);
  const initializePayment = usePaystackPayment({
    reference: new Date().getTime(),
    email: user.email,
    amount: (deliveryPrice + total) * 100,
    publicKey: 'pk_test_3682fa02f532290ce60a0bfef61274298ac9eec9',
  });
  const [paymentType, setPaymentType] = useState({
    onDelivery: false,
    instant: false,
  });
  return (
    <PrivateRoute message='You need to login to checkout'>
      <Head>
        <title>Safelybuy - Shopping</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <section className='relative pb-48 flex flex-col min-h-screen md:pb-80'>
        <Navigation />
        <Container topPadding>
          <Back />
          <div className='flex mb-10 md:mb-4 md:flex-wrap items-start'>
            <div className='w-2/3 mr-8 md:w-full'>
              <h2 className='text-4xl tracking-wider font-bold md:text-2xl'>
                Payment
              </h2>
              <h4 className='my-4 text-xl font-medium'>Select Payment Type</h4>
              <div className='flex items-center'>
                <div
                  onClick={() =>
                    setPaymentType({
                      ...paymentType,
                      onDelivery: true,
                      instant: false,
                    })
                  }
                  className='inline-block cursor-pointer w-5 h-5 mr-3 shadow-inner border border-gray-400 rounded-full'
                >
                  {paymentType.onDelivery && (
                    <div className='inline-block m-px w-4 h-4 shadow-inner border-2 bg-purple-500 border-purple-300 rounded-full'></div>
                  )}
                </div>{' '}
                Payment on Delivery
                <div
                  onClick={() =>
                    setPaymentType({
                      ...paymentType,
                      onDelivery: false,
                      instant: true,
                    })
                  }
                  className='ml-8 inline-block cursor-pointer w-5 h-5 mr-3 shadow-inner border border-gray-400 rounded-full'
                >
                  {paymentType.instant && (
                    <div className='inline-block m-px w-4 h-4 shadow-inner border-2 bg-purple-500 border-purple-300 rounded-full'></div>
                  )}
                </div>
                Instant Payment &nbsp;{' '}
                <span className='text-green-500'>+5% discount</span>
              </div>
              <h4 className='my-4 text-xl font-medium'>
                Discount and Promotion
              </h4>
              <label className='my-2' htmlFor='email'>
                Discount code
              </label>
              <div className='relative md:w-full mb-6 mt-2'>
                <input
                  type='text'
                  placeholder='Enter your promo code'
                  id='email'
                  required
                  className={`border w-80 mr-3 rounded-full px-6 py-2 focus:outline-none focus:shadow-xl`}
                />
                <Button secondary roundedFull>
                  Apply
                </Button>
              </div>
            </div>
            <OrderDetails active='payment' />
          </div>

          <div className='mt-8 mr-4 w-7/12 md:w-full flex justify-end md:justify-center'>
            <Button
              primary={selectedAddress.length && deliveryPrice}
              disabled={!(selectedAddress.length && deliveryPrice)}
              roundedLg
              onClick={() => initializePayment(onSuccess, onClose)}
              icon={<ArrowRight color='white' scale={0.9} />}
              text='Proceed to Checkout'
            ></Button>
          </div>
        </Container>
        <Footer />
      </section>
    </PrivateRoute>
  );
};

export default Payment;
// pk_test_af24f8ebae46f53058989e7cbf36f505e8880b61
