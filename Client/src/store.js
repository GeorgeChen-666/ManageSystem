import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'

const middleware = [ ];
if (process.env.NODE_ENV !== 'production') {
  //middleware.push(createLogger());
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)


//export default