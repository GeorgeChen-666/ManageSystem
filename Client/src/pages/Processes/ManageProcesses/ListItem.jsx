import React from 'react';
import { List, Card } from 'antd';
import styles from '../Style.module.less';

import StatusAvatar from './StatusAvatar'

export default (match) => (item) => {
  return (
    <List.Item key={item.id}>
      <Card
        hoverable
        className={styles.card}
        actions={[<a>终端</a>, <a>任务</a>]}
        title={item.name}
        extra={<span>操作</span>}
      >
        <Card.Meta
          avatar={<StatusAvatar />}
          description={
            <div className={styles.item}>
              <div>进程类型：</div>
              <div>持续时间：</div>
            </div>
          }
        />
      </Card>
    </List.Item>
  );
};
