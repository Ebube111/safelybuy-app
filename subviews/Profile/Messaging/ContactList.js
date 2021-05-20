import React from "react";
import moment from "moment";
import { isToday } from "./NotificationDetails";

const ContactList = ({ contacts, setSelectedContact }) => {
  return (
    <div>
      {contacts.map((contact) => (
        <div
          key={Math.random()}
          onClick={() => setSelectedContact(contact)}
          className="contact cursor-pointer flex items-center border-b last:border-b-0 p-2 justify-between hover:bg-purple-50 active:bg-purple-100"
        >
          <div className="flex items-center w-9/12">
            <img
              className="rounded-full flex-shrink-0"
              height="50"
              width="50"
              src={contact.imageUrl}
              alt={contact.name}
            />
            <div className="whitespace-nowrap px-3 overflow-hidden overflow-ellipsis flex-grow-1">
              <h4 className="font-medium">{contact.name}</h4>
              <p className="text-gray-500 text-sm whitespace-nowrap overflow-hidden overflow-ellipsis">
                {contact.lastMessage}
              </p>
            </div>
          </div>
          <div className="w-2/12 text-sm text-right text-gray-400 pr-8">
            {isToday(new Date(contact.lastMessageTime))
              ? moment(contact.lastMessageTime).format("HH:mm")
              : moment(contact.lastMessageTime).format("MMM D")}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
