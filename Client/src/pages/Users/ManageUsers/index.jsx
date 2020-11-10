import { PageContainer } from '@ant-design/pro-layout';
import {
  Button,
  Card,
  List,
  Dropdown,
  Menu,
} from 'antd';
import React from 'react';
import {getLabelFromTimeStamp} from "../../../utils/dateUtils";
import { LikeOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';

import { useScripts } from './index.Scripts';
import styles from '../Style.module.less';

const ListContent = ({ owner, createOn, lastLoginTime, status }) => (
  <div className={styles.listContent}>{(()=>{console.log('===',styles)})()}
    <div className={styles.listContentItem} id="ffff">
      <span>Owner</span>
      <p>{owner}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>上次登录</span>
      <p>{getLabelFromTimeStamp(lastLoginTime)}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>创建时间</span>
      <p>{getLabelFromTimeStamp(createOn)}</p>
    </div>
    <div className={styles.listContentItem}>Progress</div>
  </div>
);
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
const MoreBtn = () => (
  <Dropdown overlay={menu}>
    <a>
      更多 <DownOutlined />
    </a>
  </Dropdown>
);
export default (props) => {
  const { listData, isFetchListLoading } = useScripts(props);
  return (
    <PageContainer
      extra={[
        <Button key="3">操作</Button>,
        <Button key="2">操作</Button>,
        <Button key="1" type="primary">
          添加
        </Button>,
      ]}
    >
      <div className={styles.standardList}>
        <Card
          // className={styles.listCard}
          bordered={false}
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
          // extra={extraContent}
        >
          <List
            size="large"
            rowKey="id"
            loading={isFetchListLoading}
            // pagination={paginationProps}
            dataSource={listData.items}
            renderItem={(item) => (
              <List.Item actions={[<a>编辑</a>, <MoreBtn />]}>
                <List.Item.Meta
                  // avatar={<Avatar src={item.logo} shape="square" size="large" />}
                  title={item.username}
                  description={item.subDescription}
                />
                <ListContent data={item} />
              </List.Item>
            )}
          />
        </Card>
      </div>

    </PageContainer>
  );
};
