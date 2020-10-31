import { useCallback, useContext } from 'react';
import _ from 'lodash';
import ValidationFormContext from './ValidationFormContext';

export const useScripts = (props) => {
  const { required } = props;
  const { errors } = useContext(ValidationFormContext);
  const fieldServerErrorValidator = useCallback(
    () => ({ getFieldValue }) => ({
      validator({ field }, value) {
        const fieldError = _.find(_.get(errors, 'message'), { param: field });
        if (!!fieldError) {
          return Promise.reject(fieldError.msg);
        }
        return Promise.resolve();
      },
    }),
    [errors]
  );
  const rules = _.get(props, 'rules', []);
  rules.push(fieldServerErrorValidator());
  if (required) {
    rules.push({ required: true, message: '请填写' });
  }
  const params = { ...props, rules };
  return { params };
};
