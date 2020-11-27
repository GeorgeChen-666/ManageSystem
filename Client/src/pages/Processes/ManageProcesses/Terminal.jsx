import React, {useEffect, useState, Fragment} from 'react';
import _ from 'lodash';
import {Checkbox, Input, Modal, List} from 'antd';
import {Link, matchPath, useRouteMatch, useHistory} from 'react-router-dom';
import * as processLogModel from '../../../models/ProcessLog';
import useLoading from '../../../components/Hooks/useLoading';
import InfiniteScrollList from '../../../components/InfiniteScrollList';
import {sendCommand} from '../../../services/process';
import styles from '../Style.module.less';

const setTextBoxFocus = () => {
  const el = document.getElementById('cmdTextBox');
  if (!el) return;
  const range = document.createRange();
  el.focus();
  range.selectNodeContents(el);
  range.collapse(false);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
};

export default () => {
  const history = useHistory();
  let match = useRouteMatch();
  const id = _.get(match, ["params", "id"]);
  const [doFetchList, isFetchListLoading] = useLoading(
    processLogModel.useFetchList(id)
  );
  const [sendCmd, isSendingCmd] = useLoading(sendCommand);
  const [{listData}] = processLogModel.useData();

  const onTextEnter = ({keyCode}) => {
    if (keyCode === 13 && !isSendingCmd) {
      const el = document.getElementById('cmdTextBox');
      const command = el.innerText;
      el.innerHTML = '';
      if (!command.trim()) return;
      sendCmd(id, command.trim());
    }
  };
  useEffect(() => {
    doFetchList();
    const timer = setTimeout(setTextBoxFocus, 400);
    return () => {
      clearTimeout(timer);
    }
  }, []);

  const [focus, setFocus] = useState(true);
  return (
    <Modal
      title="终端"
      centered
      visible={true}
      // confirmLoading={isSaveLoading}
      // onOk={() => formRef.current.submit()}
      onCancel={() => history.goBack()}
      width={'50%'}
      destroyOnClose={true}
      className={styles.terminalModal}
    >
      <div className={styles.logListDiv}>
        <InfiniteScrollList
          isReverse={true}
          loadMore={() => doFetchList()}
          hasMore={
            !isFetchListLoading &&
            (listData.items.length < listData.total ||
              listData.total === undefined)
          }
          isFetching={isFetchListLoading}
          dataSource={[...listData.items].reverse()}
          renderItem={(item, index) => {
            return (
              <Fragment>
                {(() => {
                  if (listData.items.length === index + 1) {
                    return (
                      <div onClick={setTextBoxFocus}>
                        <pre style={{marginBottom: 0}}>{item.log}</pre>
                        <div
                          id={'cmdTextBox'}
                          className={styles.cmdTextBox}
                          onKeyUp={onTextEnter}
                          onBlur={() => setFocus(false)}
                          onFocus={() => setFocus(true)}
                          contentEditable="true"
                          spellCheck="false"
                        />
                        {isSendingCmd ? (
                          <pre>sending...</pre>
                        ) : (
                          <pre
                            className={styles.cursor}
                            style={{
                              display: focus ? 'unset' : 'none',
                            }}
                          >
                            _
                          </pre>
                        )}
                      </div>
                    );
                  } else {
                    return <pre style={{marginBottom: 0}}>{item.log}</pre>;
                  }
                })()}
              </Fragment>
            );
          }}
        />
      </div>
    </Modal>
  );
};
