import React, { useState } from 'react';
import Chat from './Chat';
import Contacts from './Contacts';

const Messaging = () => {
  const [contacts, setContacts] = useState([
    {
      name: 'SafelyBuy Agent',
      imageUrl: './images/image1.jpeg',
      lastMessage: 'We will take a look at it',
      lastMessageTime: Date.now() - 24 * 60 * 60 * 1000,
      messages: [
        {
          text: 'Can you take a look at it?',
          time: Date.now() - 24 * 60 * 60 * 1000,
          sent: true,
        },
        {
          text: 'We will take a look at it',
          time: Date.now() - 24 * 60 * 60 * 1000,
          sent: false,
        },
        {
          text: 'Can you take a look at it?',
          time: Date.now() - 24 * 60 * 60 * 1000,
          sent: true,
        },
        {
          text: 'We will take a look at it',
          time: Date.now() - 24 * 60 * 60 * 1000,
          sent: false,
        },
        {
          text: 'Can you take a look at it?',
          time: Date.now() - 24 * 60 * 60 * 1000,
          sent: true,
        },
        {
          text: 'We will take a look at it',
          time: Date.now() - 24 * 60 * 60 * 1000,
          sent: false,
        },
        {
          text: 'Can you take a look at it?',
          time: Date.now() - 24 * 60 * 60 * 1000,
          sent: true,
        },
        {
          text: 'We will take a look at it',
          time: Date.now() - 24 * 60 * 60 * 1000,
          sent: false,
        },
        {
          text: 'Can you take a look at it?',
          time: Date.now() - 24 * 60 * 60 * 1000,
          sent: true,
        },
        {
          text: 'We will take a look at it',
          time: Date.now() - 24 * 60 * 60 * 1000,
          sent: false,
        },
        {
          text: 'Can you take a look at it?',
          time: Date.now() - 24 * 60 * 60 * 1000,
          sent: true,
        },
        {
          text: 'We will take a look at it',
          time: Date.now() - 24 * 60 * 60 * 1000,
          sent: false,
        },
      ],
      status: 'online',
    },
    {
      name: 'SafelyBuy Doorman',
      imageUrl: '/images/image2.jpeg',
      lastMessage:
        'Your item will be delivered today, please confirm your availability',
      lastMessageTime: Date.now() - 49 * 60 * 60 * 1000,
      messages: [
        {
          text: 'When should I be expecting my delivery?',
          time: Date.now() - 24 * 60 * 60 * 1000,
          sent: true,
        },
        {
          text:
            'Your item will be delivered today, please confirm your availability',
          time: Date.now(),
          sent: false,
        },
      ],
      status: 'offline',
    },
  ]);
  const [selectedContact, setSelectedContact] = useState(null);
  return (
    <>
      <div className='flex w-full flex-col md:hidden p-6'>
        <h3 className='text-xl font-bold'>Messaging</h3>
        <div className='bg-white h-messCustom flex mt-8 rounded-3xl'>
          <Contacts
            contacts={contacts}
            setSelectedContact={setSelectedContact}
            setContacts={setContacts}
          />
          <Chat selectedContact={selectedContact} />
        </div>
      </div>
      <div className='hidden md:flex flex-col overflow-scroll h-screen -mt-8 -mx-8 -mb-24 p-6 bg-white'>
        {!selectedContact && <h3 className='text-3xl'>Messaging</h3>}
        <div className='flex mt-8 md:mt-3 overflow-scroll px-16 md:px-px py-8 md:py-3 rounded-3xl'>
          {!selectedContact && (
            <Contacts
              contacts={contacts}
              setSelectedContact={setSelectedContact}
              setContacts={setContacts}
            />
          )}
          {selectedContact && (
            <Chat
              setSelectedContact={setSelectedContact}
              selectedContact={selectedContact}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Messaging;
