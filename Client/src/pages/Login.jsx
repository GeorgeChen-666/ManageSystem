import React from 'react';
import { Checkbox, Button, Input, Card } from 'antd';
import { doLogin } from '../services/user';
import styles from './Login.less';
export default (props) => {
  const { login, submitting } = {
    login: { status: 'error', type: 'account' },
    submitting: false,
  };
  const autoLogin = true;
  return (
    <div>
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
          loading={submitting}
          onClick={() => {
            doLogin({ username: 'admin', password: '666' });
          }}
        >
          登录
        </Button>
      </Card>
    </div>
  );
};
