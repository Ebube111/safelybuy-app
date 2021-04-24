import { useContext, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { ContextUser } from 'context';
import { fetchUser } from 'actions/auth';
import { ArrowRight } from 'svg';
import Navigation from 'subviews/header';
import Button from 'components/Button';
import Footer from 'components/Footer';
import TicketCard from 'components/TicketCard';

const TicketItem = ({ type, price }) => (
  <div className='flex justify-between w-full border-b border-purple-100 py-6'>
    <div className='flex flex-col'>
      <span className='font-bold md:font-medium text-xl md:text-lg'>
        &#8358;{price.toLocaleString()}
      </span>
      <span className='text-gray-400 md:text-sm'>{type}</span>
    </div>
    <div className='w-24 flex md:m-0 justify-between items-center leading-none'>
      <span className='bg-purple-100 border py-1 text-purple-600 font-medium rounded-md px-2 border-puple-300'>
        -
      </span>
      <span className='font-bold'>0</span>
      <span className='bg-purple-100 border py-1 text-purple-600 font-medium rounded-md px-2 border-puple-300'>
        +
      </span>
    </div>
  </div>
);

export default function Home() {
  const router = useRouter();
  const [state, dispatch] = useContext(ContextUser);

  useEffect(() => {
    if (state.error) return;
    if (state.user.firstname) return;
    // fetchUser(dispatch);
  }, [dispatch, state.user.firstname]);
  return (
    <div>
      <Head>
        <title>Safelybuy - Tickets</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='relative pb-48 flex flex-col min-h-screen md:pb-80'>
        <Navigation
          noTagLine
          noSearch
          notification
        />
        {/* title  */}
        <div style={{ maxWidth: '1280px' }} className='container'>
          {/* <h1 className='text-center  my-8 mx-20 font-medium text-5xl tracking-wider md:mx-6 md:hidden'>
            <span className='uppercase font-bold'>Tickets</span> from{' '}
            <span className='font-bold'>Safelybuy</span>
            <sup className='inline-block text-base font-bold -top-6'>TM</sup>
          </h1> */}
          <div className='my-20 pt-24 mt-20 md:my-8 mx-20 md:mx-6 flex md:flex-wrap items-start'>
            <div className='relative w-7/12 mr-6 md:w-full md:mr-0'>
              <div
                onClick={() => router.back()}
                className='absolute top-6 left-16 md:left-6 pb-4 z-10 cursor-pointer text-white font-bold'
              >
                <span className='transform inline-block mr-2 rotate-180'>
                  <ArrowRight color='rgb(75, 85, 99)' scale={1} color='white' />
                </span>
              </div>
              <div className='relative h-96'>
                <Image
                  className='object-cover rounded-2xl'
                  src='/images/image6.jpeg'
                  layout='fill'
                />
                <div className='absolute bottom-0 p-16 pb-12 pt-24 md:p-6 md:pb-6 md:pt-6 text-overlay w-full text-white bg-gradient-to-t from-black rounded-2xl'>
                  <h2 className='text-4xl font-medium md:text-2xl'>
                    Rema’s Beamer live-in concert
                  </h2>
                  <small className='text-lg md:text-sm'>
                    23 Dec 2020, The Muson Center Lagos
                  </small>
                </div>
              </div>
              <div className='w-5/12 hidden md:block md:w-full ml-6 md:ml-0 shadow-2xl py-12 md:py-6 rounded-2xl px-12 md:my-10 md:px-6'>
                <h3 className='text-purple-500 font-bold text-xl'>
                  Ticket Prices
                </h3>
                <div className=''>
                  {[
                    { type: 'Table for 3 (three)', price: 45500 },
                    { type: 'Regular', price: 4500 },
                    { type: 'VIP', price: 55500 },
                    { type: 'VVIP', price: 75500 },
                    { type: 'Table for 20 (twenty)', price: 1000000 },
                  ].map((e) => (
                    <TicketItem
                      type={e.type}
                      key={Math.random()}
                      price={e.price}
                    />
                  ))}
                  <div className='pt-16'></div>
                  <Link href='/tickets/checkout'>
                    <a className='leading-none'>
                      <Button
                        secondary
                        roundedFull
                        full
                        icon={<ArrowRight color='white' scale={0.9} />}
                      >
                        <p className='font-medium text-lg pr-4'>
                          Proceed to Checkout
                        </p>
                      </Button>
                    </a>
                  </Link>
                </div>
              </div>

              <div className='mt-12'>
                <h3 className='text-purple-500 font-bold text-2xl'>
                  Event Description
                </h3>
                <p className='mt-3 text-gray-600'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi
                  ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore.
                </p>
                <h3 className='text-purple-500 mt-12 font-bold text-2xl'>
                  Date and Time
                </h3>
                <h5 className='text-lg mt-3 font-medium'>
                  12pm. 12 Sept, 2020
                </h5>
                <p className='bg-green-50 text-green-500 font-medium inline-block rounded-full px-5 my-2 py-1'>
                  Add to Calendar
                </p>
                <h3 className='text-purple-500 mt-12 font-bold text-2xl'>
                  Location
                </h3>
                <p className='mt-3 text-gray-600'>
                  11 Palms street, off Bayekuyuo, Palms Island.
                </p>
                <h5 className='mt-16 font-medium text-xl'>Share Event</h5>
                <div className='flex w-60 mt-3 justify-between'>
                  <svg
                    width='40'
                    height='40'
                    viewBox='0 0 40 40'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle
                      opacity='0.15'
                      cx='20'
                      cy='20'
                      r='20'
                      fill='#4AC959'
                    />
                    <path
                      d='M9.92969 29.7294L11.3223 24.6455C10.4632 23.1578 10.0114 21.4695 10.0119 19.7404C10.0145 14.3308 14.4166 9.92969 19.8267 9.92969C22.4522 9.93072 24.9158 10.9527 26.769 12.8069C28.6217 14.6616 29.6421 17.1263 29.641 19.7481C29.639 25.1578 25.2358 29.5594 19.8267 29.5594C19.8262 29.5594 19.8267 29.5594 19.8267 29.5594H19.8226C18.1803 29.5589 16.566 29.1469 15.1325 28.3648L9.92969 29.7294Z'
                      fill='white'
                    />
                    <path
                      d='M9.92816 29.9866C9.85992 29.9866 9.79376 29.9597 9.74465 29.9101C9.68003 29.8444 9.65471 29.7488 9.679 29.6604L11.0432 24.6793C10.1975 23.1772 9.75137 21.4713 9.7524 19.7396C9.75447 14.1868 14.2729 9.66992 19.8252 9.66992C22.5184 9.67096 25.0487 10.7198 26.9505 12.6231C28.8522 14.5269 29.899 17.0568 29.898 19.7468C29.8959 25.2991 25.377 29.8165 19.8252 29.8165C18.1767 29.816 16.5458 29.4092 15.0984 28.6395L9.99381 29.9778C9.9721 29.984 9.95039 29.9866 9.92816 29.9866Z'
                      fill='white'
                    />
                    <path
                      opacity='0.2'
                      d='M19.8263 9.92903C22.4517 9.93007 24.9154 10.952 26.7686 12.8062C28.6212 14.661 29.6416 17.1257 29.6406 19.7475C29.6385 25.1571 25.2354 29.5587 19.8263 29.5587H19.8221C18.1799 29.5582 16.5655 29.1462 15.1321 28.3641L9.92925 29.7288L11.3218 24.6448C10.4627 23.1571 10.0109 21.4689 10.0114 19.7397C10.014 14.3301 14.4162 9.92903 19.8263 9.92903ZM19.8263 9.41211C14.1318 9.41211 9.4971 14.0448 9.49451 19.7397C9.494 21.4802 9.93338 23.1954 10.7667 24.7136L9.43041 29.5928C9.38182 29.7712 9.43145 29.9614 9.56171 30.0927C9.65993 30.192 9.79278 30.2462 9.92925 30.2462C9.97318 30.2462 10.0171 30.2405 10.0605 30.2292L15.068 28.9162C16.5299 29.675 18.1685 30.0756 19.8221 30.0762C25.5207 30.0762 30.1555 25.443 30.158 19.748C30.1591 16.9882 29.0854 14.3932 27.1351 12.4413C25.1837 10.4889 22.5882 9.41314 19.8263 9.41211Z'
                      fill='#CFD8DC'
                    />
                    <path
                      d='M25.596 13.9772C24.0555 12.4358 22.008 11.5865 19.8287 11.5859C15.3293 11.5859 11.67 15.2437 11.668 19.7399C11.6675 21.2809 12.0986 22.781 12.9153 24.08L13.1097 24.3886L12.2852 27.3976L15.3728 26.5881L15.671 26.7649C16.923 27.5082 18.359 27.9011 19.823 27.9016H19.8261C24.3223 27.9016 27.9816 24.2433 27.9831 19.7466C27.9836 17.5678 27.1364 15.5187 25.596 13.9772Z'
                      fill='#40C351'
                    />
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M17.3724 15.6386C17.1889 15.2302 16.9955 15.2219 16.8203 15.2147C16.6771 15.2085 16.5138 15.209 16.3504 15.209C16.1871 15.209 15.9214 15.2705 15.6965 15.516C15.4716 15.7616 14.8379 16.3545 14.8379 17.561C14.8379 18.7675 15.7167 19.9337 15.8392 20.097C15.9617 20.2604 17.5357 22.8155 20.0283 23.7987C22.0996 24.6155 22.5215 24.4532 22.9712 24.4123C23.4209 24.3715 24.4222 23.8194 24.6264 23.2467C24.8306 22.6739 24.8306 22.1833 24.7696 22.081C24.708 21.9786 24.5447 21.9176 24.2997 21.7946C24.0546 21.6716 22.8487 21.0787 22.6238 20.997C22.3989 20.9153 22.2356 20.8745 22.0717 21.12C21.9084 21.365 21.4385 21.9176 21.2953 22.081C21.1521 22.2449 21.0089 22.2655 20.7639 22.1425C20.5189 22.0195 19.729 21.761 18.7918 20.9257C18.063 20.2759 17.5709 19.4731 17.4277 19.2276C17.2845 18.9825 17.4122 18.8497 17.5352 18.7272C17.6453 18.6171 17.7802 18.4408 17.9033 18.2976C18.0258 18.1544 18.0666 18.0521 18.1483 17.8887C18.2299 17.7249 18.1891 17.5817 18.1276 17.4592C18.0671 17.3361 17.5905 16.1234 17.3724 15.6386Z'
                      fill='white'
                    />
                  </svg>
                  <svg
                    width='38'
                    height='38'
                    viewBox='0 0 38 38'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle
                      opacity='0.15'
                      cx='19.1165'
                      cy='18.9993'
                      r='18.8235'
                      fill='#EB5757'
                    />
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M12.25 12.25H25.75C26.5784 12.25 27.25 12.9216 27.25 13.75V24.25C27.25 25.0784 26.5784 25.75 25.75 25.75H12.25C11.4216 25.75 10.75 25.0784 10.75 24.25V13.75C10.75 12.9216 11.4216 12.25 12.25 12.25ZM12.25 17.2135V24.2501H25.75V17.2139L19 20.5889L12.25 17.2135ZM12.25 15.5365L19 18.9118L25.75 15.5368V13.7501H12.25V15.5365Z'
                      fill='#EB5757'
                    />
                  </svg>
                  <svg
                    width='38'
                    height='38'
                    viewBox='0 0 38 38'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle
                      opacity='0.15'
                      cx='19.0579'
                      cy='18.9993'
                      r='18.8235'
                      fill='#C13584'
                    />
                    <path
                      d='M24.8007 28.8478L14.5065 28.8576C12.2418 28.8596 10.3874 27.0087 10.3848 24.744L10.375 14.4499C10.3729 12.1852 12.2238 10.3307 14.4885 10.3281L24.7826 10.3184C27.0473 10.3163 28.9018 12.1672 28.9044 14.4319L28.9142 24.726C28.9168 26.9912 27.0654 28.8457 24.8007 28.8478Z'
                      fill='url(#paint0_radial)'
                    />
                    <path
                      d='M24.8007 28.8478L14.5065 28.8576C12.2418 28.8596 10.3874 27.0087 10.3848 24.744L10.375 14.4499C10.3729 12.1852 12.2238 10.3307 14.4885 10.3281L24.7826 10.3184C27.0473 10.3163 28.9018 12.1672 28.9044 14.4319L28.9142 24.726C28.9168 26.9912 27.0654 28.8457 24.8007 28.8478Z'
                      fill='url(#paint1_radial)'
                    />
                    <path
                      d='M19.6459 23.1903C17.6597 23.1903 16.043 21.5741 16.043 19.5873C16.043 17.6006 17.6597 15.9844 19.6459 15.9844C21.6322 15.9844 23.2488 17.6006 23.2488 19.5873C23.2488 21.5741 21.6322 23.1903 19.6459 23.1903ZM19.6459 17.0138C18.2269 17.0138 17.0724 18.1683 17.0724 19.5873C17.0724 21.0064 18.2269 22.1608 19.6459 22.1608C21.065 22.1608 22.2194 21.0064 22.2194 19.5873C22.2194 18.1683 21.065 17.0138 19.6459 17.0138Z'
                      fill='white'
                    />
                    <path
                      d='M23.5064 16.4992C23.9328 16.4992 24.2785 16.1535 24.2785 15.7271C24.2785 15.3007 23.9328 14.9551 23.5064 14.9551C23.08 14.9551 22.7344 15.3007 22.7344 15.7271C22.7344 16.1535 23.08 16.4992 23.5064 16.4992Z'
                      fill='white'
                    />
                    <path
                      d='M22.7345 26.2788H16.558C14.5718 26.2788 12.9551 24.6627 12.9551 22.6759V16.4994C12.9551 14.5127 14.5718 12.8965 16.558 12.8965H22.7345C24.7207 12.8965 26.3374 14.5127 26.3374 16.4994V22.6759C26.3374 24.6627 24.7207 26.2788 22.7345 26.2788ZM16.558 13.9259C15.139 13.9259 13.9845 15.0804 13.9845 16.4994V22.6759C13.9845 24.0949 15.139 25.2494 16.558 25.2494H22.7345C24.1535 25.2494 25.308 24.0949 25.308 22.6759V16.4994C25.308 15.0804 24.1535 13.9259 22.7345 13.9259H16.558Z'
                      fill='white'
                    />
                    <defs>
                      <radialGradient
                        id='paint0_radial'
                        cx='0'
                        cy='0'
                        r='1'
                        gradientUnits='userSpaceOnUse'
                        gradientTransform='translate(17.2669 28.8709) scale(23.1098)'
                      >
                        <stop stopColor='#FFDD55' />
                        <stop offset='0.328' stopColor='#FF543F' />
                        <stop offset='0.348' stopColor='#FC5245' />
                        <stop offset='0.504' stopColor='#E64771' />
                        <stop offset='0.643' stopColor='#D53E91' />
                        <stop offset='0.761' stopColor='#CC39A4' />
                        <stop offset='0.841' stopColor='#C837AB' />
                      </radialGradient>
                      <radialGradient
                        id='paint1_radial'
                        cx='0'
                        cy='0'
                        r='1'
                        gradientUnits='userSpaceOnUse'
                        gradientTransform='translate(13.3582 10.0869) scale(15.3449 10.2243)'
                      >
                        <stop stopColor='#4168C9' />
                        <stop
                          offset='0.999'
                          stopColor='#4168C9'
                          stopOpacity='0'
                        />
                      </radialGradient>
                    </defs>
                  </svg>
                  <svg
                    width='38'
                    height='38'
                    viewBox='0 0 38 38'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle
                      opacity='0.2'
                      cx='18.9993'
                      cy='18.9993'
                      r='18.8235'
                      fill='#00ACEE'
                    />
                    <path
                      d='M26.4766 14.8704C26.4885 15.0505 26.4885 15.2307 26.4885 15.4108C26.4885 20.9053 22.6068 27.2362 15.5121 27.2362C13.3263 27.2362 11.2959 26.5542 9.58789 25.3704C9.89844 25.409 10.197 25.4219 10.5195 25.4219C12.323 25.4219 13.9832 24.7656 15.309 23.6462C13.613 23.6075 12.1917 22.4109 11.7019 20.7638C11.9408 20.8024 12.1797 20.8281 12.4305 20.8281C12.7769 20.8281 13.1233 20.7766 13.4458 20.6866C11.6781 20.3005 10.3523 18.6278 10.3523 16.6075V16.5561C10.8658 16.8649 11.4631 17.0579 12.0961 17.0836C11.0569 16.3373 10.3762 15.0634 10.3762 13.6222C10.3762 12.8502 10.5672 12.1424 10.9017 11.5248C12.8008 14.0469 15.6554 15.6939 18.8563 15.8741C18.7966 15.5652 18.7608 15.2436 18.7608 14.9219C18.7608 12.6314 20.4807 10.7656 22.6186 10.7656C23.7294 10.7656 24.7327 11.2675 25.4374 12.0781C26.3093 11.898 27.1454 11.5505 27.8859 11.0745C27.5992 12.0395 26.9901 12.8502 26.1899 13.3649C26.9662 13.2748 27.7187 13.0432 28.4114 12.7215C27.886 13.545 27.229 14.2784 26.4766 14.8704Z'
                      fill='#00ACEE'
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className='w-5/12 md:hidden md:w-full ml-6 md:ml-0 shadow-2xl py-12 md:py-6 rounded-2xl px-12 md:my-10 md:px-6'>
              <h3 className='text-purple-500 font-bold text-2xl'>
                Ticket Prices
              </h3>
              <div className=''>
                {[
                  { type: 'Table for 3 (three)', price: 45500 },
                  { type: 'Regular', price: 4500 },
                  { type: 'VIP', price: 55500 },
                  { type: 'VVIP', price: 75500 },
                  { type: 'Table for 20 (twenty)', price: 1000000 },
                ].map((e) => (
                  <TicketItem
                    type={e.type}
                    key={Math.random()}
                    price={e.price}
                  />
                ))}
                <div className='pt-16'></div>
                <Link href='/tickets/checkout'>
                  <a className='leading-none'>
                    <Button
                      secondary
                      roundedFull
                      full
                      icon={<ArrowRight color='white' scale={0.9} />}
                    >
                      <p className='font-medium text-lg pr-4'>
                        Proceed to Checkout
                      </p>
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          {/* section tabs  */}
          <div className='my-20 md:my-8 mx-20 md:mx-6'>
            <h2 className='text-4xl font-bold md:text-2xl'>
              More in this category
            </h2>
            <div className='flex mt-12 -ml-12 md:-ml-4 flex-wrap'>
              {[
                {
                  text: 'Fireboy’s Apollo live-in concert',
                  venue: 'The Muson Center Lagos',
                  month: 'Sept',
                  date: '29',
                },
                {
                  text: 'Fireboy’s Apollo live-in concert',
                  venue: 'The Muson Center Lagos',
                  month: 'Sept',
                  date: '29',
                },
                {
                  text: 'Fireboy’s Apollo live-in concert',
                  venue: 'The Muson Center Lagos',
                  month: 'Sept',
                  date: '29',
                },
              ].map((e) => (
                <TicketCard
                  key={Math.random()}
                  text={e.text}
                  venue={e.venue}
                  month={e.month}
                  date={e.date}
                />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
