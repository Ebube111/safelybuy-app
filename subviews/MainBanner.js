import React from 'react';
import Slider from 'react-slick';
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

const MainBanner = () => {
  return (
    <div id='main-banner' className='mx-20 flex flex-wrap md:mx-6'>
      <div className='banner h-96 md:h-48 w-7/12 md:my-8 md:w-full'>
        <Slider {...settings}>
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
          <div className='flex h-96 md:h-48 w-full bg-green-500 rounded-2xl md:rounded-lg'>
            <div className='flex h-96 md:h-48 w-full items-center justify-center'>
              <h1 className='m-auto text-4xl text-white font-bold'>Banner 4</h1>
            </div>
          </div>
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
