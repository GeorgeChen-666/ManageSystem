import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import { RecoilRoot } from 'recoil';
import { Router } from './common/route';
import { registerAxioInterceptors } from './services';
registerAxioInterceptors();
ReactDOM.render(
  <RecoilRoot>
    <Router />
  </RecoilRoot>,
  document.getElementById('root')
);
serviceWorker.unregister();
