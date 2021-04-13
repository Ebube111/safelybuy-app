import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CartItem = ({ product, quantity, removeItem, setQuantity }) => {
  const { id, title, main_image, price, rating_sum } = product;
  return (
    <div className='border-b-2 border-gray-50 py-6 last:border-0 relative'>
      <div className='w-full flex items-center'>
        <Link href={`/shopping/products/${id}`}>
          <div className='relative cursor-pointer h-20 w-20 md:w-16 md:h-16'>
            <Image
              className='rounded-md object-cover'
              src={main_image}
              layout='fill'
            />
          </div>
        </Link>
        <div className='flex md:flex-wrap ml-5 w-full items-center'>
          <div className='w-5/12 md:w-full'>
            <p className='font-medium md:text-xs'>{title}</p>
            <div className='flex justify-between'>
              <span className='flex items-center rating text-xs'>
                {new Array(Number(parseInt(rating_sum)))
                  .fill('star')
                  .map((e) => (
                    <svg
                      key={Math.random()}
                      width='12'
                      height='12'
                      viewBox='0 0 16 16'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='inline-block'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M7.99958 12.7532L3.19559 15.2788L4.11307 9.92949L0.226562 6.14108L5.59759 5.36063L7.99958 0.493652L10.4016 5.36063L15.7726 6.14108L11.8861 9.92949L12.8036 15.2788L7.99958 12.7532Z'
                        fill='#F2C94C'
                      />
                    </svg>
                  ))}
                {new Array(5 - Number(parseInt(rating_sum)))
                  .fill('star')
                  .map((e) => (
                    <svg
                      key={Math.random()}
                      className='opacity-30 inline-block'
                      width='12'
                      height='12'
                      viewBox='0 0 16 16'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M7.99958 12.7532L3.19559 15.2788L4.11307 9.92949L0.226562 6.14108L5.59759 5.36063L7.99958 0.493652L10.4016 5.36063L15.7726 6.14108L11.8861 9.92949L12.8036 15.2788L7.99958 12.7532Z'
                        fill='#F2C94C'
                      />
                    </svg>
                  ))}
                &nbsp;{rating_sum}
              </span>
            </div>
          </div>
          <div className='w-2/12 md:w-full md:order-last'>
            <div className='w-24 flex m-auto md:m-0 justify-between items-center leading-none'>
              <span
                onClick={() => {
                  if (quantity > 1) setQuantity(id, quantity - 1);
                  else removeItem(id)
                }}
                className='bg-purple-100 border cursor-pointer py-1 text-purple-600 font-medium rounded-md px-2 border-puple-300'
              >
                -
              </span>
              <span className='font-bold'>{quantity}</span>
              <span
                onClick={() => setQuantity(id, quantity + 1)}
                className='bg-purple-100 border cursor-pointer py-1 text-purple-600 font-medium rounded-md px-2 border-puple-300'
              >
                +
              </span>
            </div>
          </div>
          <div className='text-2xl m-auto md:my-1 w-3/12 md:w-full font-bold md:text-sm'>
            &#8358;{price.toLocaleString()}
          </div>
        </div>
      </div>
      <svg
        width='91'
        height='28'
        viewBox='0 0 91 28'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='absolute right-0 transform translate-y-1/2 cursor-pointer'
        onClick={() => removeItem(id)}
        style={{ bottom: '28%' }}
      >
        <rect opacity='0.1' width='91' height='28' rx='14' fill='#EB5757' />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M23.075 13.2496L26.7873 16.9619L25.9623 17.7868L22.25 14.0745L18.5377 17.7868L17.7127 16.9619L21.425 13.2496L17.7127 9.53727L18.5377 8.71231L22.25 12.4246L25.9623 8.71231L26.7873 9.53727L23.075 13.2496Z'
          fill='#EB5757'
        />
        <path
          d='M37.3 10.0796V16.7496H38.32V14.0196H38.5L40.41 16.7496H41.64L39.56 13.8996C40.45 13.6996 41.04 12.9996 41.04 12.0396C41.04 11.7496 40.98 10.9596 40.25 10.4696C39.82 10.1796 39.3 10.0796 38.49 10.0796H37.3ZM38.32 11.0196H38.67C39.17 11.0196 40.06 11.1096 40.06 12.0496C40.06 13.1096 38.92 13.1396 38.64 13.1396H38.32V11.0196ZM45.8118 15.3296C45.7218 15.4896 45.5918 15.6596 45.4218 15.7896C45.2218 15.9396 45.0218 15.9996 44.7518 15.9996C44.5118 15.9996 44.2318 15.9596 44.0018 15.7296C43.7918 15.5196 43.6618 15.1796 43.6418 14.8796H46.6618V14.7596C46.6618 14.3196 46.6118 13.5396 46.0718 12.9796C45.8218 12.7196 45.3918 12.4296 44.7218 12.4296C44.1218 12.4296 43.6618 12.6496 43.3118 12.9996C42.8718 13.4496 42.6418 14.0796 42.6418 14.7296C42.6418 15.3596 42.8618 15.9396 43.2618 16.3396C43.6618 16.7396 44.1218 16.8796 44.6818 16.8796C45.1318 16.8796 45.5818 16.7796 45.9218 16.5596C46.1918 16.3896 46.4518 16.1096 46.6318 15.7896L45.8118 15.3296ZM43.7118 14.0796C43.7618 13.8696 43.8718 13.6696 44.0118 13.5396C44.1418 13.4096 44.3618 13.2696 44.7018 13.2696C45.0218 13.2696 45.2318 13.3896 45.3618 13.5096C45.5118 13.6496 45.6218 13.8496 45.6618 14.0796H43.7118ZM48.086 16.7496H49.066V14.5796C49.066 14.2196 49.086 13.8596 49.256 13.6196C49.386 13.4396 49.596 13.3096 49.836 13.3096C50.186 13.3096 50.336 13.5196 50.396 13.6796C50.436 13.7696 50.486 13.9596 50.486 14.4296V16.7496H51.466V14.5796C51.466 14.2196 51.486 13.8596 51.656 13.6196C51.786 13.4396 51.996 13.3096 52.236 13.3096C52.586 13.3096 52.736 13.5196 52.796 13.6796C52.836 13.7696 52.886 13.9596 52.886 14.4296V16.7496H53.866V14.1496C53.866 13.5396 53.726 13.2296 53.646 13.0896C53.406 12.6696 52.956 12.4296 52.446 12.4296C52.076 12.4296 51.546 12.5496 51.196 13.0496C50.956 12.6396 50.546 12.4296 50.106 12.4296C49.786 12.4296 49.396 12.5296 49.066 12.9296V12.5396H48.086V16.7496ZM57.5375 12.4296C56.2675 12.4296 55.2875 13.3496 55.2875 14.6496C55.2875 15.9396 56.2675 16.8796 57.5375 16.8796C58.8075 16.8796 59.7875 15.9396 59.7875 14.6496C59.7875 13.3496 58.8075 12.4296 57.5375 12.4296ZM57.5375 15.9996C56.7675 15.9996 56.2875 15.4696 56.2875 14.6596C56.2875 13.6996 56.9175 13.3096 57.5375 13.3096C58.1575 13.3096 58.7875 13.6996 58.7875 14.6596C58.7875 15.4696 58.3075 15.9996 57.5375 15.9996ZM60.6502 12.5396L62.8302 17.0496L65.0102 12.5396H63.9102L62.8302 14.9396L61.7502 12.5396H60.6502ZM68.9255 15.3296C68.8355 15.4896 68.7055 15.6596 68.5355 15.7896C68.3355 15.9396 68.1355 15.9996 67.8655 15.9996C67.6255 15.9996 67.3455 15.9596 67.1155 15.7296C66.9055 15.5196 66.7755 15.1796 66.7555 14.8796H69.7755V14.7596C69.7755 14.3196 69.7255 13.5396 69.1855 12.9796C68.9355 12.7196 68.5055 12.4296 67.8355 12.4296C67.2355 12.4296 66.7755 12.6496 66.4255 12.9996C65.9855 13.4496 65.7555 14.0796 65.7555 14.7296C65.7555 15.3596 65.9755 15.9396 66.3755 16.3396C66.7755 16.7396 67.2355 16.8796 67.7955 16.8796C68.2455 16.8796 68.6955 16.7796 69.0355 16.5596C69.3055 16.3896 69.5655 16.1096 69.7455 15.7896L68.9255 15.3296ZM66.8255 14.0796C66.8755 13.8696 66.9855 13.6696 67.1255 13.5396C67.2555 13.4096 67.4755 13.2696 67.8155 13.2696C68.1355 13.2696 68.3455 13.3896 68.4755 13.5096C68.6255 13.6496 68.7355 13.8496 68.7755 14.0796H66.8255Z'
          fill='#EB5757'
        />
      </svg>
    </div>
  );
};

export default CartItem;
