import { combineReducers } from 'redux';
import demo from './demo';
import Users from './Users';
import Errors from './Errors';

export default combineReducers({
  demo,
  Users,
  Errors
});
