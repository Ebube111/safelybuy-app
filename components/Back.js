import { useRouter } from 'next/router';
import { AngleRight } from '../svg';

const Back = () => {
  const router = useRouter();
  return (
    <div onClick={() => router.back()} className='pb-4 z-10 bg-white cursor-pointer text-gray-600'>
      <span className='transform inline-block mr-1 rotate-180'>
        <AngleRight color='rgb(75, 85, 99)' scale={1.4} />
      </span>{' '}
      Go back
    </div>
  );
};

export default Back;
