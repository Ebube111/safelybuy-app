import React from "react";
import ContactList from "./ContactList";
import Search from "./Search";

const Contacts = ({ contacts, setContacts, setSelectedContact }) => {
  return (
    <div className="w-5/12 md:w-full border-r md:border-0">
      <Search setContacts={setContacts} />
      <ContactList
        setSelectedContact={setSelectedContact}
        contacts={contacts}
      />
    </div>
  );
};

export default Contacts;
