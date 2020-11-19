import React from 'react';
import { List, Avatar } from 'antd';
import MoreBtn from './MoreBtn';
import { getLabelFromTimeStamp } from '../../../utils/dateUtils';
import { Link } from 'react-router-dom';
import styles from '../Style.module.less';

const ListContent = ({ data: { owner, createOn, lastLoginTime } }) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>上次登录</span>
      <p>{getLabelFromTimeStamp(lastLoginTime)}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>创建时间</span>
      <p>{getLabelFromTimeStamp(createOn)}</p>
    </div>
  </div>
);
export default (match) => (item) => {
  return (
    <List.Item
      actions={[
        <Link to={`${match.path}/modify/${item.id}`}>编辑</Link>,
        <MoreBtn />,
      ]}
    >
      <List.Item.Meta
        avatar={
          <Avatar shape="square" size="large">
            {item.nickname}
          </Avatar>
        }
        title={`${item.nickname || 'noname'} (${item.username})`}
        description={item.permissionType === 30 ? '管理员' : '一般用户'}
      />
      <ListContent data={item} />
    </List.Item>
  );
};
