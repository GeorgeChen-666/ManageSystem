import React, {useRef} from 'react';
import {Modal, Button, Popconfirm} from 'antd';
import {useHistory} from 'react-router-dom';
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
      width={'75%'}
      destroyOnClose={true}
      className={styles.terminalModal}
      onCancel={()=>history.goBack()}
      footer={(<React.Fragment>
        <Button onClick={() => history.goBack()}>取消</Button>
        <Popconfirm
          title={"保存后即将重启进程，是否继续操作？"}
          onConfirm={() => formRef.current.submit()}
          okText="是"
          cancelText="否"
          disabled={!data.isRunning}
        >
          <Button type="primary" onClick={() => !data.isRunning && formRef.current.submit()}>确定</Button>
        </Popconfirm>
      </React.Fragment>)}
    >
      <ProcessMainForm ref={formRef} data={data} onSubmit={editor.doSave}/>
    </Modal>
  );
};
