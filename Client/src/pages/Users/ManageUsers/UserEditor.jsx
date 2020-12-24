import React,{useRef} from 'react';
import { Checkbox, Input, Modal } from 'antd';
import {Link, matchPath, useRouteMatch, useHistory} from 'react-router-dom';
import ValidationForm from '../../../components/Form/ValidationForm';
import FormField from '../../../components/Form/FormField';
import { useScripts } from './UserEditor.Scripts';

export default (props) => {
  const history = useHistory();
  const { doSave, data, isSaveLoading } = useScripts(props);
  const formRef = useRef({});
  return (
    <Modal
      title="用户信息"
      centered
      visible={true}
      confirmLoading={isSaveLoading}
      onOk={() => formRef.current.submit()}
      onCancel={() => history.goBack()}
      width={'75%'}
      destroyOnClose={true}
    >
      <ValidationForm ref={formRef} name={props.name} onSubmit={doSave}>
        <FormField name="id" hidden={true} initialValue={data.id}>
          <Input />
        </FormField>
        <FormField
          name="nickname"
          required={true}
          label={'昵称'}
          labelCol={{ span: 5 }}
          initialValue={data.nickname}
        >
          <Input />
        </FormField>
        <FormField
          name="username"
          required={true}
          label={'用户名'}
          labelCol={{ span: 5 }}
          initialValue={data.username}
        >
          <Input />
        </FormField>
        <FormField
          name="password"
          required={!data.id}
          label={'密码'}
          labelCol={{ span: 5 }}
        >
          <Input.Password />
        </FormField>
        <FormField
          name="con_password"
          required={!data.id}
          label={'确认密码'}
          labelCol={{ span: 5 }}
        >
          <Input.Password />
        </FormField>
        <FormField
          name="isAdmin"
          valuePropName="checked"
          label={'管理员'}
          labelCol={{ span: 5 }}
          initialValue={data.permissionType}
        >
          <Checkbox />
        </FormField>
      </ValidationForm>
    </Modal>
  );
};
