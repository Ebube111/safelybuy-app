import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { ArrowDown } from '../svg';
import { UserMenuMobile } from './UserMenuMobile';
import { ContextUser } from '../context';

export const buttonStyles = (color) =>
  `hover:bg-${color}-100 transform active:shadow-sm active:bg-${color}-200 hover:scale-105 active:scale-100 hover:shadow-xl focus:outline-none`;

const User = ({ userIsVisible, setUserIsVisible, userRef }) => {
  // const history = useHistory();
  const [state, dispatch] = useContext(ContextUser);

  return (
    <div className='relative'>
      <div className='relative px-2'>
        <button
          onClick={(e) => {
            if (userIsVisible) setUserIsVisible(false);
            else setUserIsVisible(true);
            e.stopPropagation();
          }}
          className={`flex p-1 pr-4 md:pr-0 rounded-full ml-2 items-center ${buttonStyles(
            'gray'
          )}`}
        >
          {state.loadingUser ? (
            <div className='animate-pulse space-y-2 ml-3'>
              <div className='h-4 w-16 bg-gray-200 rounded md:hidden'></div>
              <div className='h-4 w-16 bg-gray-100 rounded md:hidden'></div>
              <div className='h-8 w-8 bg-gray-100 rounded-full hidden md:block'></div>
            </div>
          ) : (
            <>
              <div className='inline-block bg-green-500 p-1 rounded-full'>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 17 17'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M8.57199 16.2857C4.23261 16.2857 0.714844 12.7679 0.714844 8.42855C0.714844 4.08917 4.23261 0.571411 8.57199 0.571411C12.9114 0.571411 16.4291 4.08917 16.4291 8.42855C16.4291 12.7679 12.9114 16.2857 8.57199 16.2857ZM13.8573 12.089C14.5781 11.0502 15.0006 9.78872 15.0006 8.42855C15.0006 4.87815 12.1224 1.99998 8.57199 1.99998C5.02159 1.99998 2.14342 4.87815 2.14342 8.42855C2.14342 9.78871 2.56583 11.0502 3.28663 12.089C4.0901 11.0277 5.97756 10.5719 8.56787 10.5714C6.97044 10.5695 5.71484 9.44601 5.71484 6.99998C5.71484 5.39696 6.84277 4.14284 8.57198 4.14284C10.2964 4.14284 11.4291 5.5154 11.4291 7.14284C11.4291 9.48542 10.1563 10.5714 8.57198 10.5714C11.1644 10.5714 13.0535 11.0272 13.8573 12.089ZM12.8325 13.2427C12.6234 12.491 11.1215 12 8.57198 12C6.02243 12 4.52057 12.4909 4.31149 13.2427C5.44577 14.2472 6.93766 14.8571 8.57199 14.8571C10.2063 14.8571 11.6982 14.2473 12.8325 13.2427ZM7.14341 6.99998C7.14341 8.62088 7.72785 9.14284 8.57199 9.14284C9.4132 9.14284 10.0006 8.64169 10.0006 7.14284C10.0006 6.25028 9.44031 5.57141 8.57199 5.57141C7.66751 5.57141 7.14341 6.15414 7.14341 6.99998Z'
                    fill='white'
                  />
                </svg>
              </div>
              <div className='ml-2 flex font-medium text-normal flex-col md:hidden'>
                {state.user.firstname ? (
                  <>
                    <span className='font-medium capitalize text-normal'>
                      Hi, {`${state.user.firstname}`}
                    </span>
                  </>
                ) : (
                  <span>Login</span>
                )}
              </div>
            </>
          )}
          <div className='ml-2 flex flex-col justify-between md:hidden'>
            <div className='mt-px'>{<ArrowDown scale={1.5} color='black' />}</div>
          </div>
        </button>
        <div ref={userRef}>
          {userIsVisible && (
            <UserMenuMobile
              isMenuOpen={userIsVisible}
              setIsMenuOpen={setUserIsVisible}
            />
          )}
          {userIsVisible && (
            <ul
              className={`absolute w-40 right-2 mt-2 bg-white z-10 rounded-xl border-gray-100 border-2 md:invisible`}
            >
              {state.user.firstname
                ? [
                    { url: '#', text: 'Settings' },
                    { url: '#', text: 'Referrals' },
                    {
                      url: '/login',
                      text: 'Logout',
                      onClick: (e) => {
                        localStorage.removeItem('safely_buy_token');
                      },
                      color: 'red',
                    },
                  ].map((e) => (
                    <Link key={Date.now() + Math.random()} href={e.url}>
                      <a>
                        <li
                          className={`py-2 px-4 rounded-xl hover:bg-gray-100 flex items-center justify-between`}
                        >
                          <div>
                            <span
                              className={`${e.color && `text-${e.color}-500`}`}
                            >
                              {e.text}
                            </span>
                            {e.unread && (
                              <div className='relative h-2 w-2 ml-1 -top-2 inline-block bg-red-500 rounded-full'></div>
                            )}
                          </div>
                          {e.svg && e.svg}
                        </li>
                      </a>
                    </Link>
                  ))
                : [
                    {
                      url: '/login',
                      text: 'Login',
                    },
                    {
                      url: '/signup',
                      text: 'Sign Up',
                      color: 'green',
                    },
                  ].map((e) => (
                    <Link key={Date.now() + Math.random()} href={e.url}>
                      <a>
                        <li
                          className={`py-2 px-4 rounded-xl hover:bg-gray-100 flex items-center justify-between`}
                        >
                          <div>
                            <span
                              className={`${e.color && `text-${e.color}-500`}`}
                            >
                              {e.text}
                            </span>
                            {e.unread && (
                              <div className='relative h-2 w-2 ml-1 -top-2 inline-block bg-red-500 rounded-full'></div>
                            )}
                          </div>
                          {e.svg && e.svg}
                        </li>
                      </a>
                    </Link>
                  ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
