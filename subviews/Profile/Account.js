import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight } from 'svg';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import Button from 'components/Button';
import { useHistory } from 'react-router-dom';
import utilities from 'utilities';
import { requests } from 'utilities/requests';
import { useToasts } from 'react-toast-notifications';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ContextUser } from 'context';
import { updateUser } from 'actions/auth';

const isValidEmail = (email) =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

const signUpSchema = yup.object().shape({
  firstname: yup
    .string()
    .required('Please enter name')
    .matches(/^[a-zA-Z][a-zA-Z '-]*$/, 'Invalid character supplied'),
  lastname: yup
    .string()
    .required('Please enter name')
    .matches(/^[a-zA-Z][a-zA-Z '-]*$/, 'Invalid character supplied'),
  email: yup.string().email().required(),
  phone: yup
    .string()
    .required('Please enter  phone number')
    .matches(/^[0-9]+$/, 'Phone number must be only digits')
    .min(11, 'Phone number must be exactly 11 digits')
    .max(11, 'Phone number must be exactly 11 digits'),
  gender: yup.string().required(),
});

export default function Account() {
  const [{ user, loadingUser }, dispatch] = useContext(ContextUser);
  const history = useHistory();
  const { addToast } = useToasts();
  // const [loadingUser, setLoadingUser] = useState(false);
  const [dob, setDob] = useState(!user.dob ? '' : new Date(user.dob));
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  useEffect(() => {
    // console.log(loadingUser);
    if (user.firstname) {
      const fields = [
        'firstname',
        'lastname',
        'email',
        'phone',
        'gender',
        'dob',
      ];
      fields.forEach((field) => setValue(field, user[field]));
    }
    return () => {};
  }, [user]);

  const onSubmit = async (data) => {
    data.dob = dob;
    console.log(data);
    updateUser(dispatch, data, addToast);
  };

  const handleEmailValidation = (email) => {
    const isValid = isValidEmail(email);
    return isValid;
  };

  return (
    <div className='p-6'>
      <h3 className='text-xl font-bold'>General Info</h3>
      <div className='flex justify-center'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex mt-8 flex-col md:px-8'
        >
          {loadingUser && (
            <span
              style={{
                borderRightWidth: '2px',
                borderLeftWidth: '2px',
                borderRightColor: 'white',
              }}
              className='animate-spin rounded-full inline-block w-6 h-6 border-purple-700'
            ></span>
          )}
          {/* {!loadingUser && ( */}
          <>
            {' '}
            <div className='flex justify-between'>
              <div className='text-left mr-2'>
                <label className='text-sm my-2' htmlFor='firstname'>
                  First Name
                </label>
                <div className='relative md:w-full mb-6 mt-2'>
                  <input
                    // defaultValue={user.firstname}
                    type='text'
                    placeholder='Chibuzor'
                    {...register('firstname', {
                      required: true,
                    })}
                    id='firstname'
                    required
                    className={`border ${
                      errors.firstname ? 'border-red' : 'border-black'
                    } w-64 rounded-full px-6 py-2 focus:outline-none focus:shadow-xl`}
                  />
                  <div className='text-red-500'>
                    {errors.firstname && (
                      <span>{errors.firstname.message}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className='text-left ml-2'>
                <label className='text-sm my-2' htmlFor='lastname'>
                  Last Name
                </label>
                <div className='relative md:w-full mb-6 mt-2'>
                  <input
                    // defaultValue={user.lastname}
                    type='text'
                    placeholder='Oluwabukola'
                    {...register('lastname', {
                      required: true,
                    })}
                    id='lastname'
                    required
                    className={`border ${
                      errors.lastname ? 'border-red' : 'border-black'
                    } w-64 rounded-full px-6 py-2 focus:outline-none focus:shadow-xl`}
                  />
                  <div className='text-red-500'>
                    {errors.lastname && <span>{errors.lastname.message}</span>}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='text-left mr-2'>
                <label className='text-sm my-2' htmlFor='email'>
                  Email address
                </label>
                <div className='relative md:w-full mb-6 mt-2'>
                  <input
                    // defaultValue={user.email}
                    type='email'
                    placeholder='user@safelybuy.com'
                    {...register('email', {
                      required: true,
                      validate: handleEmailValidation,
                    })}
                    id='email'
                    required
                    className={`border ${
                      errors.email ? 'border-red' : 'border-black'
                    } w-64 rounded-full px-6 py-2 focus:outline-none focus:shadow-xl`}
                  />
                  <div className='text-red-500'>
                    {errors.email && 'Email is not valid'}
                  </div>
                </div>
              </div>
              <div className='text-left '>
                <label className='text-sm my-2' htmlFor='phone'>
                  Phone Number
                </label>
                <div className='relative md:w-full mb-6 mt-2'>
                  <input
                    // defaultValue={user.phone}
                    type='phone'
                    placeholder='070109067**'
                    {...register('phone', {
                      required: true,
                    })}
                    id='phone'
                    required
                    className={`border ${
                      errors.phone ? 'border-red' : 'border-black'
                    } w-64 rounded-full px-6 py-2 focus:outline-none focus:shadow-xl`}
                  />
                  <div className='text-red-500'>
                    {errors.phone && <span>{errors.phone.message}</span>}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='text-left mr-2'>
                <label className='text-sm my-2' htmlFor='gender'>
                  Gender
                </label>
                <div className='relative md:w-full mb-6 mt-2'>
                  <select
                    // value={user.gender}
                    className='capitalize border w-full border-black rounded-full px-6 py-2 focus:outline-none focus:shadow-xl'
                    name='gender'
                    id='gender'
                    {...register('gender')}
                  >
                    <option value=''>Are you a male or female?</option>
                    {['male', 'female', 'other'].map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='text-left ml-2'>
                <label className='text-sm my-2' htmlFor='dob'>
                  Date of Birth
                </label>
                <div className='relative md:w-full mb-6 mt-2'>
                  <div
                    className={`border border-black w-64 rounded-full px-6 py-2 focus:outline-none focus:shadow-xl`}
                  >
                    <DatePicker onChange={setDob} value={dob} />
                  </div>
                </div>
              </div>
            </div>
            <div className='my-3'>
              <Button
                primary
                roundedMd
                icon={
                  <div className='animate-bounceSide'>
                    <ArrowRight color='white' />
                  </div>
                }
                text='Save Changes'
                submit
              />
            </div>
          </>
          {/* )} */}
        </form>
      </div>
    </div>
  );
}
