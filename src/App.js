import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Home = React.lazy(() => import('./pages'));
const Chat = React.lazy(() => import('./pages/Chat'));



const App = () => {
  return (
    <Router>
      {/* <div style={{ position: 'fixed' }}>
        <Link to='/chat'>Chat</Link>
        <Link to='/'>Home</Link>
      </div> */}

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
};

export default App;
