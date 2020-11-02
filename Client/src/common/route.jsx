import React from 'react';
import Loadable from 'react-loadable';
import _ from 'lodash';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import DefaultLayout from '../components/Layout/DefaultLayout';
import { routeItems } from './menu';

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
    }
    if (typeof newItem.layout === 'object') {
      const layoutPromise = newItem.layout;
      newItem.layout = Loadable({
        loader: () => layoutPromise,
        loading: () => <div>loading...</div>,
      });
    }
    if (!newItem.layout && !newItem.component) {
      return;
    }
    keys.push(newItem);
    if (item.routes) {
      keys = keys.concat(getFlatMenuData(item.routes));
    }
  });
  return keys;
}
const menuItemData = getFlatMenuData(_.get(routeItems, ['routes'], []));
console.log(menuItemData);
export const Router = (
  <BrowserRouter>
    <Switch>
      {menuItemData
        .filter((e) => e.layout)
        .map((layoutItem) => (
          <Route key={layoutItem.path} path={layoutItem.path}>
            <layoutItem.layout>
              <Switch>
                {menuItemData
                  .map(
                    (item) =>
                      item.component && (
                        <Route key={item.path} path={item.path}>
                          <item.component />
                        </Route>
                      )
                  )
                  .filter((e) => e)}
              </Switch>
            </layoutItem.layout>
          </Route>
        ))}
      <Redirect exact from="/" to="/manage/monitor" />
    </Switch>
  </BrowserRouter>
);
