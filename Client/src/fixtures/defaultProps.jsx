import React from 'react';
import { SmileOutlined, CrownOutlined } from '@ant-design/icons';


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
        access: 'canAdmin',
        component: './Admin',
        routes: [
          {
            path: '/process',
            name: '进程管理',
            icon: <SmileOutlined />,
            component: './Welcome',
          },
          {
            path: '/users',
            name: '用户管理',
            icon: <SmileOutlined />,
            component: './Welcome',
          },

        ],
      },
      {
        path: '/about',
        name: '关于',
        icon: <SmileOutlined />,
        component: './Welcome',
      },
    ],
  },
  location: {
    pathname: '/',
  },
};
