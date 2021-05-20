import Head from 'next/head';
import Link from 'next/link';
import Navigation from 'subviews/header';
import Footer from 'components/Footer';
import { useRouter } from 'next/router';
import Container from 'components/Container';
import { Cart } from 'svg';
import Account from 'subviews/Profile/Account';
import Orders from 'subviews/Profile/Orders';
import Wishlist from 'subviews/Profile/Wishlist';
import Messaging from 'subviews/Profile/Messaging';
import Address from 'subviews/Profile/Address';
import Password from 'subviews/Profile/Password';
import PrivateRoute from 'auth/PrivateRoute';

const SettingsLink = ({ name, url, svg, children, logout, section }) => (
  <Link
    href={
      !logout && url
        ? `/settings?section=${url}`
        : !logout
        ? '/settings'
        : '/login'
    }
  >
    <a>
      <div
        className={`flex items-center py-3 font-medium text-gray-500 hover:${
          logout ? 'text-red-500' : 'text-purple-600'
        } cursor-pointer`}
      >
        <div
          className={
            section === url && !logout
              ? 'text-purple-600 inline-block pr-2'
              : 'inline-block pr-2'
          }
        >
          {svg}
        </div>
        <span className={section === url && !logout ? 'text-black' : ''}>
          {name || children}
        </span>
      </div>
    </a>
  </Link>
);

