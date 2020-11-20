import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card } from 'antd';
import React, { useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import styles from '../Style.module.less';
import * as processModel from '../../../models/Processes';
import useLoading from '../../../components/Hooks/useLoading';
import MainInfiniteScrollList from '../../../components/PageParts/MainInfiniteScrollList';
import ListItem from './ListItem';

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
      <div className={styles.cardList}>
        <Card
          bordered={false}
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
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
            renderItem={ListItem(match)}
            grid={{ column: 4, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}
          />
        </Card>
      </div>
      {/*{listDataDone && <UserEditor />}*/}
    </PageContainer>
  );
};
