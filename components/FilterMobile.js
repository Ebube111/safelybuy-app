import React, { useRef } from 'react';
import wNumb from 'wnumb';
import Nouislider from 'nouislider-react';
import { CloseIcon } from '../svg';

export default ({
  isMenuOpen,
  filterObjects,
  setFilterObjects,
  setIsMenuOpen,
}) => {
  const slider = useRef();
  if (!isMenuOpen) {
    return null;
  }

  return (
    <div className='invisible left-0 top-0 flex flex-col fixed w-full h-screen bg-white z-30 md:visible'>
      <div className='flex px-6 py-4 bg-white fixed w-full justify-between items-center'>
        <h3 className='text-2xl pb-5 font-medium'>Filter</h3>
        <button
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          <CloseIcon />
        </button>
      </div>
      <div className='bg-white h-full p-8 my-8 rounded-lg filter overflow-y-auto'>
        {Object.keys(filterObjects).map((e) => (
          <div key={Math.random()} className='capitalize py-4'>
            <h4 className='text-xl pb-4 font-medium'>{e}</h4>
            {e === 'price range' ? (
              <div className='pt-6 border-b pb-8 border-gray-300'>
                <Nouislider
                  range={{
                    min: filterObjects[e].min,
                    max: filterObjects[e].max,
                  }}
                  start={[filterObjects[e].minValue, filterObjects[e].maxValue]}
                  connect
                  step={50}
                  instanceRef={slider}
                  tooltips={[
                    wNumb({ decimal: 0, thousand: ',', prefix: '₦' }),
                    wNumb({ decimal: 0, thousand: ',', prefix: '₦' }),
                  ]}
                  onChange={(...args) => {
                    setFilterObjects({
                      ...filterObjects,
                      [e]: {
                        ...filterObjects[e],
                        minValue: args[0][0],
                        maxValue: args[0][1],
                      },
                    });
                  }}
                />
                <div className='text-gray-600 flex justify-between text-xs py-4'>
                  <p className=''>
                    {new Intl.NumberFormat('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                    }).format(parseInt(filterObjects[e].minValue))}
                  </p>
                  <p className=''>
                    {new Intl.NumberFormat('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                    }).format(parseInt(filterObjects[e].maxValue))}
                  </p>
                </div>
              </div>
            ) : e !== 'product rating' ? (
              <div className='border-b pb-8 border-gray-300'>
                {Object.entries(filterObjects[e]).map((v) => {
                  return (
                    <div
                      onClick={() =>
                        setFilterObjects({
                          ...filterObjects,
                          [e]: {
                            ...filterObjects[e],
                            [v[0]]: [!v[1][0], v[1][1]],
                          },
                        })
                      }
                      key={Math.random()}
                      className='flex py-1 font-medium cursor-pointer justify-between items-center'
                    >
                      <span className=''>{v[1][1]}</span>
                      <span className=''>
                        {v[1][0] ? (
                          <svg
                            width='12'
                            height='12'
                            viewBox='0 0 10 7'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              fillRule='evenodd'
                              clipRule='evenodd'
                              d='M3.85355 5.14645L8.5 0.5L9.20711 1.20711L3.85355 6.56066L1 3.70711L1.70711 3L3.85355 5.14645Z'
                              fill='rgb(139, 92, 246)'
                              stroke='rgb(139, 92, 246)'
                              strokeWidth='0.5'
                            />
                          </svg>
                        ) : (
                          <svg
                            width='12'
                            height='12'
                            viewBox='0 0 12 12'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              fillRule='evenodd'
                              clipRule='evenodd'
                              d='M6.5 5.5H11V6.5H6.5V11H5.5V6.5H1V5.5H5.5V1H6.5V5.5Z'
                              fill='black'
                              stroke='black'
                              strokeWidth='0.5'
                            />
                          </svg>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className='flex flex-col-reverse'>
                {Object.entries(filterObjects[e]).map((v) => {
                  return (
                    <div
                      onClick={() =>
                        setFilterObjects({
                          ...filterObjects,
                          [e]: {
                            ...{
                              4: [false, '4'],
                              3: [false, '3'],
                              2: [false, '2'],
                              1: [false, '1'],
                            },
                            [v[0]]: [true, v[1][1]],
                          },
                        })
                      }
                      key={Math.random()}
                      className='flex py-1 font-medium cursor-pointer items-center'
                    >
                      <div className='inline-block w-5 h-5 mr-4 shadow-inner border border-gray-400 rounded-full'>
                        {v[1][0] && (
                          <div className='inline-block m-px w-4 h-4 shadow-inner border-2 bg-purple-500 border-purple-300 rounded-full'></div>
                        )}
                      </div>
                      {new Array(Number(v[1][1])).fill('star').map((e) => (
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
                      {new Array(5 - Number(v[1][1])).fill('star').map((e) => (
                        <svg
                          className='opacity-30'
                          width='16'
                          height='16'
                          viewBox='0 0 16 16'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fill-rule='evenodd'
                            clipRule='evenodd'
                            d='M7.99958 12.7532L3.19559 15.2788L4.11307 9.92949L0.226562 6.14108L5.59759 5.36063L7.99958 0.493652L10.4016 5.36063L15.7726 6.14108L11.8861 9.92949L12.8036 15.2788L7.99958 12.7532Z'
                            fill='#F2C94C'
                          />
                        </svg>
                      ))}
                      <span className='lowercase inline-block pl-3 font-light text-gray-500'>
                        and above
                      </span>
                    </div>
                  );
                })}{' '}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
