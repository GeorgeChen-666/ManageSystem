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
          component: () => <div>监控页</div>,
        },
        {
          path: '/manage/admin',
          name: '管理页',
          icon: <CrownOutlined />,
          routes: [
            {
              path: '/manage/admin/process',
              name: '进程管理',
              icon: <SmileOutlined />,
              component: import('../pages/Processes/ManageProcesses'),
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
                },
                {
                  path: '/manage/admin/users/modify/:id',
                  name: '编辑用户',
                  hideInMenu: true,
                },
              ],
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
