import { SmileOutlined, CrownOutlined } from '@ant-design/icons';
import React from 'react';
import _ from 'lodash';

export const routeItems = {
  path: '/',
  routes: [
    {
      path: '/manage',
      layout: import('../components/Layout/DefaultLayout'),
      routes: [
        {
          path: '/manage/monitor',
          name: '监控页',
          icon: <SmileOutlined />,
        },
        {
          path: '/manage/admin/process',
          name: '进程管理',
          icon: <SmileOutlined />,
        },
        {
          path: '/manage/admin/users',
          name: '用户管理',
          icon: <SmileOutlined />,
          component: import('../pages/Users/ManageUsers'),
          routes: [
            {
              path: '/manage/admin/users/add',
              name: '新增用户',
              hideInMenu: true,
              //component: import('../pages/Users/ManageUsers'),
            },
            {
              path: '/manage/admin/users/modify/:id',
              name: '编辑用户',
              hideInMenu: true,
              //component: import('../pages/Users/ManageUsers'),
            },
          ],
        },
        {
          path: '/manage/about',
          name: '关于',
          icon: <SmileOutlined />,
        },
      ],
    },
    {
      path: '/login',
      hideInMenu: true,
      layout: import('../components/Layout/BlankLayout'),
      component: import('../pages/Users/Login'),
    },
  ],
};

export const routeMenus = {
  route: {
    path: '/',
    routes: _.get(routeItems, ['routes', 0, 'routes']),
  },
  location: {
    pathname: '/',
  },
};
