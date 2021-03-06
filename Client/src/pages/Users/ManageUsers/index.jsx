import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card } from 'antd';
import React, { useEffect } from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import UserEditor from './UserEditor';
import styles from '../Style.module.less';
import * as userModel from '../../../models/Users';
import useLoading from '../../../components/Hooks/useLoading';
import InfiniteScrollList from '../../../components/InfiniteScrollList';
import ListItem from './ListItem';

export default () => {
  let match = useRouteMatch();
  const PATH_ADD = `${match.path}/add`;
  const [doFetchList, isFetchListLoading] = useLoading(
    userModel.useFetchList()
  );
  useEffect(() => {
    doFetchList({}, { isNew: true });
  }, []);
  const [{ listData }] = userModel.useData();
  const listDataDone = listData.total;
  return (
    <PageContainer
      extra={[
        <Link key="1" to={PATH_ADD}>
          <Button type="primary">添加</Button>
        </Link>,
      ]}
    >
      <div className={styles.standardList}>
        <Card
          bordered={false}
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
        >
          <InfiniteScrollList
            loadMore={() => doFetchList()}
            scrollParent={document.querySelector(
              '#test-pro-layout div section section'
            )}
            hasMore={
              !isFetchListLoading &&
              (listData.items.length < listData.total ||
                listData.total === undefined)
            }
            isFetching={isFetchListLoading}
            dataSource={listData.items}
            renderItem={ListItem(match)}
          />
        </Card>
      </div>
      <Switch>
        <Route path={[`${match.path}/add`, `${match.path}/modify/:id`]}>
          {listDataDone && <UserEditor />}
        </Route>
      </Switch>
    </PageContainer>
  );
};
