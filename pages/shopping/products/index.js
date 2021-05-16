import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import 'nouislider/distribute/nouislider.css';
import Navigation from 'subviews/header';
import Back from 'components/Back';
import Footer from 'components/Footer';
import Filter from 'components/Filter';
import FilterMobile from 'components/FilterMobile';
import { shoppingItems } from 'data';
import Product from 'components/Product';

const Products = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(shoppingItems);
  const router = useRouter();
  const [filterObjects, setFilterObjects] = useState({
    category: !router.query.category
      ? {
          'phone-accessories': [false, 'Phone and Accessories'],
          'tablet-accessories': [false, 'iPad, Tablet and Accessories'],
          'laptop-accessories': [false, 'Laptop and Accessories'],
          others: [false, 'Other Gadgets'],
        }
      : {},
    'sub - category': !router.query.subcategory
      ? {
          phone: [false, 'Phone'],
          accessories: [false, 'Accessories'],
        }
      : {},
    condition: {
      new: [false, 'New'],
      used: [false, 'Used'],
    },
    brand: {
      apple: [false, 'Apple'],
      samsung: [false, 'Samsung'],
      lenovo: [false, 'Lenovo'],
      xaomi: [false, 'Xaomi'],
    },
    'price range': {
      min: 0,
      max: 3000000,
      minValue: 100000,
      maxValue: 1000000,
    },
    'product rating': {
      4: [false, '4'],
      3: [false, '3'],
      2: [false, '2'],
      1: [false, '1'],
    },
  });

  const getFilters = () => {
    const obj = {};
    // CONDITION
    obj.condition = Object.keys(filterObjects.condition).filter(
      (e) => filterObjects.condition[e][0] === true
    );
    if (!obj.condition.length)
      obj.condition = Object.keys(filterObjects.condition);

    // BRAND
    obj.brand = Object.keys(filterObjects.brand).filter(
      (e) => filterObjects.brand[e][0] === true
    );
    if (!obj.brand.length) obj.brand = Object.keys(filterObjects.brand);

    // CATEGORY
    obj.category = Object.keys(filterObjects.category).filter(
      (e) => filterObjects.category[e][0] === true
    );
    if (!obj.category.length)
      obj.category = Object.keys(filterObjects.category);

    // SUB-CATEGORY
    obj.subCategory = Object.keys(filterObjects['sub - category']).filter(
      (e) => filterObjects['sub - category'][e][0] === true
    );
    if (!obj.subCategory.length)
      obj.subCategory = Object.keys(filterObjects['sub - category']);

    // RATING
    obj.rating = Object.keys(filterObjects['product rating']).filter(
      (e) => filterObjects['product rating'][e][0] === true
    );
    if (!obj.rating.length) obj.rating = 0;
    else obj.rating = Number(obj.rating[0]);

    // PRICE
    obj.price = {
      min: filterObjects['price range'].minValue,
      max: filterObjects['price range'].maxValue,
    };
    return obj;
  };

  useEffect(() => {
    const filters = getFilters();
    setItems(
      shoppingItems.filter(
        (item) =>
          filters.condition.includes(item.condition) &&
          filters.brand.includes(item.brand.toLocaleLowerCase()) &&
          Number(item.rating_sum) >= filters.rating &&
          Number(item.price > Number(filters.price.min)) &&
          Number(item.price) < Number(filters.price.max)
      )
    );
  }, [filterObjects]);

  return (
    <div>
      <Head>
        <title>Safelybuy - Products</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='relative pb-48 flex flex-col min-h-screen md:pb-80'>
        <Navigation />
        <div
          style={{ maxWidth: 1280, margin: '0 auto' }}
          className='mx-20 pt-32 md:mx-0'
        >
          <div className='flex relative my-2'>
            <div className='w-72 md:mx-0 md:px-6 h-screen md:h-auto md:py-3 md:top-0 md:pt-36 fixed z-10 bg-white md:w-full'>
              <Back />
              <h2 className='text-4xl md:text-2xl tracking-wide flex justify-between font-bold'>
                <span className='capitalize'>
                  {router.query.subcategory
                    ? `${router.query.subcategory.replace(/-|_/gi, ' ')}`
                    : 'Our Products'}
                </span>
                <svg
                  width='40'
                  height='40'
                  viewBox='0 0 40 40'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='hidden md:inline-block'
                  onClick={() => setIsOpen(true)}
                >
                  <circle cx='20' cy='20' r='20' fill='#8661FF' />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M13.332 16.2505L17.9987 21.5839V27.2954L21.9987 25.7954V21.5839L26.6654 16.2505V14.6667C26.6654 13.9303 26.0684 13.3334 25.332 13.3334H14.6654C13.929 13.3334 13.332 13.9303 13.332 14.6667V16.2505ZM25.3326 14.6667V15.7496L20.6659 21.0829V24.8714L19.3326 25.3714V21.0829L14.6659 15.7496V14.6667H25.3326Z'
                    fill='#DADADA'
                  />
                </svg>
              </h2>
              <Filter
                filterObjects={filterObjects}
                setFilterObjects={setFilterObjects}
                category={router.query.category}
                subCategory={router.query.subcategory}
              />
            </div>
            <div className='ml-80 md:pt-36 md:mx-6 md:ml-4 flex flex-wrap justify-start'>
              <div className='h-1 text-white invisible'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates similique a molestiae consequatur modi quam optio.
                Voluptas aut laboriosam pariatur! Impedit, dolores. Sunt amet
                hic illo inventore assumenda quasi qui. Aut ea eligendi aperiam
                voluptates quaerat id ratione nemo omnis corrupti vel nam,
                mollitia impedit quis fugit minus rerum, enim harum distinctio
                sunt, est quasi. Eveniet enim eaque perferendis non! Repudiandae
                enim laboriosam harum optio nisi corrupti ipsum quo distinctio.
                Aperiam, saepe. Distinctio, quidem qui nulla nesciunt quos,
                autem ducimus obcaecati alias beatae, molestias laborum nostrum
                quae perferendis excepturi vero?
              </div>
              {items.map((e) => (
                <div className='mb-6 ml-8' key={e.id}>
                  <Product
                    id={e.id}
                    img={e.main_image}
                    title={e.title}
                    rating={e.rating_sum}
                    price={Number(e.price)}
                    condition={e.condition}
                    city={e.shipping_city}
                  />
                </div>
              ))}
              {items.length ? null : (
                <div className=''>No Product Available</div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <FilterMobile
        filterObjects={filterObjects}
        setFilterObjects={setFilterObjects}
        isMenuOpen={isOpen}
        setIsMenuOpen={setIsOpen}
      />
    </div>
  );
};

export default Products;
