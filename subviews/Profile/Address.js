import React, { useState, useEffect, useContext } from 'react';
import Button from 'components/Button';
import AddressContext from 'context/Address';
import AddressModal from 'subviews/address';
import AddressItem from './AddressItem';
import { useToasts } from 'react-toast-notifications';

let remaining = null;

export default function Account() {
  const { address, loading, addAddress, removeAddress, editAddress } = useContext(
    AddressContext
  );

  const [addressItems, setAddressItems] = useState(remaining || address);
  const [addresModal, setAddressModal] = useState([false, '']);
  const [selectedAddress, setSelectedAddress] = useState(null)
  // const forceUpdate = React.useReducer(() => ({}))[1];

  useEffect(() => {
    setAddressItems(address);
  }, [address]);

  return (
    <div className='p-6'>
      <div className='flex justify-between w-full items-center'>
        <h3 className='text-xl font-bold'>Delivery Addresses</h3>
        <Button onClick={() => setAddressModal([true, 'create'])} primary rounded>
          Add a new address
        </Button>
      </div>
      <div className='w-full'>
        {loading && !addresModal[0] ? (
          <div className='fixed z-50 top-0 left-0 h-screen w-screen flex flex-col justify-center items-center bg-gray-500 bg-opacity-70'>
            <span
              style={{
                borderRightWidth: '2px',
                borderLeftWidth: '2px',
                borderRightColor: 'white',
              }}
              className='animate-spin rounded-full inline-block w-6 h-6 border-purple-700'
            ></span>
          </div>
        ) : null}
        <div className='flex justify-start flex-wrap mt-8 md:mt-4'>
          {addressItems.map((e) => (
            <AddressItem
              key={Math.random()}
              address={e.street + ', ' + e.city + ', ' + e.state}
              name={e.name}
              phone={e.phone}
              selected={e.selected}
              id={e.id}
              removeAddress={removeAddress}
              setAddressModal={setAddressModal}
              e_address={e}
              setSelectedAddress={setSelectedAddress}
            />
          ))}
        </div>
        {addresModal[0] && (
          <AddressModal
            modalOpen={addresModal}
            setModalOpen={setAddressModal}
            addAddress={addAddress}
            removeAddress={removeAddress}
            loading={loading}
            existing={selectedAddress}
            editAddress={editAddress}
          />
        )}
      </div>
    </div>
  );
}
