import { useRouter } from 'next/router';
import { Auth } from 'auth';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  console.log(Auth.isAuthenticated());
  if (!Auth.isAuthenticated()) {
    if (typeof window !== 'undefined')
      router.push('/login');
    return <>Unauthenticated, Redirecting to Login...</>;
  }
  return children;
};
export default PrivateRoute;
