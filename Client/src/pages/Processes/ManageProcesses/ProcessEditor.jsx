import React,{useRef} from 'react';
import { Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import styles from '../Style.module.less';
import ProcessMainForm from './ProcessMainForm';
import * as processModel from '../../../models/Processes';
import useEditor from '../../../components/Hooks/useEditor';

export default (props) => {
  const history = useHistory();
  const editor = useEditor(processModel);
  const data = editor.getEntity();
  const formRef = useRef({});
  return (
    <Modal
      title="进程信息"
      centered
      visible={true}
      onOk={() => formRef.current.submit()}
      onCancel={() => history.goBack()}
      width={'50%'}
      destroyOnClose={true}
      className={styles.terminalModal}
    >
      <ProcessMainForm ref={formRef} data={data} onSubmit={editor.doSave} />
    </Modal>
  );
};
