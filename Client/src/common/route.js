import React from 'react';
import _ from 'lodash';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import BasicLayout from '../layout/BasicLayout';
import Users from '../pages/Users';
import menuData from './menu';

const routeData = _.get(menuData, ['route', 'routes']);
console.log(routeData);
export const Router = (
  <BrowserRouter>
    <Switch>
      <Route path="/admin/users">
        <BasicLayout>
          <Users />
        </BasicLayout>
      </Route>
      <Redirect exact from="/" to="/monitor" />
    </Switch>
  </BrowserRouter>
);
