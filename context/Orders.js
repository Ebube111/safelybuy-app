import { createContext, useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import { baseUrl } from 'api';
import { axiosWithAuth } from 'auth';
import { useRouter } from 'next/router';

const OrdersContext = createContext([]);

export const OrdersProvider = ({ children }) => {
  // let savedCart = process.browser && localStorage.getItem('safelybuy_cart');
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();

  const getOrders = async () => {
    setLoading(true);
    try {
      const res = await axiosWithAuth().get(
        `${baseUrl}/api/v1/shopping/orders`
      );
      let { data } = res;
      setLoading(false);
      setOrders(data.orders);
    } catch (error) {
      console.log('error', error.message || error.response.data);
      setLoading(false);
      addToast('Error getting user orders', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  useEffect(() => {
    if (!orders?.length && router.pathname === '/settings') getOrders();
  }, [router.pathname]);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        getOrders,
        loading,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
export default OrdersContext;
