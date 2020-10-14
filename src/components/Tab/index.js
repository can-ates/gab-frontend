import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { client } from '../../feathers';
import Conversation from './Conversation';

import { setRoom } from '../../actions/room';

const Tab = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  //SET ERRORS
  const [error, setError] = useState('');

  //FOLLOWED GROUPS
  const [groups, setGroups] = useState([]);

  //CREATING GROUP
  const [title, setTitle] = useState('');
  const [priv, setPriv] = useState(false);

  //REAL-TIME LISTENER FOR CREATED GROUPS
  useEffect(() => {
    client.service('rooms').on('followedGroups', res => {
      setGroups(res.groups);
      console.log(res.groups);
    });

    return function () {
      client.service('rooms').removeListener('followedGroups');
    };
  }, []);

  //FETCHING FOLLOWED GROUPS FOR PARTICULAR USER
  useEffect(() => {
    client
      .service('rooms')
      .find()
      .then(res => {
        dispatch(setRoom(res.data[0]));
        setGroups(res.data);
      })
      .catch(err => {
        setError(err);
      });
  }, []);

  //CREATE GROUPS
  const handleSubmit = async e => {
    e.preventDefault();

    client
      .service('rooms')
      .create({
        title: title,
        private: priv,
        founder: user._id,
      })
      .catch(res => {
        history.push('/');
      });
  };

  const popover = (
    <Popover id='popover-basic w-100 border-0 rounded-lg'>
      <Popover.Title as='h3' className='bg-primary text-white text-center px-0'>
        Create new group
      </Popover.Title>
      <Form className='p-2' onSubmit={handleSubmit}>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter title'
            value={title}
            onChange={e => setTitle(e.target.value)}
            className='border-0 rounded-lg bg-primary text-white'
          />
        </Form.Group>

        <Form.Group className='custom-control custom-switch'>
          <input
            type='checkbox'
            className='custom-control-input'
            style={{
              width: '2rem',
            }}
            value={priv}
            onChange={() => setPriv(pr => !pr)}
            id='customSwitch1'
          />
          <label className='custom-control-label' htmlFor='customSwitch1'>
            Private
          </label>
        </Form.Group>
        <Button
          variant='primary'
          type='submit'
          className='rounded-lg bg-primary text-white w-100 '
        >
          Submit
        </Button>
      </Form>
    </Popover>
  );

  return (
    <div className='d-flex flex-column align-items-center '>
      <div
        className='h-50 tab-scroll p-2'
        style={{
          overflow: 'auto',
        }}
      >
        <h6 className='font-weight-light text-secondary h6 text-center font-weight-normal'>
          Groups
        </h6>
        <div className='d-flex justify-content-center mb-2'>
          <OverlayTrigger
            rootClose={true}
            trigger='click'
            placement='right'
            overlay={popover}
          >
            <Button
              style={{ borderWidth: '4px' }}
              className='text-primary bg-white rounded-circle border-primary'
              size='lg'
            >
              <i className='fas fa-plus ' />
            </Button>
          </OverlayTrigger>
        </div>

        <div className='w-100 d-flex flex-column justify-content-center align-content-center '>
          {groups.map(group => (
            <Conversation key={group._id} conversation={group} />
          ))}
        </div>
      </div>
      <div className='h-50'>
        <h6 className='font-weight-light text-secondary text-center font-weight-normal'>
          People
        </h6>
      </div>
    </div>
  );
};

export default Tab;
