import React from 'react';
import { Form } from 'antd';
import { useScripts } from './FormField.Scripts';

const FormField = (props) => {
  const { params } = useScripts(props);
  return <Form.Item {...params}>{props.children}</Form.Item>;
};
export default FormField;
