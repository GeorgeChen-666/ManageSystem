import React from 'react';
import {Dropdown, Menu} from 'antd';
import {DownOutlined} from '@ant-design/icons';
const menu = (
  <Menu>
    <Menu.Item>
      <a>编辑</a>
    </Menu.Item>
    <Menu.Item>
      <a>删除</a>
    </Menu.Item>
  </Menu>
);
export default () => (
  <Dropdown overlay={menu}>
    <a>
      更多 <DownOutlined/>
    </a>
  </Dropdown>
);