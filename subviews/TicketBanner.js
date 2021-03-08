import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'svg';
import Button from 'components/Button';

const settings = {
  dots: true,
  infinite: true,
  slidesToScroll: 1,
  vertical: true,
  verticalSwiping: true,
  swipeToSlide: true,
  // autoplay: true,
  speed: 1000,
  autoplaySpeed: 3000,
  pauseOnHover: true,
};

const MainBanner = () => {
  return (
    <div id='ticket-banner' className='mx-20 flex flex-wrap md:mx-6 md:pt-20'>
      <div className='banner w-full md:h-48 md:my-8 md:w-full'>
        <Slider {...settings} className='relative'>
          <div className='h-96 md:h-48 relative w-full bg-yellow-500 rounded-2xl md:rounded-lg'>
            .
            <Image
              className='object-cover rounded-2xl md:rounded-lg'
              src='/images/image6.jpeg'
              layout='fill'
            />
            <div className='absolute h-96 md:h-48 bottom-0 p-16 pt-16 pr-32 md:p-6 md:pb-6 md:pt-6 md:pr-1 leading-2 text-overlay w-6/12 md:w-8/12 text-white bg-gradient-to-r from-black rounded-2xl md:rounded-lg'>
              <h2
                // style={{ lineHeight: '54px' }}
                className='text-4xl md:text-xl font-bold md:font-medium'
              >
                Rhema’s Beamer live-in concert tickets available now.
              </h2>
              <div className='mt-10 md:mt-2'></div>
              <Link href='/delivery'>
                <a className='leading-none'>
                  <Button
                    primary
                    roundedFull
                    icon={<ArrowRight color='white' scale={0.9} />}
                  >
                    <p className='font-medium pr-12 md:pr-0 text-lg md:text-base'>
                      See Tickets
                    </p>
                  </Button>
                </a>
              </Link>
            </div>
          </div>
          <div className='h-96 md:h-48 w-full bg-purple-500 rounded-2xl md:rounded-lg'>
            <div className='flex h-96 md:h-48 w-full items-center justify-center'>
              <h1 className='m-auto text-4xl text-white font-bold'>Banner 1</h1>
            </div>
          </div>
          <div className='h-96 md:h-48 w-full bg-blue-500 rounded-2xl md:rounded-lg'>
            <div className='flex h-96 md:h-48 w-full items-center justify-center'>
              <h1 className='m-auto text-4xl text-white font-bold'>Banner 2</h1>
            </div>
          </div>
          <div className='h-96 md:h-48 w-full bg-yellow-500 rounded-2xl md:rounded-lg'>
            <div className='flex h-96 md:h-48 w-full items-center justify-center'>
              <h1 className='m-auto text-4xl text-white font-bold'>Banner 3</h1>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default MainBanner;
