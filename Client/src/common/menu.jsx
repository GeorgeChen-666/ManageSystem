import {SmileOutlined, CrownOutlined} from '@ant-design/icons';
import React from 'react';
import _ from 'lodash'

export const routeItems = {
  path: '/',
  routes: [
    {
      path: '/manage',
      layout: import('../components/Layout/DefaultLayout'),
      routes:[
        {
          path: '/manage/monitor',
          name: '监控页',
          icon: <SmileOutlined/>,
          component: './Welcome',
        },
        {
          path: '/manage/admin/process',
          name: '进程管理',
          icon: <SmileOutlined/>,
          component: './Welcome',
        },
        {
          path: '/manage/admin/users',
          name: '用户管理',
          icon: <SmileOutlined/>,
          component: import('../pages/Users/Users'),
        },
        {
          path: '/manage/about',
          name: '关于',
          icon: <SmileOutlined/>,
          component: './Welcome',
        },
      ]
    },
    {
      path: '/login',
      hideInMenu: true,
      layout: import('../components/Layout/BlankLayout'),
      component: import('../pages/Users/Login'),
    },
  ]
};

export const routeMenus = {
  route: {
    path: '/',
    routes: _.get(routeItems,['routes',0,'routes']),
  },
  location: {
    pathname: '/',
  },
};
