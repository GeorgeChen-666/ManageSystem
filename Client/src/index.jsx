import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { store, persisted } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from './common/route';
import { registerAxioInterceptors } from './services';
registerAxioInterceptors(store);
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persisted}>
      {(bootstrapped) => {
        return bootstrapped && Router;
      }}
    </PersistGate>
  </Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById('root')
);
serviceWorker.unregister();
