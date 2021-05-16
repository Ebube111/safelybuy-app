import React, { useReducer, useEffect } from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { ContextUser } from 'context';
import { CartProvider } from 'context/Shopping';
import { AddressProvider } from 'context/Address';
import userReducer from 'reducers/auth';
import { auth } from 'reducers/initialState';
import { fetchUser } from 'actions/auth';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/globals.css';
import '../styles/extra.scss';
import 'react-tabs/style/react-tabs.css';

function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(userReducer, auth);

  useEffect(() => {
    if (state.error) return;
    if (state.user.firstname) return;
    fetchUser(dispatch);
  }, [dispatch, state.user.firstname]);

  return (
    <ToastProvider>
      <ContextUser.Provider value={[state, dispatch]}>
        <AddressProvider>
          <CartProvider>
            <Component {...pageProps} />
          </CartProvider>
        </AddressProvider>
      </ContextUser.Provider>
    </ToastProvider>
  );
}

export default MyApp;
