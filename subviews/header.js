import { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Autosuggest from 'react-autosuggest';
import CartContext from 'context/Shopping';
import Button from 'components/Button';
import Logo from 'components/Logo';
import { ContextUser } from 'context';
import User, { buttonStyles } from 'components/User';
import { useComponentVisible } from 'hooks';
import { Cart, HambugerSkewed, SearchIcon, Hamburger, CloseIcon } from 'svg';
import AllCategories from './allCategories';
import { shoppingItems } from 'data';

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : shoppingItems.filter((lang) =>
        lang.title.toLowerCase().includes(inputValue)
      );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion) => suggestion.title;

// Use your imagination to render suggestions.
const renderSuggestion = (suggestion) => (
  <Link href={`/shopping/products/${suggestion.id}`}>
    <div className='bg-gray-100 w-full p-4 cursor-pointer hover:bg-gray-800 hover:text-white'>
      {suggestion.title}
    </div>
  </Link>
);

const header = ({ text, color, noSearch, notification, items }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [cart, addItem, removeItem] = useContext(CartContext);
  const router = useRouter();
  // const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [state, dispatch] = useContext(ContextUser);
  const {
    ref: userRef,
    isComponentVisible: userIsVisible,
    setIsComponentVisible: setUserIsVisible,
  } = useComponentVisible(false);

  const onChange = (event, { newValue }) => {
    setSearchValue(newValue);
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    className:
      'w-64 md:w-full bg-gray-100 focus:outline-none pl-12 pr-3 py-2 rounded-full',
    type: 'search',
    placeholder: 'Search iphones, laptops...',
    value: searchValue,
    onChange: onChange,
  };

  const {
    ref: categoryRef,
    isComponentVisible: categoryIsVisible,
    setIsComponentVisible: setCategoryIsVisible,
  } = useComponentVisible(false);

  return (
    <div className='fixed w-full bg-white z-20 shadow-lg px-20 py-6 md:px-6 md:py-3'>
      <nav
        className='relative flex w-full items-center tracking-wide justify-between'
      >
        <div className='flex items-center md:hidden'>
          <Logo
            color={color || 'purple'}
            text={
              text || (
                <div
                  onClick={(e) => {
                    if (categoryIsVisible) setCategoryIsVisible(false);
                    else setCategoryIsVisible(true);
                    e.stopPropagation();
                  }}
                  className='flex items-center cursor-pointer'
                >
                  <HambugerSkewed />
                  <p className='capitalize font-bold tracking-widest ml-3 text-lg text-black'>
                    All Categories
                  </p>
                  <AllCategories
                    path={router.pathname}
                    categoryRef={categoryRef}
                    categoryIsVisible={categoryIsVisible}
                  />
                </div>
              )
            }
          />
          {!noSearch && (
            <div className='relative md:hidden ml-4'>
              {/* <input
                className='w-72 md:w-full bg-gray-100 focus:outline-none px-12 py-2 rounded-full'
                type='search'
                placeholder='Search iphones, laptops...'
              /> */}
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
              />
              <span className='absolute top-3 left-4'>
                <SearchIcon />
              </span>
            </div>
          )}
        </div>
        <div className='hidden md:flex items-center'>
          <div className='mr-2 mb-1'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`block px-2 py-3 rounded-md ${buttonStyles()}`}
            >
              {!isMenuOpen ? (
                <Hamburger scale={1} color='black' />
              ) : (
                <CloseIcon />
              )}
            </button>
          </div>
          <Link href='/'>
            <>
              <Logo color='purple' />
            </>
          </Link>
        </div>
        <div className='flex items-center'>
          {state.user.firstname && (
            <Button primaryOutline roundedLg>
              Become a seller
            </Button>
          )}
          <User
            userRef={userRef}
            setUserIsVisible={setUserIsVisible}
            userIsVisible={userIsVisible}
          />
          {!notification && (
            <Link href='/shopping/cart/'>
              <div className='bg-green-500 cursor-pointer px-4 md:px-2 py-3 md:py-2 rounded-md shadow-lg relative transform hover:shadow-2xl hover:-translate-y-0.5 active:shadow:sm active:translate-y-0 focus:outline-none'>
                <Cart />
                {cart.length ? <div className='absolute bg-red-500 rounded-full px-2 py-1 md:px-1 md:py-px text-xs -right-2 -top-2 text-white '>
                  {cart.length}
                </div> : null}
              </div>
            </Link>
          )}
        </div>
      </nav>
      {!noSearch && (
        <div className='relative hidden md:flex ml-10 md:ml-6 md:mx-6 mt-3'>
          {/* <input
            className='w-72 md:w-full bg-gray-100 focus:outline-none px-12 py-2 rounded-full'
            type='search'
            placeholder='Search iphones, laptops...'
          /> */}
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
          <span className='absolute top-3 left-4'>
            <SearchIcon />
          </span>
        </div>
      )}
    </div>
  );
};

export default header;
