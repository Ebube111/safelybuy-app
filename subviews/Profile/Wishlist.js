import { useContext, useEffect } from 'react';
import OrdersContext from 'context/Orders';
import Order from './Order';
import WishlistItem from './WishlistItem';
import { shoppingItems } from 'data';

let wishlist = shoppingItems;
wishlist.length = 3;

export default function Wishlist() {
  const { getOrders, orders, loading } = useContext(OrdersContext);

  // useEffect(() => {
  //   if (!orders.length) getOrders();
  // }, []);

  // if (loading)
  //   return (
  //     <span
  //       style={{
  //         borderRightWidth: '2px',
  //         borderLeftWidth: '2px',
  //         borderRightColor: 'white',
  //       }}
  //       className='animate-spin rounded-full inline-block w-6 h-6 border-purple-700'
  //     ></span>
  //   );

  console.log(wishlist);

  return (
    <div className='px-6'>
      <div className='py-6'>
        <h3 className='text-xl font-bold'>Wishlist</h3>
        {/* {orders.map((e) => (
          <Order
            key={Math.random()}
            name={e.order_details[0]?.item?.title}
            image={e.order_details[0]?.item?.main_image}
            status={e.status}
            date={e.created_at}
            orderNumber={e.order_number}
            order={e}
          />
        ))} */}
        {wishlist.map((e) => (
          <WishlistItem
            id={e.id}
            img={e.main_image}
            title={e.title}
            rating={e.rating_sum}
            price={Number(e.price)}
            condition={e.condition}
          />
        ))}
      </div>
    </div>
  );
}
