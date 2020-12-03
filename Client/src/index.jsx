import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import 'filepond/dist/filepond.min.css';
import { RecoilRoot } from 'recoil';
import { Router } from './common/route';
import { registerAxioInterceptors } from './services';
import './common/socket';
registerAxioInterceptors();
ReactDOM.render(
  <RecoilRoot>
    <Router />
  </RecoilRoot>,
  document.getElementById('root')
);
serviceWorker.unregister();

// TODO 消息
// TODO token超时bug
// TODO 消息
// TODO 消息
// TODO 消息
// TODO 消息
