import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import BasicLayout from './layout/BasicLayout';
import defaultProps from './fixtures/defaultProps';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Provider } from 'react-redux'
import Users from './pages/Users'
//bac27dd40cb6f6de46292cc30a926d06f317c93d
ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <Router>
        <BasicLayout {...defaultProps}>
          <Switch>
            <Route path="/users">
              <Users />
            </Route>
            <Redirect exact from="/" to="/monitor" />
          </Switch>
        </BasicLayout>
      </Router>
    </Provider>
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);
serviceWorker.unregister();
