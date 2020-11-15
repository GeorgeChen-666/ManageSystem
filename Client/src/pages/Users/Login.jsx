import React, { useEffect } from 'react';
import { Checkbox, Button, Input, Card } from 'antd';
import ValidationForm from '../../components/Form/ValidationForm';
import FormField from '../../components/Form/FormField';
import * as userNewActions from '../../models/Users_new';
import useLoading from '../../components/Hooks/useLoading';

export default () => {
  const checkAutoLogin = userNewActions.useCheckAutoLogin();
  useEffect(() => {
    checkAutoLogin();
  }, []);
  const [doLogin, isLoginLoading] = useLoading(userNewActions.useDoLogin());
  return (
    <div>
      <Card title="登录系统" style={{ width: 300 }}>
        <ValidationForm onSubmit={doLogin} name={'validate_login'}>
          <FormField name="username" required={true} initialValue={'admin'}>
            <Input />
          </FormField>
          <FormField name="password" required={true} initialValue={'112233'}>
            <Input.Password />
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
