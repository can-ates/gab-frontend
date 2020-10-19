import React, { useState } from 'react';

import {useSelector} from 'react-redux'

import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

import { client } from '../../feathers';

const MyPopover = props => {
  //USER STATE
  const user = useSelector(state => state.user.user)

  //SET TRANSITIONS
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [showResults, setShowResults] = useState(false);

  //SEARCHING GROUP
  const [roomName, setRoomName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [results, setResults] = useState([]);

  //CREATING GROUP
  const [title, setTitle] = useState('');
  const [priv, setPriv] = useState(false);

  //SET POPOVER
  const [showPopover, setShowPopover] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    props.handleSubmit(title, priv);
    setShowPopover(false);
  };

  //SEARCH FOR GROUPS BY TITLE
  const handleSearch = e => {
    e.preventDefault();

    if (roomName) {
      client
        .service('rooms')
        .get(
          { id: '_' },
          {
            query: {
              title: roomName,
              private: false,
            },
          }
        )
        .then(res => {
          setShowJoin(false);
          setRoomName('');
          if (res.data) {
            setResults(res.data);
            setShowResults(true);
          }
        })
        .catch(err => console.log(err));
    }
  };

  //BE MEMBER OF GROUP
  const beMember = roomData => {
    client
      .service('rooms')
      .patch(
        roomData._id,
        {
          $push: {
            participants: user._id
          },
        }
      )
      .then(res => {
        props.joinGroup(res)
      })
      .catch(err => console.log(err));
  };

  const popover = (
    <Popover
      id='popover-basic'
      className='rounded-lg bg-primary border-0 p-2'
      style={{
        maxWidth: '325px',
        width: '100%',
      }}
    >
      <Popover.Title
        as='h3'
        className='bg-primary text-white text-center  border-0'
      >
        Add a New Group
      </Popover.Title>

      <Popover.Content className='d-flex flex-column justify-content-between my-2'>
        {/* CREATE PART */}
        {showCreate && (
          <Form className='p-2' onSubmit={handleSubmit}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label className='text-white'>Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter title'
                value={title}
                onChange={e => setTitle(e.target.value)}
                className='border-0 rounded-lg bg-white text-primary'
              />
            </Form.Group>

            <Form.Group className='custom-control custom-switch mb-4'>
              <input
                type='checkbox'
                className='custom-control-input '
                style={{
                  width: '2rem',
                }}
                value={priv}
                onChange={() => setPriv(pr => !pr)}
                id='customSwitch1'
              />
              <label
                className='custom-control-label text-white'
                htmlFor='customSwitch1'
              >
                Private
              </label>
            </Form.Group>
            <div className='d-flex justify-content-between'>
              <Button
                variant='text'
                className='rounded-lg bg-primary text-white'
                onClick={() => setShowCreate(pr => !pr)}
              >
                Back
              </Button>
              <Button
                variant='primary'
                type='submit'
                disabled={title === ''}
                className='rounded-lg bg-white text-primary w-50'
              >
                Create
              </Button>
            </div>
          </Form>
        )}{' '}
        {showJoin && (
          <Form className='p-2' onSubmit={handleSearch}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label className='text-white'>
                Search By Group Name
              </Form.Label>
              <Form.Control
                type='text'
                disabled={inviteCode}
                placeholder='Group Name'
                value={roomName}
                onChange={e => setRoomName(e.target.value)}
                className='border-0 rounded-lg bg-white text-primary'
              />
            </Form.Group>

            <h3 className='text-white text-center'>OR</h3>

            <Form.Group controlId='formBasicEmail' className='mb-4'>
              <Form.Label className='text-white'>
                Enter an Invite Code
              </Form.Label>
              <Form.Control
                type='text'
                disabled={roomName}
                placeholder='Invite Code'
                value={inviteCode}
                onChange={e => setInviteCode(e.target.value)}
                className='border-0 rounded-lg bg-white text-primary'
              />
            </Form.Group>
            <div className='d-flex justify-content-between'>
              <Button
                variant='text'
                className='rounded-lg bg-primary text-white'
                onClick={() => setShowJoin(pr => !pr)}
              >
                Back
              </Button>
              <Button
                variant='primary'
                type='submit'
                disabled={roomName === '' && inviteCode === ''}
                className='rounded-lg bg-white text-primary w-50'
              >
                {roomName ? 'Search' : inviteCode ? 'Join' : 'Search'}
              </Button>
            </div>
          </Form>
        )}{' '}
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
                  <Button
                    className='bg-white text-primary rounded-lg'
                    onClick={() => beMember(result)}
                  >
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
                  setShowJoin(pr => !pr);
                  setResults([]);
                }}
              >
                Back
              </Button>
            </div>
          </ListGroup>
        )}{' '}
        {!showResults && !showJoin && !showCreate && (
          <React.Fragment>
            {' '}
            <Button
              className='bg-white text-primary rounded-lg d-flex align-items-center'
              onClick={() => setShowCreate(pr => !pr)}
            >
              <i className='fas fa-hand-rock mr-2' />
              <span>Create My Own</span>
              <i className='fas fa-chevron-right flex-grow-1 text-right' />
            </Button>
            <Button
              className='bg-white text-primary rounded-lg d-flex align-items-center mt-4'
              onClick={() => setShowJoin(pr => !pr)}
            >
              <i className='fas fa-search-plus mr-2' />
              <span>Join a Group</span>
              <i className='fas fa-chevron-right flex-grow-1 text-right' />
            </Button>
          </React.Fragment>
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
        className='text-primary bg-white rounded-circle border-primary'
        size='lg'
        onClick={() => setShowPopover(pr => !pr)}
      >
        <i className='fas fa-plus ' />
      </Button>
    </OverlayTrigger>
  );
};

export default MyPopover;
