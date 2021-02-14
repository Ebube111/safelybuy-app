import React, { useReducer } from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { ContextUser } from '../context';
import userReducer from '../reducers/auth';
import { auth } from "../reducers/initialState";
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(userReducer, auth);

  return (
    <ToastProvider>
      <ContextUser.Provider value={[state, dispatch]}>
        <Component {...pageProps} />
      </ContextUser.Provider>
    </ToastProvider>
  );
}

export default MyApp;
