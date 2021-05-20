import { useContext, useEffect, useState } from 'react';
import OrdersContext from 'context/Orders';
import OrderDetail from './OrderDetail';
import Order from './Order';

export default function Orders() {
  const { getOrders, orders } = useContext(OrdersContext);
  const [selectedOrder, setselectedOrder] = useState(null);

  useEffect(() => {
    if (!orders.length) getOrders();
  }, []);

  console.log(orders);

  return (
    <div className='p-6'>
      <h3 className='text-xl font-bold'>Available Orders</h3>
      <div className=''>
        {selectedOrder ? (
          <OrderDetail details={selectedOrder} />
        ) : (
          orders.map((e) => (
            <Order
              name={e.order_details[0]?.item?.title}
              image={e.order_details[0]?.item?.main_image}
              status={e.status}
              date={e.created_at}
              orderNumber={e.order_number}
              setselectedOrder={setselectedOrder}
              order={e}
            />
          ))
        )}
      </div>
    </div>
  );
}
