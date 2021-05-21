import { useContext, useEffect, useState } from 'react';
import OrdersContext from 'context/Orders';
import OrderDetail from './OrderDetail';
import Order from './Order';

export default function Orders() {
  const { getOrders, orders, loading } = useContext(OrdersContext);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!orders.length) getOrders();
  }, []);

  if (loading)
    return (
      <span
        style={{
          borderRightWidth: '2px',
          borderLeftWidth: '2px',
          borderRightColor: 'white',
        }}
        className='animate-spin rounded-full inline-block w-6 h-6 border-purple-700'
      ></span>
    );

  return (
    <div className='px-6'>
      {selectedOrder ? (
        <OrderDetail
          details={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
      ) : (
        <div className='py-6'>
          <h3 className='text-xl font-bold'>Available Orders</h3>
          {orders.map((e) => (
            <Order
              key={Math.random()}
              name={e.order_details[0]?.item?.title}
              image={e.order_details[0]?.item?.main_image}
              status={e.status}
              date={e.created_at}
              orderNumber={e.order_number}
              setSelectedOrder={setSelectedOrder}
              order={e}
            />
          ))}
        </div>
      )}
    </div>
  );
}
