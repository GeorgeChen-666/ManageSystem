import { useState, useCallback } from 'react';
import { Form } from 'antd';
import _ from 'lodash';

export const useScripts = (props) => {
  const { onSubmit, onSubmitDone } = props;
  const [errors, setErrors] = useState(null);
  const [fromInstance] = Form.useForm();
  const onFormSubmit = useCallback(async () => {
    try {
      const formData = _.pickBy(
        fromInstance.getFieldsValue(),
        (e) => e !== undefined
      );
      const result = await onSubmit(formData);
      onSubmitDone && onSubmitDone(result, formData);
    } catch (e) {
      const errorData = e.response.data;
      errorData.message = JSON.parse(errorData.message);
      await setErrors(() => errorData);
      await fromInstance.validateFields();
    }
  }, [onSubmit, onSubmitDone, setErrors, fromInstance]);
  const onFieldChange = useCallback(
    async (valueObject) => {
      const [key] = Object.keys(valueObject);
      await setErrors((prvError) => {
        if (prvError !== null) {
          return {
            ...prvError,
            message: [],
          };
        }
        return prvError;
      });
      await fromInstance.validateFields([key]);
    },
    [setErrors, fromInstance]
  );

  return {
    errors,
    onFormSubmit,
    onFieldChange,
    fromInstance,
  };
};
