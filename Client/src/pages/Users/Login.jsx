import React from 'react';
import { Checkbox, Button, Input, Card } from 'antd';
import { useScripts } from './Login.Scripts';

export default (props) => {
  const { login } = {
    login: { status: 'error', type: 'account' },
  };
  const { doLogin, isLoginLoading } = useScripts();
  const autoLogin = true;
  return (
    <div>
      <div>isLoading:{isLoginLoading.toString()}</div>
      <Card title="登录系统" style={{ width: 300 }}>
        <Input name="userName" placeholder="用户名" />
        <Input name="password" placeholder="密码" />
        <div>
          <Checkbox checked={autoLogin}>自动登录</Checkbox>
          <a style={{ float: 'right' }} href="">
            忘记密码
          </a>
        </div>
        <Button
          loading={isLoginLoading}
          onClick={() => {
            doLogin({ username: 'admin1', password: '112233' });
          }}
        >
          登录
        </Button>
      </Card>
    </div>
  );
};
