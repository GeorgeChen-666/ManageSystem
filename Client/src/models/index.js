import { combineReducers } from 'redux';
import demo from './demo';
import Users from './Users';
import Errors from './Errors';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
export default combineReducers({
  demo,
  Users: persistReducer(
    {
      key: Users.name,
      storage,
      whitelist: ['token', 'login'],
    },
    Users
  ),
  Errors,
});
