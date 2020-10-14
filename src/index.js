import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './store';

import 'normalize.css';
import './index.css';
import '../src/bootstrap.min.css';

const middlewareEnhancer = applyMiddleware(thunkMiddleware)
const store = createStore(rootReducer, composeWithDevTools(middlewareEnhancer))



ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,

  document.getElementById('root')
);


