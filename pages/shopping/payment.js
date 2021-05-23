import Navigation from 'subviews/header';
import Head from 'next/head';
import Link from 'next/link';
import Footer from 'components/Footer';
import Back from 'components/Back';
import { ArrowRight } from 'svg';
import Button from 'components/Button';
import Container from 'components/Container';
import OrderDetails from 'subviews/OrderDetails';
import PrivateRoute from 'auth/PrivateRoute';

const Payment = () => {
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
            <div className='w-2/3 mr-8 md:w-full'></div>
            <OrderDetails active='payment' />
          </div>

          <div className='mt-8 mr-4 w-7/12 md:w-full flex justify-end md:justify-center leading-none'>
            <Link href='/shopping/payment'>
              <a>
                <Button
                  primary
                  roundedLg
                  icon={<ArrowRight color='white' scale={0.9} />}
                  text='Proceed to Checkout'
                ></Button>
              </a>
            </Link>
          </div>
        </Container>
        <Footer />
      </section>
    </PrivateRoute>
  );
};

export default Payment;
