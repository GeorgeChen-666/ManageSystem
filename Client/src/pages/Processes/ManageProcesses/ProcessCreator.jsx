import React, {useRef, useState} from 'react';
import {Checkbox, Input, Modal, Dropdown, Button, Select} from 'antd';
import {Link, matchPath, useRouteMatch, useHistory} from 'react-router-dom';
import ValidationForm from '../../../components/Form/ValidationForm';
import FormField from '../../../components/Form/FormField';
import {DownOutlined} from '@ant-design/icons';
import styles from '../Style.module.less';
import mime from 'mime';
import {FilePond, registerPlugin} from 'react-filepond';
import fpfvs from 'filepond-plugin-file-validate-size';

registerPlugin(fpfvs);
const allowedExtensions = ['js', 'exe', 'bat', 'cmd', 'sh', 'jar', 'class', 'zip'];
const {Option} = Select;
//fileRef.current.getFile().file
export default (props) => {
  const history = useHistory();
  const formRef = useRef({});
  const [fileObject, setFileObject] = useState();
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
      <ValidationForm ref={formRef} name={props.name}>
        <FormField name="id" hidden={true} initialValue={data.id}>
          <Input/>
        </FormField>
        <FormField
          name="name"
          required={true}
          label={'服务名称'}
          labelCol={{span: 5}}
          initialValue={data.nickname}
        >
          <Input/>
        </FormField>
        <FormField noStyle shouldUpdate>
          {({setFieldsValue}) => {
            return <FormField
              name="file"
              labelCol={{span: 5}}
              label={'服务文件'}
              style={{textAlign: 'right'}}
              trigger={'onupdatefiles'}
              rules={[
                {
                  validator: async (rule, value) => {
                    const [file = {}] = value;
                    const {fileExtension} = file;
                    if (![undefined, ...allowedExtensions].includes(fileExtension)) {
                      return Promise.reject(new Error('文件类型不支持！'));
                    }
                  }
                }
              ]}
            >
              <FilePond
                labelIdle={`拖拽文件至此或 <span class="filepond--label-action">浏览</span><br />支持格式：${allowedExtensions.join(',')}`}
                allowMultiple={false}
                maxFiles={1}
                onupdatefiles={(fileItems) => {
                  let value = fileItems.length === 0 ? null : fileItems[0].id;
                  setFieldsValue({exe: value});
                }}
              />
            </FormField>
          }}
        </FormField>

        <FormField noStyle shouldUpdate={(pv, cv) => pv.file !== cv.file}>
          {({getFieldValue, getFieldError}) => {
            const fieldValue = (!getFieldError('file').length && getFieldValue('file')) || [];
            const fileList = fieldValue.map(file => ({label: file.filename, value: file.id}));
            return <FormField
              name="exe"
              label={'应用程序'}
              labelCol={{span: 5}}
              initialValue={data.cmd}
            >
              <Select style={{width: 240}} options={fileList}>
              </Select>
            </FormField>;
          }}
        </FormField>
        <FormField noStyle shouldUpdate={(pv, cv) => pv.file !== cv.file}>
          {({getFieldValue, getFieldError, setFieldsValue}) => {
            const fieldValue = getFieldValue('exe');
            const fieldObject = (getFieldValue('file') || []).find(file => file.id === fieldValue);
            console.log("===", fieldObject)
            return <FormField
              name="param"
              label={'附加参数'}
              labelCol={{span: 5}}
              initialValue={data.username}
            >
              <Input/>
            </FormField>;
          }}
        </FormField>

        <FormField
          name="isAutoStart"
          valuePropName="checked"
          label={'自动启动'}
          labelCol={{span: 5}}
          initialValue={data.permissionType}
        >
          <Checkbox/>
        </FormField>
      </ValidationForm>
      <Button onClick={() => {
        console.log(fileRef);
        debugger;
      }}>????</Button>
    </Modal>
  );
};
