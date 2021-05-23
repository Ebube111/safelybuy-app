import { useContext, useEffect, useState, memo } from 'react';
import CartContext from 'context/Shopping';
import { useRouter } from 'next/router';
import { cities } from 'data';

let sellers = [];
let sellerObj = null;
let delData = [];

const OrderDetails = ({ active, selectedAddress, calculatePrice }) => {
  const [cart] = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const router = useRouter();
  const [delPriceLoading, setDelPriceLoading] = useState(false);

  useEffect(() => {
    setTotal(
      cart.reduce(
        (acc, cur) => acc + Number(cur.item.price) * Number(cur.quantity),
        0
      )
    );
    sellers = cart.map((e) => {
      return {
        location:
          e.item.shipping_state === 'Lagos' &&
          selectedAddress[0]?.state === 'Lagos'
            ? e.item.shipping_city
            : e.item.shipping_state,
        total_weight: Number(e.item.weight) * Number(e.quantity),
      };
    });
    const obj = {};
    sellers.forEach((seller) => {
      if (obj[seller.location] !== undefined)
        obj[seller.location] += Number(seller.total_weight);
      else obj[seller.location] = Number(seller.total_weight);
    });
    sellerObj = obj;
    if (selectedAddress?.length) {
      const newArr = [];
      for (let a in sellerObj) {
        newArr.push({
          [Object.keys(cities).includes(a) ? 'start' : 'lagos_start']: a,
          [a === 'Lagos' || Object.keys(cities).includes(a)
            ? 'destination'
            : 'lagos_destination']:
            a === 'Lagos' || Object.keys(cities).includes(a)
              ? selectedAddress[0].state
              : selectedAddress[0].city,
          weight: sellerObj[a] < 2.5 ? 2.5 : sellerObj[a] < 3.5 ? 3.5 : 5,
        });
      }
      delData = newArr;
    }
  }, [cart, selectedAddress[0], router.pathname]);

  useEffect(() => {
    if (selectedAddress?.length)
      (async () => {
        setDeliveryPrice(0);
        let price = 0;
        if (delData?.length) {
          setDelPriceLoading(true);
          let i = 0;
          while (i < delData.length) {
            const result = await calculatePrice(delData[i]);
            price += result?.price[0]?.price || 0;
            i++;
          }
          setDelPriceLoading(false);
          setDeliveryPrice(price);
        }
      })();
  }, [selectedAddress[0]]);

  return (
    <div className='sticky top-32 w-5/12 ml-4 md:ml-0 shadow-2xl p-4 rounded-3xl min-h-80 md:w-full'>
      <div className='step-indicator flex relative'>
        <div className='absolute w-full h-2 border-b-2 border-dashed top-4'></div>
        <div className='flex w-full z-10 justify-between'>
          <div className='bg-white flex flex-col justify-center items-center py-2 px-2'>
            <svg
              width='14'
              height='14'
              viewBox='0 0 14 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M3.04815 1.66836C2.92975 1.6681 2.81561 1.6815 2.70716 1.70698C2.55848 1.37928 2.36209 1.08529 2.13872 0.861924C1.75961 0.482809 1.16169 0.333328 0.333984 0.333328V1.66666C0.839616 1.66666 1.13058 1.7394 1.19591 1.80473C1.44789 2.05671 1.66732 2.5687 1.66732 2.99999L1.67402 3.09428L2.32726 7.667C1.23422 7.72371 0.387449 8.57255 0.334803 9.63363L0.333984 10.3333C0.398532 11.4293 1.24249 12.2724 2.29614 12.3323L2.44749 12.3325C2.72181 13.1097 3.46286 13.6667 4.33398 13.6667C5.2048 13.6667 5.94562 13.1101 6.22018 12.3333H7.78112C8.05568 13.1101 8.7965 13.6667 9.66732 13.6667C10.7719 13.6667 11.6673 12.7712 11.6673 11.6667C11.6673 10.5621 10.7719 9.66666 9.66732 9.66666C8.7965 9.66666 8.05568 10.2232 7.78112 11H6.22018C5.94562 10.2232 5.2048 9.66666 4.33398 9.66666C3.46317 9.66666 2.72235 10.2232 2.44779 11H2.33398C1.99399 10.9796 1.68901 10.6749 1.66612 10.2934L1.66732 9.66666C1.68529 9.32087 1.98819 9.01797 2.36702 8.99918L3.68311 8.9995L3.69265 9H10.4119L10.5103 8.96877C11.0158 8.80837 11.4204 8.42775 11.612 7.93501L11.6822 7.79601L11.9104 7.34391C12.1465 6.87594 12.3826 6.40717 12.6126 5.9492C13.1761 4.82738 13.5305 4.11444 13.609 3.93937C14.012 3.0403 13.1956 2.3483 12.3611 2.33357L3.04815 1.66836ZM10.1803 7.66666H3.74257C3.69976 7.65476 3.66714 7.6185 3.66075 7.57334L3.00749 3.00048L12.2629 3.66328C12.101 3.99354 11.8066 4.58343 11.4212 5.35072L11.4115 5.36995C11.1915 5.8079 10.9557 6.27603 10.72 6.74338L10.4921 7.19489L10.4057 7.36589L10.3732 7.44148C10.3383 7.5385 10.2692 7.61823 10.1803 7.66666ZM9.66732 12.3333C10.0355 12.3333 10.334 12.0349 10.334 11.6667C10.334 11.2985 10.0355 11 9.66732 11C9.29913 11 9.00065 11.2985 9.00065 11.6667C9.00065 12.0349 9.29913 12.3333 9.66732 12.3333ZM5.00065 11.6667C5.00065 12.0349 4.70217 12.3333 4.33398 12.3333C3.96579 12.3333 3.66732 12.0349 3.66732 11.6667C3.66732 11.2985 3.96579 11 4.33398 11C4.70217 11 5.00065 11.2985 5.00065 11.6667Z'
                fill={active === 'cart' ? '#8661FF' : '#828282'}
              />
            </svg>
            Cart
          </div>
          <div className='bg-white flex flex-col justify-center items-center py-2 px-2'>
            <svg
              width='16'
              height='11'
              viewBox='0 0 16 11'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M10.9207 1.66666L12.1489 4.12316L13.9993 5.35678V7.66666H13.2189C12.9443 6.88987 12.2035 6.33333 11.3327 6.33333C10.4619 6.33333 9.72104 6.88987 9.44649 7.66666H6.55221C6.27765 6.88987 5.53683 6.33333 4.66602 6.33333C3.7952 6.33333 3.05438 6.88987 2.77982 7.66666H1.99935V1.66666H10.9207ZM13.9993 9H13.2189C12.9443 9.77679 12.2035 10.3333 11.3327 10.3333C10.4619 10.3333 9.72104 9.77679 9.44649 9H6.55221C6.27765 9.77679 5.53683 10.3333 4.66602 10.3333C3.7952 10.3333 3.05438 9.77679 2.77982 9H1.99935C1.26297 9 0.666016 8.40304 0.666016 7.66666V1.66666C0.666016 0.930282 1.26297 0.333328 1.99935 0.333328H10.9207C11.4257 0.333328 11.8874 0.618665 12.1132 1.07038L13.1831 3.21017L15.3327 4.64321V7.66666C15.3327 8.40304 14.7357 9 13.9993 9ZM5.33268 8.33333C5.33268 8.70152 5.03421 9 4.66602 9C4.29783 9 3.99935 8.70152 3.99935 8.33333C3.99935 7.96514 4.29783 7.66666 4.66602 7.66666C5.03421 7.66666 5.33268 7.96514 5.33268 8.33333ZM11.9993 8.33333C11.9993 8.70152 11.7009 9 11.3327 9C10.9645 9 10.666 8.70152 10.666 8.33333C10.666 7.96514 10.9645 7.66666 11.3327 7.66666C11.7009 7.66666 11.9993 7.96514 11.9993 8.33333Z'
                fill={active === 'delivery' ? '#8661FF' : '#828282'}
              />
            </svg>
            Delivery
          </div>
          <div className='bg-white flex flex-col justify-center items-center py-2 px-2'>
            <svg
              width='14'
              height='14'
              viewBox='0 0 14 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12.334 2.99999H9.66732V1.70588C9.66732 0.95609 9.07915 0.333328 8.33398 0.333328H1.66732C0.922148 0.333328 0.333984 0.95609 0.333984 1.70588V12.2941C0.333984 13.0439 0.922148 13.6667 1.66732 13.6667H8.33398C9.07915 13.6667 9.66732 13.0439 9.66732 12.2941V11H12.334C13.0704 11 13.6673 10.403 13.6673 9.66666V4.33333C13.6673 3.59695 13.0704 2.99999 12.334 2.99999ZM9.66732 6.33333H12.334V9.66666H9.66732V6.33333ZM8.33398 12.2941V1.70588C8.33398 1.69258 8.33225 1.68335 8.33109 1.67721C8.32964 1.66953 8.3291 1.66666 8.33398 1.66666H1.66732C1.6722 1.66666 1.67166 1.66953 1.67021 1.67721C1.66906 1.68335 1.66732 1.69258 1.66732 1.70588V12.2941C1.66732 12.3074 1.66906 12.3166 1.67021 12.3228C1.67166 12.3305 1.6722 12.3333 1.66732 12.3333H8.33398C8.3291 12.3333 8.32964 12.3305 8.33109 12.3228C8.33225 12.3166 8.33398 12.3074 8.33398 12.2941ZM2.33398 10.3333V11.6667H3.66732V10.3333H2.33398ZM4.33398 11.6667V10.3333H5.66732V11.6667H4.33398ZM6.33398 10.3333V11.6667H7.66732V10.3333H6.33398ZM2.33398 9.66666V8.33333H3.66732V9.66666H2.33398ZM4.33398 8.33333V9.66666H5.66732V8.33333H4.33398ZM6.33398 9.66666V8.33333H7.66732V9.66666H6.33398ZM7.66732 7.66666V2.33333H2.33398V7.66666H7.66732ZM3.66732 3.66666V6.33333H6.33398V3.66666H3.66732ZM12.334 4.33333V4.99999H9.66732V4.33333H12.334Z'
                fill={active === 'payment' ? '#8661FF' : '#828282'}
              />
            </svg>
            Payment
          </div>
        </div>
      </div>
      <div className='order-summary my-6 mx-4'>
        <h3 className='text-2xl font-bold mb-8'>Order Summary</h3>
        <div className='flex justify-between mb-3 font-medium'>
          <span className='text-gray-600 inline-block'>
            Order Total (tax incl.)
          </span>
          <span className='inline-block'>&#8358;{total.toLocaleString()}</span>
        </div>
        <div className='flex justify-between mb-3 font-medium'>
          <span className='text-gray-600 inline-block'>Delivery Fee</span>
          {delPriceLoading ? (
            <span
              style={{
                borderRightWidth: '2px',
                borderLeftWidth: '2px',
                borderRightColor: 'white',
              }}
              className='animate-spin rounded-full inline-block w-6 h-6 border-purple-700'
            ></span>
          ) : deliveryPrice ? (
            <span className='inline-block'>
              &#8358;{deliveryPrice.toLocaleString()}
            </span>
          ) : (
            <span className='inline-block text-gray-400'>
              Select address first
            </span>
          )}
        </div>
      </div>
      <div className='delivery-summary my-6 mx-4'>
        <h3 className='text-2xl font-bold mb-8'>Delivery Summary</h3>
        <div>
          {delPriceLoading ? (
            <span
              style={{
                borderRightWidth: '2px',
                borderLeftWidth: '2px',
                borderRightColor: 'white',
              }}
              className='animate-spin rounded-full inline-block w-10 h-10 border-purple-700'
            ></span>
          ) : !deliveryPrice && !delPriceLoading ? (
            <div className='flex mb-3 items-center font-medium'>
              {' '}
              <svg
                width='50'
                height='50'
                viewBox='0 0 50 50'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  opacity='0.1'
                  width='50'
                  height='50'
                  rx='7'
                  fill='#8661FF'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M29.382 20L31.2243 23.6847L34 25.5352V29H32.8295C32.4176 27.8348 31.3064 27 30.0002 27C28.6939 27 27.5827 27.8348 27.1709 29H22.8293C22.4175 27.8348 21.3062 27 20 27C18.6938 27 17.5825 27.8348 17.1707 29H16V20H29.382ZM34 31H32.8295C32.4176 32.1652 31.3064 33 30.0002 33C28.6939 33 27.5827 32.1652 27.1709 31H22.8293C22.4175 32.1652 21.3062 33 20 33C18.6938 33 17.5825 32.1652 17.1707 31H16C14.8954 31 14 30.1046 14 29V20C14 18.8954 14.8954 18 16 18H29.382C30.1395 18 30.832 18.428 31.1708 19.1056L32.7757 22.3153L36 24.4648V29C36 30.1046 35.1046 31 34 31ZM20.9998 30C20.9998 30.5523 20.5521 31 19.9998 31C19.4476 31 18.9998 30.5523 18.9998 30C18.9998 29.4477 19.4476 29 19.9998 29C20.5521 29 20.9998 29.4477 20.9998 30ZM31 30C31 30.5523 30.5523 31 30 31C29.4477 31 29 30.5523 29 30C29 29.4477 29.4477 29 30 29C30.5523 29 31 29.4477 31 30Z'
                  fill='#8661FF'
                />
              </svg>
              <span className='inline-block ml-4 text-gray-400'>
                Select address first
              </span>
            </div>
          ) : (
            <div className='flex mb-3 font-medium'>
              <svg
                width='62'
                height='62'
                viewBox='0 0 62 62'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='62' height='62' rx='7' fill='#FFCB01' />
                <path
                  d='M16.6611 28L15.2695 29.8643H22.854C23.2375 29.8643 23.2327 30.0067 23.0453 30.2584C22.8549 30.5131 22.5364 30.9534 22.3423 31.2127C22.2438 31.3438 22.0659 31.5824 22.655 31.5824H25.7567L26.6759 30.3509C27.2459 29.588 26.7256 28.0009 24.6874 28.0009L16.6611 28Z'
                  fill='#D80613'
                />
                <path
                  d='M14.7051 34.0737L17.5007 30.3282H20.9697C21.3532 30.3282 21.3484 30.4716 21.1609 30.7224L20.4532 31.6729C20.3547 31.804 20.1768 32.0426 20.7659 32.0426H25.4123C25.0268 32.565 23.772 34.0737 21.5225 34.0737H14.7051ZM30.7137 32.0416L29.1978 34.0737H25.199L26.7149 32.0416H30.7137ZM36.8387 31.5814H27.0592L29.7334 28H33.7303L32.1981 30.0538H33.9818L35.5159 28H39.5128L36.8387 31.5814ZM36.4953 32.0416L34.9794 34.0737H30.9825L32.4984 32.0416H36.4953ZM9 32.8432H14.8897L14.5683 33.2741H9V32.8432ZM9 32.0416H15.4884L15.1661 32.4726H9V32.0416ZM9 33.6447H14.2919L13.9715 34.0737H9V33.6447ZM52.5585 33.2741H46.6899L47.0122 32.8432H52.5585V33.2741ZM52.5585 34.0737H46.094L46.4134 33.6447H52.5585V34.0737ZM47.6099 32.0416H52.5585V32.4735H47.2886L47.6099 32.0416ZM45.0486 28L42.3745 31.5814H38.1385L40.8145 28H45.0486ZM37.7961 32.0416C37.7961 32.0416 37.5043 32.4358 37.3618 32.6244C36.8607 33.2939 37.3035 34.0728 38.9419 34.0728H45.3614L46.8773 32.0416H37.7961Z'
                  fill='#D80613'
                />
              </svg>
              <div className='inline-block ml-4'>
                <div>Express Delivery with DHL</div>
                <div className='text-gray-400 font-normal text-sm'>
                  Estimated delivery to be determined
                </div>
                <div> &#8358;{deliveryPrice.toLocaleString()}</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className='border-t-2 w-full mt-8 flex pt-6 font-bold justify-between border-gray-200'>
        <span className=''>Total Fee</span>
        <div className='text-right'>
          {delPriceLoading ? (
            <span
              style={{
                borderRightWidth: '2px',
                borderLeftWidth: '2px',
                borderRightColor: 'white',
              }}
              className='animate-spin rounded-full inline-block w-6 h-6 border-purple-700'
            ></span>
          ) : (
            <span className='font-bold'>
              &#8358;{(deliveryPrice + total).toLocaleString()}
            </span>
          )}
          {!deliveryPrice && (
            <span className='block text-xs font-normal text-gray-400'>
              {delPriceLoading ? 'Loading...' : 'Delivery fee not included yet'}
            </span>
          )}
        </div>
      </footer>
    </div>
  );
};

export default memo(OrderDetails);
