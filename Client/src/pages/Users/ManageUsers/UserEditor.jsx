import React from 'react';
import { Checkbox, Input } from 'antd';
import ValidationForm from '../../../components/Form/ValidationForm';
import FormField from '../../../components/Form/FormField';
import { useScripts } from './UserEditor.Scripts';

export default React.forwardRef((props, ref) => {
  const { doSave, data } = useScripts(props, ref);
  return (
    <ValidationForm
      ref={ref}
      name={props.name}
      onSubmit={doSave}
    >
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
  );
});
