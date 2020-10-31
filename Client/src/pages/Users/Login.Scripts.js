import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../services/user';
import useLoading from '../../components/Hooks/useLoading';
import * as userActions from '../../models/Users';

export const useScripts = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [doLogin, isLoginLoading] = useLoading(login);
  const onLoginDoneCallback = useCallback(
    async (obj) => {
      const { jwt, user } = obj.data;
      dispatch(userActions.setCurrentUser(user, jwt));
      history.push('/admin/users');
    },
    [dispatch]
  );
  return { doLogin, isLoginLoading, onLoginDoneCallback };
};
