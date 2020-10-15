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
import Users from './pages/Users'

ReactDOM.render(
  <React.StrictMode>
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
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);
serviceWorker.unregister();
