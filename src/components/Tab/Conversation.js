import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useDispatch } from 'react-redux';

//ACTION
import { setRoom } from '../../actions/room';

const Conversation = ({ conversation }) => {
  const dispatch = useDispatch();

  const handleRoom = () => {
    dispatch(setRoom(conversation));
  };

  return (
    <Button
      style={{
        borderWidth: '3px',
        borderColor: `${conversation.avatar}`,
        color: `${conversation.avatar}`,
      }}
      className='bg-white rounded-circle font-weight-bolder mb-2'
      size='lg'
      onClick={handleRoom}
    >
      {conversation.title.charAt(0).toUpperCase()}
    </Button>
  );
};

export default Conversation;
