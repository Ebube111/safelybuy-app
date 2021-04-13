import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import CartContext from 'context/Shopping';
import Navigation from 'subviews/header';
import Footer from 'components/Footer';
import Product from 'components/Product';
import Back from 'components/Back';
import { shoppingItems } from 'data';
import { Facebook, Twitter } from 'svg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Head from 'next/head';
import Button from 'components/Button';
import Comment from 'components/Comment';
import SellerDetail from 'components/SellerDetail';

const ProductDetail = ({}) => {
  const [favourite, setFavourite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const [, addItem] = useContext(CartContext);
  const { id } = router.query;

  const [product] = shoppingItems.filter((e) => e.id === id);

  if (!product) return null;
  const { title, main_image, price, rating_sum } = product;

  return (
    <div>
      <Head>
        <title>Safelybuy - Shopping</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='relative pb-48 flex flex-col min-h-screen md:pb-72'>
        <Navigation />
        <div style={{ maxWidth: 1280 }} className='container'>
          <div className='pt-32 my-8 mx-20 md:mx-6'>
            <Back />
            <div className='flex w-full md:flex-wrap'>
              <div className='w-1/2 mr-6 md:mr-0 flex md:w-full'>
                <div className='relative h-96 md:h-80 w-9/12 md:w-full'>
                  <Image
                    className='rounded-lg object-cover'
                    src={main_image || '/image/yusuf.png'}
                    layout='fill'
                  />
                  <svg
                    className='absolute cursor-pointer top-6 right-6'
                    onClick={() => setFavourite(!favourite)}
                    width='40'
                    height='40'
                    viewBox='0 0 40 40'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect width='40' height='40' rx='4' fill='white' />
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M20.9195 12.2467C21.811 11.8104 22.5886 11.6667 23.795 11.6667C26.8823 11.6795 29.1673 14.2832 29.1673 17.5999C29.1673 20.1315 27.7558 22.5769 25.1266 24.9416C23.7466 26.1828 21.9845 27.4111 20.7226 28.0646L20.0007 28.4384L19.2787 28.0646C18.0168 27.4111 16.2547 26.1828 14.8747 24.9416C12.2455 22.5769 10.834 20.1315 10.834 17.5999C10.834 14.2477 13.0977 11.6667 16.2128 11.6667C17.3759 11.6667 18.1934 11.824 19.1022 12.2735C19.4185 12.4299 19.7158 12.6156 19.9923 12.8298C20.2799 12.6028 20.5895 12.4083 20.9195 12.2467Z'
                      fill={`${favourite ? 'red' : 'white'}`}
                      stroke='red'
                    />
                  </svg>
                </div>
                <div className='flex w-3/12 md:hidden flex-col h-96 overflow-auto ml-4'>
                  <div className='flex w-20 m-auto justify-between items-center leading-none'>
                    <span className='bg-purple-100 border py-1 text-purple-600 font-medium rounded-md px-2 border-puple-300'>
                      &lt;
                    </span>
                    <span className='bg-purple-100 border py-1 text-purple-600 font-medium rounded-md px-2 border-puple-300'>
                      &gt;
                    </span>
                  </div>
                  <div className='flex-auto mt-1 mx-6'>
                    <div className='w-full my-2 aspect-w-1 aspect-h-1 h-8 bg-gray-200 rounded-lg'></div>
                    <div className='w-full my-2 aspect-w-1 aspect-h-1 h-8 bg-gray-200 rounded-lg'></div>
                    <div className='w-full my-2 aspect-w-1 aspect-h-1 h-8 bg-gray-200 rounded-lg'></div>
                    <div className='w-full my-2 aspect-w-1 aspect-h-1 h-8 bg-gray-200 rounded-lg'></div>
                  </div>
                </div>
              </div>
              <div className='w-1/2 ml-6 md:mt-6 md:ml-2 md:w-full'>
                <p className='font-medium text-gray-400'>
                  {title.split(' ')[0]}
                </p>
                <h1 className='font-bold text-4xl md:text-2xl'>{title}</h1>
                <span className='inline-flex items-center text-gray-500'>
                  {new Array(Number(parseInt(rating_sum)))
                    .fill('star')
                    .map((e) => (
                      <svg
                        key={Math.random()}
                        width='16'
                        height='16'
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
                        width='16'
                        height='16'
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
                    ))}{' '}
                  <span className='inline-block ml-3'>
                    {rating_sum} ({parseInt(Math.random() * 200)} reviews)
                  </span>
                </span>
                <div className='font-medium pt-2'>Variation: White </div>
                <div className='text-3xl mt-3 md:mt-1 mb-6 md:mb-3 font-bold text-purple-500 md:text-lg'>
                  &#8358;{price.toLocaleString()}
                </div>
                <div className='flex flex-col items-start'>
                  <div className='flex mb-12 md:mb-6 items-end flex-wrap md:w-full'>
                    <div className='flex-col w-24'>
                      <span className='font-medium mb-2 inline-block'>
                        Quantity
                      </span>
                      <div className='flex justify-between items-center leading-none'>
                        <span
                          onClick={() => {
                            if (quantity > 1) setQuantity(quantity - 1);
                          }}
                          className='bg-purple-100 cursor-pointer border py-1 text-purple-600 font-medium rounded-md px-2 border-puple-300'
                        >
                          -
                        </span>
                        <span className='font-bold'>{quantity}</span>
                        <span
                          onClick={() => setQuantity(quantity + 1)}
                          className='bg-purple-100 cursor-pointer border py-1 text-purple-600 font-medium rounded-md px-2 border-puple-300'
                        >
                          +
                        </span>
                      </div>
                    </div>
                    <div
                      onClick={() => addItem(product, quantity)}
                      className='w-48 ml-8 md:w-full md:m-auto md:mt-4'
                    >
                      <Button
                        full
                        primary
                        roundedLg
                        icon={
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
                              d='M3.04815 1.66836C2.92975 1.66811 2.81561 1.68151 2.70716 1.70698C2.55848 1.37929 2.36209 1.0853 2.13872 0.861929C1.75961 0.482814 1.16169 0.333334 0.333984 0.333334V1.66667C0.839616 1.66667 1.13058 1.73941 1.19591 1.80474C1.44789 2.05672 1.66732 2.56871 1.66732 3L1.67402 3.09428L2.32726 7.66701C1.23422 7.72372 0.387449 8.57255 0.334803 9.63363L0.333984 10.3333C0.398532 11.4293 1.24249 12.2724 2.29614 12.3323L2.44749 12.3325C2.72181 13.1097 3.46286 13.6667 4.33398 13.6667C5.2048 13.6667 5.94562 13.1101 6.22018 12.3333H7.78112C8.05568 13.1101 8.7965 13.6667 9.66732 13.6667C10.7719 13.6667 11.6673 12.7712 11.6673 11.6667C11.6673 10.5621 10.7719 9.66667 9.66732 9.66667C8.7965 9.66667 8.05568 10.2232 7.78112 11H6.22018C5.94562 10.2232 5.2048 9.66667 4.33398 9.66667C3.46317 9.66667 2.72235 10.2232 2.44779 11H2.33398C1.99399 10.9796 1.68901 10.6749 1.66612 10.2934L1.66732 9.66667C1.68529 9.32088 1.98819 9.01798 2.36702 8.99918L3.68311 8.99951L3.69265 9H10.4119L10.5103 8.96878C11.0158 8.80838 11.4204 8.42775 11.612 7.93502L11.6822 7.79601L11.9104 7.34392C12.1465 6.87595 12.3826 6.40717 12.6126 5.9492C13.1761 4.82738 13.5305 4.11444 13.609 3.93937C14.012 3.0403 13.1956 2.34831 12.3611 2.33357L3.04815 1.66836ZM10.1803 7.66667H3.74257C3.69976 7.65477 3.66714 7.61851 3.66075 7.57335L3.00749 3.00049L12.2629 3.66328C12.101 3.99355 11.8066 4.58344 11.4212 5.35073L11.4115 5.36995C11.1915 5.80791 10.9557 6.27604 10.72 6.74338L10.4921 7.1949L10.4057 7.36589L10.3732 7.44148C10.3383 7.5385 10.2692 7.61824 10.1803 7.66667ZM9.66732 12.3333C10.0355 12.3333 10.334 12.0349 10.334 11.6667C10.334 11.2985 10.0355 11 9.66732 11C9.29913 11 9.00065 11.2985 9.00065 11.6667C9.00065 12.0349 9.29913 12.3333 9.66732 12.3333ZM5.00065 11.6667C5.00065 12.0349 4.70217 12.3333 4.33398 12.3333C3.96579 12.3333 3.66732 12.0349 3.66732 11.6667C3.66732 11.2985 3.96579 11 4.33398 11C4.70217 11 5.00065 11.2985 5.00065 11.6667Z'
                              fill='white'
                            />
                          </svg>
                        }
                      >
                        <span className='font-medium'>Add to cart</span>
                      </Button>
                    </div>
                  </div>
                  <div className='flex items-end flex-wrap md:w-full'>
                    <div className='flex-col w-24'>
                      <span className='font-medium text-gray-500 mb-2 inline-block'>
                        Share Product
                      </span>
                      <div className='flex justify-between items-center leading-none'>
                        {<Facebook />}
                        {<Twitter />}
                      </div>
                    </div>
                    <div className='flex w-48 ml-8 md:w-full md:m-auto md:mt-4'>
                      <Button full secondary roundedLg>
                        <span className='font-medium'>Message Seller</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className='mt-10'>
                  <Tabs>
                    <TabList>
                      <Tab>Specifications</Tab>
                      <Tab>Reviews</Tab>
                      <Tab>Seller Details</Tab>
                    </TabList>

                    <TabPanel>
                      <div className='flex'>
                        <svg
                          width='25'
                          height='25'
                          viewBox='0 0 25 25'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                          className='inline-block mr-2 mt-4'
                        >
                          <circle
                            opacity='0.15'
                            cx='12.5'
                            cy='12.5'
                            r='12.5'
                            fill='#F2994A'
                          />
                          <path
                            d='M12.461 6.81314C11.6824 6.8129 10.9164 7.00541 10.2332 7.37296C9.55 7.74052 8.97164 8.27131 8.55131 8.91652C8.13098 9.56174 7.88217 10.3007 7.82776 11.0653C7.77335 11.83 7.91509 12.5959 8.23995 13.2925V16.7545C8.24024 16.9668 8.2956 17.1755 8.40077 17.3609C8.50594 17.5462 8.65745 17.7021 8.84092 17.8136C9.0244 17.9252 9.23377 17.9888 9.44919 17.9983C9.66461 18.0079 9.87894 17.9632 10.0719 17.8683L10.1985 17.806C10.2529 17.7819 10.3119 17.7694 10.3716 17.7694C10.4312 17.7694 10.4902 17.7819 10.5446 17.806L11.9924 18.3754C12.1424 18.4291 12.3014 18.4545 12.461 18.4502C12.6226 18.4498 12.7829 18.4202 12.9337 18.3629L14.3773 17.7935C14.4317 17.7694 14.4907 17.757 14.5504 17.757C14.61 17.757 14.669 17.7694 14.7234 17.7935L14.8501 17.8558C15.042 17.9502 15.2552 17.995 15.4696 17.986C15.684 17.9771 15.8925 17.9146 16.0757 17.8045C16.2588 17.6944 16.4105 17.5403 16.5166 17.3566C16.6226 17.1729 16.6796 16.9657 16.682 16.7545V13.2925C17.0068 12.5959 17.1486 11.83 17.0942 11.0653C17.0398 10.3007 16.7909 9.56174 16.3706 8.91652C15.9503 8.27131 15.3719 7.74052 14.6887 7.37296C14.0056 7.00541 13.2395 6.8129 12.461 6.81314ZM12.461 7.64436C13.3581 7.63875 14.2283 7.94597 14.9175 8.5116C15.6066 9.07722 16.0702 9.86474 16.2262 10.7347C16.3821 11.6046 16.2203 12.5008 15.7694 13.2645C15.3185 14.0282 14.6077 14.6102 13.7628 14.9073C12.9179 15.2044 11.9934 15.1975 11.1532 14.8878C10.313 14.5781 9.61116 13.9856 9.17211 13.2152C8.73306 12.4448 8.58509 11.5463 8.75441 10.6788C8.92373 9.81133 9.39941 9.03083 10.0972 8.47557C10.7655 7.94075 11.5997 7.64741 12.461 7.64436ZM15.8378 16.7545C15.8376 16.8253 15.819 16.8949 15.7837 16.9567C15.7485 17.0185 15.6978 17.0704 15.6365 17.1074C15.5752 17.1445 15.5052 17.1655 15.4333 17.1685C15.3615 17.1714 15.29 17.1563 15.2257 17.1244L15.0991 17.062C14.9389 16.9832 14.7634 16.9387 14.5844 16.9315C14.4055 16.9244 14.2269 16.9547 14.0607 17.0205L12.6171 17.5899C12.5169 17.6292 12.4051 17.6292 12.3048 17.5899L10.8612 17.0205C10.7107 16.9614 10.5504 16.9304 10.3884 16.929C10.192 16.9296 9.99834 16.9751 9.82283 17.062L9.6962 17.1244C9.63194 17.1563 9.56047 17.1714 9.48858 17.1685C9.41669 17.1655 9.34677 17.1445 9.28544 17.1074C9.22412 17.0704 9.17344 17.0185 9.13821 16.9567C9.10298 16.8949 9.08437 16.8253 9.08415 16.7545V14.5227C9.51817 14.9755 10.0416 15.3363 10.6222 15.5828C11.2029 15.8294 11.8286 15.9566 12.461 15.9566C13.0933 15.9566 13.719 15.8294 14.2997 15.5828C14.8804 15.3363 15.4038 14.9755 15.8378 14.5227V16.7545Z'
                            fill='#F2994A'
                          />
                          <path
                            d='M10.8778 12.054L10.6456 12.7937C10.5941 12.9602 10.5969 13.1384 10.6537 13.3032C10.7105 13.468 10.8184 13.611 10.9622 13.7122C11.0983 13.8084 11.2625 13.8584 11.43 13.8546C11.5975 13.8509 11.7593 13.7936 11.8908 13.6915L12.4606 13.2759L13.0305 13.6915C13.1683 13.7963 13.3375 13.8533 13.5117 13.8535C13.672 13.8528 13.8282 13.8035 13.9591 13.7122C14.1029 13.611 14.2108 13.468 14.2676 13.3032C14.3244 13.1384 14.3272 12.9602 14.2757 12.7937L14.0351 12.0581L14.6809 11.5552C14.8158 11.4476 14.9136 11.3017 14.9612 11.1373C15.0088 10.973 15.0038 10.7982 14.9468 10.6367C14.8932 10.4811 14.7916 10.3457 14.6562 10.2496C14.5207 10.1535 14.3582 10.1014 14.1913 10.1006H13.4484L13.2247 9.39823C13.2134 9.35399 13.1949 9.31186 13.1698 9.27355C13.1061 9.1415 13.0056 9.02995 12.8801 8.95184C12.7546 8.87373 12.6091 8.83228 12.4606 8.83228C12.3122 8.83228 12.1667 8.87373 12.0412 8.95184C11.9157 9.02995 11.8152 9.1415 11.7515 9.27355C11.7264 9.31186 11.7079 9.35399 11.6966 9.39823L11.4729 10.1006H10.73C10.5631 10.1014 10.4006 10.1535 10.2651 10.2496C10.1297 10.3457 10.0281 10.4811 9.97447 10.6367C9.91752 10.7982 9.91249 10.973 9.96008 11.1373C10.0077 11.3017 10.1055 11.4476 10.2404 11.5552L10.8778 12.054ZM11.5067 10.9318C11.6788 10.9308 11.846 10.8753 11.9835 10.7735C12.1211 10.6717 12.2218 10.529 12.2707 10.3666L12.4606 9.77643L12.6506 10.3666C12.6995 10.529 12.8002 10.6717 12.9378 10.7735C13.0753 10.8753 13.2425 10.9308 13.4146 10.9318H14.1195L13.5117 11.4098C13.382 11.5139 13.2866 11.6537 13.2378 11.8113C13.1889 11.9689 13.1888 12.1373 13.2373 12.295L13.461 12.9683L12.9418 12.5735C12.803 12.471 12.6342 12.4155 12.4606 12.4155C12.2871 12.4155 12.1183 12.471 11.9795 12.5735L11.4772 12.9558L11.684 12.295C11.7325 12.1373 11.7324 11.9689 11.6835 11.8113C11.6347 11.6537 11.5393 11.5139 11.4096 11.4098L10.8018 10.9318H11.5067Z'
                            fill='#F2994A'
                          />
                        </svg>
                        <div className=''>
                          <div className=''>
                            <h2 className='font-medium text-xl pt-3'>
                              Key Features
                            </h2>
                            <ul className='list-disc pl-4 text-gray-700 pt-1 pb-6 border-b border-gray-200'>
                              <li>Memory: (4GB ROM, 128GB RAM)</li>
                              <li>
                                Display: 6.5 Inches Super Retina OLED capacitive
                                touchscreen, 16M colors
                              </li>
                              <li>Camera: 7MP (selfie), 12MP (rear)</li>
                              <li>OS: iOS 12, upgradable to iOS 13.6.1</li>
                              <li>Chipset: Apple A12 Bionic (7 nm)</li>
                              <li>Face Unlock</li>
                            </ul>
                          </div>
                          <div className=''>
                            <h2 className='font-medium text-xl pt-3'>Camera</h2>
                            <ul className='list-disc pl-4 text-gray-700 pt-1 pb-6 border-b border-gray-200'>
                              <li>Memory: (4GB ROM, 128GB RAM)</li>
                              <li>Camera: 7MP (selfie), 12MP (rear)</li>
                              <li>OS: iOS 12, upgradable to iOS 13.6.1</li>
                              <li>Face Unlock</li>
                            </ul>
                          </div>
                          <div className=''>
                            <h2 className='font-medium text-xl pt-3'>
                              Display
                            </h2>
                            <ul className='list-disc pl-4 text-gray-700 pt-1 pb-6'>
                              <li>Lorem ipsum dolor sit amet.</li>
                              <li>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing.
                              </li>
                              <li>Lorem ipsum dolor sit amet consectetur.</li>
                              <li>Face Unlock</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel>
                      {[
                        {
                          rating: 4,
                          title: 'Awesome Phone',
                          body:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
                          date: Date.now(),
                          name: 'Jessica Jones',
                        },
                        {
                          rating: 2,
                          title: 'Awesome Phone',
                          body:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
                          date: Date.now(),
                          name: 'Jessica Jones',
                        },
                        {
                          rating: 3,
                          title: 'Awesome Phone',
                          body:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
                          date: Date.now(),
                          name: 'Jessica Jones',
                        },
                      ].map((e) => (
                        <Comment
                          key={Math.random()}
                          rating={e.rating}
                          title={e.title}
                          date={e.date}
                          body={e.body}
                          name={e.name}
                        />
                      ))}
                    </TabPanel>
                    <TabPanel>
                      <SellerDetail
                        name='Chesco Phones LTD'
                        image='/images/seller.jpeg'
                        percentReview={86}
                      />
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
            <div className='mb-10 md:mt-8'>
              <h2 className='text-3xl md:text-2xl mb-8 font-bold'>
                <Link href='/shopping/products'>
                  <a>More Like This</a>
                </Link>
              </h2>
              <div className='flex flex-wrap justify-between md:justify-around'>
                {[
                  {
                    src: '/images/samsung-tab.png',
                    name: 'Samsung Galaxy Tab A 10.1',
                    rating: 3.5,
                    price: 63000,
                  },
                  {
                    src: '/images/iPad.png',
                    name: 'Apple iPad Air 2 - 128GB - Cellular + Wifi Gray',
                    rating: 4.7,
                    price: 187000,
                  },
                  {
                    src: '/images/iphone-x.png',
                    name: 'iPhone XMax - 128GB',
                    rating: 4.5,
                    price: 350000,
                  },
                  {
                    src: '/images/airpod2.png',
                    name: 'Apple Earpod 5.0',
                    rating: 4.5,
                    price: 119000,
                  },
                  {
                    src: '/images/android2.png',
                    name: 'Xaomi Pocophone f1 - 8GB RAM 128GB ROM',
                    rating: 3.8,
                    price: 129000,
                  },
                ].map((e) => (
                  <Product
                    key={Math.random()}
                    img={e.src}
                    title={e.name}
                    rating={e.rating}
                    price={e.price}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ProductDetail;
