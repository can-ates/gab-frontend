import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

import { client } from '../../feathers';

const FriendPopover = props => {
  //USER STATE
  const user = useSelector(state => state.user.user);

  //SET TRANSITIONS

  const [showResults, setShowResults] = useState(false);

  //ADD FRIEND
  const [email, setEmail] = useState('');

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

    client
      .service('users')
      .find({
        query: {
          email: email,
          $select: ['avatar', 'name', 'email', '_id'],
          $limit: 5,
        },
      })
      .then(res => {
        setEmail('');
        if (res.data) {
          setResults(res.data);
          setShowResults(true);
        }
      })
      .catch(err => console.log(err));
  };

  //   //BE MEMBER OF GROUP
  const sendRequest = userData => {
    client
      .service('users')
      .patch(userData._id, {
        $push: {
          notifications: user._id,
        },
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

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
                  className='bg-info text-white d-flex align-items-center justify-content-between border border-white rounded-lg mb-2'
                >
                  <Image src={result.avatar} width='35' height='35' />
                  <h6 className='flex-grow-1 text-left ml-2'>{result.name}</h6>
                  <Button
                    className='bg-white text-info rounded-lg border-0'
                    onClick={() => sendRequest(result)}
                  >
                    Send Request
                  </Button>
                </ListGroup.Item>
              ))
            ) : (
              <h5 className='text-center text-white'>No one found</h5>
            )}

            <Button
              className='rounded-lg bg-white text-info border-0 mt-3'
              block
              onClick={() => {
                setShowResults(pr => !pr);

                setResults([]);
              }}
            >
              Back
            </Button>
          </ListGroup>
        )}{' '}
        {!showResults && (
          <Form className='p-2' onSubmit={handleSearch}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label className='text-white'>Search By Email</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter an email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='border-0 rounded-lg bg-white text-info'
              />
            </Form.Group>

            <Button
              variant='primary'
              type='submit'
              disabled={email === ''}
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
