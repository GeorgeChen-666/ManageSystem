import { createStore, applyMiddleware } from 'redux';
import reducer from './models';
import createAuthorized from './middlewares/Authorized';
import createTest from './middlewares/test';
const middleware = [];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createAuthorized());
}
middleware.push(createTest());
const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
