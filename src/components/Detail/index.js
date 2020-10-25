import React from 'react';
import Figure from 'react-bootstrap/Figure';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { useSelector } from 'react-redux';

const Detail = ({ user }) => {
  const room = useSelector(state => state.room.currentRoom);

  return (
    <div className='w-100'>
      <Figure className='d-flex align-items-center flex-column'>
        <Figure.Image
          src={user.avatar}
          alt={`image of ${user.name}`}
          style={{ height: '6rem' }}
          className='img-fluid rounded-circle'
        />
        <p className='text-center font-weight-bolder text-primary h4 mt-2'>
          {user.name}
        </p>
      </Figure>
      {room.title && (
        <div className='rounded-lg '>
          <h6 className='text-start mb-3 '>Members</h6>
          <ListGroup>
            <ListGroup.Item
              key={room.founder._id}
              className='d-flex justify-content-between align-items-center rounded-lg border-left-0 border-right-0 border-top-0 border border-info w-100'
              style={{
                backgroundColor: '#f3f6ff',
              }}
            >
              <Image roundedCircle height='50px' src={room.founder.avatar} />
              <h5 className='text-dark m-0'>{room.founder.name}</h5>
            </ListGroup.Item>
            {room.participants.map(participant => (
              <ListGroup.Item
                key={participant._id}
                className='d-flex justify-content-between align-items-center rounded-lg border-left-0 border-right-0 border-top-0 border border-info w-100'
                style={{
                  backgroundColor: '#f3f6ff',
                }}
              >
                <Image roundedCircle height='50px' src={participant.avatar} />
                <h5 className='text-dark m-0'>{participant.name}</h5>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
    </div>
  );
};

export default Detail;
