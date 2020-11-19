import {PageContainer} from '@ant-design/pro-layout';
import {Button, Card} from 'antd';
import React, {useEffect} from 'react';
import {LikeOutlined, PlusOutlined, DownOutlined} from '@ant-design/icons';
import {Link, matchPath, useRouteMatch, useHistory} from 'react-router-dom';
import UserEditor from './UserEditor';
import styles from '../Style.module.less';
import * as userModel from "../../../models/Users";
import useLoading from "../../../components/Hooks/useLoading";
import MainInfiniteScrollList from '../../../components/PageParts/MainInfiniteScrollList';
import ListItem from './ListItem';

export default () => {
  let match = useRouteMatch();
  const PATH_ADD = `${match.path}/add`;
  const [doFetchList, isFetchListLoading] = useLoading(
    userModel.useFetchList()
  );
  useEffect(() => {
    doFetchList({}, {isNew: true});
  }, []);
  const [{listData}] = userModel.useUsersData();
  const listDataDone = listData.total;
  return (
    <PageContainer
      extra={[
        <Button key="3" onClick={() => doFetchList()}>
          Fetch
        </Button>,
        <Button key="2">操作</Button>,
        <Link key="1" to={PATH_ADD}>
          <Button type="primary">添加</Button>
        </Link>,
      ]}
    >
      <div className={styles.standardList}>
        <Card
          bordered={false}
          style={{marginTop: 24}}
          bodyStyle={{padding: '0 32px 40px 32px'}}
        >
          <MainInfiniteScrollList
            loadMore={() => doFetchList()}
            hasMore={
              !isFetchListLoading &&
              (listData.items.length < listData.total ||
                listData.total === undefined)
            }
            isFetching={isFetchListLoading}
            dataSource={listData.items}
            renderItem={ListItem}
          />
        </Card>
      </div>
      {listDataDone && (
        <UserEditor/>
      )}
    </PageContainer>
  );
};
