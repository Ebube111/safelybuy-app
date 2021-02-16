import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUp, AngleRight, UserAvatar } from '../svg';
import { UserMenuMobile } from './UserMenuMobile';
import { ContextUser } from '../context';
import { fetchUser } from '../actions/auth';

export const buttonStyles = (color) =>
  `hover:bg-${color}-100 transform active:shadow-sm active:bg-${color}-200 hover:scale-105 active:scale-100 hover:shadow-xl focus:outline-none`;

const User = ({ userIsVisible, setUserIsVisible, userRef }) => {
  // const history = useHistory();
  const [state, dispatch] = useContext(ContextUser);
  useEffect(() => {
    if (state.user.firstname) return;
    fetchUser(dispatch);
  }, [dispatch, state.user.firstname]);

  return (
    <div className='relative'>
      <div className='relative px-8'>
        <button
          onClick={(e) => {
            if (userIsVisible) setUserIsVisible(false);
            else setUserIsVisible(true);
            e.stopPropagation();
          }}
          className={`flex p-1 pr-4 md:pr-1 rounded-full ml-2 items-center ${buttonStyles(
            'gray'
          )}`}
        >
          {state.loadingUser ? (
            <div className='animate-pulse space-y-2 ml-3'>
              <div className='h-4 w-16 bg-gray-200 rounded'></div>
              <div className='h-4 w-16 bg-gray-100 rounded'></div>
            </div>
          ) : (
            <div className='ml-3 flex font-medium text-lg flex-col md:hidden'>
              {state.user.firstname ? (
                <>
                  <span className='font-medium capitalize text-lg'>Hi, {`${state.user.firstname}`}</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </div>
          )}
          <div className='ml-4 flex flex-col justify-between md:hidden'>
            <div className='mt-px'>{<ArrowDown scale={2} color='black' />}</div>
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
