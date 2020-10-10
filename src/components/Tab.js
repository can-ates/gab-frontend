import React, { useState } from 'react';
import {useSelector} from 'react-redux'

import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import client from '../feathers'

const Tab = () => {
  const user = useSelector(state => state.user)

  const [title, setTitle] = useState('');
  const [priv, setPriv] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();


    client.service('rooms').create({
      title: title,
      private: priv,
      founder: user._id
    }).then((res) => {
      console.log(res);
    }).catch((res) => {
      console.log(res);
    })
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
    <div className='d-flex flex-column align-items-center'>
      <div className='h-50'>
        <h6 className='font-weight-light text-secondary h6'>Groups</h6>
        <OverlayTrigger
          rootClose={true}
          trigger='click'
          placement='right'
          overlay={popover}
        >
          <Button
            className='text-primary bg-white rounded-circle border border-primary'
            size='lg'
          >
            <i className='fas fa-plus ' />
          </Button>
        </OverlayTrigger>
      </div>
      <div className='h-50'>
        <p className='font-weight-light text-secondary '>People</p>
      </div>
    </div>
  );
};

export default Tab;
