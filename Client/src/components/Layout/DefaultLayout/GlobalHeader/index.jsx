import { Avatar } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Dropdown, Spin, Menu } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  CloseCircleOutlined,
  LogoutOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import useCurrentUser from '../../../Hooks/useCurrentUser';

// export default () => (
//   <div>
//     <Avatar shape="square" size="small" icon={<UserOutlined />} />
//   </div>
// );
const isMobile = false;
const collapsed = false;
export default () => {
  const { getCurrentUser } = useCurrentUser();
  const currentUser = getCurrentUser();
  const menu = (
    <Menu selectedKeys={[]}>
      <Menu.Item disabled>
        <UserOutlined />
        个人中心
      </Menu.Item>
      <Menu.Item disabled>
        <SettingOutlined />
        设置
      </Menu.Item>
      <Menu.Item key="triggerError">
        <CloseCircleOutlined />
        触发报错
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <div>
        {currentUser ? (
          <Dropdown overlay={menu}>
            <span>
              <Avatar
                size="small"
                src={
                  'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
                }
              />
              <span>{currentUser.username}</span>
            </span>
          </Dropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8 }} />
        )}
      </div>
    </div>
  );
};
