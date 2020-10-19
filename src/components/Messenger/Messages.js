import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

import { updateGroup } from '../../actions/user';

import { client } from '../../feathers';

const Messages = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user);
  const room = useSelector(state => state.room.currentRoom);

  //TODO ASSIGN NEW CREATED ROOM TO SOCKET CHANNEL

  //REAL-TIME LISTENER FOR CREATED MESSAGES
  useEffect(() => {
    //AUTOSCROLL AFTER EVERY MESSAGE
    let scroll = document.querySelector('.scrollListener');

    scroll.maxScrollTop = scroll.scrollHeight - scroll.offsetHeight;

    client.service('rooms').on('reflectMessages', res => {
      dispatch(updateGroup(res));

      if (scroll.maxScrollTop - scroll.scrollTop <= scroll.offsetHeight) {
        scroll.scrollTop = scroll.scrollHeight;
      }
    });
  }, [room]);

  return (
    <React.Fragment>
      {room.messages.map(message => (
        <div
          key={message._id}
          className='d-flex mb-3'
          style={{
            justifyContent:
              message.sender.name === userData.user.name ? 'flex-end' : 'flex-start',
          }}
        >
          <Card
            className='rounded-lg position-relative '
            style={{
              backgroundColor:
                message.sender.name === userData.user.name ? '#6B3BB4' : '#98969E',
            }}
          >
            <Card.Body
              style={{
                color: message.sender.name === userData.user.name ? 'white' : 'black',
              }}
            >
              {message.text}
            </Card.Body>
            <div
              className='position-absolute'
              style={{
                height: '10px',
                width: '30px',
                right: '-2px',
                bottom: '9px',
                transform: 'translateX(5px) rotate(50deg)',
                backgroundColor:
                  message.sender.name === userData.user.name ? '#6B3BB4' : '#98969E',
              }}
            />
          </Card>

          <Image
            className='align-self-end ml-2'
            src={message.sender.avatar}
            roundedCircle
            width='30px'
          />
        </div>
      ))}
    </React.Fragment>
  );
};

export default Messages;
