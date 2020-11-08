import { PageContainer } from '@ant-design/pro-layout';
import {
  Button,
  Descriptions,
  Result,
  Space,
  Statistic,
  Card,
  List,
  Dropdown,
  Menu,
} from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import { LikeOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';

import { useScripts } from './index.Scripts';

const content = (
  <Descriptions size="small" column={2}>
    <Descriptions.Item label="创建人">张三</Descriptions.Item>
    <Descriptions.Item label="联系方式">
      <span>421421</span>
    </Descriptions.Item>
    <Descriptions.Item label="创建时间">2017-01-10</Descriptions.Item>
    <Descriptions.Item label="更新时间">2017-10-10</Descriptions.Item>
    <Descriptions.Item label="备注">
      中国浙江省杭州市西湖区古翠路6666
    </Descriptions.Item>
  </Descriptions>
);
const ListContent = ({ owner, createOn, percent, status }) => (
  <div>
    <div>
      <span>Owner</span>
      <p>{owner}</p>
    </div>
    <div>
      <span>创建时间</span>
      <p>{dayjs(createOn).format('YYYY-MM-DD')}</p>
    </div>
    <div>Progress</div>
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
                title={<a href={item.href}>{item.title}</a>}
                description={item.subDescription}
              />
              <ListContent data={item} />
            </List.Item>
          )}
        />
      </Card>
    </PageContainer>
  );
};
