import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card } from 'antd';
import React, { useEffect } from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import styles from '../Style.module.less';
import * as processModel from '../../../models/Processes';
import useLoading from '../../../components/Hooks/useLoading';
import InfiniteScrollList from '../../../components/InfiniteScrollList';
import ListItem from './ListItem';
import Terminal from './Terminal';
import ProcessEditor from './ProcessEditor';
import TaskEditor from './Task/TaskEditor';

export default () => {
  let match = useRouteMatch();
  const PATH_ADD = `${match.path}/add`;
  const [doFetchList, isFetchListLoading] = useLoading(
    processModel.useFetchList()
  );
  useEffect(() => {
    doFetchList({}, { isNew: true });
  }, []);
  const [{ listData }] = processModel.useData();
  const listDataDone = listData.total !== undefined;
  return (
    <PageContainer
      extra={[
        <Link key="1" to={PATH_ADD}>
          <Button type="primary">添加</Button>
        </Link>,
      ]}
    >
      <div className={styles.cardList}>
        <Card
          bordered={false}
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '32px 32px 40px 32px' }}
        >
          <InfiniteScrollList
            scrollParent={document.querySelector(
              '#test-pro-layout div section section'
            )}
            loadMore={() => doFetchList()}
            hasMore={
              !isFetchListLoading &&
              (listData.items.length < listData.total ||
                listData.total === undefined)
            }
            isFetching={isFetchListLoading}
            dataSource={listData.items}
            renderItem={ListItem(match)}
            grid={{ column: 4, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}
          />
        </Card>
      </div>
      <Switch>
        <Route path={[`${match.path}/terminal/:id`]}>
          {listDataDone && <Terminal />}
        </Route>
        <Route path={[`${match.path}/modify/:id`]}>
          {listDataDone && <ProcessEditor />}
        </Route>
        <Route path={[`${match.path}/tasks/:id`]}>
          {listDataDone && <TaskEditor />}
        </Route>
        <Route path={[`${match.path}/add`]}>
          {listDataDone && <ProcessEditor />}
        </Route>
      </Switch>
    </PageContainer>
  );
};
