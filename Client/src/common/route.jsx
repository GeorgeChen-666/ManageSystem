import React from 'react';
import Loadable from 'react-loadable';
import _ from 'lodash';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {routeItems} from './menu';

function getComponent(param) {
  if (param instanceof Promise) {
    return Loadable({
      loader: () => param,
      loading: () => <div>loading...</div>,
    })
  } else if (typeof param === 'function') {
    return param;
  }
  return null;
}

function getFlatMenuData(menus, layout) {
  let itemDatas = [];
  menus.forEach((item) => {
    const newItem = {...item};
    newItem.component = getComponent(newItem.component);
    newItem.layout = getComponent(newItem.layout) || layout
    if (newItem.component) {
      newItem.strict = true;
      itemDatas.push(newItem);
    }
    if (item.routes) {
      const subDatas = getFlatMenuData(item.routes, newItem.layout);
      subDatas.forEach((data) => {
        itemDatas.push(data);
      });
    }
  });
  return itemDatas;
}

const menuItemData = getFlatMenuData(_.get(routeItems, ['routes'], []));
console.log('menuItemData', menuItemData)
export const Router = () => (
  <BrowserRouter>
    <Switch>
      {menuItemData
        .filter((e) => e.layout)
        .map((item) => (
          <Route key={item.path} path={item.path}>
            <item.layout>
              {item.component && (
                <Route key={item.path} path={item.path}>
                  <item.component/>
                </Route>
              )}
            </item.layout>
          </Route>
        ))}
      <Redirect exact from="/" to="/manage/monitor"/>
    </Switch>
    {/*<Switch>*/}
    {/*{menuItemData*/}
    {/*.filter((e) => e.layout)*/}
    {/*.map((layoutItem) => (*/}
    {/*<Route key={layoutItem.path} path={layoutItem.path}>*/}
    {/*<layoutItem.layout>*/}
    {/*<Switch>*/}
    {/*{menuItemData*/}
    {/*.map(*/}
    {/*(item) =>*/}
    {/*item.component && (*/}
    {/*<Route key={item.path} path={item.path}>*/}
    {/*<item.component/>*/}
    {/*</Route>*/}
    {/*)*/}
    {/*)*/}
    {/*.filter((e) => e)}*/}
    {/*</Switch>*/}
    {/*</layoutItem.layout>*/}
    {/*</Route>*/}
    {/*))}*/}
    {/*<Redirect exact from="/" to="/manage/monitor"/>*/}
    {/*</Switch>*/}
  </BrowserRouter>
);
