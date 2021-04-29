import { createContext, useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import { baseUrl } from 'api';
import { axiosWithAuth } from 'auth';

const AddressContext = createContext([]);

export const AddressProvider = ({ children }) => {
  // let savedCart = process.browser && localStorage.getItem('safelybuy_cart');

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
    console.log(id)
    e.stopPropagation();
    // get addresses of loggedin user
    setLoading(true);
    try {
      const res = await axiosWithAuth().post(
        `${baseUrl}/api/v1/address/delete/` + id
      );
      let { data } = res;
      // Pass data to the page via props
      console.log(data);
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

  const editAddress = (id, data) => {
    // const found = cart.findIndex((e) => id === e.item.id);
    // if (found !== -1) {
    //   const newItem = cart[found];
    //   newItem.quantity = quantity;
    //   const newCart = [...cart];
    //   newCart.splice(found, 1, newItem);
    //   setCart(newCart);
    // }
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
      if (modal) modal(false);
    } catch (error) {
      console.log('error', error.message || error.response.data);
      setLoading(false);
      addToast('You need to login to checkout', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  useEffect(() => {
    // process.browser &&
    //   localStorage.setItem('safelybuy_cart', JSON.stringify(cart));
    if (!address.length) getAddress();
  }, []);

  return (
    <AddressContext.Provider
      value={{ address, addAddress, removeAddress, editAddress, loading }}
    >
      {children}
    </AddressContext.Provider>
  );
};
export default AddressContext;
