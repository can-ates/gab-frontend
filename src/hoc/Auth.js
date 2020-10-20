import React, { useLayoutEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addUser } from '../actions/user';
import { client } from '../feathers';

export default function (WrappedComponent) {
  const Auth = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    //LOGIN ERROR
    const [error, setError] = useState('')

    useLayoutEffect(() => {
      client
        .reAuthenticate()
        .then(doc => {
          dispatch(addUser(doc.user));
          history.push('/chat');
        })
        .catch(err => {
          setError(err)
          history.push('/');
        });
    }, []);

    return <WrappedComponent errors={error} />;
  };

  return Auth;
}
