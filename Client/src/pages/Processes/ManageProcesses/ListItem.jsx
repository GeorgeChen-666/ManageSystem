import React from 'react';
import { List, Card, Avatar } from 'antd';
import styles from '../Style.module.less';
import { SyncOutlined } from '@ant-design/icons';

export default (match) => (item) => {
  return (
    <List.Item key={item.id}>
      <Card
        hoverable
        className={styles.card}
        actions={[<a>终端</a>, <a>任务</a>]}
        title={item.username}
        extra={<span>操作</span>}
      >
        <Card.Meta
          avatar={<Avatar size={64} icon={<SyncOutlined spin />} />}
          // title={<a href="#">{item.username}</a>}
          description={
            <div className={styles.item}>
              <div>进程类型：</div>
              <div>运行时间：</div>
            </div>
          }
        />
      </Card>
    </List.Item>
  );
};
