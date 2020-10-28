import React from 'react';
import { login } from '../../services/user';
import useLoading from '../../hooks/useLoading';
export const useScripts = (props) => {
  const [doLogin, isLoginLoading] = useLoading(
    async ({ username, password }) => {
      try {
        await login({ username, password });
      } catch (e) {
        console.log(e);
      }
    }
  );
  return { doLogin, isLoginLoading };
};
