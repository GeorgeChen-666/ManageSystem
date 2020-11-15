import * as userActions from '../../../models/Users';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, matchPath, useRouteMatch } from 'react-router-dom';
import useLoading from '../../../components/Hooks/useLoading';
import { register, modify, fetchList } from '../../../services/user';
import { useEffect, useCallback } from 'react';
import _ from 'lodash';

export const useScripts = (props, ref) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const currentMatch = matchPath(history.location.pathname, {
    path: [`${match.path}/add`, `${match.path}/modify/:id`],
    exact: true,
    strict: false,
  });
  let id = null;
  if (currentMatch) {
    id = currentMatch.params.id * 1;
  }
  const [doSave, isSaveLoading] = useLoading(id ? modify : register);
  useEffect(() => {
    ref.current.isSaveLoading = isSaveLoading;
  }, [isSaveLoading]);

  const data = useSelector(
    (state) =>
      _.find(_.get(state, ['Users', 'listData', 'items']), { id: id * 1 }) || {}
  );
  if (currentMatch && id !== data.id) {
    history.goBack();
  }

  const onSaveDone = useCallback(
    async (obj, params) => {
      await fetchList();

      history.goBack();
    },
    [dispatch, history]
  );
  return {
    data,
    doSave,
    onSaveDone,
  };
};
