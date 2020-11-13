import * as userActions from '../../../models/Users';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import useLoading from '../../../components/Hooks/useLoading';
import {register, fetchList} from '../../../services/user';
import {useEffect, useCallback} from 'react';

export const useScripts = (props, ref) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [doRegister, isRegisterLoading] = useLoading(register);
  useEffect(() => {
    ref.current.isSaveLoading = isRegisterLoading;
  }, [isRegisterLoading]);

  const onRegisterDone = useCallback(
    async (obj, params) => {
      await fetchList();

      history.goBack();
    },
    [dispatch, history]
  );
  return {
    doRegister, onRegisterDone,
  };
};