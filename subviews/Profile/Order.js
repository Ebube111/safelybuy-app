import Button from 'components/Button';
import { ArrowRight } from 'svg';
import Image from 'next/image';
import moment from 'moment';

export default function Order({
  name,
  status,
  date,
  orderNumber,
  image,
  order,
  setSelectedOrder,
}) {
  if (!name) return null;
  return (
    <div className='flex py-4 border-b'>
      <div className='relative h-28 w-28 md:w-20 md:h-20'>
        <Image className='rounded-md object-cover' src={image} layout='fill' />
      </div>
      <div className='flex justify-between w-full'>
        <div className='ml-6'>
          <h4 className='font-medium mb-4 text-lg'>{name}</h4>
          <div
            className={
              status === 'delivered'
                ? 'bg-green-100 text-green-500'
                : 'bg-orange-100 text-orange-500' +
                  ' text-sm capitalize inline-block px-6 rounded-full py-1'
            }
          >
            {status}
          </div>
          <div className='font-medium mt-1'>
            {moment(date).format('MMM - Do - YYYY')}
          </div>
        </div>
        <div className='flex flex-col justify-between'>
          <span className='text-gray-500 uppercase'>{orderNumber}</span>
          <Button
            primary
            roundedMd
            onClick={() => setSelectedOrder(order)}
            icon={
              <div className='animate-bounceSide'>
                <ArrowRight color='white' />
              </div>
            }
          >
            See details
          </Button>
        </div>
      </div>
    </div>
  );
}
