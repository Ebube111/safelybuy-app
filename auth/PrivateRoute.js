import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';
import { Auth } from 'auth';

const PrivateRoute = ({ children, message }) => {
  const { addToast } = useToasts();
  const router = useRouter();

  useEffect(() => {
    if (!Auth.isAuthenticated())
      addToast(message || 'Please login/signup to continue', {
        appearance: 'error',
        autoDismiss: true,
      });
  }, [message]);

  if (!Auth.isAuthenticated()) {
    // console.log(message, addToast);
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return <div>Unauthenticated, Redirecting to Login...</div>;
  }
  return children;
};
export default PrivateRoute;
