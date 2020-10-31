import { SmileOutlined, CrownOutlined } from '@ant-design/icons';
import React from 'react';

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/monitor',
        name: '监控页',
        icon: <SmileOutlined />,
        component: './Welcome',
      },
      {
        path: '/admin',
        name: '管理页',
        icon: <CrownOutlined />,
        routes: [
          {
            path: '/admin/process',
            name: '进程管理',
            icon: <SmileOutlined />,
            component: './Welcome',
          },
          {
            path: '/admin/users',
            name: '用户管理',
            icon: <SmileOutlined />,
            layout: import('../components/Layout/AuthorizedLayout'),
            component: import('../pages/Users/Users'),
          },
        ],
      },
      {
        path: '/about',
        name: '关于',
        icon: <SmileOutlined />,
        component: './Welcome',
      },
      {
        path: '/login',
        hideInMenu: true,
        layout: import('../components/Layout/BlankLayout'),
        component: import('../pages/Users/Login'),
      },
    ],
  },
  location: {
    pathname: '/',
  },
};
