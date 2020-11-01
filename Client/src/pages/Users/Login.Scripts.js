import { useCallback, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../services/user';
import useLoading from '../../components/Hooks/useLoading';
import * as userActions from '../../models/Users';

export const useScripts = (props) => {
  const store = useStore();
  const history = useHistory();
  const dispatch = useDispatch();
  const [doLogin, isLoginLoading] = useLoading(login);
  const onLoginDoneCallback = useCallback(
    async (obj, params) => {
      const { remember } = params;
      const { jwt } = obj.data;
      await dispatch(userActions.setToken(jwt));
      if (remember) {
        await dispatch(userActions.rememberLogin(params));
      } else {
        await dispatch(userActions.rememberLogin(null));
      }
      history.push('/admin/users');
    },
    [dispatch, history]
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const state = store.getState();
    const autoLoginInfo = state.Users.login;
    if (autoLoginInfo && autoLoginInfo.expires > new Date().getTime()) {
      (async () => {
        const result = await doLogin(autoLoginInfo);
        await onLoginDoneCallback(result, autoLoginInfo);
      })();
    }
    return () => {};
  });
  return { doLogin, isLoginLoading, onLoginDoneCallback };
};
