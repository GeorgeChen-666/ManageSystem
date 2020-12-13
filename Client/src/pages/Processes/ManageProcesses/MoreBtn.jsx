import React from 'react';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default ({ match, item }) => {
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to={`${match.path}/modify/${item.id}`}>编辑</Link>
      </Menu.Item>
      <Menu.Item>
        <a>删除</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <a>
        操作 <DownOutlined />
      </a>
    </Dropdown>
  );
};
