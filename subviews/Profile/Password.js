import React, { useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight } from 'svg';
import Button from 'components/Button';
import { ContextUser } from 'context';
import { updatePassword } from 'actions/auth';
import { useToasts } from 'react-toast-notifications';

const SamplePage = () => {
  const { addToast } = useToasts();
  const [state, dispatch] = useContext(ContextUser);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();
  const password = useRef({});
  password.current = watch('password', '');
  const onSubmit = (data) => {
    updatePassword(
      dispatch,
      { old_password: data.old_password, password: data.password },
      addToast,
      reset
    );
  };

  return (
    <div className='p-6'>
      <h3 className='text-xl font-bold'>Change Password</h3>
      <div className='flex justify-center'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex mt-8 flex-col md:px-8'
        >
          {state.loadingUser && (
            <span
              style={{
                borderRightWidth: '2px',
                borderLeftWidth: '2px',
                borderRightColor: 'white',
              }}
              className='animate-spin rounded-full inline-block w-6 h-6 border-purple-700'
            ></span>
          )}
          {!state.loadingUser && (
            <>
              <div className='text-left'>
                <div className='flex justify-between my-2'>
                  <label htmlFor='old_password'>Old password</label>
                </div>
                <div className='relative md:w-full mb-6 mt-2'>
                  <input
                    type='password'
                    placeholder='Your old password'
                    {...register('old_password', {
                      required: true,
                    })}
                    id='old_password'
                    className='border border-black w-72 rounded-full px-6 py-2 focus:outline-none focus:shadow-xl'
                  />
                  <div className='text-red-500'>
                    {errors.old_password && errors.old_password.message}
                  </div>
                </div>
              </div>
              <div className='text-left'>
                <div className='flex justify-between my-2'>
                  <label htmlFor='password'>New password</label>
                </div>
                <div className='relative md:w-full mb-6 mt-2'>
                  <input
                    type='password'
                    placeholder='Your new password'
                    {...register('password', {
                      required: true,
                      minLength: {
                        value: 6,
                        message: 'Password must have at least 6 characters',
                      },
                    })}
                    id='password'
                    className='border w-full border-black rounded-full px-6 py-2 focus:outline-none focus:shadow-xl'
                  />
                  <div className='text-red-500'>
                    {errors.password && errors.password.message}
                  </div>
                </div>
              </div>
              <div className='text-left'>
                <div className='flex justify-between my-2'>
                  <label htmlFor='confirm_password'>Confirm password</label>
                </div>
                <div className='relative md:w-full mb-6 mt-2'>
                  <input
                    type='password'
                    placeholder='Retype your new password'
                    {...register('confirm_password', {
                      validate: (value) =>
                        value === password.current ||
                        'The passwords do not match',
                    })}
                    id='confirm_password'
                    className='border w-full border-black rounded-full px-6 py-2 focus:outline-none focus:shadow-xl'
                  />
                  <div className='text-red-500'>
                    {errors.confirm_password && errors.confirm_password.message}
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
          )}
        </form>
      </div>
    </div>
  );
};

export default SamplePage;
