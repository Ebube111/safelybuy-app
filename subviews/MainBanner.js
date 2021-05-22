import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import TitleTab from '../components/TitleTab';

const settings = {
  dots: true,
  infinite: true,
  slidesToScroll: 1,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 3000,
  pauseOnHover: true,
};

const MainBanner = ({ main }) => {
  return (
    <div id='main-banner' className='mx-20 flex flex-wrap md:mx-6 md:pt-32'>
      <div className='banner h-96 md:h-48 w-7/12 md:my-8 md:w-full'>
        <Slider {...settings}>
          {main.map((e) => (
            <div
              key={Math.random()}
              className='h-96 relative md:h-48 w-full bg-purple-500 rounded-2xl md:rounded-lg'
            >
              <Image
                className='rounded-2xl md:rounded-lg object-cover'
                src={e.image}
                layout='fill'
              />
              {/* <h1
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                className='absolute m-auto text-4xl text-white font-bold'
              >
                {e.text}
              </h1> */}
            </div>
          ))}
        </Slider>
      </div>
      <div className='categories mt-16 md:h-auto flex flex-col justify-between w-5/12 md:w-full px-6'>
        <div className='flex justify-around'>
          <TitleTab
            text='Apple Phones'
            color='gray'
            colorShade='900'
            img='/images/iphone.png'
          />
          <TitleTab
            text='Samsung Phones'
            color='blue'
            colorShade='400'
            img='/images/samsung.png'
          />
        </div>
        <div className='flex justify-around'>
          <TitleTab
            text='Laptops'
            color='orange'
            colorShade='400'
            img='/images/laptop.png'
          />
          <TitleTab
            text='Game Consoles'
            color='green'
            colorShade='500'
            img='/images/game-connsole.png'
          />
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
