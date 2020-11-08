import { createStore, applyMiddleware } from 'redux';
import reducer from './models';
import { persistStore } from 'redux-persist';
const middleware = [];

const store = createStore(reducer, applyMiddleware(...middleware));
window.store = store;
const persisted = persistStore(store);
export { store, persisted };
