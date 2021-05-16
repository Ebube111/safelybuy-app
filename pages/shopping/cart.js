import { useContext } from 'react';
import Navigation from 'subviews/header';
import Head from 'next/head';
import Link from 'next/link';
import Footer from 'components/Footer';
import CartContext from 'context/Shopping';
import Back from 'components/Back';
import { ArrowRight } from 'svg';
import Button from 'components/Button';
import CartItem from 'components/CartItem';
import Container from 'components/Container';
import OrderDetails from 'subviews/OrderDetails';

const cart = () => {
  const [cart, , removeItem, setQuantity] = useContext(CartContext);

  return (
    <div>
      <Head>
        <title>Safelybuy - Shopping</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='relative pb-48 flex flex-col min-h-screen md:pb-80'>
        <Navigation />
        <Container topPadding>
          <Back />
          {!cart?.length ? (
            'No items in your cart'
          ) : (
            <div className='flex items-start mb-10 md:mb-4 md:flex-wrap'>
              <div className='w-7/12 mr-4 md:w-full'>
                <h2 className='text-4xl tracking-wider font-bold md:text-2xl'>
                  Your Cart
                </h2>
                <div className='mt-8 md:mt-4'>
                  {cart.map((e) => (
                    <CartItem
                      key={Math.random()}
                      product={e.item}
                      quantity={e.quantity}
                      removeItem={removeItem}
                      setQuantity={setQuantity}
                    />
                  ))}
                </div>
                <div className='flex mt-8 md:hidden justify-end leading-none'>
                  <Link href='/shopping/delivery'>
                    <a>
                      <Button
                        primary
                        roundedLg
                        icon={<ArrowRight color='white' scale={0.9} />}
                      >
                        <p>Proceed to Delivery</p>
                      </Button>
                    </a>
                  </Link>
                </div>
              </div>
              <OrderDetails active='cart' selectedAddress={[]} />
              <div className='hidden mt-8 md:flex w-full leading-none'>
                <Link href='/shopping/delivery'>
                  <a>
                    <Button
                      full
                      primary
                      roundedLg
                      icon={<ArrowRight color='white' scale={0.9} />}
                    >
                      <p className='font-medium text-lg'>Proceed to Delivery</p>
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
          )}
        </Container>
        <Footer />
      </div>
    </div>
  );
};

export default cart;
