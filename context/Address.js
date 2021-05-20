import { createContext, useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import { baseUrl } from 'api';
import { axiosWithAuth } from 'auth';
import { useRouter } from 'next/router';

const AddressContext = createContext([]);

export const AddressProvider = ({ children }) => {
  // let savedCart = process.browser && localStorage.getItem('safelybuy_cart');
  const router = useRouter();
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();

  const addAddress = async (data, modal) => {
    let i = data;
    setLoading(true);
    try {
      const res = await axiosWithAuth().post(
        `${baseUrl}/api/v1/address/add`,
        i
      );
      let { data } = res;
      // Pass data to the page via props
      console.log(data);
      setLoading(false);
      addToast('User address created', {
        appearance: 'success',
        autoDismiss: true,
      });
      getAddress(modal);
    } catch (error) {
      console.log('error', error.message || error.response.data, error);
      setLoading(false);
      addToast('Error creating user address', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  const removeAddress = async (e, id) => {
    e.stopPropagation();
    // get addresses of loggedin user
    setLoading(true);
    try {
      await axiosWithAuth().post(`${baseUrl}/api/v1/address/delete/` + id);
      // Pass data to the page via props
      setLoading(false);
      addToast('User address removed', {
        appearance: 'success',
        autoDismiss: true,
      });
      getAddress();
    } catch (error) {
      console.log('error', error.message, error?.response?.data);
      setLoading(false);
      addToast('Error deleting user', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  const editAddress = async (id, data, modal) => {
    let i = data;
    setLoading(true);
    try {
      const res = await axiosWithAuth().post(
        `${baseUrl}/api/v1/address/update/${id}`,
        i
      );
      let { data } = res;
      // Pass data to the page via props
      console.log(data);
      setLoading(false);
      addToast('User address updated', {
        appearance: 'success',
        autoDismiss: true,
      });
      getAddress(modal);
    } catch (error) {
      console.log('error', error.message || error.response.data, error);
      setLoading(false);
      addToast('Error updating user address', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  const getAddress = async (modal) => {
    // get addresses of loggedin user
    setLoading(true);
    try {
      const res = await axiosWithAuth().get(`${baseUrl}/api/v1/addresses`);
      let { data } = res;
      // Pass data to the page via props
      setLoading(false);
      setAddress(data.data);
      if (modal) modal([false, '']);
    } catch (error) {
      console.log('error', error.message || error.response.data);
      setLoading(false);
    }
  };

  const calculatePrice = async (data) => {
    let i = data;
    try {
      const res = await axiosWithAuth().post(
        `${baseUrl}/api/v1/delivery/calculate`,
        i
      );
      let { data } = res;
      return data;
    } catch (error) {
      console.log('error', error.message || error.response.data, error);
      return error;
    }
  };

  useEffect(() => {
    // process.browser &&
    //   localStorage.setItem('safelybuy_cart', JSON.stringify(cart));

    if (
      !address.length &&
      (router.pathname === '/shopping/delivery' || router.pathname === '/settings')
    )
      getAddress();
  }, [router.pathname]);

  return (
    <AddressContext.Provider
      value={{
        address,
        addAddress,
        removeAddress,
        editAddress,
        calculatePrice,
        loading,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
export default AddressContext;
