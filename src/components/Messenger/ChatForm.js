import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { client } from '../../feathers';

const ChatForm = () => {
  const user = useSelector(state => state.user.user);
  const room = useSelector(state => state.room.currentRoom);

  const [message, setMessage] = useState('');



  const handleSubmit = e => {
    e.preventDefault();

    client.service('messages').create({
      text: message,
      sender: user._id,
      roomId: room._id,
    }).then(() => {
      setMessage('');
    })
    
    
  };

  return (
    <Form className='d-flex align-items-center' onSubmit={handleSubmit}>
      <Form.Group controlId='message' className='d-block my-auto flex-grow-1 '>
        <Form.Control
          type='text'
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder='Type something...'
          className='py-4 chat-input rounded-lg'
          style={{ outline: 'none', border: '0' }}
          disabled={room.title === ''}
        />
      </Form.Group>
      <Button
        type='submit'
        size='lg'
        className='border-0 bg-transparent text-primary'
        disabled={room.title === ''}
      >
        <i
          style={{
            fontSize: '2rem',
          }}
          className='fas fa-arrow-circle-right'
        />
      </Button>
    </Form>
  );
};

export default ChatForm;
