import React from 'react';
import { Form } from 'antd';
import { useScripts } from './ValidationForm.Scripts';
import ValidationFormContext from './ValidationFormContext';

const ValidationForm = (props) => {
  const { onFormSubmit, onFieldChange, fromInstance, errors } = useScripts(
    props
  );
  return (
    <ValidationFormContext.Provider value={{ errors, fromInstance }}>
      <Form
        name={props.name}
        form={fromInstance}
        onFinish={onFormSubmit}
        onValuesChange={onFieldChange}
      >
        {props.children}
      </Form>
    </ValidationFormContext.Provider>
  );
};

export default ValidationForm;
