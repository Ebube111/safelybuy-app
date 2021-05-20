import React from 'react';
import Image from 'next/image';
import Button from './Button';
import { AppleDownload, Facebook, Instagram, Twitter } from '../svg';
import Container from './Container';

export default function Footer({ admin }) {
  return (
    <footer className='bg-gray-100 border-t border-gray-200 py-8 w-full z-10 absolute bottom-0'>
      <Container>
        <div className='flex flex-wrap items-center'>
          <div className='flex w-5/12 lg:w-6/12 md:w-full justify-start md:justify-center md:transform md:scale-75 md:pb-4'>
            <Image
              src='/images/googleplay.png'
              alt='googleplay'
              height='79'
              width='202'
              style={{ height: '79px' }}
            />
            <div className='p-3'>{<AppleDownload />}</div>
          </div>
          <div className='flex flex-col items-start text-left w-5/12 lg:w-3/12 md:w-full md:items-center md:text-center'>
            {!admin && (
              <Button primary rounded>
                Refer a Friend
              </Button>
            )}
            <p className='font-normal mt-4'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Asperiores nulla numquam nostrum dignissimos.
            </p>
          </div>
          <div className='self-end justify-around px-3 flex w-2/12 lg:w-3/12 md:w-full md:pt-4'>
            {<Facebook />}
            {<Instagram />}
            {<Twitter />}
          </div>
        </div>
      </Container>
    </footer>
  );
}
