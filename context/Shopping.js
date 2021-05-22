import { createContext, useState, useEffect } from 'react';

const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
  let savedCart = process.browser && localStorage.getItem('safelybuy_cart');
  if (savedCart) savedCart = JSON.parse(savedCart);
  else savedCart = [];
  let savedList = process.browser && localStorage.getItem('safelybuy_list');
  if (savedList) savedList = JSON.parse(savedList);
  else savedList = [];

  const [cart, setCart] = useState(savedCart);
  const [list, setList] = useState(savedList);

  const addItem = (item, quantity) => {
    // if item exists, add to its quantity
    const found = cart.findIndex((e) => item.id === e.item.id);
    if (found !== -1) {
      const newItem = cart[found];
      newItem.quantity += quantity;
      const newCart = [...cart];
      newCart.splice(found, 1, newItem);
      setCart(newCart);
    } else setCart(cart.concat([{ item, quantity }]));
  };

  const addItemToList = (item) => {
    const found = list.findIndex((e) => item.id === e.id);
    if (found !== -1) return;
    setList(list.concat([item]));
  };

  const removeItem = (id) => {
    setCart(cart.filter((e) => e.item.id !== id));
  };

  const removeItemFromList = (id) => {
    setList(list.filter((e) => e.id !== id));
  };

  const setQuantity = (id, quantity) => {
    const found = cart.findIndex((e) => id === e.item.id);
    if (found !== -1) {
      const newItem = cart[found];
      newItem.quantity = quantity;
      const newCart = [...cart];
      newCart.splice(found, 1, newItem);
      setCart(newCart);
    }
  };

  useEffect(() => {
    process.browser &&
      localStorage.setItem('safelybuy_cart', JSON.stringify(cart));
    process.browser &&
      localStorage.setItem('safelybuy_list', JSON.stringify(list));
  }, [cart, list]);

  return (
    <CartContext.Provider
      value={[
        cart,
        addItem,
        removeItem,
        setQuantity,
        list,
        addItemToList,
        removeItemFromList,
      ]}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;
