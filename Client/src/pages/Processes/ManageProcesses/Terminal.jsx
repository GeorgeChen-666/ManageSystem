import React,{useEffect} from 'react';
import { Checkbox, Input, Modal } from 'antd';
import {Link, matchPath, useRouteMatch, useHistory} from 'react-router-dom';

export default () => {
  const history = useHistory();
  let match = useRouteMatch();
  const currentMatch = matchPath(history.location.pathname, {
    path: [`${match.path}/terminal`],
  });
  useEffect(() => {
    alert('')
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
  >
    <div>666</div>
  </Modal>)
}