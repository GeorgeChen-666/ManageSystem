import React from 'react';
import { List, Card } from 'antd';
import styles from '../Style.module.less';
import MoreBtn from './MoreBtn';
import { Link, matchPath, useRouteMatch, useHistory } from 'react-router-dom';

import StatusAvatar from './StatusAvatar';

export default (match) => (item) => {
  return (
    <List.Item key={item.id}>
      <Card
        hoverable
        className={styles.card}
        actions={[
          <Link to={`${match.path}/terminal/${item.id}`}>终端</Link>,
          <a>任务</a>,
        ]}
        title={item.name}
        extra={<MoreBtn match={match} item={item} />}
      >
        <Card.Meta
          avatar={<StatusAvatar isRunning={item.isRunning} />}
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
