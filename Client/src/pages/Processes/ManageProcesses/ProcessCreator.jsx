import React, { useRef,useState } from 'react';
import { Checkbox, Input, Modal, Dropdown, Button, Select } from 'antd';
import { Link, matchPath, useRouteMatch, useHistory } from 'react-router-dom';
import ValidationForm from '../../../components/Form/ValidationForm';
import FormField from '../../../components/Form/FormField';
import { DownOutlined } from '@ant-design/icons';
import styles from '../Style.module.less';
import mime from 'mime';
import { FilePond, registerPlugin } from 'react-filepond';
import fpfvs from 'filepond-plugin-file-validate-size';
registerPlugin(fpfvs);
const { Option } = Select;
//fileRef.current.getFile().file
export default (props) => {
  const history = useHistory();
  const formRef = useRef({});
  const [fileObject,setFileObject] = useState();
  const fileRef = useRef({});
  console.log(mime.getType('jar'))
  const data = {};
  return (
    <Modal
      title="创建进程"
      centered
      visible={true}
      onCancel={() => history.goBack()}
      width={'50%'}
      destroyOnClose={true}
      className={styles.terminalModal}
    >
      <ValidationForm ref={formRef} name={props.name} onSubmit={() => {}}>
        <FormField name="id" hidden={true} initialValue={data.id}>
          <Input />
        </FormField>
        <FormField
          name="name"
          required={true}
          label={'服务名称'}
          labelCol={{ span: 5 }}
          initialValue={data.nickname}
        >
          <Input />
        </FormField>
        <FormField
          name="file"
          required={true}
          labelCol={{ span: 5 }}
          label={'服务文件'}
          style={{ textAlign: 'right' }}
          trigger={'onupdatefiles'}
        >
          <FilePond
            // onupdatefiles={(fileItems)=>{
            //   setFileObject(fileItems[0])
            // }}
            // onchage={()=>{
            //   console.log('=')
            // }}
            allowMultiple={false}
            maxFiles={1}
          />
        </FormField>
        <FormField
          name="param"
          required={true}
          label={'附加参数'}
          labelCol={{ span: 5 }}
          initialValue={data.username}
        >
          <Input />
        </FormField>
        <FormField
          name="isAutoStart"
          valuePropName="checked"
          label={'自动启动'}
          labelCol={{ span: 5 }}
          initialValue={data.permissionType}
        >
          <Checkbox />
        </FormField>
      </ValidationForm>
      <Button onClick={()=>{console.log(fileRef);debugger;}}>????</Button>
    </Modal>
  );
};
