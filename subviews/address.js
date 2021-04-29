import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { CloseIcon } from 'svg';
import { cities } from 'data';
import { useForm } from 'react-hook-form';
import { ArrowRight } from 'svg';
import Button from 'components/Button';
import { useToasts } from 'react-toast-notifications';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const addressSchema = yup.object().shape({
  // fullname: yup
  //   .string()
  //   .required('Please enter fullname')
  //   .matches(/^[a-zA-Z][a-zA-Z '-]*$/, 'Invalid character supplied'),
  // phone_number: yup
  //   .string()
  //   .required('Please enter phone number')
  //   .matches(/^[0-9]+$/, 'Phone number must be only digits')
  //   .min(11, 'Phone number must be exactly 11 digits')
  //   .max(11, 'Phone number must be exactly 11 digits'),
  street: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
});

const AddressModal = ({ modalOpen, setModalOpen, addAddress, loading }) => {
  const { addToast } = useToasts();
  const [makeDefault, setMakeDefault] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  // const [selectedTown, setSelectedTown] = useState('');
  const [states] = useState(Object.keys(cities).sort());
  const [towns, setTowns] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressSchema),
  });
  if (typeof window !== 'undefined') {
    Modal.setAppElement('body');
  }
  const [loadingAddress, setLoadingAddress] = useState(false);
  const onSubmit = async (data) => {
    data.default = makeDefault;
    data.country = 'Nigeria';
    addAddress(data, setModalOpen);
  };

  useEffect(() => {
    if (selectedState) setTowns(cities[selectedState].sort());
  }, [selectedState]);

  return (
    <div>
      <Modal
        isOpen={modalOpen}
        contentLabel='Address Modal'
        onRequestClose={() => setModalOpen(false)}
        shouldCloseOnOverlayClick={true}
        style={{
          content: {
            width: '30rem',
            margin: '0 auto',
          },
        }}
        overlayClassName='fixed overflow-scroll top-0 left-0 z-50 w-screen pt-40 px-40 md:pt-0 md:px-0 h-screen bg-purple-600 bg-opacity-30'
        className='flex flex-col relative rounded-3xl md:rounded-none outline-none px-20 py-10 md:px-4 md:py-4 left-0 bg-white opacity-100'
      >
        <div>
          <div className='flex justify-between w-full pb-4 items-start'>
            <h3 className='text-xl font-bold'>Add a New Address</h3>
            <span
              onClick={() => setModalOpen(false)}
              className='inline-block cursor-pointer rounded-full bg-red-500 p-3'
            >
              <CloseIcon color='white' />
            </span>
          </div>
          <div className='flex'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex my-6 flex-col w-full md:max-w-7xl md:px-8'
            >
              {loadingAddress && (
                <div className={`animate-pulse`}>
                  <div className='flex flex-col'>
                    <div className='h-6 my-2 bg-gray-200 rounded w-1/4'></div>
                    <div className='h-12 my-2 bg-gray-300 rounded-full w-full'></div>
                  </div>
                  <div className='flex mt-6 flex-col'>
                    <div className='h-6 my-2 bg-gray-200 rounded w-1/4'></div>
                    <div className='h-12 my-2 bg-gray-300 rounded-full w-full'></div>
                  </div>
                </div>
              )}
              {!loadingAddress && (
                <>
                  <div className='flex w-full flex-wrap justify-start'>
                    {/* <div className='text-left md:mr-0 w-full'>
                      <label className='text-sm my-2' htmlFor='fullname'>
                        Fullname
                      </label>
                      <div className='relative md:w-full mb-6 mt-2'>
                        <input
                          type='text'
                          placeholder='John Doe'
                          {...register('fullname', {
                            required: true,
                          })}
                          id='fullname'
                          required
                          className={`border ${
                            errors.fullname ? 'border-red' : 'border-black'
                          } w-full rounded-full px-6 py-2 focus:outline-none focus:shadow-xl`}
                        />

                        <span className='text-red-500'>
                          {errors.fullname && (
                            <span>{errors.fullname.message}</span>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className='text-left  md:mr-0 w-full'>
                      <label className='text-sm my-2' htmlFor='phone_number'>
                        Phone Number
                      </label>
                      <div className='relative md:w-full mb-6 mt-2'>
                        <input
                          type='phone_number'
                          placeholder='08012345678'
                          {...register('phone_number', {
                            required: true,
                          })}
                          id='phone_number'
                          required
                          className={`border ${
                            errors.phone_number ? 'border-red' : 'border-black'
                          } w-full rounded-full px-6 py-2 focus:outline-none focus:shadow-xl`}
                        />
                        <span className='text-red-500'>
                          {errors.phone_number && (
                            <span>{errors.phone_number.message}</span>
                          )}
                        </span>
                      </div>
                    </div>
                     */}
                    <div className='text-left  md:mr-0 w-full'>
                      <label className='text-sm my-2' htmlFor='street'>
                        Street Address
                      </label>
                      <div className='relative md:w-full mb-6 mt-2'>
                        <input
                          type='text'
                          placeholder='Enter your street address'
                          {...register('street', {
                            required: true,
                          })}
                          id='street'
                          required
                          className={`border ${
                            errors.street ? 'border-red' : 'border-black'
                          } w-full rounded-full px-6 py-2 focus:outline-none focus:shadow-xl`}
                        />
                        <span className='text-red-500'>
                          {errors.street && 'Please enter your street address'}
                        </span>
                      </div>
                    </div>
                    <div className='text-left  md:mr-0 w-full'>
                      <label className='text-sm my-2' htmlFor='email'>
                        State
                      </label>
                      <div className='relative md:w-full mb-6 mt-2'>
                        <select
                          {...register('state', {
                            required: true,
                          })}
                          className='border w-full border-black rounded-full px-6 py-2 focus:outline-none focus:shadow-xl'
                          name='state'
                          id='state'
                          onChange={(e) => setSelectedState(e.target.value)}
                        >
                          <option value=''>Select State</option>
                          {states.map((e) => (
                            <option key={e} value={e}>
                              {e}
                            </option>
                          ))}
                        </select>
                        <span className='text-red-500'>
                          {errors.state && <span>{errors.state.message}</span>}
                        </span>
                      </div>
                    </div>
                    <div className='text-left  md:mr-0 w-full'>
                      <label className='text-sm my-2' htmlFor='town'>
                        Town/City
                      </label>
                      <div className='relative md:w-full mb-6 mt-2'>
                        <select
                          className='border w-full border-black rounded-full px-6 py-2 focus:outline-none focus:shadow-xl'
                          name='city'
                          id='city'
                          {...register('city', {
                            required: true,
                          })}
                        >
                          <option value=''>Select City</option>
                          {towns.map((e) => (
                            <option key={e} value={e}>
                              {e}
                            </option>
                          ))}
                        </select>
                        <span className='text-red-500'>
                          {errors.city && <span>{errors.city.message}</span>}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='my-2 flex flex-col items-start'>
                    <div className='relative inline-flex mb-6 items-center'>
                      <input
                        type='checkbox'
                        id='default'
                        value={makeDefault}
                        className='h-4 w-4 mr-2'
                        onChange={() => setMakeDefault(!makeDefault)}
                      />
                      <label htmlFor='default' className='leading-none'>
                        Set as default delivery address.
                      </label>
                    </div>
                    <Button
                      primary
                      roundedMd
                      disabled={loading}
                      icon={
                        <div className='animate-bounceSide'>
                          <ArrowRight color='white' />
                        </div>
                      }
                      text='Add Address'
                      submit
                    />
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddressModal;
