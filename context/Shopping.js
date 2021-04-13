import { createContext, useState } from 'react';

const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

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

  const removeItem = (id) => setCart(cart.filter((e) => e.item.id !== id));

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

  return (
    <CartContext.Provider value={[cart, addItem, removeItem, setQuantity]}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;
