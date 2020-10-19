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
              message.sender.name === userData.user.name
                ? 'flex-end'
                : 'flex-start',
          }}
        >
          <Card
            className='rounded-lg border-0 position-relative p-2'
            style={{
              order: message.sender.name === userData.user.name ? '1' : '2',
              backgroundColor:
                message.sender.name === userData.user.name
                  ? '#6B3BB4'
                  : '#F5F5F5',
            }}
          >
            <Card.Body
              className='p-0'
              style={{
                zIndex: '3',
                color:
                  message.sender.name === userData.user.name
                    ? 'white'
                    : 'black',
              }}
            >
              <Card.Title
                style={{
                  textAlign:
                    message.sender.name === userData.user.name
                      ? 'start'
                      : 'end',
                  paddingLeft:
                    message.sender.name === userData.user.name ? '0.5em' : '0',
                  paddingRight:
                    message.sender.name === userData.user.name ? '0' : '0.5em',
                }}
                className='py-1 m-0 block'
                as='h6'
              >
                {message.sender.name}
              </Card.Title>
              <Card.Text className='p-2 z4'>{message.text}</Card.Text>
            </Card.Body>
            {message.sender.name === userData.user.name ? (
              <div
                className='position-absolute'
                style={{
                  zIndex: '2',
                  height: '10px',
                  width: '30px',
                  right: '-2px',
                  bottom: '11px',
                  transform: 'translateX(5px) rotate(50deg)',
                  backgroundColor: '#6B3BB4',
                }}
              />
            ) : (
              <div
                className='position-absolute'
                style={{
                  zIndex: '2',
                  height: '10px',
                  width: '30px',
                  left: '-2px',
                  bottom: '9px',
                  transform: 'translateX(-5px) rotate(130deg)',
                  backgroundColor: '#F5F5F5',
                }}
              />
            )}
          </Card>

          <Image
            className='align-self-end'
            style={{
              order: message.sender.name === userData.user.name ? '2' : '1',
              marginRight:
                message.sender.name === userData.user.name ? '0' : '1em',
              marginLeft:
                message.sender.name === userData.user.name ? '1em' : '0',
            }}
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
