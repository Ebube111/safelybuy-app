import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TicketCard = ({ text, venue, month, date, src, id = '4565677777654' }) => {
  return (
    <Link href={`/tickets/${id}`}>
      <div className='relative cursor-pointer h-96 md:h-64 flex-grow rounded-2xl flex-shrink-0 w-1/4 md:w-1/3 ml-12 md:ml-4 mb-12'>
        <Image
          src={src || '/images/fireboy.jpeg'}
          layout='fill'
          className='object-cover rounded-xl'
        />
        <div className='absolute px-5 md:px-1 py-8 md:py-2 bottom-0 rounded-b-xl bg-gray-100 flex w-full items-center'>
          <div className='pr-3 text-center'>
            <div className='font-medium text-purple-500'>{month}</div>
            <div className='text-lg font-bold'>{date}</div>
          </div>
          <div className='flex flex-col'>
            <span className='font-medium text-lg md:text-sm'>{text}</span>
            <span className='text-sm md:text-xs inline-block mt-1'>
              <svg
                className='inline-block mr-1'
                width='12'
                height='14'
                viewBox='0 0 12 14'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M6 13.1084L6.38367 12.7734C9.61007 9.95616 11.25 7.49626 11.25 5.33398C11.25 2.27187 8.86005 0.0839844 6 0.0839844C3.13995 0.0839844 0.75 2.27187 0.75 5.33398C0.75 7.49626 2.38993 9.95616 5.61633 12.7734L6 13.1084ZM6 11.5543C3.26219 9.08689 1.91667 6.99604 1.91667 5.33398C1.91667 2.94034 3.7624 1.25065 6 1.25065C8.2376 1.25065 10.0833 2.94034 10.0833 5.33398C10.0833 6.99604 8.73781 9.08689 6 11.5543ZM6 2.41732C7.61083 2.41732 8.91667 3.72315 8.91667 5.33398C8.91667 6.94482 7.61083 8.25065 6 8.25065C4.38917 8.25065 3.08333 6.94482 3.08333 5.33398C3.08333 3.72315 4.38917 2.41732 6 2.41732ZM4.25 5.33398C4.25 4.36749 5.0335 3.58398 6 3.58398C6.9665 3.58398 7.75 4.36749 7.75 5.33398C7.75 6.30048 6.9665 7.08398 6 7.08398C5.0335 7.08398 4.25 6.30048 4.25 5.33398Z'
                  fill='black'
                />
              </svg>
              {venue}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TicketCard;
