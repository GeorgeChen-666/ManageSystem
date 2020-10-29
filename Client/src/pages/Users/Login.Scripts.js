import React from 'react';
import { useDispatch, useStore } from 'react-redux';
import { login } from '../../services/user';
import useLoading from '../../components/Hooks/useLoading';
import {setError} from '../../models/Errors';
export const useScripts = (props) => {
  const dispatch = useDispatch();
  const state = useStore().getState();
  console.log(999,state)
  const [doLogin, isLoginLoading] = useLoading(
    async ({ username, password }) => {
      try {
        await login({ username, password });
      } catch (e) {
        await dispatch(setError(e));
      }
    }
  );
  return { doLogin, isLoginLoading };
};
