import Link from 'next/link';
import React from 'react';

const categories = [
  {
    category_id: 1,
    name: 'Phone and Accessories',
    short_name: 'phone_accessories',
    created_at: null,
    updated_at: null,
    subcategories: [
      {
        id: 1,
        name: 'Phone',
        category_id: '1',
        short_name: 'phones',
        // short_name: 'phone',
        created_at: null,
        updated_at: null,
      },
      {
        id: 2,
        name: 'Accessories',
        category_id: '1',
        // short_name: 'sub_phone_accessories',
        short_name: 'phone_accessories',
        created_at: null,
        updated_at: null,
      },
    ],
  },
  {
    category_id: 2,
    name: 'iPad, Tablet and Accessories',
    short_name: 'tablets_accessories',
    created_at: null,
    updated_at: null,
    subcategories: [
      {
        id: 3,
        name: 'iPad',
        category_id: '2',
        short_name: 'ipads',
        created_at: null,
        updated_at: null,
      },
      {
        id: 4,
        name: 'Tablet',
        category_id: '2',
        short_name: 'tablets',
        created_at: null,
        updated_at: null,
      },
      {
        id: 5,
        name: 'Accessories',
        category_id: '2',
        short_name: 'ipad_accessories',
        created_at: null,
        updated_at: null,
      },
    ],
  },
  {
    category_id: 3,
    name: 'Laptop and Accessories',
    short_name: 'laptops_accessories',
    created_at: null,
    updated_at: null,
    subcategories: [
      {
        id: 6,
        name: 'Laptop',
        category_id: '3',
        short_name: 'laptops',
        created_at: null,
        updated_at: null,
      },
      {
        id: 7,
        name: 'Accessories',
        category_id: '3',
        short_name: 'laptops_accessories',
        created_at: null,
        updated_at: null,
      },
    ],
  },
  {
    category_id: 4,
    name: 'Other Gadgets',
    short_name: 'other_gadgets',
    created_at: null,
    updated_at: null,
    subcategories: [
      {
        id: 8,
        name: 'Power Bank',
        category_id: '4',
        short_name: 'power_banks',
        created_at: null,
        updated_at: null,
      },
      {
        id: 9,
        name: 'Apple Watches',
        category_id: '4',
        short_name: 'apple_watches',
        created_at: null,
        updated_at: null,
      },
      {
        id: 10,
        name: 'Speakers',
        category_id: '4',
        short_name: 'speakers',
        created_at: null,
        updated_at: null,
      },
      {
        id: 11,
        name: 'Headphones',
        category_id: '4',
        short_name: 'headphones',
        created_at: null,
        updated_at: null,
      },
    ],
  },
];
// products?category=apple-phones
export default function allCategories({
  categoryRef,
  categoryIsVisible,
  path,
}) {
  return (
    <div ref={categoryRef}>
      {categoryIsVisible && (
        <div className='flex flex-wrap cursor-default border absolute z-30 bg-white w-full top-20 shadow-2xl px-20 py-10 left-0'>
          {categories.map((category) => (
            <div key={Math.random()} className='flex flex-col text-black w-1/2 items-start'>
              <h3 className='text-xl font-bold capitalize my-3'>
                {category.name}
              </h3>
              {category.subcategories.map((sub) => (
                <div
                  key={Math.random()}
                  className='text-base capitalize font-normal my-2 p-1 hover:shadow-sm hover:font-medium'
                >
                  <Link
                    href={`/shopping/products?category=${category.short_name}&subcategory=${sub.short_name}`}
                  >
                    {sub.name}
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
