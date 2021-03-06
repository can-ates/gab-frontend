import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';

import { useSelector, useDispatch } from 'react-redux';
import ChatForm from './ChatForm';
import Messages from './Messages';
import Conversation from '../Tab/Conversation';
import GroupPopover from '../Tab/GroupPopover';
import Detail from '../Detail';

import { setFollowings, updateUser } from '../../actions/user';
import { setRoom } from '../../actions/room';

import { client } from '../../feathers';

const Messenger = () => {
  const room = useSelector(state => state.room.currentRoom);
  const user = useSelector(state => state.user.user);
  const userData = useSelector(state => state.user);

  const dispatch = useDispatch();

  //LEFT BAR
  const [leftBar, setLeftBar] = useState(false);
  //RIGHT BAR
  const [rightBar, setRightBar] = useState(false);
  //ERRORS
  const [error, setError] = useState([]);

  //CREATE GROUPS
  const handleSubmit = async (title, priv) => {
    client
      .service('rooms')
      .create({
        title: title,
        private: priv,
        founder: userData._id,
      })
      .then(res => {
        dispatch(setRoom(res));
        dispatch(updateUser(res));
      })
      .catch(err => {
        setError(err);
      });
  };

  const joinGroup = room => {
    dispatch(updateUser(room));

    client
      .service('rooms')
      .find()
      .then(res => {
        dispatch(setFollowings(res.data));
      })
      .catch(err => {
        setError(err);
      });
  };

  return (
    <div className='bg-white rounded-lg vh-100 d-flex flex-column messenger'>
      {/* LEFT SIDE BAR */}
      {leftBar && (
        <nav
          style={{
            overflowY: 'scroll',
          }}
          className='left-bar vh-100 d-md-none d-block d-flex flex-column align-items-center tab-scroll p-2'
        >
          <h6 className=' text-primary text-center font-weight-normal'>
            Groups
          </h6>
          <div className='d-flex justify-content-center mb-2'>
            <GroupPopover handleSubmit={handleSubmit} joinGroup={joinGroup} />
          </div>
          <div className='d-flex flex-column justify-content-center align-items-center px-3'>
            {userData.followedGroups.map(group => (
              <Conversation key={group._id} conversation={group} />
            ))}
          </div>
        </nav>
      )}

      {/* BACKGROUND */}
      <div
        className='toggle-sidebar'
        onClick={() => {
          setLeftBar(false);
          setRightBar(false);
        }}
        style={{
          display: rightBar || leftBar ? 'block' : 'none',
        }}
      />
      {/* RIGHT SIDE BAR */}
      {rightBar && (
        <nav className='right-bar d-md-none d-sm-block d-flex flex-column align-items-center tab-scroll p-2'>
          <Detail device='mobile' user={user} />
        </nav>
      )}

      <div
        style={{
          backgroundColor: '#dde4fc',
        }}
        className='px-md-4 d-flex align-items-center justify-content-between justify-content-md-start border-bottom'
      >
        <Button
          style={{
            backgroundColor: '#8ca7f8',
          }}
          className='d-md-none d-block border-0 h-100 font-weight-bold rounded-sm py-0'
          onClick={() => setLeftBar(pr => !pr)}
        >
          <i
            style={{
              fontSize: '1.5rem',
            }}
            className='fas fa-door-open px-2'
          />
        </Button>
        {room.title ? (
          <div className='d-flex flex-column flex-md-row align-items-center py-2'>
            <Button
              style={{
                borderWidth: '3px',
                borderColor: `${room.avatar}`,
                color: `${room.avatar}`,
              }}
              className='bg-white rounded-circle font-weight-bolder'
              size='lg'
              disabled
            >
              {room.title.charAt(0).toUpperCase()}
            </Button>

            <h6 className='mb-0 ml-2 text-break'>{room.title}</h6>
          </div>
        ) : (
          <div className='d-flex align-items-center py-3 text-center '>
            <h6>Create or Join a group</h6>
          </div>
        )}

        <Button
          style={{
            backgroundColor: '#8ca7f8',
          }}
          className='d-md-none d-block border-0 h-100 font-weight-bold rounded-sm py-0 '
          onClick={() => setRightBar(pr => !pr)}
        >
          <i
            style={{
              fontSize: '1.5rem',
            }}
            className='px-2 fas fa-user-friends'
          />
        </Button>
      </div>
      <div
        className='flex-grow-1 p-4 scrollListener'
        style={{
          overflowY: 'scroll',
          height: '100%',
          backgroundColor: '#FAFAFA',
        }}
      >
        <Messages />
      </div>
      <div className='px-4 py-2 border-top'>
        <ChatForm />
      </div>
    </div>
  );
};

export default Messenger;
