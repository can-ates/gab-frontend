import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

import { client } from '../../feathers';

const Messages = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    setMessages(room.messages);
  }, [room]);

  //REAL-TIME LISTENER FOR CREATED MESSAGES
  useEffect(() => {
    //AUTOSCROLL AFTER EVERY MESSAGE
    let scroll = document.querySelector('.scrollListener');

    scroll.maxScrollTop = scroll.scrollHeight - scroll.offsetHeight;

    
    client.service('rooms').on('reflectMessages', res => {
      setMessages(res.messages);

      if (scroll.maxScrollTop - scroll.scrollTop <= scroll.offsetHeight) {
        scroll.scrollTop = scroll.scrollHeight;
      }
    });
  }, [room]);

  return (
    <React.Fragment>
      {messages
        ? messages.map(message => (
            <div
              key={message._id}
              className='d-flex mb-3'
              style={{
                justifyContent:
                  message.sender.name === user.name ? 'flex-end' : 'flex-start',
              }}
            >
              <Card
                className='rounded-lg position-relative '
                style={{
                  backgroundColor:
                    message.sender.name === user.name ? '#6B3BB4' : '#98969E',
                }}
              >
                <Card.Body
                  style={{
                    color:
                      message.sender.name === user.name ? 'white' : 'black',
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
                      message.sender.name === user.name ? '#6B3BB4' : '#98969E',
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
          ))
        : 'Fetching'}
    </React.Fragment>
  );
};

export default Messages;
