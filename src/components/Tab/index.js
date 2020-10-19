import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { client } from '../../feathers';
import Conversation from './Conversation';
import MyPopover from './MyPopover';

import { updateUser, setFollowings } from '../../actions/user';
import { setRoom } from '../../actions/room';

const Tab = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user);

  //SET ERRORS
  const [error, setError] = useState('');

  //FETCHING FOLLOWED GROUPS FOR PARTICULAR USER
  useEffect(() => {
    client
      .service('rooms')
      .find()
      .then(res => {
        dispatch(setRoom(res.data[0]));
        dispatch(setFollowings(res.data));
      })
      .catch(err => {
        setError(err);
      });
  }, []);

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
  };



  return (
    <div className='d-flex flex-column align-items-center vh-100'>
      <div
        className='tab-scroll p-2'
        style={{
          overflowY: 'scroll',
          height: '50%',
        }}
      >
        <h6 className='font-weight-light text-secondary h6 text-center font-weight-normal'>
          Groups
        </h6>
        <div className='d-flex justify-content-center mb-2'>
          <MyPopover handleSubmit={handleSubmit} joinGroup={joinGroup} />
        </div>

        <div className='w-100 d-flex flex-column justify-content-center align-items-center '>
          {userData.followedGroups.map(group => (
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
