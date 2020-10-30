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
      onFinish={onFormSubmit}
      onValuesChange={onFieldChange}
      initialValues={{
        'input-number': 3,
        'checkbox-group': ['A', 'B'],
        rate: 3.5,
      }}
    >
      <Form.Item
        name="username"
        rules={[{required: true, message: 'Please input your username!'}, fieldServerErrorValidator()]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{required: true, message: 'Please input your password!'}, fieldServerErrorValidator()]}
      >
        <Input.Password/>
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isSubmitLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Demo;
