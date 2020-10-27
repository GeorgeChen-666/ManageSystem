import React from 'react';
import { Checkbox, Alert, Icon } from 'antd';
import styles from './Login.less';

export default (props) => {
  const {login, submitting} = props;
  const {type, autoLogin} = this.state;
  return (<div className={styles.main}>
    <Tab key="account" tab="账户密码登录">
      {login.status === 'error' &&
      login.type === 'account' &&
      !submitting &&
      this.renderMessage('账户或密码错误（admin/888888）')}
      <UserName name="userName" placeholder="admin/user"/>
      <Password name="password" placeholder="888888/123456"/>
    </Tab>
    <Tab key="mobile" tab="手机号登录">
      {login.status === 'error' &&
      login.type === 'mobile' &&
      !submitting &&
      this.renderMessage('验证码错误')}
      <Mobile name="mobile"/>
      <Captcha name="captcha"/>
    </Tab>
    <div>
      <Checkbox checked={autoLogin}>
        自动登录
      </Checkbox>
      <a style={{float: 'right'}} href="">
        忘记密码
      </a>
    </div>
    <Submit loading={submitting}>登录</Submit>
    <div className={styles.other}>
      其他登录方式
      <Icon className={styles.icon} type="alipay-circle"/>
      <Icon className={styles.icon} type="taobao-circle"/>
      <Icon className={styles.icon} type="weibo-circle"/>
      <Link className={styles.register} to="/user/register">
        注册账户
      </Link>
    </div>
  </div>)
}