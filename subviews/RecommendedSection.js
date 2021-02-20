import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import {
  AngleRight,
} from '../svg';

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 6,
  autoplay: true,
  slidesToScroll: 3,
  swipeToSlide: true,
  speed: 2000,
  autoplaySpeed: 3000,
  cssEase: 'linear',
  pauseOnHover: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        nextArrow: null,
        prevArrow: null,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: null,
        prevArrow: null,
      },
    },
  ],
};

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={
        className + ' bg-purple-100 justify-center items-center rounded-sm'
      }
      style={{ ...style, display: 'flex' }}
      onClick={onClick}
    >
      <AngleRight
        scale={1}
        className='align-baseline inline-block'
        color='#8661FF'
      />
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={
        className + ' bg-purple-100 justify-center items-center rounded-sm'
      }
      style={{ ...style, display: 'flex' }}
      onClick={onClick}
    >
      <AngleRight
        scale={1}
        className='align-baseline transform rotate-180 inline-block'
        color='#8661FF'
      />
    </div>
  );
}

const RecommendedSection = () => {
  return (
    <div className='mx-20 mb-10 md:mx-1'>
      <h3 className='text-2xl mb-8 font-bold md:mx-6'>Recommended Picks</h3>
      <div className='recommended-carousels mx-10 md:mx-0'>
        <Slider {...settings}>
          {[
            { src: '/images/airpod.png', name: 'Airpods' },
            { src: '/images/android.png', name: 'Phones' },
            { src: '/images/iwatch.png', name: 'Apple Watches' },
            { src: '/images/iphone11.png', name: 'Apple Phones' },
            { src: '/images/ps5.png', name: 'PlayStations' },
            { src: '/images/xbox.png', name: 'X-boxes' },
            { src: '/images/samsung.png', name: 'Samsung Phones' },
            { src: '/images/laptop.png', name: 'Laptops' },
            { src: '/images/iphone.png', name: 'iPhones' },
          ].map((e) => (
            <div key={Math.random()} className='h-48 md:h-24'>
              <div className='h-40 md:h-20 m-auto relative w-36 md:w-24 rounded-lg bg-gray-100'>
                <Image
                  className='rounded-lg object-cover'
                  src={e.src}
                  layout='fill'
                />
              </div>
              <p className='font-medium md:font-normal mt-2 md:mt-1 text-center md:text-xs'>
                {e.name}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default RecommendedSection;
