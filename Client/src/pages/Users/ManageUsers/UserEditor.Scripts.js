import * as userModel from '../../../models/Users';
import { useHistory, matchPath, useRouteMatch } from 'react-router-dom';
import useLoading from '../../../components/Hooks/useLoading';
import { useEffect } from 'react';
import _ from 'lodash';

export const useScripts = (props, ref) => {
  const history = useHistory();
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
  const [doSave, isSaveLoading] = useLoading(
    id ? userModel.useDoModify() : userModel.useDoRegister()
  );
  console.log('s:' + isSaveLoading);
  if (ref.current) {
    ref.current.isSaveLoading = isSaveLoading;
  }
  const [{ listData }] = userModel.useUsersData();
  const data = _.find(_.get(listData, ['items']), { id: id * 1 }) || {};
  if (currentMatch && id && id !== data.id) {
    history.goBack();
  }
  return {
    data,
    doSave,
    isSaveLoading,
  };
};
