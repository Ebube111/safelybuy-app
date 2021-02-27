import { useContext, useState } from 'react';
import Link from 'next/link';
import Button from '../components/Button';
import Logo from '../components/Logo';
import { ContextUser } from '../context';
import User, { buttonStyles } from '../components/User';
import { useComponentVisible } from '../hooks';
import { Cart, HambugerSkewed, SearchIcon, Hamburger, CloseIcon } from '../svg';

const header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [state, dispatch] = useContext(ContextUser);
  const {
    ref: userRef,
    isComponentVisible: userIsVisible,
    setIsComponentVisible: setUserIsVisible,
  } = useComponentVisible(false);
  return (
    <div className='fixed w-full bg-white z-20 shadow-lg px-20 py-6 md:px-6 md:py-3'>
      {/* navigation */}
      <nav className='flex w-full items-center tracking-wide justify-between'>
        <div className='flex md:hidden'>
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
        <div className='hidden md:flex items-center'>
          <div className='mr-2 mb-1'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`block px-2 py-3 rounded-md ${buttonStyles()}`}
            >
              {!isMenuOpen ? (
                <Hamburger scale={1} color='black' />
              ) : (
                <CloseIcon />
              )}
            </button>
          </div>
          <Link href='/'>
            <>
              <Logo color='purple' />
            </>
          </Link>
        </div>
        <div className='flex items-center'>
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
          <Link href='/shopping/cart/'>
            <div className='bg-green-500 cursor-pointer px-4 md:px-2 py-3 md:py-2 rounded-md shadow-lg relative transform hover:shadow-2xl hover:-translate-y-0.5 active:shadow:sm active:translate-y-0 focus:outline-none'>
              <Cart />
              <div className='absolute bg-red-500 rounded-full px-2 py-1 md:px-1 md:py-px text-xs -right-2 -top-2 text-white '>
                2
              </div>
            </div>
          </Link>
        </div>
      </nav>
      <div className='relative hidden md:flex ml-10 md:ml-6 md:mx-6 mt-3'>
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
  );
};

export default header;
