import Button from 'components/Button';
import Image from 'next/image';

const KeyValue = ({ title, value }) => (
  <div className='flex my-3 flex-col'>
    <small className='text-gray-400 font-medium capitalize'>
      {title} <span className='text-black'>{value}</span>
    </small>
  </div>
);

export default function OrderItem({
  name,
  imageUrl,
  quantity,
  price,
  tracing_url,
}) {
  return (
    <div className=''>
      <div className='flex'>
        <div className='relative h-28 w-28 md:w-20 md:h-20'>
          <Image
            className='rounded-md object-cover'
            src={imageUrl}
            layout='fill'
          />
        </div>
        <div className='w-44 px-4'>
          <p className='font-medium text-lg md:text-xs'>{name}</p>
          <KeyValue title='Quantity: ' value={quantity} />
          <KeyValue
            title='Prices: '
            value={<span>&#8358;{price.toLocaleString()}</span>}
          />
        </div>
      </div>
      <div className='mt-2'>
        <Button roundedMd secondary text='Track Order' />
      </div>
    </div>
  );
}
