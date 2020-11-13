import React,{useRef} from 'react';
import {Form} from 'antd';
import {useScripts} from './ValidationForm.Scripts';
import ValidationFormContext from './ValidationFormContext';

const ValidationForm = (props,ref) => {
  const {onFormSubmit, onFieldChange, fromInstance, errors} = useScripts(
    props,ref
  );
  return (
    <ValidationFormContext.Provider value={{errors, fromInstance}}>
      <Form
        {...props}
        ref={ref}
        form={fromInstance}
        onFinish={onFormSubmit}
        onValuesChange={onFieldChange}
      >
        {props.children}
      </Form>
    </ValidationFormContext.Provider>
  );
};

export default React.forwardRef(ValidationForm);
