import React from 'react';

const Comment = ({ rating, title, body, date, name }) => {
  return (
    <div className='py-4 border-gray-200 border-b last:border-0'>
      <div className='flex pt-2'>
        {new Array(rating).fill('star').map((e) => (
          <svg
            key={Math.random()}
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
        ))}
        {new Array(5 - rating).fill('star').map((e) => (
          <svg
            key={Math.random()}
            className='opacity-30'
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
        ))}
      </div>
      <h3 className='text-lg font-medium py-2'>{title}</h3>
      <p className='pb-2'>{body}</p>
      <div className='flex text-sm'>
        {/* <p className="text-gray-400">{(date).toISOString()}</p> */}
        <p className='text-gray-400'>
          {new Intl.DateTimeFormat('en-GB').format(date).replace(/\//g, ' - ')}{' '}
          *
        </p>
        <p className='ml-2 font-medium'>{name}</p>
      </div>
    </div>
  );
};

export default Comment;
