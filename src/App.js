import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import io from 'socket.io-client';
import feathers from '@feathersjs/client';

const socket = io('http://localhost:3030');
const client = feathers();

client.configure(feathers.socketio(socket));
client.configure(
  feathers.authentication({
    storage: window.localStorage,
  })
);

const Home = React.lazy(() => import('./pages'));
const Chat = React.lazy(() => import('./pages/Chat'));

function App() {
  useEffect(() => {
    client
      .reAuthenticate()
      .then(doc => {
        console.log(doc);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <Router>
      <div style={{position: 'fixed'}}>
        <Link to='/chat'>Chat</Link>
        <Link to='/'>Home</Link>
      </div>

      <Switch>
        <Route path='/' exact>
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        </Route>
        <Route path='/chat' exact>
          <Suspense fallback={<div>Loading...</div>}>
            <Chat />
          </Suspense>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
