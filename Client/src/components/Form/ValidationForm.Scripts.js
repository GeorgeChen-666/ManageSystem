import _ from 'lodash';
import React, {useState, useCallback} from 'react';
import {Form} from 'antd';

export const useScripts = (props) => {
  const {onSubmit} = props;
  const [errors, setErrors] = useState(null);
  const [fromInstance] = Form.useForm();
  const onFormSubmit = useCallback(async () => {
    try {
      await onSubmit(fromInstance.getFieldsValue());
    } catch (e) {
      const errorData = e.response.data;
      errorData.message = JSON.parse(errorData.message);
      setErrors(() => errorData);
      fromInstance.validateFields();
    }
  }, [onSubmit, setErrors, fromInstance]);
  const onFieldChange = useCallback(async (valueObject) => {
    const [key] = Object.keys(valueObject);
    await setErrors((prvError) => {
      if (prvError !== null) {
        return {
          ...prvError,
          message: prvError.message.filter((errInfo) => errInfo.param !== key)
        }
      }
      return prvError;
    });
    fromInstance.validateFields([key]);
  }, [onSubmit, setErrors, fromInstance]);
  const fieldServerErrorValidator = useCallback(() => ({getFieldValue}) => ({
    validator({field}, value) {
      const fieldError = _.find(_.get(errors, 'message'), {param: field});
      if (!!fieldError) {
        return Promise.reject(fieldError.msg);
      }
      return Promise.resolve();
    },
  }), [errors]);
  return {
    onFormSubmit, onFieldChange, fieldServerErrorValidator,fromInstance
  }
};