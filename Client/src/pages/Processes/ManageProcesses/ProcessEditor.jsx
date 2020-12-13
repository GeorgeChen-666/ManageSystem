import React from 'react';
import { Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import styles from '../Style.module.less';
import ProcessMainForm from './ProcessMainForm';
import * as processModel from '../../../models/Processes';
import useEditor from '../../../components/Hooks/useEditor';

export default (props) => {
  const history = useHistory();
  const editor = useEditor();
  const data = editor.getEntity(processModel);
  return (
    <Modal
      title="进程信息"
      centered
      visible={true}
      onCancel={() => history.goBack()}
      width={'50%'}
      destroyOnClose={true}
      className={styles.terminalModal}
    >
      <ProcessMainForm data={data} />
    </Modal>
  );
};
