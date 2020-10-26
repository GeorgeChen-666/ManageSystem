import React from 'react';
import Loadable from 'react-loadable';
import _ from 'lodash';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import BasicLayout from '../layout/BasicLayout';
import Users from '../pages/Users';
import menuData from './menu';
function getFlatMenuData(menus) {
  let keys = [];
  menus.forEach((item) => {
    const newItem = { ...item };
    console.log(typeof newItem.component);
    if (typeof newItem.component === 'object') {
      const componentPromise = newItem.component;
      newItem.component = Loadable({
        loader: () => componentPromise,
        loading: () => <div>loading...</div>,
      });
    } else if (newItem.component) {
      newItem.component = <div>{newItem.component}</div>;
    }
    keys.push(newItem);
    if (item.routes) {
      keys = keys.concat(getFlatMenuData(item.routes));
    }
  });
  return keys;
}

const menuItemData = getFlatMenuData(_.get(menuData, ['route', 'routes'], []));

export const Router = (
  <BrowserRouter>
    <Switch>
      {menuItemData.map((item) => {
        const Component = item.component;
        if (!!Component) {
          return (
            <Route path={item.path}>
              <BasicLayout>
                <Component />
              </BasicLayout>
            </Route>
          );
        }
      })}
      <Redirect exact from="/" to="/monitor" />
    </Switch>
  </BrowserRouter>
);
