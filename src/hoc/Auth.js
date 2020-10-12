import React, { useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addUser } from '../reducers/actions';
import { client } from '../feathers';

export default function (WrappedComponent) {
  const Auth = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useLayoutEffect(() => {
      client
        .reAuthenticate()
        .then(doc => {
          dispatch(addUser(doc.user));
          history.push('/chat');
        })
        .catch(err => {
          history.push('/');
        });
    }, []);

    return <WrappedComponent />;
  };

  return Auth;
}
