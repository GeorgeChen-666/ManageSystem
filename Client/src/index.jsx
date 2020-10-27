import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import store from './store';
import { Router } from './common/route';

ReactDOM.render(
  <Provider store={store}>{Router}</Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById('root')
);
serviceWorker.unregister();
