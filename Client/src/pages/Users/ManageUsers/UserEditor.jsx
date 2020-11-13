import React from 'react';
import {useParams} from 'react-router-dom';
import {Checkbox, Input} from 'antd';
import ValidationForm from '../../../components/Form/ValidationForm';
import FormField from '../../../components/Form/FormField';
import {useScripts} from './UserEditor.Scripts';

export default React.forwardRef((props, ref) => {
  let {id} = useParams();
  const {doRegister, onRegisterDone} = useScripts(props, ref);
  return (
    <ValidationForm ref={ref} name={props.name} onSubmit={doRegister} onSubmitDone={onRegisterDone}>
      <FormField
        name="nickname"
        required={true}
        label={'昵称'}
        labelCol={{span: 5}}
      >
        <Input/>
      </FormField>
      <FormField
        name="username"
        required={true}
        label={'用户名'}
        labelCol={{span: 5}}
      >
        <Input/>
      </FormField>
      <FormField
        name="password"
        required={true}
        label={'密码'}
        labelCol={{span: 5}}
      >
        <Input.Password/>
      </FormField>
      <FormField
        name="con_password"
        required={true}
        label={'确认密码'}
        labelCol={{span: 5}}
      >
        <Input.Password/>
      </FormField>
      <FormField
        name="isAdmin"
        valuePropName="checked"
        label={'管理员'}
        labelCol={{span: 5}}
      >
        <Checkbox/>
      </FormField>
    </ValidationForm>
  );
});
