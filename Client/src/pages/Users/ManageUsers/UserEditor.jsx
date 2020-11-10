import React from 'react';
import { useParams } from 'react-router-dom';
import { Checkbox, Button, Input, Card } from 'antd';
import ValidationForm from '../../../components/Form/ValidationForm';
import FormField from '../../../components/Form/FormField';

export default (props) => {
  let { id } = useParams();
  return (
    <ValidationForm name={'validate_new_user'}>
      <FormField
        name="nickname"
        required={true}
        label={'昵称'}
        labelCol={{ span: 3 }}
      >
        <Input />
      </FormField>
      <FormField
        name="username"
        required={true}
        label={'用户名'}
        labelCol={{ span: 3 }}
      >
        <Input />
      </FormField>
      <FormField
        name="password"
        required={true}
        label={'密码'}
        labelCol={{ span: 3 }}
      >
        <Input.Password />
      </FormField>
      <FormField
        name="con_password"
        required={true}
        label={'确认密码'}
        labelCol={{ span: 3 }}
      >
        <Input.Password />
      </FormField>
      <FormField
        name="isAdmin"
        valuePropName="checked"
        label={'管理员'}
        labelCol={{ span: 3 }}
      >
        <Checkbox />
      </FormField>
      <props.children />
    </ValidationForm>
  );
};
