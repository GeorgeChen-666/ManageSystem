import React, {useEffect} from 'react';
import {Checkbox, Input, Modal, List} from 'antd';
import {Link, matchPath, useRouteMatch, useHistory} from 'react-router-dom';
import * as processLogModel from '../../../models/ProcessLog';
import useLoading from "../../../components/Hooks/useLoading";
import MainInfiniteScrollList from '../../../components/PageParts/MainInfiniteScrollList';
import styles from '../Style.module.less';

export default () => {
  const history = useHistory();
  let match = useRouteMatch();
  const currentMatch = matchPath(history.location.pathname, {
    path: [`${match.path}/terminal/:id`],
  });
  if (!currentMatch) return <div>.</div>
  const [doFetchList, isFetchListLoading] = useLoading(
    processLogModel.useFetchList(currentMatch.params.id)
  );
  const [{listData}] = processLogModel.useData();
  useEffect(() => {
    doFetchList()
  }, []);
  return (<Modal
    title="终端"
    centered
    visible={!!currentMatch}
    // confirmLoading={isSaveLoading}
    // onOk={() => formRef.current.submit()}
    onCancel={() => history.goBack()}
    width={'50%'}
    destroyOnClose={true}
    className={styles.terminalModal}
  >
    <MainInfiniteScrollList
      isReverse={true}
      loadMore={() => doFetchList()}
      hasMore={
        !isFetchListLoading &&
        (listData.items.length < listData.total ||
          listData.total === undefined)
      }
      isFetching={isFetchListLoading}
      dataSource={listData.items}
      renderItem={(item, index) => {
        return <div>
          <pre style={{marginBottom: 0}}>{item.log}</pre>
          {(() => {
            if (listData.items.length === index + 1) {
              return <pre className={'cursor'}>666</pre>
            }
          })()}
        </div>
      }}
    />
  </Modal>)
}