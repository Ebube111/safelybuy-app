import { createContext, useState, useEffect } from 'react';

const EventsContext = createContext([]);

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  // Get Events
  useEffect(() => {
    // getEvents();
  }, []);

  return (
    <EventsContext.Provider value={[events, addItem, removeItem, setEvents]}>
      {children}
    </EventsContext.Provider>
  );
};
export default CartContext;
