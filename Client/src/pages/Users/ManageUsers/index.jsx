import {PageContainer} from '@ant-design/pro-layout';
import {Button, Card, List, Dropdown, Menu, Modal, Avatar} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {getLabelFromTimeStamp} from '../../../utils/dateUtils';
import {LikeOutlined, PlusOutlined, DownOutlined} from '@ant-design/icons';
import {Link, matchPath, useRouteMatch, useHistory} from 'react-router-dom';
import UserEditor from './UserEditor';
import {useScripts} from './index.Scripts';
import styles from '../Style.module.less';
import InfiniteScroll from 'react-infinite-scroller';

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
  const [PATH_ADD, PATH_MODIFY] = [`${match.path}/add`, `${match.path}/modify`];
  const currentMatch = matchPath(history.location.pathname, {
    path: [PATH_ADD, PATH_MODIFY],
  });
  const {doFetchList, listData, listDataDone, isFetchListLoading, formRef} = useScripts(
    props
  );

  return (
    <PageContainer
      extra={[
        <Button key="3" onClick={() => doFetchList()}>Fetch</Button>,
        <Button key="2">操作</Button>,
        <Link key="1" to={PATH_ADD}>
          <Button type="primary">添加</Button>
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
          <InfiniteScroll
            initialLoad={false}
            loadMore={() => doFetchList()}
            hasMore={!isFetchListLoading && (listData.items.length < listData.total || listData.total === undefined)}
            loader={<div className="loader" key={0} />}
            useWindow={false}
            getScrollParent={() => document.querySelector('#test-pro-layout div section section')}
          >
            <List
              size="large"
              rowKey="id"
              loading={isFetchListLoading}
              // pagination={paginationProps}
              dataSource={listData.items}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Link to={`${match.path}/modify/${item.id}`}>编辑</Link>,
                    <MoreBtn/>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar shape="square" size="large">{item.nickname}</Avatar>}
                    title={`${item.nickname || 'noname'} (${item.username})`}
                    description={item.permissionType === 30 ? '管理员' : '一般用户'}
                  />
                  <ListContent data={item}/>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </Card>
      </div>
      {listDataDone && (
        <Modal
          title="用户信息"
          centered
          visible={!!currentMatch}
          confirmLoading={(formRef.current || {}).isSaveLoading}
          onOk={() => formRef.current.submit()}
          onCancel={() => history.goBack()}
          width={'50%'}
          destroyOnClose={true}
        >
          <UserEditor ref={formRef}/>
        </Modal>
      )}

      {/*<Switch>*/}
      {/*<Route path={[`${match.path}/add`, `${match.path}/modify/:id`]}>*/}

      {/*</Route>*/}
      {/*</Switch>*/}
    </PageContainer>
  );
};
//fromInstance.submit()