export default function Settings() {
  const router = useRouter();
  const { section } = router.query;
  return (
    <PrivateRoute message='Login to access settings'>
      <Head>
        <title>Safelybuy - Settings</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <section className='relative pb-48 flex flex-col min-h-screen md:pb-72'>
        <Navigation />
        <Container zIndex topPadding>
          <h2 className='text-4xl text-center tracking-wider font-bold md:text-2xl'>
            Account and Orders
          </h2>
          <div className='w-full flex mt-8 md:ml-0 shadow-xl p-8 rounded-3xl min-h-80'>
            <div className='bg-gray-100 w-48 p-8 rounded-lg filter md:hidden overflow-y-auto'>
              <SettingsLink
                section={section}
                svg={
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 17 17'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M8.57199 16.2857C4.23261 16.2857 0.714844 12.7679 0.714844 8.42855C0.714844 4.08917 4.23261 0.571411 8.57199 0.571411C12.9114 0.571411 16.4291 4.08917 16.4291 8.42855C16.4291 12.7679 12.9114 16.2857 8.57199 16.2857ZM13.8573 12.089C14.5781 11.0502 15.0006 9.78872 15.0006 8.42855C15.0006 4.87815 12.1224 1.99998 8.57199 1.99998C5.02159 1.99998 2.14342 4.87815 2.14342 8.42855C2.14342 9.78871 2.56583 11.0502 3.28663 12.089C4.0901 11.0277 5.97756 10.5719 8.56787 10.5714C6.97044 10.5695 5.71484 9.44601 5.71484 6.99998C5.71484 5.39696 6.84277 4.14284 8.57198 4.14284C10.2964 4.14284 11.4291 5.5154 11.4291 7.14284C11.4291 9.48542 10.1563 10.5714 8.57198 10.5714C11.1644 10.5714 13.0535 11.0272 13.8573 12.089ZM12.8325 13.2427C12.6234 12.491 11.1215 12 8.57198 12C6.02243 12 4.52057 12.4909 4.31149 13.2427C5.44577 14.2472 6.93766 14.8571 8.57199 14.8571C10.2063 14.8571 11.6982 14.2473 12.8325 13.2427ZM7.14341 6.99998C7.14341 8.62088 7.72785 9.14284 8.57199 9.14284C9.4132 9.14284 10.0006 8.64169 10.0006 7.14284C10.0006 6.25028 9.44031 5.57141 8.57199 5.57141C7.66751 5.57141 7.14341 6.15414 7.14341 6.99998Z'
                      fill='currentColor'
                    />
                  </svg>
                }
              >
                Account
              </SettingsLink>
              <SettingsLink
                section={section}
                url='orders'
                svg={<Cart color='currentColor' />}
              >
                Orders
              </SettingsLink>
              <SettingsLink
                section={section}
                url='wishlist'
                svg={
                  <svg
                    width='20'
                    height='17'
                    viewBox='0 0 20 17'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M13.795 0.166761C12.5886 0.166748 11.811 0.310468 10.9195 0.746809C10.5895 0.908356 10.2799 1.10291 9.99229 1.32988C9.71581 1.11563 9.41855 0.930013 9.10216 0.773526C8.19342 0.324061 7.37588 0.166748 6.21277 0.166748C3.09768 0.166748 0.833984 2.7478 0.833984 6.09998C0.833984 8.63154 2.24551 11.077 4.87468 13.4417C6.25473 14.6829 8.01675 15.9112 9.27865 16.5646L10.0007 16.9385L10.7226 16.5646C11.9845 15.9112 13.7466 14.6829 15.1266 13.4417C17.7558 11.077 19.1673 8.63154 19.1673 6.09998C19.1673 2.78329 16.8823 0.179547 13.795 0.166761ZM17.5007 6.09998C17.5007 8.08333 16.3225 10.1245 14.0121 12.2025C12.7525 13.3354 11.1331 14.4675 10.0007 15.0615C8.86818 14.4675 7.24883 13.3354 5.98921 12.2025C3.67884 10.1245 2.50065 8.08333 2.50065 6.09998C2.50065 3.62318 4.07035 1.83341 6.21277 1.83341C7.13755 1.83341 7.70742 1.94307 8.36326 2.26745C8.75066 2.45906 9.09305 2.71206 9.38943 3.02822L10.0026 3.68233L10.6102 3.02304C10.9132 2.69421 11.2607 2.43545 11.6523 2.24377C12.2889 1.93216 12.8232 1.83342 13.7916 1.83342C15.9075 1.84219 17.5007 3.65755 17.5007 6.09998Z'
                      fill='currentColor'
                    />
                  </svg>
                }
              >
                Wishlist
              </SettingsLink>
              <SettingsLink
                url='messaging'
                section={section}
                svg={
                  <svg
                    width='20'
                    height='15'
                    viewBox='0 0 20 15'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M2.50065 0H17.5006C18.4211 0 19.1673 0.746192 19.1673 1.66667V13.3333C19.1673 14.2538 18.4211 15 17.5006 15H2.50065C1.58018 15 0.833984 14.2538 0.833984 13.3333V1.66667C0.833984 0.746192 1.58018 0 2.50065 0ZM2.50065 5.5151V13.3333H17.5007V5.51546L10.0006 9.26547L2.50065 5.5151ZM2.50065 3.65168L10.0007 7.40206L17.5007 3.65207V1.66667H2.50065V3.65168Z'
                      fill='currentColor'
                    />
                  </svg>
                }
              >
                Messaging
              </SettingsLink>
              <SettingsLink
                section={section}
                url='address'
                svg={
                  <svg
                    width='18'
                    height='17'
                    viewBox='0 0 18 17'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M9.91286 13.7129L8.99935 14.5106L8.08584 13.7129C4.82303 10.8639 3.16602 8.34276 3.16602 6.00008C3.16602 2.68459 5.75226 0.166748 8.99935 0.166748C12.2464 0.166748 14.8327 2.68459 14.8327 6.00008C14.8327 8.34276 13.1757 10.8639 9.91286 13.7129ZM3.73731 10.8363C4.07947 11.3047 4.46061 11.7812 4.88058 12.2659C3.32872 12.6154 2.33268 13.1115 2.33268 13.5001C2.33268 14.1725 5.3153 15.1667 8.99935 15.1667C12.6834 15.1667 15.666 14.1725 15.666 13.5001C15.666 13.1115 14.67 12.6154 13.1181 12.2659C13.5381 11.7812 13.9192 11.3047 14.2614 10.8363C16.1354 11.4049 17.3327 12.3171 17.3327 13.5001C17.3327 15.589 13.5996 16.8334 8.99935 16.8334C4.39913 16.8334 0.666016 15.589 0.666016 13.5001C0.666016 12.3171 1.8633 11.4049 3.73731 10.8363ZM8.99935 1.83341C11.3358 1.83341 13.166 3.61521 13.166 6.00008C13.166 7.70589 11.8099 9.805 8.99935 12.2968C6.18879 9.805 4.83268 7.70589 4.83268 6.00008C4.83268 3.61521 6.66289 1.83341 8.99935 1.83341ZM8.99935 3.50008C10.3801 3.50008 11.4993 4.61937 11.4993 6.00008C11.4993 7.38079 10.3801 8.50008 8.99935 8.50008C7.61864 8.50008 6.49935 7.38079 6.49935 6.00008C6.49935 4.61937 7.61864 3.50008 8.99935 3.50008ZM8.16602 6.00008C8.16602 5.53984 8.53911 5.16675 8.99935 5.16675C9.45959 5.16675 9.83268 5.53984 9.83268 6.00008C9.83268 6.46032 9.45959 6.83341 8.99935 6.83341C8.53911 6.83341 8.16602 6.46032 8.16602 6.00008Z'
                      fill='currentColor'
                    />
                  </svg>
                }
              >
                Address
              </SettingsLink>
              {/* <SettingsLink
                section={section}
                url='payment'
                svg={
                  <svg
                    width='20'
                    height='14'
                    viewBox='0 0 20 14'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M2.34914 0H17.6522C18.489 0 19.1673 0.746192 19.1673 1.66667V11.6667C19.1673 12.5871 18.489 13.3333 17.6522 13.3333H2.34914C1.51234 13.3333 0.833984 12.5871 0.833984 11.6667V1.66667C0.833984 0.746192 1.51234 0 2.34914 0ZM2.50065 1.66667V11.6667H17.5007V1.66667H2.50065ZM4.16732 8.33333V10H5.83398V8.33333H4.16732ZM6.66732 10V8.33333H9.16732V10H6.66732ZM14.1673 8.33333V10H15.834V8.33333H14.1673ZM11.6673 10V8.33333H13.334V10H11.6673ZM6.66732 4.16667H4.16732V6.66667H6.66732V4.16667Z'
                      fill='currentColor'
                    />
                  </svg>
                }
              >
                Payment
              </SettingsLink> */}
              <SettingsLink
                section={section}
                url='password'
                svg={
                  <svg
                    width='14'
                    height='17'
                    viewBox='0 0 14 17'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M2.83398 4.33341V6.83341H2.00065C1.11036 6.83341 0.333984 7.48039 0.333984 8.36119V15.3056C0.333984 16.1864 1.11036 16.8334 2.00065 16.8334H12.0007C12.8909 16.8334 13.6673 16.1864 13.6673 15.3056V8.36119C13.6673 7.48039 12.8909 6.83341 12.0007 6.83341H11.1673V4.33341C11.1673 2.03223 9.30184 0.166748 7.00065 0.166748C4.69946 0.166748 2.83398 2.03223 2.83398 4.33341ZM9.50065 4.33341V6.83341H4.50065V4.33341C4.50065 2.9527 5.61994 1.83341 7.00065 1.83341C8.38136 1.83341 9.50065 2.9527 9.50065 4.33341ZM2.00065 15.1667V8.50008H12.0007V15.1667H2.00065ZM7.83398 11.8334C7.83398 12.2937 7.46089 12.6667 7.00065 12.6667C6.54041 12.6667 6.16732 12.2937 6.16732 11.8334C6.16732 11.3732 6.54041 11.0001 7.00065 11.0001C7.46089 11.0001 7.83398 11.3732 7.83398 11.8334Z'
                      fill='currentColor'
                    />
                  </svg>
                }
              >
                Password
              </SettingsLink>
              <hr className='my-4' />
              <SettingsLink
                logout
                svg={
                  <svg
                    width='18'
                    height='15'
                    viewBox='0 0 18 15'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M5.66589 8.33333L14.4874 8.33333L11.7433 11.0774L12.9218 12.2559L17.6777 7.5L12.9218 2.74408L11.7433 3.92259L14.4874 6.66667L5.66589 6.66667L5.66589 8.33333ZM2.33253 15L9.83253 15L9.83253 13.3333L2.33253 13.3333L2.33253 1.66667L9.83253 1.66667L9.83253 -3.42925e-07L2.33253 -6.7076e-07C1.41206 -7.10995e-07 0.665865 0.746191 0.665865 1.66667L0.665864 13.3333C0.665864 14.2538 1.41206 15 2.33253 15Z'
                      fill='currentColor'
                    />
                  </svg>
                }
              >
                Logout
              </SettingsLink>
            </div>
            <div className='details w-full'>
              {section === undefined ? (
                <div>
                  <Account />
                </div>
              ) : null}
              {section === 'orders' ? (
                <div>
                  <Orders />
                </div>
              ) : null}
              {section === 'wishlist' ? (
                <div>
                  <Wishlist />
                </div>
              ) : null}
              {section === 'messaging' ? (
                <div>
                  <Messaging />
                </div>
              ) : null}
              {section === 'address' ? (
                <div>
                  <Address />
                </div>
              ) : null}
              {/* {section === 'payment' ? <div>Payments</div> : null} */}
              {section === 'password' ? (
                <div>
                  <Password />
                </div>
              ) : null}
            </div>
          </div>
        </Container>
        <Footer />
      </section>
    </PrivateRoute>
  );
}
