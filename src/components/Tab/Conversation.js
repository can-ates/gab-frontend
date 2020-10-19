import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useDispatch, useSelector } from 'react-redux';

//ACTION
import { setRoom } from '../../actions/room';

const Conversation = ({ conversation }) => {
  const room = useSelector(state => state.room.currentRoom)
  const dispatch = useDispatch();

  const handleRoom = () => {
    dispatch(setRoom(conversation));
  };

  return (
    <Button
      className={`bg-white rounded-circle font-weight-bolder mb-2 group-card ${room._id === conversation._id ? 'active' : null}`}
      style={{
        position: 'relative',
        borderWidth: '3px',
        height: '100%',
        width: '100%',
        borderColor: `${conversation.avatar}`,
        color: `${conversation.avatar}`,
      }}
      size='lg'
      onClick={handleRoom}
    >
     

      {conversation.title.charAt(0).toUpperCase()}
    </Button>
  );
};

export default Conversation;
