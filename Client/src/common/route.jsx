import React from 'react';
import Loadable from 'react-loadable';
import _ from 'lodash';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import DefaultLayout from '../components/Layout/DefaultLayout';
import {routeMenus} from './menu';
function getFlatMenuData(menus) {
  let keys = [];
  menus.forEach((item) => {
    const newItem = { ...item };
    if (typeof newItem.component === 'object') {
      const componentPromise = newItem.component;
      newItem.component = Loadable({
        loader: () => componentPromise,
        loading: () => <div>loading...</div>,
      });
    } else if (newItem.component) {
      newItem.component = () => <div>{newItem.component}</div>;
    }
    keys.push(newItem);
    if (item.routes) {
      keys = keys.concat(getFlatMenuData(item.routes));
    }
  });
  return keys;
}

const menuItemData = getFlatMenuData(_.get(routeMenus, ['route', 'routes'], []));

export const Router = (
  <BrowserRouter>
    <DefaultLayout>
      <Switch>
        {menuItemData.map((item) => {
          const Component = item.component;
          if (!!Component) {
            return (
              <Route key={item.path} path={item.path}>
                <Component />
              </Route>
            );
          }
          return null;
        })}
        <Redirect exact from="/" to="/manage/monitor" />
      </Switch>
    </DefaultLayout>
  </BrowserRouter>
);
