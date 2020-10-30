import React from 'react';
import {Form, Input, Button, Checkbox} from 'antd';
import {useScripts} from './ValidationForm.Scripts'

const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 14},
};

const Demo = (props) => {
  const {isSubmitLoading} = props;
  const {onFormSubmit, onFieldChange, fieldServerErrorValidator, fromInstance} = useScripts(props)
  return (
    <Form
      loading={true}
      form={fromInstance}
      name="validate_login"
      {...formItemLayout}
      onFinish={onFormSubmit}
      onValuesChange={onFieldChange}
      initialValues={{
        'input-number': 3,
        'checkbox-group': ['A', 'B'],
        rate: 3.5,
      }}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{required: true, message: 'Please input your username!'}, fieldServerErrorValidator()]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{required: true, message: 'Please input your password!'}, fieldServerErrorValidator()]}
      >
        <Input.Password/>
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{span: 12, offset: 6}}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{span: 12, offset: 6}}>
        <Button type="primary" htmlType="submit" loading={isSubmitLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Demo;
