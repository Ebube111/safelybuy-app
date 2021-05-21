import { useContext } from 'react';
import { AngleRight, Card, Home, Time } from 'svg';
import OrderItem from './OrderItem';
import moment from 'moment';
import { ContextUser } from 'context';

const KeyValueWithIcon = ({ title, value, heading, icon }) => (
  <div className='flex my-3 md:my-8'>
    <div className='flex mt-1'>{icon}</div>
    <div className='flex ml-4 flex-col'>
      <small className='text-gray-500 font-medium'>{title}</small>
      <h5 className='capitalize font-bold'>{heading}</h5>
      <p className='text-gray-800 text-sm w-40'>{value}</p>
    </div>
  </div>
);

export default function OrderDetail({ details, setSelectedOrder }) {
  const [{ user }] = useContext(ContextUser);

  return (
    <div>
      <div
        onClick={() => setSelectedOrder(null)}
        className='pb-4 z-10 bg-white cursor-pointer text-gray-600'
      >
        <span className='transform inline-block mr-1 rotate-180'>
          <AngleRight color='rgb(75, 85, 99)' scale={1.4} />
        </span>{' '}
        Available orders
      </div>
      <div className='flex flex-col justify-between'>
        <div className='flex items-center'>
          <h3 className='text-2xl font-bold'>
            Order - <span className='uppercase'>{details.order_number}</span>
          </h3>
          <div
            className={
              details.status === 'delivered'
                ? 'bg-green-100 text-green-500'
                : 'bg-orange-100 text-orange-500' +
                  ' ml-8 text-sm capitalize inline-block px-6 rounded-full py-1'
            }
          >
            {details.status}
          </div>
          <div className='font-medium ml-4'>
            {moment(details.created_at).format('Do - MMM - YYYY')}
          </div>
        </div>
        <div className='flex justigy-start mt-4 pb-36'>
          {details.order_details.map((e) => (
            <div key={Math.random()}>
              <OrderItem
                name={e.item?.title}
                imageUrl={e.item?.main_image}
                quantity={e.quantity}
                price={e.price}
              />
            </div>
          ))}
        </div>
        <div className='absolute bottom-0 flex w-full justify-between border-t-2 md:flex-col'>
          <KeyValueWithIcon
            icon={<Home />}
            title='Shipping information'
            heading={user.firstname + ' ' + user.lastname}
            value={
              // <span>
              //   11, Ota-Etiosa road, Palmgrove,
              //   <br />
              //   Redemption State, LGA.
              //   <br />
              //   +2348234920382
              // </span>
              details.shipping_address
            }
          />
          <KeyValueWithIcon
            icon={<Card />}
            title='Payment method'
            heading={details.payment_method}
          />
          <KeyValueWithIcon
            icon={<Time />}
            title='Estimated delivery date'
            heading={
              <span>
                {moment(details.delivery_estimate_start).format(
                  'Do - MMM - YYYY, h:mm'
                )}{' '}
                <br />{' '}
                {moment(details.delivery_estimate_end).format(
                  'Do - MMM - YYYY, h:mm'
                )}{' '}
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
}
