import React from 'react';
import Link from 'next/link';

const SectionalTab = ({ text, icon, color, url }) => {
  return (
    <Link href={`/${url}`}>
      <a>
        <div
          className={`flex border-2 md:m-2 items-center p-3 md:p-1 border-${color}-200 w-52 md:w-36 rounded-md hover:shadow-inner`}
        >
          <div className={`bg-${color}-100 p-1 mr-4 md:mr-2 rounded-md`}>
            <div className={`bg-${color}-200 p-2 md:p-1 rounded-md`}>
              {icon}
            </div>
          </div>
          <div className='leading-none'>
            <h4 className='uppercase tracking-widest md:tracking-wide font-bold text-sm md:text-xs'>
              {text}
            </h4>
            <small className='text-xs font-medium'>from Safelybuy</small>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default SectionalTab;
