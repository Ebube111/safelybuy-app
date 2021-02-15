import Link from 'next/link';
import React from 'react';
import Button from './Button';

export default function SpotlightCard({
  svg,
  text,
  tag,
  tagText,
  small,
  link,
}) {
  return (
    <div className='rounded-lg m-4 w-44 md:w-24 p-4 bg-white z-10 items-center flex flex-col bg-opacity-50 md:mx-2 md:mt-6 md:p-3 md:m-1'>
      <div className='relative rounded p-4 bg-white mb-4 w-max flex justify-center md:mb-2 md:p-1'>
        {tag && (
          <div
            className='absolute rounded-lg text-xs text-white bg-red-500 -top-2.5 -right-2.5 py-1 px-2 md:py-px md:px-1 z-20'
            style={{ [small && 'fontSize']: '7px' }}
          >
            {tagText}
          </div>
        )}
        {svg}
      </div>
      <Link href={`/${link}`}>
        <a>
          <Button xSmall={small} full text={text} alternate roundedLg />
        </a>
      </Link>
    </div>
  );
}
