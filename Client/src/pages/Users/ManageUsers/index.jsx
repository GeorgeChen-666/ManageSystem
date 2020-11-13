import {PageContainer} from '@ant-design/pro-layout';
import {Button, Card, List, Dropdown, Menu, Modal} from 'antd';
import React, {useRef} from 'react';
import {getLabelFromTimeStamp} from '../../../utils/dateUtils';
import {LikeOutlined, PlusOutlined, DownOutlined} from '@ant-design/icons';
import {
  Link,
  matchPath,
  useRouteMatch,
  useHistory,
  Route,
  Switch,
} from 'react-router-dom';
import UserEditor from './UserEditor';
import {useScripts} from './index.Scripts';
import styles from '../Style.module.less';


const ListContent = ({data: {owner, createOn, lastLoginTime}}) => (
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
      更多 <DownOutlined/>
    </a>
  </Dropdown>
);
export default (props) => {
  const history = useHistory();
  let match = useRouteMatch();
  const [PATH_ADD, PATH_MODIFY] = [`${match.path}/add`, `${match.path}/modify/:id`]
  const currentMatch = matchPath(history.location.pathname, {path: [PATH_ADD, PATH_MODIFY]});
  const {listData, isFetchListLoading, formRef} = useScripts(props);
  const fromInstance = formRef.current || {submit: () => null};
  console.log();
  return (
    <PageContainer
      extra={[
        <Button key="3">操作</Button>,
        <Button key="2">操作</Button>,
        <Link key="1" to={PATH_ADD}>
          <Button type="primary">
            添加
          </Button>
        </Link>,
      ]}
    >
      <div className={styles.standardList}>
        <Card
          // className={styles.listCard}
          bordered={false}
          style={{marginTop: 24}}
          bodyStyle={{padding: '0 32px 40px 32px'}}
          // extra={extraContent}
        >
          <List
            size="large"
            rowKey="id"
            loading={isFetchListLoading}
            // pagination={paginationProps}
            dataSource={listData.items}
            renderItem={(item) => (
              <List.Item actions={[<a>编辑</a>, <MoreBtn/>]}>
                <List.Item.Meta
                  // avatar={<Avatar src={item.logo} shape="square" size="large" />}
                  title={item.username}
                  description={item.subDescription}
                />
                <ListContent data={item}/>
              </List.Item>
            )}
          />
        </Card>
      </div>
      <Modal
        title="用户信息"
        centered
        visible={!!currentMatch}
        confirmLoading={fromInstance.isSaveLoading}
        onOk={() => fromInstance.submit()}
        onCancel={() => history.goBack()}
        width={'50%'}
      >
        <UserEditor ref={formRef}/>
      </Modal>
      {/*<Switch>*/}
      {/*<Route path={[`${match.path}/add`, `${match.path}/modify/:id`]}>*/}

      {/*</Route>*/}
      {/*</Switch>*/}
    </PageContainer>
  );
};
