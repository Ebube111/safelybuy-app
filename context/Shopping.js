import { createContext, useState, useEffect } from 'react';

const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
  let savedCart = process.browser && localStorage.getItem('safelybuy_cart');
  if (savedCart) savedCart = JSON.parse(savedCart);
  else savedCart = [];
  const [cart, setCart] = useState(savedCart);

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

  const removeItem = (id) => {
    setCart(cart.filter((e) => e.item.id !== id));
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
  }, [cart]);

  return (
    <CartContext.Provider value={[cart, addItem, removeItem, setQuantity]}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;
