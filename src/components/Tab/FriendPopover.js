import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

import { client } from '../../feathers';

const FriendPopover = props => {
  //USER STATE
  const user = useSelector(state => state.user.user);

  //SET TRANSITIONS

  const [showResults, setShowResults] = useState(false);

  //ADD FRIEND
  const [userName, setUserName] = useState('');

  //USER RESULTS
  const [results, setResults] = useState([]);

  //SET POPOVER
  const [showPopover, setShowPopover] = useState(true);

  //   const handleSubmit = e => {
  //     e.preventDefault();

  //     props.handleSubmit(title, priv);
  //     setShowPopover(false);
  //   };

  //SEARCH FOR USER BY NAME
  const handleSearch = e => {
    e.preventDefault();

    console.log(userName);

    client
      .service('users')
      .find({
        query: {
          name: userName
        },
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  //   //BE MEMBER OF GROUP
  //   const beMember = roomData => {
  //     client
  //       .service('rooms')
  //       .patch(
  //         roomData._id,
  //         {
  //           $push: {
  //             participants: user._id
  //           },
  //         }
  //       )
  //       .then(res => {
  //         props.joinGroup(res)
  //       })
  //       .catch(err => console.log(err));
  //   };

  const popover = (
    <Popover
      id='popover-basic'
      className='rounded-lg bg-info border-0 p-2'
      style={{
        maxWidth: '325px',
        width: '100%',
      }}
    >
      <Popover.Title
        as='h3'
        className='bg-info text-white text-center  border-0'
      >
        Add Friend
      </Popover.Title>

      <Popover.Content className='d-flex flex-column justify-content-between my-2'>
        {showResults && (
          <ListGroup>
            {results.length > 0 ? (
              results.map(result => (
                <ListGroup.Item
                  key={result._id}
                  className='bg-primary text-white d-flex align-items-center justify-content-between border border-white rounded-lg mb-2'
                >
                  <Button
                    style={{
                      borderWidth: '3px',
                      borderColor: `${result.avatar}`,
                      color: `${result.avatar}`,
                    }}
                    className='bg-white rounded-circle font-weight-bolder mr-2'
                  >
                    {result.title.charAt(0).toUpperCase()}
                  </Button>
                  <h6 className='flex-grow-1 text-left align-self-end '>
                    {result.title}
                  </h6>
                  <Button className='bg-white text-primary rounded-lg'>
                    Join
                  </Button>
                </ListGroup.Item>
              ))
            ) : (
              <h5 className='text-center text-white'>No Group Found</h5>
            )}

            <div className='d-flex justify-content-between mt-2'>
              <Button
                className='rounded-lg bg-white text-primary'
                onClick={() => {
                  setShowResults(pr => !pr);

                  setResults([]);
                }}
              >
                Back
              </Button>
            </div>
          </ListGroup>
        )}{' '}
        {!showResults && (
          <Form className='p-2' onSubmit={handleSearch}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label className='text-white'>
                Search By User Name
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter a name'
                value={userName}
                onChange={e => setUserName(e.target.value)}
                className='border-0 rounded-lg bg-white text-info'
              />
            </Form.Group>

            <Button
              variant='primary'
              type='submit'
              disabled={userName === ''}
              block
              className='rounded-lg bg-white text-info mt-4 border-0'
            >
              Search
            </Button>
          </Form>
        )}
      </Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger
      rootClose={true}
      trigger='click'
      placement='right'
      overlay={popover}
      show={showPopover}
    >
      <Button
        style={{ borderWidth: '4px' }}
        className='text-info bg-white rounded-circle border-info'
        size='lg'
        onClick={() => setShowPopover(pr => !pr)}
      >
        <i className='fas fa-plus ' />
      </Button>
    </OverlayTrigger>
  );
};

export default FriendPopover;
