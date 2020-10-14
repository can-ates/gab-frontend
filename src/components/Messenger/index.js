import React from 'react';

import Button from 'react-bootstrap/Button';

import { useSelector } from 'react-redux';
import ChatForm from './ChatForm';

const Messenger = () => {
  const room = useSelector(state => state.room.currentRoom);


  return (


    <div className='bg-white rounded-lg h-100 d-flex flex-column messenger'>
      <div className='px-4 py-3  d-flex align-items-center border-bottom'>
        <Button
          style={{
            borderWidth: '3px',
            borderColor: `${room.avatar}`,
            color: `${room.avatar}`,
          }}
          className='bg-white rounded-circle font-weight-bolder mb-2'
          size='lg'
          disabled
        >
          {room.title.charAt(0).toUpperCase()}
        </Button>
        <div className='ml-2'>
          <h6 className='mb-0'>{room.title}</h6>
          <span className='font-weight-light text-secondary'>
            {room.participants.length} members
          </span>
        </div>
      </div>
      <div className='flex-grow-1 p-4'>Messages</div>
      <div className='px-4 py-2 border-top'>
        <ChatForm />
      </div>
    </div>
  );
};

export default Messenger;
