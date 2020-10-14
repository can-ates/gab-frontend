import { combineReducers } from 'redux'
import user from './reducers/user';
import room from './reducers/room'

const rootReducer = combineReducers({
  user,
  room
});

export default rootReducer
