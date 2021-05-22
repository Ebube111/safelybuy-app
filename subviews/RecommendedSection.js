import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { AngleRight } from '../svg';
import Link from 'next/link';

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 6,
  autoplay: true,
  slidesToScroll: 2,
  swipeToSlide: true,
  speed: 2000,
  autoplaySpeed: 3000,
  arrows: false,
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

const RecommendedSection = ({ recommended }) => {
  return (
    <div className='recommended-carousels mx-10 md:mx-0'>
      <Slider {...settings}>
        {recommended.map((e) => (
          <Link
            key={Math.random()}
            href={'/shopping/products?search=' + e.query_string}
          >
            <div className='cursor-pointer h-48 md:h-24'>
              <div className='h-40 md:h-20 m-auto relative w-36 md:w-24 rounded-lg'>
                <Image
                  className='rounded-lg object-cover'
                  src={e.image_url || '/img/no-image.png'}
                  layout='fill'
                />
              </div>
              <p className='font-medium md:font-normal mt-2 md:mt-1 text-center md:text-xs'>
                {e.name}
              </p>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default RecommendedSection;
