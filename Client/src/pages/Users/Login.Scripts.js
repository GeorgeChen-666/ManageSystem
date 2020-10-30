import React from 'react';
import {login} from '../../services/user';
import useLoading from '../../components/Hooks/useLoading';

export const useScripts = (props) => {
  const [doLogin, isLoginLoading] = useLoading(login);
  return {doLogin, isLoginLoading};
};
// try {
//   await login({username, password});
// } catch (e) {
//   const errorData = e.response.data;
//   errorData.message = JSON.parse(errorData.message);
//   setErrors(() => errorData);
//   //await dispatch(setError(e));
// }