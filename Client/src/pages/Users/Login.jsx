import _ from 'lodash';
import React, {useEffect} from 'react';
import {Checkbox, Button, Input, Card, message} from 'antd';
import {useHistory} from 'react-router-dom';
import ValidationForm from '../../components/Form/ValidationForm';
import FormField from '../../components/Form/FormField';
import * as userModel from '../../models/Users';
import useLoading from '../../components/Hooks/useLoading';

export default () => {
  const checkAutoLogin = userModel.useCheckAutoLogin();
  useEffect(() => {
    checkAutoLogin();
  }, []);
  const [doLogin, isLoginLoading] = useLoading(userModel.useDoLogin());
  const history = useHistory();
  const onSubmit = (...args) => {
    doLogin(...args);
    message.success("登陆成功！");
    _.debounce(() => history.push('/'), 500)();
  }
  return (
    <div>
      <Card title="登录系统" style={{width: 300}}>
        <ValidationForm onSubmit={onSubmit} name={'validate_login'}>
          <FormField name="username" required={true} initialValue={'admin'}>
            <Input/>
          </FormField>
          <FormField name="password" required={true} initialValue={'112233'}>
            <Input.Password/>
          </FormField>
          <FormField name="remember" valuePropName="checked">
            <Checkbox>自动登录</Checkbox>
          </FormField>
          <FormField name="submit" valuePropName="checked">
            <Button type="primary" htmlType="submit" loading={isLoginLoading}>
              登录
            </Button>
          </FormField>
        </ValidationForm>
      </Card>
    </div>
  );
};
