import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  AngleRight,
} from '../svg';

const TitleTab = ({ text, color, colorShade, img }) => {
  const router = useRouter();
  const bgColor = `bg-gradient-to-tr from-${color}-${colorShade} to-${color}-${
    colorShade - 200
  }`;
  return (
    <div
      onClick={() => {
        router.push({
          pathname: '/shopping/products',
          query: { category: text.toLowerCase().replace(' ', '-') },
        });
      }}
      className={`${bgColor} relative cursor-pointer px-4 h-28 w-48 md:w-36 shadow-2xl rounded-3xl md:rounded-lg md:mx-3 md:my-10`}
    >
      <div
        className={`rounded-2xl md:rounded-lg bg-${color}-100 h-32 md:h-28 w-40 md:w-28 transform -translate-y-1/2`}
      >
        <Image
          className='rounded-2xl object-cover'
          src={img}
          alt={text}
          layout='fill'
        />
      </div>
      <h3
        style={{ width: 'calc(100% - 32px)' }}
        className='absolute bottom-2 flex items-center justify-between text-white font-medium'
      >
        <span className='md:text-sm'>{text}</span>
        <AngleRight color='white' scale={1.5} />
      </h3>
    </div>
  );
};

export default TitleTab;
