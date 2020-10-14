import React from 'react';

import Button from 'react-bootstrap/Button';

import { useSelector } from 'react-redux';

const Messenger = () => {
  const room = useSelector(state => state.room.currentRoom);

  return (
    <div className='bg-white rounded-lg py-2 px-4 h-100 d-flex flex-column messenger'>
      <div className='py-4  d-flex align-items-center'>
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
      <div className='flex-grow-1'>Messages</div>
      <div>Input</div>
    </div>
  );
};

export default Messenger;
